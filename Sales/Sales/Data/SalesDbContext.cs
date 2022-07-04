using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Sales.Models;

namespace Sales.Data
{
    public partial class SalesDbContext : DbContext
    {
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<InvoiceDetail> InvoiceDetails { get; set; }

        public SalesDbContext(DbContextOptions<SalesDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.Property(e => e.InvoiceId).ValueGeneratedNever();

                entity.Property(e => e.ClientName).IsUnicode(false);
            });

            modelBuilder.Entity<InvoiceDetail>(entity =>
            {
                entity.Property(e => e.ItemName).IsUnicode(false);

                entity.Property(e => e.Total).HasComputedColumnSql("([quantity]*[price])", false);

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.InvoiceDetails)
                    .HasForeignKey(d => d.InvoiceId)
                    .HasConstraintName("FK_Invoice_Details_Invoice");
            });

            OnModelCreatingGeneratedProcedures(modelBuilder);
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

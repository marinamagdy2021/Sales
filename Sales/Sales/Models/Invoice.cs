using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Sales.Models
{
    [Table("Invoice")]
    public partial class Invoice
    {
        public Invoice()
        {
            InvoiceDetails = new HashSet<InvoiceDetail>();
        }

        [Key]
        [Column("invoice_Id")]
        public int InvoiceId { get; set; }
        [Required]
        [Column("client_Name")]
        [StringLength(30)]
        [Unicode(false)]
        public string ClientName { get; set; }
        [Column("date", TypeName = "datetime")]
        public DateTime Date { get; set; }
        [Column("items_Count")]
        public int? ItemsCount { get; set; }
        [Column("total_Price", TypeName = "decimal(10, 2)")]
        public decimal? TotalPrice { get; set; }

        [InverseProperty(nameof(InvoiceDetail.Invoice))]
        public virtual ICollection<InvoiceDetail>? InvoiceDetails { get; set; }
    }
}

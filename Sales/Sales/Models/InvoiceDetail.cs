using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Sales.Models
{
    [Table("Invoice_Details")]
    public partial class InvoiceDetail
    {
        [Key]
        [Column("item_Name")]
        [StringLength(50)]
        [Unicode(false)]
        public string ItemName { get; set; }
        [Column("invoice_Id")]
        public int InvoiceId { get; set; }
        [Column("price", TypeName = "decimal(10, 2)")]
        public decimal Price { get; set; }
        [Column("quantity")]
        public int Quantity { get; set; }
        [Column("total", TypeName = "decimal(21, 2)")]
        public decimal? Total { get; set; }

        [ForeignKey(nameof(InvoiceId))]
        [InverseProperty("InvoiceDetails")]
        public virtual Invoice? Invoice { get; set; }
    }
}

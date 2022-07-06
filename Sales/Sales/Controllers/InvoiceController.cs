using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Sales.Data;
using Sales.Models;

namespace Sales.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly SalesDbContext _context;

        public InvoiceController(SalesDbContext context)
        {
            _context = context;
        }

        // GET: api/Invoice
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        //{
        //  if (_context.Invoices == null)
        //  {
        //      return NotFound();
        //  }
        //    return await _context.Invoices.ToListAsync();
        //}


        // GET: api/Invoice/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id)
        {
          if (_context.Invoices == null)
          {
              return NotFound();
          }
            var invoice = await _context.Invoices.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }
            var idParam = new SqlParameter("@id",id);
            var price = (_context.total_priceResult.FromSqlRaw("exec total_price @id", idParam).ToList())[0];
            var count = (_context.items_countResult.FromSqlRaw("exec items_count @id", idParam).ToList())[0];
            invoice.ItemsCount = count.items_Count;
            invoice.TotalPrice = price.total_Price;

            return invoice;
        }

        // PUT: api/Invoice/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(int id, Invoice invoice)
        {
            if (id != invoice.InvoiceId)
            {
                return BadRequest();
            }
            _context.Entry(invoice).State = EntityState.Modified;

            foreach (var invoiceDetail in invoice.InvoiceDetails)
            {
                _context.Entry(invoiceDetail).State = EntityState.Modified;
            }
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Invoice
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
          if (_context.Invoices == null)
          {
              return Problem("Entity set 'SalesDbContext.Invoices'  is null.");
          }
            _context.Invoices.Add(invoice);
            try
            {
               // await _context.SaveChangesAsync();
                if (_context.InvoiceDetails == null)
                {
                    return Problem("Entity set 'SalesDbContext.InvoiceDetails'  is null.");
                }

                foreach (var invoiceDetail in invoice.InvoiceDetails)
                {
                    _context.InvoiceDetails.Add(invoiceDetail);
                }
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    throw;
                }
            }
            catch (DbUpdateException)
            {
                if (InvoiceExists(invoice.InvoiceId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtAction("GetInvoice", new { id = invoice.InvoiceId }, invoice);
        }

        // DELETE: api/Invoice/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            if (_context.Invoices == null)
            {
                return NotFound();
            }
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceExists(int id)
        {
            return (_context.Invoices?.Any(e => e.InvoiceId == id)).GetValueOrDefault();
        }
    }
}

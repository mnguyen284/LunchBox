using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using LunchBox.Models;

namespace LunchBox.Controllers
{
    public class CourseOrdersController : ApiController
    {
        private LunchBoxContext db = new LunchBoxContext();

        // GET: api/CourseOrders
        public IQueryable<CourseOrder> GetCourseOrders()
        {
            return db.CourseOrders.Where(m => m.Date == DateTime.Today);
        }

        // GET: api/CourseOrders/5
        [ResponseType(typeof(CourseOrder))]
        public async Task<IHttpActionResult> GetCourseOrder(int id)
        {
            CourseOrder courseOrder = await db.CourseOrders.FindAsync(id);
            if (courseOrder == null)
            {
                return NotFound();
            }

            return Ok(courseOrder);
        }

        // PUT: api/CourseOrders/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCourseOrder(int id, CourseOrder courseOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != courseOrder.Id)
            {
                return BadRequest();
            }

            db.Entry(courseOrder).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseOrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/CourseOrders
        [ResponseType(typeof(CourseOrder))]
        public async Task<IHttpActionResult> PostCourseOrder(CourseOrder courseOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            courseOrder.Date = DateTime.Today;
            db.CourseOrders.Add(courseOrder);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = courseOrder.Id }, courseOrder);
        }

        // DELETE: api/CourseOrders/5
        [ResponseType(typeof(CourseOrder))]
        public async Task<IHttpActionResult> DeleteCourseOrder(int id)
        {
            CourseOrder courseOrder = await db.CourseOrders.FindAsync(id);
            if (courseOrder == null)
            {
                return NotFound();
            }

            db.CourseOrders.Remove(courseOrder);
            await db.SaveChangesAsync();

            return Ok(courseOrder);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CourseOrderExists(int id)
        {
            return db.CourseOrders.Count(e => e.Id == id) > 0;
        }
    }
}
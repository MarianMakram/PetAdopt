using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetAdopt.Models;

namespace PetAdopt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminUsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminUsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("pending-pets")]
        public async Task<IActionResult> GetPendingPets()
        {
            // Fetch pets that are waiting for admin approval (Status = PendingReview which is 1)
            var pendingPets = await _context.Pets
                .Where(p => p.Status == PetStatus.PendingReview)
                .ToListAsync();

            return Ok(pendingPets);
        }

        [HttpPost("approve-pet/{id}")]
        public async Task<IActionResult> ApprovePet(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
            {
                return NotFound(new { Message = "Pet not found" });
            }

            pet.Status = PetStatus.Approved;
            await _context.SaveChangesAsync();

            return Ok(new { Message = $"Pet {id} approved successfully" });
        }

        [HttpPost("reject-pet/{id}")]
        public async Task<IActionResult> RejectPet(int id, [FromBody] object rejectReason)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
            {
                return NotFound(new { Message = "Pet not found" });
            }

            pet.Status = PetStatus.Rejected;
            await _context.SaveChangesAsync();

            return Ok(new { Message = $"Pet {id} rejected" });
        }
        [HttpGet("pending-user")]
        public async Task<IActionResult> GetPendingUsers(){
            var pendingUser = await _context.Users
                                .Where(u => u.account_status == Status.Pending)
                                .ToListAsync();
            return Ok(pendingUser);
        }
        [HttpPatch("approve-user/{id}")]
        public async Task<IActionResult> ApprovedUser(int id){
            var user = await _context.Users.FindAsync(id);
            if(user == null){
                return NotFound(new{Message = $"User is not found"});
            }
            user.account_status = Status.Approved;
            await _context.SaveChangesAsync();
            return Ok(new{Message=$"User {id} is approved"});
        }
        [HttpPatch("reject-user/{id}")]
        public async Task<IActionResult> RejectedUser(int id){
            var user = await _context.Users.FindAsync(id);
            if(user == null){
                return NotFound(new{Message = $"User is not found"});
            }
            user.account_status = Status.Rejected;
            await _context.SaveChangesAsync();
            return Ok(new{Message=$"User {id} is rejected"});
        }
        // It can be removed for testing only to get all user in DB , edit to test
        [HttpGet("users")]
        public async Task<ActionResult<List<User>>> GetAll(){
            return Ok(await _context.Users.ToListAsync());
        }
        //[HttpPut("{id}")]
        // public async Task<IActionResult> Update(int id, User updatedUser)
        // {
        //     var user = await _context.Users.FindAsync(id);
        //     if (user == null)
        //         return NotFound();

        //     user.email = updatedUser.email;
        //     user.password_hash = updatedUser.password_hash;
        //     user.role = updatedUser.role;
        //     user.account_status = updatedUser.account_status;
        //     user.first_name = updatedUser.first_name;
        //     user.last_name = updatedUser.last_name;
        //     user.phone = updatedUser.phone;
        //     user.city = updatedUser.city;
        //     user.country = updatedUser.country;
        //     user.created_at = updatedUser.created_at;
        //     user.updated_at = updatedUser.updated_at;


        //     await _context.SaveChangesAsync();
        //     return NoContent();
        // }
    }
    
}

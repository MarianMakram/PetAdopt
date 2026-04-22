namespace PetAdopt.Models
{
    public enum Species
    {
        Dog = 0,
        Cat = 1,
        Bird = 2,
        Rabbit = 3
    }

    public enum Gender
    {
        Male = 0,
        Female = 1
    }

    public enum PetStatus
    {
        Draft = 0,
        PendingReview = 1,
        Approved = 2,
        Adopted = 3,
        Rejected = 4
    }

    public enum Role
    {
        Admin = 0,
        Shelter = 1,
        Adopter = 2
    }

    public enum Status
    {
        Pending = 0,
        Approved = 1,
        Rejected = 2
    }
}
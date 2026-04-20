using System;
using System.IO;
using MySqlConnector;

class Program
{
    static void Main()
    {
        string connectionString = "server=localhost;database=PetAdoptDB;user=root;password=bebo123567890-=";
        string sqlFilePath = @"C:\Users\marco\OneDrive - Faculty of Computers and Information\Desktop\madonnaaaaaa\PetAdopt\pet_adopt.sql";
        
        try
        {
            string script = File.ReadAllText(sqlFilePath);
            
            using var connection = new MySqlConnection("server=localhost;user=root;password=bebo123567890-=;database=pet_adopt");
            connection.Open();
            
            using var command = new MySqlCommand(script, connection);
            command.ExecuteNonQuery();
            
            Console.WriteLine("Successfully applied SQL script to pet_adopt!");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
        }
    }
}

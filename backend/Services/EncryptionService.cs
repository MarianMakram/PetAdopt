using System.Security.Cryptography;
using System.Text;

namespace PetAdopt.Services
{
    public class EncryptionService
    {
        private readonly byte[] _key;
        public EncryptionService(IConfiguration config)
        {
            var keyString = config["Encryption:AesKey"];

            if (string.IsNullOrEmpty(keyString))
                keyString = "dev-default-secret-key";

            _key = SHA256.HashData(Encoding.UTF8.GetBytes(keyString));

            Console.WriteLine($"KEY LENGTH = {_key.Length}");
        }


       public string Encrypt(string plainText)
{
    if (string.IsNullOrEmpty(plainText)) return plainText;

    using var aes = Aes.Create();
    aes.Key = (byte[])_key.Clone(); // ← pass a copy, not the shared array
    aes.GenerateIV();
    
    using var encryptor = aes.CreateEncryptor();
    var plainBytes = Encoding.UTF8.GetBytes(plainText);
    var cipherBytes = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);

    var result = new byte[aes.IV.Length + cipherBytes.Length];
    Buffer.BlockCopy(aes.IV, 0, result, 0, aes.IV.Length);
    Buffer.BlockCopy(cipherBytes, 0, result, aes.IV.Length, cipherBytes.Length);
    return Convert.ToBase64String(result);
}

public string Decrypt(string cipherTextBase64)
{
    if (string.IsNullOrEmpty(cipherTextBase64)) return cipherTextBase64;

    try
    {
        var fullCipher = Convert.FromBase64String(cipherTextBase64);
        using var aes = Aes.Create();
        aes.Key = (byte[])_key.Clone(); // ← same fix here
        
        var iv = new byte[16];
        var cipher = new byte[fullCipher.Length - 16];
        Buffer.BlockCopy(fullCipher, 0, iv, 0, 16);
        Buffer.BlockCopy(fullCipher, 16, cipher, 0, cipher.Length);
        aes.IV = iv;
        
        using var decryptor = aes.CreateDecryptor();
        var plainBytes = decryptor.TransformFinalBlock(cipher, 0, cipher.Length);
        return Encoding.UTF8.GetString(plainBytes);
    }
    catch
    {
        return cipherTextBase64;
    }
}
    }
}

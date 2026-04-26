-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: pet_adopt
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adoptionrequest`
--

DROP TABLE IF EXISTS `adoptionrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adoptionrequest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pet_id` int NOT NULL,
  `adopter_id` int NOT NULL,
  `owner_id` int NOT NULL,
  `message` text,
  `why_this_pet` text,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  `rejection_reason` text,
  `requested_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `responded_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_request` (`pet_id`,`adopter_id`),
  KEY `pet_id_idx` (`pet_id`),
  KEY `adopter_id_idx` (`adopter_id`),
  KEY `request_owner_id_idx` (`owner_id`),
  CONSTRAINT `request_adopter_id` FOREIGN KEY (`adopter_id`) REFERENCES `users` (`id`),
  CONSTRAINT `request_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`),
  CONSTRAINT `request_pet_id` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adoptionrequest`
--

LOCK TABLES `adoptionrequest` WRITE;
/*!40000 ALTER TABLE `adoptionrequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `adoptionrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adopter_id` int NOT NULL,
  `pet_id` int NOT NULL,
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_favorite` (`adopter_id`,`pet_id`),
  KEY `favorite_adopter_id_idx` (`adopter_id`),
  KEY `favorite_pet_id_idx` (`pet_id`),
  CONSTRAINT `favorite_adopter_id` FOREIGN KEY (`adopter_id`) REFERENCES `users` (`id`),
  CONSTRAINT `favorite_pet_id` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `is_read` binary(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `notification_user_id_idx` (`user_id`),
  CONSTRAINT `notification_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pets`
--

DROP TABLE IF EXISTS `pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pets` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `OwnerId` int NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Breed` varchar(100) DEFAULT NULL,
  `Age` int NOT NULL,
  `AgeUnit` int NOT NULL,
  `Species` int NOT NULL,
  `Gender` int NOT NULL,
  `Status` int NOT NULL,
  `AgeMonths` int NOT NULL DEFAULT '0',
  `Description` text,
  `Location` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `ImageUrls` text,
  PRIMARY KEY (`Id`),
  KEY `OwnerId_idx` (`OwnerId`),
  CONSTRAINT `owner_id` FOREIGN KEY (`OwnerId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--

LOCK TABLES `pets` WRITE;
/*!40000 ALTER TABLE `pets` DISABLE KEYS */;
INSERT INTO `pets` VALUES (1,1,'Max','Golden Retriever',3,1,0,0,2,0,NULL,NULL,'2026-04-24 12:25:06',NULL),(2,1,'Bella','Labrador',2,1,0,1,2,0,NULL,NULL,'2026-04-24 12:25:06','https://lh3.googleusercontent.com/aida-public/AB6AXuDbj6pz-mYfztmV3cHr6dbyA8bh8xGkUjqAMj-lP59u4MHIEYBmtX2T2LTdBOB-Fq_Ts4UMtBb5rD2QWbOA-SbIsvDEPlfGoUV29h8newybqwPvV2j8TvZqTxRFoZWTwC3ohQtsOo8ooNl-K6AL_BuPvNYTUZDKTLyZtK39avXJ5ppSk-rMXkMRPtjTDzShns84Btk4EtpU6U9jnbfEE7OB4c14nAuaDmZ8OgoXAAwRDwhmXWRzM8ZbsRZuF0ZpDui9mdS9PyK26Wk'),(3,1,'Charlie','German Shepherd',4,1,0,0,2,0,NULL,NULL,'2026-04-24 12:25:06','https://lh3.googleusercontent.com/aida-public/AB6AXuCLKaGlC86iwJykZTgFq6jj3NrmHEyPzNgeWhD3liNbqv9UaoC2yQP4570L_aH4ZZZwe9DoCN_mYy1fRS_m9gIjZggISIZTKmGSwxBxnnJzFoctEiuQw2poGMCGELxsrv8xY04fx6S8Jok1f6M_II5lscg_xfZq_zJ4VS6KhN-zOA_ljaVY2ClSjW-Y5dKJ_yrjgZFJFkktrEk7OfhML8SXAri48Tv2oEUDJD2aT7yqODA7FpH9quX4IWr3sAjUW4jrWfXOYMaysJI'),(4,2,'Whiskers','Persian',2,1,1,1,2,0,NULL,NULL,'2026-04-24 12:25:06','https://lh3.googleusercontent.com/aida-public/AB6AXuA7sQNWCjNug-gjgfVgROVfp2Z5EoSdSFBHfJTd9u5MzfP0vl1ZGiAam0rjGnngdabz4LVglMiyudZXxlbGVcGsFjEvi4pOf59DV2vhFR5gt1axM-9dwgBjrE_51KvUzjr-gqNGaObEb4zc20Tm4VmqgbNCX8lWjziaGOTBI_wIETg44mXbJCwwCYCKotgoIxNildk-mRK9vqR2wZWGHTFYEu6rmREa-JFGUIgX_S1KUyN2-h2hpV9IW6z9NXsXWtW2LZEUapYLhD0'),(5,2,'Mittens','Tabby',1,1,1,0,2,0,NULL,NULL,'2026-04-24 12:25:06','https://www.publicdomainpictures.net/pictures/570000/velka/french-bulldog-puppies-1704450406HK4.jpg'),(6,2,'Smokey','Siamese',3,1,1,0,2,0,NULL,NULL,'2026-04-24 12:25:06',NULL),(7,3,'Tweety','Budgie',1,1,2,0,2,0,NULL,NULL,'2026-04-24 12:25:06',NULL),(8,3,'Rainbow','Parrot',5,1,2,1,2,0,NULL,NULL,'2026-04-24 12:25:06','https://lh3.googleusercontent.com/aida-public/AB6AXuA7sQNWCjNug-gjgfVgROVfp2Z5EoSdSFBHfJTd9u5MzfP0vl1ZGiAam0rjGnngdabz4LVglMiyudZXxlbGVcGsFjEvi4pOf59DV2vhFR5gt1axM-9dwgBjrE_51KvUzjr-gqNGaObEb4zc20Tm4VmqgbNCX8lWjziaGOTBI_wIETg44mXbJCwwCYCKotgoIxNildk-mRK9vqR2wZWGHTFYEu6rmREa-JFGUIgX_S1KUyN2-h2hpV9IW6z9NXsXWtW2LZEUapYLhD0'),(9,4,'Fluffy','Holland Lop',2,1,3,1,2,0,NULL,NULL,'2026-04-24 12:25:06','https://www.publicdomainpictures.net/pictures/570000/velka/french-bulldog-puppies-1704450406HK4.jpg');
/*!40000 ALTER TABLE `pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refreshtokens`
--

DROP TABLE IF EXISTS `refreshtokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refreshtokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(500) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires` datetime NOT NULL,
  `revoked` datetime DEFAULT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_UserId` (`UserId`),
  CONSTRAINT `fk_refresh_user` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refreshtokens`
--

LOCK TABLES `refreshtokens` WRITE;
/*!40000 ALTER TABLE `refreshtokens` DISABLE KEYS */;
INSERT INTO `refreshtokens` VALUES (1,'MvfJgeadnLA9wCrPOmUUQXilflE7gP4cNVdprCUJSl1aiHCY/biy91jQG/U85VUqTW7gwcuv5NAqBydxOZb4qw==','2026-04-24 13:25:09','2026-05-01 13:25:09',NULL,7);
/*!40000 ALTER TABLE `refreshtokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adoption_request_id` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `adopter_id` int NOT NULL,
  `PetId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `review_adoption_req_id` (`adoption_request_id`),
  CONSTRAINT `review_adoption_req_id` FOREIGN KEY (`adoption_request_id`) REFERENCES `adoptionrequest` (`id`),
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','shelter_owner','adopter') DEFAULT NULL,
  `account_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'shelter1@petadopt.com','hashed_pwd_1','shelter_owner','approved','John','Smith','212-555-0100','New York','USA','2026-04-24 12:25:02','2026-04-24 12:25:02'),(2,'shelter2@petadopt.com','hashed_pwd_2','shelter_owner','approved','Sarah','Johnson','310-555-0200','Los Angeles','USA','2026-04-24 12:25:02','2026-04-24 12:25:02'),(3,'shelter3@petadopt.com','hashed_pwd_3','shelter_owner','approved','Mike','Davis','312-555-0300','Chicago','USA','2026-04-24 12:25:02','2026-04-24 12:25:02'),(4,'shelter4@petadopt.com','hashed_pwd_4','shelter_owner','approved','Emily','Wilson','617-555-0400','Boston','USA','2026-04-24 12:25:02','2026-04-24 12:25:02'),(5,'admin@petadopt.com','hashed_admin_pwd','admin','approved','Admin','User','800-555-0001','New York','USA','2026-04-24 12:25:02','2026-04-24 12:25:02'),(6,'adopter@petadopt.com','hashed_adopter_pwd','adopter','approved','Jane','Doe','555-0001','New York','USA','2026-04-24 12:25:02','2026-04-24 12:25:02'),(7,'marian@email.com','AQAAAAIAAYagAAAAEADxvw/qdHlrUSo0eDoN1p5X7WGTw41V1sUMtit/79ZIPLQQuC4vTFTq4HeOA3rWow==','adopter','approved','Marin','Makram','YE2MyEvXsewgyhSW3lKr8/PQA8pZlTnB1p5F9T6H6es=','Cairo','Egypt','2026-04-24 10:24:43','2026-04-24 10:24:43'),(8,'mariaan@email.com','AQAAAAIAAYagAAAAEHRRFQ44Rulbv35B4b5S2Cve5L1S6e/1W6xEhW/mzDCJEWidxgkexybQTEz5e+Qx3g==','adopter','approved','Marian','Makram','4BcHCN2LlPcKOWPz/rScvyJvIKHOSSjUsNlpbG5k2Bg=','Cairo','Egypt','2026-04-24 11:32:29','2026-04-24 11:32:29');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-24 17:36:17

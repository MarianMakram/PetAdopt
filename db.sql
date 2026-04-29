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
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` VALUES ('20260425095917_InitialCreate','9.0.0'),('20260428192802_AddAdoptionRequestTable','9.0.0');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

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
  `message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `why_this_pet` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `status` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rejection_reason` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `responded_at` datetime(6) DEFAULT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `requested_at` datetime(6) NOT NULL,
  `owner_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `IX_adoptionrequest_adopter_id` (`adopter_id`),
  KEY `IX_adoptionrequest_pet_id` (`pet_id`),
  CONSTRAINT `FK_adoptionrequest_pets_pet_id` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_adoptionrequest_users_adopter_id` FOREIGN KEY (`adopter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adoptionrequest`
--

LOCK TABLES `adoptionrequest` WRITE;
/*!40000 ALTER TABLE `adoptionrequest` DISABLE KEYS */;
INSERT INTO `adoptionrequest` VALUES (2,8,30,'w','w','accepted',NULL,'2026-04-29 13:47:21.307899','0001-01-01 00:00:00.000000','2026-04-29 13:09:15.469161',45),(3,8,30,'w','w','rejected','Pet adopted by someone else.','2026-04-29 13:47:21.322047','0001-01-01 00:00:00.000000','2026-04-29 13:10:01.145713',45),(4,11,30,'........','.............................','accepted',NULL,'2026-04-29 13:47:22.047750','0001-01-01 00:00:00.000000','2026-04-29 13:28:21.374448',45),(5,7,30,'ش','ش','pending',NULL,NULL,'0001-01-01 00:00:00.000000','2026-04-29 14:14:10.113512',45),(6,7,30,'ب','ب','pending',NULL,NULL,'0001-01-01 00:00:00.000000','2026-04-29 14:17:46.319989',45);
/*!40000 ALTER TABLE `adoptionrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` int NOT NULL,
  `PetId` int NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_favorites_PetId` (`PetId`),
  KEY `IX_favorites_UserId` (`UserId`),
  CONSTRAINT `FK_favorites_pets_PetId` FOREIGN KEY (`PetId`) REFERENCES `pets` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_favorites_users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `userid` int DEFAULT NULL,
  `title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `related_entity_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `related_entity_type` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`),
  KEY `IX_notifications_userid` (`userid`),
  CONSTRAINT `FK_notifications_users_userid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,1,NULL,'Pet Approved!','Your pet listing for d has been approved and is now public.','Success',0,'2026-04-26 09:24:34.972395','3','Pet'),(2,1,NULL,'Pet Approved!','Your pet listing for d has been approved and is now public.','Success',0,'2026-04-26 09:30:43.864120','3','Pet'),(3,1,NULL,'Pet Approved!','Your pet listing for d has been approved and is now public.','Success',0,'2026-04-26 09:30:44.663705','3','Pet'),(4,2,NULL,'Pet Rejected','Unfortunately, your pet listing for Bella was not approved.','Error',0,'2026-04-26 09:30:51.308643','2','Pet'),(5,32,NULL,'Pet Approved!','Your pet listing for dodo has been approved and is now public.','Success',1,'2026-04-26 10:16:53.954692','4','Pet'),(6,32,NULL,'Pet Approved!','Your pet listing for dodo has been approved and is now public.','Success',1,'2026-04-26 10:26:17.766583','4','Pet'),(7,32,NULL,'Pet Rejected','Unfortunately, your pet listing for dodo was not approved.','Error',1,'2026-04-26 10:26:20.919349','4','Pet'),(8,31,NULL,'New Shelter Registration','A new shelter \'Madonna Makram\' has registered and is pending approval.','Warning',0,'2026-04-26 12:58:44.907268','42','User'),(9,37,NULL,'New Shelter Registration','A new shelter \'Madonna Makram\' has registered and is pending approval.','Warning',0,'2026-04-26 12:58:45.148986','42','User'),(10,32,NULL,'Pet Approved!','Your pet listing for aaa has been approved and is now public.','Success',0,'2026-04-26 13:26:15.464986','5','Pet'),(11,2,NULL,'Pet Rejected','Unfortunately, your pet listing for Oliver was not approved.','Error',0,'2026-04-26 17:41:57.203363','1','Pet'),(12,45,NULL,'Account Approved!','Your sanctuary account has been approved. You can now log in and post pets.','Success',1,'2026-04-26 19:08:08.780776','45','User'),(13,32,NULL,'New Adoption Request','You have a new adoption request for aaa!','Success',0,'2026-04-28 19:29:39.763579','1','AdoptionRequest'),(14,30,NULL,'Request Submitted','Your adoption request for aaa has been submitted successfully.','Success',1,'2026-04-28 19:29:39.865072','1','AdoptionRequest'),(15,59,NULL,'Account Update','Unfortunately, your sanctuary account was not approved. Please contact support for more details.','Warning',0,'2026-04-28 20:20:12.272616','59','User'),(16,44,NULL,'New Pet Post','A new pet \'h\' has been posted and needs approval.','Warning',0,'2026-04-28 20:21:43.141706','6','Pet'),(17,56,NULL,'New Pet Post','A new pet \'h\' has been posted and needs approval.','Warning',0,'2026-04-28 20:21:43.216204','6','Pet'),(18,45,NULL,'Pet Approved!','Your pet listing for h has been approved and is now public.','Success',0,'2026-04-28 20:22:11.351846','6','Pet'),(19,44,NULL,'New Pet Post','A new pet \'didi\' has been posted and needs approval.','Warning',0,'2026-04-28 20:24:36.859670','7','Pet'),(20,56,NULL,'New Pet Post','A new pet \'didi\' has been posted and needs approval.','Warning',0,'2026-04-28 20:24:36.937434','7','Pet'),(21,45,NULL,'Pet Approved!','Your pet listing for didi has been approved and is now public.','Success',0,'2026-04-28 20:25:21.416820','7','Pet'),(22,44,NULL,'New Pet Post','A new pet \'ddd\' has been posted and needs approval.','Warning',0,'2026-04-28 20:42:30.814158','8','Pet'),(23,56,NULL,'New Pet Post','A new pet \'ddd\' has been posted and needs approval.','Warning',0,'2026-04-28 20:42:30.888710','8','Pet'),(24,45,NULL,'Pet Approved!','Your pet listing for ddd has been approved and is now public.','Success',0,'2026-04-28 20:42:42.140020','8','Pet'),(25,57,NULL,'Pet Rejected','Unfortunately, your pet listing for Bella was not approved.','Error',0,'2026-04-29 12:12:28.158001','10','Pet'),(26,45,NULL,'New Adoption Request','You have a new adoption request for ddd!','Success',0,'2026-04-29 13:09:15.638600','2','AdoptionRequest'),(27,30,NULL,'Request Submitted','Your adoption request for ddd has been submitted successfully.','Success',0,'2026-04-29 13:09:15.743207','2','AdoptionRequest'),(28,45,NULL,'New Adoption Request','You have a new adoption request for ddd!','Success',0,'2026-04-29 13:10:01.362669','3','AdoptionRequest'),(29,30,NULL,'Request Submitted','Your adoption request for ddd has been submitted successfully.','Success',0,'2026-04-29 13:10:01.497767','3','AdoptionRequest'),(30,44,NULL,'New Pet Post','A new pet \'gogo\' has been posted and needs approval.','Warning',1,'2026-04-29 13:25:36.769667','11','Pet'),(31,56,NULL,'New Pet Post','A new pet \'gogo\' has been posted and needs approval.','Warning',0,'2026-04-29 13:25:36.919043','11','Pet'),(32,45,NULL,'Pet Approved!','Your pet listing for gogo has been approved and is now public.','Success',0,'2026-04-29 13:26:03.472915','11','Pet'),(33,45,NULL,'New Adoption Request','You have a new adoption request for gogo!','Success',0,'2026-04-29 13:28:21.624401','4','AdoptionRequest'),(34,30,NULL,'Request Submitted','Your adoption request for gogo has been submitted successfully.','Success',0,'2026-04-29 13:28:21.723468','4','AdoptionRequest'),(35,30,NULL,'Request Accepted!','Congratulations! Your request for ddd has been accepted.','Success',0,'2026-04-29 13:47:21.449249','2','AdoptionRequest'),(36,30,NULL,'Pet Adopted','The pet ddd has been adopted by someone else.','Info',0,'2026-04-29 13:47:21.531937','3','AdoptionRequest'),(37,30,NULL,'Request Accepted!','Congratulations! Your request for gogo has been accepted.','Success',1,'2026-04-29 13:47:22.097861','4','AdoptionRequest'),(38,45,NULL,'New Adoption Request','You have a new adoption request for didi!','Success',0,'2026-04-29 14:14:10.180049','5','AdoptionRequest'),(39,30,NULL,'Request Submitted','Your adoption request for didi has been submitted successfully.','Success',0,'2026-04-29 14:14:10.275125','5','AdoptionRequest'),(40,45,NULL,'New Adoption Request','You have a new adoption request for didi!','Success',0,'2026-04-29 14:17:46.367731','6','AdoptionRequest'),(41,30,NULL,'Request Submitted','Your adoption request for didi has been submitted successfully.','Success',0,'2026-04-29 14:17:46.429706','6','AdoptionRequest');
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
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Breed` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Age` int NOT NULL,
  `AgeUnit` int NOT NULL,
  `Species` int NOT NULL,
  `Gender` int NOT NULL,
  `Status` int NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `HealthStatus` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Location` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `CreatedAt` datetime(6) NOT NULL,
  `ImageUrls` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--

LOCK TABLES `pets` WRITE;
/*!40000 ALTER TABLE `pets` DISABLE KEYS */;
INSERT INTO `pets` VALUES (7,45,'didi','dddd',3,1,1,0,2,'d','Vaccinated, Neutered','cairo','2026-04-28 20:24:36.795784','https://lh3.googleusercontent.com/aida-public/AB6AXuDbj6pz-mYfztmV3cHr6dbyA8bh8xGkUjqAMj-lP59u4MHIEYBmtX2T2LTdBOB-Fq_Ts4UMtBb5rD2QWbOA-SbIsvDEPlfGoUV29h8newybqwPvV2j8TvZqTxRFoZWTwC3ohQtsOo8ooNl-K6AL_BuPvNYTUZDKTLyZtK39avXJ5ppSk-rMXkMRPtjTDzShns84Btk4EtpU6U9jnbfEE7OB4c14nAuaDmZ8OgoXAAwRDwhmXWRzM8ZbsRZuF0ZpDui9mdS9PyK26Wk'),(8,45,'ddd','ddd',3,1,2,0,3,'3','Vaccinated, Neutered','ed','2026-04-28 20:42:30.748221','https://lh3.googleusercontent.com/aida-public/AB6AXuDbj6pz-mYfztmV3cHr6dbyA8bh8xGkUjqAMj-lP59u4MHIEYBmtX2T2LTdBOB-Fq_Ts4UMtBb5rD2QWbOA-SbIsvDEPlfGoUV29h8newybqwPvV2j8TvZqTxRFoZWTwC3ohQtsOo8ooNl-K6AL_BuPvNYTUZDKTLyZtK39avXJ5ppSk-rMXkMRPtjTDzShns84Btk4EtpU6U9jnbfEE7OB4c14nAuaDmZ8OgoXAAwRDwhmXWRzM8ZbsRZuF0ZpDui9mdS9PyK26Wk'),(9,57,'Oliver','Dachshund',4,0,0,0,2,'A tiny puppy looking for a warm home.','Initial checkup done','Giza','2026-04-29 11:15:39.559805','https://images.unsplash.com/photo-1512750117205-1f33224908e0?w=800&q=80'),(10,57,'Bella','Persian',2,1,1,1,4,'A very calm and fluffy cat.','Healthy','Cairo','2026-04-29 11:15:39.560017','https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80'),(11,45,'gogo','dog',1,1,0,1,3,'i ugdvjffcd,s.acf ffffff','Vaccinated, Neutered','cairo,egypt','2026-04-29 13:25:36.715100','https://www.publicdomainpictures.net/pictures/570000/velka/french-bulldog-puppies-1704450406HK4.jpg');
/*!40000 ALTER TABLE `pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refreshtokens`
--

DROP TABLE IF EXISTS `refreshtokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refreshtokens` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Token` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TokenHash` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Created` datetime(6) NOT NULL,
  `Expires` datetime(6) NOT NULL,
  `Revoked` datetime(6) DEFAULT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_RefreshTokens_UserId` (`UserId`),
  CONSTRAINT `FK_RefreshTokens_users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refreshtokens`
--

LOCK TABLES `refreshtokens` WRITE;
/*!40000 ALTER TABLE `refreshtokens` DISABLE KEYS */;
INSERT INTO `refreshtokens` VALUES (67,'BwfdXR0SDeOyu4dtBnPImY+KS108XX5TxRMMZRUk+/xdGPvFehyZOHpUFtXPmGBzfk2WlqIe4qBZ1jJ6ShkY4w==','','2026-04-26 09:20:21.518736','2026-05-03 09:20:21.518746',NULL,30),(69,'8NYfUW8vs8c3W3gGuosi5yPeJd7LzrfwjjWw2PoxXv5LFKygK0Q/GS8IHPEQdjWlGumij+X3OoGEKm+8Ml1ypg==','','2026-04-26 09:27:03.730634','2026-05-03 09:27:03.730643',NULL,30),(76,'eayqSoSO626rkhEOQ9B98vq2kWJJU8M/Lz8rNTWm5WTY4f8UDPmPOBdE0rDJCHsNNsuByWl5dK/IjQUa3cebDg==','','2026-04-26 09:52:19.938096','2026-05-03 09:52:19.938102',NULL,30),(86,'1dl0oJKPPIK5DPtv23sHGHOqrhofAMMXT6eC7/d/+m9us/qJkOf+eq/u/r4iGyv1VO+DNWnnFk0KliI+fJJpyQ==','','2026-04-26 11:11:32.029751','2026-05-03 11:11:32.029758',NULL,30),(91,'1FHSpiZSpl1PjJXrBcom4o0Ov3mYRF9JLdyvW6s010w/r+2kd0zqvUuE7RyLsxgAL0un7qepQX20Y2BzcPuc8A==','','2026-04-26 13:26:44.477237','2026-05-03 13:26:44.477243',NULL,30),(92,'LZMxtJm7dd7/vBZkK/+ZR/W0lhh5YvseGwnx0tUBgr3RbJekg2hk2XjHAF8gJlas5DrVN1kYo4/fGnatNbilEQ==','','2026-04-26 14:05:29.617808','2026-05-03 14:05:29.617816',NULL,30),(93,'FG5n5rsYXC/uKr4r+dpuuqbFjN+cSIoedKsAOh5BRHtGhXhv9wxRrRzGih7J0Rda9HyOhC5jzhyPi5My2BhFmQ==','','2026-04-26 17:39:09.606977','2026-05-03 17:39:09.606991',NULL,30),(95,'3ogRPbKJMr+24nySf19b/VH4WJZQP4Gug5pAQrJqB96hJIhHPBIGIk6poMgJwrmGwPpdzsiFDuxk1MbXgMlT0A==','','2026-04-26 18:17:04.224757','2026-05-03 18:17:04.225795',NULL,30),(96,'Qot14+8g6F0wnJpuHr0GRsmLczZCIvzA0qqiv9oqHHDXUqJoqOereFW2N4oM6FogDmtQcD6B+L/iAERhdUlxzg==','','2026-04-26 18:23:39.347923','2026-05-03 18:23:39.347939',NULL,30),(97,'comGxZW3bCYg0gqwUBzCwXcfkpL/yf8LSvZ7N7vK8ZdCol/5OKw3affYvXmyv4nJt5sBOPnSZn4kGyntmdFPZQ==','','2026-04-26 18:26:03.401688','2026-05-03 18:26:03.401702',NULL,30),(98,'Gbi0PwxpLQChq42KumhUD+eyMY3xljKbtvGKn9B92cIglx/orSNl/oyMFxtgKSsJT5mj1jET++h411ro88awLg==','','2026-04-26 18:32:08.139672','2026-05-03 18:32:08.139680',NULL,30),(100,'AMFYe2yZr7hqB9FYsss2SgkKUeIsALNH7DtwKTDDSnV7u98vOY1IHyWn4OZlEhjblQvNQoujHlVWauCt+RsY0w==','','2026-04-26 19:05:25.941274','2026-05-03 19:05:25.941282',NULL,30),(101,'AgTkT0WT3DdLPBqxoXaVCascTZOKjyfCXyytYcLGPuWLn9lynHxCX3MlFu/iV5T+LV3TJfuwcWJ77HP8Ck9OuQ==','','2026-04-26 19:07:59.757644','2026-05-03 19:07:59.757651',NULL,44),(102,'0qA3jaZRfxLbrdv+H+eLpNP/OnF/21KLsgOXDV3/jJw30h0HctIAqATI+lZX9UkltMHCX1fp9dpztTeU2bUIyQ==','','2026-04-26 19:08:16.670244','2026-05-03 19:08:16.670251',NULL,45),(103,'urxNayUQnRAa9iTzAv6NAuG15qGl0q29YQ94g8xtuFCNp0AS2f4RqYsKe9OT2DrgFeemfsnCmTkOW1/0ThSz/A==','','2026-04-26 19:48:25.755771','2026-05-03 19:48:25.755784',NULL,45),(104,'x6K3EdUhspPCe4YoMekVttTEVyVeKPO24CiwdReDGdeJIlNjSUUZjwVQj+UplIUI7OP6r0+FwpQIz65XYSxWvQ==','','2026-04-26 19:49:50.157375','2026-05-03 19:49:50.157383',NULL,44),(105,'sFPdCbPBkEHLZKKuueIj/A9MQfF2kDH52LtV6pY2n/4XdQe/oziOJ34ND+5HssDANMFl/b17yDsG1H59FQH2Sw==','','2026-04-26 19:50:46.460395','2026-05-03 19:50:46.460465',NULL,45),(106,'DS8CFXg/YkFgPFZWNqDjWtDDGRi7kAb70eY332C1VC9Y1Ps6D1Xq5KPkbQj2tN5y14hL7h5n7wLHydMx/Yhy8w==','','2026-04-26 19:51:16.715033','2026-05-03 19:51:16.715038',NULL,30),(107,'uJiLGGZd9jrCTu3FTkzg/gcrY4ktMt6Cimr3zJE6go2boXkHWETaYLVcTy4fybXbexhW7iY0BdNVuDai4Us0Yg==','','2026-04-26 19:52:20.805174','2026-05-03 19:52:20.805180',NULL,45),(108,'ZsP5HOlbIDyq2FMELYBzWyk8UBC9j/jsLCgAp+hgxY2k6qN88TD3Az4V7WqI/I2POq6Wx2NBoddhbbjHu+jdHA==','','2026-04-27 06:01:54.819134','2026-05-04 06:01:54.819240',NULL,45),(109,'IF3mvCFCySwhXe/ZbOJGkAXAfmbVIMFRqTA7QZ3DyZzOhA6dTcrMqyv4LvNxlUfBOKDq8jjCYbHa59C0D38ACw==','','2026-04-27 06:20:50.078095','2026-05-04 06:20:50.078107',NULL,30),(110,'4PoPbOqm3qStHDChNV5SLKcOxh4ZiG/j6wI7Iufm6/O74oVSfnCP1J90hiBL757uwQZboCLTvwiyUn3PHlf1iQ==','','2026-04-27 06:21:08.373303','2026-05-04 06:21:08.373310',NULL,45),(111,'XYSLNx5xNHDxcFFRTy6txq2abT1J3584OFyWXkrPmrGoF25GKz4uBwtbN09IeselDit7lTfnDFda8lcTHZRZww==','','2026-04-27 06:21:26.804192','2026-05-04 06:21:26.804207',NULL,44),(112,'o5kqfR/eHgElgTwPmywqCwHzb1HFoPkdu1glgu/k4rYE47Gq5/XZs7EcFLtGWOYaZfRr1thpxOGrAb90Q7Vs8g==','','2026-04-27 06:24:14.616199','2026-05-04 06:24:14.616214',NULL,44),(113,'7IexW5ehq9Fec8fEbIyD/zH6a7eS1Wmyr6ypZHLSK6yjZ/SdQm/KiW63oD0eWXglN79o9vDhPIs6XTXdZyev8A==','','2026-04-28 19:06:36.535645','2026-05-05 19:06:36.535698',NULL,30),(114,'xoDlBJ5juXyfO70KTp7bVgO5AIQmWSe7u3FHZVSeC9mXzxbPZ0CyY5mlLenbneGvz9L2EJVUH8uq25xX0+c0JA==','','2026-04-28 19:29:25.301000','2026-05-05 19:29:25.301592',NULL,30),(115,'/rPNEWLijRyDxYcMUvV1bpuDCKUytAmUhJ1Dczsp0pePN4A0DqDIKryLp6jlJAjxk1PFa0eVAe/ARdvLa3ihYg==','','2026-04-28 19:45:39.454200','2026-05-05 19:45:39.454209',NULL,45),(116,'uIYf5+PJbAd9bUnsq3Iz7jrqu1NSuQs6nhrBroEEcnw3mtBUKY6jV25modM4N2ZDXPJgp7mqsEe6HawR2jgZkA==','','2026-04-28 19:51:07.088089','2026-05-05 19:51:07.088096',NULL,44),(117,'pbIiXnYBzn44lOkCni1AUygKEnQPXkvRhqMz50yScHI7jI5CVgvKAc8gLMbk4bQ0nGSKO4Wgkf8YGoIoK3kd6g==','','2026-04-28 20:16:29.235282','2026-05-05 20:16:29.235290',NULL,45),(118,'SlMtAtovpORpxblchMO3rO8z4z2/g8fXvox0CVfdv3WsULgP0ouNtejpvVqJlFf6aJB8nCae8S1sqZfXpc0iog==','','2026-04-28 20:18:25.678148','2026-05-05 20:18:25.678156',NULL,30),(119,'0YqQ5sJcvXATarI3PSkZjx7yQ80uV3pF3lv1MP39Zv4tsbAfTlpiYDC5PRYBWDYPGcrW9YHST2JfCgVoXhaaDQ==','','2026-04-28 20:22:01.464284','2026-05-05 20:22:01.464293',NULL,44),(120,'5NaTGIPhfd79BiP0xBK0eGroVwHWPfabokpmfy6/vqrze4OgpybWJFex0dtWZYGqfPmhfeheryIXTZQY+Zax3w==','','2026-04-29 11:34:57.046555','2026-05-06 11:34:57.047705',NULL,45),(121,'JjubAKEoKCn4n0JPQq5/y2d14Y/IKziYzEHweDpM4Wa7/eGFDnNHUc32TQIJ+Qry4vJCq+8zPOtbQGmDHyCe/Q==','','2026-04-29 11:35:26.906352','2026-05-06 11:35:26.906361',NULL,44),(122,'2FFGGmFE1CWiTXK+YaXUk4XR7TkwC9yLgt4Jyf23tdjmLAlil0pgn9Y48Vhgwito5JLF+S3HyzYTsQAOw9oxMQ==','','2026-04-29 11:35:50.125571','2026-05-06 11:35:50.125577',NULL,30),(123,'5CtWwq3OslMJpA0aWDkZwIr8tTHMOkVBWHptelHJxx2ioUICC6uzP2egFz4YqZOT0Bzp+Z/WPxoGg8t59AFFjA==','','2026-04-29 12:11:33.491149','2026-05-06 12:11:33.491163',NULL,44),(124,'zhBE6nvea/CkfZFATIFIWMMKHkCpGz4BhqB6zgkzAKFA1zpcDXFDqQcBfZgLzzB0v7PtztyjzY+Je2XswT9HLw==','','2026-04-29 12:11:58.411260','2026-05-06 12:11:58.411269',NULL,45),(125,'mdm9iU6eHVSzcXxrC1LvjXTXKJDmlKRj9N/aUIWZi1wOt4n1LOp5LI0p/4hRqDqhy9XG9lbDA9RtHwpKtoLPEg==','','2026-04-29 13:01:32.566891','2026-05-06 13:01:32.566902',NULL,45),(126,'q1BIcArNZw/vvKTkJYbm3dgTcUGKWGNwLeBf+idZ9PdJXqUD/JDu3XiVzo491EuPnSSLNaEYLQKyjbmkWqocHQ==','','2026-04-29 13:07:43.918108','2026-05-06 13:07:43.918117',NULL,44),(127,'/p3fdYGMOS7Iind2Mh++FFOp3DAXuzqGGVTuKykta+1KKdCmmvdBZ+wXVspJZvBKSk52f2geJ5zPjJ85jCvG6g==','','2026-04-29 13:08:53.104313','2026-05-06 13:08:53.104319',NULL,30),(128,'yIYNH15wGLvxYJouuINLiwCO+3Hl8mktCRQhnoAJUrzXmBAdi/8sjyefBt9tHPouEJ927JpXCgoa74Frdia+6A==','','2026-04-29 13:32:13.502988','2026-05-06 13:32:13.502998',NULL,45),(129,'zZyfRGwp0L6W6v5fMBQM+8Txx7vCfLuBPodU941W21nxqmpGdn3RfcEnzNR1Ayx8xUgNfxXWNQ/M6AatV/97lw==','','2026-04-29 13:48:38.568506','2026-05-06 13:48:38.568520',NULL,44),(130,'cZsqR36KfnmAcnMXn0HGplz5zik4Gx4PySEZ9EOt2NfQOMBSLRvBbqpIbN3qJqxMLcPrYim9srhL9cAhDflJNg==','','2026-04-29 13:49:54.818911','2026-05-06 13:49:54.818919',NULL,30),(131,'xCxBf7Pl7hn3dEsiIbLV75BDYzA+zVXSVgq+UDSiM8reN06/gNqHa4vBj/HyiYKOGd/jyh+a9fBT1kHXKZ/Oiw==','','2026-04-29 13:58:22.981635','2026-05-06 13:58:22.981643',NULL,30),(132,'AV3uim+ZmdyEoiDDCx1dJxEMyE+2lPjNbvtXEKICs42OU7hHYTgEFHlDsRjXktUR2Q27tO4VlkxNFt+whPh1ow==','','2026-04-29 14:05:22.788230','2026-05-06 14:05:22.788236',NULL,30),(133,'QUZ5tVveHlEwX+SDOStqpnY3q+crfI7SUhB1ZEjWPGu5F6lJAghtNiS/QPkTM3cfVdDJOlg1wF/DKZMDYkjaRw==','','2026-04-29 14:15:12.579843','2026-05-06 14:15:12.579847',NULL,45);
/*!40000 ALTER TABLE `refreshtokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `PetId` int NOT NULL,
  `AdopterId` int NOT NULL,
  `Rating` int NOT NULL,
  `Comment` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_reviews_AdopterId` (`AdopterId`),
  KEY `IX_reviews_PetId` (`PetId`),
  CONSTRAINT `FK_reviews_pets_PetId` FOREIGN KEY (`PetId`) REFERENCES `pets` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_reviews_users_AdopterId` FOREIGN KEY (`AdopterId`) REFERENCES `users` (`id`) ON DELETE CASCADE
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
  `email` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password_hash` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `salt` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `account_status` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `first_name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `city` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `country` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (30,'adopter@email.com','AQAAAAIAAYagAAAAEKcDYsz9Pv7+XchpeJRICW5ubvHqQA6uXUYd4ddQD7pGd6ed7n4Vv/2+EWJkAMmAxw==','FYPnhPyvf+kAybIUiCV75g==','adopter','approved','marian','makram','NWEtdSaEEWzDlFQattL2bAcF0GoNamCchIggWZQQ4vc=','cairo','','2026-04-26 09:20:05.285154','2026-04-26 09:20:05.285154'),(44,'admin@email.com','AQAAAAIAAYagAAAAEBMVgvH0d8csi6KKGXpWgyKb0yIG24q3XXZOm8k5SHXp5X7lgT1X+krZ8Po9aPkifg==','PQT+/Fnbyq0wrTwAeS46Dg==','admin','approved','marian','makram','0BD0JEshLRt7ouF/sq7vq+kgIf8mCkuYjOxxkcfnY88=','cairo egypt','','2026-04-26 19:05:04.252134','2026-04-26 19:05:04.252134'),(45,'owner@email.com','AQAAAAIAAYagAAAAEKGbkXqmOopgxgg2D0FE6hBwwnaLdRa7ruMmzMqdy//JlRbg2DsB8l0GhvKqmcPqVg==','ppAFBxrsQmrhI4wzlNa/DA==','shelter_owner','approved','Marco','Makram','PY6dVfX1753zQuaK65o9Q5Dca1NRtR845Mng7I2+ISc=','cairo','','2026-04-26 19:06:42.485637','2026-04-26 19:06:42.485637'),(56,'admin@petadopt.com','I82LUnSd1Y2725DZydZAymAPvVyClVt0Fm9dblOdzjRlc1DQpTOjaq95hefWB5O4spcRMguSync59ssDqYDBNw==','T1vkouybpUJ7FgIKYcLRWXwLkVs3EDS9l21/lixXclJB8X3TRNrTkvuPh7txinEKu7PJq0z64Cg/5wfs/iirw3K3i+CntW6YQ7kVX+7dM07jaEkvM+NSwBjTzNFa27Eg1dsc4pdhX/btNat4O4BHl6BGu42OnDDDyEWO6+fHzh0=','admin','approved','System','Admin','2oQBowtJwsVlDq++zvmqWeD/PL1yxUE8EIx+UmH/T/s=','Cairo','Egypt','2026-04-28 19:05:16.272969','2026-04-28 19:05:16.273116'),(57,'shelter@petadopt.com','uIpTvci3o04z3GNhAVigTCyPKu6cPXjFoDJroK7Pg1oqqO1cNvl11wEeQBuadUyO22MITDRZ2hW8zjD8QSaRlw==','B3LhmSmA705+x2D5fn77hf2/WKGNGyBDAjyZZ/ZRWqBws7LmsXDoC62XUbl1Vkf96OMM7/jrGpOg/JMbw/Xjipb+KejJpkB7ewbaeA++mgo/8/D6Ueut+dtzMwd8fCxkwK06Bd7gNC7W9Z/tkE7nfgD2ca/cFO8EB/2F62wtDuE=','shelter_owner','approved','Happy','Paws Shelter','o7nOL+NC4B3jsCTUgHV3eOiV3PsPUVtVSV6cRU5paiU=','Cairo','Egypt','2026-04-28 19:05:16.412029','2026-04-28 19:05:16.412029'),(58,'adopter@petadopt.com','kL0vIiEV4M3LToYLzeoKjXSMM+cQcNwMHbsjhY3AmHwVf5I3zRi0FWCF/oYpN6foOkX2GhIBzmC24q6Mmz+Lhw==','0BjImM5DyXirG2QmKSBfIyFV223FUbA6kGiTr/FJsQ2def/e70iUfiPrR60JTjhJtp7W4ms3b2riee82EwZpRPWVvVdFRviKRCHPZlFAB93L+F69cc2Md5gLPqcARow3lxBTW7FzSoYDkN4cY9Z/z72mNiA1neUbx7Pm9ljQXys=','adopter','approved','John','Doe','1piIc/YsLxrOjpRuZ8Z88dsAUJnUST0mvBdmQnOJIcA=','Giza','Egypt','2026-04-28 19:05:16.417360','2026-04-28 19:05:16.417360'),(59,'shelter.pending@petadopt.com','JvHpTy6KicoiHuBmgepCHX4o2TT2+KDanKf/sfMN6bOvlbYawf3N6OCHaeJ1vHkFPr0VWgDV0hsFXnqQ60CGOQ==','MYKmioYWSe/NZV4oBL+YV3JL+8HwN7yPWZdqNFwhauhghxR1inscG9OEYYrcJroVTFDAADdFDEGz/Zs6c246T5NoTllB46VtaMCDy7NklBrUIpauFTlLuTVx56UIZJAEORR2wzH5vzguAauJWjcR1UgbIPdDFcTa6/R7jEIUlJM=','shelter_owner','rejected','Golden','Paws Sanctuary','Uy/zljIiQffTAXlVtnsb0k6YdD6bMaJuXV1iPZOMLc0=','Alexandria','Egypt','2026-04-28 19:05:16.430503','2026-04-28 19:05:16.430503'),(60,'adopter.pending@petadopt.com','2PFHBK9a2p0I+sn5pjqvi9v/9jMyObN68vS1ucf/ybOVYDwwRG1XwDR2B9pbN/5JrfptcytRYfxs/vOM7Bymmw==','olnFTnbraWhijInPiavxIf6LQ7f+pcq0id7HRQFDe3zMF5gxlD3zW41mjtFQzbVPP0oNeM3xax/gnl2sujIwF20DY+IPcHbnJmnYnROSmzCpajM8EOG8zjWarHS2Tg21AEj6rLD23ULxguxEt/q0ATS1TNG3ID0dMi3ALeYHDzc=','adopter','pending','Jane','Smith','lj4I3IftLeElIHV+A24WrJwsSC02jNV3HPpbclYyH5c=','Cairo','Egypt','2026-04-28 19:05:16.434209','2026-04-28 19:05:16.434209');
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

-- Dump completed on 2026-04-29 17:23:48

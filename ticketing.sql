-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: ticketing
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admintb`
--

DROP TABLE IF EXISTS `admintb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admintb` (
  `AdminID` int(5) NOT NULL AUTO_INCREMENT,
  `Name` varchar(25) NOT NULL,
  `Username` varchar(25) NOT NULL,
  `Pass` varchar(25) NOT NULL,
  PRIMARY KEY (`AdminID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admintb`
--

LOCK TABLES `admintb` WRITE;
/*!40000 ALTER TABLE `admintb` DISABLE KEYS */;
INSERT INTO `admintb` VALUES (1,'Ibrahim Tahan','IbraT','Pass2594'),(7,'Celine Currie','CeliC','Pass9856'),(10,'Tobaas Harvrey','TobaH','Pass1256');
/*!40000 ALTER TABLE `admintb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dept`
--

DROP TABLE IF EXISTS `dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dept` (
  `DeptID` int(5) NOT NULL AUTO_INCREMENT,
  `DeptName` varchar(25) NOT NULL,
  `AdminID` int(5) DEFAULT NULL,
  PRIMARY KEY (`DeptID`),
  KEY `ManagesDept` (`AdminID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dept`
--

LOCK TABLES `dept` WRITE;
/*!40000 ALTER TABLE `dept` DISABLE KEYS */;
INSERT INTO `dept` VALUES (13,'Engineering',1),(14,'Chemistry',7),(15,'Maintenance',10),(16,'Science',1),(19,'Fitness',10);
/*!40000 ALTER TABLE `dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faults`
--

DROP TABLE IF EXISTS `faults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faults` (
  `FaultID` int(11) NOT NULL AUTO_INCREMENT,
  `Fault` varchar(25) NOT NULL,
  PRIMARY KEY (`FaultID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faults`
--

LOCK TABLES `faults` WRITE;
/*!40000 ALTER TABLE `faults` DISABLE KEYS */;
INSERT INTO `faults` VALUES (1,'System'),(2,'Software'),(3,'Hardware'),(4,'Network');
/*!40000 ALTER TABLE `faults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subfaults`
--

DROP TABLE IF EXISTS `subfaults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subfaults` (
  `SubFaultID` int(5) NOT NULL AUTO_INCREMENT,
  `SubFault` varchar(25) DEFAULT NULL,
  `FaultID` int(5) DEFAULT NULL,
  PRIMARY KEY (`SubFaultID`),
  KEY `FaultID` (`FaultID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subfaults`
--

LOCK TABLES `subfaults` WRITE;
/*!40000 ALTER TABLE `subfaults` DISABLE KEYS */;
INSERT INTO `subfaults` VALUES (1,'Slow System',1),(2,'Not Starting',1),(3,'Out of Date',1),(4,'Screen is Black',2),(5,'Keybord Not Working',2),(6,'Printer Broken',2),(7,'Phone is not connected',3),(8,'No Internet',3),(21,'Network crash',4),(23,'Cable Broken',3);
/*!40000 ALTER TABLE `subfaults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tickets` (
  `TicketID` int(5) NOT NULL AUTO_INCREMENT,
  `Priority` varchar(20) NOT NULL,
  `SubFaultID` int(5) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `SenderID` int(5) NOT NULL,
  `ReceiverID` int(5) NOT NULL,
  `SentOn` date NOT NULL DEFAULT current_timestamp(),
  `Cause` varchar(50) DEFAULT NULL,
  `Solution` varchar(50) DEFAULT NULL,
  `DoneIn` int(3) DEFAULT NULL,
  PRIMARY KEY (`TicketID`),
  KEY `SubFaultID` (`SubFaultID`),
  KEY `SenderID` (`SenderID`),
  KEY `ReceiverID` (`ReceiverID`),
  CONSTRAINT `ReceiverID` FOREIGN KEY (`ReceiverID`) REFERENCES `dept` (`DeptID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `SenderID` FOREIGN KEY (`SenderID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `SubFaultID` FOREIGN KEY (`SubFaultID`) REFERENCES `subfaults` (`SubFaultID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (1,'High',1,'Slow System',36,16,'2023-02-06','Slow Performance','Upgrade Parts',15),(3,'Medium',7,'System Not Working',31,15,'2023-02-17','Old Version','Update System',25),(10,'High',3,'gvnhb',31,13,'2023-09-07','Need Update','Updated',5),(12,'Medium',1,'Urgent\n',33,14,'2023-09-08',NULL,NULL,NULL),(13,'Low',1,'Urgent\n',36,16,'2023-09-11','Need Update','Did Update',23),(14,'Medium',6,'Urgent',29,15,'2023-09-11','Need Update','Did Update',43),(16,'Medium',1,'Urgent',37,19,'2023-09-11',NULL,NULL,NULL),(17,'High',21,'Not Working\n',36,13,'2023-09-11','Need Update','Did Update',5),(18,'Low',7,'Call Me',29,15,'2023-09-11',NULL,NULL,NULL),(19,'Medium',5,'Need Keyboard',29,16,'2023-09-12','Need Update','Did Update',5),(20,'Medium',3,'test',33,16,'2023-09-12','Need Update','Did Update',10),(21,'High',2,'test',29,15,'2023-09-12','Need Update','Did Update',120),(22,'Medium',3,'ted',40,16,'2023-09-12','Need Update','Did Update',13),(23,'Medium',1,'gf',40,15,'2023-09-12','Need Update','Did Update',43),(24,'High',1,'43',40,15,'2023-09-12',NULL,NULL,NULL),(25,'Medium',3,'test\n\n',29,13,'2023-09-12','Need Update','Did Update',2),(26,'High',2,'5416',29,13,'2023-09-13',NULL,NULL,NULL),(35,'Medium',21,'Crashing',40,19,'2023-09-15',NULL,NULL,NULL),(55,'High',1,'asd',40,14,'2023-09-15','Old Computer','Upgraded Computer Parts',48),(59,'High',1,'asd',40,14,'2023-09-15',NULL,NULL,NULL),(63,'High',8,'Need Internet',37,16,'2023-09-15',NULL,NULL,NULL),(66,'High',8,'Need Internet',37,16,'2023-09-15',NULL,NULL,NULL),(69,'Low',3,'Need Update',29,13,'2023-09-15',NULL,NULL,NULL),(70,'High',3,'Update System',31,19,'2023-09-15',NULL,NULL,NULL),(71,'High',2,'asddf',29,13,'2023-09-15','Need Update','646dfvre',65),(72,'High',2,'aqd',29,13,'2023-09-15','Need Update','Did Update',23),(73,'Medium',2,'wre',29,13,'2023-09-15',NULL,NULL,NULL),(74,'Medium',2,'wre',29,13,'2023-09-15',NULL,NULL,NULL),(75,'Medium',1,'wqe',29,13,'2023-09-15','Need Update','Did Update',23),(76,'Medium',3,'rth',29,15,'2023-09-15',NULL,NULL,NULL);
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `UserID` int(5) NOT NULL AUTO_INCREMENT,
  `Name` varchar(25) NOT NULL,
  `Username` varchar(25) NOT NULL,
  `Pass` varchar(25) NOT NULL,
  `DeptID` int(5) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  KEY `DeptID` (`DeptID`),
  CONSTRAINT `DeptID` FOREIGN KEY (`DeptID`) REFERENCES `dept` (`DeptID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (29,'Lisa snape','LisaS','Pass6523',13),(31,'Belle lee','BellL','Pass6547',14),(33,'Aidan Collins','AidaC','Pass6532',16),(36,'Larissa Macias','LariM','Pass9876',14),(37,'Hamilton Porter','HamiP','Pass5716',16),(40,'Alan Wyatt','AlanW','Pass6760',15),(42,'Christopher William','ChriW','Pass8489',19);
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

-- Dump completed on 2023-09-18 10:06:46

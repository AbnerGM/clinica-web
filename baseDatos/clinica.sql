-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: clinicadb
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `administracion`
--

DROP TABLE IF EXISTS `administracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administracion` (
  `idAdmin` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `correoElectronico` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `rol` enum('Admin','Recepcionista','Contador') NOT NULL,
  PRIMARY KEY (`idAdmin`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administracion`
--

LOCK TABLES `administracion` WRITE;
/*!40000 ALTER TABLE `administracion` DISABLE KEYS */;
INSERT INTO `administracion` VALUES (1,'Juan','Pérez','admin@clinica.com','987654321','Admin');
/*!40000 ALTER TABLE `administracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cita`
--

DROP TABLE IF EXISTS `cita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cita` (
  `idCita` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `id_medico` int NOT NULL,
  `fechaHora` datetime NOT NULL,
  `Estado` enum('Confirmada','Pendiente','Cancelada') DEFAULT 'Pendiente',
  PRIMARY KEY (`idCita`),
  KEY `cita_ibfk_1` (`id_paciente`),
  KEY `cita_ibfk_2` (`id_medico`),
  CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`idPaciente`),
  CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`idMedico`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cita`
--

LOCK TABLES `cita` WRITE;
/*!40000 ALTER TABLE `cita` DISABLE KEYS */;
INSERT INTO `cita` VALUES (12,3,11,'2025-07-26 21:14:00','Pendiente'),(13,3,11,'2025-07-26 21:14:00','Pendiente'),(14,3,11,'2025-07-26 21:14:00','Pendiente'),(15,3,11,'2025-07-26 21:14:00','Pendiente');
/*!40000 ALTER TABLE `cita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultamedica`
--

DROP TABLE IF EXISTS `consultamedica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultamedica` (
  `idConsulta` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `id_medico` int NOT NULL,
  `fecha` date NOT NULL,
  `diagnostico` text,
  `tratamiento` text,
  `notas` text,
  PRIMARY KEY (`idConsulta`),
  KEY `consultamedica_ibfk_1` (`id_paciente`),
  KEY `consultamedica_ibfk_2` (`id_medico`),
  CONSTRAINT `consultamedica_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`idPaciente`),
  CONSTRAINT `consultamedica_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`idMedico`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultamedica`
--

LOCK TABLES `consultamedica` WRITE;
/*!40000 ALTER TABLE `consultamedica` DISABLE KEYS */;
INSERT INTO `consultamedica` VALUES (8,3,11,'2025-07-14','cancer','omeprazol','...'),(9,3,11,'2025-06-30','fiebre','paracetamol','-...'),(10,3,11,'2025-07-17','fiebre 2 ','paracetamol','...'),(11,3,11,'2025-07-04','fiebre','...','...'),(12,4,15,'2025-07-13','cáncer','omeprazol','Se inició tratamiento con control mensual');
/*!40000 ALTER TABLE `consultamedica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `idEspecialidad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`idEspecialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES (2,'ortodoncia',',,,,'),(4,'ofmatolago','...'),(6,'pediatra','..');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `idFactura` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,2) NOT NULL,
  `metodoPago` enum('EFECTIVO','TARJETA','TRANSFERENCIA') NOT NULL,
  PRIMARY KEY (`idFactura`),
  KEY `factura_ibfk_1` (`id_paciente`),
  CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`idPaciente`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES (6,4,'2025-07-04 03:25:40',130.00,'EFECTIVO'),(7,4,'2025-07-07 02:31:22',1220.00,'EFECTIVO'),(8,3,'2025-07-03 03:37:20',120.00,'TARJETA'),(9,3,'2025-07-03 03:37:20',120.00,'TARJETA'),(10,3,'2025-07-03 03:37:20',120.00,'TARJETA');
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialmedico`
--

DROP TABLE IF EXISTS `historialmedico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialmedico` (
  `idHistorial` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` text,
  `diagnosticoAnterior` text,
  PRIMARY KEY (`idHistorial`),
  KEY `historialmedico_ibfk_1` (`id_paciente`),
  CONSTRAINT `historialmedico_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`idPaciente`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialmedico`
--

LOCK TABLES `historialmedico` WRITE;
/*!40000 ALTER TABLE `historialmedico` DISABLE KEYS */;
/*!40000 ALTER TABLE `historialmedico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario` (
  `idInventario` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `fechaExpiracion` date DEFAULT NULL,
  `fechaRegistro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_admin` int DEFAULT NULL,
  `id_producto` int DEFAULT NULL,
  PRIMARY KEY (`idInventario`),
  KEY `fk_inventario_admin` (`id_admin`),
  KEY `fk_inventario_producto` (`id_producto`),
  CONSTRAINT `fk_inventario_admin` FOREIGN KEY (`id_admin`) REFERENCES `administracion` (`idAdmin`),
  CONSTRAINT `fk_inventario_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES (2,80,5.90,'2025-11-30','2025-07-02 23:50:42',NULL,2),(3,60,4.75,'2026-01-15','2025-07-02 23:50:42',NULL,3),(4,90,6.20,'2025-10-10','2025-07-02 23:50:42',NULL,4),(5,120,7.00,'2025-09-01','2025-07-02 23:50:42',NULL,5),(6,150,8.50,'2025-12-20','2025-07-02 23:50:42',NULL,6),(7,140,5.30,'2025-11-05','2025-07-02 23:50:42',NULL,7),(8,180,4.10,'2026-02-15','2025-07-02 23:50:42',NULL,8),(9,170,6.90,'2025-12-10','2025-07-02 23:50:42',NULL,9),(10,130,7.25,'2026-03-01','2025-07-02 23:50:42',NULL,10),(11,200,3.20,'2026-01-20','2025-07-02 23:50:42',NULL,11),(12,90,2.80,'2025-10-30','2025-07-02 23:50:42',NULL,12),(13,85,5.50,'2025-09-25','2025-07-02 23:50:42',NULL,13),(14,190,3.95,'2025-08-15','2025-07-02 23:50:42',NULL,14),(15,210,8.10,'2026-01-10','2025-07-02 23:50:42',NULL,15),(16,95,4.40,'2025-11-01','2025-07-02 23:50:42',NULL,16),(17,160,2.90,'2025-12-25','2025-07-02 23:50:42',NULL,17),(18,170,3.60,'2025-10-10','2025-07-02 23:50:42',NULL,18),(19,60,6.80,'2025-09-15','2025-07-02 23:50:42',NULL,19),(20,100,1.80,'2025-11-20','2025-07-02 23:50:42',NULL,20),(21,50,7.20,'2026-01-25','2025-07-02 23:50:42',NULL,21),(22,110,1.50,'2025-10-05','2025-07-02 23:50:42',NULL,22),(23,200,9.90,'2025-09-30','2025-07-02 23:50:42',NULL,23),(24,180,1.20,'2026-02-01','2025-07-02 23:50:42',NULL,24),(25,160,3.10,'2025-12-18','2025-07-02 23:50:42',NULL,25),(26,120,3.85,'2026-03-10','2025-07-02 23:50:42',NULL,26),(27,130,2.60,'2025-11-11','2025-07-02 23:50:42',NULL,27),(29,100,4.95,'2026-01-15','2025-07-02 23:50:42',NULL,29),(30,90,4.25,'2026-01-30','2025-07-02 23:50:42',NULL,30),(31,60,20.00,'2026-02-28','2025-07-02 23:50:42',NULL,31),(32,80,2.75,'2025-12-05','2025-07-02 23:50:42',NULL,32),(33,95,4.60,'2025-11-14','2025-07-02 23:50:42',NULL,33),(34,70,2.40,'2025-09-19','2025-07-02 23:50:42',NULL,34),(35,100,3.70,'2025-10-12','2025-07-02 23:50:42',NULL,35);
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medico`
--

DROP TABLE IF EXISTS `medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medico` (
  `idMedico` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correoElectronico` varchar(100) DEFAULT NULL,
  `fechaRegistro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_especialidad` int DEFAULT NULL,
  PRIMARY KEY (`idMedico`),
  KEY `fk_medico_especialidad` (`id_especialidad`),
  CONSTRAINT `fk_medico_especialidad` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`idEspecialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medico`
--

LOCK TABLES `medico` WRITE;
/*!40000 ALTER TABLE `medico` DISABLE KEYS */;
INSERT INTO `medico` VALUES (7,'Carlo','mendoza','veterinario','carlos.castellanos.14.03.2001@gmail.com','2025-07-03 23:45:20',2),(11,'aber','gomez','23242424242','leo@gmail.com','2025-07-07 02:49:11',4),(14,'abner','gomez','912668865','carlos.castellanos.14.03.2001@gmail.com','2025-07-07 03:01:59',4),(15,'Pedro','Ramírez Actualizado','999888777','pedro.ramirez.actualizado@clinica.com','2025-07-07 05:00:00',2);
/*!40000 ALTER TABLE `medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente` (
  `idPaciente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correoElectronico` varchar(100) DEFAULT NULL,
  `genero` enum('MASCULINO','FEMENINO','OTRO') NOT NULL,
  `fechaRegistro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idPaciente`),
  UNIQUE KEY `DNI` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES (3,'Pedro Alonso','Gomez','34567890','1985-07-09','Calle Ficticia 789','987654323','pedro.gomez@mail.com','MASCULINO','2025-06-04 03:09:43'),(4,'Laura','Sanchez','45678901','1990-03-25','Calle Nueva 101','987654324','laura.sanchez@mail.com','FEMENINO','2025-06-04 03:09:43'),(17,'Carlos','mendoza','567575','2025-07-18','Mzk1lt14','','carlos.castellanos.14.03.2001@gmail.com','FEMENINO',NULL),(18,'aber','gomez','61368123313','2025-07-19','qe','912668865','leo@gmail.com','MASCULINO',NULL),(19,'Lucía','Fernández','76543210','1999-12-31','Av. Siempre Viva 742','912345678','lucia@email.com','FEMENINO','2025-07-08 05:00:00');
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `imagen` varchar(255) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `stock` int DEFAULT '0',
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Paracetamol','Analgésico y antipirético','https://farmaciauniversalpe.vtexassets.com/arquivos/ids/156423-800-auto?v=638417260707800000&width=800&height=auto&aspect=true','Medicamento',NULL,0),(2,'Ibuprofeno','Antiinflamatorio no esteroideo','https://www.lasanteca.com/userfiles/2018/12/IBUPROFENO-800MG-CAJA-POR-50-TABLETAS-CON-BLISTER.jpg','Medicamento',NULL,0),(3,'Aspirina','Analgésico y antiagregante','https://www.aspirina.com.mx/sites/g/files/vrxlpx53376/files/2024-05/ASPIRINA%20500%20mg%2020%20TABL%20frente.png','Medicamento',NULL,0),(4,'Amoxicilina','Antibiótico penicilina','https://www.lasanteca.com/userfiles/2018/12/AMOXICILINA-500MG-CAJA-POR-50-CAPSULAS-CON-BLISTER.jpg','Medicamento',NULL,0),(5,'Omeprazol','Inhibidor de bomba de protones','https://farmaciauniversalpe.vtexassets.com/arquivos/ids/158088/01984_1.jpg?v=638428792795700000','Medicamento',NULL,0),(6,'Metformina','Tratamiento para diabetes tipo 2','https://www.farmalisto.com.mx/93348-large_default/comprar-metformina-850mg-tab30-amsa-lgen-precio.jpg','Medicamento',NULL,0),(7,'Loratadina','Antihistamínico para alergias','https://farmaciauniversalpe.vtexassets.com/arquivos/ids/158231-800-auto?v=638428793318870000&width=800&height=auto&aspect=true','Medicamento',NULL,0),(8,'Vitamina C','Suplemento de vitamina C','https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now00682/y/23.jpg','Suplemento',NULL,0),(9,'Multivitamínico','Suplemento multivitamínico','https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/evl/evl02067/y/69.jpg','Suplemento',NULL,0),(10,'Probiótico','Mejora la flora intestinal','https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now02931/y/27.jpg','Suplemento',NULL,0),(11,'Alcohol 70%','Desinfectante tópico','https://dojiw2m9tvv09.cloudfront.net/50562/product/alkofarma961000ml90537414.jpg','Higiene',NULL,0),(12,'Jeringa 5ml','Jeringa estéril desechable','https://plazavea.vteximg.com.br/arquivos/ids/13384718-450-450/imageUrl_1.jpg?v=637923211394630000','Material Médico',NULL,0),(13,'Guantes de Nitrilo','Guantes desechables resistentes','https://promart.vteximg.com.br/arquivos/ids/5944041-444-444/imageUrl_1.jpg?v=637916261909530000','Material Médico',NULL,0),(14,'Mascarilla Quirúrgica','Protección facial médica','https://jrimplementos.com/wp-content/uploads/2021/02/MASCARILLA-MAYFIELD.jpg','Equipamiento',NULL,0),(15,'Termómetro Digital','Medidor de temperatura corporal','https://promart.vteximg.com.br/arquivos/ids/1445810-1000-1000/image-0e13a1151f6145179950280e6f4e7787.jpg?v=637623033315630000','Equipamiento',NULL,0),(16,'Tijeras Médicas','Tijeras quirúrgicas','https://static.praxisdienst.com/out/pictures/generated/product/1/640_640_100/370107_1.jpg','Instrumental',NULL,0),(17,'Venda Elástica','Venda de compresión','https://www.bodycare.com.ar/productos/BC2002/g/BC2000_1.jpg','Material Médico',NULL,0),(18,'Gasa Estéril','Gasa para heridas','https://oechsle.vteximg.com.br/arquivos/ids/5614844-1000-1000/image-1b70fea182cb4ea9931dff777a0cce47.jpg?v=637708650538230000','Material Médico',NULL,0),(19,'Sutura Absorbible','Material de sutura quirúrgico','https://tagumedica.com/wp-content/uploads/2021/02/Acido-Poliglicolico-1.jpg','Instrumental',NULL,0),(20,'Gasas no estériles','Gasas comunes económicas','https://um.com.co/wp-content/uploads/2020/11/Gasas-No-tejidas-esteriles.jpg','Material Médico',NULL,0),(21,'Bisturí desechable','Bisturí estéril quirúrgico','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi-YVrYSH9G9jW9je39XAxlD_ncFLJjasDFA&s','Instrumental',NULL,0),(22,'Esparadrapo','Cinta adhesiva médica','https://dojiw2m9tvv09.cloudfront.net/50562/product/3mmicropore1pulgadaparte20396.jpg','Material Médico',NULL,0),(23,'Termómetro Infrarrojo','Termómetro sin contacto','https://www.promelsa.com.pe/media/catalog/product/cache/beccbd461ac94891fe746718d2496617/1/0/1037636-01_1.jpg','Equipamiento',NULL,0),(24,'Curita','Parche adhesivo para heridas','https://proemer.cl/wp-content/uploads/2015/04/0100085D_parchecurita.jpg','Material Médico',NULL,0),(25,'Toalla Higiénica','Toalla femenina absorbente','https://oechsle.vteximg.com.br/arquivos/ids/1953727-1000-1000/image-8830d58b1ec044cd8c8d390cf61c352a.jpg?v=637495568289870000','Higiene',NULL,0),(26,'Alcohol Isopropílico','Desinfectante fuerte','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPoPDEZidLwwpY4-nyM4MfQgUmXa4G6wEJYA&s','Higiene',NULL,0),(27,'Vinilo Desechable','Cubrecalzado protector','https://www.ofimarket.pe/cdn/shop/files/548243.jpg?v=1713802127','Material Médico',NULL,0),(28,'Cubrebocas KN95','Respiración segura con filtro','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9RjJvhbeQm1ID8UjRayx9N-QT7mo62jFsMA&s','Equipamiento',NULL,0),(29,'Óxido de Zinc','Crema calmante tópica','https://res.cloudinary.com/riqra/image/upload/w_656,h_656,c_limit,q_auto,f_auto/v1645376987/sellers/salud-farma/products/ylnqornomlboolpgapx7.jpg','Medicamento',NULL,0),(30,'Crema Antiséptica','Antiséptico para heridas','https://www.ubuy.pe/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNDFKS1QyeHV5YkwuX1NTNDAwXy5qcGc.jpg','Medicamento',NULL,0),(31,'Nebulizador','Equipo para nebulización','https://oechsle.vteximg.com.br/arquivos/ids/13963694/image-61efad9477c247a2a842006145aff5c0.jpg?v=638133450537100000','Equipamiento',NULL,0),(32,'Jeringa 10ml','Jeringa estéril grande','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsgME6erxCWlgfmE8X-8D2KfeYQ1xPyYptnQ&s','Material Médico',NULL,0),(33,'Antiséptico Bucal','Colutorio para higiene oral','https://www.dentaidcomprasonline.pe/204-large_default/enjuague-bucal-perioaid-intensive-care-500-ml.jpg','Higiene',NULL,0),(34,'Esponja Médica','Esponja quirúrgica absorbente','https://tedamedes.com/wp-content/uploads/2023/05/sponge_ad-1.jpg','Material Médico',NULL,0),(35,'Tubo de Sangre','Tubo para muestras','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCICyiiPwjqY8_8Ipw878_jD6jEaCbD-nloA&s','Material Médico',NULL,0);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receta`
--

DROP TABLE IF EXISTS `receta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receta` (
  `idReceta` int NOT NULL AUTO_INCREMENT,
  `id_consulta` int NOT NULL,
  `medicamentos` text NOT NULL,
  `instrucciones` text NOT NULL,
  PRIMARY KEY (`idReceta`),
  KEY `receta_ibfk_1` (`id_consulta`),
  CONSTRAINT `receta_ibfk_1` FOREIGN KEY (`id_consulta`) REFERENCES `consultamedica` (`idConsulta`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receta`
--

LOCK TABLES `receta` WRITE;
/*!40000 ALTER TABLE `receta` DISABLE KEYS */;
INSERT INTO `receta` VALUES (10,11,'...','fiebre');
/*!40000 ALTER TABLE `receta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turno`
--

DROP TABLE IF EXISTS `turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turno` (
  `idTurno` int NOT NULL AUTO_INCREMENT,
  `id_medico` int NOT NULL,
  `fecha` date NOT NULL,
  `horaInicio` time NOT NULL,
  `horaFin` time NOT NULL,
  PRIMARY KEY (`idTurno`),
  KEY `turno_ibfk_1` (`id_medico`),
  CONSTRAINT `turno_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`idMedico`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turno`
--

LOCK TABLES `turno` WRITE;
/*!40000 ALTER TABLE `turno` DISABLE KEYS */;
INSERT INTO `turno` VALUES (7,14,'2025-08-01','07:13:00','07:16:00');
/*!40000 ALTER TABLE `turno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('ADMIN','MEDICO','RECEPCIONISTA') NOT NULL,
  `id_medico` int DEFAULT NULL,
  `id_admin` int DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `username` (`username`),
  KEY `id_medico` (`id_medico`),
  KEY `id_admin` (`id_admin`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`idMedico`),
  CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_admin`) REFERENCES `administracion` (`idAdmin`)
) ENGINE=InnoDB AUTO_INCREMENT=1004 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1001,'admin','$2a$10$3i0w2CSif.wUZtiSuaa/O.AQ79fWy4V6sCFJ19aQXQ1nSXsLYRiPa','ADMIN',NULL,NULL),(1003,'abner','$2a$10$DOWSDThmNqu2xuKj8JfWMeIblOqN1CnSR4KTLVmpP1y81yo9Rw3lW','ADMIN',NULL,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-08 23:02:00

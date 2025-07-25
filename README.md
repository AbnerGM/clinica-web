# 🏥 Sistema de Gestión para Clínica Web

  Este Sistema web fue desarrollado como solución integral para la gestión de una clínica. Incluye funcionalidades como manejo de pacientes, médicos, consultas medicas , administración, citas, facturas, historial medicos, inventarios, productos, recetas, turnos y login seguro y más...
  El sistema está compuesto por un **Frontend en React**, un **Backend en Spring Boot** y una **Base de Datos MySQL**.

## LINK DE IMAGENES DEL PROYECTO


![Vista del proyecto](https://github.com/user-attachments/assets/ca46799b-0c0d-4e17-9c77-1f33be923984)



![Vista del proyecto](https://github.com/user-attachments/assets/65c62491-daba-4eae-9c80-11874e53c467)



![Vista del proyecto](https://github.com/user-attachments/assets/a920040e-be3a-4d37-8455-c29c99668019)



![Vista del proyecto](https://github.com/user-attachments/assets/cee2db05-c6c1-40f5-9e94-ca6c9f49ebe2)


---

## 🚀 Tecnologías Utilizadas

### 🔧 Backend
- Java 17
- Spring Boot 3+
- Spring Data JPA
- Spring Security (para autenticación y autorización)
- Maven
- MySQL 8+

### 🎨 Frontend
- React JS
- Bootstrap 5
- Axios

### 🛢 Base de Datos
- MySQL 8+
- Archivo `.sql` esta incluido en la carpeta `/db` para importar la estructura y datos..

### 🧪 Herramientas de Prueba
- Postman (colección de endpoints incluida en `/postman`)

---

## 🛠 Funcionalidades Principales

- Registro y autenticación de usuarios (login con Spring Security)
- Gestión de pacientes
- Gestión de médicos
- Gestión de citas
- Sistema de roles para acceso restringido
- API RESTful con validaciones
- Interfaz moderna en React
- Comunicación frontend-backend con Axios
- Persistencia de datos en MySQL

---

## 📁 Estructura del Repositorio

```
clinica-web/
├── backend/ # Proyecto Spring Boot
│ ├── src/
│ └── pom.xml
├── frontend/ # Proyecto React JS
│ ├── public/
│ ├── src/
│ └── package.json
├── db/ # Scripts de base de datos
│ └── clinica.sql
├── postman/ # Colección de pruebas
│ └── Clinica.postman_collection.json
└── README.md # Este archivo
```

## 🧑‍💻 Cómo Ejecutar el Proyecto

## 1. Clonar el repositorio

.......................................................
git clone https://github.com/abnerGM/clinica-web.git


## 2. Base de datos 

Crear una base de datos llamada clinica

Importar el archivo db/clinica.sql

## 3. Backend (Spring Boot)

En mi caso como yo use el id SPRING TOOLS ZUITE 4 ..
Ustedes pueden usar cualquier id confiable que tengan
lo unico que necesitamos es importar el archivo dentro de su id y listo
ya viene con las configuraciones predeterminadas asegurese de mover todo al lugar necesario..

## 4. Frontend (React)

Importamos el archivo del frontend y listo ya viene con los ajustes 
lo unico que encesitamos es iniciar y ejecutar el proyecto en la consola,
que se hace con estos comandos..

cd frontend
npm install
npm run dev


## 🔒 Credenciales de Prueba

Administrador

Usuario: admin

Contraseña: 123456


###  AUTOR

Abner Abel Gómez Mendoza — @abnerGM










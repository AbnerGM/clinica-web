# 🏥 Sistema de Gestión para Clínica Web

  Este Sistema web fue desarrollado como solución integral para la gestión de una clínica. Incluye funcionalidades como manejo de pacientes, médicos, consultas medicas , administración, citas, facturas, historial medicos, inventarios, productos, recetas, turnos y login seguro y más...
  El sistema está compuesto por un **Frontend en React**, un **Backend en Spring Boot** y una **Base de Datos MySQL**.

## LINK DE IMAGENES DEL PROYECTO




<img width="1891" height="960" alt="catura-1" src="https://github.com/user-attachments/assets/3050da9b-bdba-4f87-bfc3-4041f2d08a94" />





<img width="1891" height="955" alt="captura-2" src="https://github.com/user-attachments/assets/2b52322f-85a1-41b2-88ca-5cc6c53fa190" />





<img width="1890" height="953" alt="captura-3" src="https://github.com/user-attachments/assets/fa47bb8d-39f6-4f35-89d2-6e6e615cf3fc" />





<img width="1888" height="966" alt="captura-4" src="https://github.com/user-attachments/assets/bf3309f2-3c6e-458a-b2f0-f8821bc7c5a4" />



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

UN EJEMPLO DE LA ARQUITECTURA DE LA BASE DE DATOS RELACIONAL:

![BASE DE DATOS](https://github.com/user-attachments/assets/aa268dec-bf69-4ca8-bb7c-1a896dbcde69)

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










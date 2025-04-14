# METALAB BACKEND

Metalab Backend is a Spring Boot RESTful API for managing time slot bookings, client profiles, and product operations.

## KEY FEATURES

- **JSON-based login with JWT token security.**
- **Manage time slots and reservations.**
- **Basic CRUD for products and client orders.**

## PREREQUISITES

- **Java:** 11+
- **Maven**
- **PostgreSQL**

## CONFIGURATION

> **IMPORTANT:**  
> The repository contains a sample config file: `application.properties.example`.  
> Your actual configuration file (`application.properties`) is excluded via `.gitignore`.

### To configure the application, follow these steps:

1. **Create a Configuration File:**  
   Create a file at `src/main/resources/application.properties` based on the sample provided.

2. **Update the Settings:**  
   Change the database URL, username, password, and JWT secret with your own values.

## RUNNING THE APPLICATION

1. **Build the Project:**  
   Open a terminal and run the following command:
   ```bash
   mvn clean install
2. **Run the Application:**
   After a successful build, run the generated JAR file with:
   ```bash
   java -jar target/metalab-backend.jar

Metalab Backend

Metalab Backend is a Spring Boot RESTful API for managing time slot bookings, client profiles, and product operations.

Key Features:

JSON-based login with JWT token security.
Manage time slots and reservations.
Basic CRUD for products and client orders.

Prerequisites:

Java: 11+
Maven
PostgreSQL
Configuration

IMPORTANT:

The repository contains a sample config file: application.properties.example. Your actual configuration file (application.properties) is excluded via .gitignore.
To configure the application, follow these steps:

Create a Configuration File:
Create a file at src/main/resources/application.properties based on the sample provided.
Update the Settings:
Change the database URL, username, password, and JWT secret with your own values.

Running the Application:

Step 1: Build the Project
Open a terminal and run the following command:

mvn clean install

Step 2: Run the Application
After a successful build, run the generated JAR file with:

java -jar target/metalab-backend.jar



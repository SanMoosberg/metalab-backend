Metalab Backend

Metalab Backend is a Spring Boot RESTful API for managing time slot bookings, client profiles, and product operations.

Key Features

Authentication: JSON-based login and JWT token security.
Bookings: Manage time slots and reservations.
Products: Basic CRUD for products and client orders.
Prerequisites

Java 11+
Maven
PostgreSQL
Configuration

IMPORTANT:
The repository contains a sample config file: application.properties.example.
Your real configuration file (application.properties) is excluded via .gitignore.

Setup:

Create a file at src/main/resources/application.properties based on the sample.
Update the database URL, username, password, and JWT secret with your own values.
Running the Application

Build the project with: mvn clean install
Run the JAR:  java -jar target/metalab-backend.jar

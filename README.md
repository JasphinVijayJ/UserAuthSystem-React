# User Authentication System

A full-stack user authentication system built with React frontend and Spring Boot backend, featuring JWT-based authentication, form validation, and protected routes.

## 🔥 Features

### Frontend
- User registration and login forms with real-time validation
- Input field trimming and validation on every change
- JWT token storage in localStorage for persistent sessions
- Protected routes that require authentication
- Automatic redirect based on authentication status
- Clean logout functionality
- Responsive design with CSS styling

### Backend
- Spring Boot REST API with JPA and MySQL
- JWT token generation and validation
- Comprehensive input validation using Spring Validation
- Custom exception handling with appropriate HTTP status codes
- Password confirmation matching
- Unique email and phone number validation
- CORS configuration for React frontend

## 🛠 Technologies Used

### Frontend
- **React** - React Hooks (`useState`, `useNavigate`)
- **React Router DOM** - Routing and navigation
- **CSS** - Styling
- **localStorage** - Token persistence
- **Fetch API** - HTTP requests

### Backend
- **Java 21** - Programming language
- **Maven** - Dependency management
- **Spring Boot 3.5.5** - Application framework
- **Spring Data JPA** - Database operations
- **MySQL** - Database
- **JWT (jjwt)** - Token authentication
- **Spring Validation** - Input validation

## 📝 Usage

### Registration
1. Navigate to `/register`.
2. Fill in all required fields:
   - **Name:** Required.
   - **Phone:** Exactly 10 digits, must be unique.
   - **Email:** Valid email format, must be unique.
   - **Password:** Minimum 6 characters.
   - **Confirm Password:** Must match the password.
3. Submit the form to register. Validation occurs on every input change, and all fields are trimmed before sending.

### Login
1. Navigate to `/login`.
2. Enter your registered **email** and **password**.
3. On successful login:
   - JWT token is stored in `localStorage`.
   - User is redirected to the **Dashboard**.

### Protected Access
- **Dashboard** and other protected routes require valid authentication.
- Unauthorized users are automatically redirected to the login page.
- JWT token is automatically included in API requests to access protected endpoints.

### Logout
- Click the **Logout** button to:
  - Clear the JWT token from `localStorage`.
  - Redirect back to the login page.

## 📂 Project Structure

### Frontend (React - VS Code)

frontend/
│── public/
│── src/
│   ├── components/
│   │   ├── InputField.jsx
│   │   ├── LogoutButton.jsx
│   │   └── ProtectiveRoute.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/
│       └── App.css
│── package.json
│── vite.config.js

### Backend (Spring Boot - STS)

backend/
│── src/main/java/com/jasphin/uas/
│   ├── controller/
│   │   └── UserController.java
│   ├── dto/
│   │   ├── LoginRequest.java
│   │   └── LoginResponse.java
│   ├── enums/
│   │   ├── Role.java
│   │   ├── ErrorMessage.java
│   │   └── SuccessMessage.java
│   ├── exception/
│   │   ├── GlobalExceptionHandler.java
│   │   ├── EmailAlreadyExistsException.java
│   │   ├── PhoneAlreadyExistsException.java
│   │   ├── PasswordMismatchException.java
│   │   ├── InvalidPasswordException.java
│   │   └── UserNotFoundException.java
│   ├── model/
│   │   └── User.java
│   ├── repository/
│   │   └── UserRepository.java
│   ├── security/
│   │   └── JwtUtil.java
│   └── service/
│       └── UserService.java
│── src/main/resources/
│   ├── application.properties
│── pom.xml

## ⚡ Notes

- JWT tokens expire **after 1 hour** by default.
- Backend validates inputs and handles exceptions gracefully.
- Frontend protects routes and automatically redirects unauthorized users.

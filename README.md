# Teachy SWE Challenge

## General Instructions

1. *Clone* this repository
2. In your *fork*, develop your solution
3. Notify your delivery so we can move on.

## Technical Challenge

Development of Authentication and Session Management System for the Teachy Platform

The goal of this challenge is to implement a robust authentication and session management system with permissions for the Teachy education platform, which should serve multiple platforms and allow login via Google and 2FA (two-factor authentication). The system must be able to handle users belonging to multiple schools, with different permissions for each user.
The authentication system must ensure security, scalability, and flexibility, providing a smooth and secure login experience for users. Additionally, it must be possible to monitor active sessions and allow administrators to efficiently manage users.

### Technical Requirements:

#### Authentication and Integration with Google:

  - The authentication system must allow login using a Google account (OAuth 2.0).
  - The Google login must be configured to ensure that essential user information (name, email) is securely stored in the database.
  - The user must be able to link their Google account to other school accounts (one or more).
  
#### Two-Factor Authentication (2FA):
  
  - The system must provide the option for two-factor authentication (2FA), where the user can receive a code via SMS or an authentication app (such as Google Authenticator).
  - 2FA will be mandatory for users with access to school accounts or for administrators.
  - The system must allow secure storage and verification of the 2FA code.
  
#### Session Management:
  
  - The system must manage active login sessions for each user, allowing them to log in on multiple devices simultaneously.
  - The administrator must be able to view information about a user's active sessions, such as the number of connected devices and session duration.
  - The administrator should be able to log a user out of all devices simultaneously or from a specific device.

#### Permission and User Structure:
  
  - School Users: Users can belong to one or more schools and will have different permissions depending on the school they belong to (e.g., student, teacher, coordinator).
  - Admin Account: Administrator users will have permissions to manage users, view sessions, and control school permissions. They can also immediately remove users from the platform.
  - The system must ensure that a user can have multiple linked accounts (e.g., a personal account and several school accounts).
  - The platform should allow dynamic permission management, enabling administrators to adjust user permissions individually or by group.
  
#### Database:
  
  - The database must be designed to store the necessary information for managing authentication (Postgres/Redis).
  - Each user must have:
     - Profile information (name, email, etc.).
     - Authentication information (Google credentials, 2FA).
     - Permission information.
     - List of linked accounts (e.g., personal account and multiple school accounts).
     - The database must ensure that the relationship between users and session devices is efficiently maintained.
  
#### Security:
  
  - The system must implement appropriate security measures to protect user data, including password encryption (e.g., bcrypt), hashing of 2FA codes, and protection against CSRF/XSS attacks.
  - JWT (JSON Web Tokens) should be used to securely manage user sessions.
  
#### Frontend Implementation (Next.js):
  
  - The challenge should include a basic frontend application using Next.js to demonstrate the integration of the authentication system.
  - The frontend application should have protected routes, accessible only by authenticated users.
  - Protected routes should verify the authenticity of the user and their permission level before granting access.
  - The user interface should provide an option for Google login and 2FA authentication.
  - The session management system (viewing and logging out devices) should be accessible to administrators via a simple interface.
  
## Minimum Implementation Requirements:

#### Backend:
  - Implement the authentication API with OAuth 2.0 for Google and the 2FA system.
  - Create endpoints for session and device management.
  - Implement user permission management for school users and administrators.
  
#### Frontend (Next.js):
  - Login page with Google authentication.
  - Two-factor authentication page (for users with 2FA enabled).
  - Protected routes that require authentication to access certain content.
  - Session management page (for administrators).
  
#### Database:
  Model the user, school, session, and device entities.
  Implement data persistence for users, accounts, permissions, and sessions.
  
## Evaluation Criteria:

 - Functionality: The solution must meet all authentication, session management, user permissions, and security requirements.
 - Scalability: The system should be designed to scale, with the possibility of future integration with other platforms.
 - Security: The implementation must be secure, using best practices for encryption and protecting sensitive data.
 - Usability: The administration interface and login flows should be intuitive and easy to use.
 - Code Quality: The code should be clean, modular, well-structured, and documented.

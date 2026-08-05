# Baselarte

Software engineering and infrastructure learning project.

Baselarte is a minimal and efficient web application focused on learning and applying software engineering concepts, frontend architecture, authentication, infrastructure and cloud services.

The project currently uses a simple frontend architecture based on:

- HTML
- CSS
- JavaScript
- Docker
- AWS EC2
- AWS ECR

The goal is to keep the system simple, maintainable and progressively evolve it into a complete application with backend integration.

---

## Current State

## Frontend Structure

The frontend is organized by feature/page.

Each page contains its own HTML, CSS and JavaScript files, keeping related code together and easier to maintain.

Example:

frontend/

├── src/
│
│ ├── home/
│ │ ├── index.html
│ │ ├── home.css
│ │ └── home.js
│ │
│ ├── login/
│ │ ├── index.html
│ │ ├── login.css
│ │ └── login.js
│ │
│ └── upload/
│ ├── index.html
│ ├── upload.css
│ └── upload.js
│
├── assets/
│ └── images/
│
├── Dockerfile
└── README.md

Each feature is isolated in its own folder:

feature/

├── index.html
├── feature.css
└── feature.js

This keeps the project simple and organized as new features are added.

The frontend is currently a static application without API integration.

Implemented:

- Responsive layout.
- Dark mode synchronized between pages.
- SEO-oriented HTML structure.
- Organized page-specific files.
- Minimalist visual identity.

---

## Implemented Features

## Home

Current features:

- Minimal landing page.
- SEO metadata.
- Open Graph metadata.
- Twitter metadata.
- Responsive layout.
- Dark/light theme.

---

## Authentication Page

Current features:

- Login screen.
- Registration screen.
- Email validation.
- Username validation.
- Password validation.
- Theme synchronization.

Current authentication is only frontend validation.

No:

- database;
- session;
- token;
- API communication.

---

## Upload / Media Manager

The upload screen currently works completely in memory.

Implemented:

- Upload images.
- Upload videos.
- Preview uploaded files.
- File size validation.
- Create folders.
- Enter folders.
- Navigate back.
- Edit descriptions.
- Add hashtags.
- Delete media.
- Delete folders.

Current storage:

Browser memory only

Refreshing the page removes all data.

Future storage:

Frontend

|

Backend API

|

Cloudflare R2

---

## Current Limitations

The project currently does not have:

- Backend.
- Database.
- Real authentication.
- JWT.
- Access token.
- Refresh token.
- Persistent storage.
- Cloud storage integration.
- User management.
- Authorization rules.

---

## Next Improvements

## User Profile

Create a simple profile page.

Features:

- Edit profile information.
- Display username.
- Display username everywhere using:

@username

Username will become mandatory during registration.

Example:

Baselarte

@author

The username will become the main public identifier.

---

## Frontend Architecture Improvements

## Shared JavaScript Utilities

Currently some logic is duplicated between pages.

Create shared utilities:

Example:

js/

├── utils/
│
├── theme.js
├── validation.js
├── helpers.js

Responsibilities:

- Theme management.
- Form validation.
- Common DOM utilities.
- Formatting functions.
- File validation.
- Common frontend behaviors.

---

## API Layer

Create a centralized API client.

Future structure:

js/

└── api/

├── client.js
├── auth.js
├── media.js
└── users.js

Responsibilities:

- Centralize HTTP requests.
- Handle headers.
- Handle authentication.
- Handle errors.
- Avoid duplicated fetch code.

Example future flow:

Page

|

API Module

|

HTTP Client

|

Backend

---

## Authentication System

After backend integration:

Implement:

- Access Token.
- Refresh Token.
- Secure authentication flow.
- Session management.
- Protected routes.

Expected architecture:

Login

|

Backend

|

Access Token
+
Refresh Token

|

Authenticated Application

Security considerations:

- HttpOnly cookies where appropriate.
- Secure cookies.
- CSRF protection.
- Token expiration.
- Token rotation.

---

## Password Manager

Future feature.

A secure password manager system.

Purpose:

Allow users to store different types of credentials:

- Websites.
- Applications.
- Services.
- Notes.
- Private information.

This feature will only be implemented after backend integration.

Requirements:

- Strong encryption.
- Secure key management.
- Zero trust approach.
- Proper authentication.
- Audit logs.
- Careful security design.

Security is the main priority of this feature.

---

## UX/UI Improvements

Continuous improvements:

- Better navigation.
- Better mobile experience.
- Improved accessibility.
- Better feedback messages.
- Loading states.
- Empty states.
- Error states.
- Improved media visualization.
- Better interaction patterns.

The goal is:

Simple
|
Functional
|
Efficient
|
Consistent

Avoid unnecessary complexity.

---

## Future Backend Architecture

Expected evolution:

Frontend

HTML
CSS
JavaScript

    |

Backend API

    |

Database

    |

Cloudflare R2

Possible backend responsibilities:

- Authentication.
- User management.
- Media management.
- Folder management.
- Permissions.
- Metadata.
- Storage integration.

---

## Development Philosophy

Baselarte follows some principles:

- Keep things simple.
- Prefer clarity over abstraction.
- Build only what is necessary.
- Improve continuously.
- Avoid premature complexity.
- Learn the fundamentals deeply.

The project evolves step by step from a static frontend into a complete software system.

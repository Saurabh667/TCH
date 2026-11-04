
<div align="center">

# ⚡ THE CODERS HUB

### `TCH` — Backend API

**Powering the next generation of developers.**

A centralized backend platform for managing club members, core teams, events, registrations, attendance, and club activities.

<br/>

![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge\&logo=python\&logoColor=white)
![Django](https://img.shields.io/badge/Django-Framework-092E20?style=for-the-badge\&logo=django\&logoColor=white)
![DRF](https://img.shields.io/badge/Django_REST-Framework-A30000?style=for-the-badge\&logo=django\&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge\&logo=sqlite\&logoColor=white)

![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![API](https://img.shields.io/badge/API-REST-orange?style=for-the-badge)

---

### 🚀 Backend Architecture

`Authentication` • `Members` • `Core Teams` • `Events` • `Registrations` • `Attendance` • `Analytics`

---

</div>

## 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Tech Stack](#-tech-stack)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Running the Backend](#-running-the-backend)
* [Authentication](#-authentication--authorization)
* [API Documentation](#-api-documentation)
* [Event Management Workflow](#-event-management-workflow)
* [Useful Commands](#-useful-django-commands)
* [Frontend Integration](#-running-frontend--backend-together)
* [Troubleshooting](#-troubleshooting)
* [Security](#-security-guidelines)

---

## 🌟 About the Project

**The Coders Hub (TCH)** is a Computer Science Department club platform designed to simplify club operations and provide a centralized digital experience.

The backend provides RESTful APIs for:

* 👤 User registration and authentication.
* 📧 Email verification and JWT authentication.
* 👥 Member profile management.
* 🏆 Core team management.
* 📅 Event creation and management.
* 📝 Event registrations.
* 🎯 Organizer assignments.
* ✅ Attendance tracking.
* 🖼️ Event gallery and media management.
* 📊 Event analytics and CSV exports.

---

<div align="center">

**Built with ❤️ for The Coders Hub**

`Learn` • `Build` • `Innovate` • `Collaborate`

</div>



# The Coders Hub (TCH) — Backend

The backend for **The Coders Hub (TCH)**, a Computer Science Department club website.

TCH provides a centralized platform for managing club members, core teams, events, event registrations, attendance, galleries, and other club activities.

The backend is built using Django and Django REST Framework and provides RESTful APIs for the React frontend.

---

## 🛠️ Tech Stack

| Technology            | Purpose                      |
| --------------------- | ---------------------------- |
| Python 3.12           | Backend programming language |
| Django                | Backend framework            |
| Django REST Framework | REST API development         |
| Simple JWT            | Authentication               |
| SQLite                | Development database         |
| SMTP (Gmail)          | Email verification           |
| Git                   | Version control              |

---

## 📁 Project Structure

```text
backend/
│
├── apps/
│   ├── accounts/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   └── events/
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       ├── urls.py
│       └── ...
│
├── backend/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
│
├── media/
├── staticfiles/
├── venv/
├── .env
├── manage.py
├── requirements.txt
└── README.md
```

*Note: The structure above represents the main application organization. Additional apps and files may exist.*

---

# 🚀 Getting Started

## 1. Prerequisites

Install the following:

* Python 3.12
* pip
* Git (optional)
* VS Code (recommended)

Verify installation:

```powershell
python --version
pip --version
```

## 2. Clone the Repository

```powershell
git clone <repository-url>
```

Navigate to the backend:

```powershell
cd TCH/backend
```

## 3. Create Virtual Environment

```powershell
python -m venv venv
```

## 4. Activate Virtual Environment

For Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then activate again:

```powershell
.\venv\Scripts\Activate.ps1
```

## 5. Install Dependencies

```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## 6. Configure Environment Variables

Create a `.env` file in the backend root directory, alongside `manage.py`.

Example:

```env
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-gmail-app-password
```

Use your Gmail App Password for SMTP authentication.

Never commit your `.env` file or credentials to GitHub.

Make sure Django settings load these environment variables.

## 7. Apply Database Migrations

Run:

```powershell
python manage.py makemigrations
python manage.py migrate
```

If migration files already exist in the repository, normally you only need:

```powershell
python manage.py migrate
```

## 8. Create Superuser

To access the Django administration panel:

```powershell
python manage.py createsuperuser
```

Follow the instructions to create your admin account.

---

# ▶️ Running the Backend

After completing the initial setup, use the following commands whenever you want to start the backend.

### Step 1: Navigate to Backend

```powershell
cd D:\TCH\backend
```

### Step 2: Activate Virtual Environment

```powershell
.\venv\Scripts\Activate.ps1
```

### Step 3: Start Django Server

```powershell
python manage.py runserver
```

Your backend will run at:

**Backend URL:**

```text
http://127.0.0.1:8000/
```

**API Base URL:**

```text
http://127.0.0.1:8000/api/
```

**Django Admin Panel:**

```text
http://127.0.0.1:8000/admin/
```

**Authentication APIs:**

```text
http://127.0.0.1:8000/api/auth/
```

**Events APIs:**

```text
http://127.0.0.1:8000/api/events/
```

Keep the terminal running while accessing the APIs.

---

# 🔑 Authentication & Authorization

TCH uses JWT (JSON Web Token) authentication through Django REST Framework Simple JWT.

### Authentication Flow

1. A user registers on the website.
2. Django creates the user account.
3. A verification email is sent.
4. The user verifies their email.
5. The user logs in.
6. The backend returns JWT access and refresh tokens.
7. The access token is used to access protected APIs.

### Authorization Header

For authenticated API requests, include:

```http
Authorization: Bearer <access_token>
```

### User Roles

TCH currently supports the following roles:

| Role        | Access                                                     |
| ----------- | ---------------------------------------------------------- |
| Admin       | Complete website and backend management                    |
| Core Team   | Event and club management functionality                    |
| Club Member | Member profile, event registration and personal activities |
| Public      | Publicly accessible website information                    |

API access is controlled through authentication and permission classes.

---

# 📡 API Documentation

The following sections describe the main APIs implemented in the backend.

## 1. Authentication & Member APIs

**Base URL:**

```text
http://127.0.0.1:8000/api/auth/
```

| Method | Endpoint                | Description                             |
| ------ | ----------------------- | --------------------------------------- |
| POST   | `/register/`            | Register a new club member              |
| POST   | `/verify-email/`        | Verify email address                    |
| POST   | `/login/`               | Login and obtain JWT tokens             |
| POST   | `/token/refresh/`       | Refresh access token                    |
| POST   | `/resend-verification/` | Resend verification email               |
| GET    | `/me/`                  | Retrieve logged-in user's profile       |
| PATCH  | `/me/`                  | Update user profile                     |
| GET    | `/core-team/`           | Retrieve core team members              |
| POST   | `/core-team/assign/`    | Assign a verified member to a core team |

**Access:**

* Registration: Public.
* Email verification: Public.
* Login: Public, subject to email verification.
* Token refresh: Valid refresh token required.
* Profile APIs: Authenticated users.
* Core team management: Authorized Admin users.

---

# 2. Events Management APIs

**Base URL:**

```text
http://127.0.0.1:8000/api/events/
```

These APIs manage the complete lifecycle of club events.

### A. Event CRUD APIs

| Method | Endpoint       | Description                | Access                                                 |
| ------ | -------------- | -------------------------- | ------------------------------------------------------ |
| GET    | `/`            | Retrieve events            | Public/Authorized users, according to event visibility |
| POST   | `/`            | Create a new event         | Admin, Core Team                                       |
| GET    | `/{event_id}/` | Retrieve event details     | Public/Authorized users, according to event visibility |
| PUT    | `/{event_id}/` | Completely update an event | Admin, Core Team                                       |
| PATCH  | `/{event_id}/` | Partially update an event  | Admin, Core Team                                       |
| DELETE | `/{event_id}/` | Delete an event            | Admin, Core Team                                       |

### B. Event Registration APIs

These APIs allow club members to register for events and manage their registrations.

| Method | Endpoint                                   | Description                               | Access           |
| ------ | ------------------------------------------ | ----------------------------------------- | ---------------- |
| GET    | `/my-registrations/`                       | Retrieve logged-in member's registrations | Club Member      |
| POST   | `/{event_id}/register/`                    | Register for an event                     | Club Member      |
| POST   | `/{event_id}/cancel-registration/`         | Cancel own registration                   | Club Member      |
| GET    | `/{event_id}/participants/`                | Retrieve event participants               | Admin, Core Team |
| PATCH  | `/registrations/{registration_id}/status/` | Update registration status                | Admin, Core Team |

### C. Event Organizer APIs

These APIs manage the organizers assigned to individual events.

| Method | Endpoint                      | Description                   | Access           |
| ------ | ----------------------------- | ----------------------------- | ---------------- |
| GET    | `/{event_id}/organizers/`     | Retrieve event organizers     | Admin, Core Team |
| POST   | `/{event_id}/organizers/`     | Assign organizers to an event | Admin, Core Team |
| PATCH  | `/organizers/{organizer_id}/` | Update organizer information  | Admin, Core Team |
| DELETE | `/organizers/{organizer_id}/` | Remove an organizer           | Admin, Core Team |

**Important:** Only eligible core team members can be assigned as event organizers.

### D. Event Attendance APIs

These APIs manage and track attendance for registered participants.

| Method | Endpoint                         | Description                            | Access           |
| ------ | -------------------------------- | -------------------------------------- | ---------------- |
| GET    | `/my-attendance/`                | Retrieve logged-in member's attendance | Club Member      |
| GET    | `/{event_id}/attendance/`        | Retrieve event attendance list         | Admin, Core Team |
| PATCH  | `/attendance/{registration_id}/` | Update individual attendance           | Admin, Core Team |
| POST   | `/{event_id}/attendance/bulk/`   | Update attendance in bulk              | Admin, Core Team |

### E. Event Gallery & Media APIs

These APIs manage event images and banners.

| Method | Endpoint               | Description                      | Access                                           |
| ------ | ---------------------- | -------------------------------- | ------------------------------------------------ |
| GET    | `/{event_id}/gallery/` | Retrieve event gallery           | Public/Authorized users, according to visibility |
| POST   | `/{event_id}/gallery/` | Upload event images              | Admin, Core Team                                 |
| PATCH  | `/gallery/{image_id}/` | Update gallery image information | Admin, Core Team                                 |
| DELETE | `/gallery/{image_id}/` | Delete gallery image             | Admin, Core Team                                 |
| PATCH  | `/{event_id}/banner/`  | Update event banner              | Admin, Core Team                                 |

### F. Event Analytics APIs

These APIs provide event statistics and management insights.

| Method | Endpoint                 | Description                         | Access           |
| ------ | ------------------------ | ----------------------------------- | ---------------- |
| GET    | `/analytics/`            | Retrieve overall event analytics    | Admin, Core Team |
| GET    | `/{event_id}/analytics/` | Retrieve individual event analytics | Admin, Core Team |

### G. CSV Export APIs

These APIs allow authorized users to export event statistics.

| Method | Endpoint                        | Description                              | Access           |
| ------ | ------------------------------- | ---------------------------------------- | ---------------- |
| GET    | `/analytics/export/`            | Export overall event analytics as CSV    | Admin, Core Team |
| GET    | `/{event_id}/analytics/export/` | Export individual event analytics as CSV | Admin, Core Team |

**Note:** Export endpoints return CSV files rather than regular JSON responses.

---

# 📊 Events API Summary

The Events module currently contains 28 REST API operations.

| Module                | Number of APIs |
| --------------------- | -------------: |
| Event CRUD            |              6 |
| Event Registrations   |              5 |
| Event Organizers      |              4 |
| Attendance Management |              4 |
| Gallery & Media       |              5 |
| Event Analytics       |              2 |
| CSV Exports           |              2 |
| **Total**             |         **28** |

---

# 🔄 Event Management Workflow

The general event management workflow is:

1. Admin/Core Team creates an event.
2. Admin/Core Team updates event details and banner.
3. Organizers are assigned to the event.
4. Club members view published events.
5. Club members register for events.
6. Admin/Core Team manages registrations and participants.
7. Attendance is marked individually or in bulk.
8. Event images are uploaded to the gallery.
9. Admin/Core Team views event analytics.
10. Reports are exported as CSV files.

---

# 🧪 Testing APIs

You can test the backend APIs using:

* Postman
* Thunder Client (VS Code extension)
* React frontend

### Example: Testing Login

**Request:**

```http
POST http://127.0.0.1:8000/api/auth/login/
```

**Example JSON Body:**

```json
{
    "email": "your-email@example.com",
    "password": "your-password"
}
```

Use the access token returned by the login API for protected endpoints.

### Example: Accessing Events

```http
GET http://127.0.0.1:8000/api/events/
```

### Example: Creating an Event

```http
POST http://127.0.0.1:8000/api/events/
```

Include the JWT authorization header and the event data required by the serializer.

---

# ⚙️ Useful Django Commands

| Purpose              | Command                                    |
| -------------------- | ------------------------------------------ |
| Start server         | `python manage.py runserver`               |
| Check configuration  | `python manage.py check`                   |
| Create migrations    | `python manage.py makemigrations`          |
| Apply migrations     | `python manage.py migrate`                 |
| Check migrations     | `python manage.py showmigrations`          |
| Create superuser     | `python manage.py createsuperuser`         |
| Open Django shell    | `python manage.py shell`                   |
| Run tests            | `python manage.py test`                    |
| Collect static files | `python manage.py collectstatic --noinput` |

---

# 🖥️ Running Frontend & Backend Together

TCH has separate frontend and backend applications.

### Terminal 1: Backend

```powershell
cd D:\TCH\backend

.\venv\Scripts\Activate.ps1

python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

### Terminal 2: Frontend

```powershell
cd D:\TCH\frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173/
```

Both servers must be running during local development.

---

# 🐛 Troubleshooting

### 1. Backend Server Not Starting

Run:

```powershell
python manage.py check
```

Check the terminal for Django configuration errors.

### 2. Database Migration Errors

Run:

```powershell
python manage.py showmigrations
python manage.py migrate
```

### 3. Email Verification Not Working

Check:

* Gmail SMTP configuration.
* `.env` variables.
* Gmail App Password.
* Django email settings.

### 4. Frontend Cannot Access Backend

Check:

* Django server is running.
* Frontend API base URL is correct.
* CORS configuration is correct.
* Browser Network tab for API errors.

### 5. Unauthorized API Requests

Check:

* Access token is valid.
* Authorization header is present.
* User has the required role.
* User account is verified.

---

# 🔒 Security Guidelines

* Never commit `.env` files.
* Never expose secret keys or email credentials.
* Use JWT authentication for protected APIs.
* Apply role-based permissions to management APIs.
* Keep `DEBUG = False` in production.
* Configure `ALLOWED_HOSTS` properly.
* Use HTTPS in production.
* Validate uploaded files.
* Protect sensitive member information.

---

# 👨‍💻 Development

For development, make sure you:

1. Pull the latest repository changes.
2. Activate the virtual environment.
3. Install newly added dependencies if required.
4. Apply database migrations.
5. Start the Django development server.
6. Test APIs before integrating them into the frontend.

**Backend:** Django + Django REST Framework

**Frontend:** React.js + Vite

**Project:** The Coders Hub (TCH)


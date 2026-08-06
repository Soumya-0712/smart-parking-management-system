# Smart Parking Management System

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Express.js](https://img.shields.io/badge/Express.js-5.x-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![Swagger](https://img.shields.io/badge/API%20Docs-Swagger-85EA2D)
![License](https://img.shields.io/badge/License-MIT-yellow)

A full-stack Smart Parking Management System designed to streamline urban parking through real-time slot management, secure vehicle registration, online booking, digital payments, and QR code-based entry and exit.

The project is being developed with a scalable backend architecture using Node.js, Express.js, Prisma ORM, and PostgreSQL, following production-oriented development practices.

## 📖 Overview

The Smart Parking Management System is a production-oriented backend application designed to digitize parking operations. It supports secure user authentication with email verification, vehicle management, online booking, Razorpay payment integration, QR code-based vehicle entry and exit, automatic booking expiry, intelligent overstay handling, and admin analytics — all documented through an interactive Swagger (OpenAPI) interface.

The project follows a layered architecture and emphasizes scalability, security, and maintainability using modern backend development practices.

## 🌟 Project Highlights

- Production-oriented layered backend architecture
- JWT Authentication with Email Verification
- Password Recovery Workflow
- Role-Based Access Control (RBAC)
- QR Code-Based Parking Check-In
- Razorpay Payment Integration (backend implemented)
- Automatic Booking Expiry Scheduler
- Overstay Detection & Billing
- Admin Dashboard & Analytics
- Swagger (OpenAPI) Documentation
- Prisma ORM with PostgreSQL

## ✨ Features

### ✅ Implemented

#### Authentication & Authorization

- User Registration
- Email Verification
- Resend Verification Email
- User Login
- Forgot Password
- Reset Password
- JWT Authentication
- Role-Based Access Control (RBAC)
- Ownership-Based Authorization

#### Parking Management

- Parking Lot CRUD
- Parking Slot CRUD
- Vehicle Management
- Real-Time Slot Status Management

#### Booking Management

- Create Booking
- Get Booking Details
- Cancel Booking
- Transaction-Based Booking Creation
- Race Condition Protection
- Automatic Booking Expiry
- QR-Based Booking Confirmation

#### Payment System

- Razorpay Order Creation
- Secure Payment Verification
- Multi-Payment Architecture
- Booking Payments
- Overstay Payments

> ⚠️ **Note:** The payment flow is fully implemented on the backend (order creation, signature verification, transaction-safe status updates), but end-to-end testing is still pending frontend integration. Treat this module as backend-complete but not yet production-verified.

#### Smart Parking Workflow

- QR Token Generation
- QR Code Generation
- QR-Based Check-In
- QR-Based Check-Out
- Grace Period Support
- Automatic Overstay Calculation
- Automatic Slot Release

#### Admin & Documentation

- Admin Dashboard APIs
- Booking & Revenue Statistics
- Swagger (OpenAPI) Documentation

### 🚀 Future Enhancements

- Google Maps Integration
- Real-Time Slot Availability (WebSockets)
- Admin Dashboard Frontend
- React Frontend
- Docker Deployment
- CI/CD Pipeline

## 🚀 Production Features

- Layered Architecture (Routes → Controllers → Services → Database)
- Transaction-Based Database Operations
- Race Condition Protection
- Soft Delete Strategy
- Ownership-Based Authorization
- QR-Based Secure Check-In
- Automatic Booking Expiry Scheduler
- Grace Period & Overstay Handling
- Multi-Payment Architecture
- Secure Razorpay Signature Verification
- Modular Service Design
- Swagger (OpenAPI) Documentation
- Interactive API Testing

## ⚙️ Installation

```bash
git clone <repository-url>

cd Smart-Parking-Management-System/backend

npm install

cp .env.example .env

npx prisma migrate dev

npm run dev
```

After copying `.env.example` to `.env`, fill in your own values (database credentials, JWT secret, Razorpay keys, Nodemailer/Mailtrap credentials, etc.) before starting the server.

## 📂 Project Structure

```text
backend/
├── node_modules/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── config/
│   │   ├── prisma.js
│   │   ├── razorpay.js
│   │   └── mail.config.js
│   ├── constants/
│   ├── controllers/
│   ├── docs/
│   ├── helpers/
│   ├── jobs/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── templates/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── prisma.config.ts
└── tsconfig.json
docs/
frontend/
.gitignore
LICENSE
README.md
```

> **Note:** `.env` holds real secrets and is git-ignored — never commit it. `.env.example` lists the required variable names with empty/placeholder values so anyone cloning the repo knows what to configure.

## 🏛 Architecture

```text
            Client
               │
               ▼
        Express Routes
               │
               ▼
         Controllers
               │
               ▼
           Services
               │
               ▼
          Prisma ORM
               │
               ▼
          PostgreSQL
```

## 📘 API Documentation

The backend APIs are documented using **Swagger (OpenAPI 3.0)**.

During development, the interactive documentation is available at:

```text
http://localhost:5000/api-docs
```

After deployment, this endpoint will be accessible through the deployed backend URL.

## 🗄 Database Design

Core Entities

- Users
- Vehicles
- Parking Lots
- Parking Slots
- Bookings
- Payments

Relationships

- One User → Many Vehicles
- One User → Many Bookings
- One Parking Lot → Many Slots
- One Booking → Multiple Payments

## 🛠 Tech Stack

### Frontend (Planned)

- React.js
- Vite
- Axios
- Socket.IO Client

### Backend

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- Bcrypt
- Nodemailer
- Razorpay SDK
- QRCode
- Node Cron
- Swagger (OpenAPI)

### External Services

- Razorpay
- Mailtrap (Development Email Testing)
- Google Maps API (Planned)

## 🏗 Development Principles

- Layered Architecture (Routes → Controllers → Services → Database)
- RESTful API Design
- JWT Authentication
- Role-Based Access Control (RBAC)
- Ownership-Based Authorization
- Soft Delete Strategy
- Prisma ORM
- Modular Code Organization
- Error Handling with Custom API Responses

## 📦 Backend Modules

### Authentication

- Register
- Verify Email
- Resend Verification Email
- Login
- Forgot Password
- Reset Password
- Logout
- Get Current User

### Parking Lots

- Create Parking Lot
- Get Parking Lots
- Get Parking Lot by ID
- Update Parking Lot
- Soft Delete Parking Lot

### Parking Slots

- Create Parking Slot
- Get Parking Slots
- Get Parking Slot by ID
- Update Parking Slot
- Update Slot Status
- Soft Delete Parking Slot

### Vehicles

- Register Vehicle
- Get My Vehicles
- Get Vehicle by ID
- Update Vehicle
- Soft Delete Vehicle

### Bookings

- Create Booking
- Get My Bookings
- Get Booking by ID
- Cancel Booking
- QR Check-In
- QR Check-Out
- Grace Period Handling
- Overstay Calculation
- Transaction-Based Booking Processing
- Race Condition Protection
- Automatic Booking Expiry

### Payments

- Create Payment Order
- Verify Razorpay Payment
- Payment History

> Backend logic (order creation, signature verification, overstay billing) is implemented; end-to-end verification is pending frontend integration and has not yet been tested against a live checkout flow.

### Dashboard (Admin)

- Dashboard Summary
- Booking Statistics
- Revenue Statistics

## 🚧 Project Status

**Current Phase:** Backend Completed ✅

Core backend modules, authentication workflow, payment integration, admin analytics, and Swagger documentation have been implemented. Payment endpoints are complete on the backend but still await end-to-end testing once frontend integration begins.

The next phase focuses on frontend development and cloud deployment.

### Completed Modules

- Authentication & Authorization
- Email Verification
- Password Recovery
- Vehicle Management
- Parking Lot Management
- Parking Slot Management
- Booking Lifecycle
- Payment System (backend implemented; end-to-end testing pending)
- QR Check-In
- QR Check-Out
- Booking Expiry Scheduler
- Overstay Management
- Admin Dashboard APIs
- Swagger Documentation

### Currently Working On

- Frontend integration for end-to-end payment testing
- React.js frontend development

### 📌 Upcoming Modules

#### Backend

- Google Maps Integration
- Real-Time Slot Availability (WebSockets)

#### Frontend

- React.js User Portal
- React.js Admin Dashboard

#### DevOps

- Docker Containerization
- CI/CD Pipeline
- Cloud Deployment

## 🚀 Roadmap

- [x] Authentication & Authorization
- [x] Email Verification & Password Recovery
- [x] Parking Lot Management
- [x] Parking Slot Management
- [x] Vehicle Management
- [x] Booking Lifecycle
- [x] Razorpay Integration (backend; pending E2E test)
- [x] QR-Based Check-In
- [x] QR-Based Check-Out
- [x] Booking Expiry Scheduler
- [x] Overstay Management
- [x] Dashboard Analytics (incl. Booking History)
- [x] Swagger Documentation

- [ ] Google Maps Integration
- [ ] Real-Time Slot Availability
- [ ] Email Notifications (beyond auth flow)
- [ ] Admin Dashboard Frontend
- [ ] React Frontend
- [ ] Docker Deployment
- [ ] CI/CD Pipeline
- [ ] Production Deployment

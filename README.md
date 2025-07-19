# 🏋️ Gym Class Scheduling and Membership Management System

## 📘 Project Overview

The **Gym Class Scheduling and Membership Management System** is a role-based backend built with Express.js and TypeScript. It provides seamless scheduling, booking, and user management for Admins, Trainers, and Trainees. This project follows modular architecture with JWT-based authentication, and enforces business rules to ensure smooth gym operations.

---

## 🔗 Live Server URL

[👉 Click to Visit Live API Server](https://gym-scheduler-six.vercel.app/)

---

## 🛠️ Technology Stack

- **Language:** TypeScript
- **Web Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT
- **Password Hashing:** bcrypt
- **Validation:** Zod
- **Design Pattern:** Modular (MVC Inspired)

---
## Clone Repository

```bash
git clone https://github.com/Shariful134/gym-scheduler.git
cd gym-scheduler
npm install
npm run dev
```

## Install Dependencies
```ts
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## Create .env File and Setup your .env File
```ts
NODE_ENV=development
PORT=5000
DATABASE_URL=your database url link
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET = secret of your access token key
JWT_REFRESH_SECRET = secret of your refresh token key
```

## Run Development Server
step-1:
```ts
npm run build
```
step-2:
```ts
npm run start:dev
```


## 🔐 Admin Credentials for Testing

- **Email**: shariful@gmail.com
- **Password**: Shariful!23

---

## 👥 Roles and Responsibilities

- **Admin**: Manage users (Admins, Trainers, Trainees), create & manage class schedules, assign trainers.
- **Trainer**: View assigned class schedules only.
- **Trainee**: Register and book/cancel class schedules (if available).

---

## 📏 Business Rules

- ✅ Maximum **5 class schedules per day**.
- ⏱️ Each class lasts **2 hours**.
- 👥 Maximum **10 trainees** per class.
- 🚫 No double-booking in the same time slot.
- 🚷 Booking is blocked when a schedule is full.

---

## 🚀 API Endpoints

### 🔐 Auth Routes (`/api/v1/auth`)

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| POST   | `/register-admin`           | Register Admin                       |
| POST   | `/register-trainer`         | Register Trainer (Admin only)        |
| POST   | `/register-trainee`         | Register Trainee                     |
| POST   | `/login`                    | Login as user                        |
| DELETE | `/delete-trainer/:email`    | Delete Trainer by email(Admin only)  |
| GET    | `/get-user`                 | Get all users                        |
| GET    | `/get-trainer`              | Get all trainers                     |
| GET    | `/get-trainer/:email`       | Get single trainer by email (Admin)  |

---

### 📅 Schedule Routes (`/api/v1/schedule`)

| Method | Endpoint                | Description                                     |
|--------|-------------------------|-------------------------------------------------|
| POST   | `/create`               | Create class schedule (Admin only)              |
| PATCH  | `/update/:id`           | Update class schedule (Admin only)              |
| DELETE | `/delete/:id`           | Delete class schedule (Admin only)              |
| GET    | `/getSingle/:id`        | Get a single class schedule                     |
| GET    | `/getAll`               | Get all class schedules                         |
| GET    | `/get-assignedTrainer`  | Get trainer's assigned schedules (Trainer only) |

---

### 📦 Booking Routes (`/api/v1/booking`)

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| POST   | `/create`        | Create booking (Trainee only)      |
| PATCH  | `/update/:id`    | Update booking (Trainee only)      |
| PATCH  | `/cancel/:id`    | Cancel booking (Trainee only)      |
| DELETE | `/delete/:id`    | Delete booking (Trainee only)      |
| GET    | `/get`           | Get all bookings                   |
| GET    | `/get/:id`       | Get a single booking by id              |

---

## 🧪 Testing Instructions

1. Use provided Admin credentials to log in.
2. Register trainers and trainees.
3. As Admin, create max 5 class schedules per day.
4. As Trainee, book classes ensuring availability.
5. As Trainer, view assigned schedules.

---

## 🧱 Database Schema

### 👤 User Model

```ts
{
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'Trainer' | 'Trainee';
}
```
### 👤 Class Scheduling model

```ts
{
    "title": "Gentle Stretch & Relax",
    "day": "Sunday",
    "date": "2025-09-09",
    "startTime": "09:00 AM",
    "endTime": "11:00 AM",
    "trainerId": "687aad1e037e372a6d6479e1",
    "bookedTrainees": [],
    "createdBy": "687aa981037e372a6d647998"
}
```
### 👤 Booking model

```ts
{
    "trainerId": "687aab54037e372a6d6479a4",
    "traineeId": "687aaceb037e372a6d6479dc",
    "scheduleId": "687ab3f25f46096eaf0090c9",
    "status": "confirmed"
}
```
### Sample of Response:
- Success Response:
```ts
{
    "success": true,
    "statusCode": 201,
    "message": "Class booked successfully"
      "Data":[display the response data]
}
```

- For Validation Errors:
```ts
{
    "success": false,
    "message": "Validation error occurred.",
    "errorDetails": {
        "field": "email",
        "message": "Invalid email format."
    }
}

```

- Unauthorized Access:
```ts
{
    "success": false,
    "message": "Unauthorized access.",
    "errorDetails": "You must be an admin to perform this action."
}
```

- Booking Limit Exceeded:
```ts
{
    "success": false,
    "message": "Class schedule is full. Maximum 10 trainees allowed per schedule."
}

```









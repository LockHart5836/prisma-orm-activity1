# Prisma ORM Activity 1

Database initialization and model creation using Prisma ORM.

## Project Overview

This project implements a database system with three main models:
- Account
- Profile
- Module

The implementation satisfies the following conditions:
- Account and Profile are created simultaneously
- Modules can be added to existing Accounts
- Data can be retrieved showing Accounts with their associated Profiles and Modules

## Database Schema

The database includes the following models:

### Account
- id (PK)
- email
- username
- password
- createdAt
- updatedAt

### Profile
- id (PK)
- userId (FK to Account)
- lastname
- middlename
- firstname
- suffix
- bio
- picture
- createdAt
- updatedAt

### Module
- recID (PK)
- accountCode (FK to Account)
- moduleCode
- moduleDetails
- moduleDesc
- createdAt
- updatedAt

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure your database connection in `.env`
4. Run migrations: `npx prisma migrate dev --name init`
5. Run the application: `node runAllActions.js`

## Implemented Actions

1. Create Account and Profile simultaneously
2. Add Modules to existing Accounts
3. Retrieve Accounts with associated Profiles and Modules

## Technologies Used

- Node.js
- Prisma ORM
- MySQL

## Technologies Used
- Create your own .env file
- The .env.example file is an example only

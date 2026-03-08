# Simple Leave Management System - Frontend

This is the frontend application for the Simple Leave Management System, built with **Vue 3**, **Vite**, and **Tailwind CSS**. It provides a clean, responsive, and user-friendly interface for employees to manage their leave requests and for administrators to review them.

## Features

- **User Authentication**: Secure login and logout functionality for employees and administrators.
- **Employee Dashboard**: 
  - View current leave balances (e.g., Annual, Sick, Casual).
  - Submit new leave requests specifying dates and reasons.
  - Track the status of past and pending leave requests.
- **Manager/Admin Dashboard**: 
  - View a centralized list of all employee leave requests.
  - Approve or reject pending leave applications.
- **Responsive Design**: fully responsive UI built with Tailwind CSS, accessible on mobile and desktop devices.
- **State Management**: Robust state handling using Pinia.
- **Client-Side Routing**: Smooth navigation using Vue Router.

## Technologies Used

- [Vue 3](https://vuejs.org/) (Composition API & `<script setup>`)
- [Vite](https://vitejs.dev/) - Fast build tool and development server
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [Vue Router](https://router.vuejs.org/) - Official router for Vue.js
- [Pinia](https://pinia.vuejs.org/) - Intuitive, type safe and flexible Store for Vue
- [Axios](https://axios-http.com/) - Promise-based HTTP client for the API calls

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v16 or higher recommended) installed on your machine.

## Getting Started

Follow these steps to set up and run the frontend project locally:

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root of the `frontend` directory (if not already present) and add the necessary configuration, such as the backend API URL. For instance:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application in your browser:**
   The development server will typically run on `http://localhost:5173`. Check your terminal output for the exact local URL.

## Building for Production

To create a production-ready build, run:
```bash
npm run build
```
The compiled assets will be generated in the `dist` folder. You can preview the production build locally using:
```bash
npm run preview
```

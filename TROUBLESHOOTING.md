# Troubleshooting Guide: Server Not Responding

## Problem
When you try to login, you get the error "server is not responding, check if backend is running".

## Root Cause
The frontend client cannot connect to the backend server because the server is not running.

## Solution

### Step 1: Start the backend server

1. Open a new Command Prompt or Terminal
2. Navigate to the server directory:
   ```bash
   cd C:\Users\Kristel\Desktop\GITHUB_PROJECTS\BARANGAY-SMART-SYSTEM\server
   ```
3. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Step 2: Verify server is running

You should see a message like:
```
Server running on port 5000
```

### Step 3: Start the frontend client

1. Open another Command Prompt or Terminal
2. Navigate to the client directory:
   ```bash
   cd C:\Users\Kristel\Desktop\GITHUB_PROJECTS\BARANGAY-SMART-SYSTEM\client\client
   ```
3. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
4. Start the client:
   ```bash
   npm run dev
   ```

### Step 4: Common Issues and Fixes

#### Issue 1: Port already in use
**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
1. Change the port in `server/.env` from `PORT = 5000` to `PORT = 5001`
2. Update the client configuration in `client/client/.env`:
   ```
   VITE_REACT_APP_API_URL=http://localhost:5001
   ```

#### Issue 2: Database connection failed
**Error:** `ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost'`

**Solution:**
1. Check your MySQL password in `server/.env`
2. Make sure MySQL server is running
3. Verify the password matches your MySQL Workbench password

#### Issue 3: MySQL server not running
**Solution:**
1. Open MySQL Workbench
2. Start the MySQL server if it's not running
3. Test the connection

### Step 5: Verify everything is working

1. Open your browser to `http://localhost:5173` (or the port your Vite client is running on)
2. Try to login again
3. The error should be resolved

## Configuration Summary

- **Backend Server:** Runs on port 5000 (configurable in `server/.env`)
- **Frontend Client:** Runs on port 5173 (Vite default)
- **Client API URL:** `http://localhost:5000` (configurable in `client/client/.env`)
- **Database:** MySQL on localhost:3306

## Quick Start Commands

**Terminal 1 (Backend):**
```bash
cd C:\Users\Kristel\Desktop\GITHUB_PROJECTS\BARANGAY-SMART-SYSTEM\server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd C:\Users\Kristel\Desktop\GITHUB_PROJECTS\BARANGAY-SMART-SYSTEM\client\client
npm run dev
```
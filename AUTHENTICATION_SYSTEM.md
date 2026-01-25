# Barangay Digital Portal - Authentication System

## 🏗️ System Architecture

### Account Types

1. **Resident Accounts** (`role: 'resident'`)
   - Individual residents of the barangay
   - Can register publicly through the website
   - Format: `firstname lastname` (e.g., "Maria Santos")
   - Email: Personal email addresses

2. **Barangay Entity Accounts** (`role: 'admin'`)
   - Represents entire barangay as an administrative entity
   - Created only by municipality administrators
   - Format: `Barangay [Name]` (e.g., "Barangay Tabao")
   - Email: Official barangay emails (e.g., `barangaytabao@municipality.com`)

## 🔐 Authentication Flow

### Public Registration (Residents Only)
- **Endpoint:** `POST /api/auth/register`
- **Access:** Public
- **Creates:** Resident accounts only
- **Fields:** firstName, lastName, email, password

### Login System
- **Endpoint:** `POST /api/auth/login`
- **Supports:** Both resident and barangay accounts
- **Auto-detection:** Based on account role in database
- **Returns:** JWT token + user data

### Barangay Account Creation
- **Method:** Municipality admin only (not through public API)
- **Purpose:** Create official barangay entity accounts
- **Security:** Higher password requirements (8+ characters)

## 🎯 Current Implementation

### Database Schema
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,           -- "John Doe" or "Barangay Tabao"
  email VARCHAR(100) UNIQUE NOT NULL,   -- Personal or official barangay email
  password VARCHAR(255) NOT NULL,       -- Hashed password
  role ENUM('resident', 'admin') DEFAULT 'resident',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### API Endpoints

#### Register Resident
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "Maria",
  "lastName": "Santos", 
  "email": "maria@gmail.com",
  "password": "password123"
}
```

#### Login (Both Types)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "barangaytabao@municipality.com",
  "password": "BarangayTabao2024!",
  "userType": "barangay"  // or "resident"
}
```

## 🌐 Frontend Components

### Registration
- **Modal:** `registermodal.jsx` - Resident registration only
- **Page:** `register.jsx` - Standalone resident registration
- **Features:** 
  - Password confirmation
  - Real-time validation
  - Success/error handling
  - Info box explaining resident-only registration

### Login
- **Modal:** `loginmodal.jsx` - General login (auto-detects account type)
- **Page:** `login.jsx` - Standalone resident login
- **Barangay:** `BarangayLogin.jsx` - Dedicated barangay entity login
- **Features:**
  - Password visibility toggle
  - Account type validation
  - Proper error messages
  - Loading states

## 🔒 Security Features

### Password Security
- **Residents:** Minimum 6 characters
- **Barangay:** Minimum 8 characters
- **Hashing:** bcrypt with 10 salt rounds
- **Storage:** Never stored in plain text

### JWT Tokens
- **Expiry:** 24 hours
- **Payload:** userId, email, role, isBarangay flag
- **Secret:** Environment variable `JWT_SECRET`

### Access Control
- **Role-based:** Automatic role detection
- **Validation:** Server-side user type verification
- **Separation:** Dedicated login portals for different user types

## 📊 Current Test Data

### Barangay Accounts (Created)
1. **Barangay Tabao**
   - Email: `barangaytabao@municipality.com`
   - Password: `BarangayTabao2024!`

2. **Barangay San Jose**
   - Email: `barangaysanjose@municipality.com`
   - Password: `BarangaySanJose2024!`

### Resident Accounts (Can be created via registration)
- Any resident can register with personal details
- Automatic role assignment as 'resident'

## 🚀 Key Benefits

1. **Clear Separation:** Residents vs Barangay entities
2. **Security:** Municipality controls barangay account creation
3. **Scalability:** Easy to add more barangays
4. **User Experience:** Dedicated portals for different user types
5. **Administrative Control:** Centralized barangay account management

## 🔄 Future Enhancements

1. **Municipality Admin Panel:** For creating/managing barangay accounts
2. **Password Reset:** Email-based password recovery
3. **Account Verification:** Email verification for residents
4. **Audit Logging:** Track login attempts and account activities
5. **Multi-factor Authentication:** Enhanced security for barangay accounts

---

**Status:** ✅ Fully Implemented and Tested
**Last Updated:** January 2025
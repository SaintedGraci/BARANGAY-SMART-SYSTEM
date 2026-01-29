# 📱 Municipality of Alicia - React Native App

A modern React Native mobile application for the Municipality of Alicia Digital Portal, built with Expo and TypeScript.

## ✨ Features Implemented

### 🔐 **Authentication System**
- **Login Screen** with email/password validation
- **Auto-login** using AsyncStorage (like localStorage)
- **JWT Token Management** for secure API calls
- **Error Handling** with user-friendly messages
- **Loading States** with activity indicators

### 🏠 **Home Dashboard**
- **Welcome Header** with Municipality branding
- **Statistics Cards** showing active requests and completed documents
- **Services Grid** displaying 4 main municipal services
- **Quick Actions** for emergency reports, documents, and contacts
- **Logout Functionality** with confirmation dialog

### 🎨 **Modern UI/UX**
- **Linear Gradients** for beautiful backgrounds
- **Ionicons** for consistent iconography
- **Responsive Design** optimized for mobile devices
- **Smooth Animations** and touch feedback
- **Municipality Branding** consistent with web version

## 🚀 Getting Started

### **Prerequisites**
- Node.js (16+ recommended)
- Expo CLI: `npm install -g @expo/cli`
- Expo Go app on your phone (for testing)

### **Installation**

1. **Navigate to React Native app:**
   ```bash
   cd MyReactNativeApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on device:**
   - **Phone**: Scan QR code with Expo Go app
   - **Android Emulator**: Press `a`
   - **iOS Simulator**: Press `i` (Mac only)
   - **Web**: Press `w`

## 🔧 Configuration

### **Update Server URL**
In `app/login.tsx`, change the API URL to your server's IP:

```typescript
// Change this line:
const API_BASE_URL = 'http://192.168.1.100:5000/api';

// To your computer's IP address:
const API_BASE_URL = 'http://YOUR_IP_ADDRESS:5000/api';
```

### **Find Your IP Address:**
```bash
# Windows Command Prompt:
ipconfig

# Look for "IPv4 Address" under your network adapter
# Example: 192.168.1.100
```

## 📁 Project Structure

```
MyReactNativeApp/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # 🏠 Home Dashboard
│   │   ├── explore.tsx        # 🔍 Explore Tab
│   │   └── _layout.tsx        # Tab Navigation
│   ├── login.tsx              # 🔐 Login Screen
│   ├── index.tsx              # 🚀 App Entry Point
│   └── _layout.tsx            # Root Navigation
├── assets/                    # 🖼️ Images and icons
├── components/                # 🧩 Reusable components
└── package.json               # 📦 Dependencies
```

## 🔄 App Flow

### **1. App Launch (`app/index.tsx`)**
- Checks if user has saved login token
- Redirects to Login or Home accordingly

### **2. Login Screen (`app/login.tsx`)**
- Email/password form with validation
- API call to your Node.js server
- Saves JWT token on successful login
- Navigates to Home dashboard

### **3. Home Dashboard (`app/(tabs)/index.tsx`)**
- Shows Municipality of Alicia branding
- Displays user statistics and services
- Provides quick actions for common tasks
- Logout functionality

## 🔌 API Integration

The app connects to your existing Node.js server:

### **Login Endpoint:**
```typescript
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123",
  "userType": "resident"
}
```

### **Response:**
```typescript
{
  "success": true,
  "token": "jwt_token_here",
  "user": { /* user data */ }
}
```

## 📱 Testing Your App

### **1. Start Your Server**
Make sure your Node.js server is running:
```bash
cd server
npm start  # Should run on port 5000
```

### **2. Update IP Address**
Change `API_BASE_URL` in `login.tsx` to your computer's IP

### **3. Test Login**
Use existing resident account from your database:
- Email: `resident@example.com`
- Password: `password123`

### **4. Test Features**
- ✅ Login with valid credentials
- ✅ Auto-redirect to dashboard
- ✅ View services and statistics
- ✅ Logout functionality
- ✅ Auto-redirect to login after logout

## 🎯 Key React Native Concepts Used

### **Navigation (Expo Router)**
```typescript
import { router } from 'expo-router';

// Navigate to login
router.replace('/login');

// Navigate to home
router.replace('/(tabs)');
```

### **State Management**
```typescript
const [email, setEmail] = useState('');
const [loading, setLoading] = useState(false);
```

### **Local Storage (AsyncStorage)**
```typescript
// Save data
await AsyncStorage.setItem('token', token);

// Get data
const token = await AsyncStorage.getItem('token');

// Remove data
await AsyncStorage.removeItem('token');
```

### **HTTP Requests (Axios)**
```typescript
const response = await axios.post(`${API_BASE_URL}/auth/login`, {
  email,
  password,
  userType: 'resident',
});
```

### **Styling**
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  // ... more styles
});
```

## 🎨 Design System

### **Colors (matching web version):**
- **Primary Blue**: `#2563EB`
- **Primary Blue Dark**: `#1E40AF`
- **Success Green**: `#10B981`
- **Error Red**: `#EF4444`
- **Warning Orange**: `#F59E0B`

### **Typography:**
- **Headers**: Bold, 24-28px
- **Body Text**: Regular, 16px
- **Captions**: Medium, 12-14px

## 🚨 Common Issues & Solutions

### **"Network Error" on Login**
- Check if your server is running on port 5000
- Update `API_BASE_URL` with correct IP address
- Make sure phone/emulator can reach your computer

### **"Unable to resolve module"**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npx expo start --clear
```

### **App won't start**
```bash
# Reset Expo cache
npx expo start --clear

# Or restart with tunnel
npx expo start --tunnel
```

## 🔄 Development Workflow

### **Making Changes:**
1. Edit files in `app/` directory
2. Save files (auto-reload in Expo Go)
3. Test on device/emulator
4. Check console for errors

### **Adding New Screens:**
1. Create new `.tsx` file in `app/`
2. Add navigation in `_layout.tsx`
3. Import and use in other screens

### **Adding Dependencies:**
```bash
npx expo install package-name
```

## 🎉 What's Next?

### **Immediate Enhancements:**
1. **Add Municipality Logo** to login and home screens
2. **Test with Real Data** from your server
3. **Customize Colors** to match municipality branding

### **Future Features:**
- Document request forms
- Push notifications for announcements
- Camera integration for document uploads
- Offline support with local database
- Biometric authentication (fingerprint/face)
- Real-time chat with officials

## 📞 Support

This React Native app provides the same functionality as your web application but optimized for mobile devices with native performance and user experience.

**Ready to test?** Run `npx expo start` and scan the QR code with Expo Go! 🚀

---

**Your Municipality of Alicia mobile app is ready for residents to access municipal services on-the-go!** 📱✨
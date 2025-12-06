# AI Price Comparison App

## 🚀 Quick Start Guide

### Running the Mobile App (Expo)

1. **Navigate to mobile folder:**
   ```bash
   cd project/apps/mobile
   ```

2. **Start Expo:**
   ```bash
   npm start
   ```

3. **Open on your device:**
   - **iPhone**: Download "Expo Go" from App Store, scan QR code
   - **Android**: Download "Expo Go" from Play Store, scan QR code
   - **iOS Simulator**: Press `i` in terminal
   - **Android Emulator**: Press `a` in terminal
   - **Web Browser**: Press `w` in terminal

### Running the Web App (Next.js)

1. **Navigate to web folder:**
   ```bash
   cd project/apps/web
   ```

2. **Start dev server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   - Go to `http://localhost:3000`

### Running the Backend API

1. **Navigate to backend folder:**
   ```bash
   cd project/backend
   ```

2. **Start server:**
   ```bash
   npm run dev
   ```

3. **API runs on:**
   - `http://localhost:3001`

## 📱 Current Features

### ✅ Implemented
- **Auth Flow**: Welcome, Login, Signup screens
- **Navigation**: Tab navigation between Home, Scan, History
- **Backend**: API routes for auth, scan, products
- **Styling**: Blue/white theme matching spec

### 🚧 Coming Soon
- Camera scanning
- Image upload
- Price comparison
- Map view
- History tracking

## 🐛 Troubleshooting

### "Something went wrong" in Expo Go
1. Stop the current server (Ctrl+C)
2. Clear cache: `npx expo start -c`
3. Scan QR code again

### Dependencies issue
```bash
cd project/apps/mobile
npx expo install --fix
```

### Can't resolve module
```bash
npm install
```

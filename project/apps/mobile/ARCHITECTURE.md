# Mobile App Architecture

## 🏗️ Current Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        App.tsx                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │            GestureHandlerRootView                 │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │         SafeAreaProvider                    │  │  │
│  │  │  ┌───────────────────────────────────────┐  │  │  │
│  │  │  │        AppProvider (Context)          │  │  │  │
│  │  │  │  • Theme (light/dark)                 │  │  │  │
│  │  │  │  • Language (en/ar)                   │  │  │  │
│  │  │  │  • User State                         │  │  │  │
│  │  │  │  • Scan History                       │  │  │  │
│  │  │  │  • Favorites                          │  │  │  │
│  │  │  │  ┌─────────────────────────────────┐  │  │  │  │
│  │  │  │  │      AppNavigator               │  │  │  │  │
│  │  │  │  └─────────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 🔀 Navigation Flow

```
AppNavigator
│
├─ Not Authenticated
│  └─ Auth Stack
│     ├─ Login Screen
│     └─ Signup Screen
│
└─ Authenticated
   └─ Main Stack
      ├─ Home Screen (with custom nav bar)
      │  ├─ Home Tab
      │  ├─ Scan Tab
      │  ├─ About Tab
      │  └─ Profile Tab
      │
      └─ Payment Screen (modal)
```

## 📦 Component Hierarchy

### HomeScreen (Custom Navigation)
```
HomeScreen
├─ Top Bar (animated)
│  ├─ Menu Button
│  ├─ Title
│  └─ Notification Button
│
├─ Pages (animated transitions)
│  ├─ Home Page
│  │  ├─ Welcome Message
│  │  ├─ Search Bar
│  │  ├─ Action Cards (horizontal scroll)
│  │  ├─ Recommended Products
│  │  ├─ Categories Grid
│  │  └─ Recent Activity
│  │
│  ├─ Scan Page
│  │  ├─ Quick Scan Input
│  │  ├─ Camera View
│  │  └─ Recent Scans
│  │
│  ├─ About Page
│  │  ├─ Hero Section
│  │  ├─ Problem Statement
│  │  ├─ Solution Cards
│  │  └─ Stats Section
│  │
│  └─ Profile Page
│     ├─ Profile Header
│     ├─ Account Section
│     ├─ Subscription Section
│     └─ Settings Section
│
├─ Bottom Navigation Bar (custom animated)
│  ├─ Home Tab
│  ├─ Scan Tab
│  ├─ About Tab
│  └─ Profile Tab
│
└─ Modals/Overlays
   ├─ Menu Drawer
   ├─ Notification Panel
   ├─ Filter Modal
   └─ Subscription Modal
```

## 🎨 Theme System

```
useTheme Hook
│
├─ Light Theme
│  ├─ primaryBlue: #1A73E8
│  ├─ background: #FFFFFF
│  ├─ text: #000000
│  └─ ...
│
└─ Dark Theme
   ├─ primaryBlue: #4A9EFF
   ├─ background: #1A1A1A
   ├─ text: #FFFFFF
   └─ ...
```

## 🔌 State Management

```
AppContext (Global State)
│
├─ Theme State
│  ├─ theme: 'light' | 'dark'
│  └─ setTheme()
│
├─ Language State
│  ├─ language: 'en' | 'ar'
│  └─ setLanguage()
│
├─ User State
│  ├─ user: User | null
│  └─ setUser()
│
├─ Scan History
│  ├─ scanHistory: ScanHistoryItem[]
│  ├─ addScanHistory()
│  ├─ removeScanHistory()
│  └─ clearScanHistory()
│
└─ Favorites
   ├─ favorites: FavoriteItem[]
   ├─ addFavorite()
   ├─ removeFavorite()
   └─ isFavorite()
```

## 🪝 Custom Hooks

```
Hooks
│
├─ useTheme()
│  ├─ colors (light/dark)
│  ├─ isDark
│  └─ setTheme()
│
├─ useScanner()
│  ├─ handleBarcodeScanned()
│  ├─ handleImageUpload()
│  ├─ handleLinkScan()
│  └─ isScanning
│
├─ useFilters()
│  ├─ filters (price, location, category, etc.)
│  ├─ openFilters()
│  ├─ closeFilters()
│  └─ resetFilters()
│
└─ useApp()
   └─ Access to AppContext
```

## 🧩 Reusable Components

```
Components Library
│
├─ ActionCard
│  └─ Gradient card with icon and text
│
├─ ProductCard
│  └─ Product display with image and tag
│
├─ FilterModal
│  └─ Bottom sheet filter modal
│
├─ Button
│  └─ Primary/Secondary button
│
└─ Input
   └─ Form input with validation
```

## 💾 Data Persistence

```
AsyncStorage
│
├─ @app_theme → 'light' | 'dark'
├─ @app_language → 'en' | 'ar'
├─ @app_user → User JSON
├─ @app_scan_history → ScanHistoryItem[] JSON
└─ @app_favorites → FavoriteItem[] JSON
```

## 🔄 Data Flow

```
User Action
    │
    ▼
Component (UI)
    │
    ├─ Uses Hook (useScanner, useTheme, etc.)
    │     │
    │     ▼
    │  Hook Logic
    │     │
    │     ▼
    └─ Updates Context (AppContext)
          │
          ├─ Updates State
          ├─ Persists to AsyncStorage
          │
          ▼
    Re-renders Components
```

## 📱 Screen Sizes & Responsiveness

- Uses `Dimensions.get('window')` for dynamic sizing
- Safe area handling with `useSafeAreaInsets()`
- Responsive layouts adapt to screen width
- Platform-specific adjustments (iOS/Android)

## 🎭 Animation System

HomeScreen uses extensive animations:
- Page transitions (opacity + translateX)
- Navigation label animations
- Icon scale animations
- Underline position animations
- Scroll-based parallax effects
- Gesture-based interactions

## 🔐 Authentication Flow

```
Not Authenticated
    │
    ├─ Login Screen
    │     │
    │     └─ onLoginSuccess()
    │           │
    │           ▼
    │      setUser(userData)
    │           │
    └─ Signup Screen    │
          │             │
          └─ onSignupSuccess()
                │       │
                └───────┘
                        │
                        ▼
                Authenticated
                        │
                        ▼
                  Home Screen
```

## 🚀 Performance Considerations

### Current Optimizations
- BlurView for glassmorphism effects
- Animated.Value for smooth animations
- useNativeDriver where possible
- ScrollView with throttling

### Future Optimizations Needed
- React.memo for list items
- useMemo for expensive calculations
- useCallback for event handlers
- FlatList for long lists (virtualization)
- Code splitting for pages
- Image optimization

## 📊 File Size Analysis

```
HomeScreen.tsx: 5,334 lines ⚠️ NEEDS SPLITTING
PaymentScreen.tsx: 350 lines ✅
LoginScreen.tsx: 463 lines ✅
SignupScreen.tsx: ~400 lines ✅
AppContext.tsx: 200 lines ✅
```

## 🎯 Next Phase Goals

1. **Break Down HomeScreen**
   - Extract HomePage (home tab content)
   - Extract ScanPage (scan tab content)
   - Extract AboutPage (about tab content)
   - Extract ProfilePage (profile tab content)
   - Keep HomeScreen as container

2. **Component Extraction**
   - MenuDrawer component
   - NotificationPanel component
   - SubscriptionModal component
   - More reusable cards

3. **Backend Integration**
   - Real API calls
   - Authentication service
   - Product search
   - Price comparison

---

**Architecture Version:** 1.0  
**Last Updated:** January 2026

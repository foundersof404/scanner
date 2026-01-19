# Migration Guide: Phase 2 Refactoring

## Overview
This guide explains the changes made in Phase 2 and how to work with the new architecture.

---

## What Changed?

### Before
```typescript
// Old: Everything in one file
import { HomeScreen } from './src/screens/main/HomeScreen';

<HomeScreen 
  userName="John Doe"
  onLogout={handleLogout}
  initialLanguage="en"
/>
```

### After
```typescript
// New: Same API, cleaner implementation
import { HomeScreen } from './src/screens/main/HomeScreen';

<HomeScreen 
  userName="John Doe"
  onLogout={handleLogout}
  initialLanguage="en"
/>
```

**Good news**: The HomeScreen API hasn't changed! Your existing code will work without modifications.

---

## New File Structure

```
src/
├── screens/
│   ├── pages/                    ← NEW
│   │   ├── HomePage.tsx
│   │   ├── ScanPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── index.ts
│   └── main/
│       ├── HomeScreen.tsx        ← REFACTORED
│       └── HomeScreen.old.tsx    ← BACKUP
├── constants/                    ← NEW
│   ├── translations.ts
│   └── mockData.ts
├── types/                        ← NEW
│   └── index.ts
├── hooks/                        ← EXISTING
│   ├── useTheme.ts
│   ├── useScanner.ts
│   ├── useFilters.ts
│   └── index.ts
├── context/                      ← EXISTING
│   └── AppContext.tsx
└── components/                   ← EXISTING
    ├── ActionCard.tsx
    ├── ProductCard.tsx
    └── FilterModal.tsx
```

---

## How to Use the New Architecture

### 1. **Working with Translations**

**Before** (duplicated in HomeScreen):
```typescript
const translations = {
  en: { home: 'Home', scan: 'Scan', ... },
  ar: { home: 'الرئيسية', scan: 'مسح', ... }
};
```

**After** (centralized):
```typescript
import { translations } from '../../constants/translations';
import { useApp } from '../../context/AppContext';

function MyComponent() {
  const { language } = useApp();
  const t = translations[language];
  
  return <Text>{t.home}</Text>;
}
```

### 2. **Working with Types**

**Before** (inline):
```typescript
interface ActivityItem {
  id: string;
  type: string;
  title: string;
  // ...
}
```

**After** (centralized):
```typescript
import { ActivityItem } from '../../types';

function MyComponent() {
  const activity: ActivityItem = {
    id: 'a1',
    type: 'scan',
    title: 'iPhone 15 Pro',
    // TypeScript will autocomplete!
  };
}
```

### 3. **Working with Mock Data**

**Before** (inline):
```typescript
const recentActivity = [
  { id: 'a1', type: 'scan', ... },
  // ...
];
```

**After** (centralized):
```typescript
import { mockRecentActivity } from '../../constants/mockData';

function MyComponent() {
  return (
    <View>
      {mockRecentActivity.map(item => (
        <ActivityItem key={item.id} {...item} />
      ))}
    </View>
  );
}
```

### 4. **Creating a New Page**

```typescript
// src/screens/pages/NewPage.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useApp } from '../../context/AppContext';
import { translations } from '../../constants/translations';

interface NewPageProps {
  onScroll?: (event: any) => void;
  scrollRef?: React.RefObject<ScrollView>;
}

export function NewPage({ onScroll, scrollRef }: NewPageProps) {
  const { colors, isDark } = useTheme();
  const { language } = useApp();
  const t = translations[language];

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={onScroll}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t.newPageTitle}
        </Text>
        {/* Your content here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});
```

Then add it to `src/screens/pages/index.ts`:
```typescript
export { HomePage } from './HomePage';
export { ScanPage } from './ScanPage';
export { AboutPage } from './AboutPage';
export { ProfilePage } from './ProfilePage';
export { NewPage } from './NewPage'; // ← Add this
```

And integrate it into HomeScreen:
```typescript
// In HomeScreen.tsx
import { HomePage, ScanPage, AboutPage, ProfilePage, NewPage } from '../pages';

// Add to navigation items
const navItems = [
  // ... existing items
  { id: 'new' as NavItem, label: t.newPage, icon: 'star' as const, inactiveIcon: 'star-outline' as const },
];

// Add animated values
const newPageOpacity = useRef(new Animated.Value(0)).current;
const newPageTranslateX = useRef(new Animated.Value(100)).current;

// Add to page states in animateToPage
const pageStates = {
  // ... existing pages
  new: { opacity: newPageOpacity, translateX: newPageTranslateX },
};

// Add page wrapper
<Animated.View
  style={[
    styles.pageWrapper,
    {
      opacity: newPageOpacity,
      transform: [{ translateX: newPageTranslateX }],
    },
  ]}
  pointerEvents={activeNav === 'new' ? 'auto' : 'none'}
>
  <NewPage />
</Animated.View>
```

---

## Common Tasks

### Adding a New Translation

1. Open `src/constants/translations.ts`
2. Add the key to both `en` and `ar` objects:

```typescript
export const translations = {
  en: {
    // ... existing translations
    myNewKey: 'My New Text',
  },
  ar: {
    // ... existing translations
    myNewKey: 'النص الجديد',
  },
};
```

3. Use it in your component:
```typescript
const t = translations[language];
<Text>{t.myNewKey}</Text>
```

### Adding a New Type

1. Open `src/types/index.ts`
2. Add your interface:

```typescript
export interface MyNewType {
  id: string;
  name: string;
  // ... other fields
}
```

3. Use it in your component:
```typescript
import { MyNewType } from '../../types';

const myData: MyNewType = { ... };
```

### Adding Mock Data

1. Open `src/constants/mockData.ts`
2. Add your data:

```typescript
export const mockMyData: MyNewType[] = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
];
```

3. Use it in your component:
```typescript
import { mockMyData } from '../../constants/mockData';

{mockMyData.map(item => <Item key={item.id} {...item} />)}
```

---

## Testing the Changes

### 1. **Run the App**
```bash
cd project/apps/mobile
npm start
```

### 2. **Test Navigation**
- Tap each bottom nav item
- Swipe left/right between pages
- Verify smooth animations

### 3. **Test Theme Toggle**
- Go to Profile page
- Toggle dark/light mode
- Verify all pages update

### 4. **Test Language Toggle**
- Go to Profile page
- Toggle English/Arabic
- Verify all text updates

### 5. **Test Each Page**
- **HomePage**: Search, filters, action cards, recommendations
- **ScanPage**: Link input, camera, image upload
- **AboutPage**: Hero, problem, solution cards, stats
- **ProfilePage**: Settings, toggles, logout

---

## Troubleshooting

### Issue: "Cannot find module '../pages'"
**Solution**: Make sure you're importing from the correct path:
```typescript
import { HomePage } from '../pages'; // ✅ Correct
import { HomePage } from './pages'; // ❌ Wrong
```

### Issue: "Property 'myKey' does not exist on type..."
**Solution**: Add the translation key to `src/constants/translations.ts` in both `en` and `ar` objects.

### Issue: "Type 'X' is not assignable to type 'Y'"
**Solution**: Check `src/types/index.ts` and make sure your data matches the interface.

### Issue: Page doesn't render
**Solution**: 
1. Check that the page is imported in HomeScreen
2. Check that the page wrapper is added with correct animations
3. Check that the nav item is added to the navItems array

---

## Rollback Plan

If you encounter critical issues, you can rollback to the old HomeScreen:

```bash
cd src/screens/main
mv HomeScreen.tsx HomeScreen.new.tsx
mv HomeScreen.old.tsx HomeScreen.tsx
```

Then restart the app. **Note**: This will lose all Phase 2 improvements.

---

## Next Steps

1. **Test thoroughly** on both iOS and Android
2. **Update tests** to work with new structure
3. **Connect to backend** (replace mock data with API calls)
4. **Add more features** (pull-to-refresh, infinite scroll, etc.)
5. **Performance monitoring** (measure render times)

---

## Questions?

If you have questions about the new architecture:

1. Read `PHASE2_COMPLETE.md` for a detailed overview
2. Read `ARCHITECTURE_PHASE2.md` for visual diagrams
3. Check the code comments in each file
4. Look at existing page components as examples

---

## Summary

✅ **No breaking changes** - existing code works as-is
✅ **Cleaner architecture** - easier to maintain
✅ **Better performance** - faster navigation
✅ **Type-safe** - fewer runtime errors
✅ **Scalable** - easy to add new features

Happy coding! 🚀

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ar';

export interface ScanHistoryItem {
    id: string;
    barcode?: string;
    imageUri?: string;
    link?: string;
    productName?: string;
    timestamp: number;
    results?: any;
}

export interface FavoriteItem {
    id: string;
    productId: string;
    productName: string;
    imageUri?: string;
    addedAt: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    subscriptionPlan?: 'standard' | 'pro' | 'premium';
}

interface AppState {
    // Theme
    theme: Theme;
    setTheme: (theme: Theme) => void;
    
    // Language
    language: Language;
    setLanguage: (language: Language) => void;
    toggleLanguage: () => void;
    
    // User
    user: User | null;
    setUser: (user: User | null) => void;
    
    // Scan History
    scanHistory: ScanHistoryItem[];
    addScanHistory: (item: ScanHistoryItem) => void;
    removeScanHistory: (id: string) => void;
    clearScanHistory: () => void;
    
    // Favorites
    favorites: FavoriteItem[];
    addFavorite: (item: FavoriteItem) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (productId: string) => boolean;
}

const AppContext = createContext<AppState | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme';
const LANGUAGE_STORAGE_KEY = '@app_language';
const USER_STORAGE_KEY = '@app_user';
const SCAN_HISTORY_STORAGE_KEY = '@app_scan_history';
const FAVORITES_STORAGE_KEY = '@app_favorites';

export function AppProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('light');
    const [language, setLanguageState] = useState<Language>('en');
    const [user, setUserState] = useState<User | null>(null);
    const [scanHistory, setScanHistoryState] = useState<ScanHistoryItem[]>([]);
    const [favorites, setFavoritesState] = useState<FavoriteItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load persisted data on mount
    useEffect(() => {
        const loadPersistedData = async () => {
            try {
                const [savedTheme, savedLanguage, savedUser, savedHistory, savedFavorites] = await Promise.all([
                    AsyncStorage.getItem(THEME_STORAGE_KEY),
                    AsyncStorage.getItem(LANGUAGE_STORAGE_KEY),
                    AsyncStorage.getItem(USER_STORAGE_KEY),
                    AsyncStorage.getItem(SCAN_HISTORY_STORAGE_KEY),
                    AsyncStorage.getItem(FAVORITES_STORAGE_KEY),
                ]);

                if (savedTheme) setThemeState(savedTheme as Theme);
                if (savedLanguage) setLanguageState(savedLanguage as Language);
                if (savedUser) setUserState(JSON.parse(savedUser));
                if (savedHistory) setScanHistoryState(JSON.parse(savedHistory));
                if (savedFavorites) setFavoritesState(JSON.parse(savedFavorites));
            } catch (error) {
                console.error('Error loading persisted data:', error);
            } finally {
                setIsInitialized(true);
            }
        };

        loadPersistedData();
    }, []);

    // Persist theme changes
    const setTheme = async (newTheme: Theme) => {
        setThemeState(newTheme);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
        } catch (error) {
            console.error('Error saving theme:', error);
        }
    };

    // Persist language changes
    const setLanguage = async (newLanguage: Language) => {
        setLanguageState(newLanguage);
        try {
            await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
        } catch (error) {
            console.error('Error saving language:', error);
        }
    };

    // Toggle language between en and ar
    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'ar' : 'en';
        setLanguage(newLanguage);
    };

    // Persist user changes
    const setUser = async (newUser: User | null) => {
        setUserState(newUser);
        try {
            if (newUser) {
                await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
            } else {
                await AsyncStorage.removeItem(USER_STORAGE_KEY);
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    // Scan History management
    const addScanHistory = async (item: ScanHistoryItem) => {
        const newHistory = [item, ...scanHistory].slice(0, 100); // Keep last 100 items
        setScanHistoryState(newHistory);
        try {
            await AsyncStorage.setItem(SCAN_HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
        } catch (error) {
            console.error('Error saving scan history:', error);
        }
    };

    const removeScanHistory = async (id: string) => {
        const newHistory = scanHistory.filter(item => item.id !== id);
        setScanHistoryState(newHistory);
        try {
            await AsyncStorage.setItem(SCAN_HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
        } catch (error) {
            console.error('Error saving scan history:', error);
        }
    };

    const clearScanHistory = async () => {
        setScanHistoryState([]);
        try {
            await AsyncStorage.removeItem(SCAN_HISTORY_STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing scan history:', error);
        }
    };

    // Favorites management
    const addFavorite = async (item: FavoriteItem) => {
        const newFavorites = [...favorites, item];
        setFavoritesState(newFavorites);
        try {
            await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    };

    const removeFavorite = async (id: string) => {
        const newFavorites = favorites.filter(item => item.id !== id);
        setFavoritesState(newFavorites);
        try {
            await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    };

    const isFavorite = (productId: string): boolean => {
        return favorites.some(item => item.productId === productId);
    };

    const value: AppState = {
        theme,
        setTheme,
        language,
        setLanguage,
        toggleLanguage,
        user,
        setUser,
        scanHistory,
        addScanHistory,
        removeScanHistory,
        clearScanHistory,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
    };

    // Always render children - don't block on initialization
    // The app will handle loading states if needed
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}

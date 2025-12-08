import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SignupScreen } from './src/screens/auth/SignupScreen';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { HomeScreen } from './src/screens/main/HomeScreen';
import { LoadingScreen } from './src/screens/LoadingScreen';

type Screen = 'signup' | 'login' | 'loading' | 'home';

export default function App() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('signup');
    const [userName, setUserName] = useState('Mhmmd');
    const [language, setLanguage] = useState<'en' | 'ar'>('en');

    const handleSignupSuccess = () => {
        setCurrentScreen('loading');
    };

    const handleLoginSuccess = () => {
        setCurrentScreen('loading');
    };

    const handleLoadingComplete = (lang: 'en' | 'ar') => {
        setLanguage(lang);
        setCurrentScreen('home');
    };

    const handleNavigateToLogin = () => {
        setCurrentScreen('login');
    };

    const handleNavigateToSignup = () => {
        setCurrentScreen('signup');
    };

    const handleLogout = () => {
        setCurrentScreen('login');
    };

    // Render the current screen
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
            {currentScreen === 'signup' && (
                <SignupScreen
                    onSignupSuccess={handleSignupSuccess}
                    onNavigateToLogin={handleNavigateToLogin}
                />
            )}
            {currentScreen === 'login' && (
                <LoginScreen
                    onLoginSuccess={handleLoginSuccess}
                    onNavigateToSignup={handleNavigateToSignup}
                />
            )}
            {currentScreen === 'loading' && (
                <LoadingScreen onComplete={handleLoadingComplete} />
            )}
            {currentScreen === 'home' && (
                <HomeScreen userName={userName} onLogout={handleLogout} initialLanguage={language} />
            )}
        </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

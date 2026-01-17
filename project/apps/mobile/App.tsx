import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SignupScreen } from './src/screens/auth/SignupScreen';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { HomeScreen } from './src/screens/main/HomeScreen';
import { PaymentScreen } from './src/screens/main/PaymentScreen';
import { LoadingScreen } from './src/screens/LoadingScreen';

type Screen = 'signup' | 'login' | 'loading' | 'home' | 'payment';

interface UserData {
    name: string;
    email: string;
    token: string;
}

export default function App() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('signup');
    const [userData, setUserData] = useState<UserData | null>(null);
    const [language, setLanguage] = useState<'en' | 'ar'>('en');
    const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<{ name: string; price: string } | null>(null);

    const handleSignupSuccess = (user: UserData) => {
        setUserData(user);
        // Skip loading screen for social signups (mock users) and go directly to home
        if (user.email.includes('@example.com') || user.token.startsWith('mock-')) {
            setLanguage('en'); // Default to English for social signups
            setCurrentScreen('home');
        } else {
            setCurrentScreen('loading');
        }
    };

    const handleLoginSuccess = (user: UserData) => {
        setUserData(user);
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
        setUserData(null);
        setCurrentScreen('login');
    };

    const handleNavigateToPayment = (plan: { name: string; price: string }) => {
        setSelectedPaymentPlan(plan);
        setCurrentScreen('payment');
    };

    const handlePaymentBack = () => {
        setCurrentScreen('home');
        setSelectedPaymentPlan(null);
    };

    const handlePaymentSuccess = () => {
        setCurrentScreen('home');
        setSelectedPaymentPlan(null);
        // You could add a success toast here if needed
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
            {currentScreen === 'home' && userData && (
                <HomeScreen 
                    userName={userData.name}
                    userToken={userData.token}
                    onLogout={handleLogout}
                    onDeleteAccount={() => {
                        setUserData(null);
                        setCurrentScreen('signup');
                    }}
                    initialLanguage={language}
                    onNavigateToPayment={handleNavigateToPayment}
                />
            )}
            {currentScreen === 'payment' && selectedPaymentPlan && (
                <PaymentScreen
                    planName={selectedPaymentPlan.name}
                    price={selectedPaymentPlan.price}
                    onBack={handlePaymentBack}
                    onSuccess={handlePaymentSuccess}
                    // Since we don't track theme in App.tsx yet, defaulting to false or we could lift state up
                    isDarkTheme={false} 
                />
            )}
        </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

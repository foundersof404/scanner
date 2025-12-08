import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SignupScreen } from './src/screens/auth/SignupScreen';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { HomeScreen } from './src/screens/main/HomeScreen';
import { PaymentScreen } from './src/screens/main/PaymentScreen';
import { LoadingScreen } from './src/screens/LoadingScreen';

type Screen = 'signup' | 'login' | 'loading' | 'home' | 'payment';

export default function App() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('signup');
    const [userName, setUserName] = useState('Mhmmd');
    const [language, setLanguage] = useState<'en' | 'ar'>('en');
    const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<{ name: string; price: string } | null>(null);

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
            {currentScreen === 'home' && (
                <HomeScreen 
                    userName={userName} 
                    onLogout={handleLogout} 
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

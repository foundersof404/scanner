import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';

// Screens - HomeScreen has its own custom navigation bar
import { HomeScreen } from '../screens/main/HomeScreen';
import { PaymentScreen } from '../screens/main/PaymentScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignupScreen } from '../screens/auth/SignupScreen';

export type RootStackParamList = {
    Auth: undefined;
    Home: undefined;
    Payment: { planName: string; price: string };
};

export type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Signup" component={SignupScreen} />
        </AuthStack.Navigator>
    );
}

// Wrapper component to pass props to HomeScreen
function HomeScreenWrapper() {
    const { user, language, setUser } = useApp();

    const handleLogout = () => {
        setUser(null);
    };

    const handleNavigateToPayment = (plan: { name: string; price: string }) => {
        // TODO: Use React Navigation to navigate to payment screen
        // For now, HomeScreen handles its own modals
    };

    return (
        <HomeScreen
            userName={user?.name || 'User'}
            onLogout={handleLogout}
            initialLanguage={language}
            onNavigateToPayment={handleNavigateToPayment}
        />
    );
}

export function AppNavigator() {
    const { user } = useApp();
    const isAuthenticated = !!user;

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                ) : (
                    <>
                        <Stack.Screen name="Home" component={HomeScreenWrapper} />
                        <Stack.Screen 
                            name="Payment" 
                            component={PaymentScreen}
                            options={{ presentation: 'modal' }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

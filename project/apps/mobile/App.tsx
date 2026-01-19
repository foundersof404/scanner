import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider, useApp } from './src/context/AppContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ErrorBoundary } from './src/components/ErrorBoundary';

// Initialize app with mock user for now (will be replaced with actual auth)
function AppContent() {
    const { user, setUser } = useApp();

    useEffect(() => {
        // Only set mock user if no user exists (not logged in)
        // This prevents overriding persisted user data
        if (!user) {
            setUser({
                id: '1',
                name: 'Mhmmd',
                email: 'user@example.com',
                subscriptionPlan: 'pro',
            });
        }
    }, [user]);

    return <AppNavigator />;
}

export default function App() {
    return (
        <ErrorBoundary>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <AppProvider>
                        <ErrorBoundary>
                            <AppContent />
                        </ErrorBoundary>
                    </AppProvider>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </ErrorBoundary>
    );
}

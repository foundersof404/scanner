import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

// Note: This navigator is not currently used. The app uses manual navigation in App.tsx
// These are placeholder components to prevent TypeScript errors

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}><Text>Home Screen</Text></View>;
}

function ScanScreen() {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}><Text>Scan Screen</Text></View>;
}

function HistoryScreen() {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}><Text>History Screen</Text></View>;
}

function WelcomePlaceholder() {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}><Text>Welcome Screen</Text></View>;
}

function LoginPlaceholder() {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}><Text>Login Screen</Text></View>;
}

function SignupPlaceholder() {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}><Text>Signup Screen</Text></View>;
}

function VerificationPlaceholder() {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}><Text>Verification Screen</Text></View>;
}

function ForgotPasswordPlaceholder() {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}><Text>Forgot Password Screen</Text></View>;
}

function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Scan" component={ScanScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
    );
}

function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomePlaceholder} />
            <Stack.Screen name="Login" component={LoginPlaceholder} />
            <Stack.Screen name="Signup" component={SignupPlaceholder} />
            <Stack.Screen name="Verification" component={VerificationPlaceholder} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordPlaceholder} />
        </Stack.Navigator>
    );
}

export function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={AuthNavigator} />
                <Stack.Screen name="Main" component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

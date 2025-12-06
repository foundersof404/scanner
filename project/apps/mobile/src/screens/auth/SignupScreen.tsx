import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

interface SignupScreenProps {
    onSignupSuccess: () => void;
    onNavigateToLogin: () => void;
}

export function SignupScreen({ onSignupSuccess, onNavigateToLogin }: SignupScreenProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleSignup = () => {
        setLoading(true);
        // Mock signup with delay
        setTimeout(() => {
            setLoading(false);
            console.log('User signed up:', { name, email });
            onSignupSuccess();
        }, 1000);
    };

    const handleGoogleSignup = () => {
        setGoogleLoading(true);
        // Mock Google signup
        setTimeout(() => {
            setGoogleLoading(false);
            console.log('User signed up with Google');
            onSignupSuccess();
        }, 800);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.logo}>
                            <Text style={styles.logoText}>P</Text>
                        </View>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>
                            Join PriceScanner and start saving money today
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <Input
                            label="Full Name"
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your full name"
                        />

                        <Input
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Input
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Create a password"
                            secureTextEntry
                        />

                        <Button
                            title="Sign Up"
                            onPress={handleSignup}
                            loading={loading}
                            disabled={!name || !email || !password}
                        />

                        <TouchableOpacity
                            style={styles.googleButton}
                            onPress={handleGoogleSignup}
                            activeOpacity={0.8}
                            disabled={googleLoading}
                        >
                            <View style={styles.googleIconCircle}>
                                <Text style={styles.googleIconLetter}>G</Text>
                            </View>
                            <Text style={styles.googleButtonText}>
                                {googleLoading ? 'Signing up...' : 'Sign up with Google'}
                            </Text>
                        </TouchableOpacity>

                        {/* Login Link */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account? </Text>
                            <TouchableOpacity onPress={onNavigateToLogin}>
                                <Text style={styles.linkText}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    logo: {
        width: 80,
        height: 80,
        backgroundColor: '#0066CC',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    logoText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0B2545',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#6B7A90',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    form: {
        flex: 1,
    },
    googleButton: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
    },
    googleIconCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    googleIconLetter: {
        fontSize: 14,
        fontWeight: '700',
        color: '#4285F4',
    },
    googleButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    footerText: {
        fontSize: 15,
        color: '#6B7A90',
    },
    linkText: {
        fontSize: 15,
        color: '#0066CC',
        fontWeight: '600',
    },
});

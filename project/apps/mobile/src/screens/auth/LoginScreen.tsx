import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

interface LoginScreenProps {
    onLoginSuccess: () => void;
    onNavigateToSignup: () => void;
}

export function LoginScreen({ onLoginSuccess, onNavigateToSignup }: LoginScreenProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [appleLoading, setAppleLoading] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const logoFloat = useRef(new Animated.Value(0)).current;

    const handleLogin = () => {
        setLoading(true);
        // Mock login with delay
        setTimeout(() => {
            setLoading(false);
            // Simple mock validation
            if (email && password) {
                console.log('User logged in:', { email });
                onLoginSuccess();
            }
        }, 1000);
    };

    const handleGoogleLogin = () => {
        setGoogleLoading(true);
        // Mock Google login
        setTimeout(() => {
            setGoogleLoading(false);
            console.log('User logged in with Google');
            onLoginSuccess();
        }, 800);
    };

    const handleAppleLogin = () => {
        setAppleLoading(true);
        // Mock Apple login
        setTimeout(() => {
            setAppleLoading(false);
            console.log('User logged in with Apple');
            onLoginSuccess();
        }, 800);
    };

    // Floating logo animation
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(logoFloat, {
                    toValue: -2,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(logoFloat, {
                    toValue: 2,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FFFFFF', '#F7F9FC']}
                style={styles.gradient}
            >
            <StatusBar style="dark" />
                <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                            {/* Header with Floating Logo */}
                    <View style={styles.header}>
                                <Animated.View 
                                    style={[
                                        styles.logoContainer,
                                        { transform: [{ translateY: logoFloat }] }
                                    ]}
                                >
                                    <View style={styles.logoGlow} />
                                    <LinearGradient
                                        colors={['#3B82F6', '#2563EB']}
                                        style={styles.logo}
                                    >
                            <Text style={styles.logoText}>P</Text>
                                    </LinearGradient>
                                </Animated.View>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>
                            Sign in to continue to PriceScanner
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                                {/* Email Input */}
                                <View style={styles.inputWrapper}>
                                    <View style={[
                                        styles.inputContainer,
                                        emailFocused && styles.inputFocused
                                    ]}>
                                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                                            placeholder="Email"
                                            placeholderTextColor="rgba(0,0,0,0.35)"
                            keyboardType="email-address"
                            autoCapitalize="none"
                                            style={styles.input}
                                            onFocus={() => setEmailFocused(true)}
                                            onBlur={() => setEmailFocused(false)}
                                        />
                                        <MaterialCommunityIcons
                                            name="email-outline"
                                            size={22}
                                            color="rgba(0,0,0,0.5)"
                                            style={styles.inputIcon}
                                        />
                                    </View>
                                </View>

                                {/* Password Input */}
                                <View style={styles.inputWrapper}>
                                    <View style={[
                                        styles.inputContainer,
                                        passwordFocused && styles.inputFocused
                                    ]}>
                                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                                            placeholder="Password"
                                            placeholderTextColor="rgba(0,0,0,0.35)"
                                            secureTextEntry={!showPassword}
                                            style={styles.input}
                                            onFocus={() => setPasswordFocused(true)}
                                            onBlur={() => setPasswordFocused(false)}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            activeOpacity={0.7}
                                            style={styles.passwordToggle}
                                        >
                                            <MaterialCommunityIcons
                                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                                size={22}
                                                color="rgba(0,0,0,0.5)"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Forgot Password */}
                                <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                                {/* Login Button */}
                                <TouchableOpacity
                                    style={[styles.primaryButton, (!email || !password) && styles.buttonDisabled]}
                            onPress={handleLogin}
                                    disabled={loading || !email || !password}
                                    activeOpacity={0.9}
                                >
                                    <LinearGradient
                                        colors={['#3B82F6', '#2563EB']}
                                        style={styles.buttonGradient}
                                    >
                                        <Text style={styles.primaryButtonText}>
                                            {loading ? 'Logging in...' : 'Log In'}
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={styles.divider}>
                                    <View style={styles.dividerLine} />
                                    <Text style={styles.dividerText}>or continue with</Text>
                                    <View style={styles.dividerLine} />
                                </View>

                                {/* Social Buttons */}
                                <View style={styles.socialContainer}>
                        <TouchableOpacity
                                        style={styles.socialButton}
                            onPress={handleGoogleLogin}
                            disabled={googleLoading}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.googleLogoText}>G</Text>
                        </TouchableOpacity>

                                    {Platform.OS === 'ios' && (
                                        <TouchableOpacity
                                            style={styles.socialButton}
                                            onPress={handleAppleLogin}
                                            disabled={appleLoading}
                                            activeOpacity={0.7}
                                        >
                                            <MaterialCommunityIcons
                                                name="apple"
                                                size={24}
                                                color="#000000"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>

                                {/* Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account? </Text>
                                    <TouchableOpacity onPress={onNavigateToSignup} activeOpacity={0.7}>
                                <Text style={styles.linkText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logoContainer: {
        marginBottom: 32,
        position: 'relative',
    },
    logoGlow: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#3B82F6',
        opacity: 0.12,
        top: -10,
        left: -10,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 10,
    },
    logoText: {
        fontSize: 48,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: -1,
    },
    passwordToggle: {
        padding: 4,
        marginLeft: 8,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 22,
        fontWeight: '500',
    },
    form: {
        width: '100%',
    },
    inputWrapper: {
        marginBottom: 14,
    },
    inputContainer: {
        backgroundColor: '#F2F5F9',
        borderRadius: 18,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    inputFocused: {
        borderColor: 'rgba(47,123,255,0.35)',
        shadowColor: '#2F7BFF',
        shadowOpacity: 0.15,
        shadowRadius: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#0F172A',
    },
    inputIcon: {
        marginLeft: 12,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 4,
        marginTop: -6,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#2563EB',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    primaryButton: {
        marginTop: 12,
        borderRadius: 18,
        height: 58,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonGradient: {
        flex: 1,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButtonText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.3,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 28,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E2E8F0',
    },
    dividerText: {
        marginHorizontal: 16,
        fontSize: 14,
        color: '#94A3B8',
        fontWeight: '500',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
    },
    socialButton: {
        width: 64,
        height: 64,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    googleLogoText: {
        fontSize: 32,
        fontWeight: '700',
        color: '#4285F4',
        textShadowColor: '#EA4335',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },
    footerText: {
        fontSize: 15,
        color: '#64748B',
        fontWeight: '500',
    },
    linkText: {
        fontSize: 15,
        color: '#2563EB',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});

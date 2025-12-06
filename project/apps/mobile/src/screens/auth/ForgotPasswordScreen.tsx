import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Input, AuthLayout } from '@repo/ui';
import { useNavigation } from '@react-navigation/native';

export function ForgotPasswordScreen() {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');

    const handleReset = () => {
        // TODO: Implement reset logic
        navigation.goBack();
    };

    return (
        <AuthLayout title="Reset Password" subtitle="Enter your email to receive a reset link">
            <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <Button title="Send Reset Link" onPress={handleReset} className="mt-4" />

            <TouchableOpacity onPress={() => navigation.goBack()} className="mt-6 self-center">
                <Text className="text-textMuted">Back to Login</Text>
            </TouchableOpacity>
        </AuthLayout>
    );
}

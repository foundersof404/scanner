import { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Input, AuthLayout } from '@repo/ui';
import { useNavigation } from '@react-navigation/native';

export function VerificationScreen() {
    const navigation = useNavigation<any>();
    const [code, setCode] = useState('');

    const handleVerify = () => {
        // TODO: Implement verification logic
        navigation.replace('Main');
    };

    return (
        <AuthLayout title="Verify Email" subtitle="Enter the code sent to your email">
            <Input
                label="Verification Code"
                placeholder="123456"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={6}
                className="text-center text-2xl tracking-widest"
            />

            <Button title="Verify" onPress={handleVerify} className="mt-4" />
        </AuthLayout>
    );
}

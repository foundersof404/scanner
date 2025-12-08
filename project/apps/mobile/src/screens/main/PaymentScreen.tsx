import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';

interface PaymentScreenProps {
    planName: string;
    price: string;
    onBack: () => void;
    onSuccess: () => void;
    isDarkTheme?: boolean;
}

export function PaymentScreen({ planName, price, onBack, onSuccess, isDarkTheme = false }: PaymentScreenProps) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const COLORS = {
        background: isDarkTheme ? '#1A1A1A' : '#FFFFFF',
        text: isDarkTheme ? '#FFFFFF' : '#000000',
        textSecondary: isDarkTheme ? '#A0A0A0' : '#6B7280',
        cardBg: isDarkTheme ? '#2A2A2A' : '#FFFFFF',
        border: isDarkTheme ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
        primary: '#E60023', // Wish Payment Red
    };

    const handleCopyNumber = async () => {
        await Clipboard.setStringAsync('70123456'); // Example number
        Alert.alert('Copied', 'Phone number copied to clipboard');
    };

    const handleConfirmPayment = () => {
        if (phoneNumber.length < 8) {
            Alert.alert('Invalid Number', 'Please enter a valid phone number');
            return;
        }

        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            Alert.alert(
                'Payment Successful',
                'Your subscription has been activated successfully!',
                [
                    { text: 'OK', onPress: onSuccess }
                ]
            );
        }, 2000);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: COLORS.text }]}>Complete Payment</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Plan Summary Card */}
                <View style={[styles.planCard, { backgroundColor: COLORS.cardBg, borderColor: COLORS.border }]}>
                    <View style={styles.planInfo}>
                        <Text style={[styles.planLabel, { color: COLORS.textSecondary }]}>Selected Plan</Text>
                        <Text style={[styles.planName, { color: COLORS.text }]}>{planName}</Text>
                    </View>
                    <View style={styles.priceInfo}>
                        <Text style={[styles.priceLabel, { color: COLORS.textSecondary }]}>Amount</Text>
                        <Text style={[styles.priceValue, { color: COLORS.primary }]}>{price}</Text>
                    </View>
                </View>

                {/* Wish Payment Section */}
                <View style={[styles.paymentCard, { backgroundColor: COLORS.cardBg, borderColor: COLORS.border }]}>
                    <View style={styles.wishHeader}>
                        <View style={styles.wishIconContainer}>
                            <MaterialCommunityIcons name="wallet" size={32} color="#FFFFFF" />
                        </View>
                        <Text style={[styles.wishTitle, { color: COLORS.text }]}>Whish Money</Text>
                    </View>

                    <Text style={[styles.instructionText, { color: COLORS.textSecondary }]}>
                        Scan the QR code or transfer the amount to the number below:
                    </Text>

                    {/* QR Code Placeholder */}
                    <View style={styles.qrContainer}>
                        <View style={styles.qrPlaceholder}>
                            <MaterialCommunityIcons name="qrcode-scan" size={80} color={COLORS.text} />
                        </View>
                    </View>

                    {/* Transfer Number */}
                    <TouchableOpacity onPress={handleCopyNumber} style={[styles.numberContainer, { borderColor: COLORS.border }]}>
                        <View>
                            <Text style={[styles.numberLabel, { color: COLORS.textSecondary }]}>Transfer to</Text>
                            <Text style={[styles.numberValue, { color: COLORS.text }]}>70 123 456</Text>
                        </View>
                        <MaterialCommunityIcons name="content-copy" size={20} color={COLORS.primary} />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    {/* User Phone Input */}
                    <Text style={[styles.inputLabel, { color: COLORS.text }]}>Enter your phone number</Text>
                    <Text style={[styles.inputSublabel, { color: COLORS.textSecondary }]}>
                        The number you used for the transfer
                    </Text>
                    
                    <View style={[styles.inputContainer, { borderColor: COLORS.border, backgroundColor: isDarkTheme ? '#1A1A1A' : '#F9FAFB' }]}>
                        <Text style={[styles.countryCode, { color: COLORS.text }]}>+961</Text>
                        <TextInput
                            style={[styles.input, { color: COLORS.text }]}
                            placeholder="70 000 000"
                            placeholderTextColor={COLORS.textSecondary}
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            maxLength={8}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={[styles.footer, { backgroundColor: COLORS.cardBg, borderTopColor: COLORS.border }]}>
                <TouchableOpacity
                    style={[styles.confirmButton, isProcessing && styles.disabledButton]}
                    onPress={handleConfirmPayment}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <Text style={styles.confirmButtonText}>Verifying Transfer...</Text>
                    ) : (
                        <Text style={styles.confirmButtonText}>I've Transferred the Money</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    content: {
        padding: 20,
        paddingBottom: 100,
    },
    planCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 20,
    },
    planInfo: {
        flex: 1,
    },
    planLabel: {
        fontSize: 13,
        marginBottom: 4,
    },
    planName: {
        fontSize: 18,
        fontWeight: '700',
    },
    priceInfo: {
        alignItems: 'flex-end',
    },
    priceLabel: {
        fontSize: 13,
        marginBottom: 4,
        textAlign: 'right',
    },
    priceValue: {
        fontSize: 18,
        fontWeight: '700',
    },
    paymentCard: {
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        alignItems: 'center',
    },
    wishHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    wishIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E60023',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    wishTitle: {
        fontSize: 22,
        fontWeight: '800',
    },
    instructionText: {
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 20,
        lineHeight: 20,
    },
    qrContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    qrPlaceholder: {
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        borderStyle: 'dashed',
    },
    numberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 24,
    },
    numberLabel: {
        fontSize: 12,
        marginBottom: 2,
    },
    numberValue: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 1,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#E5E7EB',
        marginBottom: 24,
    },
    inputLabel: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    inputSublabel: {
        alignSelf: 'flex-start',
        fontSize: 13,
        marginBottom: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 56,
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 16,
    },
    countryCode: {
        fontSize: 16,
        fontWeight: '600',
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        height: '100%',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        borderTopWidth: 1,
    },
    confirmButton: {
        backgroundColor: '#E60023',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#E60023',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    disabledButton: {
        opacity: 0.6,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});

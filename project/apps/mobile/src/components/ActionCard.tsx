import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

const ACTION_CARD_WIDTH = 300;

interface ActionCardProps {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    onPress?: () => void;
}

export function ActionCard({ title, subtitle, icon, onPress }: ActionCardProps) {
    const { colors } = useTheme();

    return (
        <Pressable 
            style={[styles.pressable, { width: ACTION_CARD_WIDTH }]} 
            onPress={onPress}
        >
            {({ pressed }) => (
                <Animated.View
                    style={[
                        styles.gradientWrapper,
                        {
                            transform: [{ scale: pressed ? 0.97 : 1 }],
                        },
                    ]}
                >
                    <BlurView intensity={24} tint="light" style={styles.glass}>
                        <LinearGradient
                            colors={[colors.primaryBlue, colors.deepBlue]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradient}
                        >
                            <View style={styles.iconCircle}>
                                <MaterialCommunityIcons
                                    name={icon as any}
                                    size={22}
                                    color={colors.background}
                                />
                            </View>
                            <View style={styles.textBlock}>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={styles.subtitle}>{subtitle}</Text>
                            </View>
                        </LinearGradient>
                    </BlurView>
                </Animated.View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        marginRight: 16,
    },
    gradientWrapper: {
        borderRadius: 24,
        overflow: 'hidden',
        height: 140,
    },
    glass: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textBlock: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 18,
    },
});

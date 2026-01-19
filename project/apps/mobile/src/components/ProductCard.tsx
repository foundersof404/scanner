import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../hooks/useTheme';

interface ProductCardProps {
    id: string;
    title: string;
    subtitle: string;
    tag?: string;
    imageUrl: string;
    onPress?: () => void;
}

export function ProductCard({ title, subtitle, tag, imageUrl, onPress }: ProductCardProps) {
    const { colors } = useTheme();

    return (
        <Pressable style={styles.wrapper} onPress={onPress}>
            <BlurView intensity={25} tint="light" style={styles.card}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.textContainer}>
                    <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
                    {tag && (
                        <View style={[styles.tag, { backgroundColor: colors.primaryBlue }]}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    )}
                </View>
            </BlurView>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
    },
    card: {
        borderRadius: 20,
        overflow: 'hidden',
        height: 200,
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    tag: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    tagText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Animated, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useFilters, FilterState } from '../hooks/useFilters';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    filters: FilterState;
    onApply: () => void;
    onReset: () => void;
    locations: Array<{ id: string; label: string }>;
    categories: Array<{ id: string; label: string; icon: string }>;
    availabilityOptions: Array<{ id: string; label: string }>;
    sortOptions: Array<{ id: string; label: string }>;
    translations: any;
}

export function FilterModal({
    visible,
    onClose,
    filters,
    onApply,
    onReset,
    locations,
    categories,
    availabilityOptions,
    sortOptions,
    translations: t,
}: FilterModalProps) {
    const { colors, isDark } = useTheme();
    const progress = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(progress, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.overlay,
                {
                    opacity: progress,
                },
            ]}
        >
            <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
            <Animated.View
                style={[
                    styles.panel,
                    {
                        transform: [
                            {
                                translateY: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [Dimensions.get('window').height, 0],
                                }),
                            },
                        ],
                    },
                ]}
            >
                <BlurView intensity={30} tint={isDark ? 'dark' : 'light'} style={styles.content}>
                    <View style={styles.header}>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>{t.filters}</Text>
                        <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <MaterialCommunityIcons name="close" size={24} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
                        {/* Price Range */}
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.priceRange}</Text>
                            <View style={styles.priceRangeContainer}>
                                <View style={styles.priceInputContainer}>
                                    <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>Min</Text>
                                    <TextInput
                                        style={[styles.priceInput, { color: colors.text, borderColor: colors.border }]}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        value={filters.priceRange.min}
                                        onChangeText={(text) => {
                                            if (text === '' || /^\d+$/.test(text)) {
                                                // This will be handled by parent
                                            }
                                        }}
                                    />
                                </View>
                                <View style={styles.priceInputContainer}>
                                    <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>Max</Text>
                                    <TextInput
                                        style={[styles.priceInput, { color: colors.text, borderColor: colors.border }]}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        value={filters.priceRange.max}
                                        onChangeText={(text) => {
                                            if (text === '' || /^\d+$/.test(text)) {
                                                // This will be handled by parent
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Other filter sections would go here - simplified for now */}
                    </ScrollView>

                    <View style={styles.actions}>
                        <TouchableOpacity style={[styles.resetButton, { borderColor: colors.border }]} onPress={onReset}>
                            <Text style={[styles.resetButtonText, { color: colors.text }]}>{t.reset}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.applyButton, { backgroundColor: colors.primaryBlue }]} onPress={onApply}>
                            <Text style={styles.applyButtonText}>{t.applyFilters}</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    panel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
    },
    scrollContent: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
    },
    priceRangeContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    priceInputContainer: {
        flex: 1,
    },
    priceLabel: {
        fontSize: 12,
        marginBottom: 6,
    },
    priceInput: {
        height: 44,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        fontSize: 16,
    },
    actions: {
        flexDirection: 'row',
        padding: 20,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
    },
    resetButton: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    applyButton: {
        flex: 1,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});

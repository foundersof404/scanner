import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Animated,
    Pressable,
    Image,
    RefreshControl,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useApp } from '../../context/AppContext';
import { translations } from '../../constants/translations';
import { mockRecentActivity } from '../../constants/mockData';
import { ActionCard, Category, RecommendedItem, ActivityItem } from '../../types';

const ACTION_CARD_WIDTH = 300;

interface HomePageProps {
    userName: string;
    onFilterPress: () => void;
    onScroll?: (event: any) => void;
    scrollRef?: React.RefObject<ScrollView>;
}

export function HomePage({ userName, onFilterPress, onScroll, scrollRef }: HomePageProps) {
    const { colors, isDark } = useTheme();
    const { language } = useApp();
    const t = translations[language];

    // State
    const [refreshing, setRefreshing] = useState(false);

    // Animation values
    const searchScale = useRef(new Animated.Value(1)).current;
    const actionScrollX = useRef(new Animated.Value(0)).current;
    const scrollY = useRef(new Animated.Value(0)).current;
    const welcomeOpacity = useRef(new Animated.Value(1)).current;

    // Pull to refresh handler
    const onRefresh = async () => {
        setRefreshing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setRefreshing(false);
    };

    // Data
    const actionCards: ActionCard[] = [
        {
            id: 'scan',
            title: t.smartScan,
            subtitle: t.smartScanSubtitle,
            icon: 'barcode-scan',
        },
        {
            id: 'bulk',
            title: t.bulkUpload,
            subtitle: t.bulkUploadSubtitle,
            icon: 'file-upload-outline',
        },
        {
            id: 'alerts',
            title: t.priceAlerts,
            subtitle: t.priceAlertsSubtitle,
            icon: 'bell-alert-outline',
        },
    ];

    const recommendedItems: RecommendedItem[] = [
        {
            id: 'r1',
            title: 'iPhone 15 Pro',
            subtitle: `${t.highConfidence} 4 ${t.retailers}.`,
            tag: t.recommendedTag,
            imageUrl: 'https://images.unsplash.com/photo-1709178295038-acbeec786fcf?q=80&w=627&auto=format&fit=crop',
        },
        {
            id: 'r2',
            title: 'MacBook Air M2',
            subtitle: t.bestMargin,
            tag: t.opportunityTag,
            imageUrl: 'https://images.unsplash.com/photo-1659135890064-d57187f0946c?q=80&w=2070&auto=format&fit=crop',
        },
    ];

    const categories: Category[] = [
        { id: 'c1', label: t.smartphones, icon: 'cellphone' },
        { id: 'c2', label: t.laptops, icon: 'laptop' },
        { id: 'c3', label: t.accessories, icon: 'headphones' },
        { id: 'c4', label: t.appliances, icon: 'fridge-outline' },
    ];

    const handleSearchFocus = () => {
        Animated.spring(searchScale, {
            toValue: 1.02,
            tension: 100,
            friction: 7,
            useNativeDriver: true,
        }).start();
    };

    const handleSearchBlur = () => {
        Animated.spring(searchScale, {
            toValue: 1,
            tension: 100,
            friction: 7,
            useNativeDriver: true,
        }).start();
    };

    const renderRecommendedCard = (item: RecommendedItem) => (
        <Animated.View key={item.id} style={styles.recommendedWrapper}>
            <BlurView intensity={25} tint="light" style={styles.recommendedCard}>
                <Image source={{ uri: item.imageUrl }} style={styles.recommendedImage} resizeMode="cover" />
                <View style={styles.recommendedTextContainer}>
                    <Text style={[styles.recommendedTitle, { color: colors.text }]}>{item.title}</Text>
                    <Text style={[styles.recommendedSubtitle, { color: colors.textSecondary }]}>{item.subtitle}</Text>
                    <View style={[styles.recommendedTag, { backgroundColor: colors.primaryBlue }]}>
                        <Text style={styles.recommendedTagText}>{item.tag}</Text>
                    </View>
                </View>
            </BlurView>
        </Animated.View>
    );

    const renderCategoryCard = (item: Category) => (
        <View key={item.id} style={styles.categoryCardWrapper}>
            <Pressable style={[styles.categoryCard, { backgroundColor: colors.primaryBlue }]}>
                <View style={styles.categoryIcon}>
                    <MaterialCommunityIcons name={item.icon as any} size={18} color={colors.background} />
                </View>
                <Text style={[styles.categoryLabel, { color: colors.background }]}>{item.label}</Text>
            </Pressable>
        </View>
    );

    const renderActivityItem = (item: ActivityItem) => {
        const getActivityIcon = (type: ActivityItem['type']) => {
            switch (type) {
                case 'scan': return 'barcode-scan';
                case 'search': return 'magnify';
                case 'buy': return 'shopping';
                case 'upload': return 'image-plus';
                case 'alert': return 'bell-alert';
                case 'export': return 'file-export';
            }
        };

        const getActivityColor = (type: ActivityItem['type']) => {
            switch (type) {
                case 'scan': return '#1A73E8';
                case 'search': return '#9333EA';
                case 'buy': return '#10B981';
                case 'upload': return '#F59E0B';
                case 'alert': return '#EF4444';
                case 'export': return '#6366F1';
            }
        };

        const iconName = getActivityIcon(item.type);
        const iconColor = getActivityColor(item.type);

        return (
            <Pressable key={item.id} style={styles.activityItemWrapper}>
                {({ pressed }) => (
                    <BlurView intensity={20} tint="light" style={[styles.activityItem, pressed && { opacity: 0.8 }]}>
                        <View style={[styles.activityAvatar, { backgroundColor: `${iconColor}15` }]}>
                            <MaterialCommunityIcons name={iconName as any} size={18} color={iconColor} />
                        </View>
                        <View style={styles.activityTextContainer}>
                            <Text style={[styles.activityTitle, { color: colors.text }]}>{item.title}</Text>
                            <Text style={[styles.activitySubtitle, { color: colors.textSecondary }]}>{item.subtitle}</Text>
                        </View>
                        <Text style={[styles.activityTime, { color: iconColor }]}>{item.time}</Text>
                    </BlurView>
                )}
            </Pressable>
        );
    };

    return (
        <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={onScroll}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={colors.primaryBlue}
                    colors={[colors.primaryBlue]}
                />
            }
        >
            {/* Welcome Message */}
            <Animated.View style={{ opacity: welcomeOpacity, marginBottom: 12 }}>
                <Text style={[styles.welcomeText, { color: colors.text }]}>
                    {t.welcome}, {userName}
                </Text>
            </Animated.View>

            {/* Search + Filter */}
            <View style={styles.searchRow}>
                <Animated.View style={[styles.searchBar, { backgroundColor: colors.backgroundSecondary, transform: [{ scale: searchScale }] }]}>
                    <MaterialCommunityIcons name="magnify" size={20} color={colors.textSecondary} style={styles.searchIcon} />
                    <TextInput
                        placeholder={t.search}
                        placeholderTextColor={colors.textSecondary}
                        style={[styles.searchInput, { color: colors.text }]}
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                    />
                </Animated.View>
                <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.primaryBlue }]} onPress={onFilterPress}>
                    <MaterialCommunityIcons name="tune-variant" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* Action Cards */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.actionScroll}
                decelerationRate="fast"
                snapToAlignment="start"
                nestedScrollEnabled={true}
            >
                {actionCards.map((card) => (
                    <Pressable key={card.id} style={styles.actionPressable}>
                        {({ pressed }) => (
                            <View style={[styles.actionCardWrapper, { transform: [{ scale: pressed ? 0.97 : 1 }] }]}>
                                <BlurView intensity={24} tint="light" style={styles.actionGlass}>
                                    <LinearGradient colors={[colors.primaryBlue, colors.deepBlue]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.actionGradient}>
                                        <View style={styles.actionIconCircle}>
                                            <MaterialCommunityIcons name={card.icon as any} size={22} color={colors.background} />
                                        </View>
                                        <View style={styles.actionTextBlock}>
                                            <Text style={styles.actionTitle}>{card.title}</Text>
                                            <Text style={styles.actionSubtitle}>{card.subtitle}</Text>
                                        </View>
                                    </LinearGradient>
                                </BlurView>
                            </View>
                        )}
                    </Pressable>
                ))}
            </ScrollView>

            {/* Carousel Dots */}
            <View style={styles.carouselDots}>
                {actionCards.map((card, index) => (
                    <View key={card.id} style={[styles.carouselDot, { backgroundColor: colors.primaryBlue, opacity: index === 0 ? 1 : 0.4 }]} />
                ))}
            </View>

            {/* Recommended Section */}
            <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.recommended}</Text>
                <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>{t.recommendedSubtitle}</Text>
            </View>
            {recommendedItems.map((item) => renderRecommendedCard(item))}

            {/* Categories */}
            <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.popularCategories}</Text>
                <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>{t.categoriesSubtitle}</Text>
            </View>
            <View style={styles.categoriesGrid}>
                {categories.map((category) => renderCategoryCard(category))}
            </View>

            {/* Recent Activity */}
            <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.recentActivity}</Text>
                <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>{t.recentActivitySubtitle}</Text>
            </View>
            <View style={styles.activityList}>
                {mockRecentActivity.slice(0, 3).map((item) => renderActivityItem(item))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 100,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    searchRow: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 12,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 24,
        paddingHorizontal: 16,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
    },
    filterButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionScroll: {
        paddingRight: 20,
        marginBottom: 12,
    },
    actionPressable: {
        marginRight: 16,
    },
    actionCardWrapper: {
        width: ACTION_CARD_WIDTH,
        borderRadius: 24,
        overflow: 'hidden',
        height: 140,
    },
    actionGlass: {
        flex: 1,
    },
    actionGradient: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    actionTextBlock: {
        flex: 1,
    },
    actionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    actionSubtitle: {
        fontSize: 13,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 18,
    },
    carouselDots: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        gap: 6,
    },
    carouselDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 14,
        lineHeight: 20,
    },
    recommendedWrapper: {
        marginBottom: 16,
    },
    recommendedCard: {
        borderRadius: 20,
        overflow: 'hidden',
        height: 200,
    },
    recommendedImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    recommendedTextContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    recommendedTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    recommendedSubtitle: {
        fontSize: 14,
        marginBottom: 8,
    },
    recommendedTag: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    recommendedTagText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 24,
        gap: 12,
    },
    categoryCardWrapper: {
        width: '48%',
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        gap: 12,
    },
    categoryIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    activityList: {
        gap: 12,
        marginBottom: 24,
    },
    activityItemWrapper: {
        marginBottom: 0,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        gap: 12,
    },
    activityAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityTextContainer: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    activitySubtitle: {
        fontSize: 13,
    },
    activityTime: {
        fontSize: 12,
        fontWeight: '600',
    },
});

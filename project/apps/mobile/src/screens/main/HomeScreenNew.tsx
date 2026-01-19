import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Pressable,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useTheme } from '../../hooks/useTheme';
import { useApp } from '../../context/AppContext';
import { translations } from '../../constants/translations';
import { HomePage, ScanPage, AboutPage, ProfilePage } from '../pages';
import { FilterModal } from '../../components/FilterModal';

interface HomeScreenProps {
    userName: string;
    onLogout: () => void;
    initialLanguage?: 'en' | 'ar';
    onNavigateToPayment?: (planName: string, price: string) => void;
}

type NavItem = 'home' | 'scan' | 'about' | 'profile';

export function HomeScreen({ userName, onLogout, initialLanguage = 'en' }: HomeScreenProps) {
    const { colors, isDark } = useTheme();
    const { language } = useApp();
    const t = translations[language];

    // Navigation state
    const [activeNav, setActiveNav] = useState<NavItem>('home');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Animation values for page transitions
    const homePageOpacity = useRef(new Animated.Value(1)).current;
    const scanPageOpacity = useRef(new Animated.Value(0)).current;
    const aboutPageOpacity = useRef(new Animated.Value(0)).current;
    const profilePageOpacity = useRef(new Animated.Value(0)).current;

    const homePageTranslateX = useRef(new Animated.Value(0)).current;
    const scanPageTranslateX = useRef(new Animated.Value(100)).current;
    const aboutPageTranslateX = useRef(new Animated.Value(100)).current;
    const profilePageTranslateX = useRef(new Animated.Value(100)).current;

    // Navigation animation
    const animateToPage = (page: NavItem) => {
        const duration = 300;
        const animations: Animated.CompositeAnimation[] = [];

        // Define opacity and translateX for each page
        const pageStates: Record<NavItem, { opacity: Animated.Value; translateX: Animated.Value }> = {
            home: { opacity: homePageOpacity, translateX: homePageTranslateX },
            scan: { opacity: scanPageOpacity, translateX: scanPageTranslateX },
            about: { opacity: aboutPageOpacity, translateX: aboutPageTranslateX },
            profile: { opacity: profilePageOpacity, translateX: profilePageTranslateX },
        };

        // Animate all pages
        Object.entries(pageStates).forEach(([key, { opacity, translateX }]) => {
            const isActive = key === page;
            animations.push(
                Animated.timing(opacity, {
                    toValue: isActive ? 1 : 0,
                    duration,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: isActive ? 0 : 100,
                    duration,
                    useNativeDriver: true,
                })
            );
        });

        Animated.parallel(animations).start();
    };

    // Handle navigation change
    const handleNavPress = (nav: NavItem) => {
        if (nav === activeNav) return;
        setActiveNav(nav);
        animateToPage(nav);
    };

    // Swipe gesture for page navigation
    const swipeGesture = Gesture.Pan()
        .onEnd((event) => {
            const threshold = 50;
            if (event.translationX > threshold) {
                // Swipe right - go to previous page
                const navOrder: NavItem[] = ['home', 'scan', 'about', 'profile'];
                const currentIndex = navOrder.indexOf(activeNav);
                if (currentIndex > 0) {
                    handleNavPress(navOrder[currentIndex - 1]);
                }
            } else if (event.translationX < -threshold) {
                // Swipe left - go to next page
                const navOrder: NavItem[] = ['home', 'scan', 'about', 'profile'];
                const currentIndex = navOrder.indexOf(activeNav);
                if (currentIndex < navOrder.length - 1) {
                    handleNavPress(navOrder[currentIndex + 1]);
                }
            }
        });

    // Navigation items
    const navItems = [
        { id: 'home' as NavItem, label: t.home, icon: 'home', inactiveIcon: 'home-outline' },
        { id: 'scan' as NavItem, label: t.scan, icon: 'barcode-scan', inactiveIcon: 'barcode-scan' },
        { id: 'about' as NavItem, label: t.about, icon: 'information', inactiveIcon: 'information-outline' },
        { id: 'profile' as NavItem, label: t.profile, icon: 'account', inactiveIcon: 'account-outline' },
    ];

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
            <GestureDetector gesture={swipeGesture}>
                <Animated.View style={styles.container}>
                    {/* Top Bar */}
                    <View style={[styles.topBar, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
                        <Text style={[styles.appTitle, { color: colors.text }]}>PriceScanner</Text>
                    </View>

                    {/* Pages Container */}
                    <View style={styles.pagesContainer}>
                        {/* Home Page */}
                        <Animated.View
                            style={[
                                styles.pageWrapper,
                                {
                                    opacity: homePageOpacity,
                                    transform: [{ translateX: homePageTranslateX }],
                                },
                            ]}
                            pointerEvents={activeNav === 'home' ? 'auto' : 'none'}
                        >
                            <HomePage userName={userName} onFilterPress={() => setIsFilterOpen(true)} />
                        </Animated.View>

                        {/* Scan Page */}
                        <Animated.View
                            style={[
                                styles.pageWrapper,
                                {
                                    opacity: scanPageOpacity,
                                    transform: [{ translateX: scanPageTranslateX }],
                                },
                            ]}
                            pointerEvents={activeNav === 'scan' ? 'auto' : 'none'}
                        >
                            <ScanPage />
                        </Animated.View>

                        {/* About Page */}
                        <Animated.View
                            style={[
                                styles.pageWrapper,
                                {
                                    opacity: aboutPageOpacity,
                                    transform: [{ translateX: aboutPageTranslateX }],
                                },
                            ]}
                            pointerEvents={activeNav === 'about' ? 'auto' : 'none'}
                        >
                            <AboutPage />
                        </Animated.View>

                        {/* Profile Page */}
                        <Animated.View
                            style={[
                                styles.pageWrapper,
                                {
                                    opacity: profilePageOpacity,
                                    transform: [{ translateX: profilePageTranslateX }],
                                },
                            ]}
                            pointerEvents={activeNav === 'profile' ? 'auto' : 'none'}
                        >
                            <ProfilePage userName={userName} onLogout={onLogout} />
                        </Animated.View>
                    </View>

                    {/* Bottom Navigation Bar */}
                    <View style={[styles.bottomNavContainer, { backgroundColor: colors.background }]}>
                        <BlurView intensity={isDark ? 20 : 40} tint={isDark ? 'dark' : 'light'} style={StyleSheet.absoluteFill} />
                        <View style={[styles.bottomNavBar, { backgroundColor: isDark ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)' }]}>
                            {navItems.map((item) => {
                                const isActive = activeNav === item.id;
                                return (
                                    <Pressable
                                        key={item.id}
                                        style={styles.bottomNavItem}
                                        onPress={() => handleNavPress(item.id)}
                                    >
                                        {({ pressed }) => (
                                            <View style={styles.bottomNavItemContent}>
                                                <View style={[styles.bottomNavIconContainer, { opacity: pressed ? 0.7 : 1 }]}>
                                                    <MaterialCommunityIcons
                                                        name={isActive ? item.icon : item.inactiveIcon}
                                                        size={isActive ? 28 : 24}
                                                        color={isActive ? colors.primaryBlue : colors.textSecondary}
                                                    />
                                                </View>
                                                <Text
                                                    numberOfLines={1}
                                                    style={[
                                                        styles.bottomNavLabel,
                                                        {
                                                            color: isActive ? colors.primaryBlue : colors.textSecondary,
                                                        },
                                                    ]}
                                                >
                                                    {item.label}
                                                </Text>
                                            </View>
                                        )}
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>

                    {/* Filter Modal */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isFilterOpen}
                        onRequestClose={() => setIsFilterOpen(false)}
                    >
                        <FilterModal onClose={() => setIsFilterOpen(false)} />
                    </Modal>
                </Animated.View>
            </GestureDetector>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    topBar: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    appTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    pagesContainer: {
        flex: 1,
        position: 'relative',
    },
    pageWrapper: {
        ...StyleSheet.absoluteFillObject,
    },
    bottomNavContainer: {
        paddingBottom: 0,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.05)',
    },
    bottomNavBar: {
        flexDirection: 'row',
        height: 70,
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingBottom: 8,
    },
    bottomNavItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomNavItemContent: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    bottomNavIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomNavLabel: {
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.2,
    },
});

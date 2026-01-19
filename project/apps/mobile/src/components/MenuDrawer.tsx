import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    Pressable,
    Switch,
    ScrollView,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useApp } from '../context/AppContext';
import { translations } from '../constants/translations';

const DRAWER_WIDTH = Math.min(280, Dimensions.get('window').width * 0.8);

interface MenuDrawerProps {
    visible: boolean;
    onClose: () => void;
    onLogout: () => void;
}

export function MenuDrawer({ visible, onClose, onLogout }: MenuDrawerProps) {
    const { colors, isDark, toggleTheme } = useTheme();
    const { language, toggleLanguage } = useApp();
    const t = translations[language];

    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const menuProgress = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.spring(menuProgress, {
            toValue: visible ? 1 : 0,
            tension: 65,
            friction: 11,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    if (!visible && menuProgress.__getValue() === 0) {
        return null;
    }

    const handleLogout = () => {
        onClose();
        setTimeout(() => {
            onLogout();
        }, 300);
    };

    return (
        <Animated.View
            style={[
                styles.overlay,
                {
                    opacity: menuProgress,
                    pointerEvents: visible ? 'auto' : 'none',
                },
            ]}
        >
            <TouchableOpacity
                style={styles.backdrop}
                activeOpacity={1}
                onPress={onClose}
            />
            <Animated.View
                style={[
                    styles.drawer,
                    {
                        transform: [
                            {
                                translateX: menuProgress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-DRAWER_WIDTH, 0],
                                }),
                            },
                        ],
                    },
                ]}
            >
                <BlurView
                    intensity={isDark ? 40 : 30}
                    tint={isDark ? 'dark' : 'light'}
                    style={StyleSheet.absoluteFill}
                />
                <LinearGradient
                    colors={
                        isDark
                            ? ['rgba(26, 26, 26, 0.95)', 'rgba(31, 31, 31, 0.98)']
                            : ['rgba(255, 255, 255, 0.95)', 'rgba(247, 250, 255, 0.98)']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />

                {/* Header (Fixed) */}
                <View style={styles.header}>
                    <View style={styles.headerTextBlock}>
                        <Text style={[styles.headerTitle, { color: colors.text }]}>
                            Menu
                        </Text>
                        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                            {t.navigation}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <MaterialCommunityIcons
                            name="close"
                            size={24}
                            color={colors.textSecondary}
                        />
                    </TouchableOpacity>
                </View>

                {/* Scrollable Content */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >

                    {/* Navigation Section */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                            {t.navigation}
                        </Text>

                        <Pressable
                            style={({ pressed }) => [
                                styles.menuItem,
                                pressed && { opacity: 0.7 },
                                { backgroundColor: colors.backgroundSecondary },
                            ]}
                        >
                            <View style={[styles.menuItemIconWrapper, { backgroundColor: `${colors.primaryBlue}15` }]}>
                                <MaterialCommunityIcons
                                    name="view-dashboard"
                                    size={20}
                                    color={colors.primaryBlue}
                                />
                            </View>
                            <Text style={[styles.menuItemText, { color: colors.text }]}>
                                {t.dashboard}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.menuItem,
                                pressed && { opacity: 0.7 },
                                { backgroundColor: colors.backgroundSecondary },
                            ]}
                        >
                            <View style={[styles.menuItemIconWrapper, { backgroundColor: `${colors.primaryBlue}15` }]}>
                                <MaterialCommunityIcons
                                    name="barcode-scan"
                                    size={20}
                                    color={colors.primaryBlue}
                                />
                            </View>
                            <Text style={[styles.menuItemText, { color: colors.text }]}>
                                {t.scanProductMenu}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.menuItem,
                                pressed && { opacity: 0.7 },
                                { backgroundColor: colors.backgroundSecondary },
                            ]}
                        >
                            <View style={[styles.menuItemIconWrapper, { backgroundColor: `${colors.primaryBlue}15` }]}>
                                <MaterialCommunityIcons
                                    name="history"
                                    size={20}
                                    color={colors.primaryBlue}
                                />
                            </View>
                            <Text style={[styles.menuItemText, { color: colors.text }]}>
                                {t.scanHistory}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.menuItem,
                                pressed && { opacity: 0.7 },
                                { backgroundColor: colors.backgroundSecondary },
                            ]}
                        >
                            <View style={[styles.menuItemIconWrapper, { backgroundColor: `${colors.primaryBlue}15` }]}>
                                <MaterialCommunityIcons
                                    name="heart"
                                    size={20}
                                    color={colors.primaryBlue}
                                />
                            </View>
                            <Text style={[styles.menuItemText, { color: colors.text }]}>
                                {t.favorites}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.menuItem,
                                pressed && { opacity: 0.7 },
                                { backgroundColor: colors.backgroundSecondary },
                            ]}
                        >
                            <View style={[styles.menuItemIconWrapper, { backgroundColor: `${colors.primaryBlue}15` }]}>
                                <MaterialCommunityIcons
                                    name="chart-box"
                                    size={20}
                                    color={colors.primaryBlue}
                                />
                            </View>
                            <Text style={[styles.menuItemText, { color: colors.text }]}>
                                {t.reports}
                            </Text>
                        </Pressable>
                    </View>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    {/* Account Section */}
                    <View style={styles.section}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.sectionHeader,
                                pressed && { opacity: 0.7 },
                            ]}
                            onPress={() => setIsAccountOpen(!isAccountOpen)}
                        >
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>
                                {t.account}
                            </Text>
                            <MaterialCommunityIcons
                                name={isAccountOpen ? 'chevron-up' : 'chevron-down'}
                                size={20}
                                color={colors.textSecondary}
                            />
                        </Pressable>

                        {isAccountOpen && (
                            <View style={styles.collapsibleContent}>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.menuItem,
                                        pressed && { opacity: 0.7 },
                                        { backgroundColor: colors.backgroundSecondary },
                                    ]}
                                >
                                    <View style={[styles.menuItemIconWrapper, { backgroundColor: `${colors.primaryBlue}15` }]}>
                                        <MaterialCommunityIcons
                                            name="account-outline"
                                            size={20}
                                            color={colors.primaryBlue}
                                        />
                                    </View>
                                    <Text style={[styles.menuItemText, { color: colors.text }]}>
                                        {t.profile}
                                    </Text>
                                </Pressable>

                                <Pressable
                                    style={({ pressed }) => [
                                        styles.menuItem,
                                        pressed && { opacity: 0.7 },
                                        { backgroundColor: colors.backgroundSecondary },
                                    ]}
                                    onPress={handleLogout}
                                >
                                    <View style={[styles.menuItemIconWrapper, { backgroundColor: '#EF444415' }]}>
                                        <MaterialCommunityIcons
                                            name="logout"
                                            size={20}
                                            color="#EF4444"
                                        />
                                    </View>
                                    <Text style={[styles.menuItemText, { color: '#EF4444' }]}>
                                        {t.logout}
                                    </Text>
                                </Pressable>
                            </View>
                        )}
                    </View>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    {/* Settings Section */}
                    <View style={styles.section}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.sectionHeader,
                                pressed && { opacity: 0.7 },
                            ]}
                            onPress={() => setIsSettingsOpen(!isSettingsOpen)}
                        >
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>
                                {t.settings}
                            </Text>
                            <MaterialCommunityIcons
                                name={isSettingsOpen ? 'chevron-up' : 'chevron-down'}
                                size={20}
                                color={colors.textSecondary}
                            />
                        </Pressable>

                        {isSettingsOpen && (
                            <View style={styles.collapsibleContent}>
                                {/* Theme Toggle */}
                                <View style={[styles.toggleItem, { backgroundColor: colors.backgroundSecondary }]}>
                                    <View style={styles.toggleLeft}>
                                        <View style={[styles.menuItemIconWrapper, { backgroundColor: `${colors.primaryBlue}15` }]}>
                                            <MaterialCommunityIcons
                                                name={isDark ? 'weather-night' : 'weather-sunny'}
                                                size={20}
                                                color={colors.primaryBlue}
                                            />
                                        </View>
                                        <View style={styles.toggleTextBlock}>
                                            <Text style={[styles.toggleLabel, { color: colors.text }]}>
                                                {t.theme}
                                            </Text>
                                            <Text style={[styles.toggleSubtext, { color: colors.textSecondary }]}>
                                                {isDark ? t.dark : t.light}
                                            </Text>
                                        </View>
                                    </View>
                                    <Switch
                                        value={isDark}
                                        onValueChange={toggleTheme}
                                        trackColor={{ false: colors.border, true: colors.primaryBlue }}
                                        thumbColor="#FFFFFF"
                                    />
                                </View>

                                {/* Language Toggle */}
                                <View style={[styles.toggleItem, { backgroundColor: colors.backgroundSecondary }]}>
                                    <View style={styles.toggleLeft}>
                                        <View style={[styles.menuItemIconWrapper, { backgroundColor: `${colors.primaryBlue}15` }]}>
                                            <MaterialCommunityIcons
                                                name="translate"
                                                size={20}
                                                color={colors.primaryBlue}
                                            />
                                        </View>
                                        <View style={styles.toggleTextBlock}>
                                            <Text style={[styles.toggleLabel, { color: colors.text }]}>
                                                {t.language}
                                            </Text>
                                            <Text style={[styles.toggleSubtext, { color: colors.textSecondary }]}>
                                                {language === 'en' ? 'English' : 'العربية'}
                                            </Text>
                                        </View>
                                    </View>
                                    <Switch
                                        value={language === 'ar'}
                                        onValueChange={toggleLanguage}
                                        trackColor={{ false: colors.border, true: colors.primaryBlue }}
                                        thumbColor="#FFFFFF"
                                    />
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    drawer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomWidth: 0,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 0,
        paddingBottom: 40,
    },
    headerTextBlock: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        fontWeight: '500',
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
    },
    collapsibleContent: {
        gap: 8,
        marginTop: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 8,
        gap: 12,
    },
    menuItemIconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: 15,
        fontWeight: '600',
        flex: 1,
    },
    toggleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 8,
    },
    toggleLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    toggleTextBlock: {
        flex: 1,
    },
    toggleLabel: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    toggleSubtext: {
        fontSize: 12,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        marginHorizontal: 20,
        marginVertical: 16,
    },
});

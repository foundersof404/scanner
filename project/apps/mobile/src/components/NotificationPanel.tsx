import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    ScrollView,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useApp } from '../context/AppContext';
import { translations } from '../constants/translations';
import { mockNotifications } from '../constants/mockData';

const PANEL_HEIGHT = Dimensions.get('window').height * 0.6;

interface NotificationPanelProps {
    visible: boolean;
    onClose: () => void;
}

export function NotificationPanel({ visible, onClose }: NotificationPanelProps) {
    const { colors, isDark } = useTheme();
    const { language } = useApp();
    const t = translations[language];

    const notificationProgress = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.spring(notificationProgress, {
            toValue: visible ? 1 : 0,
            tension: 65,
            friction: 11,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    if (!visible && notificationProgress.__getValue() === 0) {
        return null;
    }

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'price':
                return 'bell-alert';
            case 'match':
                return 'check-circle';
            case 'scan':
                return 'barcode-scan';
            case 'report':
                return 'file-chart';
            default:
                return 'bell';
        }
    };

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'price':
                return '#EF4444';
            case 'match':
                return '#10B981';
            case 'scan':
                return '#1A73E8';
            case 'report':
                return '#6366F1';
            default:
                return colors.primaryBlue;
        }
    };

    return (
        <Animated.View
            style={[
                styles.overlay,
                {
                    opacity: notificationProgress,
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
                    styles.panel,
                    {
                        transform: [
                            {
                                translateY: notificationProgress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-PANEL_HEIGHT, 0],
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

                <View style={styles.content}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <MaterialCommunityIcons
                                name="bell"
                                size={24}
                                color={colors.primaryBlue}
                            />
                            <Text style={[styles.headerTitle, { color: colors.text }]}>
                                {t.notifications}
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

                    {/* Notifications List */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.scrollContent}
                        contentContainerStyle={styles.scrollContentContainer}
                    >
                        {mockNotifications.length > 0 ? (
                            mockNotifications.map((notification) => {
                                const iconName = getNotificationIcon(notification.type);
                                const iconColor = getNotificationColor(notification.type);

                                return (
                                    <TouchableOpacity
                                        key={notification.id}
                                        style={[
                                            styles.notificationItem,
                                            { backgroundColor: colors.backgroundSecondary },
                                        ]}
                                        activeOpacity={0.7}
                                    >
                                        <View
                                            style={[
                                                styles.notificationIconWrapper,
                                                { backgroundColor: `${iconColor}15` },
                                            ]}
                                        >
                                            <MaterialCommunityIcons
                                                name={iconName as any}
                                                size={20}
                                                color={iconColor}
                                            />
                                        </View>
                                        <View style={styles.notificationTextContainer}>
                                            <Text
                                                style={[
                                                    styles.notificationTitle,
                                                    { color: colors.text },
                                                ]}
                                            >
                                                {notification.title}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.notificationMessage,
                                                    { color: colors.textSecondary },
                                                ]}
                                                numberOfLines={2}
                                            >
                                                {notification.message}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.notificationTime,
                                                    { color: iconColor },
                                                ]}
                                            >
                                                {notification.time}
                                            </Text>
                                        </View>
                                        <MaterialCommunityIcons
                                            name="chevron-right"
                                            size={20}
                                            color={colors.textSecondary}
                                        />
                                    </TouchableOpacity>
                                );
                            })
                        ) : (
                            <View style={styles.emptyState}>
                                <MaterialCommunityIcons
                                    name="bell-off-outline"
                                    size={64}
                                    color={colors.textSecondary}
                                />
                                <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
                                    No notifications yet
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1001,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    panel: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: PANEL_HEIGHT,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        flex: 1,
    },
    scrollContentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        gap: 12,
    },
    notificationIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationTextContainer: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 4,
    },
    notificationMessage: {
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 6,
    },
    notificationTime: {
        fontSize: 12,
        fontWeight: '600',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyStateText: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 16,
    },
});

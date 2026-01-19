import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Pressable,
    Switch,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useApp } from '../../context/AppContext';
import { translations } from '../../constants/translations';

interface ProfilePageProps {
    userName: string;
    onLogout: () => void;
    onScroll?: (event: any) => void;
    scrollRef?: React.RefObject<ScrollView>;
}

export function ProfilePage({ userName, onLogout, onScroll, scrollRef }: ProfilePageProps) {
    const { colors, isDark, toggleTheme } = useTheme();
    const { language, toggleLanguage } = useApp();
    const t = translations[language];

    const [pushNotifications, setPushNotifications] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(true);
    const [reduceMotion, setReduceMotion] = useState(false);

    const renderProfileRow = (icon: string, label: string, onPress?: () => void, rightElement?: React.ReactNode) => (
        <Pressable style={({ pressed }) => [styles.profileRow, pressed && { opacity: 0.7 }]} onPress={onPress}>
            <View style={styles.profileRowLeft}>
                <View style={[styles.profileRowIcon, { backgroundColor: `${colors.primaryBlue}15` }]}>
                    <MaterialCommunityIcons name={icon as any} size={20} color={colors.primaryBlue} />
                </View>
                <Text style={[styles.profileRowLabel, { color: colors.text }]}>{label}</Text>
            </View>
            {rightElement || <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSecondary} />}
        </Pressable>
    );

    const renderDivider = () => <View style={[styles.profileRowDivider, { backgroundColor: colors.border }]} />;

    return (
        <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={onScroll}
        >
            <View style={styles.profileContainer}>
                {/* Profile Header Card */}
                <View style={[styles.profileHeaderCard, { backgroundColor: colors.backgroundSecondary }]}>
                    <BlurView intensity={isDark ? 20 : 15} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                    <LinearGradient
                        colors={isDark ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)'] : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={StyleSheet.absoluteFill}
                    />
                    <View style={styles.profileHeader}>
                        <View style={styles.profileAvatarWrapper}>
                            <View style={[styles.profileAvatarGlow, { backgroundColor: `${colors.primaryBlue}20` }]} />
                            <View style={styles.profileAvatar}>
                                <LinearGradient colors={[colors.primaryBlue, colors.deepBlue]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.profileAvatarGradient}>
                                    <Text style={styles.profileAvatarInitials}>
                                        {userName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                                    </Text>
                                </LinearGradient>
                            </View>
                        </View>
                        <View style={styles.profileTextBlock}>
                            <View style={styles.profileNameRow}>
                                <Text style={[styles.profileName, { color: colors.text }]}>{userName}</Text>
                                <View style={[styles.profileBadge, { backgroundColor: colors.primaryBlue }]}>
                                    <MaterialCommunityIcons name="check-decagram" size={16} color="#FFFFFF" />
                                </View>
                            </View>
                            <Text style={[styles.profileSubtitle, { color: colors.textSecondary }]}>
                                {t.premiumUser} · {t.since} 2025
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Account Section */}
                <View style={[styles.profileSectionCard, { backgroundColor: colors.backgroundSecondary }]}>
                    <View style={styles.profileSectionContent}>
                        <Text style={[styles.profileSectionTitle, { color: colors.text }]}>{t.account}</Text>
                        {renderProfileRow('account-outline', t.personalDetails)}
                        {renderDivider()}
                        {renderProfileRow('shield-outline', t.security)}
                    </View>
                </View>

                {/* Subscription Section */}
                <View style={[styles.profileSectionCard, { backgroundColor: colors.backgroundSecondary }]}>
                    <View style={styles.profileSectionContent}>
                        <Text style={[styles.profileSectionTitle, { color: colors.text }]}>{t.subscriptions}</Text>
                        {renderProfileRow('crown-outline', t.currentPlan)}
                    </View>
                </View>

                {/* Notifications Section */}
                <View style={[styles.profileSectionCard, { backgroundColor: colors.backgroundSecondary }]}>
                    <View style={styles.profileSectionContent}>
                        <Text style={[styles.profileSectionTitle, { color: colors.text }]}>{t.notifications}</Text>
                        {renderProfileRow(
                            'bell-outline',
                            t.pushNotifications,
                            undefined,
                            <Switch
                                value={pushNotifications}
                                onValueChange={setPushNotifications}
                                trackColor={{ false: colors.border, true: colors.primaryBlue }}
                                thumbColor="#FFFFFF"
                            />
                        )}
                        {renderDivider()}
                        {renderProfileRow(
                            'email-outline',
                            t.emailUpdates,
                            undefined,
                            <Switch
                                value={emailUpdates}
                                onValueChange={setEmailUpdates}
                                trackColor={{ false: colors.border, true: colors.primaryBlue }}
                                thumbColor="#FFFFFF"
                            />
                        )}
                    </View>
                </View>

                {/* Appearance Section */}
                <View style={[styles.profileSectionCard, { backgroundColor: colors.backgroundSecondary }]}>
                    <View style={styles.profileSectionContent}>
                        <Text style={[styles.profileSectionTitle, { color: colors.text }]}>{t.settings}</Text>
                        {renderProfileRow(
                            isDark ? 'weather-night' : 'white-balance-sunny',
                            t.theme,
                            undefined,
                            <Switch
                                value={isDark}
                                onValueChange={toggleTheme}
                                trackColor={{ false: colors.border, true: colors.primaryBlue }}
                                thumbColor="#FFFFFF"
                            />
                        )}
                        {renderDivider()}
                        {renderProfileRow(
                            'translate',
                            t.language,
                            toggleLanguage,
                            <Text style={[styles.profileRowValue, { color: colors.textSecondary }]}>
                                {language === 'en' ? 'English' : 'العربية'}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Accessibility Section */}
                <View style={[styles.profileSectionCard, { backgroundColor: colors.backgroundSecondary }]}>
                    <View style={styles.profileSectionContent}>
                        <Text style={[styles.profileSectionTitle, { color: colors.text }]}>{t.accessibility}</Text>
                        {renderProfileRow(
                            'motion-outline',
                            t.reduceMotion,
                            undefined,
                            <Switch
                                value={reduceMotion}
                                onValueChange={setReduceMotion}
                                trackColor={{ false: colors.border, true: colors.primaryBlue }}
                                thumbColor="#FFFFFF"
                            />
                        )}
                    </View>
                </View>

                {/* Privacy Section */}
                <View style={[styles.profileSectionCard, { backgroundColor: colors.backgroundSecondary }]}>
                    <View style={styles.profileSectionContent}>
                        <Text style={[styles.profileSectionTitle, { color: colors.text }]}>{t.privacy}</Text>
                        {renderProfileRow('database-outline', t.dataPermissions)}
                        {renderDivider()}
                        {renderProfileRow('apps', t.connectedApps)}
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.backgroundSecondary, borderColor: '#EF4444' }]} onPress={onLogout}>
                    <MaterialCommunityIcons name="logout" size={20} color="#EF4444" />
                    <Text style={styles.logoutText}>{t.logout}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 100,
    },
    profileContainer: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    profileHeaderCard: {
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
    },
    profileAvatarWrapper: {
        position: 'relative',
        marginRight: 16,
    },
    profileAvatarGlow: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        opacity: 0.4,
    },
    profileAvatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    profileAvatarGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileAvatarInitials: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    profileTextBlock: {
        flex: 1,
    },
    profileNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    profileName: {
        fontSize: 22,
        fontWeight: '700',
        marginRight: 8,
    },
    profileBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileSubtitle: {
        fontSize: 14,
        fontWeight: '500',
    },
    profileSectionCard: {
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    profileSectionContent: {
        padding: 20,
    },
    profileSectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 16,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    profileRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    profileRowIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    profileRowLabel: {
        fontSize: 15,
        fontWeight: '600',
    },
    profileRowValue: {
        fontSize: 14,
        fontWeight: '600',
        marginRight: 8,
    },
    profileRowDivider: {
        height: 1,
        marginVertical: 4,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 16,
        marginBottom: 20,
        borderWidth: 2,
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#EF4444',
    },
});

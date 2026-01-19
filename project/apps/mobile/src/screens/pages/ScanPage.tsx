import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Animated,
    Pressable,
} from 'react-native';
import { CameraView } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useApp } from '../../context/AppContext';
import { useScanner } from '../../hooks/useScanner';
import { translations } from '../../constants/translations';
import { mockRecentActivity } from '../../constants/mockData';
import { ActivityItem } from '../../types';

interface ScanPageProps {
    onScroll?: (event: any) => void;
    scrollRef?: React.RefObject<ScrollView>;
}

export function ScanPage({ onScroll, scrollRef }: ScanPageProps) {
    const { colors, isDark } = useTheme();
    const { language } = useApp();
    const t = translations[language];

    const {
        permission,
        requestCameraPermission,
        linkInput,
        setLinkInput,
        handleBarcodeScanned,
        handleImageUpload,
        handleLinkScan,
        handlePasteLink,
    } = useScanner();

    // Animation for scrolling alert banner
    const scanAlertScroll = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Infinite scrolling animation for alert banner
        Animated.loop(
            Animated.timing(scanAlertScroll, {
                toValue: -300,
                duration: 10000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

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
                    <View style={[styles.activityItem, { backgroundColor: colors.backgroundSecondary }, pressed && { opacity: 0.8 }]}>
                        <View style={[styles.activityAvatar, { backgroundColor: `${iconColor}15` }]}>
                            <MaterialCommunityIcons name={iconName as any} size={18} color={iconColor} />
                        </View>
                        <View style={styles.activityTextContainer}>
                            <Text style={[styles.activityTitle, { color: colors.text }]}>{item.title}</Text>
                            <Text style={[styles.activitySubtitle, { color: colors.textSecondary }]}>{item.subtitle}</Text>
                        </View>
                        <Text style={[styles.activityTime, { color: iconColor }]}>{item.time}</Text>
                    </View>
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
        >
            <View style={styles.scanContainer}>
                {/* Header */}
                <View style={styles.scanHeader}>
                    <Text style={[styles.scanTitle, { color: colors.text }]}>{t.scanProduct}</Text>
                    <Text style={[styles.scanSubtitle, { color: colors.textSecondary }]}>{t.scanSubtitle}</Text>
                </View>

                {/* Quick Scan Section */}
                <View style={[styles.quickSection, { backgroundColor: colors.backgroundSecondary }]}>
                    <View style={[styles.quickInputRow, { backgroundColor: colors.background }]}>
                        <MaterialCommunityIcons name="link-variant" size={18} color={colors.textSecondary} style={{ marginHorizontal: 6 }} />
                        <TextInput
                            value={linkInput}
                            onChangeText={setLinkInput}
                            placeholder={t.linkPlaceholder}
                            placeholderTextColor={colors.textSecondary}
                            style={[styles.quickInput, { color: colors.text }]}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TouchableOpacity style={[styles.quickPrimary, { backgroundColor: colors.primaryBlue }]} activeOpacity={0.9} onPress={handleLinkScan}>
                            <Text style={styles.quickPrimaryText}>{t.scanLink}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.quickActionsRow}>
                        <TouchableOpacity style={[styles.quickGhost, { borderColor: colors.border }]} activeOpacity={0.9} onPress={handlePasteLink}>
                            <MaterialCommunityIcons name="content-paste" size={16} color={colors.text} style={{ marginRight: 6 }} />
                            <Text style={[styles.quickGhostText, { color: colors.text }]}>{t.pasteLink}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.quickGhost, { borderColor: colors.border }]} activeOpacity={0.9} onPress={handleImageUpload}>
                            <MaterialCommunityIcons name="image-multiple" size={16} color={colors.text} style={{ marginRight: 6 }} />
                            <Text style={[styles.quickGhostText, { color: colors.text }]}>{t.uploadImage}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Camera Frame */}
                <View style={[styles.scanFrame, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
                    {!permission?.granted ? (
                        <View style={styles.scanPermissionContainer}>
                            <Text style={[styles.scanPermissionText, { color: colors.textSecondary }]}>{t.cameraRequired}</Text>
                            <TouchableOpacity style={[styles.scanButtonSecondary, { backgroundColor: colors.primaryBlue }]} onPress={requestCameraPermission}>
                                <Text style={styles.scanButtonSecondaryText}>{t.allowCamera}</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <CameraView
                            style={StyleSheet.absoluteFillObject}
                            facing="back"
                            barcodeScannerSettings={{
                                barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_a', 'upc_e'],
                            }}
                            onBarcodeScanned={handleBarcodeScanned}
                        />
                    )}
                    <View style={[styles.scanCorner, styles.scanCornerTopLeft, { borderColor: colors.primaryBlue }]} />
                    <View style={[styles.scanCorner, styles.scanCornerTopRight, { borderColor: colors.primaryBlue }]} />
                    <View style={[styles.scanCorner, styles.scanCornerBottomLeft, { borderColor: colors.primaryBlue }]} />
                    <View style={[styles.scanCorner, styles.scanCornerBottomRight, { borderColor: colors.primaryBlue }]} />
                    <View style={[styles.scanReticle, { borderColor: colors.primaryBlue }]} />
                </View>

                {/* Hint */}
                <View style={styles.scanHintRow}>
                    <MaterialCommunityIcons name="information-outline" size={18} color={colors.textSecondary} />
                    <Text style={[styles.scanHintText, { color: colors.textSecondary }]}>
                        We'll use AI to match this product across multiple stores for you.
                    </Text>
                </View>

                {/* Start Scanning Button */}
                <TouchableOpacity style={[styles.scanButton, { backgroundColor: colors.primaryBlue }]} activeOpacity={0.9}>
                    <MaterialCommunityIcons name="barcode-scan" size={22} color="#FFFFFF" />
                    <Text style={styles.scanButtonText}>{t.startScanning}</Text>
                </TouchableOpacity>

                {/* Scrolling Alert Banner */}
                <View style={styles.scanAlertContainer}>
                    <Animated.View style={[styles.scanAlertBanner, { transform: [{ translateX: scanAlertScroll }] }]}>
                        <View style={styles.scanAlertContent}>
                            <MaterialCommunityIcons name="alert" size={18} color="#EF4444" />
                            <Text style={styles.scanAlertText}>{t.alertBestPrices}</Text>
                        </View>
                        <View style={styles.scanAlertContent}>
                            <MaterialCommunityIcons name="alert" size={18} color="#EF4444" />
                            <Text style={styles.scanAlertText}>{t.alertBestPrices}</Text>
                        </View>
                    </Animated.View>
                </View>

                {/* Recent Scans */}
                <View style={styles.scanRecentHeader}>
                    <Text style={[styles.scanRecentTitle, { color: colors.text }]}>{t.recentScans}</Text>
                </View>
                <View style={styles.activityList}>
                    {mockRecentActivity.filter(item => item.type === 'scan').map((item) => renderActivityItem(item))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 100,
    },
    scanContainer: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    scanHeader: {
        marginBottom: 20,
    },
    scanTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 4,
    },
    scanSubtitle: {
        fontSize: 14,
        lineHeight: 20,
    },
    quickSection: {
        padding: 16,
        borderRadius: 20,
        marginBottom: 20,
        gap: 12,
    },
    quickInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 24,
        paddingHorizontal: 12,
        gap: 8,
    },
    quickInput: {
        flex: 1,
        fontSize: 14,
    },
    quickPrimary: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
    },
    quickPrimaryText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    quickActionsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    quickGhost: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 12,
        borderWidth: 1,
    },
    quickGhostText: {
        fontSize: 13,
        fontWeight: '600',
    },
    scanFrame: {
        height: 300,
        borderRadius: 20,
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 16,
        position: 'relative',
    },
    scanPermissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    scanPermissionText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
    },
    scanButtonSecondary: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    scanButtonSecondaryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    scanCorner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderWidth: 3,
    },
    scanCornerTopLeft: {
        top: 20,
        left: 20,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopLeftRadius: 8,
    },
    scanCornerTopRight: {
        top: 20,
        right: 20,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderTopRightRadius: 8,
    },
    scanCornerBottomLeft: {
        bottom: 20,
        left: 20,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
    },
    scanCornerBottomRight: {
        bottom: 20,
        right: 20,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomRightRadius: 8,
    },
    scanReticle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 200,
        height: 200,
        marginLeft: -100,
        marginTop: -100,
        borderWidth: 2,
        borderRadius: 12,
        borderStyle: 'dashed',
    },
    scanHintRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    scanHintText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
    },
    scanButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 16,
        marginBottom: 20,
        gap: 8,
    },
    scanButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    scanAlertContainer: {
        height: 40,
        marginBottom: 24,
        overflow: 'hidden',
    },
    scanAlertBanner: {
        flexDirection: 'row',
        gap: 40,
    },
    scanAlertContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#FEE2E2',
        borderRadius: 20,
    },
    scanAlertText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#EF4444',
    },
    scanRecentHeader: {
        marginBottom: 16,
    },
    scanRecentTitle: {
        fontSize: 18,
        fontWeight: '700',
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

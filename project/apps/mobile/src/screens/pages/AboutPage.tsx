import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

interface AboutPageProps {
    onScroll?: (event: any) => void;
    scrollRef?: React.RefObject<ScrollView>;
}

export function AboutPage({ onScroll, scrollRef }: AboutPageProps) {
    const { colors, isDark } = useTheme();

    return (
        <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={onScroll}
        >
            <View style={styles.aboutContainer}>
                {/* Hero Section */}
                <View style={styles.aboutHeroSection}>
                    <LinearGradient
                        colors={isDark ? ['#0F1419', '#1A1F2E', '#0F1419'] : ['#FFFFFF', '#F8FAFF', '#FFFFFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFill}
                    />
                    <View style={[styles.floatingDot1, { backgroundColor: isDark ? 'rgba(66, 165, 245, 0.08)' : 'rgba(26, 115, 232, 0.06)' }]} />
                    <View style={[styles.floatingDot2, { backgroundColor: isDark ? 'rgba(66, 165, 245, 0.12)' : 'rgba(26, 115, 232, 0.08)' }]} />
                    <View style={[styles.floatingDot3, { backgroundColor: isDark ? 'rgba(66, 165, 245, 0.1)' : 'rgba(26, 115, 232, 0.1)' }]} />
                    <View style={styles.heroContent}>
                        <View style={[styles.heroBadge, { backgroundColor: isDark ? 'rgba(66, 165, 245, 0.15)' : 'rgba(26, 115, 232, 0.1)', borderColor: isDark ? 'rgba(66, 165, 245, 0.3)' : 'rgba(26, 115, 232, 0.2)' }]}>
                            <Text style={[styles.heroBadgeText, { color: isDark ? '#42A5F5' : '#1A73E8' }]}>AI-POWERED</Text>
                        </View>
                        <Text style={[styles.heroTitle, { color: colors.text }]}>
                            Stop{'\n'}Overpaying
                        </Text>
                        <Text style={[styles.heroDescription, { color: colors.textSecondary }]}>
                            We scan, compare, and find the real best prices across stores. No marketing. No tricks. Just truth.
                        </Text>
                    </View>
                </View>

                {/* Problem Section */}
                <View style={styles.problemSection}>
                    <Text style={[styles.problemLabel, { color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)' }]}>THE REALITY</Text>
                    <Text style={[styles.problemStatement, { color: colors.text }]}>
                        Every store claims{' '}
                        <Text style={styles.problemHighlight}>"best price"</Text>
                    </Text>
                    <Text style={[styles.problemStatement, { color: colors.text }]}>
                        Most are{' '}
                        <Text style={styles.problemHighlight}>lying</Text>
                    </Text>
                    <View style={styles.problemDivider} />
                    <Text style={[styles.problemDetail, { color: colors.textSecondary }]}>
                        Prices vary 20-40% between retailers
                    </Text>
                </View>

                {/* Solution Cards */}
                <View style={styles.solutionSection}>
                    <Text style={[styles.sectionHeader, { color: colors.text }]}>The Solution</Text>
                    
                    {/* Card 1 */}
                    <View style={styles.solutionCard}>
                        <Image 
                            source={{ uri: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80' }}
                            style={styles.solutionCardImage}
                        />
                        <BlurView intensity={30} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                        <LinearGradient
                            colors={['transparent', isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={StyleSheet.absoluteFill}
                        />
                        <View style={styles.solutionCardContent}>
                            <View style={styles.solutionIconBadge}>
                                <LinearGradient colors={['#4CAF50', '#66BB6A']} style={styles.solutionIconGradient}>
                                    <MaterialCommunityIcons name="cellphone-check" size={32} color="#FFF" />
                                </LinearGradient>
                            </View>
                            <Text style={[styles.solutionCardTitle, { color: colors.text }]}>Scan Anything</Text>
                            <Text style={[styles.solutionCardText, { color: colors.textSecondary }]}>
                                Barcode, photo, or search by name
                            </Text>
                        </View>
                    </View>

                    {/* Card 2 */}
                    <View style={styles.solutionCard}>
                        <Image 
                            source={{ uri: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80' }}
                            style={styles.solutionCardImage}
                        />
                        <BlurView intensity={30} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                        <LinearGradient
                            colors={['transparent', isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={StyleSheet.absoluteFill}
                        />
                        <View style={styles.solutionCardContent}>
                            <View style={styles.solutionIconBadge}>
                                <LinearGradient colors={['#2196F3', '#42A5F5']} style={styles.solutionIconGradient}>
                                    <MaterialCommunityIcons name="brain" size={32} color="#FFF" />
                                </LinearGradient>
                            </View>
                            <Text style={[styles.solutionCardTitle, { color: colors.text }]}>AI Comparison</Text>
                            <Text style={[styles.solutionCardText, { color: colors.textSecondary }]}>
                                Instant cross-store price analysis
                            </Text>
                        </View>
                    </View>

                    {/* Card 3 */}
                    <View style={styles.solutionCard}>
                        <Image 
                            source={{ uri: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80' }}
                            style={styles.solutionCardImage}
                        />
                        <BlurView intensity={30} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                        <LinearGradient
                            colors={['transparent', isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={StyleSheet.absoluteFill}
                        />
                        <View style={styles.solutionCardContent}>
                            <View style={styles.solutionIconBadge}>
                                <LinearGradient colors={['#FF9800', '#FFB74D']} style={styles.solutionIconGradient}>
                                    <MaterialCommunityIcons name="currency-usd" size={32} color="#FFF" />
                                </LinearGradient>
                            </View>
                            <Text style={[styles.solutionCardTitle, { color: colors.text }]}>Save Money</Text>
                            <Text style={[styles.solutionCardText, { color: colors.textSecondary }]}>
                                See real savings, buy with confidence
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Stats Section */}
                <View style={styles.statsSection}>
                    <Image 
                        source={{ uri: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' }}
                        style={styles.statsImage}
                        blurRadius={2}
                    />
                    <LinearGradient
                        colors={isDark ? ['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.9)'] : ['rgba(26, 115, 232, 0.9)', 'rgba(66, 165, 245, 0.95)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={StyleSheet.absoluteFill}
                    />
                    <View style={styles.statsContent}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>40%</Text>
                            <Text style={styles.statLabel}>Average Savings</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>15+</Text>
                            <Text style={styles.statLabel}>Stores Scanned</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>Real-time</Text>
                            <Text style={styles.statLabel}>Price Updates</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 100,
    },
    aboutContainer: {
        marginTop: -40,
    },
    aboutHeroSection: {
        minHeight: 380,
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 32,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 50,
    },
    floatingDot1: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        top: 40,
        right: -30,
    },
    floatingDot2: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        bottom: 60,
        left: -20,
    },
    floatingDot3: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        top: 140,
        left: 50,
    },
    heroContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 28,
    },
    heroBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.2,
    },
    heroTitle: {
        fontSize: 54,
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: -2,
        lineHeight: 60,
        marginBottom: 20,
    },
    heroDescription: {
        fontSize: 17,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 26,
        paddingHorizontal: 8,
        maxWidth: 340,
    },
    problemSection: {
        marginHorizontal: 24,
        marginBottom: 32,
        paddingVertical: 32,
    },
    problemLabel: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.5,
        marginBottom: 16,
    },
    problemStatement: {
        fontSize: 32,
        fontWeight: '800',
        letterSpacing: -1,
        lineHeight: 40,
        marginBottom: 4,
    },
    problemHighlight: {
        color: '#1A73E8',
        fontWeight: '900',
    },
    problemDivider: {
        width: 60,
        height: 4,
        backgroundColor: '#1A73E8',
        borderRadius: 2,
        marginVertical: 20,
        opacity: 0.8,
    },
    problemDetail: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
    },
    solutionSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 20,
        textAlign: 'center',
    },
    solutionCard: {
        height: 200,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 16,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 10,
    },
    solutionCardImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    solutionCardContent: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 24,
    },
    solutionIconBadge: {
        width: 64,
        height: 64,
        borderRadius: 32,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    solutionIconGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    solutionCardTitle: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 8,
    },
    solutionCardText: {
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 22,
    },
    statsSection: {
        height: 180,
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
    },
    statsImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    statsContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFFFFF',
        marginBottom: 6,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },
    statLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    statDivider: {
        width: 1,
        height: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
});

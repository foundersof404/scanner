import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const CIRCLE_SIZE = 120;
const NUM_CIRCLES = 10;

interface LoadingScreenProps {
    onComplete: (language: 'en' | 'ar') => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const circleAnims = useRef(
        Array.from({ length: NUM_CIRCLES }, () => ({
            x: new Animated.Value(0),
            y: new Animated.Value(0),
            scale: new Animated.Value(1),
            opacity: new Animated.Value(1),
        }))
    ).current;

    // Top-left corner circles
    const topLeftCircleAnims = useRef(
        Array.from({ length: NUM_CIRCLES }, () => ({
            x: new Animated.Value(0),
            y: new Animated.Value(0),
            scale: new Animated.Value(1),
            opacity: new Animated.Value(1),
        }))
    ).current;

    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.5)).current;
    const [showLanguageSelect, setShowLanguageSelect] = useState(false);
    const disperseCallback = useRef<((language: 'en' | 'ar') => void) | null>(null);

    useEffect(() => {
        // Initial positions - circles arranged in a circle around center
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 150;

        // Phase 1: Circles appear and move to center (0-1s)
        const phase1Anims = circleAnims.map((anim, index) => {
            const angle = (index / NUM_CIRCLES) * Math.PI * 2;
            const startX = centerX + Math.cos(angle) * radius - CIRCLE_SIZE / 2;
            const startY = centerY + Math.sin(angle) * radius - CIRCLE_SIZE / 2;

            anim.x.setValue(startX);
            anim.y.setValue(startY);

            return Animated.parallel([
                Animated.timing(anim.x, {
                    toValue: centerX - CIRCLE_SIZE / 2,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(anim.y, {
                    toValue: centerY - CIRCLE_SIZE / 2,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]);
        });

        // Phase 2: Circles swap/rotate around (1-2.5s)
        const phase2Anims = circleAnims.map((anim, index) => {
            const angle = (index / NUM_CIRCLES) * Math.PI * 2;
            const rotateRadius = 100;
            const targetX = centerX + Math.cos(angle + Math.PI) * rotateRadius - CIRCLE_SIZE / 2;
            const targetY = centerY + Math.sin(angle + Math.PI) * rotateRadius - CIRCLE_SIZE / 2;

            return Animated.parallel([
                Animated.timing(anim.x, {
                    toValue: targetX,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(anim.y, {
                    toValue: targetY,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]);
        });

        // Phase 3: Circles disperse and fade (2.5-3.5s)
        const phase3Anims = circleAnims.map((anim, index) => {
            const angle = (index / NUM_CIRCLES) * Math.PI * 2;
            const disperseRadius = 400;
            const targetX = centerX + Math.cos(angle) * disperseRadius;
            const targetY = centerY + Math.sin(angle) * disperseRadius;

            return Animated.parallel([
                Animated.timing(anim.x, {
                    toValue: targetX,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(anim.y, {
                    toValue: targetY,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(anim.scale, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(anim.opacity, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]);
        });

        // TOP-LEFT CORNER ANIMATION (absolute corner)
        const topLeftX = -100;
        const topLeftY = -350;
        const topLeftRadius = 50;

        // Top-left Phase 1: Circles gather
        const topLeftPhase1 = topLeftCircleAnims.map((anim, index) => {
            const angle = (index / NUM_CIRCLES) * Math.PI * 2;
            const startX = topLeftX + Math.cos(angle) * topLeftRadius - CIRCLE_SIZE / 2;
            const startY = topLeftY + Math.sin(angle) * topLeftRadius - CIRCLE_SIZE / 2;

            anim.x.setValue(startX);
            anim.y.setValue(startY);

            return Animated.parallel([
                Animated.timing(anim.x, {
                    toValue: topLeftX - CIRCLE_SIZE / 2,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(anim.y, {
                    toValue: topLeftY - CIRCLE_SIZE / 2,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]);
        });

        // Top-left Phase 2: Rotate
        const topLeftPhase2 = topLeftCircleAnims.map((anim, index) => {
            const angle = (index / NUM_CIRCLES) * Math.PI * 2;
            const rotateRadius = 60;
            const targetX = topLeftX + Math.cos(angle + Math.PI) * rotateRadius - CIRCLE_SIZE / 2;
            const targetY = topLeftY + Math.sin(angle + Math.PI) * rotateRadius - CIRCLE_SIZE / 2;

            return Animated.parallel([
                Animated.timing(anim.x, {
                    toValue: targetX,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(anim.y, {
                    toValue: targetY,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]);
        });

        // Top-left Phase 3: Disperse
        const topLeftPhase3 = topLeftCircleAnims.map((anim, index) => {
            const angle = (index / NUM_CIRCLES) * Math.PI * 2;
            const disperseRadius = 250;
            const targetX = topLeftX + Math.cos(angle) * disperseRadius;
            const targetY = topLeftY + Math.sin(angle) * disperseRadius;

            return Animated.parallel([
                Animated.timing(anim.x, {
                    toValue: targetX,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(anim.y, {
                    toValue: targetY,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(anim.scale, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(anim.opacity, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]);
        });

        // Run Phase 1 and 2, then PAUSE for language selection
        Animated.sequence([
            Animated.parallel([...phase1Anims, ...topLeftPhase1]),
            Animated.parallel([...phase2Anims, ...topLeftPhase2]),
        ]).start(() => {
            // Animation paused - show language selection
            setShowLanguageSelect(true);
        });

        // Store phase 3 animations for later (triggered after language selection)
        disperseCallback.current = (language: 'en' | 'ar') => {
            // Continue with Phase 3 (disperse circles)
            Animated.parallel([...phase3Anims, ...topLeftPhase3]).start(() => {
                // Then reveal logo
                Animated.parallel([
                    Animated.timing(logoOpacity, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.spring(logoScale, {
                        toValue: 1,
                        tension: 50,
                        friction: 7,
                        useNativeDriver: true,
                    }),
                ]).start(() => {
                    setTimeout(() => onComplete(language), 800);
                });
            });
        };
    }, []);

    const revealLogoAndComplete = (language: 'en' | 'ar') => {
        // Hide language selection and trigger disperse animation
        setShowLanguageSelect(false);
        if (disperseCallback.current) {
            disperseCallback.current(language);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FFFFFF', '#F7F9FC']}
                style={styles.gradient}
            >
                {/* Center Animated Circles */}
                {circleAnims.map((anim, index) => (
                    <Animated.View
                        key={`center-${index}`}
                        style={[
                            styles.circle,
                            {
                                transform: [
                                    { translateX: anim.x },
                                    { translateY: anim.y },
                                    { scale: anim.scale },
                                ],
                                opacity: anim.opacity,
                            },
                        ]}
                    >
                        <View style={styles.circleInner} />
                    </Animated.View>
                ))}

                {/* Top-Left Animated Circles */}
                {topLeftCircleAnims.map((anim, index) => (
                    <Animated.View
                        key={`topLeft-${index}`}
                        style={[
                            styles.circle,
                            {
                                transform: [
                                    { translateX: anim.x },
                                    { translateY: anim.y },
                                    { scale: anim.scale },
                                ],
                                opacity: anim.opacity,
                            },
                        ]}
                    >
                        <View style={styles.circleInner} />
                    </Animated.View>
                ))}

                {/* Logo */}
                <Animated.View
                    style={[
                        styles.logoContainer,
                        {
                            opacity: logoOpacity,
                            transform: [{ scale: logoScale }],
                        },
                    ]}
                >
                    <View style={styles.logoGlow} />
                    <Image
                        source={require('../../assets/logo.jpg')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.appName}>SAVR</Text>
                </Animated.View>

                {/* Language Selector (shows before logo reveal) */}
                {showLanguageSelect && (
                    <View style={styles.langOverlay}>
                        <View style={styles.langCard}>
                            <Text style={styles.langTitle}>Choose your language</Text>
                            <Text style={styles.langSubtitle}>Please pick a language to continue</Text>
                            <View style={styles.langButtons}>
                                <TouchableOpacity
                                    style={styles.langButton}
                                    activeOpacity={0.85}
                                    onPress={() => {
                                        setShowLanguageSelect(false);
                                        revealLogoAndComplete('en');
                                    }}
                                >
                                    <Text style={styles.langButtonText}>English</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.langButton}
                                    activeOpacity={0.85}
                                    onPress={() => {
                                        setShowLanguageSelect(false);
                                        revealLogoAndComplete('ar');
                                    }}
                                >
                                    <Text style={styles.langButtonText}>العربية</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        position: 'absolute',
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        overflow: 'hidden',
    },
    circleInner: {
        flex: 1,
        backgroundColor: '#3B82F6',
        borderRadius: CIRCLE_SIZE / 2,
    },
    logoContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoGlow: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#3B82F6',
        opacity: 0.15,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 15,
    },
    logoImage: {
        width: 140,
        height: 140,
        borderRadius: 32,
    },
    appName: {
        fontSize: 32,
        fontWeight: '800',
        color: '#1E293B',
        letterSpacing: 2,
        marginTop: 16,
    },
    langOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    langCard: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 10,
    },
    langTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 6,
    },
    langSubtitle: {
        fontSize: 14,
        color: '#475569',
        marginBottom: 16,
    },
    langButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    langButton: {
        flex: 1,
        backgroundColor: '#F2F5F9',
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    langButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2563EB',
    },
});


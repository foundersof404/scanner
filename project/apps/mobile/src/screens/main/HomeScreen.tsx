import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Animated,
    Easing,
    Pressable,
    Image,
    Dimensions,
    ScrollView,
    Alert,
    Platform,
    Switch,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface HomeScreenProps {
    userName: string;
    onLogout: () => void;
    initialLanguage?: 'en' | 'ar';
}

const ACTION_CARD_WIDTH = 300;

// Theme Colors
const LIGHT_COLORS = {
    primaryBlue: '#1A73E8',
    deepBlue: '#0D47A1',
    background: '#FFFFFF',
    backgroundSecondary: '#F5F7FA',
    text: '#000000',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    shadow: 'rgba(0,0,0,0.08)',
};

const DARK_COLORS = {
    primaryBlue: '#4A9EFF',
    deepBlue: '#1A73E8',
    background: '#1A1A1A',
    backgroundSecondary: '#2D2D2D',
    text: '#FFFFFF',
    textSecondary: '#A0A0A0',
    border: '#3A3A3A',
    shadow: 'rgba(0,0,0,0.3)',
};

// Translation keys
const translations = {
    en: {
        // Navigation
        home: 'Home',
        scan: 'Scan',
        about: 'About',
        profile: 'Profile',
        
        // Common
        welcome: 'Welcome back',
        search: 'Search for products, SKUs or URLs',
        recommended: 'Recommended for you',
        recommendedSubtitle: 'AI-picked products based on your recent activity.',
        popularCategories: 'Popular categories',
        categoriesSubtitle: 'Quickly jump into key segments.',
        recentActivity: 'Recent activity',
        recentActivitySubtitle: 'Keep track of what you and your team just ran.',
        
        // Menu
        navigation: 'Navigation',
        account: 'Account',
        settings: 'Settings',
        subscriptions: 'Subscriptions',
        theme: 'Theme',
        language: 'Language',
        general: 'General',
        changePassword: 'Change password',
        twoFactorAuth: 'Two-factor auth',
        deleteAccount: 'Delete account',
        logout: 'Logout',
        light: 'Light',
        dark: 'Dark',
        english: 'English',
        arabic: 'العربية',
        
        // Scan
        scanProduct: 'Scan a product',
        scanSubtitle: 'Point your camera at a barcode or product label to start a new scan.',
        allowCamera: 'Allow camera access',
        cameraRequired: 'Camera access is required to scan products.',
        startScanning: 'Start scanning',
        quickScan: 'Quick scan',
        quickScanSubtitle: 'Paste a link, upload a photo, or open the camera.',
        linkPlaceholder: 'Paste or type a product link',
        scanLink: 'Scan link',
        pasteLink: 'Paste link',
        uploadImage: 'Upload image',
        openCamera: 'Open camera',
        recentScans: 'Recent scans',
        
        // Profile
        premiumUser: 'Premium user',
        personalDetails: 'Personal details',
        security: 'Security',
        notifications: 'Notifications',
        pushNotifications: 'Push notifications',
        emailUpdates: 'Email updates',
        privacy: 'Privacy',
        dataPermissions: 'Data & permissions',
        connectedApps: 'Connected apps',
        accessibility: 'Accessibility',
        reduceMotion: 'Reduce motion',
        
        // Action Cards
        smartScan: 'Smart Scan',
        smartScanSubtitle: 'Use AI to detect and compare prices instantly.',
        bulkUpload: 'Bulk Upload',
        bulkUploadSubtitle: 'Import a list of SKUs and let AI do the rest.',
        priceAlerts: 'Price Alerts',
        priceAlertsSubtitle: 'Get notified when prices move significantly.',
        
        // Categories
        smartphones: 'Smartphones',
        laptops: 'Laptops',
        accessories: 'Accessories',
        appliances: 'Appliances',
        
        // Recommended Items
        highConfidence: 'High confidence match across',
        retailers: 'retailers',
        bestMargin: 'Best margin opportunity right now.',
        recommendedTag: 'Recommended',
        opportunityTag: 'Opportunity',
        
        // Filters
        filters: 'Filters',
        priceRange: 'Price Range',
        location: 'Location',
        category: 'Category',
        availability: 'Availability',
        sortBy: 'Sort By',
        reset: 'Reset',
        applyFilters: 'Apply Filters',
        inStock: 'In Stock',
        outOfStock: 'Out of Stock',
        preOrder: 'Pre-order',
        lowToHigh: 'Price: Low to High',
        highToLow: 'Price: High to Low',
        newest: 'Newest First',
        mostPopular: 'Most Popular',
        highestRated: 'Highest Rated',
        beirut: 'Beirut',
        tripoli: 'Tripoli',
        saida: 'Saidā',
        zahle: 'Zahlé',
        byblos: 'Byblos',
        outsideBeirut: 'Outside Beirut',
        mountLebanon: 'Mount Lebanon',
        northLebanon: 'North Lebanon',
        southLebanon: 'South Lebanon',
        bekaa: 'Bekaa',
        
        // Menu Navigation Items
        dashboard: 'Dashboard',
        scanProductMenu: 'Scan product',
        scanHistory: 'Scan history',
        favorites: 'Favorites',
        reports: 'Reports',
        
        // Profile
        since: 'Since',
        currentPlan: 'Current plan',
        upgradeProMax: 'Upgrade to Pro Max',
        manageBilling: 'Manage billing',
        invoices: 'Invoices',
        
        // About Page
        priceScanner: 'PriceScanner',
        findRealPrices: 'Find the real best prices. No lies, no tricks.',
        everyoneLying: 'Everyone is lying to you',
        everyoneLyingText: 'Every shop claims they have the "best prices." Every website says "check our website for the best prices." But the truth is, the best prices exist—just not where they tell you.',
        ourPurpose: 'Our Purpose',
        findActualPrices: 'We help you find the ACTUAL best prices',
        findActualPricesText: 'Different websites have different products at different prices. What one store calls "best price" might be 20% higher than another store. We scan across multiple retailers, compare real prices, and show you where you can actually save money.',
        howItWorks: 'How It Works',
        step1Title: 'Scan or Search',
        step1Text: 'Use your camera to scan a barcode, upload a product photo, or search by name or SKU.',
        step2Title: 'AI Matching',
        step2Text: 'Our AI matches your product across multiple retailers and websites in real-time.',
        step3Title: 'Compare Prices',
        step3Text: 'See all available prices side-by-side. We show you the real best deal, not marketing claims.',
        step4Title: 'Save Money',
        step4Text: 'Get price alerts, track deals, and never overpay again. The best price exists—we\'ll help you find it.',
        whyPriceScanner: 'Why PriceScanner?',
        noLies: 'No Lies',
        noLiesText: 'Real prices from real stores. No marketing tricks.',
        multipleStores: 'Multiple Stores',
        multipleStoresText: 'Compare prices across dozens of retailers instantly.',
        realTime: 'Real-Time',
        realTimeText: 'Get up-to-date prices and alerts as they change.',
        aiPowered: 'AI Powered',
        aiPoweredText: 'Smart matching and price prediction using AI.',
        bestPriceExists: 'The best price exists. We\'ll help you find it.',
        stopBelieving: 'Stop believing the marketing. Start saving real money.',
        
        // Activity Types
        scanned: 'Scanned',
        purchased: 'Purchased',
        searched: 'Searched',
        uploaded: 'Uploaded',
        newPriceAlert: 'New price alert',
        reportExported: 'Report exported',
        
        // Other
        scannerMenu: 'Scanner menu',
        products: 'products',
        bestDeals: 'best deals',
        found: 'found',
        dropped: 'dropped',
        by: 'by',
        deal: 'deal',
        deals: 'deals',
        priceDropped: 'Price dropped',
        weeklyPricing: 'Weekly pricing overview',
        minutesAgo: 'min ago',
        hourAgo: 'hour ago',
        yesterday: 'Yesterday',
        today: 'Today',
        
        // Notifications
        priceAlert: 'Price Alert',
        priceDroppedBy: 'price dropped by',
        at: 'at',
        newMatchFound: 'New Match Found',
        matchedAcross: 'matched across',
        scanComplete: 'Scan Complete',
        successfullyScanned: 'Successfully scanned',
        weeklyReport: 'Weekly Report',
        weeklyReportReady: 'Your weekly pricing report is ready',
        
        // Scan Alert
        alertBestPrices: 'Alert - We find the best prices for you',
    },
    ar: {
        // Navigation
        home: 'الرئيسية',
        scan: 'مسح',
        about: 'حول',
        profile: 'الملف الشخصي',
        
        // Common
        welcome: 'مرحباً بعودتك',
        search: 'ابحث عن المنتجات أو الرموز أو الروابط',
        recommended: 'موصى به لك',
        recommendedSubtitle: 'منتجات مختارة بالذكاء الاصطناعي بناءً على نشاطك الأخير.',
        popularCategories: 'الفئات الشائعة',
        categoriesSubtitle: 'انتقل بسرعة إلى الأقسام الرئيسية.',
        recentActivity: 'النشاط الأخير',
        recentActivitySubtitle: 'تابع ما أنت وفريقك قد نفذتموه للتو.',
        
        // Menu
        navigation: 'التنقل',
        account: 'الحساب',
        settings: 'الإعدادات',
        subscriptions: 'الاشتراكات',
        theme: 'المظهر',
        language: 'اللغة',
        general: 'عام',
        changePassword: 'تغيير كلمة المرور',
        twoFactorAuth: 'المصادقة الثنائية',
        deleteAccount: 'حذف الحساب',
        logout: 'تسجيل الخروج',
        light: 'فاتح',
        dark: 'داكن',
        english: 'English',
        arabic: 'العربية',
        
        // Scan
        scanProduct: 'مسح منتج',
        scanSubtitle: 'وجه الكاميرا إلى الباركود أو ملصق المنتج لبدء مسح جديد.',
        allowCamera: 'السماح بالوصول للكاميرا',
        cameraRequired: 'يتطلب الوصول إلى الكاميرا لمسح المنتجات.',
        startScanning: 'بدء المسح',
        quickScan: 'مسح سريع',
        quickScanSubtitle: 'الصق رابطاً أو ارفع صورة أو افتح الكاميرا.',
        linkPlaceholder: 'ألصق أو اكتب رابط المنتج',
        scanLink: 'مسح الرابط',
        pasteLink: 'لصق الرابط',
        uploadImage: 'رفع صورة',
        openCamera: 'افتح الكاميرا',
        recentScans: 'عمليات المسح الأخيرة',
        
        // Profile
        premiumUser: 'مستخدم مميز',
        personalDetails: 'التفاصيل الشخصية',
        security: 'الأمان',
        notifications: 'الإشعارات',
        pushNotifications: 'الإشعارات الفورية',
        emailUpdates: 'تحديثات البريد الإلكتروني',
        privacy: 'الخصوصية',
        dataPermissions: 'البيانات والصلاحيات',
        connectedApps: 'التطبيقات المتصلة',
        accessibility: 'إمكانية الوصول',
        reduceMotion: 'تقليل الحركة',
        
        // Action Cards
        smartScan: 'المسح الذكي',
        smartScanSubtitle: 'استخدم الذكاء الاصطناعي للكشف ومقارنة الأسعار فوراً.',
        bulkUpload: 'رفع مجمع',
        bulkUploadSubtitle: 'استيراد قائمة بالرموز واترك الذكاء الاصطناعي يقوم بالباقي.',
        priceAlerts: 'تنبيهات الأسعار',
        priceAlertsSubtitle: 'احصل على إشعارات عند تحرك الأسعار بشكل كبير.',
        
        // Categories
        smartphones: 'الهواتف الذكية',
        laptops: 'أجهزة اللابتوب',
        accessories: 'الملحقات',
        appliances: 'الأجهزة',
        
        // Recommended Items
        highConfidence: 'تطابق عالي الثقة عبر',
        retailers: 'تجار',
        bestMargin: 'أفضل فرصة هامش ربح الآن.',
        recommendedTag: 'موصى به',
        opportunityTag: 'فرصة',
        
        // Filters
        filters: 'المرشحات',
        priceRange: 'نطاق السعر',
        location: 'الموقع',
        category: 'الفئة',
        availability: 'التوفر',
        sortBy: 'ترتيب حسب',
        reset: 'إعادة تعيين',
        applyFilters: 'تطبيق المرشحات',
        inStock: 'متوفر',
        outOfStock: 'غير متوفر',
        preOrder: 'طلب مسبق',
        lowToHigh: 'السعر: من الأدنى إلى الأعلى',
        highToLow: 'السعر: من الأعلى إلى الأدنى',
        newest: 'الأحدث أولاً',
        mostPopular: 'الأكثر شيوعاً',
        highestRated: 'الأعلى تقييماً',
        beirut: 'بيروت',
        tripoli: 'طرابلس',
        saida: 'صيدا',
        zahle: 'زحلة',
        byblos: 'جبيل',
        outsideBeirut: 'خارج بيروت',
        mountLebanon: 'جبل لبنان',
        northLebanon: 'شمال لبنان',
        southLebanon: 'جنوب لبنان',
        bekaa: 'البقاع',
        
        // Menu Navigation Items
        dashboard: 'لوحة التحكم',
        scanProductMenu: 'مسح منتج',
        scanHistory: 'سجل المسح',
        favorites: 'المفضلة',
        reports: 'التقارير',
        
        // Profile
        since: 'منذ',
        currentPlan: 'الخطة الحالية',
        upgradeProMax: 'الترقية إلى Pro Max',
        manageBilling: 'إدارة الفواتير',
        invoices: 'الفواتير',
        
        // About Page
        priceScanner: 'PriceScanner',
        findRealPrices: 'اعثر على أفضل الأسعار الحقيقية. لا أكاذيب، لا خدع.',
        everyoneLying: 'الجميع يكذب عليك',
        everyoneLyingText: 'كل متجر يدعي أن لديه "أفضل الأسعار". كل موقع يقول "تحقق من موقعنا للحصول على أفضل الأسعار". لكن الحقيقة هي أن أفضل الأسعار موجودة - فقط ليس حيث يقولون لك.',
        ourPurpose: 'هدفنا',
        findActualPrices: 'نساعدك في العثور على أفضل الأسعار الفعلية',
        findActualPricesText: 'مواقع مختلفة لها منتجات بأسعار مختلفة. ما يسميه متجر واحد "أفضل سعر" قد يكون أعلى بنسبة 20% من متجر آخر. نحن نفحص عبر تجار متعددين، نقارن الأسعار الحقيقية، ونريك أين يمكنك توفير المال بالفعل.',
        howItWorks: 'كيف يعمل',
        step1Title: 'المسح أو البحث',
        step1Text: 'استخدم كاميرتك لمسح الباركود، أو ارفع صورة منتج، أو ابحث بالاسم أو الرمز.',
        step2Title: 'المطابقة بالذكاء الاصطناعي',
        step2Text: 'يقوم الذكاء الاصطناعي لدينا بمطابقة منتجك عبر تجار ومواقع متعددة في الوقت الفعلي.',
        step3Title: 'مقارنة الأسعار',
        step3Text: 'اطلع على جميع الأسعار المتاحة جنباً إلى جنب. نريك أفضل صفقة حقيقية، وليس ادعاءات التسويق.',
        step4Title: 'وفر المال',
        step4Text: 'احصل على تنبيهات الأسعار، تتبع الصفقات، ولا تدفع أكثر من اللازم مرة أخرى. أفضل سعر موجود - سنساعدك في العثور عليه.',
        whyPriceScanner: 'لماذا PriceScanner؟',
        noLies: 'لا أكاذيب',
        noLiesText: 'أسعار حقيقية من متاجر حقيقية. لا حيل تسويقية.',
        multipleStores: 'متاجر متعددة',
        multipleStoresText: 'قارن الأسعار عبر عشرات التجار في لحظة.',
        realTime: 'في الوقت الفعلي',
        realTimeText: 'احصل على أسعار محدثة وتنبيهات عند تغيرها.',
        aiPowered: 'مدعوم بالذكاء الاصطناعي',
        aiPoweredText: 'مطابقة ذكية وتنبؤ بالأسعار باستخدام الذكاء الاصطناعي.',
        bestPriceExists: 'أفضل سعر موجود. سنساعدك في العثور عليه.',
        stopBelieving: 'توقف عن تصديق التسويق. ابدأ في توفير المال الحقيقي.',
        
        // Activity Types
        scanned: 'تم المسح',
        purchased: 'تم الشراء',
        searched: 'تم البحث',
        uploaded: 'تم الرفع',
        newPriceAlert: 'تنبيه سعر جديد',
        reportExported: 'تم تصدير التقرير',
        
        // Other
        scannerMenu: 'قائمة الماسح',
        products: 'منتجات',
        bestDeals: 'أفضل الصفقات',
        found: 'تم العثور',
        dropped: 'انخفض',
        by: 'بنسبة',
        deal: 'صفقة',
        deals: 'صفقات',
        priceDropped: 'انخفض السعر',
        weeklyPricing: 'نظرة عامة على الأسعار الأسبوعية',
        minutesAgo: 'دقائق مضت',
        hourAgo: 'ساعة مضت',
        yesterday: 'أمس',
        today: 'اليوم',
        
        // Notifications
        priceAlert: 'تنبيه السعر',
        priceDroppedBy: 'انخفض السعر بنسبة',
        at: 'في',
        newMatchFound: 'تم العثور على تطابق جديد',
        matchedAcross: 'مطابق عبر',
        scanComplete: 'اكتمل المسح',
        successfullyScanned: 'تم المسح بنجاح',
        weeklyReport: 'تقرير أسبوعي',
        weeklyReportReady: 'تقرير الأسعار الأسبوعي الخاص بك جاهز',
        
        // Scan Alert
        alertBestPrices: 'تنبيه - نجد لك أفضل الأسعار',
    },
};

export function HomeScreen({ userName, onLogout, initialLanguage = 'en' }: HomeScreenProps) {
    const insets = useSafeAreaInsets();
    const screenWidth = Dimensions.get('window').width;
    const drawerWidth = screenWidth * 0.75;
    const pageOpacity = useRef(new Animated.Value(0)).current;
    const pageTranslateY = useRef(new Animated.Value(10)).current;
    const welcomeOpacity = useRef(new Animated.Value(0)).current;
    const searchScale = useRef(new Animated.Value(1)).current;
    const scrollY = useRef(new Animated.Value(0)).current;
    const actionScrollX = useRef(new Animated.Value(0)).current;
    const topBarTranslateY = useRef(new Animated.Value(0)).current;
    const lastScrollY = useRef(0);
    const isScrollingDown = useRef(false);

    const [activeNav, setActiveNav] = useState<'home' | 'scan' | 'about' | 'profile'>('home');
    
    // Animated values for navigation labels
    // Active tab: label hidden (opacity 0), inactive tabs: label visible (opacity 1)
    const homeLabelOpacity = useRef(new Animated.Value(0)).current; // home is active, so hidden
    const scanLabelOpacity = useRef(new Animated.Value(1)).current; // scan is inactive, so visible
    const aboutLabelOpacity = useRef(new Animated.Value(1)).current; // about is inactive, so visible
    const profileLabelOpacity = useRef(new Animated.Value(1)).current; // profile is inactive, so visible
    
    const homeLabelTranslateY = useRef(new Animated.Value(8)).current; // home label starts down (hidden)
    const scanLabelTranslateY = useRef(new Animated.Value(0)).current; // inactive labels start visible
    const aboutLabelTranslateY = useRef(new Animated.Value(0)).current;
    const profileLabelTranslateY = useRef(new Animated.Value(0)).current;
    
    // Animated values for icon scales and glow
    const homeIconScale = useRef(new Animated.Value(1.15)).current;
    const scanIconScale = useRef(new Animated.Value(1)).current;
    const aboutIconScale = useRef(new Animated.Value(1)).current;
    const profileIconScale = useRef(new Animated.Value(1)).current;
    
    const homeGlowOpacity = useRef(new Animated.Value(1)).current;
    const scanGlowOpacity = useRef(new Animated.Value(0)).current;
    const aboutGlowOpacity = useRef(new Animated.Value(0)).current;
    const profileGlowOpacity = useRef(new Animated.Value(0)).current;
    
    const homeUnderlineScale = useRef(new Animated.Value(1)).current;
    const scanUnderlineScale = useRef(new Animated.Value(0)).current;
    const aboutUnderlineScale = useRef(new Animated.Value(0)).current;
    const profileUnderlineScale = useRef(new Animated.Value(0)).current;
    
    // Animated value for underline and glow position (translateX)
    // Initialize based on home being active (index 0)
    const navWidth = Math.min(screenWidth * 0.92, 400);
    const contentWidth = navWidth - 24; // Account for padding
    const itemWidth = contentWidth / 4;
    const initialUnderlinePosition = 12 + (0 * itemWidth) + (itemWidth / 2) - 20; // Home is at index 0, add padding offset
    const underlineTranslateX = useRef(new Animated.Value(initialUnderlinePosition)).current;
    
    // Animated values for page transitions
    const homePageOpacity = useRef(new Animated.Value(1)).current;
    const scanPageOpacity = useRef(new Animated.Value(0)).current;
    const aboutPageOpacity = useRef(new Animated.Value(0)).current;
    const profilePageOpacity = useRef(new Animated.Value(0)).current;
    
    const homePageTranslateX = useRef(new Animated.Value(0)).current;
    const scanPageTranslateX = useRef(new Animated.Value(screenWidth)).current;
    const aboutPageTranslateX = useRef(new Animated.Value(screenWidth)).current;
    const profilePageTranslateX = useRef(new Animated.Value(screenWidth)).current;
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isSubscriptionsOpen, setIsSubscriptionsOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<'standard' | 'pro' | 'premium'>('pro');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedAvailability, setSelectedAvailability] = useState<string | null>(null);
    const [selectedSortBy, setSelectedSortBy] = useState<string | null>(null);
    const menuProgress = useRef(new Animated.Value(0)).current;
    const notificationProgress = useRef(new Animated.Value(0)).current;
    const filterProgress = useRef(new Animated.Value(0)).current;
    const scanAlertScroll = useRef(new Animated.Value(0)).current;
    const [welcomeVisible, setWelcomeVisible] = useState(true);
    const [typedWelcome, setTypedWelcome] = useState('');
    const [reduceMotion, setReduceMotion] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isArabic, setIsArabic] = useState(initialLanguage === 'ar');
    const [permission, requestCameraPermission] = useCameraPermissions();
    const [lastScannedValue, setLastScannedValue] = useState<string | null>(null);
    const [linkInput, setLinkInput] = useState('');
    
    
    // Get current theme colors and translations
    const theme = isDarkTheme ? DARK_COLORS : LIGHT_COLORS;
    const t = translations[isArabic ? 'ar' : 'en'];
    
    // Use theme colors with fallback for compatibility
    const COLORS = {
        primaryBlue: theme.primaryBlue,
        deepBlue: theme.deepBlue,
        background: theme.background,
        backgroundSecondary: theme.backgroundSecondary,
        backgroundWhite: theme.background,
        lightGreyBg: theme.backgroundSecondary,
        softGreyText: theme.textSecondary,
        text: theme.text,
        textSecondary: theme.textSecondary,
        black: theme.text,
        shadow: theme.shadow,
        border: theme.border,
    };
    
    // Create dynamic styles based on theme
    const styles = createStyles(COLORS, isDarkTheme);
    
    // Get action cards with translations
    const actionCards = [
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

    // Get recommended items with translations
    const recommendedItems = [
        {
            id: 'r1',
            title: 'iPhone 15 Pro',
            subtitle: `${t.highConfidence} 4 ${t.retailers}.`,
            tag: t.recommendedTag,
            imageUrl:
                'https://images.unsplash.com/photo-1709178295038-acbeec786fcf?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: 'r2',
            title: 'MacBook Air M2',
            subtitle: t.bestMargin,
            tag: t.opportunityTag,
            imageUrl:
                'https://images.unsplash.com/photo-1659135890064-d57187f0946c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    ];

    // Get categories with translations
    const categories = [
        { id: 'c1', label: t.smartphones, icon: 'cellphone' },
        { id: 'c2', label: t.laptops, icon: 'laptop' },
        { id: 'c3', label: t.accessories, icon: 'headphones' },
        { id: 'c4', label: t.appliances, icon: 'fridge-outline' },
    ];

    // Get locations with translations
    const locations = [
        { id: 'beirut', label: t.beirut },
        { id: 'outside-beirut', label: t.outsideBeirut },
        { id: 'mount-lebanon', label: t.mountLebanon },
        { id: 'north', label: t.northLebanon },
        { id: 'south', label: t.southLebanon },
        { id: 'bekaa', label: t.bekaa },
    ];

    // Get availability options with translations
    const availabilityOptions = [
        { id: 'in-stock', label: t.inStock },
        { id: 'out-of-stock', label: t.outOfStock },
        { id: 'pre-order', label: t.preOrder },
    ];
    
    useEffect(() => {
        Animated.parallel([
            Animated.timing(pageOpacity, {
                toValue: 1,
                duration: 260,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(pageTranslateY, {
                toValue: 0,
                duration: 260,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();
    }, [pageOpacity, pageTranslateY]);

    useEffect(() => {
        // Typing-style welcome shown only once per HomeScreen mount
        const fullMessage = `${t.welcome}, ${userName}`;
        setTypedWelcome('');
        setWelcomeVisible(true);
        // Start fully visible while typing
        welcomeOpacity.setValue(1);

        let index = 0;
        const typingInterval = setInterval(() => {
            index += 1;
            setTypedWelcome(fullMessage.slice(0, index));
            if (index >= fullMessage.length) {
                clearInterval(typingInterval);
                // After a short pause, fade the whole message out
                setTimeout(() => {
                    Animated.timing(welcomeOpacity, {
                        toValue: 0,
                        duration: 300,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }).start(() => {
                        setWelcomeVisible(false);
                    });
                }, 5000);
            }
        }, 120);

        return () => {
            clearInterval(typingInterval);
        };
    }, [userName, welcomeOpacity]);

    // Animate navigation labels when activeNav changes
    useEffect(() => {
        const animationDuration = 350;
        const easing = Easing.bezier(0.4, 0.0, 0.2, 1);

        // Get all label animations
        const labelAnims: Array<{
            opacity: Animated.Value;
            translateY: Animated.Value;
            isActive: boolean;
        }> = [
            { opacity: homeLabelOpacity, translateY: homeLabelTranslateY, isActive: activeNav === 'home' },
            { opacity: scanLabelOpacity, translateY: scanLabelTranslateY, isActive: activeNav === 'scan' },
            { opacity: aboutLabelOpacity, translateY: aboutLabelTranslateY, isActive: activeNav === 'about' },
            { opacity: profileLabelOpacity, translateY: profileLabelTranslateY, isActive: activeNav === 'profile' },
        ];

        // Icon scale and glow animations
        const iconScales = [
            { scale: homeIconScale, glow: homeGlowOpacity, underline: homeUnderlineScale, isActive: activeNav === 'home' },
            { scale: scanIconScale, glow: scanGlowOpacity, underline: scanUnderlineScale, isActive: activeNav === 'scan' },
            { scale: aboutIconScale, glow: aboutGlowOpacity, underline: aboutUnderlineScale, isActive: activeNav === 'about' },
            { scale: profileIconScale, glow: profileGlowOpacity, underline: profileUnderlineScale, isActive: activeNav === 'profile' },
        ];

        // Animate all labels
        // Active tab: fade out and slide down (opacity 0, translateY 8)
        // Inactive tabs: fade in and slide up (opacity 1, translateY 0)
        const labelAnimations = labelAnims.map(({ opacity, translateY, isActive }) => {
            return Animated.parallel([
                Animated.timing(opacity, {
                    toValue: isActive ? 0 : 1, // Active = hidden, Inactive = visible
                    duration: animationDuration,
                    easing,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: isActive ? 8 : 0, // Active = slide down (hidden), Inactive = slide up (visible)
                    duration: animationDuration,
                    easing,
                    useNativeDriver: true,
                }),
            ]);
        });

        // Animate icon scales
        const iconAnimations = iconScales.map(({ scale, isActive }) => {
            return Animated.spring(scale, {
                toValue: isActive ? 1.15 : 1,
                tension: 180,
                friction: 12,
                useNativeDriver: true,
            });
        });

        // Calculate underline and glow position based on active tab
        // Use the same calculation as onLayout for consistency
        const tabOrder: Array<'home' | 'scan' | 'about' | 'profile'> = ['home', 'scan', 'about', 'profile'];
        const activeIndex = tabOrder.indexOf(activeNav);
        const screenWidth = Dimensions.get('window').width;
        const navWidth = Math.min(screenWidth * 0.92, 400);
        // Content width accounts for padding (12px each side)
        const contentWidth = navWidth - 24;
        const itemWidth = contentWidth / 4;
        // Position at center of each tab, offset by half the underline width (20px) to center it
        // Add 12px for left padding
        const underlinePosition = 12 + (activeIndex * itemWidth) + (itemWidth / 2) - 20;

        // Animate underline position
        const underlineAnimation = Animated.spring(underlineTranslateX, {
            toValue: underlinePosition,
            tension: 200,
            friction: 20,
            useNativeDriver: true,
        });

        Animated.parallel([...labelAnimations, ...iconAnimations, underlineAnimation]).start();
    }, [activeNav, homeLabelOpacity, scanLabelOpacity, aboutLabelOpacity, profileLabelOpacity, 
        homeLabelTranslateY, scanLabelTranslateY, aboutLabelTranslateY, profileLabelTranslateY,
        homeIconScale, scanIconScale, aboutIconScale, profileIconScale,
        underlineTranslateX]);

    // Handle scroll to show/hide top bar
    const handleScroll = (event: any) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const scrollDifference = currentScrollY - lastScrollY.current;

        // Threshold to prevent jitter
        const threshold = 5;
        
        if (Math.abs(scrollDifference) < threshold) {
            return;
        }

        if (scrollDifference > 0 && currentScrollY > 50) {
            // Scrolling down - hide top bar
            if (!isScrollingDown.current) {
                isScrollingDown.current = true;
                Animated.spring(topBarTranslateY, {
                    toValue: -100,
                    tension: 100,
                    friction: 8,
                    useNativeDriver: true,
                }).start();
            }
        } else if (scrollDifference < 0 || currentScrollY <= 50) {
            // Scrolling up or near top - show top bar
            if (isScrollingDown.current || currentScrollY <= 50) {
                isScrollingDown.current = false;
                Animated.spring(topBarTranslateY, {
                    toValue: 0,
                    tension: 100,
                    friction: 8,
                    useNativeDriver: true,
                }).start();
            }
        }

        lastScrollY.current = currentScrollY;
    };

    // Animate page transitions when activeNav changes
    useEffect(() => {
        const animationDuration = 350;
        const easing = Easing.out(Easing.cubic);
        
        // Define tab order for determining slide direction
        const tabOrder: Array<'home' | 'scan' | 'about' | 'profile'> = ['home', 'scan', 'about', 'profile'];
        const currentIndex = tabOrder.indexOf(activeNav);
        
        // Get all page animations
        const pageAnims: Array<{
            opacity: Animated.Value;
            translateX: Animated.Value;
            isActive: boolean;
            tabIndex: number;
        }> = [
            { opacity: homePageOpacity, translateX: homePageTranslateX, isActive: activeNav === 'home', tabIndex: 0 },
            { opacity: scanPageOpacity, translateX: scanPageTranslateX, isActive: activeNav === 'scan', tabIndex: 1 },
            { opacity: aboutPageOpacity, translateX: aboutPageTranslateX, isActive: activeNav === 'about', tabIndex: 2 },
            { opacity: profilePageOpacity, translateX: profilePageTranslateX, isActive: activeNav === 'profile', tabIndex: 3 },
        ];

        // Animate all pages
        const animations = pageAnims.map(({ opacity, translateX, isActive, tabIndex }) => {
            // Determine slide direction: if moving forward (right), new page slides from right, old slides left
            // If moving backward (left), new page slides from left, old slides right
            const slideDirection = tabIndex < currentIndex ? -1 : 1; // -1 = left, 1 = right
            
            return Animated.parallel([
                Animated.timing(opacity, {
                    toValue: isActive ? 1 : 0,
                    duration: animationDuration,
                    easing,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: isActive ? 0 : (slideDirection * screenWidth),
                    duration: animationDuration,
                    easing,
                    useNativeDriver: true,
                }),
            ]);
        });

        Animated.parallel(animations).start();
    }, [activeNav, screenWidth, homePageOpacity, scanPageOpacity, aboutPageOpacity, profilePageOpacity,
        homePageTranslateX, scanPageTranslateX, aboutPageTranslateX, profilePageTranslateX]);

    // Start scrolling alert animation when on scan page
    useEffect(() => {
        if (activeNav === 'scan') {
            const bannerWidth = screenWidth + 200;
            scanAlertScroll.setValue(0);
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scanAlertScroll, {
                        toValue: -bannerWidth,
                        duration: 15000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scanAlertScroll, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            scanAlertScroll.stopAnimation();
        }
    }, [activeNav, screenWidth, scanAlertScroll]);

    const openMenu = () => {
        setIsMenuOpen(true);
        menuProgress.setValue(0);
        Animated.spring(menuProgress, {
            toValue: 1,
            tension: 65,
            friction: 11,
            useNativeDriver: true,
        }).start();
    };

    const closeMenu = () => {
        Animated.timing(menuProgress, {
            toValue: 0,
            duration: 280,
            easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            useNativeDriver: true,
        }).start(() => {
            setIsMenuOpen(false);
        });
    };

    const openNotification = () => {
        setIsNotificationOpen(true);
        notificationProgress.setValue(0);
        Animated.timing(notificationProgress, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start();
    };

    const closeNotification = () => {
        Animated.timing(notificationProgress, {
            toValue: 0,
            duration: 250,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start(() => {
            setIsNotificationOpen(false);
        });
    };

    const openFilter = () => {
        setIsFilterOpen(true);
        filterProgress.setValue(0);
        Animated.timing(filterProgress, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start();
    };

    const closeFilter = () => {
        Animated.timing(filterProgress, {
            toValue: 0,
            duration: 250,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start(() => {
            setIsFilterOpen(false);
        });
    };

    const applyFilters = () => {
        // Apply filter logic here
        console.log('Filters applied:', {
            priceRange,
            selectedLocation,
            selectedCategory,
            selectedAvailability,
            selectedSortBy,
        });
        closeFilter();
    };

    const resetFilters = () => {
        setPriceRange({ min: '', max: '' });
        setSelectedLocation(null);
        setSelectedCategory(null);
        setSelectedAvailability(null);
        setSelectedSortBy(null);
    };

    const handleSearchFocus = () => {
        Animated.spring(searchScale, {
            toValue: 1.02,
            useNativeDriver: true,
            friction: 6,
        }).start();
    };

    const handleSearchBlur = () => {
        Animated.spring(searchScale, {
            toValue: 1,
            useNativeDriver: true,
            friction: 6,
        }).start();
    };

    // Gesture Handlers
    const tabOrder: Array<'home' | 'scan' | 'about' | 'profile'> = ['home', 'scan', 'about', 'profile'];

    // Horizontal swipe for page navigation
    const horizontalPanGesture = Gesture.Pan()
        .onUpdate((event) => {
            // Only handle horizontal swipes (not when scrolling vertically)
            if (Math.abs(event.velocityY) > Math.abs(event.velocityX)) {
                return;
            }
        })
        .onEnd((event) => {
            const currentIndex = tabOrder.indexOf(activeNav);
            const swipeThreshold = 50;
            const velocityThreshold = 500;

            // Swipe left (next page)
            if ((event.translationX < -swipeThreshold || event.velocityX < -velocityThreshold) && currentIndex < tabOrder.length - 1) {
                setActiveNav(tabOrder[currentIndex + 1]);
            }
            // Swipe right (previous page)
            else if ((event.translationX > swipeThreshold || event.velocityX > velocityThreshold) && currentIndex > 0) {
                setActiveNav(tabOrder[currentIndex - 1]);
            }
        })
        .runOnJS(true);

    // Left edge swipe for menu (only on home page)
    const menuEdgeGesture = Gesture.Pan()
        .onUpdate((event) => {
            // Only trigger if starting from left edge and on home page
            if (activeNav === 'home' && event.absoluteX < 50 && event.translationX > 0) {
                const progress = Math.min(event.translationX / drawerWidth, 1);
                menuProgress.setValue(progress);
            }
        })
        .onEnd((event) => {
            if (activeNav === 'home' && event.absoluteX < 50 && event.translationX > drawerWidth * 0.3) {
                openMenu();
            } else {
                Animated.timing(menuProgress, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            }
        })
        .runOnJS(true);

    // Vertical swipe from top for notifications
    const notificationPullGesture = Gesture.Pan()
        .onUpdate((event) => {
            // Only trigger if swiping down from near the top
            if (event.absoluteY < 100 && event.translationY > 0) {
                const progress = Math.min(event.translationY / 150, 1);
                notificationProgress.setValue(progress);
            }
        })
        .onEnd((event) => {
            if (event.absoluteY < 100 && event.translationY > 80) {
                openNotification();
            } else {
                Animated.timing(notificationProgress, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            }
        })
        .runOnJS(true);

    // Combine gestures
    const combinedGesture = Gesture.Race(
        notificationPullGesture,
        menuEdgeGesture,
        horizontalPanGesture
    );

    // Get sort options with translations
    const sortOptions = [
        { id: 'price-low', label: t.lowToHigh },
        { id: 'price-high', label: t.highToLow },
        { id: 'newest', label: t.newest },
        { id: 'popular', label: t.mostPopular },
        { id: 'rating', label: t.highestRated },
    ];

    interface ActivityItem {
        id: string;
        type: 'scan' | 'search' | 'buy' | 'upload' | 'alert' | 'export';
        title: string;
        subtitle: string;
        time: string;
        date?: string;
        details?: {
            productName?: string;
            store?: string;
            price?: string;
            quantity?: number;
            imageUrl?: string;
            dealsFound?: number;
            priceChange?: string;
        };
    }

    const recentActivity: ActivityItem[] = [
        {
            id: 'a1',
            type: 'scan',
            title: 'Scanned 12 products',
            subtitle: 'Electronics · 3 best deals found',
            time: '2 min ago',
            date: 'Today, 3:42 PM',
            details: {
                productName: 'iPhone 15 Pro, MacBook Air M2, AirPods Pro',
                dealsFound: 3,
            },
        },
        {
            id: 'a2',
            type: 'buy',
            title: 'Purchased MacBook Air M2',
            subtitle: 'Best Buy · $1,199.99',
            time: '5 min ago',
            date: 'Today, 3:39 PM',
            details: {
                productName: 'MacBook Air M2 256GB',
                store: 'Best Buy',
                price: '$1,199.99',
                quantity: 1,
            },
        },
        {
            id: 'a3',
            type: 'search',
            title: 'Searched for iPhone 15 Pro',
            subtitle: 'Found 8 retailers with prices',
            time: '15 min ago',
            date: 'Today, 3:29 PM',
            details: {
                productName: 'iPhone 15 Pro 256GB',
                dealsFound: 8,
            },
        },
        {
            id: 'a4',
            type: 'upload',
            title: 'Uploaded product photo',
            subtitle: 'Product matched: AirPods Pro',
            time: '1 hour ago',
            date: 'Today, 2:45 PM',
            details: {
                productName: 'AirPods Pro (2nd Gen)',
                imageUrl: 'https://example.com/image.jpg',
            },
        },
        {
            id: 'a5',
            type: 'alert',
            title: 'New price alert',
            subtitle: 'MacBook Air M2 dropped 4%',
            time: '18 min ago',
            date: 'Today, 3:26 PM',
            details: {
                productName: 'MacBook Air M2',
                priceChange: '-4%',
                store: 'Best Buy',
            },
        },
        {
            id: 'a6',
            type: 'scan',
            title: 'Scanned 5 products',
            subtitle: 'Home & Kitchen · 2 best deals',
            time: '2 hours ago',
            date: 'Today, 1:42 PM',
            details: {
                productName: 'Coffee Maker, Blender, Toaster',
                dealsFound: 2,
            },
        },
        {
            id: 'a7',
            type: 'buy',
            title: 'Purchased AirPods Pro',
            subtitle: 'Apple Store · $249.99',
            time: 'Yesterday',
            date: 'Yesterday, 4:15 PM',
            details: {
                productName: 'AirPods Pro (2nd Gen)',
                store: 'Apple Store',
                price: '$249.99',
                quantity: 1,
            },
        },
        {
            id: 'a8',
            type: 'search',
            title: 'Searched for Samsung TV',
            subtitle: 'Found 12 retailers',
            time: 'Yesterday',
            date: 'Yesterday, 2:30 PM',
            details: {
                productName: 'Samsung 55" 4K Smart TV',
                dealsFound: 12,
            },
        },
        {
            id: 'a9',
            type: 'export',
            title: 'Report exported',
            subtitle: 'Weekly pricing overview',
            time: 'Yesterday',
            date: 'Yesterday, 10:00 AM',
            details: {},
        },
    ];

    // Get notifications with translations
    const notifications = [
        {
            id: 'n1',
            title: t.priceAlert,
            message: isArabic 
                ? `MacBook Air M2 ${t.priceDroppedBy} 4% ${t.at} Best Buy`
                : `MacBook Air M2 ${t.priceDroppedBy} 4% ${t.at} Best Buy`,
            time: `2 ${t.minutesAgo}`,
            type: 'price',
        },
        {
            id: 'n2',
            title: t.newMatchFound,
            message: isArabic
                ? `iPhone 15 Pro ${t.matchedAcross} 4 ${t.retailers}`
                : `iPhone 15 Pro ${t.matchedAcross} 4 ${t.retailers}`,
            time: `15 ${t.minutesAgo}`,
            type: 'match',
        },
        {
            id: 'n3',
            title: t.scanComplete,
            message: `${t.successfullyScanned} 12 ${t.products}`,
            time: `1 ${t.hourAgo}`,
            type: 'scan',
        },
        {
            id: 'n4',
            title: t.weeklyReport,
            message: t.weeklyReportReady,
            time: t.yesterday,
            type: 'report',
        },
    ];

    const renderRecommendedCard = (item: (typeof recommendedItems)[number]) => {
        return (
            <Animated.View key={item.id} style={styles.recommendedWrapper}>
                <BlurView intensity={25} tint="light" style={styles.recommendedCard}>
                    <Image
                        source={{ uri: (item as any).imageUrl }}
                        style={styles.recommendedImage}
                        resizeMode="cover"
                    />
                    <View style={styles.recommendedTextContainer}>
                        <Text style={styles.recommendedTitle}>{item.title}</Text>
                        <Text style={styles.recommendedSubtitle}>{item.subtitle}</Text>
                        <View style={styles.recommendedTag}>
                            <Text style={styles.recommendedTagText}>{item.tag}</Text>
                        </View>
                    </View>
                </BlurView>
            </Animated.View>
        );
    };

    const renderCategoryCard = (item: (typeof categories)[number]) => {
        return (
            <View key={item.id} style={styles.categoryCardWrapper}>
                <Pressable style={styles.categoryCard}>
                    <View style={styles.categoryIcon}>
                        <MaterialCommunityIcons
                            name={item.icon as any}
                            size={18}
                            color={COLORS.backgroundWhite}
                        />
                    </View>
                    <Text style={styles.categoryLabel}>{item.label}</Text>
                </Pressable>
            </View>
        );
    };

    const getActivityIcon = (type: ActivityItem['type']) => {
        switch (type) {
            case 'scan':
                return 'barcode-scan';
            case 'search':
                return 'magnify';
            case 'buy':
                return 'shopping';
            case 'upload':
                return 'image-plus';
            case 'alert':
                return 'bell-alert';
            case 'export':
                return 'file-export';
            default:
                return 'circle';
        }
    };

    const getActivityColor = (type: ActivityItem['type']) => {
        switch (type) {
            case 'scan':
                return COLORS.primaryBlue;
            case 'search':
                return '#10B981';
            case 'buy':
                return '#F59E0B';
            case 'upload':
                return '#8B5CF6';
            case 'alert':
                return '#EF4444';
            case 'export':
                return '#6366F1';
            default:
                return COLORS.softGreyText;
        }
    };

    const renderActivityItem = (item: ActivityItem, showFullDetails: boolean = false) => {
        const iconName = getActivityIcon(item.type);
        const iconColor = getActivityColor(item.type);

        return (
            <Pressable key={item.id} style={styles.activityItemWrapper}>
                {({ pressed }) => (
                    <BlurView 
                        intensity={20} 
                        tint="light" 
                        style={[
                            styles.activityItem,
                            pressed && styles.activityItemPressed
                        ]}
                    >
                        <View style={[styles.activityAvatar, { backgroundColor: `${iconColor}15` }]}>
                            <MaterialCommunityIcons
                                name={iconName as any}
                                size={18}
                                color={iconColor}
                            />
                        </View>
                        <View style={styles.activityTextContainer}>
                            <View style={styles.activityHeader}>
                                <Text style={styles.activityTitle}>{item.title}</Text>
                                {showFullDetails && item.date && (
                                    <Text style={styles.activityDate}>{item.date}</Text>
                                )}
                            </View>
                            <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
                            {showFullDetails && item.details && (
                                <View style={styles.activityDetails}>
                                    {item.details.productName && (
                                        <View style={styles.activityDetailRow}>
                                            <MaterialCommunityIcons
                                                name="tag-outline"
                                                size={14}
                                                color={COLORS.softGreyText}
                                            />
                                            <Text style={styles.activityDetailText}>
                                                {item.details.productName}
                                            </Text>
                                        </View>
                                    )}
                                    {item.details.store && (
                                        <View style={styles.activityDetailRow}>
                                            <MaterialCommunityIcons
                                                name="store-outline"
                                                size={14}
                                                color={COLORS.softGreyText}
                                            />
                                            <Text style={styles.activityDetailText}>
                                                {item.details.store}
                                            </Text>
                                        </View>
                                    )}
                                    {item.details.price && (
                                        <View style={styles.activityDetailRow}>
                                            <MaterialCommunityIcons
                                                name="currency-usd"
                                                size={14}
                                                color={COLORS.softGreyText}
                                            />
                                            <Text style={styles.activityDetailText}>
                                                {item.details.price}
                                                {item.details.quantity && item.details.quantity > 1 && ` × ${item.details.quantity}`}
                                            </Text>
                                        </View>
                                    )}
                                    {item.details.dealsFound !== undefined && (
                                        <View style={styles.activityDetailRow}>
                                            <MaterialCommunityIcons
                                                name="star-outline"
                                                size={14}
                                                color={COLORS.softGreyText}
                                            />
                                            <Text style={styles.activityDetailText}>
                                                {item.details.dealsFound} {item.details.dealsFound === 1 ? t.deal : t.deals} {t.found}
                                            </Text>
                                        </View>
                                    )}
                                    {item.details.priceChange && (
                                        <View style={styles.activityDetailRow}>
                                            <MaterialCommunityIcons
                                                name="trending-down"
                                                size={14}
                                                color="#EF4444"
                                            />
                                            <Text style={[styles.activityDetailText, { color: '#EF4444' }]}>
                                                {t.priceDropped} {item.details.priceChange}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                        <View style={styles.activityMeta}>
                            <Text style={[styles.activityTime, { color: iconColor }]}>{item.time}</Text>
                            <View style={styles.activityChevronContainer}>
                                <MaterialCommunityIcons
                                    name="chevron-right"
                                    size={18}
                                    color={COLORS.textSecondary}
                                />
                            </View>
                        </View>
                    </BlurView>
                )}
            </Pressable>
        );
    };

    const isProfile = activeNav === 'profile';
    const isScan = activeNav === 'scan';

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar style="dark" />
            <GestureDetector gesture={combinedGesture}>
            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity: pageOpacity,
                        transform: [{ translateY: pageTranslateY }],
                    },
                ]}
            >
                {/* Top Bar */}
                <Animated.View
                    style={[
                        styles.topBarContainer,
                        {
                            transform: [{ translateY: topBarTranslateY }],
                        },
                    ]}
                >
                    <View style={styles.topBar}>
                        <BlurView intensity={isDarkTheme ? 30 : 35} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                        <LinearGradient
                            colors={isDarkTheme 
                                ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={StyleSheet.absoluteFill}
                        />
                        <View style={styles.topBarContent}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (isMenuOpen) {
                                        closeMenu();
                                    } else {
                                        openMenu();
                                    }
                                }}
                                style={styles.menuButton}
                                activeOpacity={0.8}
                            >
                                <MaterialCommunityIcons
                                    name="menu"
                                    size={22}
                                    color={isDarkTheme ? '#FFFFFF' : COLORS.black}
                                />
                            </TouchableOpacity>
                            
                            <View style={styles.topBarCenter}>
                                <Text style={styles.topBarTitle}>Scanner</Text>
                            </View>
                            
                            <TouchableOpacity
                                onPress={openNotification}
                                style={styles.topBarIconButton}
                                activeOpacity={0.8}
                            >
                                <MaterialCommunityIcons
                                    name="bell-outline"
                                    size={22}
                                    color={isDarkTheme ? '#FFFFFF' : '#1A73E8'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>

                {/* Notification Overlay */}
                {isNotificationOpen && (
                    <Animated.View
                        style={[
                            styles.notificationOverlay,
                            {
                                opacity: notificationProgress,
                            },
                        ]}
                    >
                        <TouchableOpacity
                            style={styles.notificationBackdrop}
                            activeOpacity={1}
                            onPress={closeNotification}
                        />
                        <Animated.View
                            style={[
                                styles.notificationPanel,
                                {
                                    transform: [
                                        {
                                            translateY: notificationProgress.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-Dimensions.get('window').height * 0.6, 0],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <BlurView intensity={30} tint={isDarkTheme ? "dark" : "light"} style={styles.notificationPanelContent}>
                                <View style={styles.notificationHeader}>
                                    <Text style={styles.notificationHeaderTitle}>{t.notifications}</Text>
                                    <TouchableOpacity
                                        onPress={closeNotification}
                                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    >
                                        <MaterialCommunityIcons
                                            name="close"
                                            size={24}
                                            color={COLORS.softGreyText}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    style={styles.notificationList}
                                >
                                    {notifications.map((notification) => {
                                        const iconName =
                                            notification.type === 'price'
                                                ? 'bell-alert'
                                                : notification.type === 'match'
                                                ? 'check-circle'
                                                : notification.type === 'scan'
                                                ? 'barcode-scan'
                                                : 'file-chart';
                                        return (
                                            <View key={notification.id} style={styles.notificationItem}>
                                                <BlurView intensity={20} tint={isDarkTheme ? "dark" : "light"} style={styles.notificationItemContent}>
                                                    <View style={styles.notificationIconWrapper}>
                                                        <MaterialCommunityIcons
                                                            name={iconName as any}
                                                            size={20}
                                                            color={COLORS.primaryBlue}
                                                        />
                                                    </View>
                                                    <View style={styles.notificationTextContainer}>
                                                        <Text style={styles.notificationItemTitle}>
                                                            {notification.title}
                                                        </Text>
                                                        <Text style={styles.notificationItemMessage}>
                                                            {notification.message}
                                                        </Text>
                                                        <Text style={styles.notificationItemTime}>
                                                            {notification.time}
                                                        </Text>
                                                    </View>
                                                </BlurView>
                                            </View>
                                        );
                                    })}
                                </ScrollView>
                            </BlurView>
                        </Animated.View>
                    </Animated.View>
                )}

                {/* Filter Overlay */}
                {isFilterOpen && (
                    <Animated.View
                        style={[
                            styles.filterOverlay,
                            {
                                opacity: filterProgress,
                            },
                        ]}
                    >
                        <TouchableOpacity
                            style={styles.filterBackdrop}
                            activeOpacity={1}
                            onPress={closeFilter}
                        />
                        <Animated.View
                            style={[
                                styles.filterPanel,
                                {
                                    transform: [
                                        {
                                            translateY: filterProgress.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [Dimensions.get('window').height, 0],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <BlurView intensity={30} tint="light" style={styles.filterPanelContent}>
                                <View style={styles.filterHeader}>
                                    <Text style={styles.filterHeaderTitle}>{t.filters}</Text>
                                    <TouchableOpacity
                                        onPress={closeFilter}
                                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    >
                                        <MaterialCommunityIcons
                                            name="close"
                                            size={24}
                                            color={COLORS.softGreyText}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    style={styles.filterScrollContent}
                                >
                                    {/* Price Range */}
                                    <View style={styles.filterSection}>
                                        <Text style={styles.filterSectionTitle}>{t.priceRange}</Text>
                                        <View style={styles.priceRangeContainer}>
                                            <View style={styles.priceInputContainer}>
                                                <Text style={styles.priceLabel}>Min</Text>
                                                <TextInput
                                                    style={styles.priceInput}
                                                    placeholder="0"
                                                    keyboardType="numeric"
                                                    value={priceRange.min}
                                                    onChangeText={(text) => {
                                                        // Only allow numbers and empty string
                                                        if (text === '' || /^\d+$/.test(text)) {
                                                            setPriceRange({
                                                                ...priceRange,
                                                                min: text,
                                                            });
                                                        }
                                                    }}
                                                />
                                            </View>
                                            <View style={styles.priceInputContainer}>
                                                <Text style={styles.priceLabel}>Max</Text>
                                                <TextInput
                                                    style={styles.priceInput}
                                                    placeholder="0"
                                                    keyboardType="numeric"
                                                    value={priceRange.max}
                                                    onChangeText={(text) => {
                                                        // Only allow numbers and empty string
                                                        if (text === '' || /^\d+$/.test(text)) {
                                                            setPriceRange({
                                                                ...priceRange,
                                                                max: text,
                                                            });
                                                        }
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    {/* Location */}
                                    <View style={styles.filterSection}>
                                        <Text style={styles.filterSectionTitle}>{t.location}</Text>
                                        <View style={styles.filterOptionsGrid}>
                                            {locations.map((location) => (
                                                <TouchableOpacity
                                                    key={location.id}
                                                    style={[
                                                        styles.filterOptionChip,
                                                        selectedLocation === location.id &&
                                                            styles.filterOptionChipActive,
                                                    ]}
                                                    onPress={() =>
                                                        setSelectedLocation(
                                                            selectedLocation === location.id
                                                                ? null
                                                                : location.id
                                                        )
                                                    }
                                                >
                                                    <Text
                                                        style={[
                                                            styles.filterOptionChipText,
                                                            selectedLocation === location.id &&
                                                                styles.filterOptionChipTextActive,
                                                        ]}
                                                    >
                                                        {location.label}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>

                                    {/* Category */}
                                    <View style={styles.filterSection}>
                                        <Text style={styles.filterSectionTitle}>{t.category}</Text>
                                        <View style={styles.filterOptionsGrid}>
                                            {categories.map((category) => (
                                                <TouchableOpacity
                                                    key={category.id}
                                                    style={[
                                                        styles.filterOptionChip,
                                                        selectedCategory === category.id &&
                                                            styles.filterOptionChipActive,
                                                    ]}
                                                    onPress={() =>
                                                        setSelectedCategory(
                                                            selectedCategory === category.id
                                                                ? null
                                                                : category.id
                                                        )
                                                    }
                                                >
                                                    <MaterialCommunityIcons
                                                        name={category.icon as any}
                                                        size={16}
                                                        color={
                                                            selectedCategory === category.id
                                                                ? COLORS.backgroundWhite
                                                                : COLORS.primaryBlue
                                                        }
                                                        style={styles.filterOptionIcon}
                                                    />
                                                    <Text
                                                        style={[
                                                            styles.filterOptionChipText,
                                                            selectedCategory === category.id &&
                                                                styles.filterOptionChipTextActive,
                                                        ]}
                                                    >
                                                        {category.label}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>

                                    {/* Availability */}
                                    <View style={styles.filterSection}>
                                        <Text style={styles.filterSectionTitle}>{t.availability}</Text>
                                        <View style={styles.filterOptionsList}>
                                            {availabilityOptions.map((option) => (
                                                <TouchableOpacity
                                                    key={option.id}
                                                    style={[
                                                        styles.filterOptionRow,
                                                        selectedAvailability === option.id &&
                                                            styles.filterOptionRowActive,
                                                    ]}
                                                    onPress={() =>
                                                        setSelectedAvailability(
                                                            selectedAvailability === option.id
                                                                ? null
                                                                : option.id
                                                        )
                                                    }
                                                >
                                                    <Text
                                                        style={[
                                                            styles.filterOptionRowText,
                                                            selectedAvailability === option.id &&
                                                                styles.filterOptionRowTextActive,
                                                        ]}
                                                    >
                                                        {option.label}
                                                    </Text>
                                                    {selectedAvailability === option.id && (
                                                        <MaterialCommunityIcons
                                                            name="check"
                                                            size={20}
                                                            color={COLORS.primaryBlue}
                                                        />
                                                    )}
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>

                                    {/* Sort By */}
                                    <View style={styles.filterSection}>
                                        <Text style={styles.filterSectionTitle}>{t.sortBy}</Text>
                                        <View style={styles.filterOptionsList}>
                                            {sortOptions.map((option) => (
                                                <TouchableOpacity
                                                    key={option.id}
                                                    style={[
                                                        styles.filterOptionRow,
                                                        selectedSortBy === option.id &&
                                                            styles.filterOptionRowActive,
                                                    ]}
                                                    onPress={() =>
                                                        setSelectedSortBy(
                                                            selectedSortBy === option.id
                                                                ? null
                                                                : option.id
                                                        )
                                                    }
                                                >
                                                    <Text
                                                        style={[
                                                            styles.filterOptionRowText,
                                                            selectedSortBy === option.id &&
                                                                styles.filterOptionRowTextActive,
                                                        ]}
                                                    >
                                                        {option.label}
                                                    </Text>
                                                    {selectedSortBy === option.id && (
                                                        <MaterialCommunityIcons
                                                            name="check"
                                                            size={20}
                                                            color={COLORS.primaryBlue}
                                                        />
                                                    )}
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                </ScrollView>

                                {/* Filter Actions */}
                                <View style={styles.filterActions}>
                                    <TouchableOpacity
                                        style={styles.filterResetButton}
                                        onPress={resetFilters}
                                    >
                                        <Text style={styles.filterResetButtonText}>{t.reset}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.filterApplyButton}
                                        onPress={applyFilters}
                                    >
                                        <Text style={styles.filterApplyButtonText}>{t.applyFilters}</Text>
                                    </TouchableOpacity>
                                </View>
                            </BlurView>
                        </Animated.View>
                    </Animated.View>
                )}

                {/* Menu Overlay */}
                {isMenuOpen && (
                    <Animated.View
                        style={[
                            styles.menuOverlay,
                            {
                                opacity: menuProgress,
                                transform: [
                                    {
                                        translateX: menuProgress.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-drawerWidth, 0],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <BlurView intensity={20} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                        <TouchableOpacity
                            style={styles.menuBackdrop}
                            activeOpacity={1}
                            onPress={closeMenu}
                        />
                        <View style={styles.menuContainer}>
                            <BlurView intensity={25} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                            <LinearGradient
                                colors={isDarkTheme ? ['#1A1A1A', '#1F1F1F'] : ['#FFFFFF', '#F7FAFF']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={StyleSheet.absoluteFill}
                            />
                            <View style={styles.menuContent}>
                                <View style={styles.menuHeaderRow}>
                                    <View style={styles.menuHeaderLeft}>
                                        <View style={styles.menuAIIconWrapper}>
                                            <MaterialCommunityIcons
                                                name="robot-outline"
                                                size={24}
                                                color={COLORS.primaryBlue}
                                            />
                                        </View>
                                        <Text style={styles.menuTitle}>{t.scannerMenu}</Text>
                                    </View>
                                    <Pressable
                                        onPress={closeMenu}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                        style={({ pressed }) => [
                                            styles.menuCloseButton,
                                            pressed && styles.menuCloseButtonPressed,
                                        ]}
                                    >
                                        <MaterialCommunityIcons
                                            name="close"
                                            size={20}
                                            color={COLORS.textSecondary}
                                        />
                                    </Pressable>
                                </View>
                                <ScrollView 
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.menuScrollContent}
                                >
                                    <Text style={styles.menuSectionTitle}>{t.navigation}</Text>
                                    {[
                                        { label: t.home, icon: 'home-outline' },
                                        { label: t.dashboard, icon: 'view-dashboard-outline' },
                                        { label: t.scanProductMenu, icon: 'barcode-scan' },
                                        { label: t.scanHistory, icon: 'history' },
                                        { label: t.favorites, icon: 'star-outline' },
                                        { label: t.reports, icon: 'file-chart-outline' },
                                        { label: t.notifications, icon: 'bell-outline' },
                                    ].map((item) => (
                                        <Pressable 
                                            key={item.label} 
                                            style={({ pressed }) => [
                                                styles.menuItem,
                                                pressed && styles.menuItemPressed,
                                            ]}
                                        >
                                            <View style={styles.menuItemContent}>
                                                <View style={styles.menuItemIconWrapper}>
                                                    <MaterialCommunityIcons
                                                        name={item.icon as any}
                                                        size={20}
                                                        color={COLORS.primaryBlue}
                                                    />
                                                </View>
                                                <Text style={styles.menuItemText}>{item.label}</Text>
                                            </View>
                                        </Pressable>
                                    ))}
                                    <View style={styles.menuDivider} />

                                <Pressable
                                    style={({ pressed }) => [
                                        styles.menuSectionHeaderRow,
                                        pressed && styles.menuSectionHeaderPressed,
                                    ]}
                                    onPress={() => setIsAccountOpen((prev) => !prev)}
                                >
                                    <Text style={styles.menuSectionTitle}>{t.account}</Text>
                                    <MaterialCommunityIcons
                                        name={isAccountOpen ? 'chevron-up' : 'chevron-down'}
                                        size={16}
                                        color={COLORS.textSecondary}
                                    />
                                </Pressable>
                                {isAccountOpen && (
                                    <>
                                        <Pressable 
                                            style={({ pressed }) => [
                                                styles.menuItem,
                                                pressed && styles.menuItemPressed,
                                            ]}
                                        >
                                            <View style={styles.menuItemContent}>
                                                <View style={styles.menuItemIconWrapper}>
                                                    <MaterialCommunityIcons
                                                        name="account-outline"
                                                        size={20}
                                                        color={COLORS.primaryBlue}
                                                    />
                                                </View>
                                                <Text style={styles.menuItemText}>Profile</Text>
                                            </View>
                                        </Pressable>
                                        <Pressable 
                                            style={({ pressed }) => [
                                                styles.menuItem,
                                                pressed && styles.menuItemPressed,
                                            ]}
                                        >
                                            <View style={styles.menuItemContent}>
                                                <View style={styles.menuItemIconWrapper}>
                                                    <MaterialCommunityIcons
                                                        name="login"
                                                        size={20}
                                                        color={COLORS.primaryBlue}
                                                    />
                                                </View>
                                                <Text style={styles.menuItemText}>{isArabic ? 'تسجيل الدخول' : 'Login'}</Text>
                                            </View>
                                        </Pressable>
                                        <Pressable
                                            style={({ pressed }) => [
                                                styles.menuItem,
                                                pressed && styles.menuItemPressed,
                                            ]}
                                            onPress={() =>
                                                Alert.alert('Log out', 'Are you sure you want to log out?', [
                                                    { text: 'Cancel', style: 'cancel' },
                                                    { text: 'Log out', style: 'destructive', onPress: onLogout },
                                                ])
                                            }
                                        >
                                            <View style={styles.menuItemContent}>
                                                <View style={styles.menuItemIconWrapper}>
                                                    <MaterialCommunityIcons
                                                        name="logout"
                                                        size={20}
                                                        color="#EF4444"
                                                    />
                                                </View>
                                                <Text style={[styles.menuItemText, styles.menuItemDanger]}>
                                                    Logout
                                                </Text>
                                            </View>
                                        </Pressable>
                                    </>
                                )}

                                <Pressable
                                    style={({ pressed }) => [
                                        styles.menuSectionHeaderRow,
                                        pressed && styles.menuSectionHeaderPressed,
                                    ]}
                                    onPress={() => setIsSettingsOpen((prev) => !prev)}
                                >
                                    <Text style={styles.menuSectionTitle}>{t.settings}</Text>
                                    <MaterialCommunityIcons
                                        name={isSettingsOpen ? 'chevron-up' : 'chevron-down'}
                                        size={16}
                                        color={COLORS.textSecondary}
                                    />
                                </Pressable>
                                {isSettingsOpen && (
                                    <>
                                        {/* Theme Toggle */}
                                        <View style={styles.menuToggleItem}>
                                            <View style={styles.menuToggleRow}>
                                                <MaterialCommunityIcons
                                                    name={isDarkTheme ? 'weather-night' : 'weather-sunny'}
                                                    size={20}
                                                    color={COLORS.primaryBlue}
                                                />
                                                <View style={styles.menuToggleContent}>
                                                    <Text style={styles.menuToggleLabel}>
                                                        {t.theme}
                                                    </Text>
                                                    <Text style={styles.menuToggleSubtext}>
                                                        {isDarkTheme ? t.dark : t.light}
                                                    </Text>
                                                </View>
                                            </View>
                                            <Switch
                                                value={isDarkTheme}
                                                onValueChange={setIsDarkTheme}
                                                trackColor={{ false: COLORS.border, true: COLORS.primaryBlue }}
                                                thumbColor={isDarkTheme ? '#FFFFFF' : '#FFFFFF'}
                                                ios_backgroundColor={COLORS.border}
                                            />
                                        </View>

                                        {/* Language Toggle */}
                                        <View style={styles.menuToggleItem}>
                                            <View style={styles.menuToggleRow}>
                                                <MaterialCommunityIcons
                                                    name="translate"
                                                    size={20}
                                                    color={COLORS.primaryBlue}
                                                />
                                                <View style={styles.menuToggleContent}>
                                                    <Text style={styles.menuToggleLabel}>
                                                        {t.language}
                                                    </Text>
                                                    <Text style={styles.menuToggleSubtext}>
                                                        {isArabic ? t.arabic : t.english}
                                                    </Text>
                                                </View>
                                            </View>
                                            <Switch
                                                value={isArabic}
                                                onValueChange={setIsArabic}
                                                trackColor={{ false: '#E5E7EB', true: COLORS.primaryBlue }}
                                                thumbColor={isArabic ? '#FFFFFF' : '#FFFFFF'}
                                                ios_backgroundColor="#E5E7EB"
                                            />
                                        </View>

                                        <Pressable 
                                            style={({ pressed }) => [
                                                styles.menuItem,
                                                pressed && styles.menuItemPressed,
                                            ]}
                                        >
                                            <View style={styles.menuItemContent}>
                                                <View style={styles.menuItemIconWrapper}>
                                                    <MaterialCommunityIcons
                                                        name="tune-variant"
                                                        size={20}
                                                        color={COLORS.primaryBlue}
                                                    />
                                                </View>
                                                <Text style={styles.menuItemText}>{isArabic ? 'عام' : 'General'}</Text>
                                            </View>
                                        </Pressable>
                                        <Pressable 
                                            style={({ pressed }) => [
                                                styles.menuSubItem,
                                                pressed && styles.menuSubItemPressed,
                                            ]}
                                        >
                                            <Text style={styles.menuSubItemText}>
                                                {t.changePassword}
                                            </Text>
                                        </Pressable>
                                        <Pressable 
                                            style={({ pressed }) => [
                                                styles.menuSubItem,
                                                pressed && styles.menuSubItemPressed,
                                            ]}
                                        >
                                            <Text style={styles.menuSubItemText}>
                                                {t.twoFactorAuth}
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            style={({ pressed }) => [
                                                styles.menuSubItem,
                                                pressed && styles.menuSubItemPressed,
                                            ]}
                                            onPress={() =>
                                                Alert.alert(
                                                    t.deleteAccount,
                                                    isArabic 
                                                        ? 'هل أنت متأكد أنك تريد حذف حسابك نهائياً؟'
                                                        : 'Are you sure you want to permanently delete your account?',
                                                    [
                                                        { text: isArabic ? 'إلغاء' : 'Cancel', style: 'cancel' },
                                                        { text: isArabic ? 'حذف' : 'Delete', style: 'destructive' },
                                                    ]
                                                )
                                            }
                                        >
                                            <Text style={[styles.menuSubItemText, styles.menuItemDanger]}>
                                                {t.deleteAccount}
                                            </Text>
                                        </Pressable>
                                    </>
                                )}

                                <Pressable
                                    style={({ pressed }) => [
                                        styles.menuSectionHeaderRow,
                                        pressed && styles.menuSectionHeaderPressed,
                                    ]}
                                    onPress={() => setIsSubscriptionsOpen((prev) => !prev)}
                                >
                                    <Text style={styles.menuSectionTitle}>{t.subscriptions}</Text>
                                    <MaterialCommunityIcons
                                        name={isSubscriptionsOpen ? 'chevron-up' : 'chevron-down'}
                                        size={16}
                                        color={COLORS.textSecondary}
                                    />
                                </Pressable>
                                {isSubscriptionsOpen && (
                                    <>
                                        <Pressable 
                                            style={({ pressed }) => [
                                                styles.menuItem,
                                                pressed && styles.menuItemPressed,
                                            ]}
                                        >
                                            <View style={styles.menuItemContent}>
                                                <View style={styles.menuItemIconWrapper}>
                                                    <MaterialCommunityIcons
                                                        name="crown-outline"
                                                        size={20}
                                                        color={COLORS.primaryBlue}
                                                    />
                                                </View>
                                                <Text style={styles.menuItemText}>Current plan: Pro</Text>
                                            </View>
                                        </Pressable>
                                        <Pressable 
                                            style={({ pressed }) => [
                                                styles.menuSubItem,
                                                pressed && styles.menuSubItemPressed,
                                            ]}
                                        >
                                            <Text style={styles.menuSubItemText}>Upgrade to Pro Max</Text>
                                        </Pressable>
                                        <Pressable 
                                            style={({ pressed }) => [
                                                styles.menuSubItem,
                                                pressed && styles.menuSubItemPressed,
                                            ]}
                                        >
                                            <Text style={styles.menuSubItemText}>Manage billing</Text>
                                        </Pressable>
                                        <Pressable 
                                            style={({ pressed }) => [
                                                styles.menuSubItem,
                                                pressed && styles.menuSubItemPressed,
                                            ]}
                                        >
                                            <Text style={styles.menuSubItemText}>Invoices</Text>
                                        </Pressable>
                                    </>
                                )}
                            </ScrollView>
                            </View>
                        </View>
                    </Animated.View>
                )}

                <View style={styles.pagesContainer}>
                    {/* Home/History Page */}
                    <Animated.View
                        style={[
                            styles.pageWrapper,
                            {
                                opacity: homePageOpacity,
                                transform: [{ translateX: homePageTranslateX }],
                            },
                        ]}
                        pointerEvents={activeNav === 'home' ? 'auto' : 'none'}
                        collapsable={false}
                    >
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                            onScroll={handleScroll}
                        >
                            {!isProfile && !isScan && (
                                <>
                            {/* Welcome Section */}
                            {welcomeVisible && (
                                <Animated.View style={{ opacity: welcomeOpacity, marginBottom: 12 }}>
                                    <Text style={styles.welcomeCombined}>{typedWelcome}</Text>
                                </Animated.View>
                            )}

                            {/* Search + Filter row */}
                            <View style={styles.searchRow}>
                                <Animated.View
                                    style={[
                                        styles.searchBar,
                                        {
                                            transform: [{ scale: searchScale }],
                                        },
                                    ]}
                                >
                                    <MaterialCommunityIcons
                                        name="magnify"
                                        size={20}
                                        color={COLORS.textSecondary}
                                        style={styles.searchIcon}
                                    />
                                    <TextInput
                                        placeholder={t.search}
                                        placeholderTextColor={COLORS.textSecondary}
                                        style={styles.searchInput}
                                        onFocus={handleSearchFocus}
                                        onBlur={handleSearchBlur}
                                    />
                                </Animated.View>
                                <TouchableOpacity
                                    style={styles.filterButton}
                                    activeOpacity={0.9}
                                    onPress={openFilter}
                                >
                                    <MaterialCommunityIcons
                                        name="tune-variant"
                                        size={20}
                                        color="#FFFFFF"
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Action Cards – horizontal scroll */}
                            <Animated.View
                                style={[
                                    styles.actionParallax,
                                    {
                                        transform: [
                                            {
                                                translateY: scrollY.interpolate({
                                                    inputRange: [0, 200],
                                                    outputRange: [0, -4],
                                                    extrapolate: 'clamp',
                                                }),
                                            },
                                        ],
                                    },
                                ]}
                            >
                                <Animated.ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.actionScroll}
                                    decelerationRate="fast"
                                    snapToAlignment="start"
                                    onScroll={Animated.event(
                                        [{ nativeEvent: { contentOffset: { x: actionScrollX } } }],
                                        { useNativeDriver: false }
                                    )}
                                    scrollEventThrottle={16}
                                >
                                    {actionCards.map((card) => (
                                        <Pressable key={card.id} style={styles.actionPressable}>
                                            {({ pressed }) => (
                                                <Animated.View
                                                    style={[
                                                        styles.actionGradientWrapper,
                                                        {
                                                            transform: [
                                                                {
                                                                    scale: pressed ? 0.97 : 1,
                                                                },
                                                            ],
                                                        },
                                                    ]}
                                                >
                                                    <BlurView intensity={24} tint="light" style={styles.actionGlass}>
                                                        <LinearGradient
                                                            colors={[COLORS.primaryBlue, COLORS.deepBlue]}
                                                            start={{ x: 0, y: 0 }}
                                                            end={{ x: 1, y: 1 }}
                                                            style={styles.actionGradient}
                                                        >
                                                            <View style={styles.actionIconCircle}>
                                                                <MaterialCommunityIcons
                                                                    name={card.icon as any}
                                                                    size={22}
                                                                    color={COLORS.backgroundWhite}
                                                                />
                                                            </View>
                                                            <View style={styles.actionTextBlock}>
                                                                <Text style={styles.actionTitle}>{card.title}</Text>
                                                                <Text style={styles.actionSubtitle}>
                                                                    {card.subtitle}
                                                                </Text>
                                                            </View>
                                                        </LinearGradient>
                                                    </BlurView>
                                                </Animated.View>
                                            )}
                                        </Pressable>
                                    ))}
                                </Animated.ScrollView>
                                <View style={styles.carouselDots}>
                                    {actionCards.map((card, index) => {
                                        const inputRange = [
                                            (index - 1) * ACTION_CARD_WIDTH,
                                            index * ACTION_CARD_WIDTH,
                                            (index + 1) * ACTION_CARD_WIDTH,
                                        ];
                                        const dotWidth = actionScrollX.interpolate({
                                            inputRange,
                                            outputRange: [6, 16, 6],
                                            extrapolate: 'clamp',
                                        });
                                        const dotOpacity = actionScrollX.interpolate({
                                            inputRange,
                                            outputRange: [0.4, 1, 0.4],
                                            extrapolate: 'clamp',
                                        });
                                        return (
                                            <Animated.View
                                                key={card.id}
                                                style={[
                                                    styles.carouselDot,
                                                    { width: dotWidth, opacity: dotOpacity },
                                                ]}
                                            />
                                        );
                                    })}
                                </View>
                            </Animated.View>

                            {/* Recommended Section */}
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{t.recommended}</Text>
                                <Text style={styles.sectionSubtitle}>
                                    {t.recommendedSubtitle}
                                </Text>
                            </View>
                            {recommendedItems.map((item) => renderRecommendedCard(item))}

                            {/* Popular Categories */}
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{t.popularCategories}</Text>
                                <Text style={styles.sectionSubtitle}>{t.categoriesSubtitle}</Text>
                            </View>
                            <View style={styles.categoriesGrid}>
                                {categories.map((category) => renderCategoryCard(category))}
                            </View>

                            {/* Recent Activity - Only on Home */}
                            {activeNav === 'home' && (
                                <>
                                    <View style={styles.sectionHeader}>
                                        <Text style={styles.sectionTitle}>{t.recentActivity}</Text>
                                        <Text style={styles.sectionSubtitle}>
                                            {t.recentActivitySubtitle}
                                        </Text>
                                    </View>
                                    <View style={styles.activityList}>
                                        {recentActivity.slice(0, 3).map((item) => renderActivityItem(item, false))}
                                    </View>
                                </>
                            )}

                            {/* History Page - Full Details */}
                        </>
                        )}
                        </ScrollView>
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
                        collapsable={false}
                    >
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                            onScroll={handleScroll}
                        >
                            <View style={styles.scanContainer}>
                            <View style={styles.scanHeader}>
                                <Text style={styles.scanTitle}>Scan a product</Text>
                                <Text style={styles.scanSubtitle}>
                                    {t.scanSubtitle}
                                </Text>
                            </View>

                            <View style={styles.quickSection}>
                                <View style={styles.quickInputRow}>
                                    <MaterialCommunityIcons
                                        name="link-variant"
                                        size={18}
                                        color={COLORS.textSecondary}
                                        style={{ marginHorizontal: 6 }}
                                    />
                                    <TextInput
                                        value={linkInput}
                                        onChangeText={setLinkInput}
                                        placeholder={t.linkPlaceholder}
                                        placeholderTextColor={COLORS.textSecondary}
                                        style={styles.quickInput}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    <TouchableOpacity
                                        style={styles.quickPrimary}
                                        activeOpacity={0.9}
                                        onPress={() => {
                                            if (!linkInput.trim()) {
                                                Alert.alert('Missing link', 'Please paste or type a link to scan.');
                                                return;
                                            }
                                            Alert.alert('Scanning link', linkInput.trim());
                                        }}
                                    >
                                        <Text style={styles.quickPrimaryText}>{t.scanLink}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.quickActionsRow}>
                                    <TouchableOpacity
                                        style={styles.quickGhost}
                                        activeOpacity={0.9}
                                        onPress={async () => {
                                            const text = await Clipboard.getStringAsync();
                                            if (!text) {
                                                Alert.alert('Clipboard empty', 'Copy a link first, then paste.');
                                                return;
                                            }
                                            setLinkInput(text);
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="content-paste"
                                            size={16}
                                            color={COLORS.text}
                                            style={{ marginRight: 6 }}
                                        />
                                        <Text style={styles.quickGhostText}>{t.pasteLink}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.quickGhost}
                                        activeOpacity={0.9}
                                        onPress={async () => {
                                            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
                                            if (!permissionResult.granted) {
                                                Alert.alert('Permission needed', 'Allow access to your photos to upload an image.');
                                                return;
                                            }
                                            const result = await ImagePicker.launchImageLibraryAsync({
                                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                                quality: 0.8,
                                            });
                                            if (!result.canceled && result.assets?.length) {
                                                Alert.alert('Image selected', 'We will scan this image shortly.');
                                            }
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="image-multiple"
                                            size={16}
                                            color={COLORS.text}
                                            style={{ marginRight: 6 }}
                                        />
                                        <Text style={styles.quickGhostText}>{t.uploadImage}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.scanFrame}>
                                {!permission?.granted && (
                                    <View style={styles.scanPermissionContainer}>
                                        <Text style={styles.scanPermissionText}>
                                            {t.cameraRequired}
                                        </Text>
                                        <TouchableOpacity
                                            style={styles.scanButtonSecondary}
                                            onPress={requestCameraPermission}
                                        >
                                            <Text style={styles.scanButtonSecondaryText}>
                                                {t.allowCamera}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                {permission?.granted && (
                                    <CameraView
                                        style={StyleSheet.absoluteFillObject}
                                        facing="back"
                                        barcodeScannerSettings={{
                                            barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_a', 'upc_e'],
                                        }}
                                        onBarcodeScanned={({ data }) => {
                                            if (data === lastScannedValue) return;
                                            setLastScannedValue(data);
                                            Alert.alert('Scanned', `Detected barcode: ${data}`);
                                        }}
                                    />
                                )}
                                <View style={styles.scanCornerTopLeft} />
                                <View style={styles.scanCornerTopRight} />
                                <View style={styles.scanCornerBottomLeft} />
                                <View style={styles.scanCornerBottomRight} />
                                <View style={styles.scanReticle} />
                            </View>

                            <View style={styles.scanHintRow}>
                                <MaterialCommunityIcons
                                    name="information-outline"
                                    size={18}
                                    color={COLORS.softGreyText}
                                />
                                <Text style={styles.scanHintText}>
                                    We’ll use AI to match this product across multiple stores for you.
                                </Text>
                            </View>

                            <TouchableOpacity style={styles.scanButton} activeOpacity={0.9}>
                                <MaterialCommunityIcons
                                    name="barcode-scan"
                                    size={22}
                                    color={COLORS.backgroundWhite}
                                />
                                <Text style={styles.scanButtonText}>{t.startScanning}</Text>
                            </TouchableOpacity>

                            {/* Scrolling Alert Banner */}
                            <View style={styles.scanAlertContainer}>
                                <Animated.View
                                    style={[
                                        styles.scanAlertBanner,
                                        {
                                            transform: [
                                                {
                                                    translateX: scanAlertScroll,
                                                },
                                            ],
                                        },
                                    ]}
                                >
                                    <View style={styles.scanAlertContent}>
                                        <MaterialCommunityIcons
                                            name="alert"
                                            size={18}
                                            color="#EF4444"
                                        />
                                        <Text style={styles.scanAlertText}>{t.alertBestPrices}</Text>
                                    </View>
                                    <View style={styles.scanAlertContent}>
                                        <MaterialCommunityIcons
                                            name="alert"
                                            size={18}
                                            color="#EF4444"
                                        />
                                        <Text style={styles.scanAlertText}>{t.alertBestPrices}</Text>
                                    </View>
                                </Animated.View>
                            </View>

                            <View style={styles.scanRecentHeader}>
                                <Text style={styles.scanRecentTitle}>{t.recentScans}</Text>
                            </View>
                            <View style={styles.activityList}>
                                {recentActivity.map((item) => renderActivityItem(item))}
                            </View>
                        </View>
                        </ScrollView>
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
                        collapsable={false}
                    >
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                            onScroll={handleScroll}
                        >
                            <View style={styles.aboutContainer}>
                                {/* Hero Section - Modern AI Style */}
                                <View style={styles.aboutHeroCard}>
                                    <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                    <LinearGradient
                                        colors={isDarkTheme 
                                            ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                            : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }}
                                        style={StyleSheet.absoluteFill}
                                    />
                                    <View style={styles.aboutHero}>
                                        <View style={styles.aboutIconGlow} />
                                        <View style={styles.aboutIconCircle}>
                                            <LinearGradient
                                                colors={['#1A73E8', '#4285F4', '#5C9EFF']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                style={styles.aboutIconGradient}
                                            >
                                                <MaterialCommunityIcons
                                                    name="magnify"
                                                    size={48}
                                                    color="#FFFFFF"
                                                />
                                            </LinearGradient>
                                        </View>
                                        <Text style={styles.aboutHeroTitle}>{t.priceScanner}</Text>
                                        <Text style={styles.aboutHeroSubtitle}>
                                            {t.findRealPrices}
                                        </Text>
                                    </View>
                                </View>

                                {/* Main Message Section - Modern Alert Card */}
                                <View style={styles.aboutSection}>
                                    <View style={styles.aboutAlertCard}>
                                        <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                        <LinearGradient
                                            colors={isDarkTheme 
                                                ? ['rgba(239, 68, 68, 0.15)', 'rgba(220, 38, 38, 0.1)']
                                                : ['rgba(254, 242, 242, 0.9)', 'rgba(255, 255, 255, 0.8)']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 0, y: 1 }}
                                            style={StyleSheet.absoluteFill}
                                        />
                                        <View style={styles.aboutAlertContent}>
                                            <View style={styles.aboutAlertIconWrapper}>
                                                <View style={styles.aboutAlertIconGlow} />
                                                <MaterialCommunityIcons
                                                    name="alert-circle"
                                                    size={36}
                                                    color="#EF4444"
                                                />
                                            </View>
                                            <Text style={styles.aboutFeatureTitle}>
                                                {t.everyoneLying}
                                            </Text>
                                            <Text style={styles.aboutFeatureText}>
                                                {t.everyoneLyingText}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Purpose Section - Modern Card */}
                                <View style={styles.aboutSection}>
                                    <Text style={styles.aboutSectionTitle}>{t.ourPurpose}</Text>
                                    <View style={styles.aboutPurposeCard}>
                                        <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                        <LinearGradient
                                            colors={isDarkTheme 
                                                ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                                : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 0, y: 1 }}
                                            style={StyleSheet.absoluteFill}
                                        />
                                        <View style={styles.aboutPurposeContent}>
                                            <View style={styles.aboutPurposeIconWrapper}>
                                                <LinearGradient
                                                    colors={['#1A73E8', '#4285F4']}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 1 }}
                                                    style={styles.aboutPurposeIconGradient}
                                                >
                                                    <MaterialCommunityIcons
                                                        name="target"
                                                        size={32}
                                                        color="#FFFFFF"
                                                    />
                                                </LinearGradient>
                                            </View>
                                            <Text style={styles.aboutPurposeTitle}>
                                                {t.findActualPrices}
                                            </Text>
                                            <Text style={styles.aboutPurposeText}>
                                                {t.findActualPricesText}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* How It Works - Modern Step Cards */}
                                <View style={styles.aboutSection}>
                                    <Text style={styles.aboutSectionTitle}>{t.howItWorks}</Text>
                                    
                                    <View style={styles.aboutStepCard}>
                                        <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                        <LinearGradient
                                            colors={isDarkTheme 
                                                ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                                : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 0, y: 1 }}
                                            style={StyleSheet.absoluteFill}
                                        />
                                        <View style={styles.aboutStepContentWrapper}>
                                            <View style={styles.aboutStepNumber}>
                                                <LinearGradient
                                                    colors={['#1A73E8', '#4285F4']}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 1 }}
                                                    style={styles.aboutStepNumberGradient}
                                                >
                                                    <Text style={styles.aboutStepNumberText}>1</Text>
                                                </LinearGradient>
                                            </View>
                                            <View style={styles.aboutStepContent}>
                                                <Text style={styles.aboutStepTitle}>{t.step1Title}</Text>
                                                <Text style={styles.aboutStepText}>
                                                    {t.step1Text}
                                                </Text>
                                            </View>
                                            <View style={styles.aboutStepIconWrapper}>
                                                <MaterialCommunityIcons
                                                    name="barcode-scan"
                                                    size={28}
                                                    color={COLORS.primaryBlue}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.aboutStepCard}>
                                        <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                        <LinearGradient
                                            colors={isDarkTheme 
                                                ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                                : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 0, y: 1 }}
                                            style={StyleSheet.absoluteFill}
                                        />
                                        <View style={styles.aboutStepContentWrapper}>
                                            <View style={styles.aboutStepNumber}>
                                                <LinearGradient
                                                    colors={['#1A73E8', '#4285F4']}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 1 }}
                                                    style={styles.aboutStepNumberGradient}
                                                >
                                                    <Text style={styles.aboutStepNumberText}>2</Text>
                                                </LinearGradient>
                                            </View>
                                            <View style={styles.aboutStepContent}>
                                                <Text style={styles.aboutStepTitle}>{t.step2Title}</Text>
                                                <Text style={styles.aboutStepText}>
                                                    {t.step2Text}
                                                </Text>
                                            </View>
                                            <View style={styles.aboutStepIconWrapper}>
                                                <MaterialCommunityIcons
                                                    name="robot"
                                                    size={28}
                                                    color={COLORS.primaryBlue}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.aboutStepCard}>
                                        <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                        <LinearGradient
                                            colors={isDarkTheme 
                                                ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                                : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 0, y: 1 }}
                                            style={StyleSheet.absoluteFill}
                                        />
                                        <View style={styles.aboutStepContentWrapper}>
                                            <View style={styles.aboutStepNumber}>
                                                <LinearGradient
                                                    colors={['#1A73E8', '#4285F4']}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 1 }}
                                                    style={styles.aboutStepNumberGradient}
                                                >
                                                    <Text style={styles.aboutStepNumberText}>3</Text>
                                                </LinearGradient>
                                            </View>
                                            <View style={styles.aboutStepContent}>
                                                <Text style={styles.aboutStepTitle}>{t.step3Title}</Text>
                                                <Text style={styles.aboutStepText}>
                                                    {t.step3Text}
                                                </Text>
                                            </View>
                                            <View style={styles.aboutStepIconWrapper}>
                                                <MaterialCommunityIcons
                                                    name="chart-line"
                                                    size={28}
                                                    color={COLORS.primaryBlue}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.aboutStepCard}>
                                        <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                        <LinearGradient
                                            colors={isDarkTheme 
                                                ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                                : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 0, y: 1 }}
                                            style={StyleSheet.absoluteFill}
                                        />
                                        <View style={styles.aboutStepContentWrapper}>
                                            <View style={styles.aboutStepNumber}>
                                                <LinearGradient
                                                    colors={['#1A73E8', '#4285F4']}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 1 }}
                                                    style={styles.aboutStepNumberGradient}
                                                >
                                                    <Text style={styles.aboutStepNumberText}>4</Text>
                                                </LinearGradient>
                                            </View>
                                            <View style={styles.aboutStepContent}>
                                                <Text style={styles.aboutStepTitle}>{t.step4Title}</Text>
                                                <Text style={styles.aboutStepText}>
                                                    {t.step4Text}
                                                </Text>
                                            </View>
                                            <View style={styles.aboutStepIconWrapper}>
                                                <MaterialCommunityIcons
                                                    name="wallet"
                                                    size={28}
                                                    color={COLORS.primaryBlue}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                {/* Key Features - Modern Grid */}
                                <View style={styles.aboutSection}>
                                    <Text style={styles.aboutSectionTitle}>{t.whyPriceScanner}</Text>
                                    
                                    <View style={styles.aboutFeatureGrid}>
                                        <View style={styles.aboutFeatureItem}>
                                            <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                            <LinearGradient
                                                colors={isDarkTheme 
                                                    ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                                    : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 0, y: 1 }}
                                                style={StyleSheet.absoluteFill}
                                            />
                                            <View style={styles.aboutFeatureItemContent}>
                                                <View style={styles.aboutFeatureItemIconWrapper}>
                                                    <LinearGradient
                                                        colors={['#10B981', '#34D399']}
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 1, y: 1 }}
                                                        style={styles.aboutFeatureItemIconGradient}
                                                    >
                                                        <MaterialCommunityIcons
                                                            name="shield-check"
                                                            size={24}
                                                            color="#FFFFFF"
                                                        />
                                                    </LinearGradient>
                                                </View>
                                                <Text style={styles.aboutFeatureItemTitle}>{t.noLies}</Text>
                                                <Text style={styles.aboutFeatureItemText}>
                                                    {t.noLiesText}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={styles.aboutFeatureItem}>
                                            <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                            <LinearGradient
                                                colors={isDarkTheme 
                                                    ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                                    : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 0, y: 1 }}
                                                style={StyleSheet.absoluteFill}
                                            />
                                            <View style={styles.aboutFeatureItemContent}>
                                                <View style={styles.aboutFeatureItemIconWrapper}>
                                                    <LinearGradient
                                                        colors={['#1A73E8', '#4285F4']}
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 1, y: 1 }}
                                                        style={styles.aboutFeatureItemIconGradient}
                                                    >
                                                        <MaterialCommunityIcons
                                                            name="store"
                                                            size={24}
                                                            color="#FFFFFF"
                                                        />
                                                    </LinearGradient>
                                                </View>
                                                <Text style={styles.aboutFeatureItemTitle}>{t.multipleStores}</Text>
                                                <Text style={styles.aboutFeatureItemText}>
                                                    {t.multipleStoresText}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={styles.aboutFeatureItem}>
                                            <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                            <LinearGradient
                                                colors={isDarkTheme 
                                                    ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                                    : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 0, y: 1 }}
                                                style={StyleSheet.absoluteFill}
                                            />
                                            <View style={styles.aboutFeatureItemContent}>
                                                <View style={styles.aboutFeatureItemIconWrapper}>
                                                    <LinearGradient
                                                        colors={['#F59E0B', '#FBBF24']}
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 1, y: 1 }}
                                                        style={styles.aboutFeatureItemIconGradient}
                                                    >
                                                        <MaterialCommunityIcons
                                                            name="lightning-bolt"
                                                            size={24}
                                                            color="#FFFFFF"
                                                        />
                                                    </LinearGradient>
                                                </View>
                                                <Text style={styles.aboutFeatureItemTitle}>{t.realTime}</Text>
                                                <Text style={styles.aboutFeatureItemText}>
                                                    {t.realTimeText}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={styles.aboutFeatureItem}>
                                            <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                            <LinearGradient
                                                colors={isDarkTheme 
                                                    ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                                    : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 0, y: 1 }}
                                                style={StyleSheet.absoluteFill}
                                            />
                                            <View style={styles.aboutFeatureItemContent}>
                                                <View style={styles.aboutFeatureItemIconWrapper}>
                                                    <LinearGradient
                                                        colors={['#8B5CF6', '#A78BFA']}
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 1, y: 1 }}
                                                        style={styles.aboutFeatureItemIconGradient}
                                                    >
                                                        <MaterialCommunityIcons
                                                            name="brain"
                                                            size={24}
                                                            color="#FFFFFF"
                                                        />
                                                    </LinearGradient>
                                                </View>
                                                <Text style={styles.aboutFeatureItemTitle}>{t.aiPowered}</Text>
                                                <Text style={styles.aboutFeatureItemText}>
                                                    {t.aiPoweredText}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                {/* Bottom Message - Modern CTA Card */}
                                <View style={styles.aboutBottomCard}>
                                    <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                    <LinearGradient
                                        colors={isDarkTheme 
                                            ? ['rgba(16, 185, 129, 0.2)', 'rgba(5, 150, 105, 0.15)']
                                            : ['rgba(236, 253, 245, 0.9)', 'rgba(209, 250, 229, 0.8)']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }}
                                        style={StyleSheet.absoluteFill}
                                    />
                                    <View style={styles.aboutBottomContent}>
                                        <View style={styles.aboutBottomIconWrapper}>
                                            <View style={styles.aboutBottomIconGlow} />
                                            <LinearGradient
                                                colors={['#10B981', '#34D399']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                style={styles.aboutBottomIconGradient}
                                            >
                                                <MaterialCommunityIcons
                                                    name="check-circle"
                                                    size={36}
                                                    color="#FFFFFF"
                                                />
                                            </LinearGradient>
                                        </View>
                                        <Text style={styles.aboutBottomTitle}>
                                            {t.bestPriceExists}
                                        </Text>
                                        <Text style={styles.aboutBottomText}>
                                            {t.stopBelieving}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
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
                        collapsable={false}
                    >
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                            onScroll={handleScroll}
                        >
                            <View style={styles.profileContainer}>
                            {/* Profile Header Card */}
                            <View style={styles.profileHeaderCard}>
                                <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                <LinearGradient
                                    colors={isDarkTheme 
                                        ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                        : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    style={StyleSheet.absoluteFill}
                                />
                                <View style={styles.profileHeader}>
                                    <View style={styles.profileAvatarWrapper}>
                                        <View style={styles.profileAvatarGlow} />
                                        <View style={styles.profileAvatar}>
                                            <LinearGradient
                                                colors={['#1A73E8', '#4285F4']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                style={styles.profileAvatarGradient}
                                            >
                                                <Text style={styles.profileAvatarInitials}>
                                                    {userName
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </Text>
                                            </LinearGradient>
                                        </View>
                                    </View>
                                    <View style={styles.profileTextBlock}>
                                        <View style={styles.profileNameRow}>
                                            <Text style={styles.profileName}>{userName}</Text>
                                            <View style={styles.profileBadge}>
                                                <View style={styles.profileBadgeGlow} />
                                                <MaterialCommunityIcons
                                                    name="check-decagram"
                                                    size={16}
                                                    color="#FFFFFF"
                                                />
                                            </View>
                                        </View>
                                        <Text style={styles.profileSubtitle}>Premium user · Since 2025</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Account Section */}
                            <View style={styles.profileSectionCard}>
                                <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                <LinearGradient
                                    colors={isDarkTheme 
                                        ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                        : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    style={StyleSheet.absoluteFill}
                                />
                                <View style={styles.profileSectionContent}>
                                    <Text style={styles.profileSectionTitle}>{t.account}</Text>
                                    <Pressable style={({ pressed }) => [styles.profileRow, pressed && styles.profileRowPressed]}>
                                        <View style={styles.profileRowLeft}>
                                            <View style={styles.profileRowIcon}>
                                                <MaterialCommunityIcons
                                                    name="account-outline"
                                                    size={20}
                                                    color="#1A73E8"
                                                />
                                            </View>
                                            <Text style={styles.profileRowLabel}>{t.personalDetails}</Text>
                                        </View>
                                        <MaterialCommunityIcons
                                            name="chevron-right"
                                            size={20}
                                            color={isDarkTheme ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'}
                                        />
                                    </Pressable>
                                    <View style={styles.profileRowDivider} />
                                    <Pressable style={({ pressed }) => [styles.profileRow, pressed && styles.profileRowPressed]}>
                                        <View style={styles.profileRowLeft}>
                                            <View style={styles.profileRowIcon}>
                                                <MaterialCommunityIcons
                                                    name="shield-outline"
                                                    size={20}
                                                    color="#1A73E8"
                                                />
                                            </View>
                                            <Text style={styles.profileRowLabel}>{t.security}</Text>
                                        </View>
                                        <MaterialCommunityIcons
                                            name="chevron-right"
                                            size={20}
                                            color={isDarkTheme ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'}
                                        />
                                    </Pressable>
                                </View>
                            </View>

                            {/* Subscription Section */}
                            <View style={styles.profileSectionCard}>
                                <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                <LinearGradient
                                    colors={isDarkTheme 
                                        ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                        : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    style={StyleSheet.absoluteFill}
                                />
                                <View style={styles.profileSectionContent}>
                                    <Text style={styles.profileSectionTitle}>Subscription</Text>
                                    <Pressable 
                                        style={({ pressed }) => [styles.profileRow, pressed && styles.profileRowPressed]}
                                        onPress={() => setIsSubscriptionModalOpen(true)}
                                    >
                                        <View style={styles.profileRowLeft}>
                                            <View style={styles.profileRowIcon}>
                                                <MaterialCommunityIcons
                                                    name="crown-outline"
                                                    size={20}
                                                    color="#1A73E8"
                                                />
                                            </View>
                                            <Text style={styles.profileRowLabel}>Manage Subscription</Text>
                                        </View>
                                        <MaterialCommunityIcons
                                            name="chevron-right"
                                            size={20}
                                            color={isDarkTheme ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'}
                                        />
                                    </Pressable>
                                </View>
                            </View>

                            {/* Notifications Section */}
                            <View style={styles.profileSectionCard}>
                                <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                <LinearGradient
                                    colors={isDarkTheme 
                                        ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                        : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    style={StyleSheet.absoluteFill}
                                />
                                <View style={styles.profileSectionContent}>
                                    <Text style={styles.profileSectionTitle}>{t.notifications}</Text>
                                    <Pressable style={({ pressed }) => [styles.profileRow, pressed && styles.profileRowPressed]}>
                                        <View style={styles.profileRowLeft}>
                                            <View style={styles.profileRowIcon}>
                                                <MaterialCommunityIcons
                                                    name="bell-outline"
                                                    size={20}
                                                    color="#1A73E8"
                                                />
                                            </View>
                                            <Text style={styles.profileRowLabel}>{t.pushNotifications}</Text>
                                        </View>
                                        <MaterialCommunityIcons
                                            name="chevron-right"
                                            size={20}
                                            color={isDarkTheme ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'}
                                        />
                                    </Pressable>
                                    <View style={styles.profileRowDivider} />
                                    <Pressable style={({ pressed }) => [styles.profileRow, pressed && styles.profileRowPressed]}>
                                        <View style={styles.profileRowLeft}>
                                            <View style={styles.profileRowIcon}>
                                                <MaterialCommunityIcons
                                                    name="email-outline"
                                                    size={20}
                                                    color="#1A73E8"
                                                />
                                            </View>
                                            <Text style={styles.profileRowLabel}>{t.emailUpdates}</Text>
                                        </View>
                                        <MaterialCommunityIcons
                                            name="chevron-right"
                                            size={20}
                                            color={isDarkTheme ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'}
                                        />
                                    </Pressable>
                                </View>
                            </View>

                            {/* Privacy Section */}
                            <View style={styles.profileSectionCard}>
                                <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                <LinearGradient
                                    colors={isDarkTheme 
                                        ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                        : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    style={StyleSheet.absoluteFill}
                                />
                                <View style={styles.profileSectionContent}>
                                    <Text style={styles.profileSectionTitle}>{t.privacy}</Text>
                                    <Pressable style={({ pressed }) => [styles.profileRow, pressed && styles.profileRowPressed]}>
                                        <View style={styles.profileRowLeft}>
                                            <View style={styles.profileRowIcon}>
                                                <MaterialCommunityIcons
                                                    name="lock-outline"
                                                    size={20}
                                                    color="#1A73E8"
                                                />
                                            </View>
                                            <Text style={styles.profileRowLabel}>{t.dataPermissions}</Text>
                                        </View>
                                        <MaterialCommunityIcons
                                            name="chevron-right"
                                            size={20}
                                            color={isDarkTheme ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'}
                                        />
                                    </Pressable>
                                    <View style={styles.profileRowDivider} />
                                    <Pressable style={({ pressed }) => [styles.profileRow, pressed && styles.profileRowPressed]}>
                                        <View style={styles.profileRowLeft}>
                                            <View style={styles.profileRowIcon}>
                                                <MaterialCommunityIcons
                                                    name="apps"
                                                    size={20}
                                                    color="#1A73E8"
                                                />
                                            </View>
                                            <Text style={styles.profileRowLabel}>{t.connectedApps}</Text>
                                        </View>
                                        <MaterialCommunityIcons
                                            name="chevron-right"
                                            size={20}
                                            color={isDarkTheme ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)'}
                                        />
                                    </Pressable>
                                </View>
                            </View>

                            {/* Accessibility Section */}
                            <View style={styles.profileSectionCard}>
                                <BlurView intensity={isDarkTheme ? 20 : 15} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                                <LinearGradient
                                    colors={isDarkTheme 
                                        ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                        : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    style={StyleSheet.absoluteFill}
                                />
                                <View style={styles.profileSectionContent}>
                                    <Text style={styles.profileSectionTitle}>{t.accessibility}</Text>
                                    <View style={styles.profileRow}>
                                        <View style={styles.profileRowLeft}>
                                            <View style={styles.profileRowIcon}>
                                                <MaterialCommunityIcons
                                                    name="motion-outline"
                                                    size={20}
                                                    color="#1A73E8"
                                                />
                                            </View>
                                            <Text style={styles.profileRowLabel}>{t.reduceMotion}</Text>
                                        </View>
                                        <Switch
                                            value={reduceMotion}
                                            onValueChange={setReduceMotion}
                                            thumbColor={reduceMotion ? '#FFFFFF' : '#FFFFFF'}
                                            trackColor={{ false: isDarkTheme ? 'rgba(255, 255, 255, 0.2)' : COLORS.border, true: '#1A73E8' }}
                                        />
                                    </View>
                                </View>
                            </View>

                            {/* Logout Button */}
                            <Pressable
                                style={({ pressed }) => [
                                    styles.profileLogoutButton,
                                    pressed && styles.profileLogoutButtonPressed,
                                ]}
                                onPress={() =>
                                    Alert.alert('Log out', 'Are you sure you want to log out?', [
                                        { text: 'Cancel', style: 'cancel' },
                                        { text: 'Log out', style: 'destructive', onPress: onLogout },
                                    ])
                                }
                            >
                                <View style={styles.profileLogoutButtonContent}>
                                    <MaterialCommunityIcons
                                        name="logout"
                                        size={20}
                                        color="#EF4444"
                                        style={{ marginRight: 8 }}
                                    />
                                    <Text style={styles.profileLogoutText}>{t.logout}</Text>
                                </View>
                            </Pressable>
                            </View>
                        </ScrollView>
                    </Animated.View>
                </View>

                {/* Bottom Navigation - Modern AI Style */}
                <View style={styles.bottomNavContainer}>
                    <View style={[
                        styles.bottomNav,
                        { paddingBottom: Platform.OS === 'ios' ? Math.max(insets.bottom - 8, 8) : insets.bottom + 8 }
                    ]}>
                        <BlurView intensity={isDarkTheme ? 30 : 35} tint={isDarkTheme ? "dark" : "light"} style={StyleSheet.absoluteFill} />
                        <LinearGradient
                            colors={isDarkTheme 
                                ? ['rgba(26, 26, 26, 0.85)', 'rgba(31, 31, 31, 0.9)']
                                : ['rgba(255, 255, 255, 0.8)', 'rgba(247, 250, 255, 0.75)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={StyleSheet.absoluteFill}
                        />
                        <View 
                            style={styles.bottomNavContent}
                            onLayout={(e) => {
                                const { width } = e.nativeEvent.layout;
                                // Recalculate position when layout changes
                                const tabOrder: Array<'home' | 'scan' | 'about' | 'profile'> = ['home', 'scan', 'about', 'profile'];
                                const activeIndex = tabOrder.indexOf(activeNav);
                                // Each item takes equal space (flex: 1), so center is at (index + 0.5) * itemWidth
                                const itemWidth = width / 4;
                                // Center the underline (40px wide) and glow (48px wide) at the center of each tab
                                // Both should be centered, so we use the same calculation
                                const newPosition = (activeIndex * itemWidth) + (itemWidth / 2) - 20; // -20 centers the 40px underline
                                underlineTranslateX.setValue(newPosition);
                            }}
                        >
                            {/* Single moving underline */}
                            <Animated.View
                                style={[
                                    styles.bottomNavUnderline,
                                    {
                                        transform: [{ translateX: underlineTranslateX }],
                                    },
                                ]}
                            />
                            
                            {(
                                [
                                    { key: 'home', icon: 'home-variant', inactiveIcon: 'home-variant-outline', label: t.home, index: 0 },
                                    { key: 'scan', icon: 'barcode-scan', inactiveIcon: 'barcode-scan', label: t.scan, index: 1 },
                                    { key: 'about', icon: 'information', inactiveIcon: 'information-outline', label: t.about, index: 2 },
                                    { key: 'profile', icon: 'account-circle', inactiveIcon: 'account-circle-outline', label: t.profile, index: 3 },
                                ] as const
                            ).map((item) => {
                                const isActive = activeNav === item.key;
                                
                                // Get animated values for this item
                                let iconScale: Animated.Value;
                                
                                switch (item.key) {
                                    case 'home':
                                        iconScale = homeIconScale;
                                        break;
                                    case 'scan':
                                        iconScale = scanIconScale;
                                        break;
                                    case 'about':
                                        iconScale = aboutIconScale;
                                        break;
                                    case 'profile':
                                        iconScale = profileIconScale;
                                        break;
                                }
                                
                                return (
                                    <Pressable
                                        key={item.key}
                                        onPress={() => setActiveNav(item.key)}
                                        style={styles.bottomNavItem}
                                    >
                                        {({ pressed }) => {
                                            return (
                                                <View style={styles.bottomNavItemContent}>
                                                    <Animated.View
                                                        style={[
                                                            styles.bottomNavIconContainer,
                                                            {
                                                                transform: [{ scale: iconScale }],
                                                                opacity: pressed ? 0.7 : 1,
                                                            },
                                                        ]}
                                                    >
                                                        <MaterialCommunityIcons
                                                            name={isActive ? item.icon : item.inactiveIcon}
                                                            size={isActive ? 28 : 24}
                                                            color={isActive 
                                                                ? (isDarkTheme ? '#7C9AFF' : '#1A73E8')
                                                                : (isDarkTheme ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.45)')
                                                            }
                                                        />
                                                    </Animated.View>
                                                    
                                                    {/* Label always visible */}
                                                    <Text 
                                                        numberOfLines={1}
                                                        adjustsFontSizeToFit
                                                        minimumFontScale={0.7}
                                                        style={[
                                                            styles.bottomNavLabel,
                                                            { 
                                                                color: isActive 
                                                                    ? (isDarkTheme ? '#7C9AFF' : '#1A73E8')
                                                                    : (isDarkTheme ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'),
                                                                textAlign: 'center',
                                                                fontSize: isArabic ? 10 : 11,
                                                                letterSpacing: isArabic ? 0 : 0.2,
                                                            }
                                                        ]}
                                                    >
                                                        {item.label}
                                                    </Text>
                                                </View>
                                            );
                                        }}
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </Animated.View>
            </GestureDetector>

            {/* Subscription Modal */}
            {isSubscriptionModalOpen && (
                <Animated.View style={styles.subscriptionModalOverlay}>
                    <TouchableOpacity
                        style={styles.subscriptionBackdrop}
                        activeOpacity={1}
                        onPress={() => setIsSubscriptionModalOpen(false)}
                    />
                    <Animated.View style={styles.subscriptionModalPanel}>
                        <BlurView intensity={40} tint={isDarkTheme ? "dark" : "light"} style={styles.subscriptionModalContent}>
                            <View style={styles.subscriptionHeader}>
                                <Text style={styles.subscriptionHeaderTitle}>Choose Your Plan</Text>
                                <TouchableOpacity
                                    onPress={() => setIsSubscriptionModalOpen(false)}
                                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                >
                                    <MaterialCommunityIcons
                                        name="close"
                                        size={24}
                                        color={COLORS.softGreyText}
                                    />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false} style={styles.subscriptionScroll}>
                                {/* Standard Plan */}
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.subscriptionCard,
                                        selectedPlan === 'standard' && styles.subscriptionCardSelected,
                                        pressed && styles.subscriptionCardPressed,
                                    ]}
                                    onPress={() => setSelectedPlan('standard')}
                                >
                                    <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill} />
                                    <View style={styles.subscriptionCardContent}>
                                        <View style={styles.subscriptionCardHeader}>
                                            <MaterialCommunityIcons
                                                name="star-outline"
                                                size={28}
                                                color="#6B7280"
                                            />
                                            <Text style={styles.subscriptionCardTitle}>Standard</Text>
                                        </View>
                                        <Text style={styles.subscriptionCardPrice}>Free</Text>
                                        <Text style={styles.subscriptionCardDescription}>
                                            Perfect for casual users
                                        </Text>
                                        <View style={styles.subscriptionFeatures}>
                                            <View style={styles.subscriptionFeatureRow}>
                                                <MaterialCommunityIcons name="check" size={16} color="#10B981" />
                                                <Text style={styles.subscriptionFeatureText}>1-2 items per month</Text>
                                            </View>
                                            <View style={styles.subscriptionFeatureRow}>
                                                <MaterialCommunityIcons name="check" size={16} color="#10B981" />
                                                <Text style={styles.subscriptionFeatureText}>Basic price comparison</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>

                                {/* Pro Plan */}
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.subscriptionCard,
                                        selectedPlan === 'pro' && styles.subscriptionCardSelected,
                                        pressed && styles.subscriptionCardPressed,
                                    ]}
                                    onPress={() => setSelectedPlan('pro')}
                                >
                                    <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill} />
                                    <LinearGradient
                                        colors={['rgba(26,115,232,0.1)', 'rgba(66,133,244,0.05)']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={StyleSheet.absoluteFill}
                                    />
                                    <View style={styles.subscriptionCardContent}>
                                        <View style={styles.subscriptionBadge}>
                                            <Text style={styles.subscriptionBadgeText}>POPULAR</Text>
                                        </View>
                                        <View style={styles.subscriptionCardHeader}>
                                            <MaterialCommunityIcons
                                                name="crown"
                                                size={28}
                                                color="#1A73E8"
                                            />
                                            <Text style={styles.subscriptionCardTitle}>Pro</Text>
                                        </View>
                                        <Text style={styles.subscriptionCardPrice}>$100<Text style={styles.subscriptionCardPeriod}>/month</Text></Text>
                                        <Text style={styles.subscriptionCardDescription}>
                                            For power users
                                        </Text>
                                        <View style={styles.subscriptionFeatures}>
                                            <View style={styles.subscriptionFeatureRow}>
                                                <MaterialCommunityIcons name="check" size={16} color="#10B981" />
                                                <Text style={styles.subscriptionFeatureText}>Unlimited scans</Text>
                                            </View>
                                            <View style={styles.subscriptionFeatureRow}>
                                                <MaterialCommunityIcons name="check" size={16} color="#10B981" />
                                                <Text style={styles.subscriptionFeatureText}>Advanced price alerts</Text>
                                            </View>
                                            <View style={styles.subscriptionFeatureRow}>
                                                <MaterialCommunityIcons name="check" size={16} color="#10B981" />
                                                <Text style={styles.subscriptionFeatureText}>Priority support</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>

                                {/* Premium Plan */}
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.subscriptionCard,
                                        selectedPlan === 'premium' && styles.subscriptionCardSelected,
                                        pressed && styles.subscriptionCardPressed,
                                    ]}
                                    onPress={() => setSelectedPlan('premium')}
                                >
                                    <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill} />
                                    <LinearGradient
                                        colors={['rgba(234,179,8,0.1)', 'rgba(245,158,11,0.05)']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={StyleSheet.absoluteFill}
                                    />
                                    <View style={styles.subscriptionCardContent}>
                                        <View style={[styles.subscriptionBadge, { backgroundColor: '#F59E0B' }]}>
                                            <Text style={styles.subscriptionBadgeText}>LIFETIME</Text>
                                        </View>
                                        <View style={styles.subscriptionCardHeader}>
                                            <MaterialCommunityIcons
                                                name="diamond"
                                                size={28}
                                                color="#F59E0B"
                                            />
                                            <Text style={styles.subscriptionCardTitle}>Premium</Text>
                                        </View>
                                        <Text style={styles.subscriptionCardPrice}>$499<Text style={styles.subscriptionCardPeriod}> lifetime</Text></Text>
                                        <Text style={styles.subscriptionCardDescription}>
                                            Pay once, own forever
                                        </Text>
                                        <View style={styles.subscriptionFeatures}>
                                            <View style={styles.subscriptionFeatureRow}>
                                                <MaterialCommunityIcons name="check" size={16} color="#10B981" />
                                                <Text style={styles.subscriptionFeatureText}>Everything in Pro</Text>
                                            </View>
                                            <View style={styles.subscriptionFeatureRow}>
                                                <MaterialCommunityIcons name="check" size={16} color="#10B981" />
                                                <Text style={styles.subscriptionFeatureText}>Lifetime updates</Text>
                                            </View>
                                            <View style={styles.subscriptionFeatureRow}>
                                                <MaterialCommunityIcons name="check" size={16} color="#10B981" />
                                                <Text style={styles.subscriptionFeatureText}>Exclusive features</Text>
                                            </View>
                                            <View style={styles.subscriptionFeatureRow}>
                                                <MaterialCommunityIcons name="check" size={16} color="#10B981" />
                                                <Text style={styles.subscriptionFeatureText}>VIP support</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>
                            </ScrollView>

                            <View style={styles.subscriptionFooter}>
                                <TouchableOpacity
                                    style={styles.subscriptionButton}
                                    activeOpacity={0.9}
                                    onPress={() => {
                                        Alert.alert('Subscription', `You selected the ${selectedPlan} plan!`);
                                        setIsSubscriptionModalOpen(false);
                                    }}
                                >
                                    <Text style={styles.subscriptionButtonText}>
                                        {selectedPlan === 'standard' ? 'Continue with Free' : `Subscribe to ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}`}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </BlurView>
                    </Animated.View>
                </Animated.View>
            )}
        </SafeAreaView>
    );
}

// Dynamic styles function that takes theme colors
const createStyles = (COLORS: { primaryBlue: string; deepBlue: string; background: string; backgroundSecondary: string; backgroundWhite: string; lightGreyBg: string; softGreyText: string; text: string; textSecondary: string; black: string; shadow: string; border: string }, isDarkTheme: boolean) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.backgroundWhite,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundWhite,
    },
    topBarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    topBar: {
        height: 68,
        marginHorizontal: 16,
        marginTop: Platform.OS === 'ios' ? 8 : 12,
        marginBottom: 8,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: isDarkTheme ? '#000000' : '#1A73E8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkTheme ? 0.4 : 0.15,
        shadowRadius: 24,
        elevation: 20,
        borderWidth: isDarkTheme ? 0 : 1,
        borderColor: isDarkTheme ? 'transparent' : 'rgba(255, 255, 255, 0.3)',
    },
    topBarContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 8 : 12,
        paddingBottom: 12,
    },
    menuButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBarIconButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBarCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    topBarTitle: {
        fontSize: 22,
        fontWeight: '600',
        fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
        letterSpacing: -0.3,
        color: isDarkTheme ? '#7C9AFF' : '#1A73E8',
        textAlign: 'center',
    },
    notificationIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(26,115,232,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primaryBlue,
    },
    pagesContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    pageWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 100 : 96, // Account for top bar (68px + margins)
        paddingBottom: 72,
        backgroundColor: COLORS.backgroundWhite,
    },
    welcomeCombined: {
        fontSize: 18,
        color: COLORS.softGreyText,
        marginTop: 2,
    },
    welcomeNameInline: {
        fontSize: 26,
        fontWeight: '700',
        color: COLORS.black,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 18,
    },
    searchBar: {
        flex: 1,
        backgroundColor: COLORS.backgroundWhite,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterButton: {
        marginLeft: 12,
        width: 44,
        height: 44,
        borderRadius: 16,
        backgroundColor: COLORS.primaryBlue,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 4,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        fontSize: 15,
        color: COLORS.black,
    },
    quickSection: {
        backgroundColor: COLORS.backgroundSecondary,
        borderRadius: 18,
        padding: 14,
        marginTop: 8,
        marginBottom: 18,
        shadowColor: COLORS.black,
        shadowOpacity: isDarkTheme ? 0.18 : 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
        elevation: 5,
    },
    quickSubtitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    quickCameraButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.deepBlue,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    quickCameraText: {
        color: COLORS.backgroundWhite,
        fontWeight: '600',
        marginLeft: 6,
        fontSize: 13,
    },
    quickInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundWhite,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 6,
        paddingVertical: 8,
        marginBottom: 10,
    },
    quickInput: {
        flex: 1,
        color: COLORS.text,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    quickPrimary: {
        backgroundColor: COLORS.primaryBlue,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginLeft: 6,
    },
    quickPrimaryText: {
        color: COLORS.backgroundWhite,
        fontWeight: '700',
        fontSize: 13,
    },
    quickActionsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 2,
    },
    quickGhost: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundWhite,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 12,
        paddingVertical: 9,
        marginRight: 10,
    },
    quickGhostText: {
        color: COLORS.text,
        fontWeight: '600',
        fontSize: 13,
    },
    actionScroll: {
        marginTop: 24,
        paddingRight: 16,
    },
    actionPressable: {
        width: ACTION_CARD_WIDTH,
        height: 150,
        marginRight: 16,
    },
    actionGradientWrapper: {
        flex: 1,
        borderRadius: 20,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        elevation: 6,
    },
    actionGlass: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
        overflow: 'hidden',
    },
    actionGradient: {
        flex: 1,
        borderRadius: 20,
        padding: 18,
        justifyContent: 'space-between',
    },
    actionIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.18)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionTextBlock: {
        marginTop: 8,
    },
    actionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.backgroundWhite,
        marginBottom: 4,
    },
    actionSubtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.75)',
        lineHeight: 18,
    },
    carouselDots: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        gap: 6,
    },
    carouselDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#E5E7EB',
    },
    carouselDotActive: {
        width: 16,
        borderRadius: 8,
        backgroundColor: COLORS.primaryBlue,
    },
    sectionHeader: {
        marginTop: 28,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.black,
    },
    sectionSubtitle: {
        marginTop: 4,
        fontSize: 13,
        color: COLORS.softGreyText,
    },
    recommendedWrapper: {
        marginBottom: 12,
        shadowColor: '#1D4ED8',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.14,
        shadowRadius: 18,
        elevation: 6,
    },
    recommendedCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 28,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(191,219,254,0.9)',
        overflow: 'hidden',
    },
    recommendedImage: {
        width: 56,
        height: 56,
        borderRadius: 24,
        marginRight: 12,
        overflow: 'hidden',
    },
    recommendedTextContainer: {
        flex: 1,
    },
    recommendedTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.black,
        marginBottom: 4,
    },
    recommendedSubtitle: {
        fontSize: 13,
        color: COLORS.softGreyText,
        marginBottom: 8,
    },
    recommendedTag: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: COLORS.primaryBlue,
    },
    recommendedTagText: {
        fontSize: 11,
        fontWeight: '600',
        color: COLORS.backgroundWhite,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -6,
    },
    categoryCardWrapper: {
        width: '50%',
        paddingHorizontal: 6,
        marginBottom: 14,
    },
    categoryCard: {
        backgroundColor: COLORS.lightGreyBg,
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryIcon: {
        width: 32,
        height: 32,
        borderRadius: 12,
        backgroundColor: COLORS.primaryBlue,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.black,
        textAlign: 'center',
    },
    activityList: {
        marginTop: 4,
    },
    activityItemWrapper: {
        marginBottom: 10,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    actionParallax: {
        marginTop: 24,
    },
    activityAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.lightGreyBg,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityTextContainer: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.black,
        marginBottom: 2,
    },
    activitySubtitle: {
        fontSize: 12,
        color: COLORS.softGreyText,
    },
    activityMeta: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    activityTime: {
        fontSize: 11,
        color: COLORS.primaryBlue,
        marginBottom: 4,
        textAlign: 'center',
    },
    activityChevronContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityChevron: {
        width: 8,
        height: 14,
        borderLeftWidth: 1.5,
        borderBottomWidth: 1.5,
        borderColor: '#9CA3AF',
        transform: [{ rotate: '-45deg' }],
    },
    activityItemPressed: {
        transform: [{ scale: 0.98 }],
        opacity: 0.9,
    },
    activityHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    activityDate: {
        fontSize: 11,
        color: COLORS.softGreyText,
        fontWeight: '500',
    },
    activityDetails: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        gap: 6,
    },
    activityDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    activityDetailText: {
        fontSize: 12,
        color: COLORS.softGreyText,
        flex: 1,
    },
    historyHeader: {
        marginBottom: 24,
        paddingTop: 8,
    },
    historyTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.black,
        marginBottom: 6,
    },
    historySubtitle: {
        fontSize: 14,
        color: COLORS.softGreyText,
        lineHeight: 20,
    },
    historySection: {
        marginBottom: 32,
    },
    historySectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.black,
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    aboutContainer: {
        paddingTop: 8,
        paddingHorizontal: 20,
    },
    aboutHeroCard: {
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 24,
        shadowColor: isDarkTheme ? '#000000' : '#1A73E8',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: isDarkTheme ? 0.4 : 0.15,
        shadowRadius: 24,
        elevation: 12,
    },
    aboutHero: {
        padding: 32,
        alignItems: 'center',
        position: 'relative',
    },
    aboutIconGlow: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: `${COLORS.primaryBlue}20`,
        top: 16,
        opacity: 0.6,
    },
    aboutIconCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: COLORS.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    aboutIconGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    aboutHeroTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: COLORS.black,
        marginBottom: 8,
        textAlign: 'center',
    },
    aboutHeroSubtitle: {
        fontSize: 16,
        color: COLORS.softGreyText,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 24,
    },
    aboutSection: {
        marginBottom: 24,
    },
    aboutSectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.black,
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    aboutAlertCard: {
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: isDarkTheme ? '#000000' : '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkTheme ? 0.3 : 0.1,
        shadowRadius: 16,
        elevation: 8,
    },
    aboutAlertContent: {
        padding: 24,
        alignItems: 'center',
        position: 'relative',
    },
    aboutAlertIconWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    aboutAlertIconGlow: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#EF4444',
        opacity: 0.2,
        top: -6,
        left: -6,
    },
    aboutFeatureTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.black,
        marginBottom: 12,
        textAlign: 'center',
    },
    aboutFeatureText: {
        fontSize: 14,
        color: COLORS.softGreyText,
        lineHeight: 22,
        textAlign: 'center',
    },
    aboutPurposeCard: {
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: isDarkTheme ? '#000000' : '#1A73E8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkTheme ? 0.3 : 0.1,
        shadowRadius: 16,
        elevation: 8,
    },
    aboutPurposeContent: {
        padding: 28,
        alignItems: 'center',
        position: 'relative',
    },
    aboutPurposeIconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: COLORS.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    aboutPurposeIconGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    aboutPurposeTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.black,
        marginBottom: 12,
        textAlign: 'center',
    },
    aboutPurposeText: {
        fontSize: 14,
        color: COLORS.softGreyText,
        lineHeight: 22,
        textAlign: 'center',
    },
    aboutStepCard: {
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: isDarkTheme ? '#000000' : '#1A73E8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkTheme ? 0.3 : 0.1,
        shadowRadius: 16,
        elevation: 8,
    },
    aboutStepContentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        position: 'relative',
    },
    aboutStepNumber: {
        width: 48,
        height: 48,
        borderRadius: 24,
        overflow: 'hidden',
        marginRight: 16,
        shadowColor: COLORS.primaryBlue,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    aboutStepNumberGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    aboutStepNumberText: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.backgroundWhite,
    },
    aboutStepContent: {
        flex: 1,
        marginRight: 12,
    },
    aboutStepTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.black,
        marginBottom: 6,
    },
    aboutStepText: {
        fontSize: 13,
        color: COLORS.softGreyText,
        lineHeight: 20,
    },
    aboutStepIconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: `${COLORS.primaryBlue}15`,
        justifyContent: 'center',
        alignItems: 'center',
    },
    aboutFeatureGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    aboutFeatureItem: {
        width: '48%',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 12,
        shadowColor: isDarkTheme ? '#000000' : '#1A73E8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkTheme ? 0.3 : 0.1,
        shadowRadius: 16,
        elevation: 8,
    },
    aboutFeatureItemContent: {
        padding: 20,
        alignItems: 'center',
        position: 'relative',
    },
    aboutFeatureItemIconWrapper: {
        width: 56,
        height: 56,
        borderRadius: 28,
        overflow: 'hidden',
        marginBottom: 12,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    aboutFeatureItemIconGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    aboutFeatureItemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.black,
        marginBottom: 8,
        textAlign: 'center',
    },
    aboutFeatureItemText: {
        fontSize: 12,
        color: COLORS.softGreyText,
        lineHeight: 18,
        textAlign: 'center',
    },
    aboutBottomCard: {
        borderRadius: 24,
        overflow: 'hidden',
        marginTop: 16,
        marginBottom: 32,
        shadowColor: isDarkTheme ? '#000000' : '#10B981',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: isDarkTheme ? 0.4 : 0.15,
        shadowRadius: 24,
        elevation: 12,
    },
    aboutBottomContent: {
        padding: 32,
        alignItems: 'center',
        position: 'relative',
    },
    aboutBottomIconWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    aboutBottomIconGlow: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#10B981',
        opacity: 0.2,
        top: -8,
        left: -8,
    },
    aboutBottomIconGradient: {
        width: 64,
        height: 64,
        borderRadius: 32,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    aboutBottomTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.black,
        marginBottom: 8,
        textAlign: 'center',
    },
    aboutBottomText: {
        fontSize: 14,
        color: COLORS.softGreyText,
        textAlign: 'center',
        lineHeight: 22,
    },
    scanContainer: {
        paddingTop: 16,
    },
    scanHeader: {
        marginBottom: 18,
    },
    scanTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.black,
        marginBottom: 4,
    },
    scanSubtitle: {
        fontSize: 13,
        color: COLORS.softGreyText,
    },
    scanFrame: {
        marginTop: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#F9FAFB',
        height: 260,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 16,
    },
    scanFrameText: {
        fontSize: 13,
        color: COLORS.softGreyText,
        marginTop: 12,
    },
    scanCornerTopLeft: {
        position: 'absolute',
        top: 18,
        left: 18,
        width: 32,
        height: 32,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderColor: COLORS.primaryBlue,
        borderRadius: 10,
    },
    scanCornerTopRight: {
        position: 'absolute',
        top: 18,
        right: 18,
        width: 32,
        height: 32,
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderColor: COLORS.primaryBlue,
        borderRadius: 10,
    },
    scanCornerBottomLeft: {
        position: 'absolute',
        bottom: 18,
        left: 18,
        width: 32,
        height: 32,
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderColor: COLORS.primaryBlue,
        borderRadius: 10,
    },
    scanCornerBottomRight: {
        position: 'absolute',
        bottom: 18,
        right: 18,
        width: 32,
        height: 32,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderColor: COLORS.primaryBlue,
        borderRadius: 10,
    },
    scanReticle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'rgba(15,118,110,0.35)',
    },
    scanPermissionContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    scanPermissionText: {
        fontSize: 14,
        color: COLORS.softGreyText,
        textAlign: 'center',
        marginBottom: 12,
    },
    scanButtonSecondary: {
        borderRadius: 999,
        borderWidth: 1,
        borderColor: COLORS.primaryBlue,
        paddingVertical: 10,
        paddingHorizontal: 18,
    },
    scanButtonSecondaryText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primaryBlue,
    },
    scanHintRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
        gap: 6,
    },
    scanHintText: {
        flex: 1,
        fontSize: 12,
        color: COLORS.softGreyText,
    },
    scanButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        backgroundColor: COLORS.primaryBlue,
        paddingVertical: 14,
        marginBottom: 24,
        shadowColor: COLORS.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        gap: 8,
    },
    scanButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    scanAlertContainer: {
        marginTop: 20,
        marginBottom: 20,
        height: 40,
        overflow: 'hidden',
        borderRadius: 8,
        backgroundColor: '#FEF2F2',
        borderWidth: 1,
        borderColor: '#FEE2E2',
    },
    scanAlertBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        width: '200%',
    },
    scanAlertContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 8,
    },
    scanAlertText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#DC2626',
    },
    scanRecentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    scanRecentTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.black,
    },
    profileContainer: {
        paddingTop: 8,
    },
    profileHeaderCard: {
        marginBottom: 24,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: isDarkTheme ? '#000000' : '#1A73E8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkTheme ? 0.3 : 0.12,
        shadowRadius: 20,
        elevation: 12,
        borderWidth: isDarkTheme ? 0 : 1,
        borderColor: isDarkTheme ? 'transparent' : 'rgba(255, 255, 255, 0.3)',
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
    },
    profileAvatarWrapper: {
        position: 'relative',
        marginRight: 20,
    },
    profileAvatarGlow: {
        position: 'absolute',
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: 'rgba(26, 115, 232, 0.15)',
        shadowColor: '#1A73E8',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        top: -8,
        left: -8,
    },
    profileAvatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        overflow: 'hidden',
        shadowColor: '#1A73E8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    profileAvatarGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileAvatarInitials: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 1,
    },
    profileTextBlock: {
        flex: 1,
    },
    profileNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    profileName: {
        fontSize: 24,
        fontWeight: '700',
        color: isDarkTheme ? '#FFFFFF' : COLORS.black,
        marginRight: 10,
        letterSpacing: -0.5,
    },
    profileBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#1A73E8',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        shadowColor: '#1A73E8',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    profileBadgeGlow: {
        position: 'absolute',
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(26, 115, 232, 0.2)',
        shadowColor: '#1A73E8',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        top: -4,
        left: -4,
    },
    profileSubtitle: {
        fontSize: 14,
        color: isDarkTheme ? 'rgba(255, 255, 255, 0.6)' : COLORS.softGreyText,
        fontWeight: '500',
        letterSpacing: 0.2,
    },
    profileSectionCard: {
        marginBottom: 16,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: isDarkTheme ? '#000000' : '#1A73E8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDarkTheme ? 0.3 : 0.1,
        shadowRadius: 16,
        elevation: 8,
        borderWidth: isDarkTheme ? 0 : 1,
        borderColor: isDarkTheme ? 'transparent' : 'rgba(255, 255, 255, 0.3)',
    },
    profileSectionContent: {
        padding: 20,
    },
    profileSectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: isDarkTheme ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 16,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 4,
        borderRadius: 12,
        marginBottom: 4,
    },
    profileRowPressed: {
        backgroundColor: isDarkTheme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(26, 115, 232, 0.06)',
        transform: [{ scale: 0.98 }],
    },
    profileRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    profileRowIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: isDarkTheme ? 'rgba(26, 115, 232, 0.15)' : 'rgba(26, 115, 232, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    profileRowLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: isDarkTheme ? '#FFFFFF' : COLORS.text,
        letterSpacing: -0.2,
    },
    profileRowDivider: {
        height: 1,
        backgroundColor: isDarkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
        marginLeft: 58,
        marginVertical: 4,
    },
    profileLogoutButton: {
        marginTop: 24,
        marginBottom: 8,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    profileLogoutButtonPressed: {
        transform: [{ scale: 0.97 }],
        opacity: 0.9,
    },
    profileLogoutButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        backgroundColor: isDarkTheme ? 'rgba(239, 68, 68, 0.15)' : '#FEE2E2',
    },
    profileLogoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EF4444',
        letterSpacing: 0.2,
    },
    menuOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
    },
    menuBackdrop: {
        flex: 1,
        backgroundColor: isDarkTheme ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)',
    },
    menuContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '80%',
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        overflow: 'hidden',
        backgroundColor: isDarkTheme ? 'rgba(26, 26, 26, 0.85)' : 'rgba(255, 255, 255, 0.75)',
        shadowColor: COLORS.black,
        shadowOffset: { width: -4, height: 0 },
        shadowOpacity: isDarkTheme ? 0.3 : 0.12,
        shadowRadius: 24,
        elevation: 24,
    },
    menuContent: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 60 : 48,
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    menuScrollContent: {
        paddingBottom: 20,
    },
    menuAIIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: isDarkTheme ? 'rgba(74, 158, 255, 0.15)' : 'rgba(26, 115, 232, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuCloseButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDarkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
    },
    menuCloseButtonPressed: {
        backgroundColor: isDarkTheme ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
        transform: [{ scale: 0.95 }],
    },
    menuSectionTitle: {
        fontSize: 11,
        fontWeight: '600',
        color: isDarkTheme ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginTop: 20,
        marginBottom: 12,
    },
    menuHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 28,
    },
    menuTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: COLORS.text,
        letterSpacing: -0.5,
    },
    menuHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItem: {
        paddingVertical: 0,
        marginBottom: 2,
        borderRadius: 12,
        overflow: 'hidden',
    },
    menuItemPressed: {
        backgroundColor: isDarkTheme ? 'rgba(74, 158, 255, 0.12)' : 'rgba(26, 115, 232, 0.08)',
        transform: [{ scale: 0.98 }],
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
    },
    menuItemIconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: isDarkTheme ? 'rgba(74, 158, 255, 0.12)' : 'rgba(26, 115, 232, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    menuItemText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.text,
        letterSpacing: -0.2,
    },
    menuItemDanger: {
        color: '#EF4444',
    },
    menuDivider: {
        height: 1,
        backgroundColor: isDarkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
        marginVertical: 16,
        marginHorizontal: -12,
    },
    menuToggleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 4,
    },
    menuToggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    menuToggleContent: {
        flex: 1,
    },
    menuToggleLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.text,
        marginBottom: 2,
    },
    menuToggleSubtext: {
        fontSize: 13,
        color: COLORS.softGreyText,
    },
    menuSubItem: {
        paddingVertical: 10,
        marginBottom: 2,
        borderRadius: 8,
        overflow: 'hidden',
        marginLeft: 50,
        paddingHorizontal: 12,
    },
    menuSubItemPressed: {
        backgroundColor: isDarkTheme ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
    },
    menuSubItemText: {
        fontSize: 14,
        color: isDarkTheme ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.65)',
        fontWeight: '400',
    },
    menuSectionHeaderRow: {
        marginTop: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 8,
    },
    menuSectionHeaderPressed: {
        backgroundColor: isDarkTheme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
    },
    bottomNavContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        pointerEvents: 'box-none',
    },
    bottomNav: {
        width: '92%',
        maxWidth: 400,
        height: 80,
        marginBottom: 16,
        borderRadius: 28,
        overflow: 'hidden',
        shadowColor: isDarkTheme ? '#000000' : '#1A73E8',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: isDarkTheme ? 0.4 : 0.15,
        shadowRadius: 24,
        elevation: 20,
        borderWidth: isDarkTheme ? 0 : 1,
        borderColor: isDarkTheme ? 'transparent' : 'rgba(255, 255, 255, 0.3)',
    },
    bottomNavContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingTop: 12,
    },
    bottomNavItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8,
        minHeight: 68,
    },
    bottomNavItemContent: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
    },
    bottomNavIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
        position: 'relative',
        width: 48,
        height: 48,
    },
    bottomNavUnderline: {
        position: 'absolute',
        bottom: 8,
        left: 0,
        width: 40,
        height: 3,
        borderRadius: 2,
        backgroundColor: isDarkTheme ? '#7C9AFF' : '#1A73E8',
    },
    bottomNavLabelWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        width: '100%',
        height: 18,
        paddingHorizontal: 2,
    },
    bottomNavLabel: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.2,
        width: '100%',
    },
    notificationOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 30,
    },
    notificationBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    notificationPanel: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: Dimensions.get('window').height * 0.6,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
    },
    notificationPanelContent: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.98)',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: Platform.OS === 'android' ? 28 : 12,
        paddingBottom: 20,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 18,
        elevation: 10,
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    notificationHeaderTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.black,
    },
    notificationList: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    notificationItem: {
        marginBottom: 12,
    },
    notificationItemContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    notificationIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.lightGreyBg,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    notificationTextContainer: {
        flex: 1,
    },
    notificationItemTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.black,
        marginBottom: 4,
    },
    notificationItemMessage: {
        fontSize: 13,
        color: COLORS.softGreyText,
        marginBottom: 6,
        lineHeight: 18,
    },
    notificationItemTime: {
        fontSize: 11,
        color: COLORS.primaryBlue,
    },
    filterOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 25,
    },
    filterBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    filterPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: Dimensions.get('window').height * 0.85,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: 'hidden',
    },
    filterPanelContent: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.98)',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: Platform.OS === 'android' ? 28 : 12,
        paddingBottom: 20,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.15,
        shadowRadius: 18,
        elevation: 10,
    },
    filterHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    filterHeaderTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.black,
    },
    filterScrollContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
    filterSection: {
        marginTop: 24,
        marginBottom: 8,
    },
    filterSectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.black,
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
        fontSize: 13,
        color: COLORS.softGreyText,
        marginBottom: 6,
    },
    priceInput: {
        backgroundColor: COLORS.lightGreyBg,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: COLORS.black,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    filterOptionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    filterOptionChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: COLORS.lightGreyBg,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        marginBottom: 8,
    },
    filterOptionChipActive: {
        backgroundColor: COLORS.primaryBlue,
        borderColor: COLORS.primaryBlue,
    },
    filterOptionIcon: {
        marginRight: 6,
    },
    filterOptionChipText: {
        fontSize: 14,
        color: COLORS.black,
        fontWeight: '500',
    },
    filterOptionChipTextActive: {
        color: COLORS.backgroundWhite,
        fontWeight: '600',
    },
    filterOptionsList: {
        gap: 8,
    },
    filterOptionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: COLORS.lightGreyBg,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    filterOptionRowActive: {
        backgroundColor: 'rgba(26,115,232,0.08)',
        borderColor: COLORS.primaryBlue,
    },
    filterOptionRowText: {
        fontSize: 15,
        color: COLORS.black,
        fontWeight: '500',
    },
    filterOptionRowTextActive: {
        color: COLORS.primaryBlue,
        fontWeight: '600',
    },
    filterActions: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    filterResetButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: COLORS.lightGreyBg,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    filterResetButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.black,
    },
    filterApplyButton: {
        flex: 2,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: COLORS.primaryBlue,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    filterApplyButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.backgroundWhite,
    },
    subscriptionModalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subscriptionBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    subscriptionModalPanel: {
        width: '90%',
        maxHeight: '85%',
        borderRadius: 24,
        overflow: 'hidden',
    },
    subscriptionModalContent: {
        flex: 1,
    },
    subscriptionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    subscriptionHeaderTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.black,
    },
    subscriptionScroll: {
        flex: 1,
        padding: 16,
    },
    subscriptionCard: {
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.08)',
    },
    subscriptionCardSelected: {
        borderColor: '#1A73E8',
        borderWidth: 2,
    },
    subscriptionCardPressed: {
        opacity: 0.9,
    },
    subscriptionCardContent: {
        padding: 20,
    },
    subscriptionBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#1A73E8',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    subscriptionBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    subscriptionCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    subscriptionCardTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.black,
        marginLeft: 12,
    },
    subscriptionCardPrice: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.primaryBlue,
        marginBottom: 8,
    },
    subscriptionCardPeriod: {
        fontSize: 16,
        fontWeight: '400',
        color: COLORS.softGreyText,
    },
    subscriptionCardDescription: {
        fontSize: 14,
        color: COLORS.softGreyText,
        marginBottom: 16,
    },
    subscriptionFeatures: {
        gap: 10,
    },
    subscriptionFeatureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    subscriptionFeatureText: {
        fontSize: 14,
        color: COLORS.text,
    },
    subscriptionFooter: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    subscriptionButton: {
        backgroundColor: COLORS.primaryBlue,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: COLORS.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    subscriptionButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});

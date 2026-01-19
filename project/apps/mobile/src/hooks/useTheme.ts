import { useApp } from '../context/AppContext';

// Theme colors
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

export function useTheme() {
    const { theme, setTheme } = useApp();
    const colors = theme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
    const isDark = theme === 'dark';

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    return {
        theme,
        colors,
        isDark,
        setTheme,
        toggleTheme,
    };
}

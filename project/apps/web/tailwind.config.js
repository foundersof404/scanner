const sharedConfig = require('@repo/ui/tailwind.config');

module.exports = {
    ...sharedConfig,
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    ],
};

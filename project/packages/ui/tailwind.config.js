/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0066CC",
                primaryAccent: "#2A9DF4",
                textDark: "#0B2545",
                textMuted: "#6B7A90",
                card: "#F8FAFC",
                error: "#FF4D4F",
            },
            borderRadius: {
                sm: "8px",
                md: "12px",
                lg: "18px",
            },
            spacing: {
                4: "4px",
                8: "8px",
                12: "12px",
                16: "16px",
                24: "24px",
                32: "32px",
                48: "48px",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            boxShadow: {
                subtle: "0px 4px 12px rgba(11,37,69,0.06)",
            },
        },
    },
    plugins: [],
};

const colors = require("tailwindcss/colors");
module.exports = {
    mode: "jit",
    purge: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                black: colors.black,
                white: colors.white,
                gray: colors.trueGray,
                green: colors.emerald,
                indigo: colors.indigo,
                red: colors.rose,
                yellow: colors.amber,
            },
            keyframes: {
                shake: {
                    "0%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(5%)" },
                    "50%": { transform: "translateX(0%)" },
                    "75%": { transform: "translateX(-5%)" },
                    "100%": { transform: "translateX(0)" },
                },
            },
            animation: {
                "shake-4": "shake .1s 3",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
};

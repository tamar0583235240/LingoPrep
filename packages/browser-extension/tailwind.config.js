module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00D6AD",
        "primary-dark": "#00B894",
        secondary: "#5A67D8",
        accent: "#F6AD55",
        muted: "#F7FAFC",
        success: "#38A169",
        danger: "#E53E3E",
        "text-main": "#1F2937", // gray-800
        "text-secondary": "#64748B", // slate-500
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        "secondary-text": "var(--color-secondary-text)",
        border: "var(--color-border)",
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
    },
  },
  plugins: [],
};

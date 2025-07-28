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
          text: "var(--color-text)",
          "secondary-text": "var(--color-secondary-text)",
          border: "var(--color-border)",
            surface: "var(--color-surface)",
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
      // tailwind.config.js

  animation: {
    'fade-in': 'fadeIn 0.4s ease-out',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: 0, transform: 'translateY(10px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
  },
}

    },
  
  plugins: [],
};
// /** /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: 'var(--color-primary)', // #007B8A
//         'primary-dark': 'var(--color-primary-dark)', // #005f67
//         text: 'var(--color-text)', // #1F2937
//         'secondary-text': 'var(--color-secondary-text)', // #64748B
//         border: 'var(--color-border)', // #E5E7EB
//         background: 'var(--color-background)', // #F7FAFC
//         surface: 'var(--color-surface)', // #F0FCF4

//         'accent-pink': 'var(--color-accent-pink)', // #E63372
//         'accent-lime': 'var(--color-accent-lime)', // #A7F230
//       }
//     },
//   },
//   plugins: [],
// }
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#007B8A",           // הדומיננטי - טורקיז כהה
//         "primary-dark": "#005f65",    // גוון כהה יותר של טורקיז (אפשר להוריד מעט את הבהירות)
//         accent: "#E63372",            // ורוד / מג'נטה
//         "accent-lime": "#A7F230",     // ירוק ליים

//         secondary: "#5A67D8",
//         muted: "#F7FAFC",
//         success: "#38A169",
//         danger: "#E53E3E",

//         "text-main": "#1F2937",       // gray-800
//         "text-secondary": "#64748B",  // slate-500

//         background: "var(--color-background)",
//         text: "var(--color-text)",
//         "secondary-text": "var(--color-secondary-text)",
//         border: "var(--color-border)",
//         surface: "var(--color-surface)",
//       },
//       fontSize: {
//         xs: ["0.75rem", { lineHeight: "1rem" }],
//         sm: ["0.875rem", { lineHeight: "1.25rem" }],
//         base: ["1rem", { lineHeight: "1.5rem" }],
//         lg: ["1.125rem", { lineHeight: "1.75rem" }],
//         xl: ["1.25rem", { lineHeight: "1.75rem" }],
//         "2xl": ["1.5rem", { lineHeight: "2rem" }],
//         "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
//       },
//       fontWeight: {
//         normal: "400",
//         medium: "500",
//         semibold: "600",
//         bold: "700",
//         extrabold: "800",
//       },

//       animation: {
//         'fade-in': 'fadeIn 0.4s ease-out',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: 0, transform: 'translateY(10px)' },
//           '100%': { opacity: 1, transform: 'translateY(0)' },
//         },
//       },
//     },
//   },
//   plugins: [],
// };
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#007B8A",           // הדומיננטי - טורקיז כהה
//         "primary-dark": "#005f65",    // גוון כהה יותר של טורקיז
//         accent: "#E63372",            // ורוד / מג'נטה
//         "accent-lime": "#A7F230",     // ירוק ליים - הגוון החדש

//         secondary: "#5A67D8",
//         muted: "#F7FAFC",
//         success: "#38A169",
//         danger: "#E53E3E",

//         "text-main": "#1F2937",       // gray-800
//         "text-secondary": "#64748B",  // slate-500

//         background: "var(--color-background)",
//         text: "var(--color-text)",
//         "secondary-text": "var(--color-secondary-text)",
//         border: "var(--color-border)",
//         surface: "var(--color-surface)",
//       },
//       fontSize: {
//         xs: ["0.75rem", { lineHeight: "1rem" }],
//         sm: ["0.875rem", { lineHeight: "1.25rem" }],
//         base: ["1rem", { lineHeight: "1.5rem" }],
//         lg: ["1.125rem", { lineHeight: "1.75rem" }],
//         xl: ["1.25rem", { lineHeight: "1.75rem" }],
//         "2xl": ["1.5rem", { lineHeight: "2rem" }],
//         "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
//       },
//       fontWeight: {
//         normal: "400",
//         medium: "500",
//         semibold: "600",
//         bold: "700",
//         extrabold: "800",
//       },

//       animation: {
//         'fade-in': 'fadeIn 0.4s ease-out',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: 0, transform: 'translateY(10px)' },
//           '100%': { opacity: 1, transform: 'translateY(0)' },
//         },
//       },
//     },
//   },
//   plugins: [],
// };

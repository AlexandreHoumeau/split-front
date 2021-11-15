const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        "-10": "-10",
        "-1": "-1"
      },
      borderRadius: {
       '4xl': '36px' 
      },
      colors: {
        blueGray: colors.blueGray,
      },
    },
    fontFamily: (theme) => ({
      ...theme("font"),
      gibson: ["canada-type-gibson", "sans-serif"],
    }),
    backgroundColor: (theme) => ({
      ...theme("colors"),
      secondary: {
        DEFAULT: "#F8AA71",
        50: "#FFFFFF",
        100: "#FFFFFF",
        200: "#FFFFFF",
        300: "#FDE4D2",
        400: "#FAC7A2",
        500: "#F8AA71",
        600: "#F68D40",
        700: "#F37010",
        800: "#C6590A",
        900: "#964307",
      },
      primary: {
        DEFAULT: "#6C62FF",
        50: "#FFFFFF",
        100: "#FFFFFF",
        200: "#FBFBFF",
        300: "#CCC8FF",
        400: "#9C95FF",
        500: "#6C62FF",
        600: "#3C2FFF",
        700: "#1000FB",
        800: "#0D00C8",
        900: "#090095",
      },
      grayLight: {
        50: "#ffffff",
        100: "#ffffff",
        200: "#ffffff",
        300: "#ffffff",
        400: "#ffffff",
        500: "#f9f8ff",
        600: "#efeef5",
        700: "#e5e4eb",
        800: "#dbdae1",
        900: "#d1d0d7",
      },
      dark: {
        50: "#7c7c7c",
        100: "#727272",
        200: "#686868",
        300: "#5e5e5e",
        400: "#545454",
        500: "#4a4a4a",
        600: "#404040",
        700: "#363636",
        800: "#2c2c2c",
        900: "#222222",
      },
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      secondary: {
        DEFAULT: "#F8AA71",
        50: "#FFFFFF",
        100: "#FFFFFF",
        200: "#FFFFFF",
        300: "#FDE4D2",
        400: "#FAC7A2",
        500: "#F8AA71",
        600: "#F68D40",
        700: "#F37010",
        800: "#C6590A",
        900: "#964307",
      },
      primary: {
        DEFAULT: "#6C63FF",
        50: "#FFFFFF",
        100: "#FFFFFF",
        200: "#FCFCFF",
        300: "#CCC9FF",
        400: "#9C96FF",
        500: "#6C63FF",
        600: "#3C30FF",
        700: "#0F00FC",
        800: "#0C00C9",
        900: "#090096",
      },
      grayLight: {
        50: "#ffffff",
        100: "#ffffff",
        200: "#ffffff",
        300: "#ffffff",
        400: "#ffffff",
        500: "#f9f8ff",
        600: "#efeef5",
        700: "#e5e4eb",
        800: "#dbdae1",
        900: "#d1d0d7",
      },
      dark: {
        50: "#7c7c7c",
        100: "#727272",
        200: "#686868",
        300: "#5e5e5e",
        400: "#545454",
        500: "#4a4a4a",
        600: "#404040",
        700: "#363636",
        800: "#2c2c2c",
        900: "#222222",
      },
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      secondary: {
        DEFAULT: "#F8AA71",
        50: "#FFFFFF",
        100: "#FFFFFF",
        200: "#FFFFFF",
        300: "#FDE4D2",
        400: "#FAC7A2",
        500: "#F8AA71",
        600: "#F68D40",
        700: "#F37010",
        800: "#C6590A",
        900: "#964307",
      },
      primary: {
        DEFAULT: "#6C63FF",
        50: "#FFFFFF",
        100: "#FFFFFF",
        200: "#FCFCFF",
        300: "#CCC9FF",
        400: "#9C96FF",
        500: "#6C63FF",
        600: "#3C30FF",
        700: "#0F00FC",
        800: "#0C00C9",
        900: "#090096",
      },
      dark: {
        50: "#7c7c7c",
        100: "#727272",
        200: "#686868",
        300: "#5e5e5e",
        400: "#545454",
        500: "#4a4a4a",
        600: "#404040",
        700: "#363636",
        800: "#2c2c2c",
        900: "#222222",
      },
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

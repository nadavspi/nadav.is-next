export const theme = {
  fonts: { primary: "FF Tundra, Georgia, serif" },
  colors: {
    primary: "#bebad4",
    mutedorange: "#d9a479",
    lightgrey: "#d3d3d3",
    purple: "#5d178f",
    darkpurple: "#1b191f",
    cyan: "#2baec2",
  },
  border: "0.2rem",
  fontSizes: [
    ".579rem",
    ".694rem",
    ".833rem",
    "1rem",
    "1.2rem",
    "1.44rem",
    "1.728rem",
    "2.074rem",
    "2.488rem",
  ],
  breakpoints: { medium: "40rem", large: "70rem", xlarge: "90rem" },
};

export const mq = (props, bp = "medium") => props.theme.breakpoints[bp];

export default theme;

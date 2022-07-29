import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: "#1976D2",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        highContrast: "#000000",
        highContrastText: "#FFFFFF",
        normalContrast: "#FFFFFF",
        normalContrastText: "#000000",
        background: "#FFFFFF",
        expansionPanelBackground: "#FAFAFA",
        outline: "#E0E0E0",
        footer: "#f5f5f5",
        cfPrimary: "#B388FF",
        cfSecondary: "#AA00FF",
      },
      dark: {
        primary: "#1976D2",
        secondary: "#f5f5f5",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        highContrast: "#FFFFFF",
        highContrastText: "#000000",
        normalContrast: "#000000",
        normalContrastText: "#FFFFFF",
        background: "#121212",
        expansionPanelBackground: "#121212",
        outline: "#424242",
        footer: "#272727",
        cfPrimary: "#B388FF",
        cfSecondary: "#AA00FF",
      },
    },
  },
});

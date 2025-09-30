/*
  Name: Main.js
  Desc: Shows the Home page with the wallpaper, the app icon and title, and menu buttons to navigate to pages
*/
import { Button } from "react-native-paper";
import { Image, View, Text, StyleSheet } from "react-native";
import BackgroundSetUp from "./functions/BackgroundSetUp";
import { DarkLight } from "./functions/DarkLight";
import { renderWallpaper } from "./functions/renderWallpaper";
import main_icon from "../assets/images/main_icon.png";

export default function Main({ navigation, theme }) {
  //  If the theme is 1 (dark), the isDarkMode is "true". Otherwise, the isDarkMode is "false."
  //  The 'colors' value is set to dark theme if the isDarkMode is true. Otherwise, the 'colors' value is set to light theme.
  const isDarkMode = theme === 1;
  const colors = isDarkMode ? DarkLight.dark : DarkLight.light;

  //  For the Home page menu, create buttons for every page to navigate
  //  1. label:  The button text; 2. route: The page the button takes to
  const buttons = [
    {label: "Set Timer", route: "SetUpTimer"},
    {label: "Countdown", route: "Countdown"},
    {label: "Settings", route: "Settings"},
  ];

  //  Shows the Home page wallpaper (1), the app icon and name (2), and the menu buttons (3) 
  return (
    <BackgroundSetUp title="" wallpaper={renderWallpaper.main}>
      {/* Icon and the app title */}
      <View style={styles.headerContainer}>
        <Image source={main_icon} style={styles.mainIcon} />
          <View style={[styles.titleBackground, { backgroundColor: colors.titleBackgroundColor }]}>
          <Text style={[styles.titleText, { color: colors.fontColor }]}>ZenZone</Text>
        </View>
      </View>
      {/* Menu */}
      <View style={styles.buttonsContainer}>{buttons.map((menuButton, index) => (
        <Button
          key={menuButton.label}
          mode="contained"
          onPress={() => navigation.navigate(menuButton.route)}
          style={{width: 200, marginTop: index === 0 ? 0 : 10, backgroundColor: colors.rectBackground, borderColor: colors.rectBorderColor, borderWidth: 1, }}
          labelStyle={{color: colors.fontColor, fontWeight: "bold", textTransform: "capitalize", fontSize: 24, }}> {menuButton.label}
        </Button>
        ))}
      </View>
    </BackgroundSetUp>
  );
}

const styles = StyleSheet.create({
  headerContainer: { alignItems: "center", marginTop: 170, marginBottom: 10, },
  mainIcon: { width: 80, height: 80, resizeMode: "contain", marginBottom: 5, }, 
  titleText: { fontSize: 32, fontWeight: "bold", },
  titleBackground: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, },
  buttonsContainer: { alignItems: "center", },
});
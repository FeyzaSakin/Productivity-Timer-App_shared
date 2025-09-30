/*
  Name: Settings.js
  Desc: Shows the Settings page wallpaper (1), rects for the title (2), the Spotify (3), and the Dark/Light toggle (4) 
*/
import { Text, View, TouchableOpacity, Image, StyleSheet, Linking, Switch } from "react-native";
import BackgroundSetUp from "./functions/BackgroundSetUp";
import BottomMenu from "./functions/BottomMenu";
import { DarkLight } from "./functions/DarkLight";
import spotifyIcon from "../assets/images/spotify_icon.png";
import { renderWallpaper } from "./functions/renderWallpaper";

export default function Settings({ navigation, theme, toggleTheme }) {
  //  If the theme is 1 (dark), the isDarkMode is "true". Otherwise, the isDarkMode is "false."
  //  The 'colors' value is set to dark theme if the isDarkMode is true. Otherwise, the 'colors' value is set to light theme.
  const isDarkMode = theme === 1; 
  const colors = isDarkMode ? DarkLight.dark : DarkLight.light;

  //  Shows the Settings page wallpaper (1), rects for the title (2), the Spotify (3), and the Dark/Light toggle (4) 
  return (
    <BackgroundSetUp title="" wallpaper={renderWallpaper.settingsData}>
      {/* For the "Settings" title */}
      <View
        style={[styles.titleRect, {backgroundColor: colors.rectBackground, borderColor: colors.rectBorderColor, borderWidth: 1,}]}>
        <Text style={[styles.titleText, { color: colors.fontColor }]}>Settings</Text>
      </View>
      {/* For the Spotify rect */}
      <TouchableOpacity
        style={[styles.spotifyIconContainer, {backgroundColor: colors.rectBackground + "AA", borderColor: colors.rectBorderColor, borderWidth: 1,}]}
        onPress={() => Linking.openURL("https://open.spotify.com/")}>
        <Image source={spotifyIcon} style={styles.spotifyIcon} />
        <Text style={[styles.spotifyText, { color: colors.fontColor }]}> Open Spotify </Text>
      </TouchableOpacity>
      {/* For the Dark/Light rect */}
      <View
        style={[styles.toggleContainer, {backgroundColor: colors.rectBackground + "AA", borderColor: colors.rectBorderColor, borderWidth: 1,}]}>
        <Text style={[styles.toggleText, { color: colors.fontColor }]}>Dark/Light Mode </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme} /* To have the toggle value as a global value across the app *//>
      </View>
      <BottomMenu navigation={navigation} theme={theme} />
    </BackgroundSetUp>
  );
}

const styles = StyleSheet.create({
  titleRect: {  // The "Settings" title rect
    position: "absolute",
    top: 5, 
    left: 20,
    right: 20,
    height: 45,             
    borderRadius: 8,         
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  titleText: { fontSize: 18, fontWeight: "bold", },
  spotifyIconContainer: { // The Spotify rect
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    position: "absolute",
    top: 50,                 
    left: 20,
    right: 15,
    zIndex: 10,
    justifyContent: "flex-start",
  },
  spotifyIcon: { width: 35, height: 35, marginRight: 12, }, 
  spotifyText: { fontSize: 17, fontWeight: "bold", },
  toggleContainer: { // The Dark/Light toggle rectangle
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    position: "absolute",
    top: 110,                
    left: 20,
    right: 15,
    zIndex: 10,
    justifyContent: "space-between",
  },
  toggleText: { fontSize: 17, fontWeight: "bold", },  
});
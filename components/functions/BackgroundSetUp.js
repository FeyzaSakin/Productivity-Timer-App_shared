/*
  Name: BackgroundSetUp.js
  Desc: Sets up the wallpaper for every page with the current and the sunrise/set times
*/
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useSunTimes } from "../functions/SunTimes";
import { getCurrentTime } from "../functions/CurrentTime";

export default function BackgroundSetUp({ title, wallpaper, children }) {
  //  Set the current time (the 'getCurrentTime()') and the sunrise/set times
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const { sunrise, sunset } = useSunTimes();

  useEffect(() => {
    //  Every second update the current time
    const timer = setInterval(() => setCurrentTime(getCurrentTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  //  For every page, set the wallpaper and show the current and sunrise/set times
  //  1. Show the wallpaper using the renderWallpaper
  //  2. Showing the current time between the sunrise/set times
  //  3. Show every page's content (children)
  return (
    <ImageBackground source={wallpaper} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.timeRow}>
          <Text style={styles.sunTimeText}>☼ {sunrise}</Text>
          <Text style={styles.timeText}>{currentTime}</Text>
          <Text style={styles.sunTimeText}>☽ {sunset}</Text>
        </View>
      </SafeAreaView>
      <View style={styles.overlay}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" }, //  Use the full screen
  safeArea: { backgroundColor: "transparent", },
  timeRow: { // For the current and sunrise/set times
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 10,
  },
  timeText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  sunTimeText: { color: "#fff", fontSize: 16 },
  overlay: {  //  For each page's content's space
    flex: 1,
    alignItems: "center",        
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: { fontSize: 24, color: "#fff", fontWeight: "bold", marginBottom: 20 },
});
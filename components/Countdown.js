/*
  Name: Countdown.js
  Desc: 
        1. Shows the Countdown page wallpaper (1), a motivational quote (2), the Spotify icon (3), the timer rectangle with time and play/pause button (4), and the bottom menu (5)
        2. Shows the remaining secs. Once the timer is ended, it shows a message
*/
import {View, Text, StyleSheet, Alert, TouchableOpacity, Image, Linking, } from "react-native";
import BackgroundSetUp from "./functions/BackgroundSetUp";
import BottomMenu from "./functions/BottomMenu";
import { DarkLight } from "./functions/DarkLight";
import { renderWallpaper } from "./functions/renderWallpaper";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getRandomMotivationalQuote } from "./functions/MotivationalQuotes";
import spotifyIcon from "../assets/images/spotify_icon.png";
import { useState, useEffect, useRef } from "react";

export default function Countdown({ theme }) {
  //  If the theme is 1 (dark), the isDarkMode is "true". Otherwise, the isDarkMode is "false."
  //  The 'colors' value is set to dark theme if the isDarkMode is true. Otherwise, the 'colors' value is set to light theme.
  const isDarkMode = theme === 1; 
  const colors = isDarkMode ? DarkLight.dark : DarkLight.light;

  //  Navigation to move between pages
  const navigation = useNavigation();
  const route = useRoute();

  //  Get the timer's time from the TimerSetup.js (params.totalSeconds)
  const totalSeconds = route.params?.totalSeconds ?? 0;
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const [quote, setQuote] = useState(""); //  For motivational quote
  const [isRunning, setIsRunning] = useState(totalSeconds > 0); //  If the timer's time is set, set isRunning to true
  const intervalRef = useRef(null);

  //  When the Countdown page is opened, show a motivational quote
  useEffect(() => {
    setQuote(getRandomMotivationalQuote());
  }, []);

  //  For the timer, 
  //  1. Check if there was a prev timer. 
  //  1.1.If so, reset the current timer's setup (1) and stop the timer (2). And start a new timer
  //  1.2. If there's no prev timer, check if the timer is ending or not. 
  //  1.2.1. If the timer is close to ending, reset the current timer's setup (1) and stop the timer (2) 
  //  1.2.2. If the timer isn't close to ending, decrease the remaining secs
  useEffect(() => {
    //  Check if the timer is started and the timer isn't finished. Otherwise, stop. 
    if (!isRunning || remainingSeconds <= 0) {return;}  
    //  If there's a timer setup, don't start a new timer
    if (intervalRef.current) {return;}

    //  Every sec for the timer, check if the timer is ending
    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        //  If the timer is ending (prev: the remaining seconds), reset the current timer's setup (1), stop the timer (2), 
        // show a message (3), and go back to the "SetUpTimer" page
        if (prev <= 1) {  
          clearInterval(intervalRef.current); 
          intervalRef.current = null;
          Alert.alert("Good job!", "Time is up!", [{ text: "OK", onPress: () => navigation.navigate("SetUpTimer") }, ]);
          setIsRunning(false);
          return 0;
        }
        //  If the timer isn't ended yet, subtract from the remaining secs of the timer every sec
        return prev - 1;
      });
    }, 1000);

    return () => {
      //  If there is a timer, reset the current timer's setup (1) and stop the timer (2)
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, remainingSeconds, navigation]);  //  If the pause/start button, the remaining secs, or the page is changed

  //  For the pause/start button. If the button is clicked, turn the isRunning value to its opposite boolean value
  const toggleTimer = () => setIsRunning((prev) => !prev);

  //  Format secs to HH:MM:SS
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    let hourStr = "";
    let minStr = "";
    let secStr = "";

    // Hours
    if (h > 0) {
      if (h < 10) {hourStr = "0" + h.toString();} 
      else {hourStr = h.toString();}
      hourStr += ":"; // add colon after hours
    }
    // Minutes
    if (m < 10) {minStr = "0" + m.toString();} 
    else {minStr = m.toString();}
    minStr += ":"; // add colon after minutes
    // Seconds
    if (s < 10) {secStr = "0" + s.toString();} 
    else {secStr = s.toString(); }
    // If hours = 0, skip the hours part
    return h > 0 ? hourStr + minStr + secStr : minStr + secStr;
  };

  //  1. Shows the Countdown page wallpaper
  //  2. If the motivational quote is set, show the quote
  //  3. Show the Spotify image with its link
  //  4. If the timer is set and the timer isn't ended yet, show the remaining secs with the pause/start button in a rect
  //  5. If the timer isn't set, show a message
  return (
    <BackgroundSetUp title="" wallpaper={renderWallpaper.countdown}>
      {quote !== "" && (
        <View
          style={[styles.quoteRect, { backgroundColor: colors.rectBackground + "AA", borderColor: colors.rectBorderColor, borderWidth: 1, 
            position: "absolute", top: 10, alignSelf: "center", }, ]} >
          <Text style={[styles.quoteText, { color: colors.fontColor }]}> {quote} </Text>
        </View>
      )}
      {/* */}
      <TouchableOpacity
        style={[styles.spotifyIconContainer, { top: 90, right: 20 }]} onPress={() => Linking.openURL("https://open.spotify.com/")}>
        <Image source={spotifyIcon} style={styles.spotifyIcon} />
      </TouchableOpacity>
      <View 
        style={styles.bottomRectContainer}> {totalSeconds > 0 && remainingSeconds > 0 && (
          <Text style={[styles.rectTitle, { color: colors.fontColor }]}>Time Remaining</Text>)}
          {/* */}
          <View
            style={[styles.rect, {backgroundColor: colors.rectBackground + "AA", borderColor: colors.rectBorderColor, borderWidth: 1, 
            flexDirection: "row", alignItems: "center", justifyContent: "center", }, ]} >
            {/* Only show play/pause if timer is still running */ }
            {totalSeconds > 0 && remainingSeconds > 0 && (
              <TouchableOpacity onPress={toggleTimer} style={[styles.playPauseButton, { backgroundColor: colors.rectBackground + "CC",
                borderColor: colors.rectBorderColor, borderWidth: 1, }, ]} >
                <Text style={[styles.playPauseText, { color: colors.fontColor }]}> {isRunning ? "II" : "▶"} </Text>
              </TouchableOpacity>
            )}
            {totalSeconds > 0 ? 
            (<Text style={[styles.timerText, { color: colors.fontColor, flex: 1, textAlign: "center" }, ]} > {formatTime(remainingSeconds)} </Text>) 
            : 
            (<Text style={[styles.message, { color: colors.fontColor }]}>No timer is set. Please go to the Setup Timer to start a new timer.</Text>)}
          </View>
        </View>
      <BottomMenu navigation={navigation} theme={theme} />
    </BackgroundSetUp>
  );
}

const styles = StyleSheet.create({
  bottomRectContainer: { position: "absolute", bottom: 120, width: "100%", alignItems: "center", }, //  For the countdown rect
  rectTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8, marginTop: 12, }, //  For the "Time Remaining" title
  rect: { width: "90%", paddingVertical: 20, borderRadius: 10, alignItems: "center", },
  timerText: { fontSize: 50, fontWeight: "bold", },
  message: { fontSize: 18, textAlign: "center", paddingHorizontal: 10, },
  playPauseButton: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 10,
  },
  playPauseText: { fontSize: 30, fontWeight: "bold", }, //  For the pause/play button rect
  quoteRect: { width: "85%", paddingVertical: 15, borderRadius: 10, marginBottom: 12, alignItems: "center", },  //  For the quote rect
  quoteText: { fontSize: 15, fontStyle: "italic", textAlign: "center", },
  spotifyIconContainer: { position: "absolute", zIndex: 10,},
  spotifyIcon: { width: 50, height: 50, resizeMode: "contain", },
});
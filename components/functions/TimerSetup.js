/*
  Name: TimerSetup.js
  Desc: 
    1.  Creates a rectangle to setup the timer with the input the user provides.
    2.  The given input is send to the Countdown page as "onSubmit" 
*/
import { View, TextInput, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, } from "react-native";
import { Button } from "react-native-paper";
import { DarkLight } from "./DarkLight";
import { useState } from "react";

//  onSubmit: The value we send it to the countdown page after having the input from the user
export default function TimerSetup({ onSubmit, mode }) {
  //  Initialize the hours & minutes values to "" and create setter functions setHours and setMinutes
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  //  Get the setting for the dark/ligth theme
  const colors = DarkLight[mode];

  const handleSubmit = () => {
    //  If the user provided hour and/or minute as input, set them to h and m or to 0.
    const h = Number(hours) || 0;
    const m = Number(minutes) || 0;

    // Checking the user's input
    if (h === 0 && m === 0) { //  If both mins and hours are 0, don't start the timer
      Alert.alert("Invalid input!", "Both hours and minutes cannot be 0.");
      return;}
    if (h < 0 || h > 23) {  //  Make sure the user's input hour is between 0-23 
      Alert.alert("Invalid input!", "Hours can only be 0–23.");
      return;}
    if (m < 0 || m > 59) {  //  Make sure the user's input mins is between 0-59
      Alert.alert("Invalid input!", "Minutes can only be 0–59.");
      return;}

    const totalSeconds = h * 3600 + m * 60;
    onSubmit(totalSeconds); //  Submit the user's input in seconds
    Keyboard.dismiss();
  };

  //  1.  KeyboardAvoidingView: Helps having keyboard while not covering the input placeholders
  //  1.1.  behavior: IOS -> padding (adding extra space to the keyboard); Android -> height (shrinking)
  //  1.2.  style:  flex -> 1;  Use the rest of the space
  //  1.3.  keyboardVerticalOffset: Adds extra space so keyboard doesn’t cover inputs. 100 for iOS; 50 for Android
  /*  2.  TouchableWithoutFeedback: Anywhere that is not another button and not an input box, the empty background of the screen is tapable 
  to have the Keyboard.dismiss. */
  //  2.1.  Keyboard.dismiss: Using TouchableWithoutFeedback, it get rids of the keyboard when the user taps somewhere else other than the keyboard
  //  3.  Timer Setup Rectangle: 
  //  3.1.  For the color of the rectangle, '[colorname] + "99"' makes the color transparent
  //  3.2.  styles.row: To have values horizontally
  //  3.3.  "number-pad":  Have the keyboard with the numbers
  //  3.4.  placeholder: The value inside the setup timer when before the input is written   
  //  3.5.  /[^0-9]/g: In input, replace every ("g") non-number from the setup timer rectangle   
  //  3.6.  maxLength={2}: The inputs for each hour and mins can be at most 2 digits
  //  3.7.  TextInput: Gets hours and minutes as inputs from the user
  //  3.8.  mode="contained": The color filled button
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50} > 
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View
            style={[styles.rect, { backgroundColor: colors.rectBackground + "99", borderColor: colors.rectBorderColor,
            borderWidth: 1, }, ]} >
            <Text style={[styles.title, { color: colors.fontColor }]}>Setup the timer for...</Text>
            <View 
              style={styles.row}>
              <TextInput
                style={[styles.input, { color: colors.fontColor }]}
                keyboardType="number-pad"
                placeholder="HH"
                placeholderTextColor={colors.fontColor + "99"}
                value={hours}
                onChangeText={(text) => setHours(text.replace(/[^0-9]/g, ""))}
                maxLength={2}/>
              <TextInput
                style={[styles.input, { color: colors.fontColor }]}
                keyboardType="number-pad"
                placeholder="MM"
                placeholderTextColor={colors.fontColor + "99"}
                value={minutes}
                onChangeText={(text) => setMinutes(text.replace(/[^0-9]/g, ""))}
                maxLength={2}/>
            </View>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={{ marginTop: 20, backgroundColor: colors.rectBackground, borderColor: colors.rectBorderColor, borderWidth: 1, }}
              labelStyle={{ color: colors.fontColor, fontWeight: "bold" }}>Start
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: "flex-start", paddingTop: "20%", alignItems: "center", },
  rect: { width: "90%", paddingVertical: 20, borderRadius: 10, alignItems: "center", }, /*  The main setup timer rect  */
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 15, }, /* For "Setup the timer for..." */
  row: { flexDirection: "row", justifyContent: "center", width: "100%", }, /* For hour (1) and minutes (2) placeholder boxes */
  // Each input place for hours and minutes
  input: { width: 60, height: 50, marginHorizontal: 10, borderRadius: 10, fontSize: 20, textAlign: "center", backgroundColor: "transparent", },
});
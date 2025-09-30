/*
  Name: BottomMenu.js
  Desc: Creates a bottom menu on every page except for the Main/Home page with pages' name, icons, and routes
*/
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { DarkLight } from "./DarkLight"; 

//  navigation: Used for going to another page via the bottom menu
export default function BottomMenu({ navigation, theme }) {
  //  If the theme is 1 (dark), the isDarkMode is "true". Otherwise, the isDarkMode is "false."
  //  The 'colors' value is set to dark theme if the isDarkMode is true. Otherwise, the 'colors' value is set to light theme.
  const isDarkMode = theme === 1; 
  const colors = isDarkMode ? DarkLight.dark : DarkLight.light;

  //  For the bottom menu, create buttons with their titles and icons
  //  1. name:  The text under the icon; 2. icon; 3. route: The page the button takes to
  const menuItems = [
    {name: "Home", icon: "home", route: "Main" },
    {name: "Set Timer", icon: "timer", route: "SetUpTimer"},
    {name: "Countdown", icon: "hourglass-bottom", route: "Countdown"},
    {name: "Settings", icon: "settings", route: "Settings"},
  ];

  //  Creates a bottom menu rectangle
  //  Going through the 'menuItems' object, create a button on the bottom menu for each page 
  //  1. MaterialIcons: For the bottom menu icons settings
  return (
    <View style={[styles.container, { backgroundColor: colors.rectBackground }]}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name} style={styles.menuItem} onPress={() => navigation.replace(item.route)}>
            <MaterialIcons name={item.icon} size={24} color={colors.fontColor} />
            <Text style={[styles.menuText, { color: colors.fontColor }]}>
              {item.name}
            </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {  //  For the main bottom menu rect
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 20,
    zIndex: 100,
  },
  menuItem: { alignItems: "center", marginHorizontal: 5, }, //  For each button on the bottom menu
  menuText: { fontSize: 12, marginTop: 4, fontWeight: "bold", },  //  For each buttons' text 
});
/* 
  Name: App.js
  Desc: 
    1. Creates navigation between panels
    2. Shares the dark/light mode value among panels using the toggle in Settings.js and the 'toggleTheme' function in App.js
*/
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
import { SunTimesProvider } from "./components/functions/SunTimes";
import Main from "./components/Main";
import SetUpTimer from "./components/SetUpTimer";
import Countdown from "./components/Countdown";
import Settings from "./components/Settings";
import { useEffect, useState } from "react";
import { prefetchWallpapers } from "./components/functions/renderWallpaper";
//  Better transition from pages || 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export default function App() {
  // For dark/light mode, set 0 for light mode as default. (1 is for dark mode)
  const [theme, setTheme] = useState(0); 

  // Toggle between light (0) and dark (1) mode. Settings.js will share the value of dark/mode value with other panels
  const toggleTheme = () => {
    setTheme(theme === 0 ? 1 : 0); 
  };

  //  When the app is started, fetch and cache the wallpapers for every page
  useEffect(() => {
    prefetchWallpapers();
  }, []);

  return (
    <PaperProvider>
      <SunTimesProvider>
        <NavigationContainer>
          {/* Hide the phone's top header that shows the current time and information */}
          <StatusBar hidden={true} />
            <Stack.Navigator
              screenOptions={{ headerShown: false, animation: "fade", /* or "slide_from_right", "slide_from_left", "slide_from_bottom", "none" */}} >
              <Stack.Screen name="Main">{props => <Main {...props} theme={theme} />}</Stack.Screen>
              <Stack.Screen name="SetUpTimer">{props => <SetUpTimer {...props} theme={theme} />}</Stack.Screen>
              <Stack.Screen name="Countdown">{props => <Countdown {...props} theme={theme} />}</Stack.Screen>
              <Stack.Screen name="Settings" > 
                {props => <Settings {...props} theme={theme} 
                toggleTheme={toggleTheme} /
                >}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
      </SunTimesProvider>
    </PaperProvider>
  );
}

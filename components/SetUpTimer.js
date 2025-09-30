/*
  Name: SetUpTimer.js
  Desc: Shows the SetUpTimer page wallpaper (1), the rect to setup timer from the TimerSetup.js (2), 
        which takes the user to the Countdown page once a valid input is given (3), and the bottom menu (4) 
*/
import BackgroundSetUp from "./functions/BackgroundSetUp";
import BottomMenu from "./functions/BottomMenu";
import TimerSetup from "./functions/TimerSetup";
import { renderWallpaper } from "./functions/renderWallpaper";

export default function SetUpTimer({ navigation, theme }) {
  //  If the theme is 1 (dark), the isDarkMode is "true". Otherwise, the isDarkMode is "false."
  //  The 'colors' value is set to dark theme if the isDarkMode is true. Otherwise, the 'colors' value is set to light theme.
  const isDarkMode = theme === 1; 
  const colors = isDarkMode ? "dark" : "light";

  // Receives the total seconds from TimerSetup.js and it takes the user to the Countdown page with the timer's timer
  const handleTimerSubmit = (totalSeconds) => {
    navigation.navigate("Countdown", { totalSeconds, theme }); 
  };

  //  Shows the SetUpTimer page wallpaper (1), the rectangle to setup timer from the TimerSetup.js (2), 
  //  which takes the user to the Countdown page once a valid input is given (3), and the bottom menu (4) 
  return (
    <BackgroundSetUp title="" wallpaper={renderWallpaper.setup}>
      <TimerSetup onSubmit={handleTimerSubmit} mode={colors} />
      <BottomMenu navigation={navigation} theme={theme} />
    </BackgroundSetUp>
  );
}
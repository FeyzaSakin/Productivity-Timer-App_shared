/*
  Name: SunTimes.js
  Desc: 
    1. Provides sunrise and sunset times based on the user's approximate location (from IP)
    2. Caches and updates the data once every 24 hours
    3. Provides a context that returns sunrise/set values (SunTimesProvider)
*/
import { createContext, useState, useEffect, useContext } from "react";

// Create a context for sunrise/set to show on every page 
const SunTimes = createContext();

export function SunTimesProvider({ children }) {
  //  Initiliaze the sunrise & sunset values to "--:--" and create setter functions setSunrise and setSunset
  const [sunrise, setSunrise] = useState("--:--");
  const [sunset, setSunset] = useState("--:--");

  // From the api, parse hour and minutes of each sunrise/set times
  const parseTimeString = (timeStr) => {
    if (!timeStr) {return null;}
    let [hours, minutes] = timeStr.split(":").map(Number);
    return { hours, minutes };
  };

  // Format hours and minutes into "H:MM"
  const formatTime = ({ hours, minutes }) => {
    //  For the hour value
    if (hours == null || minutes == null) {return "--:--";} //  If the sunset/rise time is null, just show "--:--"
    let h = hours % 12; //  If the api's sunset/rise is in the 24-hour format, convert it to the 12-hour format
    if (h === 0) {h = 12;}  //  If the remainder is 0 (from h=hours%12), then set the hour to 12
    //  For the minute value
    //  The string minute value
    let minStr = "";
    //  If the min is less than 10, add 0 at the start of the min string
    if(minutes<10){minStr = "0";}
    //  Add the minutes (int) value to the string mins
    minStr+=minutes.toString();
    return `${h}:${minStr}`;
  };

  useEffect(() => {
    const debug_sunset = false;
    // The 'fetchSunriseSunset' function gets the sunrise and sunset times with the location
    const fetchSunriseSunset = async (latitude, longitude) => {
      try {
        const response = await fetch(`https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`);
        const data = await response.json();
        if (data.status === "OK") {
          //  Format sunset&sunrise times to HH:MM without AM/PM and set sunrise/set values
          const riseTime = parseTimeString(data.results.sunrise);
          const setTime = parseTimeString(data.results.sunset);
          setSunrise(formatTime(riseTime));
          setSunset(formatTime(setTime));
          //  Debugging the sunrise&sunset times
          if (debug_sunset) {console.log("Sunrise:", formatTime(riseTime), "Sunset:", formatTime(setTime));}
        }
      } 
      catch (err) {console.error("Error fetching sun times", err);}
    };

    /* The 'getApproimateLocation' gets the longtitude and latitude values of the current location and then calls the 'fetchSunriseSunset' with its coordinations to get the sunset&sunrise times */
    const getApproximateLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const latitude = data.latitude;
        const longitude = data.longitude;
        if (debug_sunset) {
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
        }
        //  Using the location information from the ipapi api, get and set the values of the sunset/rise values
        fetchSunriseSunset(latitude, longitude);
      } 
      catch (error) {console.error("Error getting approximate location:", error);
      }
    };

    // Initial call
    getApproximateLocation();

    // Every 24 hours (24 hours = 86400000 ms), recall the location and sunrise/set times functions
    const interval = setInterval(getApproximateLocation, 86400000);

    return () => clearInterval(interval);
  }, []); 

  //  By using the suntimes provider, return the sunrise/set 
  //  The components with access to the sunrise/set values
  return (
    <SunTimes.Provider value={{ sunrise, sunset }}> 
      {children}                                    
    </SunTimes.Provider>
  );
}

// The hook for the SunTimes context
export const useSunTimes = () => useContext(SunTimes);
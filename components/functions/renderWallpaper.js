/* 
  Name: renderWallpaper.js
  Desc: 
    1.  Renders the wallpaper (renderWallpaper)
    2.  Fetches and caches all wallpapers before using them (prefetchWallpapers)
  Additional Note: 
    1. Used in every page code file 
    2. In the App.js, backgrounds for every page is fetched and cached to have them ready before using them 
*/
import { Image } from "react-native";
//  All pages' wallpapers
import main_wallpaper from "../../assets/images/first_wallpaper.gif";
import setup_wallpaper from "../../assets/images/clockTower.png";
import countdown_wallpaper from "../../assets/images/study_wallpaper.gif";
import settings_data_wallpaper from "../../assets/images/settings_data_wallpaper.gif";

//  Object to render the wallpaper based on the page
export const renderWallpaper = {
  main: main_wallpaper,
  setup: setup_wallpaper,
  countdown: countdown_wallpaper, 
  settingsData: settings_data_wallpaper,
};

//  Fetch and cache all wallpapers
export const prefetchWallpapers = async () => {
  //  Store all wallpapers via their paths
  const wallpapers = Object.values(renderWallpaper);
  //  Cache all wallpapers 
  for (const wallpaper of wallpapers) {
    try {
      const success = await Image.prefetch(wallpaper);
      if (!success) {console.warn(`The image is failed to cache: ${wallpaper}`);}
    } 
    catch (error) {console.error(`The image is failed to fetch ${wallpaper}:`, error);}
  }
};
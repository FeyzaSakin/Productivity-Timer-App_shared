/*
  Name: CurrentTime.js
  Desc: 
    1.  With the 'getCurrentTime' function, it gets the current time in the 12-hour format for the current location
*/
export const getCurrentTime = () => {
  const todaysDate = new Date();
  //  2-digit:  Make sure both hour and minute are in 2 digits even if they are single digits
  const currentTime = todaysDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  return currentTime;
};
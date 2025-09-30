/* 
  Name: MotivationalQuotes.js
  Desc: 
    1. Stores 10 motivational quotes (motivationalQuotes)
    2. Returns a motivational quote (getRandomMotivationalQuote)
  Additional Note: Motivational quote is shown in the Countdown page
*/

//  Object to hold 10 motivational quotes
const motivationalQuotes = [
  "Create with the heart; build with the mind.",
  "Strive not to be a success, but rather to be of value.",
  "Plans are nothing; planning is everything.",
  "The best way out is always through.",
  "Action is the foundational key to all success.",
  "Success is in the journey.",
  "Dream big and dare to fail.",
  "Hard work beats talent when talent doesn’t work hard.",
  "There is no innovation and creativity without failure.",
  "It takes 20 years to make an overnight success."
];

// Returns a motivational quotes
export function getRandomMotivationalQuote() {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
}
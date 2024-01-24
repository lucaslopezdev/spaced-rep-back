export const getToday = () => {
  // Get the current date
const currentDate = new Date()
// Get the day and month to next day
const today = currentDate.getDate()
const month = currentDate.getMonth() + 1;

return `${month}/${today}`
}
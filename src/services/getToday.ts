import { LastReview } from "../types"

export const getToday = (): LastReview => {
  // Get the current date
  const currentDate = new Date()
  // Get the day and month to next day
  const today = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()

  return `${year}-${month}-${today}`
}

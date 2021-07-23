import { Dayjs } from 'dayjs'

export const isSunday = (date: Dayjs) => {
  if (date.day() === 0) return true
  return false
}

export const isSaturday = (date: Dayjs) => {
  if (date.day() === 6) return true
  return false
}
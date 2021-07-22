import dayjs, { Dayjs } from 'dayjs'
import { HOLIDAY_TYPE } from '../constants'

const getWorkDays = (startDay: string, endDay: string, holidayType: number) => {
  console.log('startDay', startDay, 'endDay', endDay)
  const start = dayjs(startDay);
  const end = dayjs(endDay);
  const result = []
  for (let date = start; date <= end; date = date.add(1, 'day')){
    //TODO: 祝日を判定する
    // 日曜
    if (holidayType === HOLIDAY_TYPE.SUNDAYS) {
      if (isSunday(date)) continue
      result.push(date.format('YYYY/MM/DD'))
    }
    // 土曜
    if (holidayType === HOLIDAY_TYPE.SATURDAYS) {
      if (isSaturday(date)) continue
      result.push(date.format('YYYY/MM/DD'))
    }
    // 土日
    if (holidayType === HOLIDAY_TYPE.SUNDAYS_AND_SATURDAYS) {
      if (isSunday(date) || isSaturday(date)) continue
      result.push(date.format('YYYY/MM/DD'))
    }
  }
  return result.length
}

export const calcManHours = (startDay: string, endDay: string, options: { workHour?: number, holidayType: number }) => {
  const defaultOption = { workHour: 8 }
  const opt = { ...defaultOption, ...options }
  const workHour = opt.workHour;
  const workDays = getWorkDays(startDay, endDay, options.holidayType)
  console.log('workDays', workDays)
  return workDays * workHour
}

const isSunday = (date: Dayjs) => {
  if (date.day() === 0) return true
  return false
}

const isSaturday = (date: Dayjs) => {
  if (date.day() === 6) return true
  return false
}
import dayjs, { Dayjs } from 'dayjs'

const HolidayType = {
  // 土日祝日
  SUNDAYS_SATURDAYS_AND_HOLIDAYS: 1,
  // 日祝
  SUNDAYS_AND_HOLIDAYS: 2,
  // 日のみ
  SUNDAYS: 3,
  // 土のみ
  SATURDAYS: 4,
  // 日土
  SUNDAYS_AND_SATURDAYS: 5
}

const getWorkDays = (startDay: string, endDay: string, holidayType: number) => {
  console.log('startDay', startDay, 'endDay', endDay)
  const start = dayjs(startDay);
  const end = dayjs(endDay);
  const result = []
  for (let date = start; date <= end; date = date.add(1, 'day')){
    //TODO: 祝日を判定する
    // 日曜
    if (holidayType === HolidayType.SUNDAYS) {
      if (isSunday(date)) continue
      result.push(date.format('YYYY/MM/DD'))
    }
    // 土曜
    if (holidayType === HolidayType.SATURDAYS) {
      if (isSaturday(date)) continue
      result.push(date.format('YYYY/MM/DD'))
    }
    // 土日
    if (holidayType === HolidayType.SUNDAYS_AND_SATURDAYS) {
      if (isSunday(date) || isSaturday(date)) continue
      result.push(date.format('YYYY/MM/DD'))
    }
  }
  return result.length
}

export const calcManHours = (startDay: string, endDay: string, options: { oneDayHour?: number, holidayType: number }) => {
  const defaultOption = { oneDayHour: 8 }
  const opt = { ...defaultOption, ...options }
  const oneDayHour = opt.oneDayHour;
  const workDays = getWorkDays(startDay, endDay, options.holidayType)
  console.log('workDays', workDays)
  return workDays * oneDayHour
}

const isSunday = (date: Dayjs) => {
  if (date.day() === 0) return true
  return false
}

const isSaturday = (date: Dayjs) => {
  if (date.day() === 6) return true
  return false
}
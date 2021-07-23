
import dayjs from 'dayjs'
import { HOLIDAY_TYPE } from '../constants'
import { isSunday, isSaturday } from '../utils'

interface CalcManHoursOptions {
  workHour?: number
  holidayType: number
  includeFirstDay: number
}

export class WorkHourService {
  holidays: string[] = []

  // 祝日一覧をセット
  setHolidays(holidays: string[]) {
    this.holidays = holidays
  }

  // 対象の日付が祝日か判定する
  isHoliday(date: string) {
    return this.holidays.includes(date)
  }

  // 工数を計算する
  calcManHours = (startDay: string, endDay: string, options: CalcManHoursOptions) => {
    const defaultOption = { workHour: 8 }
    const opt = { ...defaultOption, ...options }
    const workHour = opt.workHour;
    const workDays = this.getWorkDays(startDay, endDay, options.holidayType)
    const resultWorkDays = options.includeFirstDay === 1 ? workDays : workDays - 1
    return resultWorkDays * workHour
  }

  // 勤務日数を取得する
  getWorkDays(startDay: string, endDay: string, holidayType: number) {
  const start = dayjs(startDay);
  const end = dayjs(endDay);
  const result = []
  for (let date = start; date <= end; date = date.add(1, 'day')){
    // 日曜と土曜日と祝日
    if (holidayType === HOLIDAY_TYPE.SUNDAYS_SATURDAYS_AND_HOLIDAYS) {
      if (isSunday(date)) continue
      if (isSaturday(date)) continue
      if (this.isHoliday(date.format('YYYY-MM-DD'))) continue
      result.push(date.format('YYYY/MM/DD'))
    }
    // 日曜と祝日
    if (holidayType === HOLIDAY_TYPE.SUNDAYS_AND_HOLIDAYS) {
      if (isSunday(date)) continue
      if (this.isHoliday(date.format('YYYY-MM-DD'))) continue
      result.push(date.format('YYYY/MM/DD'))
    }
    // 日曜のみ
    if (holidayType === HOLIDAY_TYPE.SUNDAYS) {
      console.log('isSunday(date)', isSunday(date))
      if (isSunday(date)) continue
      result.push(date.format('YYYY/MM/DD'))
    }
    // 土曜のみ
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
}

export default new WorkHourService()
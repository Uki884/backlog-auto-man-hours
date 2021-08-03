import { Dayjs } from 'dayjs'

export const isSunday = (date: Dayjs) => {
  if (date.day() === 0) return true
  return false
}

export const isSaturday = (date: Dayjs) => {
  if (date.day() === 6) return true
  return false
}

export const injectScript = (content: any) => {
  const s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.textContent = content;
  return document.body.appendChild(s);
}

export const getDayOfWeek = (date: Dayjs) => {
  switch (date.day()) {
    case 0:
      return "sunday";
    case 1:
      return "monday";
    case 2:
      return "tuesday";
    case 3:
      return "wednesday";
    case 4:
      return "thursday";
    case 5:
      return "friday";
    case 6:
      return "saturday";
    default:
      throw Error('missing date')
  }
}
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
import React from 'react';
import ReactDOM from 'react-dom';
import WorkHourService from '../../services/workHourService'
import { injectScript } from '../../utils'

const Main = () => {
  const [startDate, setStartDate] = React.useState('')
  const [limitDate, setLimitDate] = React.useState('')
  const [holidayType, setHolidayType] = React.useState(1)
  const [workHour, setWorkHour] = React.useState(8)
  const [includeFirstDay, setIncludeFirstDay] = React.useState(1)
  const startDateRef = document.getElementById('startDate') as HTMLInputElement;
  const limitDateRef = document.getElementById('limitDate') as HTMLInputElement;

  // 工数入力
  const setEstimatedHours = (value: string) => {
    const target: HTMLInputElement = document.getElementById('estimatedHours') as HTMLInputElement;
    if (target) {
      var event = new Event('input', { bubbles: true });
      // knockout.jsを使っているらしいのでdomにjsを仕込んで更新する。以下参考
      // https://github.com/nulab/backlog-power-ups/blob/master/plugins/auto-resolution/auto-resolution.js
      setTimeout(() => {
        injectScript(`ko.contextFor(document.getElementById('estimatedHours')).$data.estimatedHours.value(${value})`);
      }, 1000);
      target.dispatchEvent(event);
    }
  }

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === "sync") {
      // 休日のタイプが更新されたらstateも更新する
      if (changes.holidayType) {
        setHolidayType(changes.holidayType.newValue)
      }
      // 作業時間が更新されたらstateも更新する
      if (changes.workHour) {
        setWorkHour(changes.workHour.newValue)
      }
      if (changes.includeFirstDay) {
        setIncludeFirstDay(changes.includeFirstDay.newValue)
      }
    }
  });

  React.useEffect(
    () => {
      chrome.storage.sync.get(null, ((data) => {
        // 1日の作業時間をセット
        data.workHour && setWorkHour(data.workHour)
        // 休日タイプセット
        data.holidayType && setHolidayType(data.holidayType)
        // 初日を含めるかセット
        data.includeFirstDay && setIncludeFirstDay(data.includeFirstDay)
      }))
      // 開始日と終了日が登録されている場合は工数を計算してセットする
      if (startDate && limitDate) {
        const manHours = WorkHourService.calcManHours(startDate, limitDate, { workHour, holidayType, includeFirstDay })
        setEstimatedHours(String(manHours))
      }
    },
    [startDate, limitDate, holidayType, workHour, includeFirstDay]
  );

  React.useEffect(() => {
    setTimeout(() => {
      startDateRef && setStartDate(startDateRef.value)
      limitDateRef && setLimitDate(limitDateRef.value)
    }, 1000)
  }, [startDateRef, limitDateRef])

  React.useEffect(() => {
    // 日本の祝日を取得する
    const fn = async ()=> {
      const result = await fetch('https://holidays-jp.github.io/api/v1/date.json')
      const data = await result.json()
      const holidays = Object.entries(data).map(([key, value]) => key)
      WorkHourService.setHolidays(holidays)
    }
    fn()
  }, [])

  startDateRef?.addEventListener('input', (event: any) => event.target && setStartDate(event.target.value));
  startDateRef?.addEventListener("blur", (event: any) => event.target && setStartDate(event.target.value));
  limitDateRef?.addEventListener('input', (event: any) => event.target && setLimitDate(event.target.value));
  limitDateRef?.addEventListener("blur", (event: any) => event.target && setLimitDate(event.target.value));
  return(null)
}

if (document.body) {
  ReactDOM.render(<Main />, document.body.appendChild(document.createElement('div')));
}
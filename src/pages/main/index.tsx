import React from 'react';
import ReactDOM from 'react-dom';
import { calcManHours } from '../../utils';

const Main = () => {

  const [startDate, setStartDate] = React.useState('')
  const [limitDate, setLimitDate] = React.useState('')
  const [holidayType, setHolidayType] = React.useState(1)
  const [workHour, setWorkHour] = React.useState(0)
  const startDateRef = document.getElementById('startDate') as HTMLInputElement;
  const limitDateRef = document.getElementById('limitDate') as HTMLInputElement;

  // 工数入力
  const setEstimatedHours = (value: string) => {
    const target: HTMLInputElement = document.getElementById('estimatedHours') as HTMLInputElement;
    if (target) {
      target.value = value
    }
  }

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === "sync") {
      console.log('changes', changes)
      // 休日のタイプが更新されたらstateも更新する
      if (changes.holidayType) {
        setHolidayType(changes.holidayType.newValue)
      }
      // 作業時間が更新されたらstateも更新する
      if (changes.workHour) {
        setWorkHour(changes.workHour.newValue)
      }
    }
  });

  // ここで営業日を計算して工数をセットしたい
  React.useEffect(
    () => {
      chrome.storage.sync.get(null, ((data) => {
        // 1日の作業時間をセット
        data.workHour && setWorkHour(data.workHour)
        // 休日タイプセット
        data.holidayType && setHolidayType(data.holidayType)
      }))
      if (startDate && limitDate) {
        const manHours = calcManHours(startDate, limitDate, { workHour, holidayType })
        setEstimatedHours(String(manHours))
      }
    },
    [startDate, limitDate, holidayType, workHour]
  );

  React.useEffect(() => {
    startDateRef.value && setStartDate(startDateRef.value)
    limitDateRef.value && setLimitDate(limitDateRef.value)
  }, [startDateRef.value, limitDateRef.value])

  startDateRef?.addEventListener('input', (event: any) => setStartDate(event.target.value));
  startDateRef?.addEventListener("blur", (event: any) => setStartDate(event.target.value));
  limitDateRef?.addEventListener('input', (event: any) => setLimitDate(event.target.value));
  limitDateRef?.addEventListener("blur", (event: any) => setLimitDate(event.target.value));
  return (<div></div>)
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
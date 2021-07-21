import React from 'react';
import ReactDOM from 'react-dom';
import { calcManHours } from '../../utils';

function Main() {

  const [startDate, setStartDate] = React.useState('')
  const [limitDate, setLimitDate] = React.useState('')
  const [holidayType, setHolidayType] = React.useState(1)
  const startDateRef = document.getElementById('startDate');
  const limitDateRef = document.getElementById('limitDate');

  // 工数入力
  const setEstimatedHours = (value: string) => {
    console.log('発火')
    const target: HTMLInputElement = document.getElementById('estimatedHours') as HTMLInputElement;
    target.value = value
  }

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    console.log('namespace', namespace, changes)
    if (namespace === "sync") {
      console.log('changes', changes)
      if (changes.holidayType) {
        setHolidayType(changes.holidayType.newValue)
      }
    }
  });

  // ここで営業日を計算して工数をセットしたい
  React.useEffect(
    () => {
      console.log('effetm', startDate, limitDate);
      if (startDate && limitDate) {
        const manHours = calcManHours(startDate, limitDate, { holidayType })
        setEstimatedHours(String(manHours))
      }
    },
    [startDate, limitDate, holidayType]
  );

  startDateRef?.addEventListener('input', (event: any) => setStartDate(event.target.value));
  startDateRef?.addEventListener("blur", (event: any) => setStartDate(event.target.value));
  limitDateRef?.addEventListener('input', (event: any) => setLimitDate(event.target.value));
  limitDateRef?.addEventListener("blur", (event: any) => setLimitDate(event.target.value));
  return (<div></div>)
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
import React from 'react';
import ReactDOM from 'react-dom';

function Main() {

  const [startDate, setStartDate] = React.useState('')
  const [limitDate, setLimitDate] = React.useState('')
  const startDateRef = document.getElementById('startDate');
  const limitDateRef = document.getElementById('limitDate');

  // 工数入力
  const setEstimatedHours = (value: string) => {
    console.log('発火')
    const target: HTMLInputElement = document.getElementById('estimatedHours') as HTMLInputElement;
    target.value = value
  }

  // ここで営業日を計算して工数をセットしたい
  React.useEffect(
    () => {
      console.log('effetm', startDate, limitDate);
      if (startDate && limitDate) {
        setEstimatedHours(String(222))
      }
    },
    [startDate, limitDate]
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
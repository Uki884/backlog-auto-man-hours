import React, { useState } from 'react';
import { BaseRadio } from '../../components/atoms/radio/BaseRadio';
import { BaseTextField } from '../../components/atoms/input/BaseTextField';
import { HOLIDAY_TYPE } from '../../constants';
import './index.scss';

const holidayTypes = [
  { label: '土日祝日', value: HOLIDAY_TYPE.SUNDAYS_SATURDAYS_AND_HOLIDAYS },
  { label: '日祝', value: HOLIDAY_TYPE.SUNDAYS_AND_HOLIDAYS },
  { label: '日のみ', value: HOLIDAY_TYPE.SUNDAYS },
  { label: '土のみ', value: HOLIDAY_TYPE.SATURDAYS },
  { label: '土日', value: HOLIDAY_TYPE.SUNDAYS_AND_SATURDAYS },
]

// TODO: マウント時にchromeからデータを取得してセットする

function PopUp() {
  const [holidayType, setHolidayType] = useState(1)
  const [workHour, setWorkHour] = useState(8)
  const [includeFirstDay, setIncludeFirstDay] = useState(1)

  const setStorage = (payload: any) => {
    console.log('payload', payload)
    chrome.storage.sync.set(payload, function () {
    });
  }

  const getStorage = (key: string) => {
    let value_data = ''
    chrome.storage.sync.get(key, function (value) {
      value_data = value.key;
    });
    return value_data
  }

  // 休日のタイプを更新
  const updateHolidayType = (value: number) => {
    setStorage({ holidayType: value })
    setHolidayType(value)
  }

  const updateWorkHour = (value: number) => {
    setStorage({ workHour: value })
    setWorkHour(value)
  }

  const updateIncludeFirstDay = (value: number) => {
    setIncludeFirstDay(value)
    setStorage({ includeFirstDay: value === 1 })
  }

  return (
    <div className="popup">
      <div className="popup__item">
        <div className="popup__item--title">休日設定</div>
        {holidayTypes.map(item => {
          return <BaseRadio value={item.value} selected={holidayType} label={item.label} onChange={(e) => updateHolidayType(Number(e.target.value))} />
        })}
      </div>
      {/* セレクトボックスかラジオボタンにする */}
      <div className="popup__item">
        <div className="popup__item--title">作業時間</div>
        <BaseTextField value={workHour} label="1日の作業時間" onChange={(e) => updateWorkHour(Number(e.target.value))} />
      </div>
      <div className="popup__item">
        <div className="popup__item--title">初日を含める</div>
        <BaseRadio value={1} selected={includeFirstDay} label="含める" onChange={(e: any) => updateIncludeFirstDay(Number(e.target.value))} />
        <BaseRadio value={2} selected={includeFirstDay} label="含めない" onChange={(e: any) => updateIncludeFirstDay(Number(e.target.value))} />
      </div>
    </div>
  );
}

export default PopUp;

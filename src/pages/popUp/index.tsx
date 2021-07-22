import React, { useEffect, useState } from 'react';
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

const PopUp = () => {
  const [holidayType, setHolidayType] = useState(1)
  const [workHour, setWorkHour] = useState(8)
  const [includeFirstDay, setIncludeFirstDay] = useState(1)

  const setStorage = (payload: any) => {
    console.log('payload', payload)
    chrome.storage.sync.set(payload, function () {
    });
  }

  // 休日のタイプを更新
  const updateHolidayType = (value: number) => {
    setStorage({ holidayType: value })
    setHolidayType(value)
  }

  // 1日の作業時間更新
  const updateWorkHour = (value: number) => {
    setStorage({ workHour: value })
    setWorkHour(value)
  }

  // 初日を含めるか更新
  const updateIncludeFirstDay = (value: number) => {
    setIncludeFirstDay(value)
    setStorage({ includeFirstDay: value })
  }

  useEffect(() => {
    chrome.storage.sync.get(null, ((data) => {
      // 休日タイプをセット
      if (data.holidayType) {
        setHolidayType(data.holidayType)
      }
      // 初日を含めるかをセット
      if (data.includeFirstDay) {
        console.log('data.includeFirstDay', data.includeFirstDay)
        setIncludeFirstDay(data.includeFirstDay)
      }
      // 1日の作業時間をセット
      if (data.workHour) {
        setWorkHour(data.workHour)
      }
    }))
  }, [])

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
        <BaseRadio value={1} selected={includeFirstDay} label="はい" onChange={(e: any) => updateIncludeFirstDay(Number(e.target.value))} />
        <BaseRadio value={2} selected={includeFirstDay} label="いいえ" onChange={(e: any) => updateIncludeFirstDay(Number(e.target.value))} />
      </div>
    </div>
  );
}

export default PopUp;

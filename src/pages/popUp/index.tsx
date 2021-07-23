import React, { useEffect, useState } from 'react';
import { HOLIDAY_TYPE } from '../../constants';
import { Form, Radio, Input, Checkbox } from 'semantic-ui-react'
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
      <Form>
        <div className="popup__item">
          <div className="popup__item--title">休日設定</div>
          {holidayTypes.map(item => {
            return(
            <Form.Field>
              <Radio value={item.value} checked={holidayType === item.value} label={item.label} onChange={(e, {value}: any) => updateHolidayType(Number(value))} />
            </Form.Field>
          )})}
        </div>
        <div className="popup__item">
          <div className="popup__item--title">作業時間</div>
          <Form.Field>
            <Input value={workHour} label="1日の作業時間" size="mini" onChange={(e, { value }) => updateWorkHour(Number(value))} />
          </Form.Field>
        </div>
        <div className="popup__item">
          <div className="popup__item--title">初日を含める</div>
          <Form.Field>
            <Checkbox value={includeFirstDay === 1 ? 2 : 1} checked={includeFirstDay === 1} onChange={(e: any, { value }) => updateIncludeFirstDay(Number(value))} />
          </Form.Field>
        </div>
      </Form>
    </div>
  );
}

export default PopUp;

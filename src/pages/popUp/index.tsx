import React, { useEffect, useState } from 'react';
import { HOLIDAY_TYPE, WORK_DAY_TYPE } from '../../constants';
import { Form, Menu, Input, Checkbox, Select } from 'semantic-ui-react'
import './index.scss';

const holidayTypes = [
  { text: '土日祝日', value: HOLIDAY_TYPE.SUNDAYS_SATURDAYS_AND_HOLIDAYS },
  { text: '日祝', value: HOLIDAY_TYPE.SUNDAYS_AND_HOLIDAYS },
  { text: '日のみ', value: HOLIDAY_TYPE.SUNDAYS },
  { text: '土のみ', value: HOLIDAY_TYPE.SATURDAYS },
  { text: '土日', value: HOLIDAY_TYPE.SUNDAYS_AND_SATURDAYS },
]

const workDaysList = [
  { text: '月曜日', value: WORK_DAY_TYPE.MONDAY },
  { text: '火曜日', value: WORK_DAY_TYPE.TUESDAY },
  { text: '水曜日', value: WORK_DAY_TYPE.WEDNESDAY },
  { text: '木曜日', value: WORK_DAY_TYPE.THURSDAY },
  { text: '金曜日', value: WORK_DAY_TYPE.FRIDAY },
  { text: '土曜日', value: WORK_DAY_TYPE.SATURDAY },
  { text: '日曜日', value: WORK_DAY_TYPE.SUNDAY },
]

const PopUp = () => {
  const [holidayType, setHolidayType] = useState(1)
  const [workHour, setWorkHour] = useState(8)
  const [includeFirstDay, setIncludeFirstDay] = useState(1)
  const [workDays, setWorkDays] = useState([1, 2, 3, 4, 5, 6, 7])

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

  // 稼働日更新
  const updateWorkDays = (value: number) => {
    const result = workDays.includes(value)
    if (result) {
      const items = workDays.filter((v) => v !== value)
      setWorkDays(items)
      setStorage({ workDays: items })
    } else {
      const items = workDays.concat(value)
      setWorkDays(items)
      setStorage({ workDays: items })
    }
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
      // 一週間の稼働日をセット
      if (data.workDays) {
        setWorkDays(data.workDays)
      }
    }))
  }, [])

  return (
    <div className="popup">
      <Form>
        <div className="popup__item">
          <div className="popup__item--title">1週間の稼働日</div>
          <Form.Field>
            {workDaysList.map((workDay) => {
              return (
                <Checkbox label={workDay.text} value={workDay.value} checked={workDays.includes(workDay.value)} onChange={(e: any, { value }) => updateWorkDays(Number(value))} className="popup__item__workday--checkbox" />
              )
            })
            }
          </Form.Field>
        </div>
        <div className="popup__item">
          <div className="popup__item--title">休日設定</div>
          <Menu compact>
            <Select options={holidayTypes} value={holidayType} onChange={(e, { value }: any) => updateHolidayType(Number(value))} />
          </Menu>
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

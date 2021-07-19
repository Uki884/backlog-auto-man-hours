import React, { useState } from 'react';
import './index.css';

function PopUp() {
  const [authKey, setAuthKey] = useState('')

  const setStorage = (payload: any) => {
    console.log('payload', payload)
    chrome.storage.sync.set(payload, function () {
    });
    setAuthKey(Object.values(payload)[0] as string)
  }

  const getStorage = (key: string) => {
    let value_data = ''
    chrome.storage.sync.get(key, function (value) {
      value_data = value.key;
    });
    setAuthKey(value_data)
    return value_data
  }

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    console.log('namespace', namespace, changes)
    if (namespace === "sync") {
      if (changes.authKey) {
        setAuthKey(changes.authKey.newValue);
      }
    }
  });

  chrome.storage.sync.get('authKey', function (value) {
    console.log('value', value)
    setAuthKey(value.authKey);
  });

  return (
    <div className="App">
      sample
    </div>
  );
}

export default PopUp;

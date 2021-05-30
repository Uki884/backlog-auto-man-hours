import React, { useState } from 'react';
import './App.css';

function App() {
  const [authKey, setAuthKey] = useState('')

  const setStorage = (payload: any) => {
    console.log('payload', payload)
    chrome.storage.sync.set(payload, function () {
    });
    setAuthKey(Object.values(payload)[0] as string)
  }

  const getStorage = (key: string) => {
    let value_data = ''
    console.log('key', key)
    chrome.storage.sync.get(key, function (value) {
      console.log('value', value)
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
      Quick Translate
      <div className="authKey">
        apiKey:
        <input type="text" value={authKey} onChange={(e) => setStorage({ authKey: e.target.value })}></input>
      </div>
    </div>
  );
}

export default App;

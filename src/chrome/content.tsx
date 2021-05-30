import { useState } from 'react';
import ReactDOM from 'react-dom';

const styles = {
  content: {
    position: 'relative' as any,
    top: '0',
    right: '0px',
    background: 'white',
    zIndex: '9999' as any
  }
}

window.addEventListener(
  "message",
  async (event) => {
    if (event.data.keyword) {
      const text = event.data.keyword.replace(/\r?\n/g, "")
      chrome.storage.sync.get('authKey', async function (value) {
        const node = getSelectedNode()
        node.style.position = 'relative'
        const target = document.getElementById('chromeExtensionReactApp')
        if (target) {
          target.remove();
        }
        injectApp(node, { authKey: value.authKey, text })
      });
    }
  }
)

document.addEventListener("mouseup", function (event) {
  const str = window.getSelection()?.toString();
  if (!str) return
  if (str.length) {
    window.postMessage({ keyword: str }, "*");
  }
});

function getSelectedNode() {
  if ((document as any).selection)
    return (document as any).selection.createRange().parentElement();
  else {
    var selection = window.getSelection() as any;
    if (selection.rangeCount > 0)
      return selection.getRangeAt(0).startContainer.parentNode;
  }
}

function App({ authKey, text, node }: any) {
  const translate = async () => {
    const body = `auth_key=${authKey}&text=${text}&target_lang=JA`
    const headers = {
      'Accept': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const result = await fetch(`https://api-free.deepl.com/v2/translate`, { method: "POST", headers, body }).then(async data => {
      return await data.json()
    })
    node.innerHTML = result.translations[0].text
    console.log('result', result.translations[0].text)
    return result
  }

  return (
    <div style={styles.content}>
      <button onClick={() => translate() }>この文を翻訳する</button>
    </div>
  );
}

function injectApp(target: any, state: any) {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "chromeExtensionReactApp");
  newDiv.setAttribute('style', 'position: absolute;')
  target.appendChild(newDiv);
  ReactDOM.render(<App {...state } node={target} />, newDiv);
}
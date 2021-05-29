import ReactDOM from 'react-dom';

window.addEventListener(
  "message",
  async (event) => {
    if (event.data.keyword) {
      const text = event.data.keyword.replace(/\r?\n/g, "")
      console.log('text', text)
      const target = encodeURI(`https://translate-server-nu.vercel.app/translate?text=${text}`)
      const result = await fetch(target).then(async data => {
        return await data.text()
      })
      injectApp(result)
    }
  }
)

function App({ text }) {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          { text }
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function injectApp(result) {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "chromeExtensionReactApp");
  document.body.appendChild(newDiv);
  ReactDOM.render(<App text={result} />, newDiv);
}
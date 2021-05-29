document.addEventListener("mouseup", function (event) {
  const str = window.getSelection()?.toString();
    if (!str) return
    if (str.length) {
      window.postMessage({ keyword: str }, "*");
    }
});

export {}
//import { useState } from 'react';

import { Home } from "./pages/Home"
//import Routes from "./router"


function App() {
  // const [count, setCount] = useState(0)

  // const changeColorOnClick = async () => {
  //   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id! },
  //     func: () => {
  //       document.body.style.backgroundColor = '#202020';
  //     }
  //   });
  // }
  

  return (
    <Home />
  )
}

export default App

/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function changeLogo() {
    const trustlyLogoGreen = chrome.runtime.getURL("images/trustlyGreen.png");
  
    const anchorElement = document.getElementById('pwmb-brand');
  
    if (anchorElement) {
      anchorElement.style.background = `transparent url(${trustlyLogoGreen}) no-repeat scroll left center / 160px`;
    } else {
      return;
    }
  }

  changeLogo();
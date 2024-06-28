/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
async function createPOAByTable() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
        if (message.action === 'createPOAByTable') {
            const url = message.urlID;
            openPOATabForPOA(url);
    
            return true; // Indicates that we want to use sendResponse asynchronously
        }

      });
}

function openPOATabForPOA(url, callback) {
    chrome.tabs.create({ url, active: false }, (tab) => {
        // Inject JavaScript code to wait for the form and then submit it
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                window.addEventListener('load', async () => {
                    const submitButton = document.querySelector('input[type="submit"].btn-primary');
                    if (submitButton) {
                        await submitButton.click();
                        chrome.runtime.sendMessage({ action: 'closeTab', tabId: chrome.runtime.id });
                        
                    } else {
                        console.error('Submit button not found.');
                    }
                });
                
            }
        });

        // Optionally, you can keep this delay as a fallback
        setTimeout(() => {
            chrome.tabs.remove(tab.id, callback);
        }, 9000); // Increase the delay to ensure the form has time to load and submit
    });
}
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const fingerprintURL = 'https://trustly.one/admin-console/collections/index/?originalTransactionId=&fingerprint=';

async function checkCollectionsByActionsFingerprint() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
        if (message.action === 'checkCollectionsByFingerPrint') {
              let finalUrl
              const originalTabId = sender.tab.id;
              const fingerPrint = message.fingerPrint; 
              const urlWithFingerPrint = `${fingerprintURL}${encodeURIComponent(fingerPrint)}`;
              
      
              if(urlWithFingerPrint) {
                  finalUrl = urlWithFingerPrint
                  console.log(finalUrl)
              } 
      
              openTab(finalUrl, (tab) => {
                  const tabId = tab.id;
                  // Inject content script to extract data from the page
                  chrome.scripting.executeScript({
                      target: { tabId: tabId },
                      func: extractDataFromPage
                  }, (results) => {
                      if (results && results[0] && results[0].result) {
                          const extractedData = results[0].result;
                          //console.log('Extracted Data:', extractedData);
                          
                          sendResponse({ tabId: tabId, extractedData: extractedData });
                      } else {
                          console.error('Error extracting data');
                          sendResponse({ tabId: tabId, extractedData: [] });
                      }
                      
      
                      closeTab(tabId, originalTabId);
      
                  });
              });
      
              // Return true to indicate that we want to use sendResponse asynchronously
              return true;
            }
          
      });
}
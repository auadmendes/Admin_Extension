/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
async function checkCollectionsByActionsPersonId() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
        if (message.action === 'checkCollectionsByPersonId') {
            let finalUrl
            const originalTabId = sender.tab.id;
            const endUserID = message.personId; 
            const urlWithPersonId = `${collectionsURL}&personId=${endUserID}`; 
            const urlWithCustomerID = `${collectionsCustomerURl}&customerId=${endUserID}`; 
    
            if(urlWithPersonId) {
                finalUrl = urlWithPersonId
            } else if (urlWithCustomerID) {
                finalUrl = urlWithCustomerID
            }else {
                return
            }
    
            openTab(finalUrl, (tab) => {
                const tabId = tab.id;

                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    func: extractDataFromPage
                }, (results) => {
                    if (results && results[0] && results[0].result) {
                        const extractedData = results[0].result;
                        console.log('Extracted Data:', extractedData);
                        // Sending the extracted data back to the content script...
                        sendResponse({ tabId: tabId, extractedData: extractedData });
                    } else {
                        console.error('Error extracting data');
                        sendResponse({ tabId: tabId, extractedData: [] });
                    }

                    closeTab(tabId, originalTabId);
                });
            });
    
            return true;
        }
      });
}
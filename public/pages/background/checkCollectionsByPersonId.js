/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
async function checkCollectionsByActionsPersonId() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
        if (message.action === 'checkCollectionsByPersonId') {
            let finalUrl
            const originalTabId = sender.tab.id;
            const endUserID = message.personId; // Get the personId from the message
            const urlWithPersonId = `${collectionsURL}&personId=${endUserID}`; // Modify URL to include personId
            const urlWithCustomerID = `${collectionsCustomerURl}&customerId=${endUserID}`; // Modify URL to include personId
    
            if(urlWithPersonId) {
                finalUrl = urlWithPersonId
            } else if (urlWithCustomerID) {
                finalUrl = urlWithCustomerID
            }else {
                return
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
                        console.log('Extracted Data:', extractedData);
                        // Send the extracted data back to the content script
                        sendResponse({ tabId: tabId, extractedData: extractedData });
                    } else {
                        console.error('Error extracting data');
                        sendResponse({ tabId: tabId, extractedData: [] });
                    }
                    // Close the tab after extracting data and switch back to the original tab
                    closeTab(tabId, originalTabId);
                });
            });
    
            // Return true to indicate that we want to use sendResponse asynchronously
            return true;
        }
      });
}
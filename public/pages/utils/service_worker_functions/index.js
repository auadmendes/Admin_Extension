/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createPOAByServiceWorker(URL) {
    
    chrome.runtime.sendMessage({ action: 'createPOAByTable', urlID: URL }, () => {
        console.log('.')
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function openTabInServiceWorker(personId) {
    // Send a message to the service worker to open a tab with the personId
    chrome.runtime.sendMessage({ action: 'checkCollectionsByPersonId', personId: personId }, (response) => {
        const tabId = response.tabId;
        const data = response.extractedData; // Extracted data from the service worker
        console.log('New tab opened with ID:', tabId);
        console.log('New Data:', data);

            
        data.forEach((item) => {
            checkCheckboxesByTransactionId(item.transactionId)
            
            //console.log('Transaction ID:', item.transactionId);
        });
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function openTabInServiceWorkerCollectionsFingerPrint(fingerPrint) {
    // Send a message to the service worker to open a tab with the personId
    chrome.runtime.sendMessage({ action: 'checkCollectionsByFingerPrint', fingerPrint: fingerPrint }, (response) => {
        //const tabId = response.tabId;
        const data = response.extractedData; // Extracted data from the service worker
            
        data.forEach((item) => {
            checkCheckboxesByTransactionId(item.transactionId)
            
            //console.log('Transaction ID:', item.transactionId);
        });
    });
}

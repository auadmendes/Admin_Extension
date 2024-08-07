/* eslint-disable no-undef */
importScripts('checkCollectionsByPersonId.js');
importScripts('checkCollectionsByButtonActionsFingerprint.js');
importScripts('createPOA.js');


const collectionsURL = 'https://trustly.one/admin-console/collections/index/?originalTransactionId=&transactionId=';

const collectionsCustomerURl = 'https://trustly.one/admin-console/collections/index/?originalTransactionId=&transactionId='
const transactionsURL = 'https://trustly.one/admin-console/transactions/details/';
const feesURL = 'https://trustly.one/admin-console/transactions'


function extractDataFromPage() {
    const rows = document.querySelectorAll('tr');
    const data = Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 9 && (cells[9].textContent.trim() === 'PENDING' || cells[9].textContent.trim() == 'PARTIAL')) {
            return {
                transactionId: cells[1].textContent.trim(),
                originalTransaction: cells[2].textContent.trim(),
                amount: cells[7].textContent.trim(),
                status: cells[9].textContent.trim(),
                return: cells[10].textContent.trim(),
                created_at: cells[6].textContent.trim()
            };
        }
        return null;
    }).filter(item => item !== null); // Filter out null values

    return data;
}

function extractDataFromFeePage() {
    const rows = document.querySelectorAll('tr');
    const data = Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 1 ) { //&& cells[9].textContent.trim() === 'PENDING'
            return {
                transactionId: cells[1].textContent.trim(),
                trxType: cells[7].textContent.trim(),
                amount: cells[16].textContent.trim(),
                status: cells[8].textContent.trim(),
                reference: cells[14].textContent.trim(),
                created_at: cells[4].textContent.trim().substring(0,10)
            };
        }
        return null;
    }).filter(item => item !== null); // Filter out null values
    return data;
}

function extractTransactionData() {
    const personID = document.querySelector('#info .table-hover tr:nth-child(2) td:nth-child(2)')?.textContent;
    return personID;
}

function extractDataFromMultiplePages(transactionIds, callback) {
    let results = [];
    let currentIndex = 0;

    function processNextTransaction() {
        if (currentIndex >= transactionIds.length) {
            callback(results);
            return;
        }

        const transactionId = transactionIds[currentIndex];
        const url = `${transactionsURL}${transactionId}#Payment`;

        chrome.tabs.create({ url, active: false }, (tab) => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: extractTransactionData
            }, (scriptResults) => {
                if (scriptResults && scriptResults[0] && scriptResults[0].result) {
                    results.push({ transactionId: transactionId, data: scriptResults[0].result });
                } else {
                    results.push({ transactionId: transactionId, data: [] });
                }

                chrome.tabs.remove(tab.id, () => {
                    currentIndex++;
                    processNextTransaction();
                });
            });
        });
    }

    processNextTransaction();
}

function openTab(url, callback) {
    chrome.tabs.create({ url, active: false }, (tab) => {
        // Execute content script after tab is created and URL is updated
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: extractDataFromPage
        }, (results) => {
            if (results && results[0] && results[0].result) {
                const extractedData = results[0].result;
                console.log('Extracted Data:', extractedData);
                // Send the extracted data back to the content script
                callback(tab);
            } else {
                console.error('Error extracting data');
                callback(tab); // Proceed even if data extraction fails
            }
        });
    });
}

function closeTab(tabId, originalTabId) {
    chrome.tabs.remove(tabId, () => {
        if (originalTabId !== undefined) {
            //chrome.tabs.update(originalTabId, { active: true });
        }
    });
}


checkCollectionsByActionsFingerprint();
checkCollectionsByActionsPersonId();
createPOAByTable();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
    if (message.action === 'closeTab' && sender.tab) {
        chrome.tabs.remove(sender.tab.id, () => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log(`Tab ${sender.tab.id} closed`);
            }
        });
    }

    if (message.action === 'extractMultiplePages') {
        const transactionIds = message.transactionIds; // Array of transaction IDs to process
        extractDataFromMultiplePages(transactionIds, (results) => {
            sendResponse({ extractedData: results });
        });

        // Return true to indicate that we want to use sendResponse asynchronously
        return true;
    }
    

    if (message.action === 'checkCollectionsByTransaction') {
        let finalUrl
        const originalTabId = sender.tab.id;
        const personId = message.personId; 
        const customerID = message.customerId; 
        const urlWithPersonId = `${collectionsURL}&personId=${personId}`; // Modify URL to include personId
        const urlWithCustomerID = `${collectionsCustomerURl}&customerId=${customerID}`; // Modify URL to include personId

        if(personId) {
            finalUrl = urlWithPersonId
        } else if (customerID) {
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

    if (message.action === 'checkFeesByPersonId') {
        let finalUrl
        const originalTabId = sender.tab.id;
        const personId = message.personId; 
        const externalId = message.externalId; 

        const urlFeeWithPersonId = `${feesURL}?personId=${personId}&paymentType=1`;
        const urlFeeWithExternalId = `${feesURL}?customerExternalId=${externalId}&paymentType=1`;

        if(personId) {
            finalUrl = urlFeeWithPersonId
        } else if (externalId) {
            finalUrl = urlFeeWithExternalId
        }else {
            return
        }

        openTab(finalUrl, (tab) => {
            const tabId = tab.id;
            // Inject content script to extract data from the page
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: extractDataFromFeePage
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



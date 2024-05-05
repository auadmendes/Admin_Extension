
//import { chrome } from 'chrome';

type FieldObject = {
  label: string;
  book_mark: boolean;
  divField: string; 
  id: number | null;
};

  export async function downloadKrakenResult() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: function() {
        const tableData = document.getElementById('table-body');
  
        if (tableData) {
          const rows = tableData.querySelectorAll('tr');
          const csvRows: string[] = [];
          const header = 'Customer ID, Transaction ID, Date Time Recovered, Amount Recovered, Collection Status, Result';
  
          csvRows.push(header); // Add the header as the first row
  
          rows.forEach(row => {
            const customerId = row.querySelector('#external_customer_id')?.textContent ?? '';
            const transactionId = row.querySelector('#transaction_id')?.textContent ?? '';
            const recoveryDateTime = row.querySelector('#recovery_datetime')?.textContent ?? '';
            const amount = row.querySelector('#amount_recovered')?.textContent ?? '';
            const collectionStatus = row.querySelector('#collection_status')?.textContent ?? '';
            const result = row.querySelector('#processing_result')?.textContent ?? '';
  
            const csvRow = [customerId, transactionId, recoveryDateTime, amount, collectionStatus, result].join(',');
            csvRows.push(csvRow);
          });
  
          const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement('a');
          link.setAttribute('href', encodedUri);
          link.setAttribute('download', 'Kraken_result.csv');
          document.body.appendChild(link);
          link.click();
        } else {
          console.log('Table body is null');
        }
      },
    });
  }
  
  export async function getInputFieldsVisible() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    return new Promise((resolve, reject) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id! },
            func: async function() {
                const formData = document.querySelector('#frmTransactions');
                const fieldsData: FieldObject[] = [];

                if (formData) {
                    const formDataArray = Array.from(formData.querySelectorAll('.col-sm-3'));

                    formDataArray.forEach((div, index) => {
                        // Check if the parent div has ID 'hidden-columns'
                        if (!div.closest('#hidden-columns')) {
                            const label = div.querySelector('label')?.textContent?.trim();
                            const divFieldContent = div.innerHTML; // Extract HTML content
                      
                            let book_mark = false; // Default value
                      
                            switch (label) {
                                case 'Transaction Id:':
                                case 'FI Transaction Id:':
                                case 'Merchant Reference:':
                                case 'Original Transaction Id:':
                                case 'Merchant:':
                                case 'FI:':
                                case 'Payment Id:':
                                case 'PP Trx Status Code:':
                                case 'Payment Type:':
                                case 'Transaction Type:':
                                case 'Transaction Status:':
                                case 'Authorization Status:':
                                    book_mark = false;
                                    break;
                                default:
                                    break;
                            }
                      
                            const fieldObject: FieldObject = {
                                id: index, // ID based on index to represent sequence
                                label: label || '', // Use empty string if label is null or undefined
                                book_mark,
                                divField: divFieldContent, // Assign HTML content as a string
                            };
                      
                            fieldsData.push(fieldObject);
                        }
                    });

                    // Check if there is existing data in chrome.storage.local
                    chrome.storage.local.get(['fieldsData'], function(result) {
                        const existingFieldsData = result.fieldsData;
                        if (existingFieldsData) {
                            alert('Fields data already exists in storage!');
                        } else {
                            // Save fieldsData to async storage if no existing data
                            chrome.storage.local.set({ fieldsData }, function() {
                                resolve(fieldsData);
                            });
                        }
                    });
                } else {
                    reject('Form data not found');
                }
            }
        });
    });
  }
  
  export async function getStoredData() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('fieldsData', function (result) {
      const storedData: FieldObject[] = result.fieldsData;
      if (storedData) {
        resolve(storedData);
      } else {
        reject('No data found in storage');
      }
    });
  });
  }

  export async function updateInputFieldsBookMark(updatedFields: { label: string, book_mark: boolean }[]): Promise<void> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('fieldsData', function (result) {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError.message);
                return;
            }

            const fieldsData = result.fieldsData || [];
            
            // Update the book_mark and index
            const updatedData = fieldsData.map((item: FieldObject) => {
                const updatedField = updatedFields.find(updated => updated.label === item.label);
                if (updatedField) {
                    const updatedItem = { ...item, book_mark: updatedField.book_mark };
                    return updatedItem;
                }
                return item;
            });

            // Sort the data based on the book_mark
            const sortedData = updatedData.sort((a: FieldObject, b: FieldObject) => {
                if (a.book_mark && !b.book_mark) return -1;
                if (!a.book_mark && b.book_mark) return 1;
                return 0;
            });

            chrome.storage.local.set({ fieldsData: sortedData }, function () {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError.message);
                } else {
                    resolve();
                }
            });
        });
    });
  }

  export async function deleteStoredData(): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove('fieldsData', function () {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
        } else {
          resolve();
        }
      });
    });
  }
  
  export async function setFieldsToTheFormTransactions() {
    
    const formPage = document.querySelector('#frmTransactions');
    try {
        const storedData = await getStoredData();
        const divFieldVisible = document.createElement('div');
        
        divFieldVisible.id = 'divFieldVisible';
        divFieldVisible.style.display = 'flex';
        divFieldVisible.style.flexWrap = 'wrap';


        if (storedData && Array.isArray(storedData)) {
            fields = storedData;
            //console.log(storedData)

            const extractedValues = await getFieldValuesByUrl();
            const { 
                transactionId, 
                merchantReference,
                ppTransactionId,
                teaId,
                customerExternalId,
                personId,
                mctCustomerName,
                paymentType,
                transactionType,
                transactionStatus,
                merchantId,
                paymentProviderId
            } = extractedValues;

            fields.forEach(item => {
                if (item.book_mark === true) {

                    const divElement = document.createElement('div');
                    divElement.style.flexBasis = 'calc(25% - 2px)'; 
                    
                    const newItemDiv = document.createElement('div');
                    newItemDiv.innerHTML = item.divField;
                    const label = item.label;
                    let selectElement;
                    
                    switch (label) {
                        case 'Transaction Id:':
                            newItemDiv.querySelector('input')?.setAttribute('value', transactionId || '');
                            break;
                        case 'Merchant Reference:':
                            newItemDiv.querySelector('input')?.setAttribute('value', merchantReference || '') ;
                            break;
                        case 'FI Transaction Id:':
                            newItemDiv.querySelector('input')?.setAttribute('value', ppTransactionId || '') ;
                            break;
                        case 'TEA ID:':
                            newItemDiv.querySelector('input')?.setAttribute('value', teaId || '') ;
                            break;
                        case 'Customer External Id:':
                            newItemDiv.querySelector('input')?.setAttribute('value', customerExternalId || '') ;
                            break;
                        case 'Person ID:':
                            newItemDiv.querySelector('input')?.setAttribute('value', personId || '') ;
                            break;
                        case 'Customer Name:':
                            newItemDiv.querySelector('input')?.setAttribute('value', mctCustomerName || '') ;
                            break;
                            case 'Payment Type:':
                                // eslint-disable-next-line no-case-declarations
                                const selectElement1 = newItemDiv.querySelector('select'); // Assign value inside the case block
                                if (selectElement1) {
                                    const typePayment = paymentType ? paymentType.split(',') : [];
                                    selectElement1.querySelectorAll('option').forEach(option => {
                                        if(typePayment.includes(option.value)) {
                                            option.selected = true;
                                            option.style.color = '#025939';
                                            option.style.backgroundColor = '#d9ecd3';
                                        }
                                    })
                                }
                                break;
                                case 'Transaction Type:':
                                    // eslint-disable-next-line no-case-declarations
                                    const selectElement2 = newItemDiv.querySelector('select');
                                    if (selectElement2) {
                                        // Loop through existing options and set selected based on URL values
                                        const transactionTypes = transactionType ? transactionType.split(',') : [];
                                        selectElement2.querySelectorAll('option').forEach(option => {
                                            if (transactionTypes.includes(option.value)) {
                                                option.selected = true;
                                                option.style.color = '#025939';
                                                option.style.backgroundColor = '#d9ecd3';
                                            }
                                        });
                                        selectElement2.style.width = '187px';
                                    }
                                    break;
                            case 'Transaction Status:':
                               // eslint-disable-next-line no-case-declarations
                               const selectElement3 = newItemDiv.querySelector('select'); 
                                if (selectElement3) {
                                    const statusTransaction = transactionStatus ? transactionStatus.split(',') : [];
                                    selectElement3.querySelectorAll('option').forEach(option => {
                                        if(statusTransaction.includes(option.value)) {
                                            option.selected = true;
                                            option.style.color = '#025939';
                                            option.style.backgroundColor = '#d9ecd3';
                                            //option.style.backgroundColor = 'transparent';
                                            //option.style.color = 'red';
                                        }
                                    })
                                }
                                break;
                            case 'Merchant:':
                                selectElement = newItemDiv.querySelector('select'); // Assign value inside the case block
                                if (selectElement) {
                                    selectElement.value = merchantId || '';
                                    //selectElement.style.width = '187px';
                                }
                                break;
                            case 'FI:':
                                selectElement = newItemDiv.querySelector('select'); // Assign value inside the case block
                                if (selectElement) {
                                    selectElement.value = paymentProviderId || '';
                                    //selectElement.style.width = '187px';
                                }
                                break;
                        default:
                            break;
                    }

                    divElement.appendChild(newItemDiv);

                    selectElement = newItemDiv.querySelector('select');
                    if (selectElement) {
                        selectElement.style.width = '187px';
                    }

                    divFieldVisible.appendChild(divElement);
                }
            });

            if (formPage) {
                const hrElement = formPage.querySelector('hr');
                if (hrElement) {
                    formPage.insertBefore(divFieldVisible, hrElement);
                } else {
                    formPage.appendChild(divFieldVisible);
                }
            }
        } else {
            // Handle case where no stored data or incorrect data format
        }
    } catch (error) {
        console.error('Error fetching stored data:', error);
    }
}


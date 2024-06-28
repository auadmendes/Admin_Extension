
//alert('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')

//import { useState } from "react";
//import { getStoredData } from "../src/utils";

//console.log('Luciano Horta')

// const body = document.querySelector('body');


// if(body){
//     body.style.background = '#fefefe';
// }
// type FieldObject = {
//     label: string;
//     book_mark: boolean,
//     div: HTMLDivElement;
//   };

  //const [fields, setFields] = useState<FieldObject[]>()



let  fields  = []


    async function initiateFields() {
        const url = window.location.href;
        const customer = 'https://trustly.one/admin-console/'
        if(url.startsWith(customer)) {
            checkIsDarkModeSaved();
        }

        if (url.startsWith('https://trustly.one/admin-console/transactions/customers')) {
            // Perform actions specific to this URL
            // For example:
            console.log('URL matches: https://trustly.one/admin-console/transactions/customers');
        } else {
            // Handle other URLs or do nothing
            getStoredData();
            setFieldsToTheFormTransactions();
            checkIsDarkModeSaved();
            getFieldValuesByUrl();
        }


        //listenPage();

    }

    async function getFieldValuesByUrl() {
        
        const url = new URL(window.location.href);
        const params = url.searchParams;
    
        // Example: get the value of merchantReference parameter
        const transactionId = params.get('transactionId');
        const merchantReference = params.get('merchantReference');
        const customerExternalId = params.get('customerExternalId');
        const personId = params.get('personId');
        const mctCustomerName = params.get('mctCustomerName');
        const teaId = params.get('teaId');
        const ppTransactionId = params.get('ppTransactionId');
        const merchantId = params.get('merchantId');
        const paymentProviderId = params.get('paymentProviderId');
        const framework = params.get('framework');
        const accountName = params.get('accountName');

        const transactionTypeParam = params.getAll('transactionType');
        const transactionType = transactionTypeParam.join(',')
        
        const paymentTypeParams = params.getAll('paymentType');
        const paymentType = paymentTypeParams.join(',');

        const transactionStatusParams = params.getAll('transactionStatus');
        const transactionStatus = transactionStatusParams.join(',');

        // You can repeat this for other parameters you want to extract
        // const transactionId = params.get('transactionId');
        // const ppTransactionId = params.get('ppTransactionId');
        // ...
    
        // Log or use the extracted values as needed
        console.log('Merchant Reference:', merchantReference);
        // console.log('Transaction ID:', transactionId);
        // console.log('PP Transaction ID:', ppTransactionId);
        // ...
    
        // If you want to save these values for later use, you can store them in variables or an object
        const extractedValues = {
            merchantReference,
            transactionId,
            customerExternalId,
            personId,
            mctCustomerName,
            teaId,
            ppTransactionId,
            paymentType,
            transactionType,
            transactionStatus,
            merchantId,
            paymentProviderId,
            framework,
            accountName
            // transactionId,
            // ppTransactionId,
            // ...
        };
    
        return extractedValues;
    }
    
    
    async function getStoredData() {
        return new Promise((resolve, reject) => {
        chrome.storage.local.get('fieldsData', function (result) {
            const storedData = result.fieldsData;
            if (storedData) {

                removeDivsUntilHr();

                resolve(storedData);

            } else {
            reject('No data found in storage');
            }
        });
        });
    }
    
    // async function getColumnsStored() {
    //     return new Promise((resolve, reject) => {
    //     chrome.storage.local.get('columnsData', function (result) {
    //         const columnsDataStored = result.fieldsData;
    //         if (columnsDataStored) {

    //             removeDivsUntilHr();

    //             resolve(columnsDataStored);

    //         } else {
    //         reject('No data found in storage');
    //         }
    //     });
    //     });
    // }


   async function setFieldsToTheFormTransactions() {
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
                    paymentProviderId,
                    framework,
                    accountName
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
                            case 'Trx Account Name:':
                                newItemDiv.querySelector('input')?.setAttribute('value', accountName || '') ;
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
                                case 'Platform:':
                                    selectElement = newItemDiv.querySelector('select'); // Assign value inside the case block
                                    if (selectElement) {
                                        selectElement.value = framework || '';
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

    async function checkIsDarkModeSaved() {
        chrome.storage.local.get('isDark', function (result) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }

            const isDark = result.isDark;
            if (isDark === true) {
                darkMode();
            } else {
                // Value not set, default to false and save to storage
                console.log('isDarkMode is false')
            }
        });
    }

    async function darkMode() {
        const urlAdmin = 'https://trustly.one/admin-console/'
        const customer = 'https://trustly.one/admin-console/transactions/customers'
        
        if (location.href.includes(urlAdmin) || location.href.includes(customer)) {
            //console.log('deu certo:   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', customer, ' ------------')
            const css = `
                html {
                    -webkit-filter: invert(100%);
                    -moz-filter: invert(100%);
                    -o-filter: invert(100%);
                    -ms-filter: invert(100%);
                    filter: invert(100%);
                }
                a {
                    color: red;
                }
                body {
                    background-color: #F5F5F5
                }
                .danger {
                    background-color: rgba(0, 255, 255, 0.05) !important; /* Set new background color */
                    color: white !important; /* Set text color to white */
                }
                .sortable  .danger {
                    background-color: rgba(0, 255, 255, 0.5) !important; /* Set new background color */
                    color: #000 !important; /* Set text color to white */
                }
                .sortable  .success {
                    background-color: rgba(255, 0, 255, 0.5) !important; /* Set new background color */
                    color: #000 !important; /* Set text color to white */
                }
                .success {
                    background-color: rgba(255, 0, 255, 0.03) !important; /* Set new background color */
                    color: white !important; /* Set text color to white */
                }
                .danger > *,
                .success > * {
                    background-color: unset !important; /* Unset background color for children */
                }
                #pwmb-brand {
                    filter: invert(100%) !important; /* Do not invert background for pwmb-brand element */
                }
                #appversion {
                    filter: invert(70%) !important; /* Do not invert background for pwmb-brand element */
                    
                    color: white;
                }
            `;
    
            // Checking if the dark mode is already active
            const existingStyle = document.querySelector('#darkModeStyle');
            if (existingStyle) {
                // Remove the dark mode style
                ///////Voltar ao normal quando ativar////////////existingStyle.remove();
            } else {

                const style = document.createElement('style');
                style.id = 'darkModeStyle';
                style.textContent = css;
                
                document.head.appendChild(style);
            }
        }
    }

    async function removeDivsUntilHr() {
        const form = document.querySelector('#frmTransactions');
        if (form) {
            const children = form.children;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (child === document.querySelector('#divFieldVisible')) {
                    continue; // Skip divFieldVisible and move to the next child
                } else if (child.tagName === 'HR') {
                    break; // Stop when we find an hr tag
                } else if (child.classList.contains('col-sm-3')) {
                    form.removeChild(child); // Remove divs with col-sm-3 class
                    i--; // Decrement i because the child nodes list length has decreased
                }
            }
        }
    }

    async function getStoreColumnData() {
        return new Promise((resolve, reject) => {
        chrome.storage.local.get('columnsData', function (result) {
            const storedColumnData = result.columnsData;
            if (storedColumnData) {
                //console.log('inputs', storedColumnData)
                updateCheckboxInputs();
                resolve(storedColumnData);

            } else {
                mapColumns();
                reject('No data found in storage');
            }
        });
        });
    }

    async function mapColumns() {
        const columns = document.querySelectorAll('#hidden-columns label');
        const columnsData = [];
    
        columns.forEach(label => {
            const input = label.querySelector('input');
            columnsData.push({
                label: label.textContent.trim(),
                inputType: input.type,
                inputName: input.name,
                inputId: input.id,
                inputChecked: input.checked,
                book_mark: false // Initial value
            });
        });
    
        // Check if columnsData already exists in Chrome storage
        chrome.storage.local.get('columnsData', function(result) {
            if (result.columnsData && result.columnsData.length > 0) {
                console.log('Columns data already exists:', result.columnsData);
            } else {
                // Save the new data in Chrome storage
                chrome.storage.local.set({ columnsData }, function() {
                    console.log('Columns data saved:', columnsData);
                });
            }
        });
    }

    async function updateCheckboxInputs() {
        chrome.storage.local.get('columnsData', function(result) {
            const storedColumnsData = result.columnsData;
    
            if (storedColumnsData && Array.isArray(storedColumnsData)) {
                const columns = document.querySelectorAll('#hidden-columns label');
    
                columns.forEach(label => {
                    const input = label.querySelector('input');
                    const columnId = input.id;
    
                    const storedColumn = storedColumnsData.find(column => column.inputId === columnId);
    
                    if (storedColumn && storedColumn.inputChecked) {
                        input.dispatchEvent(new Event('click')); // Simulate a click event on the input element
                    }
                });
            } else {
                console.log('No columns data found in storage.');
            }
        });
    }
    

    getStoreColumnData();
    //mapColumns();
    //updateCheckboxInputs();

    //  async function deleteColumnsData() {
    //     return new Promise((resolve, reject) => {
    //       chrome.storage.local.remove('columnsData', function () {
    //         if (chrome.runtime.lastError) {
    //           reject(chrome.runtime.lastError.message);
    //         } 
    //       });
    //     });
    //   }
    
      //deleteColumnsData();

    // //@ts-ignore
    // function openTabInServiceWorker(personId) {
    //     // Send a message to the service worker to open a tab with the personId
    //     chrome.runtime.sendMessage({ action: 'openTab', personId: personId }, (response) => {
    //         const tabId = response.tabId;
    //         const data = response.extractedData; // Extracted data from the service worker
    //         console.log('New tab opened with ID:', tabId);
    //         console.log('New Data:', data);
    
    //         // Iterate over the extracted data to log each transactionId
    //          //@ts-ignore
    //         data.forEach(item => {
    //             checkCheckboxesByTransactionId(item.transactionId)
    //             console.log('Transaction ID:', item.transactionId);
    //         });
    //     });
    // }
    
    // async function listenPage() {
    //     //document.addEventListener('DOMContentLoaded', function () {
    //         // Find the input element with ID 'personId'
    //         const personIdInput = document.getElementById('personId');
    
    //         // Create a button element
    //         const openTabButton = document.createElement('button');
    //         openTabButton.id = 'yourButtonId'; 
    //         openTabButton.textContent = 'Open Tab';
    //         openTabButton.style.background = 'red';
    //         openTabButton.style.color = 'white';
            
    //         // Add event listener to the button
    //         openTabButton.addEventListener('click', function () {
    //             // Call the function to open a tab using the service worker with the input value
    //             if (personIdInput instanceof HTMLInputElement) {
    //                 openTabInServiceWorker(personIdInput.value);
    //             }
    //         });
    
    //         // Append the button to the body
    //         document.body.appendChild(openTabButton);
    //     //});
    // }
    
    //  //@ts-ignore
    // function checkCheckboxesByTransactionId(transactionId) {
    //     // Select all rows in the table body
    //     const rows = document.querySelectorAll('tbody tr');
        
    //     rows.forEach(row => {
    //         // Select the second column (td[1]) in the current row
    //         const transactionCell = row.querySelectorAll('td')[1];
    //          //@ts-ignore
    //         if (transactionCell && transactionCell.textContent.trim() === transactionId) {
    //             // Select the checkbox in the current row
    //             const checkbox = row.querySelector('input[type="checkbox"]');
                
    //             if (checkbox) {
    //                  //@ts-ignore
    //                 checkbox.checked = true;
    //             }
    //         }
    //     });
    // }

    // function changeToolbarColor() {
    //     const style = document.createElement('style');
    //     style.textContent = `
    //       body.admin-console .toolbar {
    //         background-color: rgb(182, 149, 169) !important;
    //       }
    //     `;
    //     document.head.appendChild(style);
    //   }
      
    //   // Call the function to apply the style when needed
    //   changeToolbarColor();

    initiateFields();


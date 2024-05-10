
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
        const customer = 'https://trustly.one/admin-console/transactions/customers'
        if(url.startsWith(customer)) {
            darkMode();
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
        }
    }

    async function getFieldValuesByUrl() {
        const url = window.location.href;
        const params = new URLSearchParams(url);
    
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
            paymentProviderId
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


    async function checkIsDarkModeSaved() {
        chrome.storage.local.get('isDark', function (result) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }

            const isDark = result.isDark;
            if (isDark === true) {
                darkMode()
            } else {
                // Value not set, default to false and save to storage
                console.log('isDarkMode is false')
            }
        });
    }

    async function darkMode() {
        const urlAdmin = 'https://trustly.one/admin-console'
        const customer = 'https://trustly.one/admin-console/transactions/customers'
        if (location.href.startsWith(urlAdmin) || location.href.startsWith(customer)) {
            console.log('deu certo:   > ', location.href)
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
    
            // Check if the dark mode is already active
            const existingStyle = document.querySelector('#darkModeStyle');
            if (existingStyle) {
                // Remove the dark mode style
                existingStyle.remove();
            } else {
                // Create a new style element for dark mode
                const style = document.createElement('style');
                style.id = 'darkModeStyle';
                style.textContent = css;
                // Inject the dark mode style into the head
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


    initiateFields();
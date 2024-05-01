
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
    
        if (url.startsWith('https://trustly.one/admin-console/transactions/customers')) {
            // Perform actions specific to this URL
            // For example:
            console.log('URL matches: https://trustly.one/admin-console/transactions/customers');
        } else {
            // Handle other URLs or do nothing
            getStoredData();
            setFieldsToTheFormTransactions();
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
        const paymentType = params.get('paymentType');
        const transactionType = params.get('transactionType');
        const transactionStatus = params.get('transactionStatus');
    
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
            transactionStatus
            // transactionId,
            // ppTransactionId,
            // ...
        };
    
        return extractedValues;
    }
    
    // Call the function and handle the returned values
    // getFieldValuesByUrl().then((extractedValues) => {
    //     console.log('Extracted Values:', extractedValues);
    //     // You can use extractedValues here as needed
    // }).catch((error) => {
    //     console.error('Error extracting values:', error);
    // });
    



// const url = window.location.href;

// // Find the index where "merchantReference=" starts
// const startIndex = url.indexOf("merchantReference=");

// // Check if "merchantReference=" is found in the URL
// if (startIndex !== -1) {
//     // Extract the substring starting from "merchantReference="
//     const substring = url.substring(startIndex);

//     // Log the extracted substring
//     console.log(substring);
// } else {
//     console.log("merchantReference parameter not found in the URL.");
// }




    async function removeDivsUntilHr() {
        const form = document.querySelector('#frmTransactions');
        if (form) {
            const children = form.children;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (child.tagName === 'hr') {
                    break; // Stop when we find an hr tag
                } else if (child.classList.contains('col-sm-3')) {
                    form.removeChild(child); // Remove divs with col-sm-3 class
                    i--; // Decrement i because the child nodes list length has decreased
                }
            }
        }
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

    // async function setFieldsToTheFormTransactions() {
    //     const formPage = document.querySelector('#frmTransactions');
    //     try {
    //         const storedData = await getStoredData();
    //         const divFieldVisible = document.createElement('div');

    //         if (storedData && Array.isArray(storedData)) {
    //             fields = storedData;

    //             fields.forEach(item => {
    //                 //const labelElement = document.createElement('label');
    //                 //labelElement.textContent = item.label;

    //                 if(item.book_mark === true) {
    //                 const divElement = document.createElement('div');
    //                 divElement.style.width = '200px';
    //                 //divElement.appendChild(labelElement);

    //                 // Create a new div element and set its innerHTML to item.div
    //                 const newItemDiv = document.createElement('div');
    //                 newItemDiv.innerHTML = item.divField;

    //                 // Append the new div element containing HTML content to divElement
    //                 divElement.appendChild(newItemDiv);

    //                 divFieldVisible.appendChild(divElement);
    //                 }
    //             });

    //             if (formPage) {
    //                 formPage.appendChild(divFieldVisible);
    //             }

    //             //console.log('--------', fields);
    //         } else {
    //             // Handle case where no stored data or incorrect data format
    //         }

    //         //console.log(storedData);
    //         // Use the storedData as needed in your other page
    //     } catch (error) {
    //         console.error('Error fetching stored data:', error);
    //     }
    // }


    // async function removeDivsUntilClearfix() {
    //     const form = document.querySelector('#frmTransactions');
    //     if(form) {
    //         const children = form.children;
    //         for (let i = 0; i < children.length; i++) {
    //             const child = children[i];
    //             if (child.classList.contains('clearfix')) {
    //                 break; // Stop when we find the clearfix div
    //             } else if (child.classList.contains('col-sm-3')) {
    //                 form.removeChild(child); // Remove divs with col-sm-3 class
    //                 i--; // Decrement i because the child nodes list length has decreased
    //             }
    //         }
    //     }
    
        
    // }

    // async function removeDivsUntilHr() {
    //     const form = document.querySelector('#frmTransactions');
    //     if (form) {
    //         const children = form.children;
    //         for (let i = 0; i < children.length; i++) {
    //             const child = children[i];
    //             if (child.tagName === 'hr') {
    //                 break; // Stop when we find an hr tag
    //             } else if (child.classList.contains('col-sm-3')) {
    //                 form.removeChild(child); // Remove divs with col-sm-3 class
    //                 i--; // Decrement i because the child nodes list length has decreased
    //             }
    //         }
    //     }
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
                    transactionStatus
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
                                    selectElement = newItemDiv.querySelector('select'); // Assign value inside the case block
                                    if (selectElement) {
                                        selectElement.value = paymentType || '';
                                        //selectElement.style.width = '187px';
                                    }
                                    break;
                                case 'Transaction Type:':
                                    selectElement = newItemDiv.querySelector('select'); // Assign value inside the case block
                                    if (selectElement) {
                                        selectElement.value = transactionType || '';
                                        //selectElement.style.width = '187px';
                                    }
                                    break;
                                case 'Transaction Status:':
                                    selectElement = newItemDiv.querySelector('select'); // Assign value inside the case block
                                    if (selectElement) {
                                        selectElement.value = transactionStatus || '';
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
    
//frmTransactions


    // async function removeDivsUntilHr() {
    //     const form = document.querySelector('#frmTransactions');
    //     if (form) {
    //         const children = form.children;
    //         for (let i = 0; i < children.length; i++) {
    //             const child = children[i];
    //             if (child === document.querySelector('#divFieldVisible')) {
    //                 continue; // Skip divFieldVisible and move to the next child
    //             } else if (child.tagName === 'HR') {
    //                 break; // Stop when we find an hr tag
    //             } else if (child.classList.contains('col-sm-3')) {
    //                 form.removeChild(child); // Remove divs with col-sm-3 class
    //                 i--; // Decrement i because the child nodes list length has decreased
    //             }
    //         }
    //     }
    // }

   

  //getInputFieldsVisible()
  //setFieldsToTheFormTransactions();
  //removeDivsUntilHr();
  
  initiateFields();
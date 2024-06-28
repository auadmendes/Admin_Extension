// document.addEventListener('DOMContentLoaded', async () => {
//     await init();
// });

window.onload = async () => {
    await init();
};
/* eslint-disable no-undef */


let transactionBoxUl;
let paymentBoxUl;
let fiBoxUl;
let accountCustomerBoxUl;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let teaID;
// eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
let totalAmount = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let amount = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let checkedCount = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const adminCustomersUrl = 'https://trustly.one/admin-console/transactions/customers'

async function init() {
    checkUrlPattern();
    loadGoogleFont();
    createGroup();
    //setTimeout(() => {
        changeLogo();
        merchantDetailsOnTableTransactions();
    //},1000)
    
    transactionTypesDetails();
    //creatingTheBoxInfo();
    styleText();
    addLinkToMerchantReferenceOnTransactionsList();

    createGroupOptionCheckCollections();
    groupActionOptions();
}

//init();



// function tooltipToast(htmlContent, element) {
//     const toast = document.createElement('div');
//     toast.classList.add('toast');
//     toast.innerHTML = htmlContent; 

//     toast.style.position = 'fixed';
//     toast.style.top = '100px';
//     toast.style.left = '50%';
//     toast.style.transform = 'translateX(-50%)';
//     toast.style.backgroundColor = '#0C0C0D';
//     //toast.style.color = '#262626';

//     document.body.appendChild(toast);

    
//     toast.style.opacity = "1";

    
//     let removalTimeout;

//     function removeToast() {
//         removalTimeout = setTimeout(() => {
//             toast.style.opacity = "0";
//             setTimeout(() => {
//                 toast.remove();
//             }, 500); 
//         }, 1000); 
//     }

    
//     function clearRemoveToast() {
//         clearTimeout(removalTimeout);
//     }

//     element.addEventListener('mouseleave', removeToast);
//     toast.addEventListener('mouseleave', removeToast);
//     toast.addEventListener('mouseenter', clearRemoveToast);
//     element.addEventListener('mouseenter', clearRemoveToast); 
// }


// function tooltipToastPayment(htmlContent, element) {
//     const toast = document.createElement('div');
//     toast.classList.add('toast');
//     toast.innerHTML = htmlContent; 

    
//     toast.style.position = 'fixed';
//     toast.style.top = '100px';
//     toast.style.left = '50%';
//     toast.style.transform = 'translateX(-50%)';

    
//     //toast.style.filter = 'invert(100%)';
//     toast.style.backgroundColor = '#0C0C0D';
//     toast.style.color = '#262626';

//     document.body.appendChild(toast);

    
//     toast.style.opacity = "1";

    
//     let removalTimeout;

//     function removeToast() {
//         toast.style.opacity = "0";
//         setTimeout(() => {
//             toast.remove();
//         }, 500);
//     }

    
//     function clearRemoveToast() {
//         clearTimeout(removalTimeout);
//     }

//     function handleOutsideClick(event) {
//         if (!toast.contains(event.target) && event.target !== element) {
//             removeToast();
//             document.removeEventListener('click', handleOutsideClick);
//         }
//     }

//     // Adding event listeners
//     element.addEventListener('mouseleave', () => {
//         removalTimeout = setTimeout(removeToast, 1000);
//     });
//     toast.addEventListener('mouseleave', () => {
//         removalTimeout = setTimeout(removeToast, 1000);
//     });
//     toast.addEventListener('mouseenter', clearRemoveToast);
//     document.addEventListener('click', handleOutsideClick);
// }

// async function paymentTab() {

//     const originalTransaction = document.querySelector('#transaction tbody tr:nth-child(3) td:nth-child(2) a:first-child')?.textContent;
//     const linkOriginalTransaction = document.createElement('a');
//     linkOriginalTransaction.href =  `https://trustly.one/admin-console/transactions/details/${originalTransaction}`; //urlOriginalTransaction;
//     const infoPaid = document.querySelector('#payment tbody tr:nth-child(15) td:nth-child(2)')?.textContent;
//     const refunded = document.querySelector('#payment tbody tr:nth-child(16) td:nth-child(2)')?.textContent;
//     const reversed = document.querySelector('#payment tbody tr:nth-child(17) td:nth-child(2)')?.textContent;
//     const balance = document.querySelector('#payment tbody tr:nth-child(18) td:nth-child(2)')?.textContent;
//     const customerExternalID = document.querySelector('#info .table-hover tr:nth-child(3) td:nth-child(2)')?.textContent?.trim();
    

//     const personID = document.querySelector('#info .table-hover tr:nth-child(2) td:nth-child(2)')?.textContent;
//     const customerID = document.querySelector('#info .table-hover tr:nth-child(1) td:nth-child(2)')?.textContent;

    
//     const loadingIcon = chrome.runtime.getURL("images/loadingIcon.gif");
//     let loadingPaymentBox = true;

  
    
//     paymentBoxUl = document.createElement('ul');
//     paymentBoxUl.style.background = 'transparent';
    
//     paymentBoxUl.id = 'paymentBox';
    
//     paymentBoxUl.innerHTML += `<h4>Payment</h4>`;
//     paymentBoxUl.innerHTML += `<li>Original: <a href="${linkOriginalTransaction}">${originalTransaction}</a></li>`;
//     paymentBoxUl.innerHTML += `<li>Paid: ${infoPaid}</li>`;
//     paymentBoxUl.innerHTML += `<li>Refunded: ${refunded}</li>`;
   
    
//     paymentBoxUl.innerHTML += `<li>Balance: ${balance}</li>`;
    
    
//     if (loadingPaymentBox) {
//         paymentBoxUl.innerHTML += `<li id="loadingPaymentBox" style="color: red;">
//             Loading information
//             <img style="width: 14px;" src=${loadingIcon} />
//         </li>`;
//     }

//     document.body.appendChild(paymentBoxUl); 

//     const collectionsArray = [];
//     try {
//         const collectionsResult = await checkCollectionsByTransaction(personID, customerID);
//         if(collectionsResult) {
//             collectionsArray.push(...collectionsResult);
//         }
        
//     } catch (error) {
//         console.error('Error fetching collection data:', error);
//     }

//     const feesArray = [];
//     try {
//         const feesResult = await checkFeesByPersonId(personID, customerExternalID);
//         feesArray.push(...feesResult);
       

//     } catch (error) {
//         console.error('Error fetching collection data:', error);
//     }


//     const totalAmount = collectionsArray.reduce((total, event) => total + Number(event.amount), 0);

//     const tooltipHTML = `
//     <div style="max-height: 400px; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none;">
//         <style>
//             /* For Firefox */
//             .tooltip-content::-webkit-scrollbar {
//                 display: none;
//             }
//         </style>
//         <table class="tooltip-content" style="border-collapse: collapse; font-family: 'Roboto'; font-weight: 200;">
//             <thead>
//                 <tr>
//                     <th colspan="5" style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D">
//                         <span style="color: #437361; font-size: 18px;">Collections</span>
//                     </th>
//                 </tr>

//                 <tr style="background: #fff; color: #0ee06e; font-weight: 200;">
//                 <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Guarantee</th>
//                 <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Transaction</th>
//                 <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Amount</th>
//                 <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Return</th>
//                 <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Created at</th>
//             </tr>
//             </thead>
//             <tbody>
//                 ${collectionsArray.map(event => `
//                     <tr>
//                         <td style="border: 0.5px solid #252526; padding: 5px;">
//                             <a target="_blank" style="color: ##A6A6A6; font-weight: 400;" title="This is the fee" href="https://trustly.one/admin-console/transactions/details/${event.originalTransaction}#payment" style="color: white;">
//                                 <span>${event.originalTransaction}</span>
//                             </a>     
//                         </td>
//                         <td style="border: 0.5px solid #252526; padding: 5px;">
//                             <a target="_blank" style="color: white;" title="This is the fee" href="https://trustly.one/admin-console/transactions/details/${event.transactionId}#payment" style="color: #0EA5E9;">
//                                 <span  style="color: #0ee06e; font-weight: 400;">${event.transactionId}</span>
//                             </a>     
//                         </td>
//                         <td style="border: 0.5px solid #252526; padding: 5px; font-weight: 400; color: #A6A6A6;">${event.amount}</td>
//                         <td style="border: 0.5px solid #252526; padding: 5px; font-weight: 400; color: #A6A6A6;">${event.return}</td>
//                         <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;">${event.created_at}</td>
//                     </tr>`).join('')}
//             </tbody>
//             <tfoot>
//                 <tr>
//                     <td colspan="2" style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"><strong>Total Amount:</strong></td>
//                     <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"><strong>${totalAmount}</strong></td>
//                     <td colspan="2" style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"></td>
//                 </tr>
//             </tfoot>
//         </table>
//     </div>`;



//     const totalAmountFees = feesArray.reduce((total, event) => total + Number(event.amount), 0);
//     const tooltipHTMLFees = `
//     <div style="max-height: 400px; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none;">
//         <style>
//             /* For Firefox */
//             .tooltip-content::-webkit-scrollbar {
//                 display: none;
//             }
//         </style>
//         <table class="tooltip-content" style="width: 100%; border-collapse: collapse;">
//             <thead>
//                 <tr>
//                     <th colspan="6" style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D">
//                         <span style="color: #437361; font-size: 18px;">Fees</span>
//                     </th>
//                 </tr>
//                 <tr style="background: #0C0C0D; color: #0ee06e; font-weight: 200;">
//                     <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Transaction</th>
//                     <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Trx Type</th>
//                     <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Amount</th>
//                     <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Reference</th>
//                     <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Created at</th>
//                     <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Status</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 ${feesArray.map(event => `
//                     <tr>
//                         <td style="border: 0.5px solid #252526; padding: 5px;">
//                             <a target="_blank" style="color: #A6A6A6;" title="This is the fee" href="https://trustly.one/admin-console/transactions/details/${event.transactionId}#payment" style="color: #437361;">
//                                 <span>${event.transactionId}</span>
//                             </a>    
//                         </td>
//                         <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;">${event.trxType}</td>
//                         <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;">${event.amount}</td>
//                         <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;">
//                             <a target="_blank" title="This transaction is parent of the FEE" href="https://trustly.one/admin-console/transactions?merchantReference=${event.reference}#payment" style="color: #437361;">
//                                 <span>${event.reference}</span>
//                             </a>    
//                         </td>
//                         <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;">${event.created_at}</td>
//                         <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;">${event.status}</td>
//                     </tr>`).join('')}
//             </tbody>
//             <tfoot>
//                 <tr>
//                     <td colspan="2" style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"><strong>Total Fee Amount:</strong></td>
//                     <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"><strong>${totalAmountFees}</strong></td>
//                     <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"></td>
//                     <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"></td>
//                     <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"></td>
//                 </tr>
//             </tfoot>
//         </table>
//     </div>`;

//    //<button id="copyButton" style="padding: 5px 10px; background: #0ee06e; color: #000; border: none; cursor: pointer;">Copy</button>

//     setTimeout(() => {
//         const rows = document.querySelectorAll('#fraud-analysis-result tr');
//         let foundUnauthorizedReturn = false;
//         let foundUnauthorizedReturnAmount = false;
//         //let foundKnownSince = false;
    
//         rows.forEach(row => {
//             const cells = row.querySelectorAll('td');
//             if (cells.length >= 2) {
//                 const rowZeroText = cells[0].textContent;
//                 const rowOneText = cells[1].textContent;
    
//                 if (rowZeroText === 'totalReturnCount' && rowOneText) {
//                     console.log('Returns: ', collectionsArray.length);
//                     paymentBoxUl.innerHTML += `<div style="display: flex">
//                         <li class="tooltip-trigger" style="color: red; cursor: pointer; margin-right: 5px;">Returns: ${collectionsArray.length}</li> |
//                         <li class="tooltip-trigger-fee" style="color: #448C30; cursor: pointer; margin-left: 5px;">Fees ${feesArray.length}</li>
//                     </div>`;
//                     foundUnauthorizedReturn = true;
//                 }
//                 // if (rowZeroText === 'totalReturnAmountLast90Days' && rowOneText) {
//                 //     if(Number(rowOneText) > 0) {
//                 //         console.log('Returns: ', rowOneText);
//                 //         paymentBoxUl.innerHTML += `<li class="tooltip-trigger_Removed" style="color: red;">
//                 //            ${rowOneText.length > 0 ? `<img style="width: 14px;" src="${arrowDown}" />`: ''}
//                 //             Return 90 days: $ ${rowOneText}
//                 //         </li>`;
//                 //         foundUnauthorizedReturnAmount = true;
//                 //     }
//                 // }
//                 if (rowZeroText === 'known_since' && rowOneText) {
//                     if(rowOneText) {
//                         paymentBoxUl.innerHTML += `<li>Client since: ${rowOneText}</li>`;
//                         foundKnownSince = true;
//                     }
//                 }
//                 if (rowZeroText === 'customerIdCount' && rowOneText) {
//                     if(rowOneText) {
//                         paymentBoxUl.innerHTML += `<li>
//                             Customer ID: 
//                             <span style="color: red;">(${rowOneText})</span>
//                         </li>`;
//                         //foundKnownSince = true;
//                     }
//                 }
//             }
//         });

//         loadingPaymentBox = false;
//         const loadingElement = document.getElementById('loadingPaymentBox');
//         if (loadingElement) {
//             loadingElement.remove();
//         }

//         if (!foundUnauthorizedReturn && !foundUnauthorizedReturnAmount) {
//             paymentBoxUl.innerHTML += `<li>Reversed: ${reversed}</li>`;
//         } 


//     }, 1000);
    

//     paymentBoxUl.addEventListener('click', function(event) {
//         const target = event.target;
//         if (target.tagName === 'LI' && target.classList.contains('tooltip-trigger')) {
//             if (collectionsArray.length > 0) {
//                 tooltipToastPayment(tooltipHTML, target); 
//             }
//         }
//         if (target.tagName === 'LI' && target.classList.contains('tooltip-trigger-fee')) {
//             if (feesArray.length > 0) {
//                 tooltipToastPayment(tooltipHTMLFees, target); 
//             }
//         }
//     });

//     // document.getElementById('copyButton').addEventListener('click', () => {
//     //     alert('criando')
//     //     copyToClipboard(tooltipHTMLFees);
//     // });
// }

// async function tabTransaction() {

//     const merchantReference = document.querySelector('.table tbody tr:first-child td:nth-child(7)')?.textContent;
//     const originalTransaction = document.querySelector('#transaction tbody tr:nth-child(3) td:nth-child(2) a:first-child')?.textContent;
//     const statusCode = document.querySelector('#transaction tbody tr:nth-child(16) td:nth-child(2)')?.textContent;
//     const isVip = document.querySelector('#fi-transaction tbody tr:nth-child(23) td:nth-child(2)')?.textContent;
//     const branchIconPath = chrome.runtime.getURL("images/icon.png");
//    // const teaICon = chrome.runtime.getURL("images/tea.png");
//     const visibleICon = chrome.runtime.getURL("images/visible.png");
//     const ideaIcon = chrome.runtime.getURL("images/idea.png");
    
   

//     // setTimeout(() => {
//     //     const button = document.querySelector('.panel-body .btn.btn-default:nth-child(2)');
//     //     if (button) {
//     //         button.click();
//     //     } 
//     // }, 2000);

//     // setTimeout(() => {
//     //     teaID = document.querySelector('#batchIceTea table.table tbody tr:first-child td:nth-child(2)')?.textContent;
//     // },4000)


//     const eventsTableDescription = document.querySelector('#events #sortabletable tbody');
//     const eventsTable = document.querySelector('#events #sortabletable tbody');

//     let denyDescription; 
//     let eventsTitle;
//     let returnCodeValue;
//     let liReturnCode; 
//     let eventsData

//     const matchingEvents = [];
//     let titleEvent;
//     let eventDate;

//     if (eventsTable) {
//         const rows = eventsTable.querySelectorAll('tr');

//         if (rows && rows.length > 0) {
//             rows.forEach(row => {
//                 if (row.cells && row.cells.length > 2) {
//                     eventDate = row.cells[0].textContent;
//                     titleEvent = row.cells[1].textContent;
//                     const attributesEvent = row.cells[2].textContent;
                    


//                     switch (true) {
//                         case attributesEvent?.includes('R01'):
                            
//                             eventsData = {
//                                 date: eventDate,
//                                 title: titleEvent,
//                                 status: 'R01',
//                             };
                            
//                             matchingEvents.push(eventsData);
//                             break;
//                         case attributesEvent?.includes('R02'):

                            
//                             eventsData = {
//                                 date: eventDate,
//                                 title: titleEvent,
//                                 status: 'R02',
//                             };
                            
//                             matchingEvents.push(eventsData);
//                             break;
//                         case attributesEvent?.includes('R03'):
                            
                            
//                             eventsData = {
//                                 date: eventDate,
//                                 title: titleEvent,
//                                 status: 'R03',
//                             };
                            
//                             matchingEvents.push(eventsData);
//                             break;
//                         case attributesEvent?.includes('R04'):
                            
                            
//                             eventsData = {
//                                 date: eventDate,
//                                 title: titleEvent,
//                                 status: 'R04',
//                             };
                            
//                             matchingEvents.push(eventsData);
//                             break;
//                         case attributesEvent?.includes('R05'):
                            
                            
//                             eventsData = {
//                                 date: eventDate,
//                                 title: titleEvent,
//                                 status: 'R0',
//                             };
                            
//                             matchingEvents.push(eventsData);
//                             break;
//                         case attributesEvent?.includes('R06'):
                            
                            
//                             eventsData = {
//                                 title: titleEvent,
//                                 status: 'R06',
//                             };
                            
//                             matchingEvents.push(eventsData);
//                             break;
//                         case attributesEvent?.includes('R07'):
                            
//                             eventsData = {
//                                 date: eventDate,
//                                 title: titleEvent,
//                                 status: 'R07',
//                             };
                            
//                             matchingEvents.push(eventsData);
//                             break;
//                         case attributesEvent?.includes('R08'):
                            
//                             eventsData = {
//                                 date: eventDate,
//                                 title: titleEvent,
//                                 status: 'R08',
//                             };
                            
//                             matchingEvents.push(eventsData);
//                             break;
//                         case attributesEvent?.includes('R09'):
                            
//                             eventsData = {
//                                 date: eventDate,
//                                 title: titleEvent,
//                                 status: 'R09',
//                             };
                            
//                             matchingEvents.push(eventsData);
//                             break;
//                         case attributesEvent?.includes('R10'):
                            
//                             eventsData = {
//                                 date: eventDate,
//                                 title: titleEvent,
//                                 status: 'R10',
//                             };
                            
//                             matchingEvents.push(eventsData);
//                             break;
//                         case attributesEvent?.includes('R11'):
                            
//                             eventsData = {
//                                 date: eventDate,
//                                 title: titleEvent,
//                                 status: 'R11',
//                             };
                            
//                             matchingEvents.push(eventsData);
//                             break;
//                         case attributesEvent?.includes('R16'):
                            
//                             eventsData = {
//                                 date: eventDate,
//                                 title: titleEvent,
//                                 status: 'R16',
//                             };
                            
//                             matchingEvents.push(eventsData);
//                             break;
//                         default:
                            
//                             break;
//                     }
//                 }
//             });

//             //console.log('Matching events:', matchingEvents);
//         } else {
//             console.log('No rows found in eventsTable');
//         }
//     } else {
//         console.log('No eventsTable found');
//     }

//     if (eventsTable) {
        
//         const cells = eventsTable?.querySelectorAll('td');

        
//         if (cells && cells.length > 0) {
        
//             cells.forEach(cell => {
                
//                 if (cell.textContent?.includes('returnCode')) {
                    
//                     const cellContent = cell.textContent;
//                     if (cellContent) {
//                         const startIndex = cellContent.indexOf('returnCode');
//                         if (startIndex !== -1) {
//                             returnCodeValue = cellContent
//                                 .substring(startIndex + 11)
//                                 .split('<br>')[0] 
//                                 .trim(); 
//                             liReturnCode = returnCodeValue.substring(0, 7);
//                         }
//                     }
//                 }
//             });
//         } else {
//             console.log('No cells found in eventsTable');
//         }
//     } else {
//         console.log('No eventsTable found');
//     }

  
//     if (eventsTable) {
        
//         const rows = eventsTableDescription?.querySelectorAll('tr');
    
        
//         if (rows && rows.length > 0) {
        
//             rows.forEach(row => {
        
//                 if (row.cells && row.cells.length > 2) {
        
//                     if (row.cells[1].textContent?.includes('Deny')) {
        
//                         const descriptionCellContent = row.cells[2].textContent;
//                         if (descriptionCellContent) {
//                             const startIndex = descriptionCellContent.indexOf('description');
//                             if (startIndex !== -1) {
//                                 denyDescription = descriptionCellContent
//                                     .substring(startIndex + 12) 
//                                     .split('<br>')[0] 
//                                     .trim(); 
//                                 eventsTitle = 'Deny';
//                             }
//                         }
//                     } else if (row.cells[1].textContent?.includes('Reverse')) {
                        
//                         const descriptionCellContent = row.cells[2].textContent;
//                         if (descriptionCellContent) {
//                             const startIndex = descriptionCellContent.indexOf('description');
//                             if (startIndex !== -1) {
//                                 denyDescription = descriptionCellContent
//                                     .substring(startIndex + 12) 
//                                     .split('<br>')[0] 
//                                     .trim(); 
//                                 eventsTitle = 'Reverse';
//                             }
//                         }
//                     } else {
//                         eventsTitle = null;
//                     }
//                 }
//             });
//         } else {
//             console.log('No rows found in eventsTable');
//         }
//     } else {
//         console.log('No eventsTable found');
//     }
    

//     transactionBoxUl = document.createElement('ul');
//     transactionBoxUl.style.background = 'transparent';

//     transactionBoxUl.id = 'transactionBox';


//     transactionBoxUl.innerHTML += `<h4>Transaction</h4>`
//     transactionBoxUl.innerHTML += `<li><a target="_blank" href="https://trustly.one/admin-console/transactions/?originalTransactionId=${originalTransaction}">Child Transactions</a></li>`

//     transactionBoxUl.innerHTML += `<li>
//         <a target="_blank"  href="https://trustly.one/admin-console/transactions?transactionId=&ppTransactionId=&merchantReference=${merchantReference}&originalTransactionId=&merchantId=&paymentProviderId=&paymentId=&ppTrxStatusCode=&paymentType=&transactionType=&transactionStatus=&authorizationStatus=&fingerprint=&customerName=&taxId=&mctCustomerName=&customerExternalId=&accountName=&routingNumber=&accountNumber=&iban=&minRiskIndex=&maxRiskIndex=&deviceFingerprint=&ipAddr=&description=&payproId=&excludedFromReports=&verificationFICode=&verificationRoutingNumber=&verificationAccountNumber=&verified=&verificationStatus=&minAmount=&maxAmount=&minPaid=&maxPaid=&minRefunded=&maxRefunded=&startCreateDate=&endCreateDate=&startUpdateDate=&endUpdateDate=&startProcessedDate=&endProcessedDate=&startCompletedDate=&endCompletedDate=&customerCollectionRef=&framework=&system=&countries=&excludedFromCollections=&personId=&fiCustomerId=&customerState=&reasonCode=&teaId=&externalAccId=&ppSubtypeId=&paymentProcessorId=&signature=&ppTrxInstantSettle=&metadata.SIMPLE.clc.propertyId=&metadata.SIMPLE.clc.gamingAssetNumber=&metadata.RANGE.clc.datetimeQR=&metadata.RANGE.clc.datetimeQR=&metadata.SIMPLE.clc.playerCardNumber=&startIndex=&originalStartIndex=&X-CSRFKey="> 
//             Transaction tree
//             <img style="width: 20px" src=${branchIconPath} alt="Branches Icon" />
//         </a>
//     </li>`;


   
//    const tooltipHTML = `<ul style="list-style-type: none; margin-left: -10px; padding: 3px 8px 1px 15px;"> 
//     ${matchingEvents.map(event => `<li style="padding-left: -10px;"> 
    
//         ${event.date} - ${event.title} - ${event.status}
//         </li>`).join('')}
//     </ul>`;

//     if (liReturnCode) {
//         transactionBoxUl.innerHTML += 
//         `<li class="tooltip-trigger" style="cursor: help; padding: 10px 2px 10px 3px;">
//             Return: 
//             <span style="color: red;">${liReturnCode}</span>
//             ${matchingEvents.length > 0 ? `<img style="width: 18px;" src="${visibleICon}" alt="Branches Icon" />` : ''}
//         </li>`;

//     } else {
//         transactionBoxUl.innerHTML += `
//             <li class="tooltip-trigger" style="color: #ccc; text-decoration: line-through; cursor: help; padding: 10px 2px 10px 3px;">
//                 Return: not found 
//                 ${matchingEvents.length > 0 ? `<img style="width: 18px;" src="${visibleICon}" alt="Branches Icon" />` : ''}
//             </li>`;
//     }

//     //STATUS
//     if(statusCode !== ''){
//         transactionBoxUl.innerHTML += 
//         `<li class="tooltip-statuscode-trigger" style="cursor: pointer;">
//             Status: ${statusCode}
//             <img style="width: 18px; margin-bottom: 5px;" src="${ideaIcon}" alt="Branches Icon" />
//         </li>`
//     } else {
//         transactionBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Status: not found</li>`
//     }

    
//     if(eventsTitle != null) {
//         transactionBoxUl.innerHTML += `<li style="color: red;">${eventsTitle}
//         : ${denyDescription ? 'Return: ' + denyDescription.substring(0,4) 
//         : "Could not provide"}</li>`
//     }

//     if(isVip) {
//         transactionBoxUl.innerHTML += `<li>VIP?: <span style="color: red;"> ${isVip}</span></li>`
//     } else {
//         transactionBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">VIP: <span> not found</span></li>`
//     }

//     transactionBoxUl.addEventListener('mouseover', function(event) {
//         const target = event.target;
//         if (target.tagName === 'LI' && target.classList.contains('tooltip-trigger')) {
//             if(matchingEvents.length > 0) {
//                 tooltipToast(tooltipHTML, target); // Pass tooltipHTML as HTML content
//             }
//         }
//     });

//     transactionBoxUl.addEventListener('click', function(event) {
//         const target = event.target;
//         if (target.tagName === 'LI' && target.classList.contains('tooltip-statuscode-trigger')) {
//             const statusCode = target.textContent.split(': ')[1]; // Extract status code from the list item text
            
//             if(statusCode.startsWith('SW')){
//                 const statusDetails = findStatusDetails(statusCode);
            
//                 if (statusDetails) {

//                     const message = `
//                         <div style=" max-width: 400px; font-family: 'Roboto', sans-serif; font-weight: 200; border: 1px solid #bbb; border-radius: 4px; padding: 10px;">
                            
//                             <div>
//                                 <h4>Software (SW)</h4>
//                                 <div style="width: 100%; height: 1px; background: #aaa; margin-bottom: 15px;"></div>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span style="min-width: 200px;">Category:</span>
//                                 <span style="font-weight: 400; font-size: 20px">${statusDetails.category}</span>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span style="width: 200px;">Response Code:</span> 
//                                 <span style="font-weight: 400; font-size: 20px">${statusDetails.responseCode}</span>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span>Response Description:</span> 
//                                 <span style="font-weight: 400; font-size: 20px">${statusDetails.responseDescription}</span>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span>Reason Code:</span> 
//                                 <span style="font-weight: 400; font-size: 20px">${statusDetails.reasonCode}</span>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span>Reason Description:</span> 
//                                 <span style="color: #0ee06e; font-weight: 400; font-size: 20px;">${statusDetails.reasonDescription}</span>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span>Suggested Actions:</span> 
//                                 <span style="font-weight: 400; font-size: 20px">${statusDetails.suggestedActions}</span>
//                             </div>
//                         </div>
//                     `;
//                     showToast(message, target);
//                 } else {
//                     showToast('Status details not found', target);
//                 }
//             }

//             if(statusCode.startsWith('R')) {
//                 const returnDetails = findReturnDetails(statusCode);
//                 if (returnDetails) {
//                     const message = `

//                         <div style=" max-width: 400px; font-family: 'Roboto', sans-serif; font-weight: 200; border: 1px solid #bbb; border-radius: 4px; padding: 10px;">
                            
//                             <div>
//                                 <h4>ACH Return Codes (R)</h4>
//                                 <div style="width: 100%; height: 1px; background: #aaa; margin-bottom: 15px;"></div>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span style="min-width: 200px;">Return</span>
//                                 <span style="font-weight: 400; font-size: 20px">${returnDetails.responseCode}</span>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span style="width: 200px;">Title</span> 
//                                 <span style="font-weight: 400; font-size: 18px">${returnDetails.description}</span>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span>Action:</span> 
//                                 <span style="font-weight: 400; font-size: 20px; color: #0ee06e;">${returnDetails.action}</span>
//                             </div>

                            
//                         </div>
//                     `;
//                     showToast(message, target);
//                 } else {
//                     showToast('Status details not found', target);
//                 }
//             }

//             if(statusCode.startsWith('UC')) {
//                 const returnUserCanceledCodeDetails = findUserCanceledDetailsCode(statusCode);
//                 if (returnUserCanceledCodeDetails) {
//                     const message = `

//                         <div style=" max-width: 400px; font-family: 'Roboto', sans-serif; font-weight: 200; border: 1px solid #bbb; border-radius: 4px; padding: 10px;">
                            
//                             <div>
//                                 <h4>User Canceled (UC)</h4>
//                                 <div style="width: 100%; height: 1px; background: #aaa; margin-bottom: 15px;"></div>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span style="min-width: 200px;">Status Code</span>
//                                 <span style="font-weight: 400; font-size: 20px">${returnUserCanceledCodeDetails.statuscode}</span>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span style="width: 200px;">Description</span> 
//                                 <span style="font-weight: 400; font-size: 20px">${returnUserCanceledCodeDetails.description}</span>
//                             </div>

//                         </div>
//                     `;
//                     showToast(message, target);
//                 } else {
//                     showToast('Status details not found', target);
//                 }
//             }
//             if(statusCode.startsWith('AC')) {
//                 const returnACDetails = findACDetails(statusCode);
//                 if (returnACDetails) {
//                     const message = `

//                         <div style=" max-width: 400px; font-family: 'Roboto', sans-serif; font-weight: 200; border: 1px solid #bbb; border-radius: 4px; padding: 10px;">
                            
//                             <div>
//                                 <h4>Acknowledged Communication (AC)</h4>
//                                 <div style="width: 100%; height: 1px; background: #aaa; margin-bottom: 15px;"></div>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span style="min-width: 200px;">Acknowledged Communication</span>
//                                 <span style="font-weight: 400; font-size: 20px">${returnACDetails.statusCode}</span>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span style="width: 200px;">Description</span> 
//                                 <span style="font-weight: 400; font-size: 20px">${returnACDetails.description}</span>
//                             </div>

//                         </div>
//                     `;
//                     showToast(message, target);
//                 } else {
//                     showToast('Status details not found', target);
//                 }
//             }

//             if(statusCode.startsWith('EFT')) {
//                 const returnACDetails = findEFTDeclineCodeDetails(statusCode);
//                 if (returnACDetails) {
//                     const message = `

//                         <div style=" max-width: 400px; font-family: 'Roboto', sans-serif; font-weight: 200; border: 1px solid #bbb; border-radius: 4px; padding: 10px;">
                            
//                             <div>
//                                 <h4>EFT Decline Codes - Canada</h4>
//                                 <div style="width: 100%; height: 1px; background: #aaa; margin-bottom: 15px;"></div>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span style="min-width: 200px;">Decline code</span>
//                                 <span style="font-weight: 400; font-size: 20px">${returnACDetails.statusCode}</span>
//                             </div>

//                             <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                                 <span style="width: 200px;">Description</span> 
//                                 <span style="font-weight: 400; font-size: 20px">${returnACDetails.description}</span>
//                             </div>

//                         </div>
//                     `;
//                     showToast(message, target);
//                 } else {
//                     showToast('Status details not found', target);
//                 }
//             }

//         }
//     });

// }

// function transactionTypesDetails() {
//     const tdGuarantee = document.querySelector('tbody tr.danger td:nth-child(3)');
    
//     if(tdGuarantee) {

//         tdGuarantee.style.cursor = 'pointer';

//         tdGuarantee.addEventListener('click', function(event) {
//             const transactionTypesDetails = findTransactionTypesDetails(tdGuarantee.textContent);
//             if(transactionTypesDetails) {
//                 const message = `
//                 <div style=" max-width: 400px; font-family: 'Roboto', sans-serif; font-weight: 200; border: 1px solid #bbb; border-radius: 4px; padding: 10px;">
//                     <div>
//                         <h4>Transaction Types</h4>
//                         <div style="width: 100%; height: 1px; background: #aaa; margin-bottom: 15px;"></div>
//                     </div>
//                     <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                         <span style="min-width: 200px;">Decline code</span>
//                         <span style="font-weight: 400; font-size: 20px">${transactionTypesDetails.name}</span>
//                     </div>
//                     <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
//                         <span style="width: 200px;">Description</span> 
//                         <span style="font-weight: 400; font-size: 20px">${transactionTypesDetails.description}</span>
//                     </div>
//                 </div>
//             `;
//             showToast(message, event.target);
//             }
//         });
//     }

// }







// function copyToClipboardHTML(html) {
//     const blobInput = new Blob([html], { type: 'text/html' });
//     const clipboardItem = new ClipboardItem({ 'text/html': blobInput });

//     navigator.clipboard.write([clipboardItem]).then(() => {
//         showToast('Copied to clipboard');
//     }).catch((error) => {
//         console.error('Failed to copy:', error);
//     });
// }



function checkUrlPattern() {
    const urlPath = window.location.pathname;
    if (urlPath.startsWith('/admin-console/transactions/details/')) {
        createDashboard();
    }
}

// Dashboard
async function createDashboard(){

    const divContent = document.querySelector('.col-md-12 div.tab-content');

    if (divContent) {

        chrome.storage.local.get(['paymentCheckedItems'], async (result) => {
            const paymentCheckedItems = result.paymentCheckedItems;
            const hasCheckedItems = Object.values(paymentCheckedItems).some(value => value);
            
            if (hasCheckedItems) {
                
                paymentTab();
                boxContent.append(paymentBoxUl);
            }
        });

        chrome.storage.local.get(['transactionCheckedItems'], async (result) => {
            const transactionCheckedItems = result.transactionCheckedItems;
            const hasCheckedItemsTransaction = Object.values(transactionCheckedItems).some(value => value);

            if (hasCheckedItemsTransaction) {
                //alert('tem transactionCheckedItems' + JSON.stringify(result.transactionCheckedItems.transactionTree))
                tabTransaction();
                boxContent.append(transactionBoxUl);
                
            }
        });
        
        chrome.storage.local.get(['fiTransactionCheckedItems'], async (result) => {
            const fiTransactionCheckedItems = result.fiTransactionCheckedItems;
            const hasCheckedItemsFiTransaction = Object.values(fiTransactionCheckedItems).some(value => value);

            if (hasCheckedItemsFiTransaction) {
                
                tabFiTransaction();
                boxContent.append(fiBoxUl);
                
            }
        });

        chrome.storage.local.get(['customerInfoCheckedItems'], async (result) => {
            const customerInfoCheckedItems = result.customerInfoCheckedItems;
            const hasCheckedItemsCustomerInfo = Object.values(customerInfoCheckedItems).some(value => value);

            if (hasCheckedItemsCustomerInfo) {
                
                tabAccountCustomer();
                boxContent.append(accountCustomerBoxUl);
                
            }
        });
        

        
        const boxContent = document.createElement('div'); 
        
        divContent.parentNode?.insertBefore(boxContent, divContent);

        boxContent.classList.add('boxAgentTools');

    } else {
       // console.error('Element with class "tab-content" not found.');
        return
    }
}

async function createGroup() { 
    const group = document.querySelector('.btn-group ul');
    const groupButton = document.querySelector('.btn-group #batch-select')?.textContent?.trim();

    const copySelectIcon = chrome.runtime.getURL("images/copy_selected_icon.png");
    const copyAllIcon = chrome.runtime.getURL("images/copy_all_icon.png");
    //const poaIcon = chrome.runtime.getURL("images/document.png");
    const collectionsIcon = chrome.runtime.getURL("images/collections_price.png");
    //const url = new URL(window.location.href);
    //const urlDetails = 'https://trustly.one/admin-console/transactions/details/'
    //alert(groupButton)
        if(group && groupButton == 'Action') {
            const liSelectedPtx = document.createElement('li');
            const liPtxAll = document.createElement('li');
            const liRef = document.createElement('li');
            const liMRef = document.createElement('li');
            //const liPCollections = document.createElement('li');
            const liCheckTransactions = document.createElement('li');
            //const liCreateProofOfAuthorization = document.createElement('li');

            const newLinkSelectedPtx = document.createElement('a');
            const newLinkSelectedPtxAll = document.createElement('a');
            const newLinkRef = document.createElement('a');
            const newLinkSelectedMerchantRef = document.createElement('a');


            newLinkSelectedPtx.href = '#';
            newLinkSelectedPtxAll.href = '#';
            newLinkRef.href ='#';
            newLinkSelectedMerchantRef.href ='#';

            newLinkSelectedPtx.innerHTML = `<span>
                <img style="width: 20px;" src=${copySelectIcon} />
                Selected PTX
            </span>`

            newLinkSelectedMerchantRef.innerHTML = `<span>
                <img style="width: 20px;" src=${copySelectIcon} />
                Merchant Ref.
            </span>`

            newLinkSelectedPtxAll.innerHTML = `<span>
                <img style="width: 20px;" src=${copyAllIcon} />
                All PTXs
            </span>`

            newLinkRef.innerHTML = `<span>
                <img style="width: 20px;" src=${copyAllIcon} />
                All. Merchant. Ref
            </span>`

            // liPCollections.innerHTML = `<a title="Use the Person ID" href="#" style="color: #0EA5E9;">
            //     <img style="width: 20px;" src=${collectionsIcon} />
            //     <span>Check Collections (person) </span>
            // </a>`;


            liCheckTransactions.innerHTML = `<a title="Check for transactions" href="#" style="color: #0EA5E9;">
            <img style="width: 20px;" src=${collectionsIcon} />
            <span>Check Transactions</span>
            </a>`;

            // liCreateProofOfAuthorization.innerHTML = `<a title="Check the transactions you want to generate POA" href="#" style="color: #0EA5E9;">
            // <img style="width: 20px;" src=${poaIcon} />
            // <span>Generate POA</span>
            // </a>`;


            //newLinkSelectedPtx.textContent = 'Copy Selected PTX'
            //newLinkSelectedPtxAll.textContent = 'Copy All PTXs'
            //newLinkRef.textContent = 'Copy All. M. Ref'
            //newLinkSelectedMerchantRef.textContent = 'Copy Select. M. Ref'

            newLinkSelectedPtx.addEventListener('click', function(event) {
                event.preventDefault();
                copySelectedPtxToClipboard();
            });

            newLinkSelectedPtxAll.addEventListener('click', function(event) {
                event.preventDefault();
                copyAllPtxToClipboard();  // Copy all ptxs
            });

            newLinkRef.addEventListener('click', function(event) {
                event.preventDefault();
                copyAllMerchantReferenceToClipboard();
            });

            newLinkSelectedMerchantRef.addEventListener('click', function(event) {
                event.preventDefault();
                copySelectedMerchantReferenceToClipboard();
            });


            // liPCollections.addEventListener('click', function(event) {
            //     event.preventDefault();
            //     const url = new URL(window.location.href);
            //     const params = url.searchParams;
            //     const personId = params.get('personId');

            //    // const personIdInput = document.getElementById('personId')?.textContent;

            //     if(personId !== "") {
            //         openTabInServiceWorker(personId);
            //     } else {
            //         showToast('Please search for the Person ID to use this functionality')
            //     }
            // });

            liCheckTransactions.addEventListener('click', function(event) {
                event.preventDefault();

                const transactionsArray = ['7591576972', '7708048019', '7725774224', '7748991409', '7622869674', '7749192149', '7729032079', '7749191301']


               openTabInServiceWorkerForTransactions(transactionsArray)

            });

            // liCreateProofOfAuthorization.addEventListener('click', function(event) {
            //     event.preventDefault();

            //     createProofOfAuthorization();

            // });


            liSelectedPtx.appendChild(newLinkSelectedPtx);
            liPtxAll.appendChild(newLinkSelectedPtxAll);
            liMRef.appendChild(newLinkSelectedMerchantRef);
            liRef.appendChild(newLinkRef);

            group.appendChild(liSelectedPtx);
            group.appendChild(liPtxAll);
            group.appendChild(liMRef);
            group.appendChild(liRef);
            //group.appendChild(liPCollections);
            //group.appendChild(liCheckTransactions);
            //group.appendChild(liCreateProofOfAuthorization);
        }
       
}

function copySelectedMerchantReferenceToClipboard() {
    
    const table = document.getElementById('sortabletable');

    if(table) {
    
    const selectedRows = Array.from(table.querySelectorAll('tbody tr input[type="checkbox"]:checked'));
    
    if (selectedRows.length === 0) {
        toast('No rows selected.')
    
        return;
    }

    const selectedValues = [] ;

    
    selectedRows.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const fiTrxId = row?.querySelector('.break-all')?.textContent;
        const fiOriginal = row?.querySelector('.viewOriginalTrxId-col')?.textContent;
        const transaction = row?.querySelector('td:nth-child(2)')?.textContent;
        const trType = row?.querySelector('td:nth-child(8)')?.textContent;
        const country = row?.querySelector('td:nth-child(12)')?.textContent;
        const amount = row?.querySelector('td:nth-child(17)')?.textContent;

       // const data =  fiOriginal + ' - ' + fiTrxId + ' - ' + country + ' '  + amount;
       // const dataCapture = transaction + ' - ' + fiTrxId + ' - ' + country + ' ' + amount;

        const data = `${fiOriginal}  -  ${fiTrxId}  -  ${country === 'US' ? 'USD ' : 'CAD '} ${amount}`;
        const dataCapture = `${transaction}  -  ${fiTrxId}  -  ${country === 'US' ? 'USD ' : 'CAD '} ${amount}`;

        if (trType !== 'Capture') {
            selectedValues.push(data);
        }else {
            selectedValues.push(dataCapture);
        }
    });
    
    const selectedValuesString = selectedValues.join('\n');

    
    navigator.clipboard.writeText(selectedValuesString)
        .then(() => {
            toast('Merchant Reference - Copied to clipboard'); 
        })
        .catch(error => {
            console.error('Error copying to clipboard:', error);
        });
    }
}

function copySelectedPtxToClipboard() {
    const table = document.getElementById('sortabletable');

    if(table) {
    
    const selectedRows = Array.from(table.querySelectorAll('tbody tr input[type="checkbox"]:checked'));

    if (selectedRows.length === 0) {
        toast('No rows selected.')
       
        return;
    }

    const selectedValues = [];


    selectedRows.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const fiTrxId = row?.querySelector('.viewFiTrxId-col')?.textContent;
        selectedValues.push(fiTrxId);
    });

   
    const selectedValuesString = selectedValues.join(',\n');

    
    navigator.clipboard.writeText(selectedValuesString)
        .then(() => {
            
            toast('Selected PTXs, Copied to clipboard'); 
        })
        .catch(error => {
            console.error('Error copying to clipboard:', error);
        });
    }
}

async function copyAllPtxToClipboard() {
    const table = document.getElementById('sortabletable');

    if(table) {
        const allRows = Array.from(table.querySelectorAll('tbody tr'));

    if (allRows.length === 0) {
        toast('Copying all');
        return;
    }

    // For some reason I cannot use const allFiTrxIds: string[] = [] or const allFiTrxIds = [] as string[]
    const allFiTrxIds = [];

    
    allRows.forEach(row => {
        
        const fiTrxId = row.querySelector('.viewFiTrxId-col')?.textContent;
        allFiTrxIds.push(fiTrxId);
    });

    const allFiTrxIdsString = allFiTrxIds.join(',\n');

    
    navigator.clipboard.writeText(allFiTrxIdsString)
        .then(() => {
            toast('All PTXs, copied to the clipboard'); 
        })
        .catch(error => {
            console.error('Error copying to clipboard:', error);
        });
    }
}

async function copyAllMerchantReferenceToClipboard() {
  
    const table = document.getElementById('sortabletable');

    if(table) {

  
    const breakAllTds = Array.from(table.querySelectorAll('tbody tr .break-all'));


    if (breakAllTds.length === 0) {

        console.log('No elements with class "break-all" found.');
        return;
    }


    const breakAllValues = [];


    breakAllTds.forEach(td => {

        if (td.textContent !== null) {
            breakAllValues.push(td.textContent);
        }
    });


    const breakAllValuesString = breakAllValues.join(',\n');

    navigator.clipboard.writeText(breakAllValuesString)
        .then(() => {
            
            toast('All Merchant Ref, Copied to clipboard');
        })
        .catch(error => {
            console.error('Error copying to clipboard:', error);
        });
    }
}

async function addLinkToMerchantReferenceOnTransactionsList() {
    const transactionsTable = document.querySelector('#sortabletable');
  
    if (!transactionsTable) return; 
  
    const breakAllTds = Array.from(transactionsTable.querySelectorAll('tbody tr .break-all'));
  
    breakAllTds.forEach(td => {
      td.innerHTML = `<a target="_blank" href="https://trustly.one/admin-console/transactions?merchantReference=${td.textContent}">${td.textContent}</a>`;
    });
  
    const transactionsRows = Array.from(transactionsTable.querySelectorAll('tbody tr'));
  
    transactionsRows.forEach(row => {
      const tdTransactionId = row.querySelector('td:nth-child(2) a');
  
      if(tdTransactionId instanceof HTMLElement) {
          tdTransactionId.setAttribute('target', '_blank');

        //if (tdTransactionId && tdTransactionId.href) {
          //}
      }
    });
}



// async function checkCollectionsByTransaction(personId, customerID) {
//     return new Promise((resolve, reject) => {
//         chrome.runtime.sendMessage({ action: 'checkCollectionsByTransaction', personId: personId, customerId: customerID }, (response) => {
//             if (chrome.runtime.lastError) {
//                 reject(chrome.runtime.lastError);
//             } else {
//                 const data = response.extractedData; 
//                 //toast(JSON.stringify(data));
                
//                 // data.forEach((item) => {

//                 // });

//                 resolve(data);
//             }
//         });
//     });
// }

// async function checkFeesByPersonId(personId, externalId) {
//     return new Promise((resolve, reject) => {
//         chrome.runtime.sendMessage({ action: 'checkFeesByPersonId', personId: personId, externalId: externalId }, (response) => {
//             if (chrome.runtime.lastError) {
//                 reject(chrome.runtime.lastError);
//             } else {
//                 const data = response.extractedData; 
//                 //showToast(data);
                
//                 // eslint-disable-next-line @typescript-eslint/no-unused-vars
//                 data.forEach((item) => {

//                 });

//                 resolve(data);
//             }
//         });
//     });
// }




function openTabInServiceWorkerForTransactions(transactionIds) {
    chrome.runtime.sendMessage({ action: 'extractMultiplePages', transactionIds }, (response) => {
        if (response.status === 'processing') {
            console.log('Service Worker is processing transactions...');
            
        } else if (response.extractedData && Array.isArray(response.extractedData)) {
            console.log('Extracted Data:', response.extractedData);
            
            response.extractedData.forEach((transactionData) => {
                console.log('Transaction ID:', transactionData.transactionId);
                console.log('Data:', transactionData.data);
            
            });
        } else {
            console.error('Unexpected response from service worker:', response);
            
        }
    });
    
}

function loadGoogleFont() {
  const link1 = document.createElement('link');
  link1.rel = 'preconnect';
  link1.href = 'https://fonts.googleapis.com';
  
  const link2 = document.createElement('link');
  link2.rel = 'preconnect';
  link2.href = 'https://fonts.gstatic.com';
  link2.crossOrigin = 'anonymous';
  
  const link3 = document.createElement('link');
  link3.rel = 'stylesheet';
  link3.href = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';

  const link4 = document.createElement('link');
  link3.rel = 'stylesheet';
  link3.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';
  
  document.head.appendChild(link1);
  document.head.appendChild(link2);
  document.head.appendChild(link3);
  document.head.appendChild(link4);
}

async function styleText() {
    const shortName = document.querySelector('#shortName')

    if(shortName instanceof HTMLElement) {
        shortName.style.fontSize = '18px';
        shortName.style.color = '#0ee06e';
        shortName.style.fontWeight = 'bold';
    }
}

// async function addMerchantShortNameToTheTable() {
//     const rows = document.querySelectorAll('sortabletable tr td');
    
//     rows.forEach(row => {

//     })
// }
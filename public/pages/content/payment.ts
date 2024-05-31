// async function paymentTab() {

//     const originalTransaction = document.querySelector('#transaction tbody tr:nth-child(3) td:nth-child(2) a:first-child')?.textContent;
//     const linkOriginalTransaction = document.createElement('a');
//     linkOriginalTransaction.href =  `https://trustly.one/admin-console/transactions/details/${originalTransaction}`; //urlOriginalTransaction;
//     const infoPaid = document.querySelector('#payment tbody tr:nth-child(15) td:nth-child(2)')?.textContent;
//     const refunded = document.querySelector('#payment tbody tr:nth-child(16) td:nth-child(2)')?.textContent;
//     const reversed = document.querySelector('#payment tbody tr:nth-child(17) td:nth-child(2)')?.textContent;
//     const balance = document.querySelector('#payment tbody tr:nth-child(18) td:nth-child(2)')?.textContent;
//     const customerExternalID = document.querySelector('#info .table-hover tr:nth-child(3) td:nth-child(2)')?.textContent?.trim();
//     //const pending = document.querySelector('#payment tbody tr:nth-child(19) td:nth-child(2)')?.textContent;

//     const personID = document.querySelector('#info .table-hover tr:nth-child(2) td:nth-child(2)')?.textContent;
//     const customerID = document.querySelector('#info .table-hover tr:nth-child(1) td:nth-child(2)')?.textContent;

//     const arrowDown = chrome.runtime.getURL("images/arrow_down.png");
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
//     // paymentBoxUl.innerHTML += `<li style="color: red;">Pending: ${pending}</li>`;
    
//     if (loadingPaymentBox) {
//         paymentBoxUl.innerHTML += `<li id="loadingPaymentBox" style="color: red;">
//             Loading information
//             <img style="width: 14px;" src=${loadingIcon} />
//         </li>`;
//     }

//     document.body.appendChild(paymentBoxUl); // Append paymentBoxUl to the body or desired container

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
//        // paymentBoxUl.innerHTML += `<li class="tooltip-trigger-fee" style="color: red; cursor: pointer;">Fees ${feesArray.length}</li>`;

//     } catch (error) {
//         console.error('Error fetching collection data:', error);
//     }


//     const totalAmount = collectionsArray.reduce((total, event) => total + Number(event.amount), 0);
//     const tooltipHTML = `
//     <table style="width: 100%; border-collapse: collapse;">
//         <thead>
//             <tr>
//                 <th colspan="5" style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">
//                     <span style="color: red; font-size: 18px;">Collections</span>
//                 </th>
//             </tr>
//             <tr style="background: #262626; color: #0ee06e;">
//                 <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Original</th>
//                 <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Transaction</th>
//                 <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Amount</th>
//                 <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Return</th>
//                 <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Created at</th>
//             </tr>
//         </thead>
//         <tbody>
//             ${collectionsArray.map(event => `
//                 <tr>
//                     <td style="border: 0.5px solid #555; padding: 5px;">
//                         <a target="_blank" style="color: white;" title="This is the fee" href="https://trustly.one/admin-console/transactions/details/${event.originalTransaction}#payment" style="color: white;">
//                             <span>${event.originalTransaction}</span>
//                         </a>     
//                     </td>



//                     <td style="border: 0.5px solid #555; padding: 5px;">
//                         <a target="_blank" style="color: white;" title="This is the fee" href="https://trustly.one/admin-console/transactions/details/${event.transactionId}#payment" style="color: #0EA5E9;">
//                             <span  style="color: #0EA5E9;">${event.transactionId}</span>
//                         </a>     
//                     </td>

//                     <td style="border: 0.5px solid #555; padding: 5px;">${event.amount}</td>

//                     <td style="border: 0.5px solid #555; padding: 5px;">${event.return}</td>
//                     <td style="border: 0.5px solid #555; padding: 5px;">${event.created_at}</td>
                    
//                 </tr>`).join('')}
//         </tbody>
//         <tfoot>
//             <tr>
//             <td colspan="2" style="border: 0.5px solid #555; padding: 5px;"><strong>Total Amount:</strong></td>
//             <td style="border: 0.5px solid #555; padding: 5px;"><strong>${totalAmount}</strong></td>
//             <td colspan="2" style="border: 0.5px solid #555; padding: 5px;"></td>
//             </tr>
//         </tfoot>
//     </table>`;


//     const totalAmountFees = feesArray.reduce((total, event) => total + Number(event.amount), 0);
//     const tooltipHTMLFees = `
//     <table style="width: 100%; border-collapse: collapse;">
//     <thead>
//         <tr>
//             <th colspan="6" style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">
//                 <span style="color: #0ee06e; font-size: 18px;">Fees</span>
//             </th>
//         </tr>
//         <tr style="background: #262626; color: #0ee06e;">
//             <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Transaction</th>
//             <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Trx Type</th>
//             <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Amount</th>
//             <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Reference</th>
//             <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Created at</th>
//             <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Status</th>
//         </tr>
//     </thead>
//     <tbody>
//         ${feesArray.map(event => `
//             <tr>
//                 <td style="border: 0.5px solid #555; padding: 5px;">
//                     <a target="_blank" style="color: white;" title="This is the fee" href="https://trustly.one/admin-console/transactions/details/${event.transactionId}#payment" style="color: #0EA5E9;">
//                         <span>${event.transactionId}</span>
//                     </a>    
//                 </td>
//                 <td style="border: 0.5px solid #555; padding: 5px;">${event.trxType}</td>
//                 <td style="border: 0.5px solid #555; padding: 5px;">${event.amount}</td>
//                 <td style="border: 0.5px solid #555; padding: 5px;">
//                     <a target="_blank" title="This transaction is parent of the FEE" href="https://trustly.one/admin-console/transactions?merchantReference=${event.reference}#payment" style="color: #0EA5E9;">
//                         <span>${event.reference}</span>
//                     </a>    
//                 </td>
//                 <td style="border: 0.5px solid #555; padding: 5px;">${event.created_at}</td>
//                 <td style="border: 0.5px solid #555; padding: 5px;">${event.status}</td>
//             </tr>`).join('')}
//         </tbody>
//         <tfoot>
//         <tr>
//         <td colspan="2" style="border: 0.5px solid #555; padding: 5px;"><strong>Total Fee Amount:</strong></td>
//         <td style="border: 0.5px solid #555; padding: 5px;"><strong>${totalAmountFees}</strong></td>
//         <td style="border: 0.5px solid #555; padding: 5px;"></td>
//         <td style="border: 0.5px solid #555; padding: 5px;"></td>
//         <td style="border: 0.5px solid #555; padding: 5px;">
            
//         </td>
//         </tr>
//     </tfoot>
//     </table>`;
//    //<button id="copyButton" style="padding: 5px 10px; background: #0ee06e; color: #000; border: none; cursor: pointer;">Copy</button>

//     setTimeout(() => {
//         const rows = document.querySelectorAll('#fraud-analysis-result tr');
//         let foundUnauthorizedReturn = false;
//         let foundUnauthorizedReturnAmount = false;
//         let foundKnownSince = false;
    
//         rows.forEach(row => {
//             const cells = row.querySelectorAll('td');
//             if (cells.length >= 2) {
//                 const rowZeroText = cells[0].textContent;
//                 const rowOneText = cells[1].textContent;
    
//                 if (rowZeroText === 'totalReturnCount' && rowOneText) {
//                     console.log('Returns: ', rowOneText);
//                     paymentBoxUl.innerHTML += `<div style="display: flex">
//                         <li class="tooltip-trigger" style="color: red; cursor: pointer; margin-right: 5px;">Returns: ${rowOneText}</li> |
//                         <li class="tooltip-trigger-fee" style="color: #448C30; cursor: pointer; margin-left: 5px;">Fees ${feesArray.length}</li>
//                     </div>`;
//                     foundUnauthorizedReturn = true;
//                 }
//                 if (rowZeroText === 'totalReturnAmountLast90Days' && rowOneText) {
//                     if(Number(rowOneText) > 0) {
//                         console.log('Returns: ', rowOneText);
//                         paymentBoxUl.innerHTML += `<li class="tooltip-trigger_Removed" style="color: red;">
//                            ${rowOneText.length > 0 ? `<img style="width: 14px;" src="${arrowDown}" />`: ''}
//                             Return 90 days: $ ${rowOneText}
//                         </li>`;
//                         foundUnauthorizedReturnAmount = true;
//                     }
//                 }
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
//                         foundKnownSince = true;
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
        



//     }, 5000);
    

//     paymentBoxUl.addEventListener('click', function(event) {
//         const target = event.target;
//         if (target.tagName === 'LI' && target.classList.contains('tooltip-trigger')) {
//             if (collectionsArray.length > 0) {
//                 tooltipToastPayment(tooltipHTML, target); // Pass tooltipHTML as HTML content
//             }
//         }
//         if (target.tagName === 'LI' && target.classList.contains('tooltip-trigger-fee')) {
//             if (feesArray.length > 0) {
//                 tooltipToastPayment(tooltipHTMLFees, target); // Pass tooltipHTML as HTML content
//             }
//         }
//     });

//     // document.getElementById('copyButton').addEventListener('click', () => {
//     //     alert('criando')
//     //     copyToClipboard(tooltipHTMLFees);
//     // });
// }

// paymentTab();





// Testing here












// Testing here
// async function callApiTest() {
//     try {
//         const response = await fetch('http://localhost:3333/users', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             url: 'your-url',
//             mfa: 'your-mfa',
//             refs: [['ref1', 'ref2']], // Example for refs, adjust as needed
//             user: 'your-username',
//             password: 'your-password',
//           }),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const responseData = await response.json();
//         data = responseData
//         alert(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
// }


// async function addButtonMerchantPortal() {
//     const modalFooter = document.querySelector('.modal-footer')?.textContent;
//     if(modalFooter) {
//         //alert(JSON.stringify(modalFooter));
//         //modalFooter.innerHTML = `<p>Testando essa bagaça</p>`
//     }
// }
//'https://trustly.one/admin-console/transactions?transactionId=7741566102&transactionId=7741566078&ppTransactionId=&merchantReference=&teaId=&merchantId=&paymentProviderId=&paymentId=&customerExternalId=&personId=&fingerprint=&customerName=&taxId=&mctCustomerName=&customerExternalId=&accountName=&routingNumber=&accountNumber=&iban=&minRiskIndex=&maxRiskIndex=&deviceFingerprint=&ipAddr=&description=&payproId=&excludedFromReports=&verificationFICode=&verificationRoutingNumber=&verificationAccountNumber=&verified=&verificationStatus=&minAmount=&maxAmount=&minPaid=&maxPaid=&minRefunded=&maxRefunded=&startCreateDate=&endCreateDate=&startUpdateDate=&endUpdateDate=&startProcessedDate=&endProcessedDate=&startCompletedDate=&endCompletedDate=&customerCollectionRef=&framework=&excludedFromCollections=&personId=&fiCustomerId=&customerState=&reasonCode=&teaId=&externalAccId=&ppSubtypeId=&paymentProcessorId=&signature=&orderBy=createdAt&sortOrder=desc&ppTrxInstantSettle=&metadata.SIMPLE.clc.propertyId=&metadata.SIMPLE.clc.gamingAssetNumber=&metadata.RANGE.clc.datetimeQR=&metadata.RANGE.clc.datetimeQR=&metadata.SIMPLE.clc.playerCardNumber=&startIndex=0&originalStartIndex=0&X-CSRFKey=mrbq7ikd47j9uqv311vis4atuj'
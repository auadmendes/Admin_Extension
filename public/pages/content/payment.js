/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

async function paymentTab() {

    paymentBoxUl = document.createElement('ul');
    paymentBoxUl.style.background = 'transparent';
    paymentBoxUl.id = 'paymentBox';
    paymentBoxUl.innerHTML += `<h4>Payment</h4>`;

    checkItemsChecked();

    document.body.appendChild(paymentBoxUl); 
 
}


    async function checkItemsChecked() {
        let loadingPaymentBox = true;
        const loadingIcon = chrome.runtime.getURL("images/loadingIcon.gif");
        
        
        // setTimeout(() => {
        //     const rows = document.querySelectorAll('#fraud-analysis-result tr');
        //     let foundUnauthorizedReturn = false;

        
        //     rows.forEach(row => {
        //         const cells = row.querySelectorAll('td');
        //         if (cells.length >= 2) {
        //             const rowZeroText = cells[0].textContent;
        //             const rowOneText = cells[1].textContent;
        
        //             // if (rowZeroText === 'totalReturnCount' && rowOneText) {
                        
        //             //     paymentBoxUl.innerHTML += `<div style="display: flex">
        //             //         <li class="tooltip-trigger" style="color: red; cursor: pointer; margin-right: 5px;">Returns: ${collectionsArray.length}</li> |
        //             //         <li class="tooltip-trigger-fee" style="color: #448C30; cursor: pointer; margin-left: 5px;">Fees ${feesArray.length}</li>
        //             //     </div>`;
        //             //     foundUnauthorizedReturn = true;
        //             // }

        //             // if (rowZeroText === 'known_since' && rowOneText) {
        //             //     toast('test ' + rowZeroText)
        //             //     if(rowOneText) {
        //             //         paymentBoxUl.innerHTML += `<li>Client since: ${rowOneText}</li>`;
        //             //         foundKnownSince = true;
        //             //     }
        //             // }
        //             // if (rowZeroText === 'customerIdCount' && rowOneText) {
        //             //     if(rowOneText) {
        //             //         paymentBoxUl.innerHTML += `<li>
        //             //             Customer ID: 
        //             //             <span style="color: red;">(${rowOneText})</span>
        //             //         </li>`;
        //             //         //foundKnownSince = true;
        //             //     }
        //             // }
        //         }
        //     });
    
          
    
    
        // }, 4000);

        chrome.storage.local.get(['paymentCheckedItems'], async (result) => {

            if (result.paymentCheckedItems && result.paymentCheckedItems.returnsAndFees) {
                
                const personID = document.querySelector('#info .table-hover tr:nth-child(2) td:nth-child(2)')?.textContent;
                const customerID = document.querySelector('#info .table-hover tr:nth-child(1) td:nth-child(2)')?.textContent;
                const customerExternalID = document.querySelector('#info .table-hover tr:nth-child(3) td:nth-child(2)')?.textContent?.trim();

                if (loadingPaymentBox) {
                    paymentBoxUl.innerHTML += `<li id="loadingPaymentBox" style="color: red;">
                        Loading information
                        <img style="width: 14px;" src=${loadingIcon} />
                    </li>`;
                }

                const collectionsArray = [];
                try {
                    const collectionsResult = await checkCollectionsByTransaction(personID, customerID);
                    if(collectionsResult) {
                        collectionsArray.push(...collectionsResult);
                    }
                    
                } catch (error) {
                    console.error('Error fetching collection data:', error);
                }
                const feesArray = [];

                try {
                    const feesResult = await checkFeesByPersonId(personID, customerExternalID);
                    feesArray.push(...feesResult);
                

                } catch (error) {
                    console.error('Error fetching collection data:', error);
                }

                const totalAmount = collectionsArray.reduce((total, event) => total + Number(event.amount), 0);

                const tooltipHTML = `
                <div style="max-height: 400px; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none;">
                    <style>
                        /* For Firefox */
                        .tooltip-content::-webkit-scrollbar {
                            display: none;
                        }
                    </style>
                    <table class="tooltip-content" style="border-collapse: collapse; font-family: 'Roboto'; font-weight: 200;">
                        <thead>
                            <tr>
                                <th colspan="5" style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D">
                                    <span style="color: #437361; font-size: 18px;">Collections</span>
                                </th>
                            </tr>
            
                            <tr style="background: #fff; color: #0ee06e; font-weight: 200;">
                            <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Guarantee</th>
                            <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Transaction</th>
                            <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Amount</th>
                            <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Return</th>
                            <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Created at</th>
                        </tr>
                        </thead>
                        <tbody>
                            ${collectionsArray.map(event => `
                                <tr>
                                    <td style="border: 0.5px solid #252526; padding: 5px;">
                                        <a target="_blank" style="color: ##A6A6A6; font-weight: 400;" title="This is the fee" href="https://trustly.one/admin-console/transactions/details/${event.originalTransaction}#payment" style="color: white;">
                                            <span>${event.originalTransaction}</span>
                                        </a>     
                                    </td>
                                    <td style="border: 0.5px solid #252526; padding: 5px;">
                                        <a target="_blank" style="color: white;" title="This is the fee" href="https://trustly.one/admin-console/transactions/details/${event.transactionId}#payment" style="color: #0EA5E9;">
                                            <span  style="color: #0ee06e; font-weight: 400;">${event.transactionId}</span>
                                        </a>     
                                    </td>
                                    <td style="border: 0.5px solid #252526; padding: 5px; font-weight: 400; color: #A6A6A6;">${event.amount}</td>
                                    <td style="border: 0.5px solid #252526; padding: 5px; font-weight: 400; color: #A6A6A6;">${event.return}</td>
                                    <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;">${event.created_at}</td>
                                </tr>`).join('')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"><strong>Total Amount:</strong></td>
                                <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"><strong>${totalAmount}</strong></td>
                                <td colspan="2" style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>`;
            
                const totalAmountFees = feesArray.reduce((total, event) => total + Number(event.amount), 0);
                const tooltipHTMLFees = `
                <div style="max-height: 400px; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none;">
                    <style>
                        /* For Firefox */
                        .tooltip-content::-webkit-scrollbar {
                            display: none;
                        }
                    </style>
                    <table class="tooltip-content" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th colspan="6" style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D">
                                    <span style="color: #437361; font-size: 18px;">Fees</span>
                                </th>
                            </tr>
                            <tr style="background: #0C0C0D; color: #0ee06e; font-weight: 200;">
                                <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Transaction</th>
                                <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Trx Type</th>
                                <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Amount</th>
                                <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Reference</th>
                                <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Created at</th>
                                <th style="border: 0.5px solid #252526; padding: 5px; text-align: left; background: #0C0C0D; font-size: 14px; font-weight: 200;">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${feesArray.map(event => `
                                <tr>
                                    <td style="border: 0.5px solid #252526; padding: 5px;">
                                        <a target="_blank" style="color: #A6A6A6;" title="This is the fee" href="https://trustly.one/admin-console/transactions/details/${event.transactionId}#payment" style="color: #437361;">
                                            <span>${event.transactionId}</span>
                                        </a>    
                                    </td>
                                    <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;">${event.trxType}</td>
                                    <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;">${event.amount}</td>
                                    <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;">
                                        <a target="_blank" title="This transaction is parent of the FEE" href="https://trustly.one/admin-console/transactions?merchantReference=${event.reference}#payment" style="color: #437361;">
                                            <span>${event.reference}</span>
                                        </a>    
                                    </td>
                                    <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;">${event.created_at}</td>
                                    <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;">${event.status}</td>
                                </tr>`).join('')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"><strong>Total Fee Amount:</strong></td>
                                <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"><strong>${totalAmountFees}</strong></td>
                                <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"></td>
                                <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"></td>
                                <td style="border: 0.5px solid #252526; padding: 5px; color: #A6A6A6;"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>`;
            
               //<button id="copyButton" style="padding: 5px 10px; background: #0ee06e; color: #000; border: none; cursor: pointer;">Copy</button>
               loadingPaymentBox = false;
               const loadingElement = document.getElementById('loadingPaymentBox');
               if (loadingElement) {
                   loadingElement.remove();
               }



            if(collectionsArray.length) {
                paymentBoxUl.innerHTML += `<div style="display: flex">
                    <li class="tooltip-trigger" style="color: red; cursor: pointer; margin-right: 5px;">Returns: ${collectionsArray.length}</li>
                </div>`;
            }
            if(feesArray.length) {
                paymentBoxUl.innerHTML += `<div style="display: flex">
                    <li class="tooltip-trigger-fee" style="color: #448C30; cursor: pointer;">Fees ${feesArray.length}</li>
                </div>`;
            }
                
            
                paymentBoxUl.addEventListener('click', function(event) {
                    const target = event.target;
                    if (target.tagName === 'LI' && target.classList.contains('tooltip-trigger')) {
                        if (collectionsArray.length > 0) {
                            tooltipToastPayment(tooltipHTML, target); 
                        }
                    }
                    if (target.tagName === 'LI' && target.classList.contains('tooltip-trigger-fee')) {
                        if (feesArray.length > 0) {
                            tooltipToastPayment(tooltipHTMLFees, target); 
                        }
                    }
                });
            }

            if (result.paymentCheckedItems && result.paymentCheckedItems.reversed) {
                const reversed = document.querySelector('#transaction tbody tr:nth-child(9) td:nth-child(2)')?.textContent;
                if (reversed) {
                    paymentBoxUl.innerHTML += `<li>Reversed: ${reversed}</li>`;
                } 
            }

            if (result.paymentCheckedItems && result.paymentCheckedItems.enrolled) {
                const enrolled = document.querySelector('#payment tbody tr:nth-child(32) td:nth-child(2)')?.textContent;

                if (enrolled) {
                    const enrolledDate = enrolled.split(' at ')[0];
                    paymentBoxUl.innerHTML += `<li>Enrolled: <strong>${enrolledDate}</strong></li>`;
                }
            }
            
            if (result.paymentCheckedItems && result.paymentCheckedItems.balance) {
                const balance = document.querySelector('#payment tbody tr:nth-child(18) td:nth-child(2)')?.textContent;
                 if(balance) {
                     paymentBoxUl.innerHTML += `<li>Balance: ${balance}</li>`;
                 }
            }

            if (result.paymentCheckedItems && result.paymentCheckedItems.refunded) {
                const refunded = document.querySelector('#payment tbody tr:nth-child(16) td:nth-child(2)')?.textContent;
                 if(refunded) {
                    paymentBoxUl.innerHTML += `<li>Refunded: ${refunded}</li>`;
                 }
            }

            if (result.paymentCheckedItems && result.paymentCheckedItems.paid) {
                const infoPaid = document.querySelector('#payment tbody tr:nth-child(15) td:nth-child(2)')?.textContent;
                 if(infoPaid) {
                    paymentBoxUl.innerHTML += `<li>Paid: ${infoPaid}</li>`;
                 }
            }

            if (result.paymentCheckedItems && result.paymentCheckedItems.original) {
                const originalTransaction = document.querySelector('#transaction tbody tr:nth-child(3) td:nth-child(2) a:first-child')?.textContent;
                const linkOriginalTransaction = document.createElement('a');
                linkOriginalTransaction.href =  `https://trustly.one/admin-console/transactions/details/${originalTransaction}`;

                 if(originalTransaction) {
                    paymentBoxUl.innerHTML += `<li>Original: <a href="${linkOriginalTransaction}">${originalTransaction}</a></li>`;
                 }
            }



        });
    }

    async function checkCollectionsByTransaction(personId, customerID) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ action: 'checkCollectionsByTransaction', personId: personId, customerId: customerID }, (response) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    const data = response.extractedData; 
                    //toast(JSON.stringify(data));
                    
                    // data.forEach((item) => {
    
                    // });
    
                    resolve(data);
                }
            });
        });
    }
    
    async function checkFeesByPersonId(personId, externalId) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ action: 'checkFeesByPersonId', personId: personId, externalId: externalId }, (response) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    const data = response.extractedData; 
                    //showToast(data);
                    
                    
                    data.forEach((item) => {
    
                    });
    
                    resolve(data);
                }
            });
        });
    }
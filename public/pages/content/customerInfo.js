/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */


async function tabAccountCustomer() {
    //const originalTransaction = document.querySelector('#transaction tbody tr:nth-child(3) td:nth-child(2) a:first-child')?.textContent;
    const merchantName = document.querySelector('.table tbody tr:first-child td:nth-child(6) div div:nth-child(1)')?.textContent;
    const merchantLink = document.querySelector('.table tbody tr:first-child td:nth-child(6) div ul li:nth-child(2) a');
    
    
    
    

    
    

   

    accountCustomerBoxUl = document.createElement('ul');
    accountCustomerBoxUl.style.background = 'transparent';

    accountCustomerBoxUl.id = 'customerInfoBox';
    //const personID = document.querySelector('#info .table-hover tr:nth-child(2) td:nth-child(2)')?.textContent;
    //const customerExternalID = document.querySelector('#info .table-hover tr:nth-child(3) td:nth-child(2)')?.textContent?.trim();

    accountCustomerBoxUl.innerHTML += `<h4>Customer Info (<a target="_blank" href=${merchantLink}>${merchantName?.substring(0,8)}...</a>)</h4>`;
    

    

 

  
    
    checkCustomerItemsChecked()
}

async function checkCustomerItemsChecked() {

    chrome.storage.local.get(['customerInfoCheckedItems'], async (result) => {

        
        if (result.customerInfoCheckedItems && result.customerInfoCheckedItems.customerName) {
            const customerName = document.querySelector('#info .table-hover tr:nth-child(4) td:nth-child(2)')?.textContent;

            if(customerName) {
                accountCustomerBoxUl.innerHTML += `<li>Name: ${customerName}</li>`;
            }
            
        }
        
        if (result.customerInfoCheckedItems && result.customerInfoCheckedItems.customerEmail) {
            const customerEmail = document.querySelector('#info .table-hover tr:nth-child(13) td:nth-child(2)')?.textContent;

            if(customerEmail) {
                accountCustomerBoxUl.innerHTML += `<li>Email: ${customerEmail}</li>`;
            } else {
                accountCustomerBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Email: not found</li>`;
            }
            
        }
        
        if (result.customerInfoCheckedItems && result.customerInfoCheckedItems.feesLink) {
            const personID = document.querySelector('#info .table-hover tr:nth-child(2) td:nth-child(2)')?.textContent;
            const customerExternalID = document.querySelector('#info .table-hover tr:nth-child(3) td:nth-child(2)')?.textContent?.trim();

            if(personID || customerExternalID) {
                accountCustomerBoxUl.innerHTML += `<li style="display: flex; gap: 2px;">
                <span style="color: #448C30;">Fees</span> 
                <span style="color: #BFBFBF; font-size: 13px;">(Instant):</span>
                <a style="color: #448C30" target="_blank" href="https://trustly.one/admin-console/transactions?personId=${personID}&paymentType=1"> 
                     ${personID && "<strong>Person ID</strong>"} 
                </a> | 
                <a style="color: #448C30;" target="_blank" href="https://trustly.one/admin-console/transactions?customerExternalId=${customerExternalID}&paymentType=1"> 
                     ${customerExternalID && "<strong>External ID </strong>"}
                </a>
            </li>`
            }
        
            
        }
        
        if (result.customerInfoCheckedItems && result.customerInfoCheckedItems.collectionsLink) {
            const personID = document.querySelector('#info .table-hover tr:nth-child(2) td:nth-child(2)')?.textContent;
            const customerID = document.querySelector('#info .table-hover tr:nth-child(1) td:nth-child(2)')?.textContent;

            

            if(customerID || personID) {
                accountCustomerBoxUl.innerHTML += `<li>
                Collections:
                ${customerID ? `<a target="_blank" href="https://trustly.one/admin-console/collections/index/?originalTransactionId=&transactionId=&personId=&customerId=${customerID}&customerName=&merchant=&createdAt=&statusCode=&email=&fingerprint=&inWaiting=&startIndex=0&originalStartIndex=0&X-CSRFKey=v0d4d62bdsa61u2taqa8s3fll3"> 
                ${customerID && "<strong>Customer</strong>"} 
                </a> `: ''}
        
                ${customerID && personID ? `|` : ''} 
                
                ${personID ? `<a target="_blank" href="https://trustly.one/admin-console/collections/index/?originalTransactionId=&transactionId=&personId=${personID}&customerId=&customerName=&merchant=&createdAt=&statusCode=&email=&fingerprint=&inWaiting=&startIndex=0&originalStartIndex=0&X-CSRFKey=v0d4d62bdsa61u2taqa8s3fll3"> 
                ${personID && "<strong>Person</strong>"} 
                </a>`: ''}
               </li>`
            }
        
            
        }

        
        if (result.customerInfoCheckedItems && result.customerInfoCheckedItems.transactionsLink) {
            const personID = document.querySelector('#info .table-hover tr:nth-child(2) td:nth-child(2)')?.textContent;
            const customerExternalID = document.querySelector('#info .table-hover tr:nth-child(3) td:nth-child(2)')?.textContent?.trim();

            if (customerExternalID) {
                accountCustomerBoxUl.innerHTML += `<li>
                    Transactions: 
                    ${customerExternalID ? 
                        `<a target="_blank" href="https://trustly.one/admin-console/transactions?customerExternalId=${customerExternalID}">
                            <strong>External ID</strong>
                        </a>` 
                        : ''} 
                        ${customerExternalID && personID ? `|` : ''} 
                    ${personID ? `<a target="_blank" href="https://trustly.one/admin-console/transactions?personId=${personID}">
                    <strong>Person ID</strong>
                        </a>`
                        : ''}
                    </li>`;
            }
            
        }

        
        if (result.customerInfoCheckedItems && result.customerInfoCheckedItems.teaIDLink) {
            const teaICon = chrome.runtime.getURL("images/tea.png");
            let teaIdCustomerInfo1;
            let teaIdCustomerInfo2;
            
            setTimeout(() => {
                const button = document.querySelector('.panel-body .btn.btn-default:nth-child(1)');
                const button2 = document.querySelector('.panel-body .btn.btn-default:nth-child(2)');
                
        
                if (button) {
        
                  button.click();
                  console.log('Clicked the second button');
        
                  setTimeout(() => {
                     teaIdCustomerInfo1 = document.querySelector('#batchIceTea table.table tbody tr:first-child td:nth-child(2)')?.textContent;
                     
                    console.log('Button 1111: ', teaIdCustomerInfo1);
                  }, 1000); 
        
                } else {
                  console.log('Second button not found');
                }
        
                if (button2) {
        
                    button2.click();
                    console.log('Clicked the second button');
          
                    setTimeout(() => {
                        teaIdCustomerInfo2 = document.querySelector('#batchIceTea table.table tbody tr:first-child td:nth-child(2)')?.textContent;
                       
                      console.log('Button 222222 ', teaIdCustomerInfo2);
                    }, 1000); 
          
                  } else {
                    console.log('Second button not found');
                  }
        
              }, 3000); 
           
            accountCustomerBoxUl.innerHTML += `<li class="loading" style="color: red;">Finding Tea ID...</li>`;
            setTimeout(() => {
                
                let teaIdData;
        
                const loadingLi = document.querySelector('.loading');
                if (loadingLi) {
                    loadingLi.remove();
                }
        
                if(teaIdCustomerInfo1) {
                    teaIdData = teaIdCustomerInfo1
                }
                if(teaIdCustomerInfo2) {
                    teaIdData = teaIdCustomerInfo2
                }
        
                if (teaIdData) {
                    accountCustomerBoxUl.innerHTML += `<li class="teaID">
                        
                        <a target="_bank" href="https://trustly.one/admin-console/transactions?transactionId=&ppTransactionId=&merchantReference=&originalTransactionId=&merchantId=&paymentProviderId=&paymentId=&ppTrxStatusCode=&personId=&fingerprint=&customerName=&taxId=&mctCustomerName=&customerExternalId=&accountName=&routingNumber=&accountNumber=&iban=&minRiskIndex=&maxRiskIndex=&deviceFingerprint=&ipAddr=&description=&payproId=&excludedFromReports=&verificationFICode=&verificationRoutingNumber=&verificationAccountNumber=&verified=&verificationStatus=&minAmount=&maxAmount=&minPaid=&maxPaid=&minRefunded=&maxRefunded=&startCreateDate=&endCreateDate=&startUpdateDate=&endUpdateDate=&startProcessedDate=&endProcessedDate=&startCompletedDate=&endCompletedDate=&customerCollectionRef=&framework=&excludedFromCollections=&fiCustomerId=&customerState=&reasonCode=&teaId=${teaIdData}&externalAccId=&ppSubtypeId=&paymentProcessorId=&signature=&orderBy=createdAt&sortOrder=desc&ppTrxInstantSettle=&metadata.SIMPLE.clc.propertyId=&metadata.SIMPLE.clc.gamingAssetNumber=&metadata.RANGE.clc.datetimeQR=&metadata.RANGE.clc.datetimeQR=&metadata.SIMPLE.clc.playerCardNumber=&startIndex=0&originalStartIndex=0&X-CSRFKey=ir8v69jp4bbo4fkvkde3va2035">
                            Tea ID:<strong> ${teaIdData}</strong>
                        </a>
                        <!-- <img style="width: 18px" src="${teaICon}" alt="Branches Icon" /> --!>
                    </li>`;
                } else {
                    accountCustomerBoxUl.innerHTML += `<li style="line-through;"" class="teaID">
                        Tea ID not found
                        <img style="width: 18px" src="${teaICon}" alt="Branches Icon" />
                    </li>`;
                }
        
            }, 6000);
        }


    });
}
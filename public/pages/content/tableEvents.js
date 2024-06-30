/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
function merchantDetailsOnTableTransactions() {
    chrome.storage.local.get(['checkedItems'], (result) => {
        if (result.checkedItems && result.checkedItems.merchantDetails) {
            const tdElements = document.querySelectorAll('tbody td:nth-child(14)');
            
            tdElements.forEach(td => {
                td.style.cursor = 'pointer';
                //td.style.color = '#0ee06e';
        
                const merchantLink = td.querySelector('a');
                const merchantId = merchantLink?.href.split('/').pop();
        
                td.addEventListener('mouseover', function(event) {
                    //toast(merchantId)
                    const merchantDetails = findMerchantDetails(merchantId);
                    if (merchantDetails) {
                        const message = `
                        <div style=" max-width: 400px; font-family: 'Roboto', sans-serif; font-weight: 200; border: 1px solid #bbb; border-radius: 4px; padding: 10px;">
                            <div>
                                <h4>Merchant Details</h4>
                                <div style="width: 100%; height: 1px; background: #aaa; margin-bottom: 15px;"></div>
                            </div>
                            <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                <span style="min-width: 200px;">Full Name</span>
                                <span style="font-weight: 400; font-size: 20px">${merchantDetails.merchant_name}</span>
                            </div>
                            <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                <span style="min-width: 200px;">Also know as </span>
                                <span style="font-weight: 400; font-size: 20px">${merchantDetails.dba}</span>
                            </div>
                            <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                <span style="min-width: 200px;">Reporting Name </span>
                                <span style="font-weight: 400; font-size: 20px">${merchantDetails.reporting_name}</span>
                            </div>
                            <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                <span style="width: 200px;">Short Name</span> 
                                <span style="font-weight: 400; font-size: 20px">${merchantDetails.merchant_short_name}</span>
                                ${merchantDetails.icon_url && `<img
                                style="height: 80px; width: 80px"
                                src=${merchantDetails.icon_url} 
                            />`}
                            </div>
                        </div>
                    `;
                    showToast(message, event.target);
                    }
                });
            });
        }
    });
}

// Call the function
merchantDetailsOnTableTransactions();

function transactionTypesDetails() {
    chrome.storage.local.get(['checkedItems'], (result) => {
        if (result.checkedItems && result.checkedItems.trxType) {
            
            const url = window.location.href;
            let tdElements;

            if (url.includes('/admin-console/transactions/details/')) {
                tdElements = document.querySelectorAll('tbody td:nth-child(3)');
            } else {
                tdElements = document.querySelectorAll('tbody td:nth-child(8)');
            }

            if (tdElements) {
                //toast('os elements estão okayyyyy')
                tdElements.forEach(td => {
                    td.style.cursor = 'pointer';

                    td.addEventListener('click', function(event) {
                        const transactionTypesDetails = findTransactionTypesDetails(td.textContent);
                        if (transactionTypesDetails) {
                            const message = `
                                <div style="max-width: 400px; font-family: 'Roboto', sans-serif; font-weight: 200; border: 1px solid #bbb; border-radius: 4px; padding: 10px;">
                                    <div>
                                        <h4>Transaction Types</h4>
                                        <div style="width: 100%; height: 1px; background: #aaa; margin-bottom: 15px;"></div>
                                    </div>
                                    <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                        <span style="min-width: 200px;">Decline code</span>
                                        <span style="font-weight: 400; font-size: 20px">${transactionTypesDetails.name}</span>
                                    </div>
                                    <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                        <span style="width: 200px;">Description</span> 
                                        <span style="font-weight: 400; font-size: 20px">${transactionTypesDetails.description}</span>
                                    </div>
                                </div>
                            `;
                            showToast(message, event.target);
                        }
                    });
                });
            }
        }
    });
}

transactionTypesDetails();

async function giveCollectionsTableOriginalTransactionLink() {
    
    const transactionsTable = document.querySelector('#ab-table');
    // tdElements.forEach(td => {
    //     alert(td.textContent)
    // })

    if (!transactionsTable) return; 
  
    const originalTransactions = Array.from(transactionsTable.querySelectorAll('tbody tr td:nth-child(2)'));
  
    originalTransactions.forEach(td => {
      td.innerHTML = `<a target="_blank" href="https://trustly.one/admin-console/transactions/details/${td.textContent}#payment">${td.textContent}</a>`;
    });
  
    
    const transactionsRows = Array.from(transactionsTable.querySelectorAll('tbody tr'));
  
    transactionsRows.forEach(row => {
      const tdTransactionId = row.querySelector('td:nth-child(2) a');
  
      if(tdTransactionId instanceof HTMLElement) {
          tdTransactionId.setAttribute('target', '_blank');
      }
    });
}


async function giveCollectionsTablePersonCustomerIdLink() {
    const transactionsTable = document.querySelector('#ab-table');

    if (!transactionsTable) return;

    const originalTransactions = Array.from(transactionsTable.querySelectorAll('tbody tr td:nth-child(4)'));

    originalTransactions.forEach(td => {
        const span = td.querySelector('span.label.label-default');
        if (span && span.textContent.trim() === 'P') {
            const transactionId = td.childNodes[0].textContent.trim(); 
            td.innerHTML = `<a target="_blank" href="https://trustly.one/admin-console/transactions?personId=${transactionId}">${transactionId}</a>`;
        }
    });

    // https://trustly.one/admin-console/transactions?personId=10470845704

    const transactionsRows = Array.from(transactionsTable.querySelectorAll('tbody tr'));

    transactionsRows.forEach(row => {
        const tdTransactionId = row.querySelector('td:nth-child(4) a');

        if (tdTransactionId instanceof HTMLElement) {
            tdTransactionId.setAttribute('target', '_blank');
        }
    });
}

giveCollectionsTablePersonCustomerIdLink();
giveCollectionsTableOriginalTransactionLink();
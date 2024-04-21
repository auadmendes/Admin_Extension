

let transactionBoxUl;
let paymentBoxUl;
let fiBoxUl;
let accountCustomerBoxUl;
let teaID;

async function init() {
    createGroup();
    changeLogo();
    rearrangeInputs();
    creatingTheBoxInfo();
    someAllAmountsOnThePage();
    
    //testing adding button to merchant Portal to download the table / the extension already does that in the pop up
    //addButtonMerchantPortal();
   // callApiTest();
    // const cookies = document.cookie.split(';');
    // let authCookieValue = '';

    // for (const cookie of cookies) {
    //     const [name, value] = cookie.trim().split('=');
    //     // console.log(name, ' -----------------')
    //     // console.log(cookies, '  ++++++++++++++++++++')
    //     if (name === 'auth') {
    //       authCookieValue = value;
    //       break; // Exit the loop if the 'auth' cookie is found
    //     }

    //   }

    //   console.log(authCookieValue)

}

init();


function showToast(message) {
    
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;

    
    document.body.appendChild(toast);

    
    void toast.offsetWidth;

    // Show the toast
    toast.style.opacity = "1";

    // Remove after seconds
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.remove();
        }, 500); 
    }, 2000); 
}

async function rearrangeInputs() {
    const inputStatus = document.querySelector('#frmTransactions div:nth-child(13)');
    const inputPerson = document.querySelector('#hidden-filters div:nth-child(43)');

    if(inputPerson && inputStatus) {
        inputStatus.replaceWith(inputPerson);
    }

}

async function paymentTab() {

    const originalTransaction = document.querySelector('#transaction tbody tr:nth-child(3) td:nth-child(2) a:first-child')?.textContent;
    const linkOriginalTransaction = document.createElement('a');
    linkOriginalTransaction.href =  `https://trustly.one/admin-console/transactions/details/${originalTransaction}`; //urlOriginalTransaction;
    const infoPaid = document.querySelector('#payment tbody tr:nth-child(15) td:nth-child(2)')?.textContent;
    const refunded = document.querySelector('#payment tbody tr:nth-child(16) td:nth-child(2)')?.textContent;
    const reversed = document.querySelector('#payment tbody tr:nth-child(17) td:nth-child(2)')?.textContent;
    const balance = document.querySelector('#payment tbody tr:nth-child(18) td:nth-child(2)')?.textContent;
    const pending = document.querySelector('#payment tbody tr:nth-child(19) td:nth-child(2)')?.textContent;

    paymentBoxUl = document.createElement('ul');
    paymentBoxUl.id = 'paymentBox';

    paymentBoxUl.innerHTML += `<h4>Payment</h4>`;
    paymentBoxUl.innerHTML += `<li>Original: <a href="${linkOriginalTransaction}">${originalTransaction}</a></li>`;
    paymentBoxUl.innerHTML += `<li>Paid: ${infoPaid}</li>`;
    paymentBoxUl.innerHTML += `<li>Refunded: ${refunded}</li>`;
    paymentBoxUl.innerHTML += `<li>Reversed: ${reversed}</li>`;
    paymentBoxUl.innerHTML += `<li>Balance: ${balance}</li>`;
    paymentBoxUl.innerHTML += `<li style="color: red;">Pending: ${pending}</li>`;

    //creatingTheBoxInfo();
}

// async function someAllAmountsOnThePage() {

//     const originalTransaction = document.querySelector('#sortabletable tbody tr:nth-child(3) td:nth-child(17)')?.textContent;
//     const linkOriginalTransaction = document.createElement('a');
//     linkOriginalTransaction.href =  `https://trustly.one/admin-console/transactions/details/${originalTransaction}`; //urlOriginalTransaction;
//     const infoPaid = document.querySelector('#payment tbody tr:nth-child(15) td:nth-child(2)')?.textContent;
//     const refunded = document.querySelector('#payment tbody tr:nth-child(16) td:nth-child(2)')?.textContent;
//     const reversed = document.querySelector('#payment tbody tr:nth-child(17) td:nth-child(2)')?.textContent;
//     const balance = document.querySelector('#payment tbody tr:nth-child(18) td:nth-child(2)')?.textContent;
//     const pending = document.querySelector('#payment tbody tr:nth-child(19) td:nth-child(2)')?.textContent;

//     paymentBoxUl = document.createElement('div');
//     paymentBoxUl.id = 'someAllAmount';

//     paymentBoxUl.innerHTML += `<h4>Payment</h4>`;
//     paymentBoxUl.innerHTML += `<li>Original: <a href="${linkOriginalTransaction}">${originalTransaction}</a></li>`;
    
// }

async function someAllAmountsOnThePage() {
    const rows = document.querySelectorAll('#sortabletable tbody tr');
    let totalAmount = 0;
    let amount;
    rows.forEach(row => {
        const amountText = row.querySelector('td:nth-child(17)')?.textContent?.trim();
        if(amountText !== undefined) {
             amount = parseFloat(amountText.replace(/[^0-9.-]+/g, ''));
        }
        if (!isNaN(amount)) {
            totalAmount += amount;
        }
    });

    const resetButton  = document.querySelector('#reset-search');

    if (resetButton) {

        // resetButton.style.backgroundColor = '#105FA6';
        resetButton.style.color = '#fff';
        resetButton.style.borderRadius = '4px';
        //resetButton.style.marginTop = '5px';
        resetButton.classList.add('btn', 'btn-primary');
        const newDiv = document.createElement('div');
        
        
        newDiv.style.display = 'inline-block';
        newDiv.style.alignItems = 'center';
        newDiv.style.justifyContent = 'center';
        newDiv.style.background = '#d9ecd3';
        newDiv.style.padding = '7px 10px 8px 10px';
        //newDiv.style.paddingBottom = '10px';
        newDiv.style.marginLeft = '5px';
        newDiv.style.borderRadius = '4px';
        newDiv.style.marginTop = '5px';


        newDiv.innerHTML = `<span style="color: #025939;"> Total amount:
            <span style="color: #012340;">
            $${totalAmount.toFixed(2)}
            </span>
        </span>`


        resetButton.insertAdjacentElement('afterend', newDiv);
    }


        //console.log('Total Amount:', totalAmount.toFixed(2));
}

async function tabTransaction() {

   
    const merchantReference = document.querySelector('.table tbody tr:first-child td:nth-child(7)')?.textContent;
    const originalTransaction = document.querySelector('#transaction tbody tr:nth-child(3) td:nth-child(2) a:first-child')?.textContent;
    const statusCode = document.querySelector('#transaction tbody tr:nth-child(16) td:nth-child(2)')?.textContent;
    const isVip = document.querySelector('#fi-transaction tbody tr:nth-child(23) td:nth-child(2)')?.textContent;

    const branchIconPath = chrome.runtime.getURL("images/icon.png");
    const teaICon = chrome.runtime.getURL("images/tea.png");

    setTimeout(() => {
        const button = document.querySelector('.panel-body .btn.btn-default:nth-child(2)');
        if (button) {
            button.click();
        } 
    }, 2000);

    setTimeout(() => {
        teaID = document.querySelector('#batchIceTea table.table tbody tr:first-child td:nth-child(2)')?.textContent;
    },4000)


    const eventsTableDescription = document.querySelector('#events #sortabletable tbody');
    const eventsTable = document.querySelector('#events #sortabletable tbody');
    let denyDescription; 
    let eventsTitle;
    let returnCodeValue;
    let liReturnCode; 

    // Check if the table exists
    if (eventsTable) {
        // Get all td elements in the table body
        const cells = eventsTable?.querySelectorAll('td');

        // Check if cells exist and the length is greater than 0
        if (cells && cells.length > 0) {
            // Loop through each td
            cells.forEach(cell => {
                // Check if the cell contains "returnCode"
                if (cell.textContent?.includes('returnCode')) {
                    // Access the "returnCode" value, trim it, and remove <br> tags
                    const cellContent = cell.textContent;
                    if (cellContent) {
                        const startIndex = cellContent.indexOf('returnCode');
                        if (startIndex !== -1) {
                            returnCodeValue = cellContent
                                .substring(startIndex + 11) // Starting index after 'returnCode:'
                                .split('<br>')[0] // Take the content until the first <br>
                                .trim(); // Trim leading and trailing spaces
                            liReturnCode = returnCodeValue.substring(0, 4);
                        }
                    }
                }
            });
        } else {
            console.log('No cells found in eventsTable');
        }
    } else {
        console.log('No eventsTable found');
    }

    
    // Check if the table exists
    if (eventsTable) {
        // Get all rows (tr) in the table body
        const rows = eventsTableDescription?.querySelectorAll('tr');
    
        // Check if rows exist and the length is greater than 0
        if (rows && rows.length > 0) {
            // Loop through each row
            rows.forEach(row => {
                // Check if the cells exist and the length is greater than 2
                if (row.cells && row.cells.length > 2) {
                    // Check if the row contains "Deny" in the second cell (index 1)
                    if (row.cells[1].textContent?.includes('Deny')) {
                        // Access the description value from the third cell (index 2)
                        const descriptionCellContent = row.cells[2].textContent;
                        if (descriptionCellContent) {
                            const startIndex = descriptionCellContent.indexOf('description');
                            if (startIndex !== -1) {
                                denyDescription = descriptionCellContent
                                    .substring(startIndex + 12) // Starting index after 'description:'
                                    .split('<br>')[0] // Take the content until the first <br>
                                    .trim(); // Trim leading and trailing spaces
                                eventsTitle = 'Deny';
                            }
                        }
                    } else if (row.cells[1].textContent?.includes('Reverse')) {
                        // Access the description value from the third cell (index 2)
                        const descriptionCellContent = row.cells[2].textContent;
                        if (descriptionCellContent) {
                            const startIndex = descriptionCellContent.indexOf('description');
                            if (startIndex !== -1) {
                                denyDescription = descriptionCellContent
                                    .substring(startIndex + 12) // Starting index after 'description:'
                                    .split('<br>')[0] // Take the content until the first <br>
                                    .trim(); // Trim leading and trailing spaces
                                eventsTitle = 'Reverse';
                            }
                        }
                    } else {
                        eventsTitle = null;
                    }
                }
            });
        } else {
            console.log('No rows found in eventsTable');
        }
    } else {
        console.log('No eventsTable found');
    }
    

    transactionBoxUl = document.createElement('ul');
    transactionBoxUl.id = 'transactionBox';


    transactionBoxUl.innerHTML += `<h4>Transaction</h4>`
    transactionBoxUl.innerHTML += `<li><a target="_blank" href="https://trustly.one/admin-console/transactions/?originalTransactionId=${originalTransaction}">Child Transactions</a></li>`

    transactionBoxUl.innerHTML += `<li>
        <a target="_blank"  href="https://trustly.one/admin-console/transactions?transactionId=&ppTransactionId=&merchantReference=${merchantReference}&originalTransactionId=&merchantId=&paymentProviderId=&paymentId=&ppTrxStatusCode=&paymentType=&transactionType=&transactionStatus=&authorizationStatus=&fingerprint=&customerName=&taxId=&mctCustomerName=&customerExternalId=&accountName=&routingNumber=&accountNumber=&iban=&minRiskIndex=&maxRiskIndex=&deviceFingerprint=&ipAddr=&description=&payproId=&excludedFromReports=&verificationFICode=&verificationRoutingNumber=&verificationAccountNumber=&verified=&verificationStatus=&minAmount=&maxAmount=&minPaid=&maxPaid=&minRefunded=&maxRefunded=&startCreateDate=&endCreateDate=&startUpdateDate=&endUpdateDate=&startProcessedDate=&endProcessedDate=&startCompletedDate=&endCompletedDate=&customerCollectionRef=&framework=&system=&countries=&excludedFromCollections=&personId=&fiCustomerId=&customerState=&reasonCode=&teaId=&externalAccId=&ppSubtypeId=&paymentProcessorId=&signature=&ppTrxInstantSettle=&metadata.SIMPLE.clc.propertyId=&metadata.SIMPLE.clc.gamingAssetNumber=&metadata.RANGE.clc.datetimeQR=&metadata.RANGE.clc.datetimeQR=&metadata.SIMPLE.clc.playerCardNumber=&startIndex=&originalStartIndex=&X-CSRFKey="> 
            Transaction tree
            <img style="width: 20px" src=${branchIconPath} alt="Branches Icon" />
        </a>
    </li>`;

    setTimeout(() => {
        if(teaID) {
            transactionBoxUl.innerHTML += `<li class="teaID">
            <a target="_bank"  href="https://trustly.one/admin-console/transactions?transactionId=&ppTransactionId=&merchantReference=&originalTransactionId=&merchantId=&paymentProviderId=&paymentId=&ppTrxStatusCode=&personId=&fingerprint=&customerName=&taxId=&mctCustomerName=&customerExternalId=&accountName=&routingNumber=&accountNumber=&iban=&minRiskIndex=&maxRiskIndex=&deviceFingerprint=&ipAddr=&description=&payproId=&excludedFromReports=&verificationFICode=&verificationRoutingNumber=&verificationAccountNumber=&verified=&verificationStatus=&minAmount=&maxAmount=&minPaid=&maxPaid=&minRefunded=&maxRefunded=&startCreateDate=&endCreateDate=&startUpdateDate=&endUpdateDate=&startProcessedDate=&endProcessedDate=&startCompletedDate=&endCompletedDate=&customerCollectionRef=&framework=&excludedFromCollections=&fiCustomerId=&customerState=&reasonCode=&teaId=${teaID}&externalAccId=&ppSubtypeId=&paymentProcessorId=&signature=&orderBy=createdAt&sortOrder=desc&ppTrxInstantSettle=&metadata.SIMPLE.clc.propertyId=&metadata.SIMPLE.clc.gamingAssetNumber=&metadata.RANGE.clc.datetimeQR=&metadata.RANGE.clc.datetimeQR=&metadata.SIMPLE.clc.playerCardNumber=&startIndex=0&originalStartIndex=0&X-CSRFKey=ir8v69jp4bbo4fkvkde3va2035">
                Tea ID: ${teaID} 
            </a>
            <img style="width: 18px" src=${teaICon} alt="Branches Icon" />
        </li>`
        } else {
            transactionBoxUl.innerHTML += `<li class="teaID">
            Tea ID not found
            <img style="width: 18px" src=${teaICon} alt="Branches Icon" />
        </li>`
        }
    },4000)

    //////////////////////////////////////////////
    
    transactionBoxUl.innerHTML += `<li>Status: ${statusCode}</li>`
    transactionBoxUl.innerHTML += `<li style="color: red;">Return: ${liReturnCode ? liReturnCode : "no"}</li>`
    if(eventsTitle != null) {
        transactionBoxUl.innerHTML += `<li style="color: red;">${eventsTitle}: ${denyDescription ? 'Return: ' + denyDescription.substring(0,4) : "Could not provide"}</li>`
    }
    transactionBoxUl.innerHTML += `<li>VIP?: <span style="color: red;"> ${isVip ? isVip : "no data"}</span></li>`

}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
    .then(() => {
        showToast(`Copied to clipboard`);
    })
    .catch((error) => {
        console.error('Failed to copy:', error);
    });
}

async function tabFiTransaction() {
    
    const achProcessor = document.querySelector('#fi-transaction tbody tr:nth-child(3) td:nth-child(2)')?.textContent;
    const routing = document.querySelector('#fi-transaction tbody tr:nth-child(10) td:nth-child(2)')?.textContent;
    const account = document.querySelector('#fi-transaction tbody tr:nth-child(11) td:nth-child(2)')?.textContent;
    const virtualAccount = document.querySelector('#fi-transaction tbody tr:nth-child(13) td:nth-child(2)')?.textContent;
    const expectToComplete = document.querySelector('#fi-transaction tbody tr:nth-child(19) td:nth-child(2)')?.textContent;
    const isGuaranteed = document.querySelector('#fi-transaction tbody tr:nth-child(21) td:nth-child(2)')?.textContent;
    const linkElement = document.querySelector('#fi-transaction tbody tr:nth-child(1) td:nth-child(2) a');
    const fiTransactionId = linkElement?.textContent?.trim();
    
    

    let message;
    //let expectedDate;

    fiBoxUl = document.createElement('ul');
    fiBoxUl.id = 'FIBox';
    let expectedDate;
    if(expectToComplete) {
        expectedDate = new Date(expectToComplete);
    }
    const currentDate = new Date();

    
    const timeDifference = expectedDate.getTime() - currentDate.getTime();

    //Calculate the difference in days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference -1 > 0) {

        message = `Expect to complete: <strong style="color: red;">${daysDifference}</strong>`; 
    } else if (daysDifference -1 === 0) {
        // Expected completion is today
        console.log('A diferença é igual a zero');
        message = "Completed today";
    } else {
        
        const daysAgo = Math.abs(daysDifference);
        message = `Completed ${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
    }

    

    fiBoxUl.innerHTML += `<h4>FI Transaction</h4>`;
    fiBoxUl.innerHTML += `<li>Payment: ${achProcessor}</li>`;
    
    fiBoxUl.innerHTML += `<li>Routing: ${routing?.trim().substring(0,9)}</li>`
    fiBoxUl.innerHTML += `<li>Account: ${account?.trim().substring(0,12)}</li>`;
    fiBoxUl.innerHTML += `<li>Virtual account: ${virtualAccount ? virtualAccount : "no data"}</li>`
    fiBoxUl.innerHTML += `<li>Guaranteed?: <span style="color: red;"> ${isGuaranteed ? isGuaranteed : "no data"}</span></li>`
    //fiBoxUl.innerHTML += `<li>Fi Trx ID: <span onClick="navigator.clipboard.writeText('${fiTransactionId}')" style="color: red; cursor: pointer;">${fiTransactionId}</span></li>`;
    fiBoxUl.innerHTML += `<li>Fi Trx ID: <span class="copyable" style="color: red; cursor: pointer;">${fiTransactionId}</span></li>`;


    fiBoxUl.innerHTML += `<li>
    Expect to complete: 
        <span style="color: red;">
        ${expectToComplete ? expectToComplete : "no data"}
        </span>
        <p>${expectToComplete ? message : ""}</p>
    </li>`


    fiBoxUl.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'SPAN' && target.classList.contains('copyable')) {
            const fiTransactionId = target.textContent.trim();
            copyToClipboard(fiTransactionId);
        }
    });

    
}

async function tabAccountCustomer() {
    const originalTransaction = document.querySelector('#transaction tbody tr:nth-child(3) td:nth-child(2) a:first-child')?.textContent;
    const merchantName = document.querySelector('.table tbody tr:first-child td:nth-child(6) div div:nth-child(1)')?.textContent;
    const merchantLink = document.querySelector('.table tbody tr:first-child td:nth-child(6) div ul li:nth-child(2) a');
    const customerName = document.querySelector('#info .table-hover tr:nth-child(4) td:nth-child(2)')?.textContent;
    const customerEmail = document.querySelector('#info .table-hover tr:nth-child(13) td:nth-child(2)')?.textContent;
    const personID = document.querySelector('#info .table-hover tr:nth-child(2) td:nth-child(2)')?.textContent;
    const customerID = document.querySelector('#info .table-hover tr:nth-child(1) td:nth-child(2)')?.textContent;
    const customerExternalID = document.querySelector('#info .table-hover tr:nth-child(3) td:nth-child(2)')?.textContent?.trim();

    accountCustomerBoxUl = document.createElement('ul');
    accountCustomerBoxUl.id = 'customerInfoBox';


    accountCustomerBoxUl.innerHTML += `<h4>Customer Info (<a target="_blank" href=${merchantLink}>${merchantName?.substring(0,8)}...</a>)</h4>`;
    accountCustomerBoxUl.innerHTML += `<li>Name: ${customerName}</li>`;
    accountCustomerBoxUl.innerHTML += `<li>Email: ${customerEmail}</li>`;
    //customerInfoBox.innerHTML += `<li><a target="_blank" href="https://trustly.one/admin-console/transactions?personId=${personID}">Person ID: ${personID}</a></li>`;
    
    if(personID) {
        accountCustomerBoxUl.innerHTML += `<li>
        <a target="_blank" href="https://trustly.one/admin-console/collections/index/?originalTransactionId=${originalTransaction}"> 
            Collections <strong>Via Original: </strong> ${originalTransaction}
        </a>
    </li>`
    }

    if(customerID) {
        accountCustomerBoxUl.innerHTML += `<li>
        <a target="_blank" href="https://trustly.one/admin-console/collections/index/?originalTransactionId=&transactionId=&personId=&customerId=${customerID}&customerName=&merchant=&createdAt=&statusCode=&email=&fingerprint=&inWaiting=&startIndex=0&originalStartIndex=0&X-CSRFKey=v0d4d62bdsa61u2taqa8s3fll3"> 
            Collections <strong>Customer ID: </strong> ${customerID}
        </a>
       </li>`
    }

   if(personID) {
    accountCustomerBoxUl.innerHTML += `<li>
        <a target="_blank" href="https://trustly.one/admin-console/collections/index/?originalTransactionId=&transactionId=&personId=${personID}&customerId=&customerName=&merchant=&createdAt=&statusCode=&email=&fingerprint=&inWaiting=&startIndex=0&originalStartIndex=0&X-CSRFKey=v0d4d62bdsa61u2taqa8s3fll3"> 
            Collections <strong>Person ID: </strong> ${personID}
        </a>
   </li>`
   }
//https://trustly.one/admin-console/transactions?transactionId=&ppTransactionId=&merchantReference=&originalTransactionId=&merchantId=&paymentProviderId=&paymentId=&ppTrxStatusCode=&personId=&fingerprint=&customerName=&taxId=&mctCustomerName=&customerExternalId=31840931&accountName=&routingNumber=&accountNumber=&iban=&minRiskIndex=&maxRiskIndex=&deviceFingerprint=&ipAddr=&description=&payproId=&excludedFromReports=&verificationFICode=&verificationRoutingNumber=&verificationAccountNumber=&verified=&verificationStatus=&minAmount=&maxAmount=&minPaid=&maxPaid=&minRefunded=&maxRefunded=&startCreateDate=&endCreateDate=&startUpdateDate=&endUpdateDate=&startProcessedDate=&endProcessedDate=&startCompletedDate=&endCompletedDate=&customerCollectionRef=&framework=&excludedFromCollections=&fiCustomerId=&customerState=&reasonCode=&teaId=&externalAccId=&ppSubtypeId=&paymentProcessorId=&signature=&orderBy=createdAt&sortOrder=desc&ppTrxInstantSettle=&metadata.SIMPLE.clc.propertyId=&metadata.SIMPLE.clc.gamingAssetNumber=&metadata.RANGE.clc.datetimeQR=&metadata.RANGE.clc.datetimeQR=&metadata.SIMPLE.clc.playerCardNumber=&startIndex=0&originalStartIndex=0&X-CSRFKey=g6588nite5toevjploo2rubdsj

   if(customerExternalID) {
    accountCustomerBoxUl.innerHTML += `<li>
        <a target="_blank" href="https://trustly.one/admin-console/transactions?customerExternalId=${customerExternalID}"> 
            External ID:  ${customerExternalID}
        </a>
   </li>`
}

}


async function creatingTheBoxInfo(){

    const divContent = document.querySelector('.col-md-12 div.tab-content');

    if (divContent) { 
        paymentTab();
        tabTransaction();
        tabFiTransaction();
        tabAccountCustomer();

        const boxContent = document.createElement('div');
        divContent.parentNode?.insertBefore(boxContent, divContent);

        boxContent.classList.add('boxAgentTools');



        boxContent.append(paymentBoxUl);
        boxContent.append(transactionBoxUl);
        boxContent.append(fiBoxUl);
        boxContent.append(accountCustomerBoxUl);

    } else {
       // console.error('Element with class "tab-content" not found.');
        return
    }
}

async function createGroup() {
    const group = document.querySelector('.btn-group ul');

        if(group) {
            const liSelectedPtx = document.createElement('li');
            const liPtxAll = document.createElement('li');
            const liRef = document.createElement('li');
            const liMRef = document.createElement('li');

            const newLinkSelectedPtx = document.createElement('a');
            const newLinkSelectedPtxAll = document.createElement('a');
            const newLinkRef = document.createElement('a');
            const newLinkSelectedMerchantRef = document.createElement('a');


            newLinkSelectedPtx.href = '#';
            newLinkSelectedPtxAll.href = '#';
            newLinkRef.href ='#';
            newLinkSelectedMerchantRef.href ='#';

            newLinkSelectedPtx.textContent = 'Copy Selected PTX'
            newLinkSelectedPtxAll.textContent = 'Copy All PTXs'
            newLinkRef.textContent = 'Copy All. M. Ref'
            newLinkSelectedMerchantRef.textContent = 'Copy Select. M. Ref'

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

            liSelectedPtx.appendChild(newLinkSelectedPtx);
            liPtxAll.appendChild(newLinkSelectedPtxAll);
            liRef.appendChild(newLinkRef);
            liMRef.appendChild(newLinkSelectedMerchantRef);

            group.appendChild(liSelectedPtx);
            group.appendChild(liPtxAll);
            group.appendChild(liRef);
            group.appendChild(liMRef);
        }
       
}

function copySelectedMerchantReferenceToClipboard() {
    
    const table = document.getElementById('sortabletable');

    if(table) {
    
    const selectedRows = Array.from(table.querySelectorAll('tbody tr input[type="checkbox"]:checked'));
    
    if (selectedRows.length === 0) {
        showToast('No rows selected.')
    
        return;
    }

    const selectedValues = [] ;

    
    selectedRows.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const fiTrxId = row?.querySelector('.break-all')?.textContent;
        if (fiTrxId !== null && fiTrxId !== undefined && fiTrxId !== '') {
            selectedValues.push(fiTrxId);
        }
    });
    
    const selectedValuesString = selectedValues.join(',\n');

    
    navigator.clipboard.writeText(selectedValuesString)
        .then(() => {
            //console.log('Selected values copied to the clipboard:', selectedValuesString);
            showToast('Merchant Reference - Copied to clipboard'); 
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
        showToast('No rows selected.')
        //console.log('No rows selected.');
        return;
    }

    const selectedValues = [];

    // Iterate through each selected row
    selectedRows.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const fiTrxId = row?.querySelector('.viewFiTrxId-col')?.textContent;
        selectedValues.push(fiTrxId);
    });

    // Join the selected values with commas and newline characters
    const selectedValuesString = selectedValues.join(',\n');

    // Copy the selected values to the clipboard
    navigator.clipboard.writeText(selectedValuesString)
        .then(() => {
            //console.log('Selected values copied to the clipboard:', selectedValuesString);
            showToast('Copied to clipboard'); // Display a toast notification
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
        showToast('Copying all');
        return;
    }

    // For some reason I cannot use const allFiTrxIds: string[] = [] or const allFiTrxIds = [] as string[]
    const allFiTrxIds = [];

    
    allRows.forEach(row => {
        // Get the .viewFiTrxId-col value for each row
        const fiTrxId = row.querySelector('.viewFiTrxId-col')?.textContent;
        allFiTrxIds.push(fiTrxId);
    });

    const allFiTrxIdsString = allFiTrxIds.join(',\n');

    
    navigator.clipboard.writeText(allFiTrxIdsString)
        .then(() => {
            showToast('Copying all PTXs to clipboard'); 
        })
        .catch(error => {
            console.error('Error copying to clipboard:', error);
        });
    }
}

async function copyAllMerchantReferenceToClipboard() {
    // Select the table
    const table = document.getElementById('sortabletable');

    if(table) {

    // Get all td elements with the class "break-all"
    const breakAllTds = Array.from(table.querySelectorAll('tbody tr .break-all'));

    // Check if any elements are found
    if (breakAllTds.length === 0) {
        //showToast('No elements with class "break-all" found.');
        console.log('No elements with class "break-all" found.');
        return;
    }

    // Create an array to store the values
    const breakAllValues = [];

    // Iterate through each element
    breakAllTds.forEach(td => {
        // Add the text content to the array
        if (td.textContent !== null) {
            breakAllValues.push(td.textContent);
        }
    });

    // Join the values with commas and newline characters
    const breakAllValuesString = breakAllValues.join(',\n');

    // Copy the values to the clipboard
    navigator.clipboard.writeText(breakAllValuesString)
        .then(() => {
            console.log('Values with class "break-all" copied to the clipboard:', breakAllValuesString);
            showToast('Copied to clipboard'); // Display a toast notification
        })
        .catch(error => {
            console.error('Error copying to clipboard:', error);
        });
    }
}


async function changeLogo() {
    //const imageLogoTrustly = chrome.runtime.getURL("images/trustly_logo.png");
    const trustlyLogoGreen = chrome.runtime.getURL("images/trustlyGreen.png");

    const anchorElement = document.getElementById('pwmb-brand');
            
    if(anchorElement) {
        anchorElement.style.background = `transparent url(${trustlyLogoGreen}) no-repeat scroll left center`;
        anchorElement.style.backgroundSize = '160px';
    }
}



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
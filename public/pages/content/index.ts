

let transactionBoxUl;
let paymentBoxUl;
let fiBoxUl;
let accountCustomerBoxUl;
let teaID;

async function init() {
    createGroup();
    changeLogo();
    //rearrangeInputs();
    creatingTheBoxInfo();
    someAllAmountsOnThePage();

    addLinkToMerchantReferenceOnTransactionsList();
    
    changeButtonTransactionsPage();
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

    function tooltipToast(htmlContent, element) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerHTML = htmlContent; // Use innerHTML to set HTML content

        // Position the toast next to the element
        const rect = element.getBoundingClientRect();
        toast.style.top = `${rect.top}px`;
        toast.style.left = `${rect.right + 120}px`;
        //toast.style.display = 'flex';
        //toast.style.flex = '';


        document.body.appendChild(toast);

        // Show the toast
        toast.style.opacity = "1";

        // Remove toast when mouse leaves the element or the toast itself
        function removeToast() {
            toast.style.opacity = "0";
            setTimeout(() => {
                toast.remove();
            }, 500);
        }

        element.addEventListener('mouseleave', removeToast);
        toast.addEventListener('mouseleave', removeToast);
    }

// // Example usage
// const tooltipTrigger = document.querySelector('.tooltip-trigger');

// if (tooltipTrigger) {
//     tooltipTrigger.addEventListener('mouseover', event => {
//         showToast("This is a tooltip message", event.target);
//     });
// }

// async function rearrangeInputs() {
//     const inputStatus = document.querySelector('#frmTransactions div:nth-child(13)');
//     const inputPerson = document.querySelector('#hidden-filters div:nth-child(43)');
    
//     const ppStatusTrs = document.querySelector('#frmTransactions div:nth-child(8)');
//     const externalID = document.querySelector('#hidden-filters div:nth-child(5)');

//     //const inputPersonID = document.querySelector('#personId');
//     //const inputExternalID = document.querySelector('#customerExternalId');
    
//     if(inputPerson && inputStatus) {
//         //inputPersonID.style.borderColor = '#025939';

//         //inputPerson.style.border = '1px solid #025939';

//         inputStatus.replaceWith(inputPerson);
//     }

//     if(ppStatusTrs && externalID) {
//         //inputExternalID.style.borderColor = '#025939';

//         ppStatusTrs.replaceWith(externalID);
//     }

// }

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
    paymentBoxUl.style.background = 'transparent';

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
    const visibleICon = chrome.runtime.getURL("images/visible.png");
    
   

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
    let eventsData

    // let attributesEvent;
    
    // let titleEvent;
    // let eventsData = {};
    const matchingEvents = [];
    let titleEvent;
    let eventDate;

    if (eventsTable) {
        const rows = eventsTable.querySelectorAll('tr');

        if (rows && rows.length > 0) {
            rows.forEach(row => {
                if (row.cells && row.cells.length > 2) {
                    eventDate = row.cells[0].textContent;
                    titleEvent = row.cells[1].textContent;
                    const attributesEvent = row.cells[2].textContent;
                    
                    console.log(row.cells[0].textContent, '===============')
                    console.log(eventDate, ' ++++++++++++++++++++++++++++++++')

                    switch (true) {
                        case attributesEvent?.includes('R01'):
                            // Add more cases as needed
                            // eslint-disable-next-line no-case-declarations
                            eventsData = {
                                date: eventDate,
                                title: titleEvent,
                                status: 'R01',
                            };
                            matchingEvents.push(eventsData);
                            break;
                        case attributesEvent?.includes('R02'):
                            // Add more cases as needed
                            // eslint-disable-next-line no-case-declarations
                            eventsData = {
                                date: eventDate,
                                title: titleEvent,
                                status: 'R02',
                            };
                            matchingEvents.push(eventsData);
                            break;
                        case attributesEvent?.includes('R03'):
                            // Add more cases as needed
                            // eslint-disable-next-line no-case-declarations
                            eventsData = {
                                date: eventDate,
                                title: titleEvent,
                                status: 'R03',
                            };
                            matchingEvents.push(eventsData);
                            break;
                        case attributesEvent?.includes('R04'):
                            // Add more cases as needed
                            // eslint-disable-next-line no-case-declarations
                            eventsData = {
                                date: eventDate,
                                title: titleEvent,
                                status: 'R04',
                            };
                            matchingEvents.push(eventsData);
                            break;
                        case attributesEvent?.includes('R05'):
                            // Add more cases as needed
                            // eslint-disable-next-line no-case-declarations
                            eventsData = {
                                date: eventDate,
                                title: titleEvent,
                                status: 'R0',
                            };
                            matchingEvents.push(eventsData);
                            break;
                        case attributesEvent?.includes('R06'):
                            // Add more cases as needed
                            // eslint-disable-next-line no-case-declarations
                            eventsData = {
                                title: titleEvent,
                                status: 'R06',
                            };
                            matchingEvents.push(eventsData);
                            break;
                        case attributesEvent?.includes('R07'):
                            // Add more cases as needed
                            // eslint-disable-next-line no-case-declarations
                            eventsData = {
                                date: eventDate,
                                title: titleEvent,
                                status: 'R07',
                            };
                            matchingEvents.push(eventsData);
                            break;
                        case attributesEvent?.includes('R08'):
                            // Add more cases as needed
                            // eslint-disable-next-line no-case-declarations
                            eventsData = {
                                date: eventDate,
                                title: titleEvent,
                                status: 'R08',
                            };
                            matchingEvents.push(eventsData);
                            break;
                        case attributesEvent?.includes('R09'):
                            // Add more cases as needed
                            // eslint-disable-next-line no-case-declarations
                            eventsData = {
                                date: eventDate,
                                title: titleEvent,
                                status: 'R09',
                            };
                            matchingEvents.push(eventsData);
                            break;
                        case attributesEvent?.includes('R10'):
                            // Add more cases as needed
                            // eslint-disable-next-line no-case-declarations
                            eventsData = {
                                date: eventDate,
                                title: titleEvent,
                                status: 'R10',
                            };
                            matchingEvents.push(eventsData);
                            break;
                        case attributesEvent?.includes('R16'):
                            // Add more cases as needed
                            // eslint-disable-next-line no-case-declarations
                            eventsData = {
                                date: eventDate,
                                title: titleEvent,
                                status: 'R16',
                            };
                            matchingEvents.push(eventsData);
                            break;
                        default:
                            // Handle default case if needed
                            break;
                    }
                }
            });

            console.log('Matching events:', matchingEvents);
        } else {
            console.log('No rows found in eventsTable');
        }
    } else {
        console.log('No eventsTable found');
    }

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
    transactionBoxUl.style.background = 'transparent';

    transactionBoxUl.id = 'transactionBox';


    transactionBoxUl.innerHTML += `<h4>Transaction</h4>`
    transactionBoxUl.innerHTML += `<li><a target="_blank" href="https://trustly.one/admin-console/transactions/?originalTransactionId=${originalTransaction}">Child Transactions</a></li>`

    transactionBoxUl.innerHTML += `<li>
        <a target="_blank"  href="https://trustly.one/admin-console/transactions?transactionId=&ppTransactionId=&merchantReference=${merchantReference}&originalTransactionId=&merchantId=&paymentProviderId=&paymentId=&ppTrxStatusCode=&paymentType=&transactionType=&transactionStatus=&authorizationStatus=&fingerprint=&customerName=&taxId=&mctCustomerName=&customerExternalId=&accountName=&routingNumber=&accountNumber=&iban=&minRiskIndex=&maxRiskIndex=&deviceFingerprint=&ipAddr=&description=&payproId=&excludedFromReports=&verificationFICode=&verificationRoutingNumber=&verificationAccountNumber=&verified=&verificationStatus=&minAmount=&maxAmount=&minPaid=&maxPaid=&minRefunded=&maxRefunded=&startCreateDate=&endCreateDate=&startUpdateDate=&endUpdateDate=&startProcessedDate=&endProcessedDate=&startCompletedDate=&endCompletedDate=&customerCollectionRef=&framework=&system=&countries=&excludedFromCollections=&personId=&fiCustomerId=&customerState=&reasonCode=&teaId=&externalAccId=&ppSubtypeId=&paymentProcessorId=&signature=&ppTrxInstantSettle=&metadata.SIMPLE.clc.propertyId=&metadata.SIMPLE.clc.gamingAssetNumber=&metadata.RANGE.clc.datetimeQR=&metadata.RANGE.clc.datetimeQR=&metadata.SIMPLE.clc.playerCardNumber=&startIndex=&originalStartIndex=&X-CSRFKey="> 
            Transaction tree
            <img style="width: 20px" src=${branchIconPath} alt="Branches Icon" />
        </a>
    </li>`;

// Display "Loading..." message before the timeout
transactionBoxUl.innerHTML += `<li class="loading" style="color: red;">Loading...</li>`;

setTimeout(() => {
    // Remove the "Loading..." message
    const loadingLi = document.querySelector('.loading');
    if (loadingLi) {
        loadingLi.remove();
    }

    // Add the actual content based on the condition
    if (teaID) {
        transactionBoxUl.innerHTML += `<li class="teaID">
            <a target="_bank" href="https://trustly.one/admin-console/transactions?transactionId=&ppTransactionId=&merchantReference=&originalTransactionId=&merchantId=&paymentProviderId=&paymentId=&ppTrxStatusCode=&personId=&fingerprint=&customerName=&taxId=&mctCustomerName=&customerExternalId=&accountName=&routingNumber=&accountNumber=&iban=&minRiskIndex=&maxRiskIndex=&deviceFingerprint=&ipAddr=&description=&payproId=&excludedFromReports=&verificationFICode=&verificationRoutingNumber=&verificationAccountNumber=&verified=&verificationStatus=&minAmount=&maxAmount=&minPaid=&maxPaid=&minRefunded=&maxRefunded=&startCreateDate=&endCreateDate=&startUpdateDate=&endUpdateDate=&startProcessedDate=&endProcessedDate=&startCompletedDate=&endCompletedDate=&customerCollectionRef=&framework=&excludedFromCollections=&fiCustomerId=&customerState=&reasonCode=&teaId=${teaID}&externalAccId=&ppSubtypeId=&paymentProcessorId=&signature=&orderBy=createdAt&sortOrder=desc&ppTrxInstantSettle=&metadata.SIMPLE.clc.propertyId=&metadata.SIMPLE.clc.gamingAssetNumber=&metadata.RANGE.clc.datetimeQR=&metadata.RANGE.clc.datetimeQR=&metadata.SIMPLE.clc.playerCardNumber=&startIndex=0&originalStartIndex=0&X-CSRFKey=ir8v69jp4bbo4fkvkde3va2035">
                Tea ID: ${teaID} 
            </a>
            <img style="width: 18px" src="${teaICon}" alt="Branches Icon" />
        </li>`;
    } else {
        transactionBoxUl.innerHTML += `<li class="teaID">
            Tea ID not found
            <img style="width: 18px" src="${teaICon}" alt="Branches Icon" />
        </li>`;
    }
}, 4000);


    //////////////////////////////////////////////




    //////////////////////////////////////////////
    

    const tooltipHTML = `<ul style="list-style-type: none; margin-left: -10px; padding: 3px 8px 1px 15px;"> 
        ${matchingEvents.map(event => `<li style="padding-left: -10px;"> 
        ${event.date} - ${event.title} - ${event.status}
        </li>`).join('')}
    </ul>`;

    if (liReturnCode) {
        transactionBoxUl.innerHTML += `<li class="tooltip-trigger" style="cursor: help; padding: 10px 2px 10px 3px;">
            Return: 
            <span style="color: red;">${liReturnCode}</span>
            ${matchingEvents.length > 0 ? `<img style="width: 18px;" src="${visibleICon}" alt="Branches Icon" />` : ''}
        </li>`;
    } else {
        transactionBoxUl.innerHTML += `
            <li class="tooltip-trigger" style="color: #ccc; text-decoration: line-through; cursor: help; padding: 10px 2px 10px 3px;">
                Return: not found 
                ${matchingEvents.length > 0 ? `<img style="width: 18px;" src="${visibleICon}" alt="Branches Icon" />` : ''}
            </li>`;
    }
    
    




    if(statusCode !== ''){
        transactionBoxUl.innerHTML += `<li>Status: ${statusCode}</li>`
    } else {
        transactionBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Status: not found</li>`
    }

    
    if(eventsTitle != null) {
        transactionBoxUl.innerHTML += `<li style="color: red;">${eventsTitle}: ${denyDescription ? 'Return: ' + denyDescription.substring(0,4) : "Could not provide"}</li>`
    }

    if(isVip) {
        transactionBoxUl.innerHTML += `<li>VIP?: <span style="color: red;"> ${isVip}</span></li>`
    } else {
        transactionBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">VIP: <span> not found</span></li>`
    }

    transactionBoxUl.addEventListener('mouseover', function(event) {
        const target = event.target;
        if (target.tagName === 'LI' && target.classList.contains('tooltip-trigger')) {
            if(matchingEvents.length > 0) {
                tooltipToast(tooltipHTML, target); // Pass tooltipHTML as HTML content
            }
        }
    });
    

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
     const copyICon = chrome.runtime.getURL("images/copy.png");
    

    let message;
    //let expectedDate;

    fiBoxUl = document.createElement('ul');
    fiBoxUl.style.background = 'transparent';


    fiBoxUl.id = 'FIBox';
    let expectedDate;
    let daysDifference;

    if(expectToComplete !== '') {
        expectedDate = new Date(expectToComplete);
        const currentDate = new Date();
        const timeDifference = expectedDate.getTime() - currentDate.getTime();

        //Calculate the difference in days
        daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference > 0) {

            message = `Expect to complete: <strong style="color: red;">${daysDifference}</strong>`; 
        } else if (daysDifference -1 === 0) {
            // Expected completion is today
            message = "Completed today";
        } else {
            
            const daysAgo = Math.abs(daysDifference);
            message = `Completed ${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
        }
    }

    

    

    fiBoxUl.innerHTML += `<h4>FI Transaction</h4>`;
    if(achProcessor !== '') {
        fiBoxUl.innerHTML += `<li>Payment: ${achProcessor}</li>`;
    }else {
        fiBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Payment: not found</li>`;
    }

    if(routing !== '') {
        fiBoxUl.innerHTML += `<li>Routing: ${routing?.trim().substring(0,9)}</li>`
    }else{
        fiBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Routing: not found</li>`
    }

    if(account !== ''){
        fiBoxUl.innerHTML += `<li>Account: ${account?.trim().substring(0,12)}</li>`;
    }else {
        fiBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Account: not found</li>`;
    }


    if(virtualAccount !== ''){
        fiBoxUl.innerHTML += `<li>Virtual account: ${virtualAccount}</li>`
    }else {
        fiBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Virtual account: not found</li>`
    }


    if(expectToComplete !== ''){
        fiBoxUl.innerHTML += `<li>
            
            ${ daysDifference > 0 ?  `Will complete: ${expectToComplete}` : ""}
            ${expectToComplete ? `<span>${message}</span>` : ""}
            
        </li>`
    }

   //${expectToComplete ? `<p>${message}</p>` : ""}

    if(isGuaranteed !== ''){

        fiBoxUl.innerHTML += `<li>Guaranteed?: 
            <span style="color: red;"> 
                 ${isGuaranteed ? isGuaranteed : "no data"}
            </span>
        </li>`
    }else {
        fiBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Guaranteed?: <span> no data found}</span></li>`
    }

    if(fiTransactionId !== ''){
        fiBoxUl.innerHTML += `<li>
            <span class="copyable" style="color: red; cursor: pointer;">
            <img style="width: 18px" src=${copyICon} alt="Branches Icon" />
                ${fiTransactionId}
            </span>
        </li>`;
    }else {
        fiBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Fi Trx ID: <span class="copyable">not found</span></li>`;
    }


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
    accountCustomerBoxUl.style.background = 'transparent';

    accountCustomerBoxUl.id = 'customerInfoBox';


    accountCustomerBoxUl.innerHTML += `<h4>Customer Info (<a target="_blank" href=${merchantLink}>${merchantName?.substring(0,8)}...</a>)</h4>`;
    accountCustomerBoxUl.innerHTML += `<li>Name: ${customerName}</li>`;

    if(customerEmail) {
        accountCustomerBoxUl.innerHTML += `<li>Email: ${customerEmail}</li>`;
    } else {
        accountCustomerBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Email: not found</li>`;
    }
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
        //boxContent.style.background = 'transparent';
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
            showToast('Selected PTXs, Copied to clipboard'); // Display a toast notification
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
            showToast('All PTXs, copied to the clipboard'); 
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
            //console.log('Values with class "break-all" copied to the clipboard:', breakAllValuesString);
            showToast('All Merchant Ref, Copied to clipboard'); // Display a toast notification
        })
        .catch(error => {
            console.error('Error copying to clipboard:', error);
        });
    }
}

async function addLinkToMerchantReferenceOnTransactionsList() {
    
    const dataTransactionsTable = document.querySelector('#sortabletable');

    if(dataTransactionsTable) {
        const breakAllTds = Array.from(dataTransactionsTable.querySelectorAll('tbody tr .break-all'));


        breakAllTds.forEach(td => {
            if (td.textContent !== null) {
                const tdMerchantReference = td
                
                tdMerchantReference.innerHTML = `<a target="_blank" href="https://trustly.one/admin-console/transactions?merchantReference=${td.textContent}">${td.textContent}</a>`

            }
        });



        const transactionTable = document.querySelector('#sortabletable');

        if (transactionTable) {
            const transactionsRows = Array.from(transactionTable.querySelectorAll('tbody tr'));

            transactionsRows.forEach(row => {

                const tdTransactionId = row.querySelector('td:nth-child(2) a'); 
                //const tdiTransaction = row.querySelector('td:nth-child(2)'); 

                if (tdTransactionId && tdTransactionId.href) {
                    tdTransactionId.setAttribute('target', '_blank');
                    //tdiTransaction.style.borderColor = '#ff0000';
                }
            });
        }
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

// async function changeButtonTransactionsPage() {
//     const iconFilter = await chrome.runtime.getURL("images/icon_filters.png");

//     const moreFilter = document.querySelector('#toggle-filters');

//     const span = `
//         <span>
//             <img src="${iconFilter}" style="height: 20px; margin-right: 5px;">
//             More Filters 2
//         </span>
//     `;

//     // Insert the span element into the moreFilter element as its first child
//     moreFilter?.insertAdjacentHTML('afterbegin', span);

//     moreFilter.style.backgroundColor = '#28A745';
//     moreFilter.style.color = '#fff';
//     moreFilter.style.padding = '8px';
//     moreFilter.style.borderRadius = '4px';
// }

// async function changeButtonTransactionsPage() {
//     const iconFilter = await chrome.runtime.getURL("images/icon_filters.png");

//     const moreFilterA = document.querySelector('#toggle-filters');
//     const hrElement = document.querySelector('hr'); // Assuming there's only one <hr> element
//     const divAfterHr = hrElement.nextElementSibling;

//     // Get the div with the class 'form-group' and no other classes
// //    const specificDiv = document.querySelectorAll('div.form-group:not([class*="col-sm-3"])');
//     // Get all div elements with only the class 'form-group'
// // Get the div containing an <a> element with id 'toggle-columns'
// // Get the div containing an <a> element with id 'toggle-columns'
// const divWithToggleColumns = document.querySelector('div:has(a#toggle-columns)');

// // Get the first div before the divWithToggleColumns
// const firstDivBeforeToggleColumns = divWithToggleColumns?.previousElementSibling;





//     const divElement = document.createElement('div');
//     divElement.innerHTML = `<img src="${iconFilter}" style="height: 20px; margin-right: 5px;">`
//     //spanElement.textContent = 'Test'; // Set the text content of the span

//     divAfterHr?.insertBefore(divElement, divAfterHr.firstChild);

//     // Style the divAfterHr element (assuming it's an <a> element)


//     moreFilterA.style.color = '#fff'

//     divAfterHr.style.display = 'flex';
//     divAfterHr.style.width = '130px';
//     divAfterHr.style.backgroundColor = '#28A745';
//     divAfterHr.style.color = '#fff';
//     divAfterHr.style.padding = '8px';
//     divAfterHr.style.borderRadius = '4px';

//     firstDivBeforeToggleColumns.style.backgroundColor = '#ff0000';
// }

async function changeButtonTransactionsPage() {
    const iconFilter = await chrome.runtime.getURL("images/icon_filters.png");
    const iconColumns = await chrome.runtime.getURL("images/icon_check.png");

    const moreFilterA = document.querySelector('#toggle-filters');
    const moreColumnsA = document.querySelector('#toggle-columns');

    // const hrElement = document.querySelector('hr'); // Assuming there's only one <hr> element
    // const divAfterHr = hrElement.nextElementSibling;

    const divElementFilter = document.createElement('div');
    const divElementColumn = document.createElement('div');
    

    
    const divWithToggleFilters = document.querySelector('div.form-group:has(a#toggle-filters)');

    // Check if the div is found before changing its background color
    if (divWithToggleFilters) {
        divElementFilter.innerHTML = `<img src="${iconFilter}" style="height: 20px; margin-right: 5px;">`
        
        moreFilterA.style.color = '#025939';

        divWithToggleFilters.style.backgroundColor = '#d9ecd3'; 
        divWithToggleFilters.style.color = '#fff'
        divWithToggleFilters.style.display = 'flex';
        divWithToggleFilters.style.width = '135px';
        
        
        divWithToggleFilters.style.padding = '8px';
        divWithToggleFilters.style.borderRadius = '4px';
        
        // Insert divElement into divWithToggleFilters
        divWithToggleFilters.insertBefore(divElementFilter, divWithToggleFilters.firstChild);
    }

    const divWithToggleColumns = document.querySelector('div.form-group:has(a#toggle-columns)');

    if (divWithToggleColumns) {
        divElementColumn.innerHTML = `<img src="${iconColumns}" style="height: 20px; margin-right: 5px;">`
        moreColumnsA.style.color = '#025939';
        
        divWithToggleColumns.style.color = '#fff'
        divWithToggleColumns.style.display = 'flex';
        divWithToggleColumns.style.width = '135px';
        divWithToggleColumns.style.backgroundColor = '#d9ecd3';
        divWithToggleColumns.style.color = '#fff';
        divWithToggleColumns.style.padding = '8px';
        divWithToggleColumns.style.borderRadius = '4px';

        // Insert divElement into divWithToggleColumns
        divWithToggleColumns.insertBefore(divElementColumn.cloneNode(true), divWithToggleColumns.firstChild);
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
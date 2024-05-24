/* eslint-disable @typescript-eslint/ban-ts-comment */


let transactionBoxUl;
let paymentBoxUl;
let fiBoxUl;
let accountCustomerBoxUl;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let teaID;
    let totalAmount = 0;
    let amount = 0;
    let checkedCount = 0;
    const adminCustomersUrl = 'https://trustly.one/admin-console/transactions/customers'

async function init() {
    createGroup();
    changeLogo();
    //rearrangeInputs();
    creatingTheBoxInfo();
    
    addLinkToMerchantReferenceOnTransactionsList();
    
    changeButtonTransactionsPage();

    //if (location.href.startsWith(urlAdmin) || location.href.startsWith(customer)) {
    if(!location.href.startsWith(adminCustomersUrl)) {
        someAllAmountsOnThePage();
    }
   
}

init();

function getStyleString(styleObj) {
    return Object.entries(styleObj)
        .map(([prop, value]) => `${prop}: ${value}`)
        .join(';');
}

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

async function someAllAmountsOnThePage() { 
    const iconCheck = chrome.runtime.getURL("images/icon_check.png");

    const rows = document.querySelectorAll('#sortabletable tbody tr');
    const resetButton = document.querySelector('#reset-search');
    const checkboxAll = document.querySelector('#sortabletable thead th input[type="checkbox"]');

    if (checkboxAll instanceof HTMLInputElement) {
        checkboxAll.addEventListener('change', () => {
            if (checkboxAll.checked) {
                console.log('Checking all checkboxes');
                checkedCount = 0;
                rows.forEach(row => {
                    const amountText = row.querySelector('td:nth-child(17)')?.textContent?.trim();
                    if (amountText !== undefined) {
                        amount = parseFloat(amountText.replace(/[^0-9.-]+/g, ''));
                        if (!isNaN(amount)) {
                            totalAmount += amount;
                            checkedCount++;
                        }
                    }
                });
            } else {
                console.log('Unchecking all');
                totalAmount = 0;
                checkedCount = 0;
            }
            updateTotalAmount(totalAmount, checkedCount);
        });
    }

    rows.forEach(row => {
        const checkbox = row.querySelector('td:nth-child(1) input[type="checkbox"]');
        if (checkbox instanceof HTMLInputElement) { 
            checkbox.addEventListener('change', () => {
                const amountText = row.querySelector('td:nth-child(17)')?.textContent?.trim();

                if(amountText !== undefined) {
                    amount = parseFloat(amountText.replace(/[^0-9.-]+/g, ''));
                    if (!isNaN(amount)) {
                        if (checkbox.checked) {
                            totalAmount += amount;
                            checkedCount++;
                        } else {
                            totalAmount -= amount; 
                            checkedCount--;
                        }
                        updateTotalAmount(totalAmount, checkedCount);
                    }
                }
            });
        } else {
            //console.error('Checkbox not found or invalid selector');
        }
    });

    if (resetButton instanceof HTMLInputElement) {
        resetButton.style.color = '#fff';

        resetButton.classList.add('btn', 'btn-primary');

        const newDiv = document.createElement('div');

        newDiv.style.display = 'inline-block';
        newDiv.style.alignItems = 'center';
        newDiv.style.justifyContent = 'center';
        newDiv.style.background = '#d9ecd3';
        newDiv.style.padding = '7px 10px 8px 10px';
        newDiv.style.marginLeft = '5px';
        newDiv.style.borderRadius = '4px';
        newDiv.style.marginTop = '5px';
        newDiv.innerHTML = `<span style="color: #025939;"> 
            <img style="width: 20px;" src=${iconCheck} />
            <span id="checkedCountDisplay"> ${checkedCount}</span>

            | Total: <span id="totalAmountDisplay" style="color: #012340;">Total: $${totalAmount.toFixed(2)}</span>

        </span>`;
        resetButton.insertAdjacentElement('afterend', newDiv);
    }
}

function updateTotalAmount(amount, checkedCount) {
    const totalAmountDisplay = document.getElementById('totalAmountDisplay');
    const checkedCountDisplay = document.getElementById('checkedCountDisplay');
    
    if (totalAmountDisplay && checkedCountDisplay) {
        totalAmountDisplay.textContent = `$${amount.toFixed(2)}`;
        checkedCountDisplay.textContent = checkedCount;
    }
}

async function tabTransaction() {

    const merchantReference = document.querySelector('.table tbody tr:first-child td:nth-child(7)')?.textContent;
    const originalTransaction = document.querySelector('#transaction tbody tr:nth-child(3) td:nth-child(2) a:first-child')?.textContent;
    const statusCode = document.querySelector('#transaction tbody tr:nth-child(16) td:nth-child(2)')?.textContent;
    const isVip = document.querySelector('#fi-transaction tbody tr:nth-child(23) td:nth-child(2)')?.textContent;
    const branchIconPath = chrome.runtime.getURL("images/icon.png");
   // const teaICon = chrome.runtime.getURL("images/tea.png");
    const visibleICon = chrome.runtime.getURL("images/visible.png");
    
   

    // setTimeout(() => {
    //     const button = document.querySelector('.panel-body .btn.btn-default:nth-child(2)');
    //     if (button) {
    //         button.click();
    //     } 
    // }, 2000);

    // setTimeout(() => {
    //     teaID = document.querySelector('#batchIceTea table.table tbody tr:first-child td:nth-child(2)')?.textContent;
    // },4000)


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
                            //@ts-ignore
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
                            //@ts-ignore
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
                            //@ts-ignore
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
                            //@ts-ignore
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
                            //@ts-ignore
                            matchingEvents.push(eventsData);
                            break;
                        case attributesEvent?.includes('R06'):
                            // Add more cases as needed
                            // eslint-disable-next-line no-case-declarations
                            eventsData = {
                                title: titleEvent,
                                status: 'R06',
                            };
                            //@ts-ignore
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
                            //@ts-ignore
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
                            //@ts-ignore
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
                            //@ts-ignore
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
                            //@ts-ignore
                            matchingEvents.push(eventsData);
                            break;
                        case attributesEvent?.includes('R11'):
                            // Add more cases as needed
                            // eslint-disable-next-line no-case-declarations
                            eventsData = {
                                date: eventDate,
                                title: titleEvent,
                                status: 'R11',
                            };
                            //@ts-expect-error
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
                            //@ts-expect-error
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
                            liReturnCode = returnCodeValue.substring(0, 7);
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
// transactionBoxUl.innerHTML += `<li class="loading" style="color: red;">Loading...</li>`;

// setTimeout(() => {
//     // Remove the "Loading..." message
//     const loadingLi = document.querySelector('.loading');
//     if (loadingLi) {
//         loadingLi.remove();
//     }

//     // Add the actual content based on the condition
//     if (teaID) {
//         transactionBoxUl.innerHTML += `<li class="teaID">
//             <a target="_bank" href="https://trustly.one/admin-console/transactions?transactionId=&ppTransactionId=&merchantReference=&originalTransactionId=&merchantId=&paymentProviderId=&paymentId=&ppTrxStatusCode=&personId=&fingerprint=&customerName=&taxId=&mctCustomerName=&customerExternalId=&accountName=&routingNumber=&accountNumber=&iban=&minRiskIndex=&maxRiskIndex=&deviceFingerprint=&ipAddr=&description=&payproId=&excludedFromReports=&verificationFICode=&verificationRoutingNumber=&verificationAccountNumber=&verified=&verificationStatus=&minAmount=&maxAmount=&minPaid=&maxPaid=&minRefunded=&maxRefunded=&startCreateDate=&endCreateDate=&startUpdateDate=&endUpdateDate=&startProcessedDate=&endProcessedDate=&startCompletedDate=&endCompletedDate=&customerCollectionRef=&framework=&excludedFromCollections=&fiCustomerId=&customerState=&reasonCode=&teaId=${teaID}&externalAccId=&ppSubtypeId=&paymentProcessorId=&signature=&orderBy=createdAt&sortOrder=desc&ppTrxInstantSettle=&metadata.SIMPLE.clc.propertyId=&metadata.SIMPLE.clc.gamingAssetNumber=&metadata.RANGE.clc.datetimeQR=&metadata.RANGE.clc.datetimeQR=&metadata.SIMPLE.clc.playerCardNumber=&startIndex=0&originalStartIndex=0&X-CSRFKey=ir8v69jp4bbo4fkvkde3va2035">
//                 Tea ID: ${teaID} 
//             </a>
//             <img style="width: 18px" src="${teaICon}" alt="Branches Icon" />
//         </li>`;
//     } else {
//         transactionBoxUl.innerHTML += `<li class="teaID">
//             Tea ID not found
//             <img style="width: 18px" src="${teaICon}" alt="Branches Icon" />
//         </li>`;
//     }
// }, 4000);


    //////////////////////////////////////////////

   //@ts-expect-error
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
    
    const globalStyles = {
        // Define your styles here
        createPoa: {
            width: '18px',
            cursor: 'pointer',
            opacity: '1',

            ':hover': {
                opacity: '0.1',
                border: '2px solid red'
                // Add more hover styles as needed
            }
        }
    };

     const achProcessor = document.querySelector('#fi-transaction tbody tr:nth-child(3) td:nth-child(2)')?.textContent;
     const routing = document.querySelector('#fi-transaction tbody tr:nth-child(10) td:nth-child(2)')?.textContent;
     const account = document.querySelector('#fi-transaction tbody tr:nth-child(11) td:nth-child(2)')?.textContent;
     const virtualAccount = document.querySelector('#fi-transaction tbody tr:nth-child(13) td:nth-child(2)')?.textContent;
     const expectToComplete = document.querySelector('#fi-transaction tbody tr:nth-child(19) td:nth-child(2)')?.textContent;
     const isGuaranteed = document.querySelector('#fi-transaction tbody tr:nth-child(21) td:nth-child(2)')?.textContent;
     const linkElement = document.querySelector('#fi-transaction tbody tr:nth-child(1) td:nth-child(2) a');
     const fiTransactionId = linkElement?.textContent?.trim();

     const copyICon = chrome.runtime.getURL("images/copy.png");
     const poaIcon = chrome.runtime.getURL("images/document.png");
    

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
        fiBoxUl.innerHTML += `<div>
        <img class="createPoa" style="${getStyleString(globalStyles.createPoa)}" src=${poaIcon} alt="Branches Icon" title="Click to create the POA" /> |
            <span class="copyable" style="color: red; cursor: pointer;">
                <img class="copyable" style="width: 18px" src=${copyICon} alt="Branches Icon" title="Click to copy the PTX" />
                ${fiTransactionId}
            </span>
        </div>`;
    }else {
        fiBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Fi Trx ID: <span class="copyable">not found</span></li>`;
    }


    fiBoxUl.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'SPAN' || target.tagName === 'IMG' && target.classList.contains('copyable')) {
            //const fiTransactionId = target.textContent.trim();
            copyToClipboard(fiTransactionId);
        }
    });

    fiBoxUl.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'IMG' && target.classList.contains('createPoa')) {
            const email = getEmailFromDropdown();
            console.log('My email is  <<<<<< ', email)
    
            if (email) {
                // Construct the URL
                const url = `https://trustly.one/admin-console/disputes?emails=${encodeURIComponent(email)}&flasher.message=The+execution+of+the+Dispute+Report+was+triggered.&ptxs=${fiTransactionId}`;
                openTabInServiceWorkerForPOA(url);
                showToast(`Creating POA for ${fiTransactionId}`);
            }
        }
    });

    
}

async function tabAccountCustomer() {
    //const originalTransaction = document.querySelector('#transaction tbody tr:nth-child(3) td:nth-child(2) a:first-child')?.textContent;
    const merchantName = document.querySelector('.table tbody tr:first-child td:nth-child(6) div div:nth-child(1)')?.textContent;
    const merchantLink = document.querySelector('.table tbody tr:first-child td:nth-child(6) div ul li:nth-child(2) a');
    const customerName = document.querySelector('#info .table-hover tr:nth-child(4) td:nth-child(2)')?.textContent;
    const customerEmail = document.querySelector('#info .table-hover tr:nth-child(13) td:nth-child(2)')?.textContent;
    const personID = document.querySelector('#info .table-hover tr:nth-child(2) td:nth-child(2)')?.textContent;
    const customerID = document.querySelector('#info .table-hover tr:nth-child(1) td:nth-child(2)')?.textContent;
    const customerExternalID = document.querySelector('#info .table-hover tr:nth-child(3) td:nth-child(2)')?.textContent?.trim();

    const teaICon = chrome.runtime.getURL("images/tea.png");
    

    let teaIdCustomerInfo1;
    let teaIdCustomerInfo2;

    accountCustomerBoxUl = document.createElement('ul');
    accountCustomerBoxUl.style.background = 'transparent';

    accountCustomerBoxUl.id = 'customerInfoBox';


    accountCustomerBoxUl.innerHTML += `<h4>Customer Info (<a target="_blank" href=${merchantLink}>${merchantName?.substring(0,8)}...</a>)</h4>`;
    accountCustomerBoxUl.innerHTML += `<li>Name: ${customerName}</li>`;

    

    setTimeout(() => {
        const button = document.querySelector('.panel-body .btn.btn-default:nth-child(1)');
        const button2 = document.querySelector('.panel-body .btn.btn-default:nth-child(2)');
        

        

        if (button) {
          button.click();
          console.log('Clicked the second button');

          setTimeout(() => {
             teaIdCustomerInfo1 = document.querySelector('#batchIceTea table.table tbody tr:first-child td:nth-child(2)')?.textContent;
             
            console.log('Button 1111: ', teaIdCustomerInfo1);
          }, 1000); // Adjust timing as needed for data retrieval

        } else {
          console.log('Second button not found');
        }

        if (button2) {
            button2.click();
            console.log('Clicked the second button');
  
            setTimeout(() => {
                teaIdCustomerInfo2 = document.querySelector('#batchIceTea table.table tbody tr:first-child td:nth-child(2)')?.textContent;
               
              console.log('Button 222222 ', teaIdCustomerInfo2);
            }, 1000); // Adjust timing as needed for data retrieval
  
          } else {
            console.log('Second button not found');
          }

      }, 3000); // Adjust timing as needed for button click
      

    //&personId=5360558724&

    if(customerEmail) {
        accountCustomerBoxUl.innerHTML += `<li>Email: ${customerEmail}</li>`;
    } else {
        accountCustomerBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Email: not found</li>`;
    }
    //customerInfoBox.innerHTML += `<li><a target="_blank" href="https://trustly.one/admin-console/transactions?personId=${personID}">Person ID: ${personID}</a></li>`;
    
    if(personID || customerExternalID) {
        accountCustomerBoxUl.innerHTML += `<li>
        Fees (INSTANT):
        <a target="_blank" href="https://trustly.one/admin-console/transactions?personId=${personID}&paymentType=1"> 
             ${personID && "<strong>Person ID</strong>"} 
        </a> | 
        <a target="_blank" href="https://trustly.one/admin-console/transactions?customerExternalId=${customerExternalID}&paymentType=1"> 
             ${customerExternalID && "<strong>External ID </strong>"}
        </a>
    </li>`
    }

    //${customerID} - ${personID}
    if(customerID || customerID) {
        accountCustomerBoxUl.innerHTML += `<li>
        Collections:
        ${customerID ? `<a target="_blank" href="https://trustly.one/admin-console/collections/index/?originalTransactionId=&transactionId=&personId=&customerId=${customerID}&customerName=&merchant=&createdAt=&statusCode=&email=&fingerprint=&inWaiting=&startIndex=0&originalStartIndex=0&X-CSRFKey=v0d4d62bdsa61u2taqa8s3fll3"> 
        ${customerID && "<strong>Customer</strong>"} 
        </a> `: ''}

        ${customerID && personID ? `|` : ''} 
        
        ${personID ? `<a target="_blank" href="https://trustly.one/admin-console/collections/index/?originalTransactionId=&transactionId=&personId=${personID}&customerId=&customerName=&merchant=&createdAt=&statusCode=&email=&fingerprint=&inWaiting=&startIndex=0&originalStartIndex=0&X-CSRFKey=v0d4d62bdsa61u2taqa8s3fll3"> 
        ${personID && "<strong>Person:</strong>"} 
        </a>`: ''}
       </li>`
    }

//    if(personID) {
//     accountCustomerBoxUl.innerHTML += `<li>
//         <a target="_blank" href="https://trustly.one/admin-console/collections/index/?originalTransactionId=&transactionId=&personId=${personID}&customerId=&customerName=&merchant=&createdAt=&statusCode=&email=&fingerprint=&inWaiting=&startIndex=0&originalStartIndex=0&X-CSRFKey=v0d4d62bdsa61u2taqa8s3fll3"> 
//             <strong>Person ID: </strong> ${personID}
//         </a>
//    </li>`
//    }
//https://trustly.one/admin-console/transactions?transactionId=&ppTransactionId=&merchantReference=&originalTransactionId=&merchantId=&paymentProviderId=&paymentId=&ppTrxStatusCode=&personId=&fingerprint=&customerName=&taxId=&mctCustomerName=&customerExternalId=31840931&accountName=&routingNumber=&accountNumber=&iban=&minRiskIndex=&maxRiskIndex=&deviceFingerprint=&ipAddr=&description=&payproId=&excludedFromReports=&verificationFICode=&verificationRoutingNumber=&verificationAccountNumber=&verified=&verificationStatus=&minAmount=&maxAmount=&minPaid=&maxPaid=&minRefunded=&maxRefunded=&startCreateDate=&endCreateDate=&startUpdateDate=&endUpdateDate=&startProcessedDate=&endProcessedDate=&startCompletedDate=&endCompletedDate=&customerCollectionRef=&framework=&excludedFromCollections=&fiCustomerId=&customerState=&reasonCode=&teaId=&externalAccId=&ppSubtypeId=&paymentProcessorId=&signature=&orderBy=createdAt&sortOrder=desc&ppTrxInstantSettle=&metadata.SIMPLE.clc.propertyId=&metadata.SIMPLE.clc.gamingAssetNumber=&metadata.RANGE.clc.datetimeQR=&metadata.RANGE.clc.datetimeQR=&metadata.SIMPLE.clc.playerCardNumber=&startIndex=0&originalStartIndex=0&X-CSRFKey=g6588nite5toevjploo2rubdsj

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
    const copySelectIcon = chrome.runtime.getURL("images/copy_selected_icon.png");
    const copyAllIcon = chrome.runtime.getURL("images/copy_all_icon.png");
    const poaIcon = chrome.runtime.getURL("images/document.png");

        if(group) {
            const liSelectedPtx = document.createElement('li');
            const liPtxAll = document.createElement('li');
            const liRef = document.createElement('li');
            const liMRef = document.createElement('li');
            const liPCollections = document.createElement('li');
            const liCheckTransactions = document.createElement('li');
            const liCreateProofOfAuthorization = document.createElement('li');

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

            liPCollections.innerHTML = `<a title="Person ID" href="#" style="color: #0EA5E9;">
            <span>Check Collections (person) </span>
            </a>`;


            liCheckTransactions.innerHTML = `<a title="Check for transactions" href="#" style="color: #0EA5E9;">
            <span>Check Transactions</span>
            </a>`;

            liCreateProofOfAuthorization.innerHTML = `<a title="Check the transactions you want to generate POA" href="#" style="color: #0EA5E9;">
            <img style="width: 20px;" src=${poaIcon} />
            <span>Generate POA</span>
            </a>`;


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


            liPCollections.addEventListener('click', function(event) {
                event.preventDefault();
                const url = new URL(window.location.href);
                const params = url.searchParams;
                const personId = params.get('personId');

               // const personIdInput = document.getElementById('personId')?.textContent;

                if(personId !== "") {
                    openTabInServiceWorker(personId);
                } else {
                    showToast('Please search for the Person ID to use this functionality')
                }
            });

            liCheckTransactions.addEventListener('click', function(event) {
                event.preventDefault();

                const transactionsArray = ['7591576972', '7708048019', '7725774224', '7748991409', '7622869674', '7749192149', '7729032079', '7749191301']


               openTabInServiceWorkerForTransactions(transactionsArray)

            });

            liCreateProofOfAuthorization.addEventListener('click', function(event) {
                event.preventDefault();

                createProofOfAuthorization();

            });


            liSelectedPtx.appendChild(newLinkSelectedPtx);
            liPtxAll.appendChild(newLinkSelectedPtxAll);
            liMRef.appendChild(newLinkSelectedMerchantRef);
            liRef.appendChild(newLinkRef);

            group.appendChild(liSelectedPtx);
            group.appendChild(liPtxAll);
            group.appendChild(liMRef);
            group.appendChild(liRef);
            group.appendChild(liPCollections);
            //group.appendChild(liCheckTransactions);
            group.appendChild(liCreateProofOfAuthorization);
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
    const transactionsTable = document.querySelector('#sortabletable');
  
    if (!transactionsTable) return; // Exit if table not found
  
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

// function buildURLWithPtxParameters(selectedPtxs) {
//     const baseURL = 'https://trustly.one/admin-console/disputes?';
//     const ptxParameter = 'ptxs=' + selectedPtxs.join('%2C%0D%0A');
//     return baseURL + ptxParameter;
// }
  
function createProofOfAuthorization() {
    const table = document.getElementById('sortabletable');

    if (table) {
        const selectedRows = Array.from(table.querySelectorAll('tbody tr input[type="checkbox"]:checked'));

        if (selectedRows.length === 0) {
            showToast('No rows selected.');
            return;
        }

        const selectedValues = [];

        // Iterate through each selected row
        selectedRows.forEach(checkbox => {
            const row = checkbox.closest('tr');
            const fiTrxId = row?.querySelector('.viewFiTrxId-col')?.textContent;
            if (fiTrxId) {
                //@ts-ignore
                selectedValues.push(fiTrxId.trim());
            }
        });

        // Check if any selected row does not have a ptx value
        const missingPtxValues = selectedRows.some(row => {
            const fiTrxId = row.closest('tr')?.querySelector('.viewFiTrxId-col')?.textContent;
            //@ts-ignore
            return !selectedValues.includes(fiTrxId.trim());
        });

        if (missingPtxValues) {
            showToast('Not all selected rows have a PTX value.');
            return;
        }

        // Join the selected values with URL-encoded commas and newlines
        const selectedValuesString = selectedValues.join('%2C%0D%0A');

        // Extract the email from the dropdown
        const email = getEmailFromDropdown();
        console.log('My email is  <<<<<< ', email)

        if (email) {
            // Construct the URL
            const url = `https://trustly.one/admin-console/disputes?emails=${encodeURIComponent(email)}&flasher.message=The+execution+of+the+Dispute+Report+was+triggered.&ptxs=${selectedValuesString}`;
            openTabInServiceWorkerForPOA(url);
            // console.log(url);

            // // Open the URL in a new tab
            // window.open(url, '_blank');

            // // Optionally, copy the URL to the clipboard
            // navigator.clipboard.writeText(url)
            //     .then(() => {
            //         showToast('URL with selected PTXs copied to clipboard'); // Display a toast notification
            //     })
            //     .catch(error => {
            //         showToast('Error copying to clipboard:', error);
            //     });
        } else {
            showToast('Failed to extract email from dropdown');
        }
    }
}


function getEmailFromDropdown() {
    // Select the 'a' element with the id "user-menu"
    const userMenu = document.getElementById('user-menu');

    if (userMenu) {
        // Extract the text content from the 'a' element
        const userMenuText = userMenu.textContent;

        // Extract the username from the text content using regular expression
        const usernameRegex = /([\w.-]+)\s*$/; // Matches alphanumeric characters, hyphens, and dots at the end of the string
        const match = userMenuText?.match(usernameRegex);
        const extractedUsername = match ? match[1] : null;

        if (extractedUsername) {
            // Construct the email address
            const email = `${extractedUsername}@trustly.com`;

            return email;
        }
    }

    return null;
}




async function changeLogo() {
    const trustlyLogoGreen = chrome.runtime.getURL("images/trustlyGreen.png");
  
    const anchorElement = document.getElementById('pwmb-brand');
  
    if (anchorElement) {
      anchorElement.style.background = `transparent url(${trustlyLogoGreen}) no-repeat scroll left center / 160px`;
    } else {
      //console.warn("Couldn't find element with id 'pwmb-brand'");
    }
  }
  

async function changeButtonTransactionsPage() {
    const iconFilter = chrome.runtime.getURL("images/icon_filters.png");
    const iconColumns = chrome.runtime.getURL("images/icon_check.png");
  
    const moreFilterA = document.querySelector('#toggle-filters'); // 
    const moreColumnsA = document.querySelector('#toggle-columns');
  
    const divElementFilter = document.createElement('div');
    const divElementColumn = document.createElement('div'); // Create once
  
    const divWithToggleFilters = document.querySelector('div.form-group:has(a#toggle-filters)');
  
    if(moreFilterA instanceof HTMLElement) {
        moreFilterA.style.textDecoration = 'none';
        moreFilterA.style.color = '#025939';
    }

    if (divWithToggleFilters instanceof HTMLDivElement) {
      divElementFilter.innerHTML = `<img src="${iconFilter}" style="height: 20px; margin-right: 5px;">`;
      
      
  
      divWithToggleFilters.style.backgroundColor = '#d9ecd3';
      divWithToggleFilters.style.color = '#fff';
      divWithToggleFilters.style.display = 'flex';
      divWithToggleFilters.style.width = '135px';
      divWithToggleFilters.style.padding = '8px';
      divWithToggleFilters.style.borderRadius = '4px';
  
      divWithToggleFilters.insertBefore(divElementFilter, divWithToggleFilters.firstChild);
    }
  
    const divWithToggleColumns = document.querySelector('div.form-group:has(a#toggle-columns)');
  
    if (divWithToggleColumns instanceof HTMLDivElement) {
      divElementColumn.innerHTML = `<img src="${iconColumns}" style="height: 20px; margin-right: 5px;">`;
      
      if(moreColumnsA instanceof HTMLElement) {
        moreColumnsA.style.textDecoration = 'none';
        moreColumnsA.style.color = '#025939';
      }
      
      divWithToggleColumns.style.color = '#fff';
      divWithToggleColumns.style.display = 'flex';
      divWithToggleColumns.style.width = '135px';
      divWithToggleColumns.style.backgroundColor = '#d9ecd3';
      divWithToggleColumns.style.padding = '8px';
      divWithToggleColumns.style.borderRadius = '4px';
  
      divWithToggleColumns.insertBefore(divElementColumn.cloneNode(true), divWithToggleColumns.firstChild);
    }
  }

//   async function listenPage() {
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

// function getEmailFromDropdown() {
//     // Select the 'a' element with the id "user-menu"
//     const userMenu = document.getElementById('user-menu');

//     if (userMenu) {
//         // Extract the text content from the 'a' element
//         const userMenuText = userMenu.textContent;

//         // Extract the username from the text content using regular expression
//         const usernameRegex = /([\w.-]+)\s*$/; // Matches alphanumeric characters, hyphens, and dots at the end of the string
//         const match = userMenuText?.match(usernameRegex);
//         const extractedUsername = match ? match[1] : null;

//         if (extractedUsername) {
//             // Construct the email address
//             const email = `${extractedUsername}@trustly.com`;

//             console.log(extractedUsername, ' >>>>>>>>>>>>>>>>');

//             return email;
//         }
//     }

//     return null;
// }

function openTabInServiceWorker(personId) {
    // Send a message to the service worker to open a tab with the personId
    chrome.runtime.sendMessage({ action: 'openTab', personId: personId }, (response) => {
        const tabId = response.tabId;
        const data = response.extractedData; // Extracted data from the service worker
        console.log('New tab opened with ID:', tabId);
        console.log('New Data:', data);

            
        data.forEach((item) => {
            checkCheckboxesByTransactionId(item.transactionId)
            
            console.log('Transaction ID:', item.transactionId);
        });
    });
}
function openTabInServiceWorkerForPOA(URL) {
    
    chrome.runtime.sendMessage({ action: 'createPOAByTable', urlID: URL }, () => {


        showToast('success!')
    });
}


function openTabInServiceWorkerForTransactions(transactionIds) {
    chrome.runtime.sendMessage({ action: 'extractMultiplePages', transactionIds }, (response) => {
        if (response.status === 'processing') {
            console.log('Service Worker is processing transactions...');
            // Handle processing status (e.g., show a loading indicator)
        } else if (response.extractedData && Array.isArray(response.extractedData)) {
            console.log('Extracted Data:', response.extractedData);
            // Process each transaction data object
            response.extractedData.forEach((transactionData) => {
                console.log('Transaction ID:', transactionData.transactionId);
                console.log('Data:', transactionData.data);
                // Handle or further process the transaction data as needed
            });
        } else {
            console.error('Unexpected response from service worker:', response);
            // Handle unexpected response
        }
    });
    
}


function copySelectedMerchantReferenceByCollectionsToClipboard() {
    
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
        const dateTimeCreated = row?.querySelector('td:nth-child(5)')?.textContent;
        const trType = row?.querySelector('td:nth-child(8)')?.textContent;
        const country = row?.querySelector('td:nth-child(12)')?.textContent;
        const amount = row?.querySelector('td:nth-child(17)')?.textContent;

       // const data =  fiOriginal + ' - ' + fiTrxId + ' - ' + country + ' '  + amount;
       // const dataCapture = transaction + ' - ' + fiTrxId + ' - ' + country + ' ' + amount;

        const data = `${fiOriginal}  -  ${fiTrxId}  -  ${country === 'US' ? 'USD ' : 'CAD '} ${amount} - created-at ${dateTimeCreated}`;
        const dataCapture = `${transaction}  -  ${fiTrxId}  -  ${country === 'US' ? 'USD ' : 'CAD '} ${amount} - created-at ${dateTimeCreated}`;

        if (trType !== 'Capture') {
            //@ts-expect-error
            selectedValues.push(data);
        }else {
            //@ts-expect-error
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


function checkCheckboxesByTransactionId(transactionId) {
    // Select all rows in the table body
    const rows = document.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        // Second column (td[1])
        const transactionID = row.querySelectorAll('td')[1];
        const originalTransactionID = row.querySelectorAll('td')[28];
        const transactionType = row.querySelectorAll("td")[7]
        if (transactionID.textContent?.trim() === transactionId) {

            console.log(transactionID, 'é igual a ', transactionId)

            const checkbox = row.querySelector('input[type="checkbox"]');
            //@ts-ignore
            if (checkbox && checkbox.checked === false) {
                //@ts-ignore
                checkbox.checked = true;
                
                // Update the total amount and checked count
                const amountText = row.querySelector('td:nth-child(17)')?.textContent?.trim();
                if (amountText !== undefined) {
                    const amount = parseFloat(amountText.replace(/[^0-9.-]+/g, ''));
                    if (!isNaN(amount)) {
                        totalAmount += amount;
                        checkedCount++;
                        updateTotalAmount(totalAmount, checkedCount);
                    }
                }
            }
        }

        if (originalTransactionID.textContent?.trim() === transactionId && transactionType.textContent?.trim() === 'Pay') {

            console.log(transactionID, 'é igual a ', transactionId)

            const checkbox = row.querySelector('input[type="checkbox"]');
            //@ts-ignore
            if (checkbox && checkbox.checked === false) {
                //@ts-ignore
                checkbox.checked = true;
                
                // Update the total amount and checked count
                const amountText = row.querySelector('td:nth-child(17)')?.textContent?.trim();
                if (amountText !== undefined) {
                    const amount = parseFloat(amountText.replace(/[^0-9.-]+/g, ''));
                    if (!isNaN(amount)) {
                        totalAmount += amount;
                        checkedCount++;
                        updateTotalAmount(totalAmount, checkedCount);
                    }
                }
            }
        }
    });
    copySelectedMerchantReferenceByCollectionsToClipboard();
}







// function listenToCheckboxChanges() {
//     const rows = document.querySelectorAll('tbody tr');
    
//     rows.forEach(row => {
//         const checkbox = row.querySelector('input[type="checkbox"]');
//         if (checkbox) {
//             checkbox.addEventListener('change', updateTotalAmountAndCount);
//         }
//     });
// }


//   document.addEventListener("DOMContentLoaded", function () {
//     blockSalesforceHyperlinkIntoSalesforcePost();
//   });
  
//   async function blockSalesforceHyperlinkIntoSalesforcePost() {
//     if (window.location.href.startsWith('https://trustlyinc.lightning.force.com/lightning/r/Case/')) {
//   // This code will execute if the URL matches the pattern
//         console.log('You are at a Case record page.');
//         alert('página correta')
//     }

//     const divElement = document.querySelector(".cuf-body"); // Selecting the div with specific classes
//     if (divElement instanceof HTMLElement) {
//       alert('encontrou')

//     }
//         // Select all <a> elements in the document
//         const links = document.querySelectorAll('a');

//         // Loop through each <a> element
//         links.forEach(link => {
//         alert('okay')
//         if (link.href && link.href.startsWith('https://trustly.one/admin-console')) {
//             // Change the font size of the link
//             link.style.fontSize = '48px'; // Change to the desired font size
//         }
//         });
//   }

//const adminURL = 'https://trustly.one/admin-console/transactions?transactionId=&ppTransactionId=&merchantReference=deposit:f000b621-4e04-4e45-9dba-0d2b12f5dc71&originalTransactionId=&merchantId=&paymentProviderId=&paymentId=&ppTrxStatusCode=&paymentType=&transactionType=&transactionStatus=&authorizationStatus=&fingerprint=&customerName=&taxId=&mctCustomerName=&customerExternalId=&accountName=&routingNumber=&accountNumber=&iban=&minRiskIndex=&maxRiskIndex=&deviceFingerprint=&ipAddr=&description=&payproId=&excludedFromReports=&verificationFICode=&verificationRoutingNumber=&verificationAccountNumber=&verified=&verificationStatus=&minAmount=&maxAmount=&minPaid=&maxPaid=&minRefunded=&maxRefunded=&startCreateDate=&endCreateDate=&startUpdateDate=&endUpdateDate=&startProcessedDate=&endProcessedDate=&startCompletedDate=&endCompletedDate=&customerCollectionRef=&framework=&system=&countries=&excludedFromCollections=&personId=&fiCustomerId=&customerState=&reasonCode=&teaId=&externalAccId=&ppSubtypeId=&paymentProcessorId=&signature=&ppTrxInstantSettle=&metadata.SIMPLE.clc.propertyId=&metadata.SIMPLE.clc.gamingAssetNumber=&metadata.RANGE.clc.datetimeQR=&metadata.RANGE.clc.datetimeQR=&metadata.SIMPLE.clc.playerCardNumber=&startIndex=&originalStartIndex=&X-CSRFKey=';

// async function callApiTest() {
//     try {
//         const response = await fetch(adminURL, {
//           method: 'GET',
//         //   headers: {
//         //     'Content-Type': 'application/json',
//         //   },
//         //   body: JSON.stringify({
//         //     url: 'your-url',
//         //     mfa: 'your-mfa',
//         //     refs: [['ref1', 'ref2']], // Example for refs, adjust as needed
//         //     user: 'your-username',
//         //     password: 'your-password',
//         //   }),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         //const responseData = await response.json();
//         console.log(response)
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

  





//console.error('Checkbox not found or invalid selector');

// async function changeButtonTransactionsPage() {
//     const iconFilter = await chrome.runtime.getURL("images/icon_filters.png");
//     const iconColumns = await chrome.runtime.getURL("images/icon_check.png");

//     const moreFilterA = document.querySelector('#toggle-filters');
//     const moreColumnsA = document.querySelector('#toggle-columns');

//     // const hrElement = document.querySelector('hr'); // Assuming there's only one <hr> element
//     // const divAfterHr = hrElement.nextElementSibling;

//     const divElementFilter = document.createElement('div');
//     const divElementColumn = document.createElement('div');
    

    
//     const divWithToggleFilters  = document.querySelector('div.form-group:has(a#toggle-filters)');

//     // Check if the div is found before changing its background color
//     if (divWithToggleFilters) {
//         divElementFilter.innerHTML = `<img src="${iconFilter}" style="height: 20px; margin-right: 5px;">`
        
//         moreFilterA.style.color = '#025939';

//         divWithToggleFilters.style.backgroundColor = '#d9ecd3'; 
//         divWithToggleFilters.style.color = '#fff'
//         divWithToggleFilters.style.display = 'flex';
//         divWithToggleFilters.style.width = '135px';
        
        
//         divWithToggleFilters.style.padding = '8px';
//         divWithToggleFilters.style.borderRadius = '4px';
        
//         // Insert divElement into divWithToggleFilters
//         divWithToggleFilters.insertBefore(divElementFilter, divWithToggleFilters.firstChild);
//     }

//     const divWithToggleColumns = document.querySelector('div.form-group:has(a#toggle-columns)');

//     if (divWithToggleColumns) {
//         divElementColumn.innerHTML = `<img src="${iconColumns}" style="height: 20px; margin-right: 5px;">`
//         moreColumnsA.style.color = '#025939';
        
//         divWithToggleColumns.style.color = '#fff'
//         divWithToggleColumns.style.display = 'flex';
//         divWithToggleColumns.style.width = '135px';
//         divWithToggleColumns.style.backgroundColor = '#d9ecd3';
//         divWithToggleColumns.style.color = '#fff';
//         divWithToggleColumns.style.padding = '8px';
//         divWithToggleColumns.style.borderRadius = '4px';

//         // Insert divElement into divWithToggleColumns
//         divWithToggleColumns.insertBefore(divElementColumn.cloneNode(true), divWithToggleColumns.firstChild);
//     }


// }







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
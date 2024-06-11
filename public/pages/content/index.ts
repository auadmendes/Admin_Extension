/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//import toast = require('./toast');

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
    createGroup();
    changeLogo();
    //rearrangeInputs();
    creatingTheBoxInfo();
    
    addLinkToMerchantReferenceOnTransactionsList();

}

init();

function getStyleString(styleObj) {
    return Object.entries(styleObj)
        .map(([prop, value]) => `${prop}: ${value}`)
        .join(';');
}

// function showToast(message) {
    
//     const toast = document.createElement('div');
//     toast.classList.add('toast');
//     toast.textContent = message;

    
//     document.body.appendChild(toast);

    
//     void toast.offsetWidth;

//     // Show the toast
//     toast.style.opacity = "1";

//     // Remove after seconds
//     setTimeout(() => {
//         toast.style.opacity = "0";
//         setTimeout(() => {
//             toast.remove();
//         }, 500); 
//     }, 2000); 
// }

// function tooltipToast(htmlContent, element) {
//     const toast = document.createElement('div');
//     toast.classList.add('toast');
//     toast.innerHTML = htmlContent; // Use innerHTML to set HTML content

//     // Position the toast next to the element
//     const rect = element.getBoundingClientRect();
//     toast.style.top = `${rect.top}px`;
//     toast.style.left = `${rect.right + 120}px`; // Adjusted for better placement

//     document.body.appendChild(toast);

//     // Show the toast
//     toast.style.opacity = "1";

//     // Remove toast after a delay
//     let removalTimeout;

//     function removeToast() {
//         removalTimeout = setTimeout(() => {
//             toast.style.opacity = "0";
//             setTimeout(() => {
//                 toast.remove();
//             }, 500); // Fade out duration
//         }, 1000); // Delay before starting fade out
//     }

//     // Clear the removal timeout if the mouse enters the toast
//     function clearRemoveToast() {
//         clearTimeout(removalTimeout);
//     }

//     element.addEventListener('mouseleave', removeToast);
//     toast.addEventListener('mouseleave', removeToast);
//     toast.addEventListener('mouseenter', clearRemoveToast);
//     element.addEventListener('mouseenter', clearRemoveToast); // Optional: prevent removal if mouse re-enters the element
// }

function tooltipToast(htmlContent, element) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = htmlContent; // Use innerHTML to set HTML content

    // Center the toast horizontally and set it 200px from the top
    toast.style.position = 'fixed';
    toast.style.top = '100px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';

    document.body.appendChild(toast);

    // Show the toast
    toast.style.opacity = "1";

    // Remove toast after a delay
    let removalTimeout;

    function removeToast() {
        removalTimeout = setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => {
                toast.remove();
            }, 500); // Fade out duration
        }, 1000); // Delay before starting fade out
    }

    // Clear the removal timeout if the mouse enters the toast
    function clearRemoveToast() {
        clearTimeout(removalTimeout);
    }

    element.addEventListener('mouseleave', removeToast);
    toast.addEventListener('mouseleave', removeToast);
    toast.addEventListener('mouseenter', clearRemoveToast);
    element.addEventListener('mouseenter', clearRemoveToast); // Optional: prevent removal if mouse re-enters the element
}


function tooltipToastPayment(htmlContent, element) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = htmlContent; // Use innerHTML to set HTML content

    // Position the toast next to the element
    // const rect = element.getBoundingClientRect();
    // toast.style.top = `${rect.top}px`;
    // toast.style.left = `${rect.right + 120}px`; 
    toast.style.position = 'fixed';
    toast.style.top = '200px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';

    document.body.appendChild(toast);

    // Show the toast
    toast.style.opacity = "1";

    // Remove toast after a delay
    let removalTimeout;

    function removeToast() {
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.remove();
        }, 500); // Fade out duration
    }

    // Clear the removal timeout if the mouse enters the toast
    function clearRemoveToast() {
        clearTimeout(removalTimeout);
    }

    function handleOutsideClick(event) {
        if (!toast.contains(event.target) && event.target !== element) {
            removeToast();
            document.removeEventListener('click', handleOutsideClick);
        }
    }

    // Add event listeners
    element.addEventListener('mouseleave', () => {
        removalTimeout = setTimeout(removeToast, 1000);
    });
    toast.addEventListener('mouseleave', () => {
        removalTimeout = setTimeout(removeToast, 1000);
    });
    toast.addEventListener('mouseenter', clearRemoveToast);
    document.addEventListener('click', handleOutsideClick);
}

async function paymentTab() {

    const originalTransaction = document.querySelector('#transaction tbody tr:nth-child(3) td:nth-child(2) a:first-child')?.textContent;
    const linkOriginalTransaction = document.createElement('a');
    linkOriginalTransaction.href =  `https://trustly.one/admin-console/transactions/details/${originalTransaction}`; //urlOriginalTransaction;
    const infoPaid = document.querySelector('#payment tbody tr:nth-child(15) td:nth-child(2)')?.textContent;
    const refunded = document.querySelector('#payment tbody tr:nth-child(16) td:nth-child(2)')?.textContent;
    const reversed = document.querySelector('#payment tbody tr:nth-child(17) td:nth-child(2)')?.textContent;
    const balance = document.querySelector('#payment tbody tr:nth-child(18) td:nth-child(2)')?.textContent;
    const customerExternalID = document.querySelector('#info .table-hover tr:nth-child(3) td:nth-child(2)')?.textContent?.trim();
    //const pending = document.querySelector('#payment tbody tr:nth-child(19) td:nth-child(2)')?.textContent;

    const personID = document.querySelector('#info .table-hover tr:nth-child(2) td:nth-child(2)')?.textContent;
    const customerID = document.querySelector('#info .table-hover tr:nth-child(1) td:nth-child(2)')?.textContent;

    //const arrowDown = chrome.runtime.getURL("images/arrow_down.png");
    const loadingIcon = chrome.runtime.getURL("images/loadingIcon.gif");
    let loadingPaymentBox = true;

  
    
    paymentBoxUl = document.createElement('ul');
    paymentBoxUl.style.background = 'transparent';
    
    paymentBoxUl.id = 'paymentBox';
    
    paymentBoxUl.innerHTML += `<h4>Payment</h4>`;
    paymentBoxUl.innerHTML += `<li>Original: <a href="${linkOriginalTransaction}">${originalTransaction}</a></li>`;
    paymentBoxUl.innerHTML += `<li>Paid: ${infoPaid}</li>`;
    paymentBoxUl.innerHTML += `<li>Refunded: ${refunded}</li>`;
   
    
    paymentBoxUl.innerHTML += `<li>Balance: ${balance}</li>`;
    // paymentBoxUl.innerHTML += `<li style="color: red;">Pending: ${pending}</li>`;
    
    if (loadingPaymentBox) {
        paymentBoxUl.innerHTML += `<li id="loadingPaymentBox" style="color: red;">
            Loading information
            <img style="width: 14px;" src=${loadingIcon} />
        </li>`;
    }

    document.body.appendChild(paymentBoxUl); // Append paymentBoxUl to the body or desired container

    const collectionsArray = [];
    try {
        const collectionsResult = await checkCollectionsByTransaction(personID, customerID);
        if(collectionsResult) {
            //toast(collectionsResult)
            collectionsArray.push(...collectionsResult);
        }
        
    } catch (error) {
        console.error('Error fetching collection data:', error);
    }

    const feesArray = [];
    try {
        const feesResult = await checkFeesByPersonId(personID, customerExternalID);
        feesArray.push(...feesResult);
       // paymentBoxUl.innerHTML += `<li class="tooltip-trigger-fee" style="color: red; cursor: pointer;">Fees ${feesArray.length}</li>`;

    } catch (error) {
        console.error('Error fetching collection data:', error);
    }


    const totalAmount = collectionsArray.reduce((total, event) => total + Number(event.amount), 0);
    //toast(totalAmount)
    const tooltipHTML = `
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
                    <th colspan="5" style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">
                        <span style="color: red; font-size: 18px;">Collections</span>
                    </th>
                </tr>
                <tr style="background: #262626; color: #0ee06e;">
                    <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Original</th>
                    <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Transaction</th>
                    <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Amount</th>
                    <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Return</th>
                    <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Created at</th>
                </tr>
            </thead>
            <tbody>
                ${collectionsArray.map(event => `
                    <tr>
                        <td style="border: 0.5px solid #555; padding: 5px;">
                            <a target="_blank" style="color: white;" title="This is the fee" href="https://trustly.one/admin-console/transactions/details/${event.originalTransaction}#payment" style="color: white;">
                                <span>${event.originalTransaction}</span>
                            </a>     
                        </td>
                        <td style="border: 0.5px solid #555; padding: 5px;">
                            <a target="_blank" style="color: white;" title="This is the fee" href="https://trustly.one/admin-console/transactions/details/${event.transactionId}#payment" style="color: #0EA5E9;">
                                <span  style="color: #0EA5E9;">${event.transactionId}</span>
                            </a>     
                        </td>
                        <td style="border: 0.5px solid #555; padding: 5px;">${event.amount}</td>
                        <td style="border: 0.5px solid #555; padding: 5px;">${event.return}</td>
                        <td style="border: 0.5px solid #555; padding: 5px;">${event.created_at}</td>
                    </tr>`).join('')}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2" style="border: 0.5px solid #555; padding: 5px;"><strong>Total Amount:</strong></td>
                    <td style="border: 0.5px solid #555; padding: 5px;"><strong>${totalAmount}</strong></td>
                    <td colspan="2" style="border: 0.5px solid #555; padding: 5px;"></td>
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
                    <th colspan="6" style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">
                        <span style="color: #0ee06e; font-size: 18px;">Fees</span>
                    </th>
                </tr>
                <tr style="background: #262626; color: #0ee06e;">
                    <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Transaction</th>
                    <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Trx Type</th>
                    <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Amount</th>
                    <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Reference</th>
                    <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Created at</th>
                    <th style="border: 0.5px solid #555; padding: 5px; text-align: left; background: #262626">Status</th>
                </tr>
            </thead>
            <tbody>
                ${feesArray.map(event => `
                    <tr>
                        <td style="border: 0.5px solid #555; padding: 5px;">
                            <a target="_blank" style="color: white;" title="This is the fee" href="https://trustly.one/admin-console/transactions/details/${event.transactionId}#payment" style="color: #0EA5E9;">
                                <span>${event.transactionId}</span>
                            </a>    
                        </td>
                        <td style="border: 0.5px solid #555; padding: 5px;">${event.trxType}</td>
                        <td style="border: 0.5px solid #555; padding: 5px;">${event.amount}</td>
                        <td style="border: 0.5px solid #555; padding: 5px;">
                            <a target="_blank" title="This transaction is parent of the FEE" href="https://trustly.one/admin-console/transactions?merchantReference=${event.reference}#payment" style="color: #0EA5E9;">
                                <span>${event.reference}</span>
                            </a>    
                        </td>
                        <td style="border: 0.5px solid #555; padding: 5px;">${event.created_at}</td>
                        <td style="border: 0.5px solid #555; padding: 5px;">${event.status}</td>
                    </tr>`).join('')}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2" style="border: 0.5px solid #555; padding: 5px;"><strong>Total Fee Amount:</strong></td>
                    <td style="border: 0.5px solid #555; padding: 5px;"><strong>${totalAmountFees}</strong></td>
                    <td style="border: 0.5px solid #555; padding: 5px;"></td>
                    <td style="border: 0.5px solid #555; padding: 5px;"></td>
                    <td style="border: 0.5px solid #555; padding: 5px;"></td>
                </tr>
            </tfoot>
        </table>
    </div>`;

   //<button id="copyButton" style="padding: 5px 10px; background: #0ee06e; color: #000; border: none; cursor: pointer;">Copy</button>

    setTimeout(() => {
        const rows = document.querySelectorAll('#fraud-analysis-result tr');
        let foundUnauthorizedReturn = false;
        let foundUnauthorizedReturnAmount = false;
        let foundKnownSince = false;
    
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 2) {
                const rowZeroText = cells[0].textContent;
                const rowOneText = cells[1].textContent;
    
                if (rowZeroText === 'totalReturnCount' && rowOneText) {
                    console.log('Returns: ', rowOneText);
                    paymentBoxUl.innerHTML += `<div style="display: flex">
                        <li class="tooltip-trigger" style="color: red; cursor: pointer; margin-right: 5px;">Returns: ${rowOneText}</li> |
                        <li class="tooltip-trigger-fee" style="color: #448C30; cursor: pointer; margin-left: 5px;">Fees ${feesArray.length}</li>
                    </div>`;
                    foundUnauthorizedReturn = true;
                }
                // if (rowZeroText === 'totalReturnAmountLast90Days' && rowOneText) {
                //     if(Number(rowOneText) > 0) {
                //         console.log('Returns: ', rowOneText);
                //         paymentBoxUl.innerHTML += `<li class="tooltip-trigger_Removed" style="color: red;">
                //            ${rowOneText.length > 0 ? `<img style="width: 14px;" src="${arrowDown}" />`: ''}
                //             Return 90 days: $ ${rowOneText}
                //         </li>`;
                //         foundUnauthorizedReturnAmount = true;
                //     }
                // }
                if (rowZeroText === 'known_since' && rowOneText) {
                    if(rowOneText) {
                        paymentBoxUl.innerHTML += `<li>Client since: ${rowOneText}</li>`;
                        foundKnownSince = true;
                    }
                }
                if (rowZeroText === 'customerIdCount' && rowOneText) {
                    if(rowOneText) {
                        paymentBoxUl.innerHTML += `<li>
                            Customer ID: 
                            <span style="color: red;">(${rowOneText})</span>
                        </li>`;
                        foundKnownSince = true;
                    }
                }
            }
        });

        loadingPaymentBox = false;
        const loadingElement = document.getElementById('loadingPaymentBox');
        if (loadingElement) {
            loadingElement.remove();
        }

        if (!foundUnauthorizedReturn && !foundUnauthorizedReturnAmount) {
            paymentBoxUl.innerHTML += `<li>Reversed: ${reversed}</li>`;
        } 
        



    }, 5000);
    

    paymentBoxUl.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'LI' && target.classList.contains('tooltip-trigger')) {
            if (collectionsArray.length > 0) {
                tooltipToastPayment(tooltipHTML, target); // Pass tooltipHTML as HTML content
            }
        }
        if (target.tagName === 'LI' && target.classList.contains('tooltip-trigger-fee')) {
            if (feesArray.length > 0) {
                tooltipToastPayment(tooltipHTMLFees, target); // Pass tooltipHTML as HTML content
            }
        }
    });

    // document.getElementById('copyButton').addEventListener('click', () => {
    //     alert('criando')
    //     copyToClipboard(tooltipHTMLFees);
    // });
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

            //console.log('Matching events:', matchingEvents);
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




    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
        transactionBoxUl.innerHTML += `<li class="tooltip-statuscode-trigger" style="cursor: pointer;">Status: ${statusCode}</li>`
    } else {
        transactionBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Status: not found</li>`
    }

    
    if(eventsTitle != null) {
        transactionBoxUl.innerHTML += `<li style="color: red;">${eventsTitle}
        : ${denyDescription ? 'Return: ' + denyDescription.substring(0,4) 
        : "Could not provide"}</li>`
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
    transactionBoxUl.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'LI' && target.classList.contains('tooltip-statuscode-trigger')) {
            if(matchingEvents.length > 0) {
                toast('Meu test'); // Pass tooltipHTML as HTML content
            }
            tooltipToast('Meu test', target);
        }
    });

}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
    .then(() => {
        toast(`Copied to clipboard`);
    })
    .catch((error) => {
        console.error('Failed to copy:', error);
    });
}

// function copyToClipboardHTML(html) {
//     const blobInput = new Blob([html], { type: 'text/html' });
//     const clipboardItem = new ClipboardItem({ 'text/html': blobInput });

//     navigator.clipboard.write([clipboardItem]).then(() => {
//         showToast('Copied to clipboard');
//     }).catch((error) => {
//         console.error('Failed to copy:', error);
//     });
// }

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                toast(`Creating POA for ${fiTransactionId}`);
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
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

    //${customerID} - ${personID}
    if(customerID || customerID) {
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
            //console.log('Selected values copied to the clipboard:', selectedValuesString);
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
            toast('Selected PTXs, Copied to clipboard'); // Display a toast notification
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
        // Get the .viewFiTrxId-col value for each row
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
            toast('All Merchant Ref, Copied to clipboard'); // Display a toast notification
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
      return;
    }
  }

async function checkCollectionsByTransaction(personId, customerID) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: 'checkCollectionsByTransaction', personId: personId, customerId: customerID }, (response) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                const data = response.extractedData; // Ensure this is an array
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
                const data = response.extractedData; // Ensure this is an array
                //showToast(data);
                
                data.forEach((item) => {

                });

                resolve(data);
            }
        });
    });
}

function openTabInServiceWorkerForPOA(URL) {
    
    chrome.runtime.sendMessage({ action: 'createPOAByTable', urlID: URL }, () => {
        toast('success!')
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

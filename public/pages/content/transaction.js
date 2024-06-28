/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

async function tabTransaction() {
    //let transactionBoxUl;

    transactionBoxUl = document.createElement('ul');
    transactionBoxUl.style.background = 'transparent';
    transactionBoxUl.id = 'transactionBox';
    transactionBoxUl.innerHTML += `<h4>Transaction</h4>`;
 
    checkSavedItemOnStoraged();

    //document.body.appendChild(transactionBoxUl);
}



async function checkSavedItemOnStoraged() {
    chrome.storage.local.get(['transactionCheckedItems'], (result) => {
        console.log('Retrieved from storage:', result.transactionCheckedItems);
        if (result.transactionCheckedItems) {
            
            if (result.transactionCheckedItems.childTransactions) {
                const originalTransaction = document.querySelector('#transaction tbody tr:nth-child(3) td:nth-child(2) a:first-child')?.textContent;

                if (originalTransaction) {
                    
                    if (transactionBoxUl) {
                        transactionBoxUl.innerHTML += `<li><a target="_blank" href="https://trustly.one/admin-console/transactions/?originalTransactionId=${originalTransaction}">Child Transactions</a></li>`;
                    } else {
                        console.error('transactionBoxUl element not found');
                    }
                }
            }
        } else {
            console.warn('transactionCheckedItems not found in storage');
        }

        if (result.transactionCheckedItems && result.transactionCheckedItems.transactionTree) {
            
            const merchantReference = document.querySelector('.table tbody tr:first-child td:nth-child(7)')?.textContent;
            const branchIconPath = chrome.runtime.getURL("images/icon.png");

            if(merchantReference) {
                transactionBoxUl.innerHTML += `<li>
                <a target="_blank"  href="https://trustly.one/admin-console/transactions?transactionId=&ppTransactionId=&merchantReference=${merchantReference}&originalTransactionId=&merchantId=&paymentProviderId=&paymentId=&ppTrxStatusCode=&paymentType=&transactionType=&transactionStatus=&authorizationStatus=&fingerprint=&customerName=&taxId=&mctCustomerName=&customerExternalId=&accountName=&routingNumber=&accountNumber=&iban=&minRiskIndex=&maxRiskIndex=&deviceFingerprint=&ipAddr=&description=&payproId=&excludedFromReports=&verificationFICode=&verificationRoutingNumber=&verificationAccountNumber=&verified=&verificationStatus=&minAmount=&maxAmount=&minPaid=&maxPaid=&minRefunded=&maxRefunded=&startCreateDate=&endCreateDate=&startUpdateDate=&endUpdateDate=&startProcessedDate=&endProcessedDate=&startCompletedDate=&endCompletedDate=&customerCollectionRef=&framework=&system=&countries=&excludedFromCollections=&personId=&fiCustomerId=&customerState=&reasonCode=&teaId=&externalAccId=&ppSubtypeId=&paymentProcessorId=&signature=&ppTrxInstantSettle=&metadata.SIMPLE.clc.propertyId=&metadata.SIMPLE.clc.gamingAssetNumber=&metadata.RANGE.clc.datetimeQR=&metadata.RANGE.clc.datetimeQR=&metadata.SIMPLE.clc.playerCardNumber=&startIndex=&originalStartIndex=&X-CSRFKey="> 
                    Transaction tree
                    <img style="width: 20px" src=${branchIconPath} alt="Branches Icon" />
                </a>
            </li>`;
            }
        }

        if (result.transactionCheckedItems && result.transactionCheckedItems.status) {
            const statusCode = document.querySelector('#transaction tbody tr:nth-child(16) td:nth-child(2)')?.textContent;
            const ideaIcon = chrome.runtime.getURL("images/idea.png");

            if(statusCode) {
                if(statusCode !== ''){
                    transactionBoxUl.innerHTML += 
                    `<li class="tooltip-statuscode-trigger" style="cursor: pointer;">
                        Status: ${statusCode}
                        <img style="width: 18px; margin-bottom: 5px;" src="${ideaIcon}" alt="Branches Icon" />
                    </li>`
                } else {
                    transactionBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Status: not found</li>`
                }

                transactionBoxUl.addEventListener('click', function(event) {
                    const target = event.target;
                    if (target.tagName === 'LI' && target.classList.contains('tooltip-statuscode-trigger')) {
                        const statusCode = target.textContent.split(': ')[1]; // Extract status code from the list item text
                        
                        if(statusCode.startsWith('SW')){
                            const statusDetails = findStatusDetails(statusCode);
                        
                            if (statusDetails) {
            
                                const message = `
                                    <div style=" max-width: 400px; font-family: 'Roboto', sans-serif; font-weight: 200; border: 1px solid #bbb; border-radius: 4px; padding: 10px;">
                                        
                                        <div>
                                            <h4>Software (SW)</h4>
                                            <div style="width: 100%; height: 1px; background: #aaa; margin-bottom: 15px;"></div>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span style="min-width: 200px;">Category:</span>
                                            <span style="font-weight: 400; font-size: 20px">${statusDetails.category}</span>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span style="width: 200px;">Response Code:</span> 
                                            <span style="font-weight: 400; font-size: 20px">${statusDetails.responseCode}</span>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span>Response Description:</span> 
                                            <span style="font-weight: 400; font-size: 20px">${statusDetails.responseDescription}</span>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span>Reason Code:</span> 
                                            <span style="font-weight: 400; font-size: 20px">${statusDetails.reasonCode}</span>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span>Reason Description:</span> 
                                            <span style="color: #0ee06e; font-weight: 400; font-size: 20px;">${statusDetails.reasonDescription}</span>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span>Suggested Actions:</span> 
                                            <span style="font-weight: 400; font-size: 20px">${statusDetails.suggestedActions}</span>
                                        </div>
                                    </div>
                                `;
                                showToast(message, target);
                            } else {
                                showToast('Status details not found', target);
                            }
                        }
            
                        if(statusCode.startsWith('R')) {
                            const returnDetails = findReturnDetails(statusCode);
                            if (returnDetails) {
                                const message = `
            
                                    <div style=" max-width: 400px; font-family: 'Roboto', sans-serif; font-weight: 200; border: 1px solid #bbb; border-radius: 4px; padding: 10px;">
                                        
                                        <div>
                                            <h4>ACH Return Codes (R)</h4>
                                            <div style="width: 100%; height: 1px; background: #aaa; margin-bottom: 15px;"></div>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span style="min-width: 200px;">Return</span>
                                            <span style="font-weight: 400; font-size: 20px">${returnDetails.responseCode}</span>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span style="width: 200px;">Title</span> 
                                            <span style="font-weight: 400; font-size: 18px">${returnDetails.description}</span>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span>Action:</span> 
                                            <span style="font-weight: 400; font-size: 20px; color: #0ee06e;">${returnDetails.action}</span>
                                        </div>
            
                                        
                                    </div>
                                `;
                                showToast(message, target);
                            } else {
                                showToast('Status details not found', target);
                            }
                        }
            
                        if(statusCode.startsWith('UC')) {
                            const returnUserCanceledCodeDetails = findUserCanceledDetailsCode(statusCode);
                            if (returnUserCanceledCodeDetails) {
                                const message = `
            
                                    <div style=" max-width: 400px; font-family: 'Roboto', sans-serif; font-weight: 200; border: 1px solid #bbb; border-radius: 4px; padding: 10px;">
                                        
                                        <div>
                                            <h4>User Canceled (UC)</h4>
                                            <div style="width: 100%; height: 1px; background: #aaa; margin-bottom: 15px;"></div>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span style="min-width: 200px;">Status Code</span>
                                            <span style="font-weight: 400; font-size: 20px">${returnUserCanceledCodeDetails.statuscode}</span>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span style="width: 200px;">Description</span> 
                                            <span style="font-weight: 400; font-size: 20px">${returnUserCanceledCodeDetails.description}</span>
                                        </div>
            
                                    </div>
                                `;
                                showToast(message, target);
                            } else {
                                showToast('Status details not found', target);
                            }
                        }

                        if(statusCode.startsWith('AC')) {
                            const returnACDetails = findACDetails(statusCode);
                            if (returnACDetails) {
                                const message = `
            
                                    <div style=" max-width: 400px; font-family: 'Roboto', sans-serif; font-weight: 200; border: 1px solid #bbb; border-radius: 4px; padding: 10px;">
                                        
                                        <div>
                                            <h4>Acknowledged Communication (AC)</h4>
                                            <div style="width: 100%; height: 1px; background: #aaa; margin-bottom: 15px;"></div>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span style="min-width: 200px;">Acknowledged Communication</span>
                                            <span style="font-weight: 400; font-size: 20px">${returnACDetails.statusCode}</span>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span style="width: 200px;">Description</span> 
                                            <span style="font-weight: 400; font-size: 20px">${returnACDetails.description}</span>
                                        </div>
            
                                    </div>
                                `;
                                showToast(message, target);
                            } else {
                                showToast('Status details not found', target);
                            }
                        }
            
                        if(statusCode.startsWith('EFT')) {
                            const returnACDetails = findEFTDeclineCodeDetails(statusCode);
                            if (returnACDetails) {
                                const message = `
            
                                    <div style=" max-width: 400px; font-family: 'Roboto', sans-serif; font-weight: 200; border: 1px solid #bbb; border-radius: 4px; padding: 10px;">
                                        
                                        <div>
                                            <h4>EFT Decline Codes - Canada</h4>
                                            <div style="width: 100%; height: 1px; background: #aaa; margin-bottom: 15px;"></div>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span style="min-width: 200px;">Decline code</span>
                                            <span style="font-weight: 400; font-size: 20px">${returnACDetails.statusCode}</span>
                                        </div>
            
                                        <div style="font-weight: 100; font-size: 12px; display: flex; flex-direction: column; margin-bottom: 10px;">
                                            <span style="width: 200px;">Description</span> 
                                            <span style="font-weight: 400; font-size: 20px">${returnACDetails.description}</span>
                                        </div>
            
                                    </div>
                                `;
                                showToast(message, target);
                            } else {
                                showToast('Status details not found', target);
                            }
                        }
            
                    }
                });
            }
        }

        if (result.transactionCheckedItems && result.transactionCheckedItems.vip) {
            const isVip = document.querySelector('#fi-transaction tbody tr:nth-child(23) td:nth-child(2)')?.textContent;

            if(isVip) {
                transactionBoxUl.innerHTML += `<li>VIP?: <span style="color: red;"> ${isVip}</span></li>`
            } else {
                transactionBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">VIP: <span> not found</span></li>`
            }
        }

        if (result.transactionCheckedItems && result.transactionCheckedItems.returned) {
            
            const visibleICon = chrome.runtime.getURL("images/visible.png");
            const eventsTableDescription = document.querySelector('#events #sortabletable tbody');
            const eventsTable = document.querySelector('#events #sortabletable tbody');

            const matchingEvents = [];
            let liReturnCode; 


        
            // Begin events table
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
                                    
                                    eventsData = {
                                        date: eventDate,
                                        title: titleEvent,
                                        status: 'R01',
                                    };
                                    
                                    matchingEvents.push(eventsData);
                                    break;
                                case attributesEvent?.includes('R02'):
        
                                    
                                    eventsData = {
                                        date: eventDate,
                                        title: titleEvent,
                                        status: 'R02',
                                    };
                                    
                                    matchingEvents.push(eventsData);
                                    break;
                                case attributesEvent?.includes('R03'):
                                    
                                    
                                    eventsData = {
                                        date: eventDate,
                                        title: titleEvent,
                                        status: 'R03',
                                    };
                                    
                                    matchingEvents.push(eventsData);
                                    break;
                                case attributesEvent?.includes('R04'):
                                    
                                    
                                    eventsData = {
                                        date: eventDate,
                                        title: titleEvent,
                                        status: 'R04',
                                    };
                                    
                                    matchingEvents.push(eventsData);
                                    break;
                                case attributesEvent?.includes('R05'):
                                    
                                    
                                    eventsData = {
                                        date: eventDate,
                                        title: titleEvent,
                                        status: 'R0',
                                    };
                                    
                                    matchingEvents.push(eventsData);
                                    break;
                                case attributesEvent?.includes('R06'):
                                    
                                    
                                    eventsData = {
                                        title: titleEvent,
                                        status: 'R06',
                                    };
                                    
                                    matchingEvents.push(eventsData);
                                    break;
                                case attributesEvent?.includes('R07'):
                                    
                                    eventsData = {
                                        date: eventDate,
                                        title: titleEvent,
                                        status: 'R07',
                                    };
                                    
                                    matchingEvents.push(eventsData);
                                    break;
                                case attributesEvent?.includes('R08'):
                                    
                                    eventsData = {
                                        date: eventDate,
                                        title: titleEvent,
                                        status: 'R08',
                                    };
                                    
                                    matchingEvents.push(eventsData);
                                    break;
                                case attributesEvent?.includes('R09'):
                                    
                                    eventsData = {
                                        date: eventDate,
                                        title: titleEvent,
                                        status: 'R09',
                                    };
                                    
                                    matchingEvents.push(eventsData);
                                    break;
                                case attributesEvent?.includes('R10'):
                                    
                                    eventsData = {
                                        date: eventDate,
                                        title: titleEvent,
                                        status: 'R10',
                                    };
                                    
                                    matchingEvents.push(eventsData);
                                    break;
                                case attributesEvent?.includes('R11'):
                                    
                                    eventsData = {
                                        date: eventDate,
                                        title: titleEvent,
                                        status: 'R11',
                                    };
                                    
                                    matchingEvents.push(eventsData);
                                    break;
                                case attributesEvent?.includes('R16'):
                                    
                                    eventsData = {
                                        date: eventDate,
                                        title: titleEvent,
                                        status: 'R16',
                                    };
                                    
                                    matchingEvents.push(eventsData);
                                    break;
                                default:
                                    
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
                
                const cells = eventsTable?.querySelectorAll('td');
        
                
                if (cells && cells.length > 0) {
                
                    cells.forEach(cell => {
                        
                        if (cell.textContent?.includes('returnCode')) {
                            
                            const cellContent = cell.textContent;
                            if (cellContent) {
                                const startIndex = cellContent.indexOf('returnCode');
                                if (startIndex !== -1) {
                                    returnCodeValue = cellContent
                                        .substring(startIndex + 11)
                                        .split('<br>')[0] 
                                        .trim(); 
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
                
                const rows = eventsTableDescription?.querySelectorAll('tr');
            
                
                if (rows && rows.length > 0) {
                
                    rows.forEach(row => {
                
                        if (row.cells && row.cells.length > 2) {
                
                            if (row.cells[1].textContent?.includes('Deny')) {
                
                                const descriptionCellContent = row.cells[2].textContent;
                                if (descriptionCellContent) {
                                    const startIndex = descriptionCellContent.indexOf('description');
                                    if (startIndex !== -1) {
                                        denyDescription = descriptionCellContent
                                            .substring(startIndex + 12) 
                                            .split('<br>')[0] 
                                            .trim(); 
                                        eventsTitle = 'Deny';
                                    }
                                }
                            } else if (row.cells[1].textContent?.includes('Reverse')) {
                                
                                const descriptionCellContent = row.cells[2].textContent;
                                if (descriptionCellContent) {
                                    const startIndex = descriptionCellContent.indexOf('description');
                                    if (startIndex !== -1) {
                                        denyDescription = descriptionCellContent
                                            .substring(startIndex + 12) 
                                            .split('<br>')[0] 
                                            .trim(); 
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
            // End of events table

            const tooltipHTML = `<ul style="list-style-type: none; margin-left: -10px; padding: 3px 8px 1px 15px;"> 
            ${matchingEvents.map(event => `<li style="padding-left: -10px;"> 
            
                ${event.date} - ${event.title} - ${event.status}
                </li>`).join('')}
            </ul>`;

            if (liReturnCode) {
                transactionBoxUl.innerHTML += 
                `<li class="tooltip-trigger" style="cursor: help; padding: 10px 2px 10px 3px;">
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

            if(eventsTitle != null) {
                transactionBoxUl.innerHTML += `<li style="color: red;">${eventsTitle}
                : ${denyDescription ? 'Return: ' + denyDescription.substring(0,4) 
                : "Could not provide"}</li>`
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
    });
}

function tooltipToast(htmlContent, element) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = htmlContent; 

    toast.style.position = 'fixed';
    toast.style.top = '100px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#0C0C0D';
    //toast.style.color = '#262626';

    document.body.appendChild(toast);

    
    toast.style.opacity = "1";

    
    let removalTimeout;

    function removeToast() {
        removalTimeout = setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => {
                toast.remove();
            }, 500); 
        }, 1000); 
    }

    
    function clearRemoveToast() {
        clearTimeout(removalTimeout);
    }

    element.addEventListener('mouseleave', removeToast);
    toast.addEventListener('mouseleave', removeToast);
    toast.addEventListener('mouseenter', clearRemoveToast);
    element.addEventListener('mouseenter', clearRemoveToast); 
}


function tooltipToastPayment(htmlContent, element) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = htmlContent; 

    
    toast.style.position = 'fixed';
    toast.style.top = '100px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';

    
    //toast.style.filter = 'invert(100%)';
    toast.style.backgroundColor = '#0C0C0D';
    toast.style.color = '#262626';

    document.body.appendChild(toast);

    
    toast.style.opacity = "1";

    
    let removalTimeout;

    function removeToast() {
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.remove();
        }, 500);
    }

    
    function clearRemoveToast() {
        clearTimeout(removalTimeout);
    }

    function handleOutsideClick(event) {
        if (!toast.contains(event.target) && event.target !== element) {
            removeToast();
            document.removeEventListener('click', handleOutsideClick);
        }
    }

    // Adding event listeners
    element.addEventListener('mouseleave', () => {
        removalTimeout = setTimeout(removeToast, 1000);
    });
    toast.addEventListener('mouseleave', () => {
        removalTimeout = setTimeout(removeToast, 1000);
    });
    toast.addEventListener('mouseenter', clearRemoveToast);
    document.addEventListener('click', handleOutsideClick);
}
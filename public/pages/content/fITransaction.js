/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

async function tabFiTransaction() {
    

    fiBoxUl = document.createElement('ul');
    fiBoxUl.style.background = 'transparent';
    fiBoxUl.innerHTML += `<h4>FI Transaction</h4>`;

    fiBoxUl.id = 'FIBox';

    checkSavedItemOnStorage();
    
}

async function checkSavedItemOnStorage() {
    
    chrome.storage.local.get(['fiTransactionCheckedItems'], async (result) => {

        if (result.fiTransactionCheckedItems && result.fiTransactionCheckedItems.paymentProcessor) {

            const achProcessor = document.querySelector('#fi-transaction tbody tr:nth-child(3) td:nth-child(2)')?.textContent;

            if(achProcessor) {
                
                if(achProcessor !== '') {
                    fiBoxUl.innerHTML += `<li>Payment: ${achProcessor}</li>`;
                }else {
                    fiBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Payment: not found</li>`;
                }
            }
        }

        if (result.fiTransactionCheckedItems && result.fiTransactionCheckedItems.routing) {

            const routing = document.querySelector('#fi-transaction tbody tr:nth-child(10) td:nth-child(2)')?.textContent;

            if(routing !== '') {
                fiBoxUl.innerHTML += `<li>Routing: ${routing?.trim().substring(0,9)}</li>`
            }else{
                fiBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Routing: not found</li>`
            }
        }

        if (result.fiTransactionCheckedItems && result.fiTransactionCheckedItems.account) {

            const account = document.querySelector('#fi-transaction tbody tr:nth-child(11) td:nth-child(2)')?.textContent;

            if(account !== ''){
                fiBoxUl.innerHTML += `<li>Account: ${account?.trim().substring(0,12)}</li>`;
            }else {
                fiBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Account: not found</li>`;
            }
        }

        if (result.fiTransactionCheckedItems && result.fiTransactionCheckedItems.virtual) {

            const virtualAccount = document.querySelector('#fi-transaction tbody tr:nth-child(13) td:nth-child(2)')?.textContent;

            if(virtualAccount !== ''){
                fiBoxUl.innerHTML += `<li>Virtual account: ${virtualAccount}</li>`
            }else {
                fiBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Virtual account: not found</li>`
            }
        }

        if (result.fiTransactionCheckedItems && result.fiTransactionCheckedItems.guarantee) {

            const isGuaranteed = document.querySelector('#fi-transaction tbody tr:nth-child(21) td:nth-child(2)')?.textContent;

            if(isGuaranteed !== ''){

                fiBoxUl.innerHTML += `<li>Guaranteed?: 
                    <span style="color: red;"> 
                         ${isGuaranteed ? isGuaranteed : "no data"}
                    </span>
                </li>`
            }else {
                fiBoxUl.innerHTML += `<li style="color: #ccc; text-decoration: line-through;">Guaranteed?: <span> no data found}</span></li>`
            }
        }

        if (result.fiTransactionCheckedItems && result.fiTransactionCheckedItems.expectToComplete) {

            const expectToComplete = document.querySelector('#fi-transaction tbody tr:nth-child(19) td:nth-child(2)')?.textContent;
            let expectedDate;
            let daysDifference;
            let message;
        
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

            if(expectToComplete !== ''){
                fiBoxUl.innerHTML += `<li>
                    
                    ${ daysDifference > 0 ?  `Will complete: ${expectToComplete}` : ""}
                    ${expectToComplete ? `<span>${message}</span>` : ""}
                    
                </li>`
            }
        }

        if (result.fiTransactionCheckedItems && result.fiTransactionCheckedItems.ptx) {

            const linkElement = document.querySelector('#fi-transaction tbody tr:nth-child(1) td:nth-child(2) a');
            const fiTransactionId = linkElement?.textContent?.trim();
       
            const copyICon = chrome.runtime.getURL("images/copy.png");
            const poaIcon = chrome.runtime.getURL("images/document.png");

            const globalStyles = {
        
                createPoa: {
                    width: '18px',
                    cursor: 'pointer',
                    opacity: '1',
        
                    ':hover': {
                        opacity: '0.1',
                        border: '2px solid red'
                    }
                }
            };

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

    });
}

function getEmailFromDropdown() {
   
    const userMenu = document.getElementById('user-menu');

    if (userMenu) {
   
        const userMenuText = userMenu.textContent;

        const usernameRegex = /([\w.-]+)\s*$/; 
        const match = userMenuText?.match(usernameRegex);
        const extractedUsername = match ? match[1] : null;

        if (extractedUsername) {
            
            const email = `${extractedUsername}@trustly.com`;

            return email;
        }
    }

    return null;
}

function openTabInServiceWorkerForPOA(URL) {
    
    chrome.runtime.sendMessage({ action: 'createPOAByTable', urlID: URL }, () => {
        toast('success!')
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

function getStyleString(styleObj) {
    return Object.entries(styleObj)
        .map(([prop, value]) => `${prop}: ${value}`)
        .join(';');
}

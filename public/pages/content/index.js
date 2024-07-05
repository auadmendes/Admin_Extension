/* eslint-disable @typescript-eslint/no-unused-vars */
// document.addEventListener('DOMContentLoaded', async () => {
//     await init();
// });

window.onload = async () => {
    await init();
};
/* eslint-disable no-undef */


let transactionBoxUl;
let paymentBoxUl;
let fiBoxUl;
let accountCustomerBoxUl;
let teaID;
let totalAmount = 0;
let amount = 0;
let checkedCount = 0;

const adminCustomersUrl = 'https://trustly.one/admin-console/transactions/customers'

async function init() {
    checkUrlPattern();
    loadGoogleFont();
    createGroup();
    //setTimeout(() => {
        changeLogo();
        merchantDetailsOnTableTransactions();
    //},1000)
    
    transactionTypesDetails();
    //creatingTheBoxInfo();
    styleText();
    addLinkToMerchantReferenceOnTransactionsList();

    createGroupOptionCheckCollections();
    groupActionOptions();
}

//init();


function checkUrlPattern() {
    const urlPath = window.location.pathname;
    if (urlPath.startsWith('/admin-console/transactions/details/')) {
        createDashboard();
    }
}

// Dashboard
async function createDashboard(){

    const divContent = document.querySelector('.col-md-12 div.tab-content');

    if (divContent) {

        chrome.storage.local.get(['paymentCheckedItems'], async (result) => {
            const paymentCheckedItems = result.paymentCheckedItems;
            const hasCheckedItems = Object.values(paymentCheckedItems).some(value => value);
            
            if (hasCheckedItems) {
                
                paymentTab();
                boxContent.append(paymentBoxUl);
            }
        });

        chrome.storage.local.get(['transactionCheckedItems'], async (result) => {
            const transactionCheckedItems = result.transactionCheckedItems;
            const hasCheckedItemsTransaction = Object.values(transactionCheckedItems).some(value => value);

            if (hasCheckedItemsTransaction) {
                //alert('tem transactionCheckedItems' + JSON.stringify(result.transactionCheckedItems.transactionTree))
                tabTransaction();
                boxContent.append(transactionBoxUl);
                
            }
        });
        
        chrome.storage.local.get(['fiTransactionCheckedItems'], async (result) => {
            const fiTransactionCheckedItems = result.fiTransactionCheckedItems;
            const hasCheckedItemsFiTransaction = Object.values(fiTransactionCheckedItems).some(value => value);

            if (hasCheckedItemsFiTransaction) {
                
                tabFiTransaction();
                boxContent.append(fiBoxUl);
                
            }
        });

        chrome.storage.local.get(['customerInfoCheckedItems'], async (result) => {
            const customerInfoCheckedItems = result.customerInfoCheckedItems;
            const hasCheckedItemsCustomerInfo = Object.values(customerInfoCheckedItems).some(value => value);

            if (hasCheckedItemsCustomerInfo) {
                
                tabAccountCustomer();
                boxContent.append(accountCustomerBoxUl);
                
            }
        });
        

        
        const boxContent = document.createElement('div'); 
        
        divContent.parentNode?.insertBefore(boxContent, divContent);

        boxContent.classList.add('boxAgentTools');

    } else {
       // console.error('Element with class "tab-content" not found.');
        return
    }
}
// Dashboard end function

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

            // liCheckTransactions.addEventListener('click', function(event) {
            //     event.preventDefault();

            //     const transactionsArray = ['7591576972', '7708048019', '7725774224', '7748991409', '7622869674', '7749192149', '7729032079', '7749191301']


            //    openTabInServiceWorkerForTransactions(transactionsArray)

            // });

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
       
        return;
    }

    const selectedValues = [];


    selectedRows.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const fiTrxId = row?.querySelector('.viewFiTrxId-col')?.textContent;
        selectedValues.push(fiTrxId);
    });

   
    const selectedValuesString = selectedValues.join(',\n');

    
    navigator.clipboard.writeText(selectedValuesString)
        .then(() => {
            
            toast('Selected PTXs, Copied to clipboard'); 
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
  
    const table = document.getElementById('sortabletable');

    if(table) {

  
    const breakAllTds = Array.from(table.querySelectorAll('tbody tr .break-all'));


    if (breakAllTds.length === 0) {

        console.log('No elements with class "break-all" found.');
        return;
    }


    const breakAllValues = [];


    breakAllTds.forEach(td => {

        if (td.textContent !== null) {
            breakAllValues.push(td.textContent);
        }
    });


    const breakAllValuesString = breakAllValues.join(',\n');

    navigator.clipboard.writeText(breakAllValuesString)
        .then(() => {
            
            toast('All Merchant Ref, Copied to clipboard');
        })
        .catch(error => {
            console.error('Error copying to clipboard:', error);
        });
    }
}

async function addLinkToMerchantReferenceOnTransactionsList() {
    const transactionsTable = document.querySelector('#sortabletable');
  
    if (!transactionsTable) return; 
  
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


function loadGoogleFont() {
  const link1 = document.createElement('link');
  link1.rel = 'preconnect';
  link1.href = 'https://fonts.googleapis.com';
  
  const link2 = document.createElement('link');
  link2.rel = 'preconnect';
  link2.href = 'https://fonts.gstatic.com';
  link2.crossOrigin = 'anonymous';
  
  const link3 = document.createElement('link');
  link3.rel = 'stylesheet';
  link3.href = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';

  const link4 = document.createElement('link');
  link3.rel = 'stylesheet';
  link3.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';
  
  document.head.appendChild(link1);
  document.head.appendChild(link2);
  document.head.appendChild(link3);
  document.head.appendChild(link4);
}

async function styleText() {
    const shortName = document.querySelector('#shortName')

    if(shortName instanceof HTMLElement) {
        shortName.style.fontSize = '18px';
        shortName.style.color = '#0ee06e';
        shortName.style.fontWeight = 'bold';
    }
}


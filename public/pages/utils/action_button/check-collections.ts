async function createGroupOptionCheckCollections() { 
    const group = document.querySelector('.btn-group ul');
    const groupButton = document.querySelector('.btn-group #batch-select')?.textContent?.trim();

    const table = document.getElementById('sortabletable');
    const firstRow = table?.querySelector('tbody tr');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const fingerprint = firstRow?.cells[17]?.textContent?.trim();

    


    const collectionsIcon = chrome.runtime.getURL("images/collections_price.png");

        if(group && groupButton == 'Action') {

            const liPCollections = document.createElement('li');

            liPCollections.innerHTML = `<a title="Use the Person ID" href="#" style="color: #0EA5E9;">
                <img style="width: 20px;" src=${collectionsIcon} />
                <span>Check Collections</span>
            </a>`;


            liPCollections.addEventListener('click', function(event) {
                event.preventDefault();
                const url = new URL(window.location.href);
                const params = url.searchParams;
                const personId = params.get('personId');


                if(personId) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    openTabInServiceWorker(personId);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    toast('Using Person ID' + personId)
                } else if (fingerprint) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    toast('Using Fingerprint' + fingerprint);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    openTabInServiceWorkerCollectionsFingerPrint(fingerprint);
                } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    toast('No ;Person ID or Fingerprint were found. Please use the person ID.')
                }
            });


            group.appendChild(liPCollections);
    
        }
       
}

function copySelectedMerchantReferenceByCollectionsToClipboard() {
    
    const table = document.getElementById('sortabletable');

    if(table) {
    
    const selectedRows = Array.from(table.querySelectorAll('tbody tr input[type="checkbox"]:checked'));
    
    if (selectedRows.length === 0) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
        toast('No rows selected.')
    
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

        const data = `${fiOriginal}  -  ${fiTrxId}  -  ${country === 'US' ? 'USD ' : 'CAD '} ${amount} - created-at ${dateTimeCreated?.substring(0,10)}`;
        const dataCapture = `${transaction}  -  ${fiTrxId}  -  ${country === 'US' ? 'USD ' : 'CAD '} ${amount} - created-at ${dateTimeCreated?.substring(0,10)}`;

        if (trType !== 'Capture') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
            selectedValues.push(data);
        }else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
            selectedValues.push(dataCapture);
        }
    });
    
    const selectedValuesString = selectedValues.join('\n');

    
    navigator.clipboard.writeText(selectedValuesString)
        .then(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
            toast('Merchant Reference - Copied to clipboard'); 
        })
        .catch(error => {
            console.error('Error copying to clipboard:', error);
        });
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
            if (checkbox && checkbox.checked === false) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
                checkbox.checked = true;
                
                // Update the total amount and checked count
                const amountText = row.querySelector('td:nth-child(17)')?.textContent?.trim();
                if (amountText !== undefined) {
                    const amount = parseFloat(amountText.replace(/[^0-9.-]+/g, ''));
                    if (!isNaN(amount)) {
                        totalAmount += amount;
                        checkedCount++;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
                        updateTotalAmount(totalAmount, checkedCount);
                    }
                }
            }
        }

        if (originalTransactionID.textContent?.trim() === transactionId && transactionType.textContent?.trim() === 'Pay') {

            console.log(transactionID, 'é igual a ', transactionId)

            const checkbox = row.querySelector('input[type="checkbox"]');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
            if (checkbox && checkbox.checked === false) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
                checkbox.checked = true;
                
                // Update the total amount and checked count
                const amountText = row.querySelector('td:nth-child(17)')?.textContent?.trim();
                if (amountText !== undefined) {
                    const amount = parseFloat(amountText.replace(/[^0-9.-]+/g, ''));
                    if (!isNaN(amount)) {
                        totalAmount += amount;
                        checkedCount++;
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-expect-error
                        updateTotalAmount(totalAmount, checkedCount);
                    }
                }
            }
        }
    });
    copySelectedMerchantReferenceByCollectionsToClipboard();
}

createGroupOptionCheckCollections();
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
async function groupActionOptions() { 
    const group = document.querySelector('.btn-group ul');
    const groupButton = document.querySelector('.btn-group #batch-select')?.textContent?.trim();

    const poaIcon = chrome.runtime.getURL("images/document.png");

        if (group && groupButton === 'Action') {
            
            const newOption = document.createElement('li');

            newOption.innerHTML = `<a title="Use the Person ID" href="#" style="color: #0EA5E9;">
                <img style="width: 20px;" src=${poaIcon} />
                <span>Generate POA</span>
            </a>`;

            newOption.addEventListener('click', function(event) {
                event.preventDefault();
                createPOA();

            });

            group.appendChild(newOption);
        }
       
}

function createPOA() {
    const table = document.getElementById('sortabletable');
    const groupButton = document.querySelector('.btn-group #batch-select')?.textContent?.trim();

    if (table && groupButton === 'Action') {
        const selectedRows = Array.from(table.querySelectorAll('tbody tr input[type="checkbox"]:checked'));

        if (selectedRows.length === 0) {
            toast('No rows selected.');
            return;
        }

        const selectedValues = [];

        // Iterate through each selected row
        selectedRows.forEach(checkbox => {
            const row = checkbox.closest('tr');
            const fiTrxId = row?.querySelector('.viewFiTrxId-col')?.textContent;
            if (fiTrxId) {
                
                selectedValues.push(fiTrxId.trim());
            }
        });

        // Check if any selected row does not have a ptx value
        const missingPtxValues = selectedRows.some(row => {
            const fiTrxId = row.closest('tr')?.querySelector('.viewFiTrxId-col')?.textContent;
            
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
            //openTabInServiceWorkerForPOA(url);
            createPOAByServiceWorker(url);
            toast('Creating POA from Action Button')

        } else {
            toast('Failed to extract email from dropdown');
        }
    }
}


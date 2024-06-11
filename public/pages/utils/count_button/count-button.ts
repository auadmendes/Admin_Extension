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

async function someAllAmountsOnThePage() { 
    const url = new URL(window.location.href)
 
    if(url.href.startsWith('https://trustly.one/admin-console/transactions/customers')){
        //toast('Aqui' + url.origin)
        return;
    }
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

changeButtonTransactionsPage();
someAllAmountsOnThePage();
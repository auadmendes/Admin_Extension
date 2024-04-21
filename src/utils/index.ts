

export async function downloadKrakenResult() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: function() {
        const tableData = document.getElementById('table-body');
  
        if (tableData) {
          const rows = tableData.querySelectorAll('tr');
          const csvRows: string[] = [];
          const header = 'Customer ID, Transaction ID, Date Time Recovered, Amount Recovered, Collection Status, Result';
  
          csvRows.push(header); // Add the header as the first row
  
          rows.forEach(row => {
            const customerId = row.querySelector('#external_customer_id')?.textContent ?? '';
            const transactionId = row.querySelector('#transaction_id')?.textContent ?? '';
            const recoveryDateTime = row.querySelector('#recovery_datetime')?.textContent ?? '';
            const amount = row.querySelector('#amount_recovered')?.textContent ?? '';
            const collectionStatus = row.querySelector('#collection_status')?.textContent ?? '';
            const result = row.querySelector('#processing_result')?.textContent ?? '';
  
            const csvRow = [customerId, transactionId, recoveryDateTime, amount, collectionStatus, result].join(',');
            csvRows.push(csvRow);
          });
  
          const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement('a');
          link.setAttribute('href', encodedUri);
          link.setAttribute('download', 'Kraken_result.csv');
          document.body.appendChild(link);
          link.click();
        } else {
          console.log('Table body is null');
        }
      },
    });
  }
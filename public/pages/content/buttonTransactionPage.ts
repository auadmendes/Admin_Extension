// async function changeButtonTransactionsPage() {
//     const iconFilter = chrome.runtime.getURL("images/icon_filters.png");
//     const iconColumns = chrome.runtime.getURL("images/icon_check.png");
  
//     const moreFilterA = document.querySelector('#toggle-filters'); // 
//     const moreColumnsA = document.querySelector('#toggle-columns');
  
//     const divElementFilter = document.createElement('div');
//     const divElementColumn = document.createElement('div'); // Create once
  
//     const divWithToggleFilters = document.querySelector('div.form-group:has(a#toggle-filters)');
  
//     if(moreFilterA instanceof HTMLElement) {
//         moreFilterA.style.textDecoration = 'none';
//         moreFilterA.style.color = '#025939';
//     }

//     if (divWithToggleFilters instanceof HTMLDivElement) {
//       divElementFilter.innerHTML = `<img src="${iconFilter}" style="height: 20px; margin-right: 5px;">`;
      
      
  
//       divWithToggleFilters.style.backgroundColor = '#d9ecd3';
//       divWithToggleFilters.style.color = '#fff';
//       divWithToggleFilters.style.display = 'flex';
//       divWithToggleFilters.style.width = '135px';
//       divWithToggleFilters.style.padding = '8px';
//       divWithToggleFilters.style.borderRadius = '4px';
  
//       divWithToggleFilters.insertBefore(divElementFilter, divWithToggleFilters.firstChild);
//     }
  
//     const divWithToggleColumns = document.querySelector('div.form-group:has(a#toggle-columns)');
  
//     if (divWithToggleColumns instanceof HTMLDivElement) {
//       divElementColumn.innerHTML = `<img src="${iconColumns}" style="height: 20px; margin-right: 5px;">`;
      
//       if(moreColumnsA instanceof HTMLElement) {
//         moreColumnsA.style.textDecoration = 'none';
//         moreColumnsA.style.color = '#025939';
//       }
      
//       divWithToggleColumns.style.color = '#fff';
//       divWithToggleColumns.style.display = 'flex';
//       divWithToggleColumns.style.width = '135px';
//       divWithToggleColumns.style.backgroundColor = '#d9ecd3';
//       divWithToggleColumns.style.padding = '8px';
//       divWithToggleColumns.style.borderRadius = '4px';
  
//       divWithToggleColumns.insertBefore(divElementColumn.cloneNode(true), divWithToggleColumns.firstChild);
//     }
//   }
//   changeButtonTransactionsPage();
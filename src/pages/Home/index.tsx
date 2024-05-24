import {  useEffect, useState } from 'react';


import { GrNext } from "react-icons/gr";
//import { GrPrevious } from "react-icons/gr";
import trustlyLogoImage from '../../assets/trustlyGreen.png';
import { Spinner } from '../../components/Spinner';


import { 
  downloadKrakenResult, 
} from '../../utils';

import { Kraken } from '../Kraken';




export function Home() {
  
  const [pageURL, setPageUrl] = useState('');
  const [isKraken, setIsKraken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  


  async function handleDownloadCsv() {
    try {
      setIsLoading(true)
      downloadKrakenResult();
    } catch (error) {
      console.log('catch')
    }finally {
      setIsLoading(false)
    }
  }
  
  async function getPageInfo(): Promise<void> {
    return chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
      
      console.log('Active tab:', tab);

      const url = tab.url;
      
      if(url) {
        setPageUrl(url)
      }

      
    });
  }

  async function handleGetKrakenPage() {
    setIsKraken(!isKraken);
  }

  async function test() {
    console.log('Background script loaded.');

    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      console.log('Tabs in current window:', tabs);
    });
    
    chrome.runtime.onInstalled.addListener(() => {
      console.log('Extension installed.');
    });
    
    chrome.runtime.onMessage.addListener((message) => {
      console.log('Message received:', message);
    });

    console.log('fim')
  }

  async function getDataFromCollections() {
    await chrome.runtime.sendMessage({ action: 'fetchDataFromPage' });
  }

//   function openTabAndExtractData() {
//     const collectionsURL = 'https://trustly.one/admin-console/collections/index/?originalTransactionId=&transactionId=&personId=&customerId=7369294045&customerName=&merchant=&createdAt=&statusCode=&email=&fingerprint=&inWaiting=&startIndex=0&originalStartIndex=0&X-CSRFKey=v0d4d62bdsa61u2taqa8s3fll3';

//     // Function to open a tab and load a URL
//     function openTab(url:, callback) {
//         chrome.tabs.create({ url }, callback);
//     }

//     // Function to extract data from the page
//     function extractDataFromPage() {
//         const tdElements = document.querySelectorAll('td');
//         const tdData = Array.from(tdElements).map(td => td.textContent?.trim());
//         return tdData;
//     }

//     // Function to close a tab by tabId
//     function closeTab(tabId) {
//         chrome.tabs.remove(tabId);
//     }

//     // Open a new tab with the collectionsURL
//     openTab(collectionsURL, (tab) => {
//         const tabId = tab.id;
//         // Inject content script to extract data from the page
//         chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             func: extractDataFromPage
//         }, (results) => {
//             // Extracted data will be in the results array
//             const extractedData = results[0].result;
//             console.log('Extracted Data:', extractedData);
//             // Close the tab after extracting data
//             closeTab(tabId);
//         });
//     });
// }



  useEffect(() => {
    getPageInfo();
    test();
    getDataFromCollections();
   },[])

  return (
      <div className="min-w-80 h-full w-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 
      dark:border-gray-700 p-6 overflow-y-scroll no-scrollbar">

        {isKraken === true ? (<Kraken onClick={handleGetKrakenPage} />):(

        <div className="w-full h-full overflow-y-hidden no-scrollbar">
          <div className='w-full flex justify-between'>
            <a target='_blank' href="https://trustly.okta.com/">
              <img className="w-40" src={trustlyLogoImage} alt="" />
            </a>
            
            <button 
            className='p-2 border-0'
            onClick={handleGetKrakenPage}
            type='button'>
              <GrNext className='dark:text-white text-gray-600'/>
            </button>
          </div>
            
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Extension for <span className='text-trustly ml-1'>Trustly</span> Admin Console
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              This extension gives Admin Console super powers. You can see all status and check transactions directly from the Home page
              and you can copy PTX and M. Reference to create POA.
            </p>
          </div>
          
          <div className='text-gray-500 flex flex-col gap-2 font-light text-sm relative'>
            <div className='absolute top-1.5 -left-3 w-2 h-2 bg-gray-400 rounded-full' />
            <span className='hover:text-gray-400'><span className=''>Developer</span> Luciano Horta</span>
            <div className='flex justify-between'>
              <a className='hover:text-gray-400' href="https://www.linkedin.com/in/luciano-mendes-horta/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className='hover:text-gray-400' href="https://github.com/auadmendes" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>

          <div className='w-full border-[0.2px] border-gray-400 mb-6 mt-6'></div>

          <div className='flex justify-between'>
            <a 
              className='hover:text-gray-400 text-gray-100' 
              href="https://www.linkedin.com/in/luciano-mendes-horta/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
            </a>
            {pageURL === 'https://paywithmybank.com/merchant-portal/reports/merchantCollectionsFile' ? (
              <button
                className='w-full h-9 p-6 flex items-center justify-center bg-green-400 text-green-700 font-bold'
                onClick={handleDownloadCsv}
              >
                {isLoading 
                ? (<Spinner />)
                : (<span>Download</span>)}
              </button>
            ) : (
              <div className="text-white" ></div>
            )}
          </div>
          
        </div>
    )}
      </div>
  );
}


// person id vs url
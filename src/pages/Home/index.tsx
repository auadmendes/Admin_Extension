import { useEffect, useState } from 'react';


import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import trustlyLogoImage from '../../assets/trustlyGreen.png';
import { Spinner } from '../../components/Spinner';

import { downloadKrakenResult } from '../../utils';


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

  function handleGetKrakenPage() {
    setIsKraken(!isKraken);
  }
  
  useEffect(() => {
    getPageInfo();
   },[])

  return (
    <>
      {isKraken ? (
        <div className="max-w-xl w-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 
        dark:border-gray-700 p-6">
            <div className='w-full flex justify-between'>

            <button 
            onClick={handleGetKrakenPage}
            type='button'
            >
              <GrPrevious className='text-white'/>
            </button>
            <a target='_blank' href="https://trustly.okta.com/">
                <img className="w-20" src={trustlyLogoImage} alt="" />
            </a>

            </div>

              <div>

              </div>


        </div>
      ) : (
        <div className="max-w-xl w-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6">
          <div className='w-full flex justify-between'>
            <a target='_blank' href="https://trustly.okta.com/">
              <img className="w-40" src={trustlyLogoImage} alt="" />
            </a>
            
            <button 
            className='p-2 border-0'
            onClick={handleGetKrakenPage}
            type='button'>
              <GrNext className='text-white'/>
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
          <div className='flex gap-1'>

          </div>
      
        </div>
      )}
    </>
  );
}
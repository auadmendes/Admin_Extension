import {  useEffect, useState } from 'react';


import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import trustlyLogoImage from '../../assets/trustlyGreen.png';
import { Spinner } from '../../components/Spinner';
import { FieldBox } from '../../components/FieldBox';

import { 
  downloadKrakenResult, 
  getInputFieldsVisible, 
  getStoredData,
  deleteStoredData
} from '../../utils';

type FieldObject = {
  label: string;
  book_mark: boolean,
  divField: string;
  id: number
};


export function Home() {
  
  const [pageURL, setPageUrl] = useState('');
  const [isKraken, setIsKraken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState<FieldObject[]>()

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

  async function handleGetFields() {
    try {
        const storedData = await getStoredData();
        
        if (storedData && Array.isArray(storedData)) {
            // Sort fields alphabetically by label
            const sortedFields = storedData.slice().sort((a, b) => a.label.localeCompare(b.label));
            setFields(sortedFields);
        } else {
            setFields([]); // Set empty array if no data or incorrect data type
        }
    } catch (error) {
        console.error('Error fetching stored data:', error);
    }
}

  async function handleResetFields(){
    try {
      deleteStoredData();
      await handleGetFields();
    } catch (error) {
      console.log('Error: ', error)
    }
  }
  async function handleMapFields(){
    try {
      setIsLoading(true)
       getInputFieldsVisible();
       handleGetFields();
      //setIsLoading(false);
    } catch (error) {
      console.log('Error: ', error)
    }finally {
      setIsLoading(false)
    }
  }
  

  useEffect(() => {
    getPageInfo();
    //getInputFieldsVisible();
    handleGetFields();
    //deleteStoredData();
   },[])

  return (
    <>
      {isKraken ? (
        <div className="max-w-xl w-[500px] border border-gray-200 rounded-lg shadow bg-white dark:bg-gray-800 
        dark:border-gray-700 p-6 overflow-hidden">
          
          
            <div className='w-full flex justify-between'>
              <button 
              onClick={handleGetKrakenPage}
              type='button'
              >
                <GrPrevious className='dark:text-white text-gray-600'/>
              </button>
              <a target='_blank' href="https://trustly.okta.com/">
                  <img className="w-20" src={trustlyLogoImage} alt="" />
              </a>
            </div>

            <div className='mt-4'>
              {fields 
                ? <h3 className='text-gray-600 text-2xl dark:text-white'>Set fields to display</h3> 
                : <h3 className='text-red-400 text-xl'>Click on the button Map fields to start</h3>
              }
            </div>

              <div className="flex flex-wrap mt-6">
                {fields?.map((item) => {
                  return (
                    <FieldBox 
                    label={item.label} 
                    book_mark={item.book_mark}
                    handleGetFields={handleGetFields}
                    />
                  )
                })}
                <div className='w-full flex items-center gap-3 pl-3 pt-6 border-t border-t-gray-400'>
                  <button
                  onClick={handleMapFields}
                  disabled={!!fields}
                  className={`bg-green-400 text-white p-4 rounded-sm ${fields && fields.length > 0 ? 'disabled:opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {!isLoading ? <span>Map Fields</span> : <Spinner />}
                  </button>

                  <button
                  onClick={handleResetFields}
                  className='bg-red-400 text-white p-4 rounded-sm'
                  >
                  Reset fields
                  </button>
                </div>
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
          {/* <div className='flex gap-1'>
            <button
            onClick={handleGetFields}
            className='bg-slate-400 text-white h-10'>
            GetFields
            </button>
          </div> */}
      
        </div>
      )}
    </>
  );
}
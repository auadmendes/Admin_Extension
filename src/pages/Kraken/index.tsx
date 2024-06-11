import { useEffect, useState } from "react";

import { FieldBox } from '../../components/FieldBox';

import { 
    
    getInputFieldsVisible, 
    getStoredData,
    deleteStoredData
} from '../../utils';
import { Toggle } from '../../components/Toggle';

import { GrPrevious } from "react-icons/gr";
import trustlyLogoImage from '../../assets/trustlyGreen.png';
import { Spinner } from '../../components/Spinner';
import { Columns } from "../../components/Columns";

type FieldObject = {
  label: string;
  book_mark: boolean,
  divField: string;
  id: number
};


type KrakenPageProps = {
    onClick: () => void;
}

export function Kraken({onClick}: KrakenPageProps) {
    const [fields, setFields] = useState<FieldObject[]>();
    const [isLoading, setIsLoading] = useState(false);
    
    function handleReturnHome() {
        onClick();
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
          location.reload();
        } catch (error) {
          console.log('Error: ', error)
        }
      }
      
      async function handleMapFields(){
        try {
          setIsLoading(true)
           getInputFieldsVisible();
           handleGetFields();
           location.reload();
          //setIsLoading(false);
        } catch (error) {
          console.log('Error: ', error)
        }finally {
          setIsLoading(false)
        }
      }
  

      useEffect(() => {
        handleGetFields();
      },[])
      
    return (
        <div className="w-[600px] h-full rounded-lg shadow bg-white 
        dark:bg-gray-800 dark:border-gray-700 p-6">
          
          
            <div className='w-full flex justify-between mb-6'>
              <button 
              className="flex justify-center items-center hover:text-trustly"
               onClick={handleReturnHome}
              type='button'
              >
                <GrPrevious className='dark:text-white text-gray-600 hover:text-trustly'/>
                <span className="text-slate-600 dark:text-white font-medium text-sm hover:text-trustly">Back</span>
              </button>

              <a target='_blank' href="https://trustly.okta.com/">
                  <img className="w-20" src={trustlyLogoImage} alt="" />
              </a>
              <Toggle />  
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

              <Columns />
        </div>
    )
}
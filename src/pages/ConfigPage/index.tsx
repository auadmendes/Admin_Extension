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
import { TableEventsSection } from "../../components/MerchantDetails";
import { PaymentDetails } from "../../components/PaymentDetails";
import { TransactionDetails } from "../../components/TransactionDetails";
import { FiTransactionDetails } from "../../components/FiTransactionDetails";
import { ActionButton } from "../../components/ActionButton";
import { CustomerInfo } from "../../components/CustomerInfo";


type FieldObject = {
  label: string;
  book_mark: boolean,
  divField: string;
  id: number
};


type ConfigPageProps = {
    onClick: () => void;
}

export function ConfigPage({onClick}: ConfigPageProps) {
    const [fields, setFields] = useState<FieldObject[]>();
    const [isLoading, setIsLoading] = useState(false);

    const [isFieldsSectionOpen, setIsFieldsSectionOpen] = useState(false);
    const [isColumnsSectionOpen, setIsColumnsSectionOpen] = useState(false);
    const [isMerchantDetailsOpen, setMerchantDetailsOpen] = useState(false);
    const [isPaymentEventsOpen, setIsPaymentEventsOpen] = useState(false);
    const [isTransactionEventsOpen, setIsTransactionEventsOpen] = useState(false);
    const [isfITransactionEventsOpen, setIsFiTransactionEventsOpen] = useState(false);
    const [isCustomerInfoEventsOpen, setIsCustomerInfoEventsOpen] = useState(false);
    const [isActionButtonEventsOpen, setIsActionButtonEventsOpen] = useState(false);
    
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

    function handleToggleFieldsSection (){
      setIsFieldsSectionOpen(!isFieldsSectionOpen);
    }
  
    function handleToggleColumnsSection () {
      setIsColumnsSectionOpen(!isColumnsSectionOpen);
    }

    function handleToggleMerchantDetailsSection () {
      setMerchantDetailsOpen(!isMerchantDetailsOpen);
    }

    function handleTogglePaymentsSection () {
      setIsPaymentEventsOpen(!isPaymentEventsOpen);
    }

    function handleToggleTransactionSection () {
      setIsTransactionEventsOpen(!isTransactionEventsOpen);
    }
    
    function handleToggleFiTransactionSection () {
      setIsFiTransactionEventsOpen(!isfITransactionEventsOpen);
    }

    function handleToggleCustomerInfoSection () {
      setIsCustomerInfoEventsOpen(!isCustomerInfoEventsOpen);
    }

    function handleToggleActionButtonSection () {
      setIsActionButtonEventsOpen(!isActionButtonEventsOpen);
    }

      useEffect(() => {
        handleGetFields();
      },[])
      
      return (
        <div className="w-[600px] h-full rounded-lg shadow bg-white text-gray-700 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-500 p-6">
          
          <div className='w-full flex justify-between mb-6'>
            <button 
              className="flex justify-center items-center hover:text-trustly"
              onClick={handleReturnHome}
              type='button'
            >
              <GrPrevious className='dark:text-white text-gray-600 hover:text-trustly'/>
              <span className="text-slate-600 dark:text-white font-medium text-sm hover:text-trustly">Back</span>
            </button>
      
            <a target='_blank' href="https://trustly.okta.com/" rel="noopener noreferrer">
              <img className="w-20" src={trustlyLogoImage} alt="Trustly Logo" />
            </a>
            <Toggle />  
          </div>
          {/* <Header /> */}
      
          <div className='mt-4 cursor-pointer' onClick={handleToggleFieldsSection}>
            <h5 className='text-sm'>{isFieldsSectionOpen ? '▼' : '►'} Set Fields to Display</h5>
          </div>
            {isFieldsSectionOpen && (
              <section>
                <div className='mt-4'>
                  {fields 
                    ? <h3 className='text-xl text-trustly'>Choose your fields</h3> 
                    : <h3 className='text-red-400 text-xl'>Click on the button Map fields to start</h3>
                  }
                </div>
                
                <div className="flex flex-wrap mt-6">
                  {fields?.map((item) => (
                    <FieldBox 
                      key={item.label}
                      label={item.label} 
                      book_mark={item.book_mark}
                      handleGetFields={handleGetFields}
                    />
                  ))}
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
              </section>
            )}
          
          <div className='mt-4 cursor-pointer' onClick={handleToggleColumnsSection}>
            <h2 className='text-sm'>{isColumnsSectionOpen ? '▼' : '►'} Columns</h2>
          </div>
            {isColumnsSectionOpen && (
              <section>
                <Columns />
              </section>
            )}
            
          <div className='mt-4 cursor-pointer' onClick={handleToggleMerchantDetailsSection}>
            <h2 className='text-sm'>{isMerchantDetailsOpen ? '▼' : '►'} Table Events</h2>
          </div>
            {isMerchantDetailsOpen && (
              <section>
                <TableEventsSection />
              </section>
            )}

          <h1 className="text-xl text-orange-400 font-bold mb-4 mt-4">Dashboard features</h1>
          <div className='mt-4 cursor-pointer' onClick={handleTogglePaymentsSection}>
            <h2 className='text-sm'>{isPaymentEventsOpen ? '▼' : '►'} Payment Events</h2>
          </div>
            {isPaymentEventsOpen && (
              <section>
                <PaymentDetails />
              </section>
            )}
          {/* <h1 className="text-xl text-orange-400 font-bold mb-4 mt-4">Transaction Details</h1> */}
          <div className='mt-4 cursor-pointer' onClick={handleToggleTransactionSection}>
            <h2 className='text-sm'>{isTransactionEventsOpen ? '▼' : '►'} Transaction Events</h2>
          </div>
            {isTransactionEventsOpen && (
              <section>
                <TransactionDetails />
              </section>
            )}

          <div className='mt-4 cursor-pointer' onClick={handleToggleFiTransactionSection}>
            <h2 className='text-sm'>{isfITransactionEventsOpen ? '▼' : '►'} FI Transaction Events</h2>
          </div>
            {isfITransactionEventsOpen && (
              <section>
                <FiTransactionDetails />
              </section>
            )}

          <div className='mt-4 cursor-pointer' onClick={handleToggleCustomerInfoSection}>
            <h2 className='text-sm'>{isCustomerInfoEventsOpen ? '▼' : '►'} Customer Info Events</h2>
          </div>
            {isCustomerInfoEventsOpen && (
              <section>
                <CustomerInfo />
              </section>
            )}
          <div className='mt-4 cursor-pointer' onClick={handleToggleActionButtonSection}>
            <h2 className='text-sm'>{isActionButtonEventsOpen ? '▼' : '►'} Action Button</h2>
          </div>
            {isActionButtonEventsOpen && (
              <section>
                <ActionButton />
              </section>
            )}

        </div>
      );
  }      
import  { ChangeEvent, useState, useEffect } from 'react';

interface CheckedItems {
    [key: string]: boolean;
}

export function TableEventsSection() {
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

    useEffect(() => {
        chrome.storage.local.get(['checkedItems'], (result) => {
            if (result.checkedItems) {
                setCheckedItems(result.checkedItems);
            }
        });
    }, []);

    useEffect(() => {
        chrome.storage.local.set({ checkedItems });
    }, [checkedItems]);

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;
        setCheckedItems((prevItems) => ({
            ...prevItems,
            [id]: checked
        }));
    };

    return (
        <div className='mt-4 dark:text-white text-gray-600'>
            <div>
                <span className='font-semibold text-xl text-trustly'>Choose functions to use on the Transactions table</span>
            </div>
            <div className="mt-6">
                <div className="flex items-center mb-4">
                    <input 
                        id="trxType" 
                        type="checkbox" 
                        checked={checkedItems.trxType || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="trxType" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Trx Type Details (Click)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input 
                        id="merchantDetails" 
                        type="checkbox" 
                        checked={checkedItems.merchantDetails || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="merchantDetails" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Merchant Details (Mouseover)
                    </label>
                </div>
{/* 
                <div className="flex items-center mb-4">
                    <input 
                        id="transactionDetails" 
                        type="checkbox" 
                        checked={checkedItems.transactionDetails || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="transactionDetails" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Status Transaction Details (Payment Box)
                    </label>
                </div> */}
            </div>
        </div>
    );
}

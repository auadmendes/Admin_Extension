import { ChangeEvent, useState, useEffect } from 'react';

interface CheckedItems {
    [key: string]: boolean;
}

export function FiTransactionDetails() {
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

    useEffect(() => {
        chrome.storage.local.get(['fiTransactionCheckedItems'], (result) => {
            if (result.fiTransactionCheckedItems) {
                setCheckedItems(result.fiTransactionCheckedItems);
            }
        });
    }, []);

    useEffect(() => {
        chrome.storage.local.set({ fiTransactionCheckedItems: checkedItems });
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
                <span className='font-semibold text-xl text-trustly'>Select features to display</span>
            </div>
            <div className="mt-6">
                <div className="flex items-center mb-4">
                    <input 
                        id="paymentProcessor" 
                        type="checkbox" 
                        checked={checkedItems.paymentProcessor || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="paymentProcessor" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Payment Processor (Fi Transaction)
                    </label>
                </div>

                {/* Reverse */}
                <div className="flex items-center mb-4">
                    <input 
                        id="routing" 
                        type="checkbox" 
                        checked={checkedItems.routing || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="routing" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Routing Number (Transaction Details)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input 
                        id="account" 
                        type="checkbox" 
                        checked={checkedItems.account || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="account" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Account Number (Fi Transaction)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input 
                        id="virtual" 
                        type="checkbox" 
                        checked={checkedItems.virtual || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="virtual" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Is Virtual Account (Fi Transaction)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input 
                        id="guarantee" 
                        type="checkbox" 
                        checked={checkedItems.guarantee || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="vip" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Is Guarantee (Fi Transaction)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input 
                        id="expectToComplete" 
                        type="checkbox" 
                        checked={checkedItems.expectToComplete || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="expectToComplete" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Expect to complete date (Fi Transaction)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input 
                        id="ptx" 
                        type="checkbox" 
                        checked={checkedItems.ptx || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="ptx" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        PTX (Fi Transaction)
                    </label>
                </div>



            </div>
        </div>
    );
}
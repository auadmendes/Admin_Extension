import { ChangeEvent, useState, useEffect } from 'react';

interface CheckedItems {
    [key: string]: boolean;
}

export function PaymentDetails() {
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

    useEffect(() => {
        chrome.storage.local.get(['paymentCheckedItems'], (result) => {
            if (result.paymentCheckedItems) {
                setCheckedItems(result.paymentCheckedItems);
            }
        });
    }, []);

    useEffect(() => {
        chrome.storage.local.set({ paymentCheckedItems: checkedItems });
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
                        id="returnsAndFees" 
                        type="checkbox" 
                        checked={checkedItems.returnsAndFees || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="returnsAndFees" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Returns and Fees (Transaction details)
                    </label>
                </div>

                {/* Reverse */}
                <div className="flex items-center mb-4">
                    <input 
                        id="reversed" 
                        type="checkbox" 
                        checked={checkedItems.reversed || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="reversed" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Reversed (Payment Box)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input 
                        id="enrolled" 
                        type="checkbox" 
                        checked={checkedItems.enrolled || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="enrolled" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Enrolled (Payment Box)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input 
                        id="balance" 
                        type="checkbox" 
                        checked={checkedItems.balance || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="balance" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Balance (Payment Box)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input 
                        id="refunded" 
                        type="checkbox" 
                        checked={checkedItems.refunded || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="refunded" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Refunded (Payment Box)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input 
                        id="paid" 
                        type="checkbox" 
                        checked={checkedItems.paid || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="paid" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Paid (Payment Box)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input 
                        id="original" 
                        type="checkbox" 
                        checked={checkedItems.original || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label 
                        htmlFor="original" 
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Original Transaction (Payment Box)
                    </label>
                </div>

            </div>
        </div>
    );
}
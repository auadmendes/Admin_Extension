import { ChangeEvent, useState, useEffect } from 'react';

interface CheckedItems {
    [key: string]: boolean;
}

export function CustomerInfo() {
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

    useEffect(() => {
        chrome.storage.local.get(['customerInfoCheckedItems'], (result) => {
            if (result.customerInfoCheckedItems) {
                setCheckedItems(result.customerInfoCheckedItems);
            }
        });
    }, []);

    useEffect(() => {
        chrome.storage.local.set({ customerInfoCheckedItems: checkedItems });
    }, [checkedItems]);

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;
        setCheckedItems((prevItems) => ({
            ...prevItems,
            [id]: checked,
        }));
    };

    return (
        <div className="mt-4 dark:text-white text-gray-600">
            <div>
                <span className="font-semibold text-xl text-trustly">Select customer fields to display</span>
            </div>
            <div className="mt-6">
                
                <div className="flex items-center mb-4">
                    <input
                        id="customerName"
                        type="checkbox"
                        checked={checkedItems.customerName || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="customerName" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Customer Name (Customer Info details)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        id="customerEmail"
                        type="checkbox"
                        checked={checkedItems.customerEmail || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="customerEmail" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Customer E-mail from merchant  (Customer Info details)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        id="feesLink"
                        type="checkbox"
                        checked={checkedItems.feesLink || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="feesLink" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Fees Link  (Customer Info details)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        id="collectionsLink"
                        type="checkbox"
                        checked={checkedItems.collectionsLink || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="collectionsLink" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Collections Link  (Customer Info details)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        id="transactionsLink"
                        type="checkbox"
                        checked={checkedItems.transactionsLink || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="transactionsLink" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Transactions Link  (Customer Info details)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        id="teaIDLink"
                        type="checkbox"
                        checked={checkedItems.teaIDLink || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="teaIDLink" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    TEA ID Link  (Customer Info details)
                    </label>
                </div>

            </div>
        </div>
    );
}

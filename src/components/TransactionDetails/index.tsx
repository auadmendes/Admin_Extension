import { ChangeEvent, useState, useEffect } from 'react';

interface CheckedItems {
    [key: string]: boolean;
}

export function TransactionDetails() {
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

    useEffect(() => {
        chrome.storage.local.get(['transactionCheckedItems'], (result) => {
            if (result.transactionCheckedItems) {
                setCheckedItems(result.transactionCheckedItems);
            }
        });
    }, []);

    useEffect(() => {
        chrome.storage.local.set({ transactionCheckedItems: checkedItems });
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
                <span className="font-semibold text-xl text-trustly">Select features to display</span>
            </div>
            <div className="mt-6">
                <div className="flex items-center mb-4">
                    <input
                        id="childTransactions"
                        type="checkbox"
                        checked={checkedItems.childTransactions || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="childTransactions" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Child Transactions (Transaction details)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        id="transactionTree"
                        type="checkbox"
                        checked={checkedItems.transactionTree || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="transactionTree" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Transaction Tree (Transaction Details)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        id="returned"
                        type="checkbox"
                        checked={checkedItems.returned || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="returned" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Returned (Transaction Details)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        id="status"
                        type="checkbox"
                        checked={checkedItems.status || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="status" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Status (Transaction Details)
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        id="vip"
                        type="checkbox"
                        checked={checkedItems.vip || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="vip" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Vip (Transaction Details)
                    </label>
                </div>
            </div>
        </div>
    );
}

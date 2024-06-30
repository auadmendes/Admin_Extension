import { ChangeEvent, useState, useEffect } from 'react';

interface CheckedItems {
    [key: string]: boolean;
}

export function ActionButton() {
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

    useEffect(() => {
        chrome.storage.local.get(['actionButtonCheckedItems'], (result) => {
            if (result.actionButtonCheckedItems) {
                setCheckedItems(result.actionButtonCheckedItems);
            }
        });
    }, []);

    useEffect(() => {
        chrome.storage.local.set({ actionButtonCheckedItems: checkedItems });
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
                <span className="font-semibold text-xl text-trustly">Select options to display on Action Button</span>
            </div>
            <div className="mt-6">
                
                <div className="flex items-center mb-4">
                    <input
                        id="checkCollections"
                        type="checkbox"
                        checked={checkedItems.checkCollections || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkCollections" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Check for collections
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        id="generatePoa"
                        type="checkbox"
                        checked={checkedItems.generatePoa || false}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="generatePoa" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Generate POA
                    </label>
                </div>

            </div>
        </div>
    );
}

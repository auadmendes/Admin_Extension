import {  setFieldsToTheFormTransactions, updateInputFieldsBookMark } from "../../utils";


type FieldBoxProps = {
    label: string;
    book_mark: boolean;
    handleGetFields: () => Promise<void>;
};

export function FieldBox({ label, book_mark, handleGetFields }: FieldBoxProps) {

    const handleSetBookmark = async () => {
        try {
            // Call the updateStoredData function with the correct arguments
            await updateInputFieldsBookMark([{ label, book_mark: !book_mark }]);
            console.log('Stored data updated successfully');
            await handleGetFields();
            await setFieldsToTheFormTransactions();
            await refreshCurrentPage();
        } catch (error) {
            console.error('Error updating stored data:', error);
        }
    };

    async function refreshCurrentPage() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length > 0) {
                const currentTab = tabs[0];
                // Check if currentTab.id is defined
                if (currentTab.id !== undefined) {
                    // Reload the current tab
                    chrome.tabs.reload(currentTab.id);
                } else {
                    console.error('Current tab ID is undefined.');
                }
            }
        });
    }

    return (
        <button
            onClick={handleSetBookmark} // Use handleSetBookmark as the onClick handler
            className={`w-auto m-3 transition-all ${book_mark 
            ? 'bg-green-50 text-green-600 hover:bg-green-300 hover:text-green-800 dark:hover:bg-green-300 dark:hover:text-green-900' 
            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-white hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-600 dark:hover:text-gray-50'} p-4 rounded-sm`}
        >
            <span>{label}</span>
        </button>
    );
}

//hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-900 dark:hover:text-gray-100
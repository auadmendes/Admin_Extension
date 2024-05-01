import {  updateInputFieldsBookMark } from "../../utils";


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
        } catch (error) {
            console.error('Error updating stored data:', error);
        }
    };

    return (
        <button
            onClick={handleSetBookmark} // Use handleSetBookmark as the onClick handler
            className={`w-auto m-3 ${book_mark 
            ? 'bg-green-50 text-green-600' 
            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-white'} p-4 rounded-sm`}
        >
            <span>{label}</span>
        </button>
    );
}


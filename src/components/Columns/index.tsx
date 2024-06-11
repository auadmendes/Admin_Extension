import { useEffect, useState } from 'react';
import { getColumnsStored, ColumnData, updateColumnsData } from '../../utils'; // Adjust the import path and updateColumnsData function as needed

export function Columns() {
    const [fields, setFields] = useState<ColumnData[]>([]);

    useEffect(() => {
        async function fetchFields() {
            try {
                const storedData = await getColumnsStored();
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

        fetchFields();
    }, []);

    const handleCheckboxChange = async (fieldId: string, isChecked: boolean) => {
        const updatedFields = fields.map(field =>
            field.inputId === fieldId ? { ...field, inputChecked: isChecked } : field
        );
        setFields(updatedFields);

        try {
            await updateColumnsData(updatedFields); // Save updated fields to storage
            // Reload the page to reflect the changes
            //console.log('0000000000000000 ---', updatedFields)
            //window.location.reload();
        } catch (error) {
            console.error('Error updating columns data:', error);
        }
    };

    return (
        <div className='mt-14 dark:text-white text-gray-600'>
            <div>
                <span className='font-semibold text-2xl'>Select columns to fix</span>
            </div>
            <div className='mt-4'>
                {fields.map(field => (
                    <div key={field.inputId}>
                        <label className={field.inputChecked ? 'text-trustly' : 'dark:text-white text-gray-600'}>
                            <input
                                className='mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
                                focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 
                                dark:bg-gray-700 dark:border-gray-600'
                                type="checkbox"
                                name={field.inputName}
                                id={field.inputId}
                                checked={field.inputChecked}
                                onChange={(e) => handleCheckboxChange(field.inputId, e.target.checked)}
                            />
                            {field.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

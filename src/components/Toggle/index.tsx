import { useEffect, useState } from "react";

export function Toggle(){
    const [isDarkMode, setIsDarkMode] = useState(false);

    function handleLightDarkMode() {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        chrome.storage.local.set({ 'isDark': newIsDarkMode }, function () {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
            }
    
            // Get the current tab
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
        });
    }
    
    

    useEffect(() => {
        chrome.storage.local.get('isDark', function (result) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }

            const isDark = result.isDark;
            if (isDark !== undefined) {
                setIsDarkMode(isDark); // Update state if value is defined
            } else {
                // Value not set, default to false and save to storage
                setIsDarkMode(false);
                chrome.storage.local.set({ 'isDark': false });
            }
        });
    }, []);

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input 
                onClick={handleLightDarkMode}
                type="checkbox" 
                checked={isDarkMode} // Use checked prop to reflect state
                className="sr-only peer" 
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
            peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
            dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
            after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
            after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {isDarkMode ? 'Admin Dark': 'Admin Light'} {/* Simplified conditional rendering */}
            </span>
        </label>
    );
}

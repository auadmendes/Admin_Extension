function toast(message) {
    
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;

    
    document.body.appendChild(toast);

    
    void toast.offsetWidth;

    // Show the toast
    toast.style.opacity = "1";

    // Remove after seconds
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.remove();
        }, 500); 
    }, 2000); 
}
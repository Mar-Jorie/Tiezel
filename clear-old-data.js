// Script to clear old content data from localStorage
// Run this in the browser console to immediately clear old data

console.log('Clearing old content data from localStorage...');

// Clear the old content
localStorage.removeItem('landingPageContent');

console.log('Old content data cleared! The page will now use default data.');
console.log('Please refresh the page to see the changes.');

// Optional: Auto-refresh the page
// window.location.reload();

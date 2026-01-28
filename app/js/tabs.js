
function openTab(tabName) {
    // Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.add('hidden');
    });

    // Remove active style from all buttons (Visual cleanup)
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-white/20', 'text-white');
        btn.classList.add('text-gray-300');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
    }

    // Highlight the clicked button (Simple logic finding button by onclick attribute match or you can use IDs)
    // For simplicity in this structure, we let the hover state do the heavy lifting, 
    // but you can add active-class logic here easily.
}

// Initialize Home
document.addEventListener('DOMContentLoaded', () => {
    openTab('home');
});
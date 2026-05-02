function showTab(tabId) {
    // Hide all sections
    const sections = document.querySelectorAll('.tab-pane');
    sections.forEach(s => s.classList.remove('active'));
    
    // Show selected section
    document.getElementById(tabId).classList.add('active');
    
    // Update button colors
    const buttons = document.querySelectorAll('.bottom-tabs button');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const clickCountElement = document.getElementById('clickCount');
    
    let clickCount = 0;
    
    clickButton.addEventListener('click', () => {
        clickCount++;
        clickCountElement.textContent = clickCount;
    });
});
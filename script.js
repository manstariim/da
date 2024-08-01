document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const clickCountElement = document.getElementById('clickCount');
    const upgradeMenuButton = document.getElementById('upgradeMenuButton');
    const upgradeMenu = document.getElementById('upgradeMenu');
    const autoClickerButton = document.getElementById('autoClickerButton');
    const doubleClickButton = document.getElementById('doubleClickButton');

    let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
    let clickValue = 1;
    let autoClickerActive = localStorage.getItem('autoClickerActive') === 'true';
    let doubleClickActive = localStorage.getItem('doubleClickActive') === 'true';

    if (doubleClickActive) {
        clickValue = 2;
    }

    clickCountElement.textContent = clickCount;

    clickButton.addEventListener('click', () => {
        clickCount += clickValue;
        clickCountElement.textContent = clickCount;
        localStorage.setItem('clickCount', clickCount);
    });

    upgradeMenuButton.addEventListener('click', () => {
        upgradeMenu.classList.toggle('hidden');
    });

    autoClickerButton.addEventListener('click', () => {
        if (clickCount >= 50 && !autoClickerActive) {
            clickCount -= 50;
            clickCountElement.textContent = clickCount;
            localStorage.setItem('clickCount', clickCount);
            autoClickerActive = true;
            localStorage.setItem('autoClickerActive', 'true');
            setInterval(() => {
                clickCount += clickValue;
                clickCountElement.textContent = clickCount;
                localStorage.setItem('clickCount', clickCount);
            }, 1000);
        }
    });

    doubleClickButton.addEventListener('click', () => {
        if (clickCount >= 100 && !doubleClickActive) {
            clickCount -= 100;
            clickCountElement.textContent = clickCount;
            localStorage.setItem('clickCount', clickCount);
            doubleClickActive = true;
            clickValue = 2;
            localStorage.setItem('doubleClickActive', 'true');
        }
    });

    if (autoClickerActive) {
        setInterval(() => {
            clickCount += clickValue;
            clickCountElement.textContent = clickCount;
            localStorage.setItem('clickCount', clickCount);
        }, 1000);
    }
});
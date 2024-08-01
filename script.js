document.addEventListener('DOMContentLoaded', () => {
    const hamster = document.getElementById('hamster');
    const clickCountElement = document.getElementById('clickCount');
    const upgradeMenuButton = document.getElementById('upgradeMenuButton');
    const upgradeMenu = document.getElementById('upgradeMenu');
    const autoClickerButton = document.getElementById('autoClickerButton');
    const doubleClickButton = document.getElementById('doubleClickButton');
    const cancelAutoClickerButton = document.getElementById('cancelAutoClickerButton');

    let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
    let clickValue = 1;
    let autoClickerActive = localStorage.getItem('autoClickerActive') === 'true';
    let doubleClickActive = localStorage.getItem('doubleClickActive') === 'true';
    let autoClickerInterval;

    if (doubleClickActive) {
        clickValue = 2;
    }

    clickCountElement.textContent = clickCount;

    hamster.addEventListener('click', () => {
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
            autoClickerInterval = setInterval(() => {
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

    cancelAutoClickerButton.addEventListener('click', () => {
        if (autoClickerActive && clickCount >= 25) {
            clickCount -= 25;
            clickCountElement.textContent = clickCount;
            localStorage.setItem('clickCount', clickCount);
            clearInterval(autoClickerInterval);
            autoClickerActive = false;
            localStorage.setItem('autoClickerActive', 'false');
            clickCount += 10;
            clickCountElement.textContent = clickCount;
            localStorage.setItem('clickCount', clickCount);
        }
    });

    if (autoClickerActive) {
        autoClickerInterval = setInterval(() => {
            clickCount += clickValue;
            clickCountElement.textContent = clickCount;
            localStorage.setItem('clickCount', clickCount);
        }, 1000);
    }
});

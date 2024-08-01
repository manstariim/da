document.addEventListener('DOMContentLoaded', () => {
    const hamster = document.getElementById('hamster');
    const clickCountElement = document.getElementById('clickCount');
    const cpsElement = document.getElementById('cps');
    const criticalClicksElement = document.getElementById('criticalClicks');
    const comboBonusElement = document.getElementById('comboBonus');
    const upgradeMenuButton = document.getElementById('upgradeMenuButton');
    const upgradeMenu = document.getElementById('upgradeMenu');
    const autoClickerButton = document.getElementById('autoClickerButton');
    const doubleClickButton = document.getElementById('doubleClickButton');
    const cancelAutoClickerButton = document.getElementById('cancelAutoClickerButton');
    const superClickButton = document.getElementById('superClickButton');

    let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
    let clickValue = 1;
    let autoClickerActive = localStorage.getItem('autoClickerActive') === 'true';
    let doubleClickActive = localStorage.getItem('doubleClickActive') === 'true';
    let autoClickerInterval;
    let clickHistory = [];
    let superClickActive = false;
    let criticalClicks = parseInt(localStorage.getItem('criticalClicks')) || 0;
    let comboBonus = parseInt(localStorage.getItem('comboBonus')) || 0;
    let comboCount = 0;

    if (doubleClickActive) {
        clickValue = 2;
    }

    clickCountElement.textContent = clickCount;
    criticalClicksElement.textContent = criticalClicks;
    comboBonusElement.textContent = comboBonus;

    hamster.addEventListener('click', () => {
        hamster.classList.add('shake');
        setTimeout(() => hamster.classList.remove('shake'), 500);

        const isCritical = Math.random() < 0.1;  // 10% вероятность критического клика
        const earnedClicks = isCritical ? clickValue * 10 : clickValue;

        clickCount += earnedClicks;
        clickCountElement.textContent = clickCount;
        localStorage.setItem('clickCount', clickCount);

        if (isCritical) {
            criticalClicks += 1;
            criticalClicksElement.textContent = criticalClicks;
            localStorage.setItem('criticalClicks', criticalClicks);
            showCriticalEffect();
        }

        comboCount += 1;
        if (comboCount % 10 === 0) {
            comboBonus += 10;  // Бонус за каждые 10 последовательных кликов
            comboBonusElement.textContent = comboBonus;
            localStorage.setItem('comboBonus', comboBonus);
        }

        clickHistory.push(Date.now());
        clickHistory = clickHistory.filter(timestamp => Date.now() - timestamp < 1000);
        cpsElement.textContent = clickHistory.length;
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

    superClickButton.addEventListener('click', () => {
        if (clickCount >= 200 && !superClickActive) {
            clickCount -= 200;
            clickCountElement.textContent = clickCount;
            localStorage.setItem('clickCount', clickCount);
            superClickActive = true;
            clickValue *= 10;  // Увеличение стоимости клика
            setTimeout(() => {
                clickValue /= 10;  // Возвращение к нормальному значению через 30 секунд
                superClickActive = false;
            }, 30000);
        }
    });

    if (autoClickerActive) {
        autoClickerInterval = setInterval(() => {
            clickCount += clickValue;
            clickCountElement.textContent = clickCount;
            localStorage.setItem('clickCount', clickCount);
        }, 1000);
    }

    function showCriticalEffect() {
        const effect = document.createElement('div');
        effect.textContent = 'Критический клик!';
        effect.className = 'critical';
        document.body.appendChild(effect);
        const hamsterRect = hamster.getBoundingClientRect();
        effect.style.left = `${hamsterRect.left + hamsterRect.width / 2}px`;
        effect.style.top = `${hamsterRect.top}px`;
        setTimeout(() => document.body.removeChild(effect), 1000);
    }
});
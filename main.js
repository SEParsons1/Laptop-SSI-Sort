let hideTimeout;

function handleInput() {
    const input = document.getElementById('myInput');
    let value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    value = value.slice(-3);
    input.value = value;
    if (value.length === 3) {
        displayArea(value);
    } else {
        const fullscreen = document.getElementById('fullscreen');
        fullscreen.style.display = 'none';
        clearTimeout(hideTimeout);
    }
}

function displayArea(postalCode) {
    const fullscreen = document.getElementById('fullscreen');
    const area = areas[postalCode] || "NOT ON LIST!";
    fullscreen.textContent = area;
    fitText();
    fullscreen.style.display = 'flex';
    speak(area);
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        fullscreen.style.display = 'none';
    }, 3000);
}

function fitText() {
    const fullscreen = document.getElementById('fullscreen');
    let fontSize = 280;
    fullscreen.style.fontSize = fontSize + 'px';
    const bodyWidth = document.body.clientWidth;
    while (fullscreen.scrollWidth > bodyWidth && fontSize > 0) {
        fontSize--;
        fullscreen.style.fontSize = fontSize + 'px';
    }
    if (fontSize > 0) {
        fontSize -= 5;
        fullscreen.style.fontSize = fontSize + 'px';
    }
}

function speak(text) {
    if (!window.speechSynthesis) {
        console.log('Text-to-speech not supported.');
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

function toggleFullscreen() {
    const fullscreen = document.getElementById('fullscreen');
    fullscreen.style.display = 'none';
    clearTimeout(hideTimeout);
}

// Focus management for barcode scanner compatibility
document.addEventListener("click", function(event) {
    const input = document.getElementById("myInput");
    if (event.target !== input) {
        input.focus();
    }
});

document.addEventListener("blur", function(event) {
    if (event.target === document.getElementById("myInput")) {
        setTimeout(() => event.target.focus(), 10);
    }
}, true);

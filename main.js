function handleInput() {
    const input = document.getElementById('myInput');
    let value = input.value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    if (value.length > 3) {
        value = value.slice(-1);
    }
    input.value = value;
    const fullscreen = document.getElementById('fullscreen');
    if (value.length === 3) {
        displayArea(value);
    } else {
        fullscreen.style.display = 'none';
    }
}

function displayArea(postalCode) {
    const fullscreen = document.getElementById('fullscreen');
    const area = areas[postalCode] || "NOT ON LIST!";
    fullscreen.textContent = area;
    fitText();
    fullscreen.style.display = 'flex';
    speak(area);
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
}

// Prevent text selection in the input field
const input = document.getElementById('myInput');

// Block selection start
input.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Clear any selection that occurs
input.addEventListener('select', function() {
    window.getSelection().removeAllRanges();
});

// Prevent dragging from starting a selection
input.addEventListener('mousedown', function(e) {
    if (e.button === 0) { // Left mouse button
        e.preventDefault();
        input.focus(); // Ensure the input remains focusable
    }
});

// Focus management for barcode scanner compatibility
document.addEventListener("click", function(event) {
    if (event.target !== input) {
        input.focus();
    }
});

document.addEventListener("blur", function(event) {
    if (event.target === input) {
        setTimeout(() => event.target.focus(), 10);
    }
}, true);

// Adjust text size on window resize
window.addEventListener('resize', function() {
    const fullscreen = document.getElementById('fullscreen');
    if (fullscreen.style.display === 'flex') {
        fitText();
    }
});

// Security enhancements
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('copy', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
    }
});

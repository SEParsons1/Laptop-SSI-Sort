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
    const areaText = document.getElementById('areaText');
    const area = areas[postalCode] || "NOT ON LIST!";
    areaText.textContent = area;
    fitText();
    document.getElementById('fullscreen').style.display = 'flex';
    speak(area);
}

function fitText() {
    const areaText = document.getElementById('areaText');
    let fontSize = 1000; // Start large to find the maximum size
    areaText.style.fontSize = fontSize + 'px';
    const bodyWidth = window.innerWidth;
    const bodyHeight = window.innerHeight;
    let rect = areaText.getBoundingClientRect();
    while ((rect.width > bodyWidth || rect.height > bodyHeight) && fontSize > 0) {
        fontSize--;
        areaText.style.fontSize = fontSize + 'px';
        rect = areaText.getBoundingClientRect();
    }
    if (fontSize > 0) {
        fontSize -= 5; // Apply the 5px buffer
        areaText.style.fontSize = fontSize + 'px';
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

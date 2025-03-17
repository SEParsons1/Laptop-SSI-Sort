function handleInput() {
    const input = document.getElementById('myInput');
    // Clean input: remove non-alphanumeric characters and convert to uppercase
    let value = input.value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    
    // If length exceeds 3, replace the entire input with the last character
    if (value.length > 3) {
        value = value.slice(-1);
    }
    
    // Update the input field with the cleaned and processed value
    input.value = value;
    
    // Show overlay if exactly 3 characters; hide otherwise
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

// Enhancement: Adjust text size on window resize
window.addEventListener('resize', function() {
    const fullscreen = document.getElementById('fullscreen');
    if (fullscreen.style.display === 'flex') {
        fitText();
    }
});

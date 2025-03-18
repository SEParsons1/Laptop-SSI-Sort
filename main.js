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
    
    // Put text in the fullscreen overlay
    fullscreen.textContent = area;

    // Make sure the fullscreen is visible *before* we measure/resize
    fullscreen.style.display = 'flex';

    // Now do the actual font-sizing
    fitText();

    // Speak the text
    speak(area);
}

// Adjusts font to the maximum size that fits within the window
function fitText() {
    const fullscreen = document.getElementById('fullscreen');
    
    // We’ll do a binary search to find the largest font size that fits
    let minSize = 10;
    let maxSize = 3000;
    let bestFit = minSize;

    while (minSize <= maxSize) {
        let midSize = Math.floor((minSize + maxSize) / 2);
        fullscreen.style.fontSize = midSize + 'px';
        
        // Force a reflow by reading scrollWidth/scrollHeight
        const tooWide  = fullscreen.scrollWidth  > window.innerWidth;
        const tooTall  = fullscreen.scrollHeight > window.innerHeight;

        if (tooWide || tooTall) {
            // If it's too big, try smaller
            maxSize = midSize - 1;
        } else {
            // It fits, so remember this size and try bigger
            bestFit = midSize;
            minSize = midSize + 1;
        }
    }

    // After the loop, 'bestFit' is the largest size that worked
    fullscreen.style.fontSize = bestFit + 'px';
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

// Security enhancements
// Disable right-click context menu completely
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Prevent copying of any text
document.addEventListener('copy', function(e) {
    e.preventDefault();
});

// Prevent CTRL-A (select all) everywhere
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
    }
});

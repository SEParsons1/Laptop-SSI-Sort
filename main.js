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

function toggleFullscreen() {
    const fullscreen = document.getElementById('fullscreen');
    fullscreen.style.display = 'none';
}

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

window.addEventListener('resize', function() {
    const fullscreen = document.getElementById('fullscreen');
    if (fullscreen.style.display === 'flex') {
        fitText();
    }
});

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

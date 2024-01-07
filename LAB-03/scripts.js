
const map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
const userLocationMarker = L.marker([0, 0]).addTo(map);
shuffleTiles();

function getUserLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;


                userLocationMarker.setLatLng([lat, lon]);
                map.setView([lat, lon], 13);

                alert(`Lokalizacja : ${lat}, ${lon}`);
            },
            (error) => {
                console.error(`Error getting location: ${error.message}`);
                alert("Błąd Lokalizacji.");
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    } else {
        alert("Geolocation is not supported by your browser");
    }
}
const myLocationButton = document.getElementById("my-location-button");
myLocationButton.addEventListener("click", getUserLocation);

const downloadMapButton = document.getElementById("download-map-button");


function allowDrop(event) {
    event.preventDefault();
    var dropTarget = event.target;

    if (dropTarget.tagName === 'TD') {
        dropTarget.classList.add('drag-over');
    }
}

function dragLeave(event) {
    var dropTarget = event.target;

    if (dropTarget.tagName === 'TD') {
        dropTarget.classList.remove('drag-over');
    }
}
var draggedElement;

function drag(event) {
    draggedElement = event.target;
    event.dataTransfer.setData('text', draggedElement.outerHTML);
    event.dataTransfer.setDragImage(draggedElement, 0, 0);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData('text');
    var dropTarget = event.target;

    if (dropTarget.tagName === 'IMG') {
        // Jeśli elementem docelowym jest już obrazek, zamień je miejscami
        var draggedImageCopy = new Image();
        draggedImageCopy.src = data.match(/src="([^"]+)"/)[1];
        draggedImageCopy.width = 100;
        draggedImageCopy.height = 100;

        dropTarget.parentElement.replaceChild(draggedImageCopy, dropTarget);
    } else if (draggedElement && dropTarget.tagName === 'TD') {
        var draggedImageCopy = new Image();
        draggedImageCopy.src = data.match(/src="([^"]+)"/)[1];
        draggedImageCopy.width = 100;
        draggedImageCopy.height = 100;

        dropTarget.classList.remove('drag-over');
        dropTarget.appendChild(draggedImageCopy);
    }

    draggedElement = null;

    checkPuzzle(); //nie działa
}

var tiles = document.querySelectorAll('.tile');
tiles.forEach(function (tile) {
    tile.addEventListener('dragstart', drag);
});

document.addEventListener('DOMContentLoaded', function () {
    var puzzleCells = document.querySelectorAll('#puzzle-table td');
    var tiles = document.querySelectorAll('.tile');
    tiles.forEach(function (tile) {
        tile.addEventListener('dragstart', drag);
    });
    puzzleCells.forEach(function (cell) {
        cell.addEventListener('dragover', allowDrop);
        cell.addEventListener('dragenter', allowDrop);
        cell.addEventListener('dragleave', dragLeave);
        cell.addEventListener('drop', drop);
    });
});

function checkPuzzle() {
    var puzzleCells = document.querySelectorAll('#puzzle-table td');
    var correctOrder = true;

    puzzleCells.forEach(function (cell, index) {
        var img = cell.querySelector('img');
        
        if (img) {
            // Pobierz nazwę pliku z pełnej ścieżki
            var expectedSrc = (index + 1) + '.png';
            var imgFileName = img.src.split('/').pop(); // Wydobywanie nazwy pliku

            if (imgFileName !== expectedSrc) {
                correctOrder = false;
            }
        } else {
            // Kafelka nie ma jeszcze w tej komórce
            correctOrder = false;
        }
        console.log("moved : "+ imgFileName );
        console.log("expected : "+ expectedSrc);
        console.log('');
    });

    if (correctOrder) {
        console.log('Gratulacje!');
        alert('Gratulacje!');
    }else{
        console.log('nie są');
    }
}


function shuffleTiles() {
    var tilesContainer = document.getElementById('tiles');
    var tiles = Array.from(tilesContainer.children);

    tiles.sort(function () {
        return 0.5 - Math.random();
    });

    tilesContainer.innerHTML = "";
    tiles.forEach(function (tile) {
        tilesContainer.appendChild(tile);
    });
}
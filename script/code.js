//Create Grid
const settings = {
    gridSize: 16,
    gridToggled: false,
    rainbow: false,
    grayScale: false,
    colorMode: true,
    color: 'red',

    changeMode(mode){
        if (this[mode]) {
            [this.rainbow, this.grayScale, this.colorMode,] = 
            [false, false, true]
        } else {
            [this.rainbow, this.grayScale, this.colorMode,] = 
            [false, false, false]
            this[mode] = !this[mode]
        }
    }
}

renderGrid();

function renderGrid(){
    drawGrid();
    addSquareListeners();
    if (settings.gridToggled) toggleGridLines();
}

function drawGrid(){
    const gridContainer = document.querySelector('.grid-container');
    let gridHtml = '';
    for (let i = 0; i < settings.gridSize; i++){
        gridHtml += `<div class='square-container grid-${i}'>`
        
        for (let j = 0; j < settings.gridSize; j++){
            gridHtml += `\n<div class="grid-square"></div>`;
        }
        gridHtml += `</div>\n`   
    }
    gridContainer.innerHTML = gridHtml;
}

function addSquareListeners(){
    const gridSquares = document.querySelectorAll('.grid-square')
    gridSquares.forEach( node => {
        node.addEventListener('mouseenter', () => {
            setColour(node);
        })
    })
}

function setColour(node){
    if (settings.rainbow){
        node.style['background-color'] = getRandomHexColour();
    } else if (settings.grayScale) {

    } else if (settings.colorMode) {
        node.style['background-color'] = settings.color;
    }
}

const rainbowButton = document.querySelector('.rainbow-button')
rainbowButton.addEventListener('click',()=>{
    settings.changeMode('rainbow');
    rainbowButton.classList.toggle('toggled-button');
})

function toggleRainbowMode(){

}

function getRandomHexColour(){
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}


const gridSizeButton = document.querySelector('.grid-size-js')
gridSizeButton.addEventListener('click', () => {
    gridSizeButton.classList.toggle('toggled-button');

    // Timeout added so you can see bugged is toggled for duration of prompt
    setTimeout( () => {
        let userGridChoice = +prompt('Please enter a whole number between 1 and 100', 16)
        while(isNaN(userGridChoice) || userGridChoice > 100 || userGridChoice < 1){
            userGridChoice = +prompt('Please enter a number between 1 and 100!');
        }
        gridSize = Math.floor(userGridChoice);
        renderGrid();
        gridSizeButton.classList.toggle('toggled-button');
    }, 5)

})


function toggleGridLines(){
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach(square => square.classList.toggle('square-borders'));
}

const toggleGridButton = document.querySelector('.toggle-grid')
toggleGridButton.addEventListener('click',() => {
    toggleGridLines();
    settings.gridToggled = !settings.gridToggled;
    toggleGridButton.classList.toggle('toggled-button');
})
//Create Grid
const settings = {
    gridSize: 16,
    gridToggled: false,
    colorMode: true,
    color: 'rgb(255,255,0)', //basic colour
    eraser: false,
    rainbow: false,
    grayScale: false,
    defaultGrayColor: 'rgb(225,225,225)',
    dim: 15, //amount to reduce contrast
    lightMode: false,
    defaultLightenColor: 'rgb(255,255,255)',
    lighten: 15, //amount to increase contrast

    changeMode(mode, buttonNode){
        const buttons = document.querySelectorAll('.mode-group');
        buttons.forEach(button => button.classList.remove('toggled-button'));
        if (this[mode]) {
            [this.eraser, this.rainbow, this.grayScale, this.lightMode, this.colorMode] = 
            [false, false, false, false, true];
        } else {
            [this.eraser, this.rainbow, this.grayScale, this.lightMode, this.colorMode,] = 
            [false, false, false, false, false];
            this[mode] = !this[mode];
            buttonNode.classList.toggle('toggled-button');
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
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach( node => {
        node.addEventListener('mouseenter', () => {
            node.style.backgroundColor = getColour(node);
        })
    })
}

const gridSizeButton = document.querySelector('.grid-size-js');
gridSizeButton.addEventListener('click', () => {
    gridSizeButton.classList.toggle('toggled-button');

    // Timeout added so you can see bugged is toggled for duration of prompt
    setTimeout( () => {
        let userGridChoice = +prompt('Please enter a whole number between 1 and 100', 16)
        while(isNaN(userGridChoice) || userGridChoice > 100 || userGridChoice < 1){
            userGridChoice = +prompt('Please enter a number between 1 and 100!');
        }
        settings.gridSize = Math.floor(userGridChoice);
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




function getColour(node){
    const bgColour = node.style.backgroundColor;
    if (settings.rainbow){
        return getRandomHexColour();
    } else if (settings.grayScale) {
        if (!bgColour) { 
            return settings.defaultGrayColor
        } else {
            return dimColor(bgColour);
        }
    } else if (settings.lightMode) {
        if (!bgColour) { 
            return settings.defaultLightenColor
        } else {
            return lightenColor(bgColour);
        }
    } else if (settings.eraser) {
        return ''; //assign bgColour as nothing
    } else if (settings.colorMode) {
        return settings.color;
    }
}

const rainbowButton = document.querySelector('.rainbow-button');
rainbowButton.addEventListener('click',()=>{
    settings.changeMode('rainbow', rainbowButton);
})

function getRandomHexColour(){
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

const grayScaleButton = document.querySelector('.gray-mode-button');
grayScaleButton.addEventListener('click', () => {
    settings.changeMode('grayScale', grayScaleButton);
})

function dimColor(rgbColour){
    const colourSplit = rgbColour.split(',');
    const red = colourSplit[0].substr(4, 3);
    const green = colourSplit[1];
    const blue = colourSplit[2].slice(0,-1);
    return `rgb(${red-settings.dim},${green-settings.dim},${blue-settings.dim})`
}


const lightButton = document.querySelector('.light-mode-button');
lightButton.addEventListener('click', () => {
    settings.changeMode('lightMode',lightButton);
})

function lightenColor(rgbColour){
    const colourSplit = rgbColour.split(',');
    const red = colourSplit[0].substr(4, 3);
    const green = colourSplit[1];
    const blue = colourSplit[2].slice(0,-1);
    return `rgb(${+red+settings.lighten},${+green+settings.lighten},${+blue+settings.lighten})`
}

const eraserButton = document.querySelector('.eraser-button');
eraserButton.addEventListener('click', () => {
    settings.changeMode('eraser',eraserButton);
})
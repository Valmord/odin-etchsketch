//Create Grid
let gridSize = 16;
let gridToggled = false;
renderGrid();

function renderGrid(){
    drawGrid();
    addSquareListeners();
    if (gridToggled) toggleGridLines();
}

function drawGrid(){
    const gridContainer = document.querySelector('.grid-container');
    let gridHtml = '';
    for (let i = 0; i < gridSize; i++){
        gridHtml += `<div class='square-container grid-${i}'>`
        
        for (let j = 0; j < gridSize; j++){
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
            node.classList.add('sketched')
        })
    })
}

function toggleGridLines(){
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach(square => square.classList.toggle('square-borders'));
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

const toggleGridButton = document.querySelector('.toggle-grid')
toggleGridButton.addEventListener('click',() => {
    toggleGridLines();
    gridToggled = !gridToggled;
    toggleGridButton.classList.toggle('toggled-button');
})
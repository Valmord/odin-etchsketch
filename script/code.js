//Create Grid
const gridSize = 16;
const gridContainer = document.querySelector('.container');

let gridHtml = '';
for (let i = 0; i < gridSize; i++){
    gridHtml += `<div class='grid-container grid-${i}'>`
    
    for (let j = 0; j < gridSize; j++){
        gridHtml += `\n<div class="grid-square"></div>`;
    }
    gridHtml += `</div>\n`
    
}

gridContainer.innerHTML = gridHtml;

const gridSquares = document.querySelectorAll('.grid-square')
gridSquares.forEach( node => {
    node.addEventListener('mouseenter', () => {
        node.classList.add('sketched')
    })
})
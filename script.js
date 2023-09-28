const board = document.querySelector('.container');
const display = document.querySelector('.display')
const cells = [
    "", "", "", "", "", "", "", "", ""
]

let start = 'X';
display.textContent = "X-Player Starts First";

function createBoard(){
    cells.forEach((cell, index) => {
        const cellElements = document.createElement('div')
        cellElements.classList.add('square')
        cellElements.id = index
        cellElements.addEventListener('click',oPlayer)
        board.append(cellElements)
    })
}

createBoard()

function oPlayer(e) {
    const goDisplay = document.createElement('p')
    goDisplay.classList.add(start)
    goDisplay.innerText = start
    e.target.append(goDisplay)
    start = start === 'X'? 'O': 'X'
    display.textContent = `${start} Player's Turn Now`
    e.target.removeEventListener('click',oPlayer)
    scoreCheck()
}

function scoreCheck() {
    const sqCells = document.querySelectorAll('.square')
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(array =>{
        const circleWins = array.every(cell =>
            sqCells[cell].firstChild?.classList.contains('O'))

        if (circleWins) {
            display.textContent = 'Circle Wins!'
            sqCells.forEach(square => square.replaceWith(square.cloneNode('O')))
            return
        }
    })
    
    winningCombos.forEach(array =>{
        const crossWins = array.every(cell =>
            sqCells[cell].firstChild?.classList.contains('X'))

        if (crossWins) {
            display.textContent = 'Cross Wins!'
            sqCells.forEach(square => square.replaceWith(square.cloneNode('X')))
            return
        }
    })
}
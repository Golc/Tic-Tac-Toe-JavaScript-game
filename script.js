
const PLAYER_X_CLASS = 'x'
const PLAYER_0_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_0_Turn 


startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    isPlayer_0_Turn = false
    cellElements.forEach(cell => {
        cell.classList.remove(PLAYER_X_CLASS)
        cell.classList.remove(PLAYER_0_CLASS)
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')

}

function handleCellClick(e) {
    const cell = e.target
    const currentClass = isPlayer_0_Turn ? PLAYER_0_CLASS : PLAYER_X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a draw!"
    } else {
        winningMessageTextElement.innerText = ` ${isPlayer_0_Turn ? "O's" : "x's"} wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return[...cellElements].every(cell => {
        return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_0_CLASS)
    })
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	isPlayer_0_Turn = !isPlayer_0_Turn
}

function setBoardHoverClass() {
    boardElement.classList.remove(PLAYER_X_CLASS)
    boardElement.classList.remove(PLAYER_0_CLASS)
    if (isPlayer_0_Turn) {
        boardElement.classList.add(PLAYER_0_CLASS)
    } else {
        boardElement.classList.add(PLAYER_X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}




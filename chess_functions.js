
const chessBoard = ['R8','A8','B8','C8','D8','E8','F8','G8','H8',
                    'R7','A7','B7','C7','D7','E7','F7','G7','H7',
                    'R6','A6','B6','C6','D6','E6','F6','G6','H6',
                    'R5','A5','B5','C5','D5','E5','F5','G5','H5',
                    'R4','A4','B4','C4','D4','E4','F4','G4','H4',
                    'R3','A3','B3','C3','D3','E3','F3','G3','H3',
                    'R2','A2','B2','C2','D2','E2','F2','G2','H2',
                    'R1','A1','B1','C1','D1','E1','F1','G1','H1',
                    'R0','A0','B0','C0','D0','E0','F0','G0','H0'];

const chessBoardClasses = ['rowHeader','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare',
                           'rowHeader','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare',
                           'rowHeader','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare',
                           'rowHeader','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare',
                           'rowHeader','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare',
                           'rowHeader','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare',
                           'rowHeader','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare',
                           'rowHeader','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare',
                           'rowHeader','columnFooter','columnFooter','columnFooter','columnFooter','columnFooter','columnFooter','columnFooter','columnFooter'];

const piecesLocation = [['blackARook', 'blackBKnight','blackCBishop','blackQueen','blackKing','blackFBishop','blackGKnight','blackHRook'],
                        ['blackAPawn','blackBPawn','blackCPawn','blackDPawn','blackEPawn','blackFPawn','blackGPawn','blackHPawn'],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        ['whiteAPawn','whiteBPawn','whiteCPawn','whiteDPawn','whiteEPawn','whiteFPawn','whiteGPawn','whiteHPawn'],
                        ['whiteARook', 'whiteBKnight','whiteCBishop','whiteQueen','whiteKing','whiteFBishop','whiteGKnight','whiteHRook']]

var chessBoardObject = [];
for (let i=0; i<chessBoard.length; i++) {
  chessBoardObject[i] = {
    name: chessBoard[i],
    classType: chessBoardClasses[i],
    isHighlighted: false,
  }
}

const allSquares = document.querySelectorAll('td') //includes row references
var blackPieces = document.querySelectorAll('blackPiece') //all black pieces
var whitePieces = document.querySelectorAll('whitePiece') //all white pieces

var whiteTurn = true;
var currentSetOfPieces; //this variable will adjust depending on who's turn it is


function createSquareListeners() {
  for (let i=0; i < allSquares.length; i++) {
    allSquares[i].addEventListener("dblclick", highlightSquare);
    allSquares[i].addEventListener("dblclick", highlightSquare);
  }
}

function highlightSquare() {
  let selectedSquareIndex = getSelectedSquareId();
  let selectedSquareClass = getSelectedSquareClass();
  for (let i = 0; i<chessBoardObject.length; i++) {
    if (chessBoardObject[i].isHighlighted) {
      chessBoardObject[i].classType == 'whiteSquare' ? allSquares[i].style.backgroundColor = 'floralwhite' : allSquares[i].style.backgroundColor = 'darkslategrey';
      chessBoardObject[i].isHighlighted = false;
      if (i == selectedSquareIndex) {
        return;
      }
    }
  }
  if (chessBoardObject[selectedSquareIndex].isHighlighted && selectedSquareClass == 'whiteSquare') {
    allSquares[selectedSquareIndex].style.backgroundColor = 'floralwhite';
    chessBoardObject[selectedSquareIndex].isHighlighted = false;
  } else if (chessBoardObject[selectedSquareIndex].isHighlighted && selectedSquareClass == 'darkSquare') {
      allSquares[selectedSquareIndex].style.backgroundColor = 'darkslategrey';
      chessBoardObject[selectedSquareIndex].isHighlighted = false;
  } else if (selectedSquareClass == 'whiteSquare'){
    allSquares[selectedSquareIndex].style.backgroundColor = 'ffffa8';
    chessBoardObject[selectedSquareIndex].isHighlighted = true;
  } else if (selectedSquareClass == 'darkSquare'){
    allSquares[selectedSquareIndex].style.backgroundColor = '748A6D';
    chessBoardObject[selectedSquareIndex].isHighlighted = true;
  }
}

function getSelectedSquareId() {
  let selectedSquareId = event.target.id
  return chessBoard.indexOf(selectedSquareId)
}

function getSelectedSquareClass() {
  let selectedSquareClass = event.target.className
  return selectedSquareClass;
}

createSquareListeners();

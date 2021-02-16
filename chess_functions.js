
const chessBoard = ['R8','A8','B8','C8','D8','E8','F8','G8','H8',
                    'R7','A7','B7','C7','D7','E7','F7','G7','H7',
                    'R6','A6','B6','C6','D6','E6','F6','G6','H6',
                    'R5','A5','B5','C5','D5','E5','F5','G5','H5',
                    'R4','A4','B4','C4','D4','E4','F4','G4','H4',
                    'R3','A3','B3','C3','D3','E3','F3','G3','H3',
                    'R2','A2','B2','C2','D2','E2','F2','G2','H2',
                    'R1','A1','B1','C1','D1','E1','F1','G1','H1',
                    'R0','A0','B0','C0','D0','E0','F0','G0','H0'];

const piecesLocation = [['blackARook', 'blackBKnight','blackCBishop','blackQueen','blackKing','blackFBishop','blackGKnight','blackHRook'],
                        ['blackAPawn','blackBPawn','blackCPawn','blackDPawn','blackEPawn','blackFPawn','blackGPawn','blackHPawn'],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        [null, null, null, null, null, null, null, null],
                        ['whiteAPawn','whiteBPawn','whiteCPawn','whiteDPawn','whiteEPawn','whiteFPawn','whiteGPawn','whiteHPawn'],
                        ['whiteARook', 'whiteBKnight','whiteCBishop','whiteQueen','whiteKing','whiteFBishop','whiteGKnight','whiteHRook']]

const allSquares = document.querySelectorAll('td') //includes row references
var blackPieces = document.querySelectorAll('blackPiece') //all black pieces
var whitePieces = document.querySelectorAll('whitePiece') //all white pieces

var whiteTurn = true;
var currentSetOfPieces; //this variable will adjust depending on who's turn it is

function createPieceListeners() {
  //for (let i =0; i<blackPieces.length; i++) {
  //  blackPieces[i].addEventListener("click", highlight(blackPieces[i]));
  //  whitePieces[i].addEventListener("click", highlight(whitePieces[i]));
  //}
  for (let i=0; i < allSquares.length; i++) {
    allSquares[i].addEventListener("dblclick", highlightSquare);
    allSquares[i].addEventListener("dblclick", highlightSquare);
  }
}

function highlightSquare() {
  let selectedSquare = getSelectedSquare();
  allSquares[selectedSquare].style.backgroundColor = 'Red'
}

function getSelectedSquare() {
  let selectedSquareId = event.target.id
  return chessBoard.indexOf(selectedSquareId)
}

createPieceListeners();


const chessBoard = ['R8','A8','B8','C8','D8','E8','F8','G8','H8',
                    'R7','A7','B7','C7','D7','E7','F7','G7','H7',
                    'R6','A6','B6','C6','D6','E6','F6','G6','H6',
                    'R5','A5','B5','C5','D5','E5','F5','G5','H5',
                    'R4','A4','B4','C4','D4','E4','F4','G4','H4',
                    'R3','A3','B3','C3','D3','E3','F3','G3','H3',
                    'R2','A2','B2','C2','D2','E2','F2','G2','H2',
                    'R1','A1','B1','C1','D1','E1','F1','G1','H1',
                    'R0','A0','B0','C0','D0','E0','F0','G0','H0'];

const chessBoardClasses = ['rowHeader','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare',
                           'rowHeader','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare',
                           'rowHeader','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare',
                           'rowHeader','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare',
                           'rowHeader','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare',
                           'rowHeader','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare',
                           'rowHeader','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare',
                           'rowHeader','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare','darkSquare','whiteSquare',
                           'rowHeader','columnFooter','columnFooter','columnFooter','columnFooter','columnFooter','columnFooter','columnFooter','columnFooter'];

const piecesLocation = [null,'blackARook', 'blackBKnight','blackCBishop','blackQueen','blackKing','blackFBishop','blackGKnight','blackHRook',
                        null,'blackAPawn','blackBPawn','blackCPawn','blackDPawn','blackEPawn','blackFPawn','blackGPawn','blackHPawn',
                        null,null, null, null, null, null, null, null, null,
                        null,null, null, null, null, null, null, null, null,
                        null,null, null, null, null, null, null, null, null,
                        null,null, null, null, null, null, null, null, null,
                        null,'whiteAPawn','whiteBPawn','whiteCPawn','whiteDPawn','whiteEPawn','whiteFPawn','whiteGPawn','whiteHPawn',
                        null,'whiteARook', 'whiteBKnight','whiteCBishop','whiteQueen','whiteKing','whiteFBishop','whiteGKnight','whiteHRook']

const blackPieces = ['blackAPawn','blackBPawn','blackCPawn','blackDPawn','blackEPawn','blackFPawn','blackGPawn','blackHPawn','blackARook', 'blackBKnight','blackCBishop','blackQueen','blackKing','blackFBishop','blackGKnight','blackHRook']
const whitePieces = ['whiteAPawn','whiteBPawn','whiteCPawn','whiteDPawn','whiteEPawn','whiteFPawn','whiteGPawn','whiteHPawn','whiteARook', 'whiteBKnight','whiteCBishop','whiteQueen','whiteKing','whiteFBishop','whiteGKnight','whiteHRook']

var chessBoardObjects = [];
for (let i=0; i<chessBoard.length; i++) {
  chessBoardObjects[i] = {
    name: chessBoard[i],
    classType: chessBoardClasses[i],
    isHighlighted: false,
  }
}

var blackPiecesObjects = [];
for (let i=0; i<blackPieces.length; i++) {
  blackPiecesObjects[i] = {
    name: blackPieces[i],
    element: document.getElementById(blackPieces[i]),
    currLocation: piecesLocation.indexOf(blackPieces[i]),
    onBoard: true,
    type: document.getElementById(blackPieces[i]).className,
  }
}

var whitePiecesObjects = [];
for (let i=0; i<whitePieces.length; i++) {
  whitePiecesObjects[i] = {
    name: whitePieces[i],
    element: document.getElementById(whitePieces[i]),
    currLocation: piecesLocation.indexOf(whitePieces[i]),
    onBoard: true,
    type: document.getElementById(whitePieces[i]).className,
  }
}

const allSquares = document.querySelectorAll('td') //includes row references

var whiteTurn = true;

function createSquareListeners() {
  for (let i=0; i < allSquares.length; i++) {
    allSquares[i].addEventListener("click", highlightSquare);
    if (allSquares[i].className != "rowHeader" && allSquares[i].className != "columnFooter") {
      allSquares[i].addEventListener("dragover", dragoverHandler);
      allSquares[i].addEventListener("drop", dropHandler);
    }
  }
  for(let i=0; i<blackPiecesObjects.length; i++){
    whitePiecesObjects[i].element.addEventListener("dragstart", dragstartHandler);
    whitePiecesObjects[i].element.addEventListener("dragend", dragendHandler);
    // use 'drop' later whitePiecesObjects[i].element.addEventListener("drop", )
    blackPiecesObjects[i].element.addEventListener("dragstart", dragstartHandler);
    blackPiecesObjects[i].element.addEventListener("dragend", dragendHandler);

  }
}

function highlightSquare() {
  let selectedId = event.target.id;
  let selectedClass = event.target.className;
  let selectedSquareIndex = chessBoard.indexOf(selectedId);  // CURRENT ISSUE IS TRYING TO HIGHLIGHT SQUAURE AND CLICK PIECE
  if (selectedClass != 'whiteSquare' && selectedClass != 'darkSquare' && selectedClass != 'rowHeader' && selectedClass != 'columnFooter') {
    selectedSquareIndex = piecesLocation.indexOf(selectedId)
    selectedClass = chessBoardClasses[selectedSquareIndex];
    selectedId = chessBoard[selectedSquareIndex]
  }
  for (let i = 0; i<chessBoardObjects.length; i++) {
    if (chessBoardObjects[i].isHighlighted) {
      chessBoardObjects[i].classType == 'whiteSquare' ? allSquares[i].style.backgroundColor = 'floralwhite' : allSquares[i].style.backgroundColor = 'darkslategrey';
      chessBoardObjects[i].isHighlighted = false;
      if (i == selectedSquareIndex) {
        return;
      }
    }
  }
  if (chessBoardObjects[selectedSquareIndex].isHighlighted && selectedClass == 'whiteSquare') {
    allSquares[selectedSquareIndex].style.backgroundColor = 'floralwhite';
    chessBoardObjects[selectedSquareIndex].isHighlighted = false;
  } else if (chessBoardObjects[selectedSquareIndex].isHighlighted && selectedClass == 'darkSquare') {
      allSquares[selectedSquareIndex].style.backgroundColor = 'darkslategrey';
      chessBoardObjects[selectedSquareIndex].isHighlighted = false;
  } else if (selectedClass == 'whiteSquare'){
    allSquares[selectedSquareIndex].style.backgroundColor = 'ffffa8';
    chessBoardObjects[selectedSquareIndex].isHighlighted = true;
  } else if (selectedClass == 'darkSquare'){
    allSquares[selectedSquareIndex].style.backgroundColor = '748A6D';
    chessBoardObjects[selectedSquareIndex].isHighlighted = true;
  }
}

function dragstartHandler() {
  highlightSquare();
  let selectedPiece = event.target.id;
  event.dataTransfer.setData("piece", event.target.id);
  event.effectAllowed = "move";
}

function dragendHandler() {
  event.dataTransfer.clearData();
}

function dragoverHandler() {
  event.preventDefault();
}

function dropHandler(ev) {
  event.preventDefault();
  var id = event.dataTransfer.getData("piece");
  var target = event.target;
  var squareTarget = target;
  if (target.className != 'whiteSquare' && target.className != 'darkSquare') {
    squareTarget = target.parentElement;
    console.log(squareTarget)
  }
  if (isMoveAllowed(target, id)) {
    updatePieceLocation(target, id);
    if (squareTarget.hasChildNodes()) {
      squareTarget.removeChild(squareTarget.firstElementChild);
    }
    squareTarget.appendChild(document.getElementById(id));
    highlightSquare()
  } else {
      noMoveOccurs();
  }
}

function isMoveAllowed() {
  return true; //true for right now for testing
}

function updatePieceLocation(square, piece) {
  let pieceIndex;
  if (piece.includes('black')) {
    pieceIndex = blackPieces.indexOf(piece);
    blackPiecesObjects[pieceIndex].currLocation = square.id
  } else {
    pieceIndex = whitePieces.indexOf(piece);
    whitePiecesObjects[pieceIndex].currLocation = square.id
  }
}



function noMoveOccurs() {
  return null; //for now, implement later

}


createSquareListeners();

//Use enPassant with previous moves
//completely isolate utils away from game
//set variables at the start, take update board out of main and do something new
//game over variable
//all draws:
/* The threefold repetition rule states that if a game reaches the same position three times, a draw can be claimed. 
A position is repeated if all pieces of the same kind and color are on identical squares, and all possible moves are the same. */

//50 move rule - 50 moves without pushing a pawn or capturing a piece
//Need to add if pawn gets to the 7th rank
//This is added, bug for when the pawn takes a piece on the 7th rank
class Game {
	passedPawn() {
		//mostly works(bug is recorded)
		if (this.r2 === 0 && this.board[this.r1][this.c1] === utils.wP) {
			this.board[this.r1][this.c1] = utils.wQ;
			board.removeImage2(this.r2 * 100, this.c2 * 100);
			board.addImage(this.c2 * 100, this.r2 * 100, "piece/wQueen.png");
			board.testRun();
		}
		if (this.r2 === 7 && this.board[this.r1][this.c1] === utils.bP) {
			this.board[this.r1][this.c1] = utils.bQ;
			board.removeImage2(this.r2 * 100, this.c2 * 100);
			board.addImage(this.c2 * 100, this.r2 * 100, "piece/bQueen.png");
			board.testRun();
		}
	}

	recordMoves(move) {
		this.previousMoves.push(move);
	}

	recordPieces() {
		this.blackPieces = [];
		this.whitePieces = [];
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				let whiteObj = new Object();
				let blackObj = new Object();
				if (this.board[i][j] >= utils.wK && this.board[i][j] <= utils.wR) {
					whiteObj.value = this.board[i][j];
					whiteObj.x = i;
					whiteObj.y = j;
					this.whitePieces.push(whiteObj);
				}
				if (this.board[i][j] >= utils.bK && this.board[i][j] <= utils.bR) {
					blackObj.value = this.board[i][j];
					blackObj.x = i;
					blackObj.y = j;
					this.blackPieces.push(blackObj);
				}
			}
		}
	}
	deadPosition() {
		if (this.whitePieces.length === 1) {
			if (this.whitePieces[0].value === utils.wK) {
				this.whiteDP = true;
				//console.log("White only has king");
			}
		} else if (this.whitePieces.length <= 2) {
			if (
				(this.whitePieces[0].value === utils.wK ||
					this.whitePieces[1].value === utils.wK) &&
				(this.whitePieces[0].value === utils.wB ||
					this.whitePieces[1].value === utils.wB)
			) {
				this.wBishopDP = true;
				//console.log("White only has king and bishop");
			} else if (
				(this.whitePieces[0].value === utils.wK ||
					this.whitePieces[1].value === utils.wK) &&
				(this.whitePieces[0].value === utils.wB ||
					this.whitePieces[1].value === utils.wB)
			) {
				this.whiteDP = true;
				//console.log("White only has king and knight");
			}
		}
		if (this.blackPieces.length === 1) {
			if (this.blackPieces[0].value === utils.bK) {
				this.blackDP = true;
				//console.log("Black only has king");
			}
		} else if (this.blackPieces.length <= 2) {
			if (
				(this.blackPieces[0].value === utils.bK ||
					this.blackPieces[1].value === utils.bK) &&
				(this.blackPieces[0].value === utils.bB ||
					this.blackPieces[1].value === utils.bB)
			) {
				this.bBishopDP = true;
				//console.log("Black only has king and bishop");
			} else if (
				(this.blackPieces[0].value === utils.bK ||
					this.blackPieces[1].value === utils.bK) &&
				(this.blackPieces[0].value === utils.bN ||
					this.blackPieces[1].value === utils.bN)
			) {
				this.blackDP = true;
				//console.log("Black only has king and knight");
			}
		}
		//
		if (
			(this.whiteDP && this.blackDP) ||
			(this.whiteDP && this.bBishopDP) ||
			(this.wBishopDP && this.blackDP)
		) {
			board.gameState.innerHTML = "Game State: Draw";
		} else if (this.bBishopDP && this.wBishopDP) {
			let whiteSQ = false;
			let blackSQ = false;
			const bDraw = piece => {
				console.log(this.blackPieces);
				if (
					(piece.x % 2 === 0 && piece.y % 2 === 0) ||
					(piece.x % 2 === 1 && piece.y % 2 === 1)
				) {
					blackSQ = true;
					console.log(piece, "is black");
				} else {
					whiteSQ = true;
					console.log(piece, "is white");
				}
			};
			if (this.whitePieces[0].value === utils.wB) {
				bDraw(this.whitePieces[0]);
			} else {
				bDraw(this.whitePieces[1]);
			}
			if (this.blackPieces[0].value === utils.bB) {
				bDraw(this.blackPieces[0]);
			} else {
				bDraw(this.blackPieces[1]);
			}
			if (whiteSQ && !blackSQ) {
				board.gameState.innerHTML = "Game State: Draw";
			} else if (blackSQ && !whiteSQ) {
				board.gameState.innerHTML = "Game State: Draw";
			}
		}
		//add bishop rule
	}
	threeFold() {}
	fiftyMove() {
		this.moveCount++;
		if (
			this.board[this.r1][this.c1] === utils.wP ||
			this.board[this.r1][this.c1] === utils.bP
		) {
			//console.log("Reset movecountx");
			this.moveCount = 0;
		}
		if (this.board[this.r2][this.c2] > 0) {
			//console.log("Reset movecount");
			this.moveCount = 0;
		}
		if (this.moveCount === 50) {
			this.draw = true;
		}
	}

	constructor() {
		this.board = [
			[0, 0, 0, 0, 7, 0, 0, 0],
			[0, 2, 0, 10, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 4, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 0],
		];

		// this.board = [
		// 	[12, 11, 10, 9, 7, 10, 11, 12],
		// 	[8, 8, 8, 8, 8, 0, 0, 8],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[2, 2, 2, 0, 0, 2, 2, 2],
		// 	[6, 5, 4, 3, 1, 0, 0, 6],
		// ];

		//change the names of these
		// this.wKingCheck = [
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// ];
		// this.bKingCheck = [
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0],
		// ];
		this.takePiece = false;

		this.listOfMoves = [];
		this.previousMoves = [];
		this.blackPieces = [];
		this.whitePieces = [];
		this.moveString = "";

		this.wOrB = true;

		this.r1;
		this.c1;
		this.r2;
		this.c2;

		this.wKingInCheck = false;
		this.bKingInCheck = false;

		this.gameOver = false;
		this.draw = false;
		this.whiteDP = false;
		this.blackDP = false;
		this.wBishopDP = false;
		this.bBishopDP = false;

		this.moveCount = 0;

		//enPassant
		this.enPassant = false;
		this.pR1 = 0;
		this.pC1 = 0;
		this.pR2 = 0;
		this.pC2 = 0;
		this.rSave = 0;
		this.cSave = 0;
		//castling
		this.wLeftKingRookMoves = false;
		this.wRightKingRookMoves = false;
		this.bLeftKingRookMoves = false;
		this.bRightKingRookMoves = false;
		this.wKingMoves = false;
		this.bKingMoves = false;

		// this.wRightCastle = false;
		// this.wLeftCastle = false;
		// this.bRightCastle = false;
		// this.bLeftCastle = false;
	}

	startGame() {
		playerInput.addEventListeners();
		board.imageFinder();
		const gameLoop = () => {
			board.ctx.clearRect(0, 0, board.canvas.width, board.canvas.height);
			board.testLoad();
			window.setTimeout(gameLoop, board.intervalTime);
		};
		gameLoop();
		board.testRun();
		utils.listOfMovesFunc(this.board, this.listOfMoves, this.wOrB);
		board.updateScreen();
	}

	boardMain(move) {
		this.r1 = parseInt(move.substring(2, 3));
		this.c1 = parseInt(move.substring(3, 4));
		this.r2 = parseInt(move.substring(4, 5));
		this.c2 = parseInt(move.substring(5, 6));

		this.specialMoveChecker(move);
		this.moveChecker(this.pR1, this.pR2, this.pC1);

		if (this.board[this.r2][this.c2] > 0) {
			this.takePiece = true;
		}
		this.recordMoves(this.moveString);
		this.fiftyMove(); //draw function

		this.board[this.r2][this.c2] = this.board[this.r1][this.c1];
		this.board[this.r1][this.c1] = 0;

		this.valueTracker(); //castle function

		this.recordPieces(); //draw function
		this.deadPosition(); //draw function
		// if (this.wRightCastle) {
		// 	this.wRightCastle = false;
		// }
		// if (this.wLeftCastle) {
		// 	this.wLeftCastle = false;
		// }
		// if (this.bRightCastle) {
		// 	this.bRightCastle = false;
		// }
		// if (this.bLeftCastle) {
		// 	this.bLeftCastle = false;
		// }
		if (this.enPassant) {
			this.enPassant = false;
			this.board[this.rSave][this.cSave] = 0;
		}

		if (this.wOrB === true) {
			this.wOrB = false;
			board.turn.innerHTML = "Current Turn: Black";
		} else {
			this.wOrB = true;
			board.turn.innerHTML = "Current Turn: White";
		}

		//this.startGame(this.r1, this.r2, this.c1);
		utils.listOfMovesFunc(
			this.board,
			this.listOfMoves,
			this.wOrB,
			this.r1,
			this.r2,
			this.c1
		);
		board.updateScreen();

		if (game.listOfMoves.length === 0) {
			game.wKingCheckFinder();
			game.bKingCheckFinder();
			if (game.wKingInCheck === true) {
				board.gameState.innerHTML = "Game State: Black Wins";
			} else if (game.bKingInCheck === true) {
				board.gameState.innerHTML = "Game State: White Wins";
			} else {
				game.draw = true;
				board.gameState.innerHTML = "Game State: Draw";
			}
		}

		this.pR1 = this.r1;
		this.pC1 = this.c1;
		this.pR2 = this.r2;
		this.pC2 = this.c2;
	}
	specialMoveChecker(move) {
		if (move.substring(0, 1) === "C") {
			if (move.substr(1, 1) === utils.wK.toString() && !this.wKingMoves) {
				if (move.substr(5, 1) === "2" && !this.wLeftKingRookMoves) {
					this.board[7][0] = 0;
					this.board[7][3] = utils.wR;
					board.removeImage(0 * 100, 7 * 100);
					board.addImage(3 * 100, 7 * 100, "piece/wRook.png");
					board.testRun();
				}
				if (move.substr(5, 1) === "6" && !this.wRightKingRookMoves) {
					this.board[7][7] = 0;
					this.board[7][5] = utils.wR;
					board.removeImage(7 * 100, 7 * 100);
					board.addImage(5 * 100, 7 * 100, "piece/wRook.png");
					board.testRun();
				}
			}
			if (move.substr(1, 1) === utils.bK.toString() && !this.bKingMoves) {
				if (move.substr(5, 1) === "2" && !this.bLeftKingRookMoves) {
					this.board[0][0] = 0;
					this.board[0][3] = utils.bR;
					board.removeImage(0 * 100, 0 * 100);
					board.addImage(3 * 100, 0 * 100, "piece/bRook.png");
					board.testRun();
				}
				if (move.substr(5, 1) === "6" && !this.bRightKingRookMoves) {
					this.board[0][7] = 0;
					this.board[0][5] = utils.bR;
					board.removeImage(7 * 100, 0 * 100);
					board.addImage(5 * 100, 0 * 100, "piece/bRook.png");
					board.testRun();
				}
			}
		}

		this.passedPawn();
	}
	moveChecker(pR1, pR2, pC1) {
		// Very important
		let value = this.board[this.r1][this.c1].toString();
		if (
			(value === utils.wK.toString() || value === utils.bK.toString()) &&
			Math.abs(this.c1 - this.c2) === 2
		) {
			value = "C" + value;
		}
		//
		if (value === utils.wP.toString()) {
			value = this.enP(-1, pR1, pR2, pC1, 2, value, 3);
			value = this.enP(+1, pR1, pR2, pC1, 2, value, 3);
		}
		if (value === utils.bP.toString()) {
			value = this.enP(-1, pR1, pR2, pC1, -2, value, 4);
			value = this.enP(+1, pR1, pR2, pC1, -2, value, 4);
		}

		if (value.length === 1) {
			value = "0" + value;
		}
		//Move this
		this.moveString = value.concat(this.r1, this.c1, this.r2, this.c2);
	}

	enP(pos, pR1, pR2, pC1, wOrB, value, wOrB2) {
		if (
			this.c2 === this.c1 + pos &&
			this.r1 === wOrB2 &&
			pC1 === this.c1 + pos &&
			this.r1 === pR1 + wOrB &&
			this.r1 === pR2
		) {
			value = "P" + value;
			this.enPassant = true;
			this.rSave = this.r1;
			this.cSave = this.c1 + pos;
		}
		return value;
	}

	wKingCheckFinder() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.board[i][j] === utils.wK && utils.bKingCheck[i][j] > 0) {
					this.wKingInCheck = true;
					return;
				} else {
					this.wKingInCheck = false;
				}
			}
		}
	}

	bKingCheckFinder() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (this.board[i][j] === utils.bK && utils.wKingCheck[i][j] > 0) {
					this.bKingInCheck = true;
					return;
				} else {
					this.bKingInCheck = false;
				}
			}
		}
	}

	valueTracker() {
		if (this.board[7][4] !== utils.wK && !this.wKingMoves) {
			this.wKingMoves = true;
		}
		if (this.board[7][0] !== utils.wR && !this.wLeftKingRookMoves) {
			this.wLeftKingRookMoves = true;
		}
		if (this.board[7][7] !== utils.wR && !this.wRightKingRookMoves) {
			this.wRightKingRookMoves = true;
		}
		if (this.board[0][4] !== utils.bK && !this.bKingMoves) {
			this.bKingMoves = true;
		}
		if (this.board[0][0] !== utils.bR && !this.bLeftKingRookMoves) {
			this.bLeftKingRookMoves = true;
		}
		if (this.board[0][7] !== utils.bR && !this.bRightKingRookMoves) {
			this.bRightKingRookMoves = true;
		}
	}
}

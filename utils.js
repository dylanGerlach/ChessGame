class Utils {
	constructor() {
		this.wR = 6;
		this.wN = 5;
		this.wB = 4;
		this.wQ = 3;
		this.wK = 1;
		this.wP = 2;
		this.bP = 8;
		this.bR = 12;
		this.bN = 11;
		this.bB = 10;
		this.bQ = 9;
		this.bK = 7;

		this.moveStop = false;
		this.checkStop = false;
		this.wKingCheck = [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
		];
		this.bKingCheck = [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
		];
	}

	listOfMovesFunc(board, list, wOrB, pR1, pR2, pC1) {
		this.changeCheckedSquares(board);

		list.length = 0; //reset list
		if (wOrB === true) {
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					if (board[i][j] === this.wP) {
						this.#wPawnMoveFiller(board, i, j, list, pR1, pR2, pC1);
					}
					if (board[i][j] === this.wN) {
						this.#knightMoveFiller(board, i, j, list);
					}
					if (board[i][j] === this.wR) {
						this.#rookMoveFiller(board, i, j, list);
					}
					if (board[i][j] === this.wB) {
						this.#bishopMoveFiller(board, i, j, list);
					}
					if (board[i][j] === this.wQ) {
						this.#queenMoveFiller(board, i, j, list);
					}
					if (board[i][j] === this.wK) {
						this.#kingMoveFiller(board, i, j, list);
					}
				}
			}
		}

		if (wOrB === false) {
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					if (board[i][j] === this.bP) {
						this.#bPawnMoveFiller(board, i, j, list, pR1, pR2, pC1);
					}
					if (board[i][j] === this.bN) {
						this.#knightMoveFiller(board, i, j, list);
					}
					if (board[i][j] === this.bR) {
						this.#rookMoveFiller(board, i, j, list);
					}
					if (board[i][j] === this.bB) {
						this.#bishopMoveFiller(board, i, j, list);
					}
					if (board[i][j] === this.bQ) {
						this.#queenMoveFiller(board, i, j, list);
					}
					if (board[i][j] === this.bK) {
						this.#kingMoveFiller(board, i, j, list);
					}
				}
			}
		}
		this.#filterMoveFiller(board, list, wOrB);
	}

	#filterMoveFiller(board, list, wOrB) {
		//still need to figure out how to make this work with special moves
		let tempWKingCheck = [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
		];
		let tempBKingCheck = [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
		];
		let wSize = 0;
		let bSize = 0;
		let tempOld = 0;
		let tempNew = 0;
		let checkMoveValue = "";
		let checkMoveR1 = 0;
		let checkMoveC1 = 0;
		let checkMoveR2 = 0;
		let checkMoveC2 = 0;
		let xSize = list.length;

		for (let i = 0; i < 8; i++) {
			//set temp variables to set back after each calculation
			for (let j = 0; j < 8; j++) {
				tempWKingCheck[i][j] = this.wKingCheck[i][j];
				tempBKingCheck[i][j] = this.bKingCheck[i][j];
			}
		}

		for (let i = 0; i < xSize; i++) {
			if (typeof list[i] === "string" && list[i].length === 6) {
				checkMoveValue = list[i].substr(0, 2);
				checkMoveR1 = parseInt(list[i].substr(2, 1));
				checkMoveC1 = parseInt(list[i].substr(3, 1));
				checkMoveR2 = parseInt(list[i].substr(4, 1));
				checkMoveC2 = parseInt(list[i].substr(5, 1));

				tempOld = board[checkMoveR1][checkMoveC1];
				tempNew = board[checkMoveR2][checkMoveC2];
				board[checkMoveR2][checkMoveC2] = board[checkMoveR1][checkMoveC1];
				board[checkMoveR1][checkMoveC1] = 0;
				this.changeCheckedSquares(board);

				if (wOrB) {
					for (let x = 0; x < 8; x++) {
						for (let y = 0; y < 8; y++) {
							if (board[x][y] === this.wK && this.bKingCheck[x][y] > 0) {
								list.splice(i, 1);
								xSize--;
								i--;
							}
						}
					}
				} else if (!wOrB) {
					for (let x = 0; x < 8; x++) {
						for (let y = 0; y < 8; y++) {
							if (board[x][y] === this.bK && this.wKingCheck[x][y] > 0) {
								list.splice(i, 1);
								xSize--;
								i--;
							}
						}
					}
				}

				board[checkMoveR1][checkMoveC1] = tempOld;
				board[checkMoveR2][checkMoveC2] = tempNew;
				for (let i = 0; i < 8; i++) {
					for (let j = 0; j < 8; j++) {
						this.bKingCheck[i][j] = tempBKingCheck[i][j];
						this.wKingCheck[i][j] = tempWKingCheck[i][j];
					}
				}
			}
		}
	}

	#wPawnMoveFiller(board, r, c, list, pR1, pR2, pC1) {
		if (this.scopeCheck(r - 1, c)) {
			if (board[r - 1][c] === 0) {
				this.#listFiller(board, r - 1, c, r, c, list, "x");
			}
		}
		if (this.scopeCheck(r - 2, c)) {
			if (board[r - 2][c] === 0 && board[r - 1][c] === 0 && r === 6) {
				this.#listFiller(board, r - 2, c, r, c, list, "x");
			}
		}
		if (this.scopeCheck(r - 1, c + 1)) {
			if (
				this.blackPiece(board[r - 1][c + 1]) &&
				board[r - 1][c + 1] >= this.bP &&
				board[r - 1][c + 1] !== 0
			) {
				this.#listFiller(board, r - 1, c + 1, r, c, list, "x");
			}
		}
		if (this.scopeCheck(r - 1, c - 1)) {
			if (this.blackPiece(board[r - 1][c - 1]) && board[r - 1][c - 1] !== 0) {
				this.#listFiller(board, r - 1, c - 1, r, c, list, "x");
			}
		}
		if (this.scopeCheck(r - 1, c + 1)) {
			if (r === 3 && pC1 === c + 1 && r === pR1 + 2 && r === pR2) {
				this.#listFiller(board, r - 1, c + 1, r, c, list, "p");
			}
		}
		if (this.scopeCheck(r - 1, c - 1)) {
			if (r === 3 && pC1 === c - 1 && r === pR1 + 2 && r === pR2) {
				this.#listFiller(board, r - 1, c - 1, r, c, list, "p");
			}
		}
	}

	#bPawnMoveFiller(board, r, c, list, pR1, pR2, pC1) {
		if (this.scopeCheck(r + 1, c)) {
			if (board[r + 1][c] === 0) {
				this.#listFiller(board, r + 1, c, r, c, list, "x");
			}
		}
		if (this.scopeCheck(r + 2, c)) {
			if (board[r + 2][c] === 0 && board[r + 1][c] === 0 && r === 1) {
				this.#listFiller(board, r + 2, c, r, c, list, "x");
			}
		}
		if (this.scopeCheck(r + 1, c + 1)) {
			if (this.whitePiece(board[r + 1][c + 1]) && board[r + 1][c + 1] !== 0) {
				this.#listFiller(board, r + 1, c + 1, r, c, list, "x");
			}
		}
		if (this.scopeCheck(r + 1, c - 1)) {
			if (this.whitePiece(board[r + 1][c - 1]) && board[r + 1][c - 1] !== 0) {
				this.#listFiller(board, r + 1, c - 1, r, c, list, "x");
			}
		}

		if (this.scopeCheck(r + 1, c + 1)) {
			if (r === 4 && pC1 === c + 1 && r === pR1 - 2 && r === pR2) {
				this.#listFiller(board, r + 1, c + 1, r, c, list, "p");
			}
		}
		if (this.scopeCheck(r + 1, c - 1)) {
			if (r === 4 && pC1 === c - 1 && r === pR1 - 2 && r === pR2) {
				this.#listFiller(board, r + 1, c - 1, r, c, list, "p");
			}
		}
	}

	#knightMoveFiller(board, r, c, list) {
		if (board[r][c] === this.wN) {
			if (this.scopeCheck(r + 2, c + 1)) {
				if (board[r + 2][c + 1] === 0 || this.blackPiece(board[r + 2][c + 1])) {
					this.#listFiller(board, r + 2, c + 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r + 2, c - 1)) {
				if (board[r + 2][c - 1] === 0 || this.blackPiece(board[r + 2][c - 1])) {
					this.#listFiller(board, r + 2, c - 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r - 2, c + 1)) {
				if (board[r - 2][c + 1] === 0 || this.blackPiece(board[r - 2][c + 1])) {
					this.#listFiller(board, r - 2, c + 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r - 2, c - 1)) {
				if (board[r - 2][c - 1] === 0 || this.blackPiece(board[r - 2][c - 1])) {
					this.#listFiller(board, r - 2, c - 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r + 1, c + 2)) {
				if (board[r + 1][c + 2] === 0 || this.blackPiece(board[r + 1][c + 2])) {
					this.#listFiller(board, r + 1, c + 2, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r + 1, c - 2)) {
				if (board[r + 1][c - 2] === 0 || this.blackPiece(board[r + 1][c - 2])) {
					this.#listFiller(board, r + 1, c - 2, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r - 1, c + 2)) {
				if (board[r - 1][c + 2] === 0 || this.blackPiece(board[r - 1][c + 2])) {
					this.#listFiller(board, r - 1, c + 2, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r - 1, c - 2)) {
				if (board[r - 1][c - 2] === 0 || this.blackPiece(board[r - 1][c - 2])) {
					this.#listFiller(board, r - 1, c - 2, r, c, list, "x");
				}
			}
		}

		if (board[r][c] == this.bN) {
			if (this.scopeCheck(r + 2, c + 1)) {
				if (board[r + 2][c + 1] === 0 || this.whitePiece(board[r + 2][c + 1])) {
					this.#listFiller(board, r + 2, c + 1, r, c, list, "x");
				}
			}

			if (this.scopeCheck(r + 2, c - 1)) {
				if (board[r + 2][c - 1] === 0 || this.whitePiece(board[r + 2][c - 1])) {
					this.#listFiller(board, r + 2, c - 1, r, c, list, "x");
				}
			}

			if (this.scopeCheck(r - 2, c + 1)) {
				if (board[r - 2][c + 1] === 0 || this.whitePiece(board[r - 2][c + 1])) {
					this.#listFiller(board, r - 2, c + 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r - 2, c - 1)) {
				if (board[r - 2][c - 1] === 0 || this.whitePiece(board[r - 2][c - 1])) {
					this.#listFiller(board, r - 2, c - 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r + 1, c + 2)) {
				if (board[r + 1][c + 2] === 0 || this.whitePiece(board[r + 1][c + 2])) {
					this.#listFiller(board, r + 1, c + 2, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r + 1, c - 2)) {
				if (board[r + 1][c - 2] === 0 || this.whitePiece(board[r + 1][c - 2])) {
					this.#listFiller(board, r + 1, c - 2, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r - 1, c + 2)) {
				if (board[r - 1][c + 2] === 0 || this.whitePiece(board[r - 1][c + 2])) {
					this.#listFiller(board, r - 1, c + 2, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r - 1, c - 2)) {
				if (board[r - 1][c - 2] === 0 || this.whitePiece(board[r - 1][c - 2])) {
					this.#listFiller(board, r - 1, c - 2, r, c, list, "x");
				}
			}
		}
	}

	#rookMoveFiller(board, r, c, list) {
		let x = 0;
		this.moveStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.#moveFillerShortcut(board, r + x, c, r, c, list);
		}

		x = 0;
		this.moveStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.#moveFillerShortcut(board, r - x, c, r, c, list);
		}

		x = 0;
		this.moveStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.#moveFillerShortcut(board, r, c + x, r, c, list);
		}

		x = 0;
		this.moveStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.#moveFillerShortcut(board, r, c - x, r, c, list);
		}
	}

	#bishopMoveFiller(board, r, c, list) {
		let x = 0;
		this.moveStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.#moveFillerShortcut(board, r + x, c + x, r, c, list);
		}

		x = 0;
		this.moveStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.#moveFillerShortcut(board, r + x, c - x, r, c, list);
		}

		x = 0;
		this.moveStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.#moveFillerShortcut(board, r - x, c + x, r, c, list);
		}

		x = 0;
		this.moveStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.#moveFillerShortcut(board, r - x, c - x, r, c, list);
		}
	}

	#queenMoveFiller(board, r, c, list) {
		this.#rookMoveFiller(board, r, c, list);
		this.#bishopMoveFiller(board, r, c, list);
	}

	#kingMoveFiller(board, r, c, list) {
		if (board[r][c] == this.wK) {
			if (this.scopeCheck(r + 1, c + 1)) {
				if (board[r + 1][c + 1] === 0 || this.blackPiece(board[r + 1][c + 1])) {
					this.#listFiller(board, r + 1, c + 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r + 1, c)) {
				if (board[r + 1][c] === 0 || this.blackPiece(board[r + 1][c])) {
					this.#listFiller(board, r + 1, c, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r + 1, c - 1)) {
				if (board[r + 1][c - 1] === 0 || this.blackPiece(board[r + 1][c - 1])) {
					this.#listFiller(board, r + 1, c - 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r, c + 1)) {
				if (board[r][c + 1] === 0 || this.blackPiece(board[r][c + 1])) {
					this.#listFiller(board, r, c + 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r, c - 1)) {
				if (board[r][c - 1] === 0 || this.blackPiece(board[r][c - 1])) {
					this.#listFiller(board, r, c - 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r - 1, c + 1)) {
				if (board[r - 1][c + 1] === 0 || this.blackPiece(board[r - 1][c + 1])) {
					this.#listFiller(board, r - 1, c + 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r - 1, c)) {
				if (board[r - 1][c] === 0 || this.blackPiece(board[r - 1][c])) {
					this.#listFiller(board, r - 1, c, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r - 1, c - 1)) {
				if (board[r - 1][c - 1] === 0 || this.blackPiece(board[r - 1][c - 1])) {
					this.#listFiller(board, r - 1, c - 1, r, c, list, "x");
				}
			}
			//should have 2 for each

			if (
				!game.wKingMoves &&
				!game.wLeftKingRookMoves &&
				board[r][c - 1] === 0 &&
				board[r][c - 2] === 0 &&
				board[r][c - 3] === 0 &&
				this.bKingCheck[r][c] === 0 &&
				this.bKingCheck[r][c - 1] === 0 &&
				this.bKingCheck[r][c - 2] === 0
			) {
				//left

				this.#listFiller(board, r, c - 2, r, c, list, "c");
			}
			if (
				!game.wKingMoves &&
				!game.wRightKingRookMoves &&
				board[r][c + 1] === 0 &&
				board[r][c + 2] === 0 &&
				this.bKingCheck[r][c] === 0 &&
				this.bKingCheck[r][c + 1] === 0 &&
				this.bKingCheck[r][c + 2] === 0
			) {
				//right
				this.#listFiller(board, r, c + 2, r, c, list, "c");
			}
		} else if (board[r][c] == this.bK) {
			if (this.scopeCheck(r + 1, c + 1)) {
				if (board[r + 1][c + 1] == 0 || this.whitePiece(board[r + 1][c + 1])) {
					this.#listFiller(board, r + 1, c + 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r + 1, c)) {
				if (board[r + 1][c] == 0 || this.whitePiece(board[r + 1][c])) {
					this.#listFiller(board, r + 1, c, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r + 1, c - 1)) {
				if (board[r + 1][c - 1] == 0 || this.whitePiece(board[r + 1][c - 1])) {
					this.#listFiller(board, r + 1, c - 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r, c + 1)) {
				if (board[r][c + 1] == 0 || this.whitePiece(board[r][c + 1])) {
					this.#listFiller(board, r, c + 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r, c - 1)) {
				if (board[r][c - 1] == 0 || this.whitePiece(board[r][c - 1])) {
					this.#listFiller(board, r, c - 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r - 1, c + 1)) {
				if (board[r - 1][c + 1] == 0 || this.whitePiece(board[r - 1][c + 1])) {
					this.#listFiller(board, r - 1, c + 1, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r - 1, c)) {
				if (board[r - 1][c] == 0 || this.whitePiece(board[r - 1][c])) {
					this.#listFiller(board, r - 1, c, r, c, list, "x");
				}
			}
			if (this.scopeCheck(r - 1, c - 1)) {
				if (board[r - 1][c - 1] == 0 || this.whitePiece(board[r - 1][c - 1])) {
					this.#listFiller(board, r - 1, c - 1, r, c, list, "x");
				}
			}

			if (
				!game.bKingMoves &&
				!game.bLeftKingRookMoves &&
				board[r][c - 1] === 0 &&
				board[r][c - 2] === 0 &&
				board[r][c - 3] === 0 &&
				this.wKingCheck[r][c] === 0 &&
				this.wKingCheck[r][c - 1] === 0 &&
				this.wKingCheck[r][c - 2] === 0
			) {
				//left
				this.#listFiller(board, r, c - 2, r, c, list, "c");
			}
			if (
				!game.bKingMoves &&
				!game.bRightKingRookMoves &&
				board[r][c + 1] === 0 &&
				board[r][c + 2] === 0 &&
				this.wKingCheck[r][c] === 0 &&
				this.wKingCheck[r][c + 1] === 0 &&
				this.wKingCheck[r][c + 2] === 0
			) {
				//right
				this.#listFiller(board, r, c + 2, r, c, list, "c");
			}
		}
	}

	#listFiller(board, x, y, x1, y1, listOfMoves, specialMove) {
		let value = board[x1][y1].toString();
		let moveString = value.concat(x1, y1, x, y);

		if (specialMove === "c") {
			moveString = "C" + moveString;
		} else if (specialMove === "p") {
			moveString = "P" + moveString;
		}

		if (moveString.length === 5) {
			moveString = "0" + moveString;
		}
		if (Array.isArray(listOfMoves)) {
			listOfMoves.push(moveString);
		} else {
		}
	}

	#moveFillerShortcut(board, x, y, x1, y1, list) {
		if (this.moveStop === false && x <= 7 && x >= 0 && y <= 7 && y >= 0) {
			if (board[x][y] === 0) {
				if (this.whitePiece(board[x1][y1])) {
					this.#listFiller(board, x, y, x1, y1, list, "x");
				} else if (this.blackPiece(board[x1][y1])) {
					this.#listFiller(board, x, y, x1, y1, list, "x");
				}
			} else if (board[x][y] !== 0) {
				this.moveStop = true;
				if (this.whitePiece(board[x1][y1])) {
					if (this.blackPiece(board[x][y])) {
						this.#listFiller(board, x, y, x1, y1, list, "x");
					}
				}
				if (this.blackPiece(board[x1][y1])) {
					this.moveStop = true;
					if (this.whitePiece(board[x][y])) {
						this.#listFiller(board, x, y, x1, y1, list, "x");
					}
				}
			}
		}
	}

	changeCheckedSquares(board) {
		this.resetBoard(this.wKingCheck);
		this.resetBoard(this.bKingCheck);

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (board[i][j] === this.wP || board[i][j] === this.bP) {
					this.pawnCheck(board, i, j);
				}
				if (board[i][j] === this.wN || board[i][j] === this.bN) {
					this.knightCheck(board, i, j);
				}
				if (board[i][j] === this.wR || board[i][j] === this.bR) {
					this.rookCheck(board, i, j);
				}
				if (board[i][j] === this.wB || board[i][j] === this.bB) {
					this.bishopCheck(board, i, j);
				}
				if (board[i][j] === this.wQ || board[i][j] === this.bQ) {
					this.queenCheck(board, i, j);
				}
				if (board[i][j] === this.wK || board[i][j] === this.bK) {
					this.kingCheck(board, i, j);
				}
			}
		}
	}

	pawnCheck(board, r, c) {
		if (this.whitePiece(board[r][c])) {
			if (this.scopeCheck(r - 1, c + 1)) {
				this.checkShortcut1(board, r - 1, c + 1, r, c);
			}
			if (this.scopeCheck(r - 1, c - 1)) {
				this.checkShortcut1(board, r - 1, c - 1, r, c);
			}
		} else if (this.blackPiece(board[r][c])) {
			if (this.scopeCheck(r + 1, c + 1)) {
				this.checkShortcut1(board, r + 1, c + 1, r, c);
			}
			if (this.scopeCheck(r + 1, c - 1)) {
				this.checkShortcut1(board, r + 1, c - 1, r, c);
			}
		}
	}

	knightCheck(board, r, c) {
		if (this.scopeCheck(r - 2, c + 1)) {
			this.checkShortcut1(board, r - 2, c + 1, r, c);
		}
		if (this.scopeCheck(r - 2, c - 1)) {
			this.checkShortcut1(board, r - 2, c - 1, r, c);
		}
		if (this.scopeCheck(r + 1, c + 2)) {
			this.checkShortcut1(board, r + 1, c + 2, r, c);
		}
		if (this.scopeCheck(r + 1, c - 2)) {
			this.checkShortcut1(board, r + 1, c - 2, r, c);
		}
		if (this.scopeCheck(r + 2, c + 1)) {
			this.checkShortcut1(board, r + 2, c + 1, r, c);
		}
		if (this.scopeCheck(r + 2, c - 1)) {
			this.checkShortcut1(board, r + 2, c - 1, r, c);
		}
		if (this.scopeCheck(r - 1, c + 2)) {
			this.checkShortcut1(board, r - 1, c + 2, r, c);
		}
		if (this.scopeCheck(r - 1, c - 2)) {
			this.checkShortcut1(board, r - 1, c - 2, r, c);
		}
	}

	rookCheck(board, r, c) {
		let x = 0;
		this.checkStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.checkShortcut2(board, r + x, c, r, c);
		}

		x = 0;
		this.checkStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.checkShortcut2(board, r - x, c, r, c);
		}

		x = 0;
		this.checkStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.checkShortcut2(board, r, c + x, r, c);
		}

		x = 0;
		this.checkStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.checkShortcut2(board, r, c - x, r, c);
		}
	}

	bishopCheck(board, r, c) {
		let x = 0;
		this.checkStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.checkShortcut2(board, r + x, c + x, r, c);
		}

		x = 0;
		this.checkStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.checkShortcut2(board, r + x, c - x, r, c);
		}

		x = 0;
		this.checkStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.checkShortcut2(board, r - x, c + x, r, c);
		}

		x = 0;
		this.checkStop = false;
		for (let i = 0; i < 8; i++) {
			x++;
			this.checkShortcut2(board, r - x, c - x, r, c);
		}
	}

	queenCheck(board, r, c) {
		this.rookCheck(board, r, c);
		this.bishopCheck(board, r, c);
	}

	kingCheck(board, r, c) {
		if (this.scopeCheck(r, c + 1)) {
			this.checkShortcut1(board, r, c + 1, r, c);
		}
		if (this.scopeCheck(r, c - 1)) {
			this.checkShortcut1(board, r, c - 1, r, c);
		}
		if (this.scopeCheck(r + 1, c)) {
			this.checkShortcut1(board, r + 1, c, r, c);
		}
		if (this.scopeCheck(r - 1, c)) {
			this.checkShortcut1(board, r - 1, c, r, c);
		}
		if (this.scopeCheck(r + 1, c + 1)) {
			this.checkShortcut1(board, r + 1, c + 1, r, c);
		}
		if (this.scopeCheck(r + 1, c - 1)) {
			this.checkShortcut1(board, r + 1, c - 1, r, c);
		}
		if (this.scopeCheck(r - 1, c + 1)) {
			this.checkShortcut1(board, r - 1, c + 1, r, c);
		}
		if (this.scopeCheck(r - 1, c - 1)) {
			this.checkShortcut1(board, r - 1, c - 1, r, c);
		}
	}

	checkShortcut1(board, x, y, x1, y1) {
		if (x <= 7 && x >= 0 && y <= 7 && y >= 0) {
			if (this.whitePiece(board[x1][y1])) {
				//white
				this.wKingCheck[x][y]++;
			} else if (this.blackPiece(board[x1][y1])) {
				//black
				this.bKingCheck[x][y]++;
			}
		}
	}

	checkShortcut2(board, x, y, x1, y1) {
		if (!this.checkStop && x <= 7 && x >= 0 && y <= 7 && y >= 0) {
			if (board[x][y] === 0) {
				//if board is equal to 0
				if (this.whitePiece(board[x1][y1])) {
					//white
					this.wKingCheck[x][y]++;
				} else if (this.blackPiece(board[x1][y1])) {
					//black
					this.bKingCheck[x][y]++;
				}
			} else if (board[x][y] !== 0) {
				//if board is not equal to 0
				if (this.whitePiece(board[x1][y1])) {
					//white
					this.wKingCheck[x][y]++;
					this.checkStop = true;
				}

				if (this.blackPiece(board[x1][y1])) {
					//black
					this.bKingCheck[x][y]++;
					this.checkStop = true;
				}
			}
		}
	}

	whitePiece(piece) {
		if (piece > 0 && piece < 7) {
			return true;
		} else {
			return false;
		}
	}

	blackPiece(piece) {
		if (piece > 6 && piece < 13) {
			return true;
		} else {
			return false;
		}
	}

	scopeCheck(r, c) {
		if (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
			return true;
		} else {
			return false;
		}
	}

	resetBoard(board) {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				board[i][j] = 0;
			}
		}
	}
}

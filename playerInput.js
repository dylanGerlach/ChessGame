class PlayerInput {
	constructor() {
		this.possibleMoves = [];
		this.tempX;
		this.tempY;
		this.inputX;
		this.inputY;
		this.inputValue;
	}
	addEventListeners() {
		board.canvas.addEventListener("mousedown", this.onMouseDown);
		board.canvas.addEventListener("mousemove", this.onMouseMove);
		board.canvas.addEventListener("mouseup", this.onMouseUp);
		board.canvas.addEventListener("mouseout", this.onMouseOut);
	}
	onMouseDown(evt) {
		for (let i = 0; i < board.images.length; i++) {
			board.images[i].selectedPiece = false;
		}
		let tempC = false;
		const getValues = () => {
			this.possibleMoves = [];
			if (this.inputValue.length === 1) {
				this.inputValue = "0" + this.inputValue;
			}
			for (let i = 0; i < game.listOfMoves.length; i++) {
				if (
					game.listOfMoves[i].substring(0, 1) === "C" &&
					game.listOfMoves[i].substring(1, 2) === "1" &&
					this.inputValue === "01"
				) {
					this.possibleMoves.push(game.listOfMoves[i].substring(4, 6));
					tempC = true;
				}
				if (
					game.listOfMoves[i].substring(0, 1) === "C" &&
					game.listOfMoves[i].substring(1, 2) === "7" &&
					this.inputValue === "07"
				) {
					this.possibleMoves.push(game.listOfMoves[i].substring(4, 6));
					tempC = true;
				}
				if (
					this.inputValue === game.listOfMoves[i].substring(0, 2) &&
					this.inputY.toString() === game.listOfMoves[i].substring(2, 3) &&
					this.inputX.toString() === game.listOfMoves[i].substring(3, 4)
				) {
					this.possibleMoves.push(game.listOfMoves[i].substring(4, 6));
				}
			}
		};

		const getPressedPiece = evt => {
			let locX = evt.offsetX;
			let locY = evt.offsetY;
			let x = Math.floor(locX / 100);
			let y = Math.floor(locY / 100);
			this.tempX = x * 100;
			this.tempY = y * 100;
			this.inputValue = game.board[y][x].toString();
			this.inputX = x;
			this.inputY = y;
			getValues();
			if (tempC) {
				tempC = false;

				this.inputValue = "C" + this.inputValue.substring(1, 2);
			}
			if (board.images.length !== 0) {
				//returns selected piece
				for (let i = 0; i < board.images.length; i++) {
					if (
						locX > board.images[i].x &&
						locX < board.images[i].x + board.images[i].width &&
						locY > board.images[i].y &&
						locY < board.images[i].y + board.images[i].height
					) {
						board.images[i].selectedPiece = true;
						return board.images[i];
					}
				}
				return null;
			}
		};

		board.selectedPiece = getPressedPiece(evt);

		if (board.selectedPiece != null) {
			//offset piece to make draggin more natural
			board.selectedPiece.offset = {
				x: evt.x - board.selectedPiece.x,
				y: evt.y - board.selectedPiece.y,
			};
		}
		for (let i = 0; i < this.possibleMoves.length; i++) {
			//sets possible moves
			if (
				game.board[this.possibleMoves[i].substring(0, 1)][
					this.possibleMoves[i].substring(1, 2)
				] > 0
			) {
				board.indicators[this.possibleMoves[i].substring(0, 1)][
					this.possibleMoves[i].substring(1, 2)
				] = 2;
			} else {
				board.indicators[this.possibleMoves[i].substring(0, 1)][
					this.possibleMoves[i].substring(1, 2)
				] = 1;
			}
		}
	}

	onMouseMove(evt) {
		if (board.selectedPiece != null) {
			board.selectedPiece.x = evt.x - board.selectedPiece.offset.x;
			board.selectedPiece.y = evt.y - board.selectedPiece.offset.y;
		}
	}

	onMouseUp(evt) {
		let move = null;
		utils.resetBoard(board.indicators);

		if (board.selectedPiece != null) {
			let x = board.selectedPiece.x + 58; //figure out what these are
			let y = board.selectedPiece.y + 74;

			// if (x < 0) {
			// 	console.log("x is out of bounds");
			// 	x = 0;
			// } else if (x >= 800) {
			// 	console.log("x is out of bounds");

			// 	x = 799;
			// }
			// if (y < 0) {
			// 	console.log("y is out of bounds");

			// 	y = 0;
			// } else if (y >= 800) {
			// 	console.log("y is out of bounds");

			// 	y = 799;
			// }

			x = Math.floor(x / 100);
			y = Math.floor(y / 100);

			for (let i = 0; i < this.possibleMoves.length; i++) {
				if (
					y.toString() === this.possibleMoves[i].substring(0, 1) &&
					x.toString() === this.possibleMoves[i].substring(1, 2)
				) {
					move =
						this.inputValue +
						this.inputY.toString() +
						this.inputX.toString() +
						y.toString() +
						x.toString();
				}
			}

			if (move === null) {
				board.selectedPiece.x = this.tempX;
				board.selectedPiece.y = this.tempY;
				board.selectedPiece = null;
				return;
			} else {
				game.boardMain(move);
			}
			if (game.takePiece) {
				console.log("Removing Piece");
				game.takePiece = false;
				board.removeImage(x * 100, y * 100);
			}
			board.selectedPiece.x = 100 * x;
			board.selectedPiece.y = 100 * y;
		}
		board.selectedPiece = null;
	}

	onMouseOut() {
		if (board.selectedPiece != null) {
			board.selectedPiece.x = this.tempX;
			board.selectedPiece.y = this.tempY;
			board.selectedPiece = null;
		}
		utils.resetBoard(board.indicators);
	}
}

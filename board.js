class Board {
	constructor() {
		this.selectedPiece = null;

		this.indicators = [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
		];

		this.images = [];
		this.canvas = document.querySelector("canvas");
		this.turn = document.getElementById("move");
		this.gameState = document.getElementById("gameState");
		this.screenMoves = document.getElementById("listOfMoves");

		this.ctx = this.canvas.getContext("2d");
		this.multiplier = 1; //size of board
		this.canvas.width = 800 * this.multiplier;
		this.canvas.height = 800 * this.multiplier;

		this.frameRate = 120;
		this.intervalTime = 1000 / this.frameRate;
	}

	testRun() {
		const loadImage = src => {
			let testImage = new Image();
			testImage.onload = () => {
				board.testLoad();
			};
			testImage.src = src;
			return testImage;
		};

		for (let i = 0; i < board.images.length; i++) {
			board.images[i].new = loadImage(board.images[i].src);
		}
	}
	//not being used, copy code in game.js
	screenLoop() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear canvas
		this.testLoad();
		window.setTimeout(this.screenLoop, this.intervalTime);
	}

	imageFinder() {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (game.board[i][j] === utils.wP) {
					this.setPiece(
						j * 100 * this.multiplier,
						i * 100 * this.multiplier,
						"piece/wPawn.png"
					);
				}

				if (game.board[i][j] === utils.wR) {
					this.setPiece(
						j * 100 * this.multiplier,
						i * 100 * this.multiplier,
						"piece/wRook.png"
					);
				}
				if (game.board[i][j] === utils.wN) {
					this.setPiece(
						j * 100 * this.multiplier,
						i * 100 * this.multiplier,
						"piece/wKnight.png"
					);
				}
				if (game.board[i][j] === utils.wB) {
					board.setPiece(
						j * 100 * this.multiplier,
						i * 100 * this.multiplier,
						"piece/wBishop.png"
					);
				}
				if (game.board[i][j] === utils.wQ) {
					this.setPiece(
						j * 100 * this.multiplier,
						i * 100 * this.multiplier,
						"piece/wQueen.png"
					);
				}
				if (game.board[i][j] === utils.wK) {
					this.setPiece(
						j * 100 * this.multiplier,
						i * 100 * this.multiplier,
						"piece/wKing.png"
					);
				}

				if (game.board[i][j] === utils.bP) {
					this.setPiece(
						j * 100 * this.multiplier,
						i * 100 * this.multiplier,
						"piece/bPawn.png"
					);
				}
				if (game.board[i][j] === utils.bR) {
					this.setPiece(
						j * 100 * this.multiplier,
						i * 100 * this.multiplier,
						"piece/bRook.png"
					);
				}
				if (game.board[i][j] === utils.bN) {
					this.setPiece(
						j * 100 * this.multiplier,
						i * 100 * this.multiplier,
						"piece/bKnight.png"
					);
				}
				if (game.board[i][j] === utils.bB) {
					this.setPiece(
						j * 100 * this.multiplier,
						i * 100 * this.multiplier,
						"piece/bBishop.png"
					);
				}
				if (game.board[i][j] === utils.bQ) {
					this.setPiece(
						j * 100 * this.multiplier,
						i * 100 * this.multiplier,
						"piece/bQueen.png"
					);
				}
				if (game.board[i][j] === utils.bK) {
					this.setPiece(
						j * 100 * this.multiplier,
						i * 100 * this.multiplier,
						"piece/bKing.png"
					);
				}
			}
		}
	}

	removeImage(x, y) {
		console.log(board.images);
		let tempX;
		let tempY;
		for (let i = 0; i < board.images.length; i++) {
			if (x === board.images[i].x && y === board.images[i].y) {
				board.images.splice(i, 1);
			}
		}
	}
	removeImage2(x, y) {
		for (let i = 0; i < board.images.length; i++) {
			if (board.images[i].selectedPiece) {
				console.log(board.images[i], " x");
				board.images.splice(i, 1);
			}
		}
	}
	addImage(x, y, src) {
		this.setPiece(x, y, src);
	}

	updateScreen() {
		// const moves = document.querySelector("p"); // loads moves into screen
		// moves.innerText = "List Of Moves : ";
		// game.listOfMoves.forEach((move, index) => {
		// 	moves.innerText += game.listOfMoves[index] + " : ";
		// });
	}

	testLoad() {
		let x = 0;
		let y = -100;
		let p = 1;
		for (let i = 0; i < 8; i++) {
			y = y + 100;
			x = 0;
			p++;
			for (let j = 0; j < 8; j++) {
				if (p % 2 === 0) {
					if (this.indicators[i][j] === 0) {
						this.#drawRectangle(x, y, "rgba(36, 21, 6, 1)");
					} else if (this.indicators[i][j] === 1) {
						this.#drawEmptyLitRectangle(x, y, "rgba(36, 21, 6, 1)");
					} else if (this.indicators[i][j] === 2) {
						this.#drawFilledLitRectangle(x, y, "rgba(36, 21, 6, 1)");
					}

					p = true;
				} else {
					if (this.indicators[i][j] === 0) {
						this.#drawRectangle(x, y, "rgba(130, 113, 98, 1)");
					} else if (this.indicators[i][j] === 1) {
						this.#drawEmptyLitRectangle(x, y, "rgba(130, 113, 98, 1)");
					} else if (this.indicators[i][j] === 2) {
						this.#drawFilledLitRectangle(x, y, "rgba(130, 113, 98, 1)");
					}
					p = false;
				}
				x = x + 100;
			}
		}

		this.ctx.font = "bold 16px Arial";
		this.ctx.fillStyle = "white";
		this.ctx.fillText("8", 5 * this.multiplier, 20 * this.multiplier);
		this.ctx.fillText("7", 5 * this.multiplier, 120 * this.multiplier);
		this.ctx.fillText("6", 5 * this.multiplier, 220 * this.multiplier);
		this.ctx.fillText("5", 5 * this.multiplier, 320 * this.multiplier);
		this.ctx.fillText("4", 5 * this.multiplier, 420 * this.multiplier);
		this.ctx.fillText("3", 5 * this.multiplier, 520 * this.multiplier);
		this.ctx.fillText("2", 5 * this.multiplier, 620 * this.multiplier);
		this.ctx.fillText("1", 5 * this.multiplier, 720 * this.multiplier);
		this.ctx.fillText("a", 80 * this.multiplier, 790 * this.multiplier);
		this.ctx.fillText("b", 180 * this.multiplier, 790 * this.multiplier);
		this.ctx.fillText("c", 280 * this.multiplier, 790 * this.multiplier);
		this.ctx.fillText("d", 380 * this.multiplier, 790 * this.multiplier);
		this.ctx.fillText("e", 480 * this.multiplier, 790 * this.multiplier);
		this.ctx.fillText("f", 580 * this.multiplier, 790 * this.multiplier);
		this.ctx.fillText("g", 680 * this.multiplier, 790 * this.multiplier);
		this.ctx.fillText("h", 780 * this.multiplier, 790 * this.multiplier);

		for (let i = 0; i < this.images.length; i++) {
			if (this.images[i].new != null) {
				this.ctx.drawImage(
					this.images[i].new,
					this.images[i].x,
					this.images[i].y,
					100,
					100
				);
			}
		}
	}

	#drawRectangle(x, y, color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, 100 * this.multiplier, 100 * this.multiplier);
	}

	#drawEmptyLitRectangle(x, y, color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, 100 * this.multiplier, 100 * this.multiplier);
		this.ctx.globalAlpha = 0.25;
		this.ctx.beginPath();
		this.ctx.arc(x + 50, y + 50, 20, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = "green";
		this.ctx.fill();
		this.ctx.lineWidth = 5;
		this.ctx.strokeStyle = "green";
		this.ctx.stroke();
		this.ctx.globalAlpha = 1;
	}

	#drawFilledLitRectangle(x, y, color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, 100 * this.multiplier, 100 * this.multiplier);
		this.ctx.globalAlpha = 0.25;
		this.ctx.beginPath();
		this.ctx.arc(x + 50, y + 50, 45, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = "green";

		this.ctx.lineWidth = 5;
		this.ctx.strokeStyle = "green";
		this.ctx.stroke();
		this.ctx.globalAlpha = 1;
	}

	setPiece(x, y, src) {
		let img = new Image();
		img.src = src;
		this.piecesObj(img, src, x, y);
	}

	piecesObj(img, src, x, y) {
		let piece = new Object();
		piece.selectedPiece = false;

		piece.x = x;
		piece.y = y;
		piece.width = 100;
		piece.height = 100;
		piece.src = src;
		// piece.new;
		this.images.push(piece);
	}
}

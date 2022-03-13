export default class Matrix {
    _matrix = [];
    _rows = 0;
    _cols = 0;

    constructor(rows, cols, arrayOfItems, randomize = true) {
        
        this._rows = rows;
        this._cols = cols;

        if (randomize) {
            this._shuffleArray(arrayOfItems);
        }

        for (let i = 0; i < this._rows; i++) {
            this._matrix[i] = arrayOfItems.slice(i * this._cols, (i * this._cols) + this._cols);
        }
    }

    *[Symbol.iterator]() {
        for (let row = 0; row < this._rows; row++) {
            for (let col = 0; col < this._cols; col++) {
                yield this._matrix[row][col];
            }
        }
    }

    _shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            [array[j], array[i]] = [array[i], array[j]];
        }
    }

    getNumRowsCols() {
        return [this._rows, this._cols];
    }

    setValue(row, col, val) {
        this._matrix[row][col] = val;
    }

    getValue(row, col) {
        return this._matrix[row][col];
    }

    toConsole() {
        console.log(this._matrix);
    }

    rotate(degrees) {
        switch (Number(degrees)) {
            case -90: 
                this.rotateClockwise();
            case 180: 
                this.rotateClockwise();
            case 90:
                this.rotateClockwise();
            default:
        }
    }

    rotateClockwise() {    
        let res = [];
        for (let i = 0; i < this._rows; ++i) {
            for (let j = 0; j < this._cols; ++j) {
                if (!res[j]) {
                    res[j] = []
                }
                res[j][i] = this._matrix[this._rows-1-i][j];
            }
        }
        this._matrix = res;
        this._rows = this._matrix.length;
        this._cols = this._matrix[0].length;
    }
}
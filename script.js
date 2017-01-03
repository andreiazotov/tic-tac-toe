;(function() {
    function Game(fieldId) {
        var self = this,
            sign = "X",
            xWins = 0,
            oWins = 0,
            ties = 0,
            checkWin;
        self.field = document.getElementById(fieldId);
        self.cells = document.querySelectorAll(".game-field>div");
        [].forEach.call(self.cells, function(cell) {
            cell.onclick = function() {
                if (cell.children[0].innerHTML !== "" || self.checkWin()) {
                    return;
                }
                cell.children[0].classList.add(sign);
                cell.children[0].innerHTML = sign;
                sign = sign === "X" ? "O" : "X";
                checkWin = self.checkWin();
                if (checkWin) {
                    self.drawLine(checkWin[1], checkWin[2]);
                    if (checkWin[0] == "X") {
                        document.querySelectorAll("#x-wins p")[0].innerHTML = ++xWins;
                    } else {
                        document.querySelectorAll("#o-wins p")[0].innerHTML = ++oWins;
                    }
                    setTimeout(function () {
                        self.clearLine(checkWin[1], checkWin[2]);
                        self.clearCells();
                    }, 2000);
                }
                if (!self.hasEmptyCells() && !checkWin) {
                    document.querySelectorAll("#ties p")[0].innerHTML = ++ties;
                    setTimeout(function() {
                        self.clearCells();
                    }, 1000);
                }
            };
        });
    }

    Game.prototype.clearLine = function(number, type) {
      if (type === "rows") {
        if (number === 0) document.styleSheets[0].insertRule('div.top-left::before {width: 0%}', document.styleSheets[0].cssRules.length);
        if (number === 1) document.styleSheets[0].insertRule('div.middle-left::before {width: 0%}', document.styleSheets[0].cssRules.length);
        if (number === 2) document.styleSheets[0].insertRule('div.bottom-left::before {width: 0%}', document.styleSheets[0].cssRules.length);
      } else if (type === "columns") {
        if (number === 0) document.styleSheets[0].insertRule('div.top-left::after {height: 0%}', document.styleSheets[0].cssRules.length);
        if (number === 1) document.styleSheets[0].insertRule('div.top-middle::after {height: 0%}', document.styleSheets[0].cssRules.length);
        if (number === 2) document.styleSheets[0].insertRule('div.top-right::after {height: 0%}', document.styleSheets[0].cssRules.length);
      } else if (type === "diagonals" && number) {
        document.styleSheets[0].insertRule('div.middle-middle::after {width: 0%;left: -100%;top:-105%;}', document.styleSheets[0].cssRules.length);
      } else {
        document.styleSheets[0].insertRule('div.middle-middle::before {width: 0%;left: 200%;top:-105%;}', document.styleSheets[0].cssRules.length);
      }
    };

    Game.prototype.drawLine = function(number, type) {
      console.log(document.styleSheets[0]);
      if (type === "rows") {
          if (number === 0) document.styleSheets[0].insertRule('div.top-left::before {width: 300%}', document.styleSheets[0].cssRules.length);
          if (number === 1) document.styleSheets[0].insertRule('div.middle-left::before {width: 300%}', document.styleSheets[0].cssRules.length);
          if (number === 2) document.styleSheets[0].insertRule('div.bottom-left::before {width: 300%}', document.styleSheets[0].cssRules.length);
      } else if (type === "columns") {
          if (number === 0) document.styleSheets[0].insertRule('div.top-left::after {height: 300%}', document.styleSheets[0].cssRules.length);
          if (number === 1) document.styleSheets[0].insertRule('div.top-middle::after {height: 300%}', document.styleSheets[0].cssRules.length);
          if (number === 2) document.styleSheets[0].insertRule('div.top-right::after {height: 300%}', document.styleSheets[0].cssRules.length);
      } else if (type === "diagonals" && number) {
          document.styleSheets[0].insertRule('div.middle-middle::after {width: 400%;left: -147%;top:50%;}', document.styleSheets[0].cssRules.length);
      } else {
          document.styleSheets[0].insertRule('div.middle-middle::before {width: 400%;left: -152%;top:50%;}', document.styleSheets[0].cssRules.length);
      }
    };

    Game.prototype.hasEmptyCells = function() {
        var emptyCellsCount = 0;
        [].forEach.call(this.cells, function(cell) {
            emptyCellsCount += cell.children[0].innerHTML === "" ? 1 : 0;
        });
        return emptyCellsCount !== 0;
    };

    Game.prototype.clearCells = function() {
        [].forEach.call(this.cells, function(cell) {
            cell.children[0].classList = "";
            cell.children[0].innerHTML = "";
        });
    };

    Game.prototype.checkWin = function() {
        var rows,
            columns,
            flag;
        /* ##########CHECK ROWS########## */
        for (rows = 0; rows < 3; rows++) {
            flag = this.cells[3 * rows].children[0].innerHTML;
            if (flag === undefined) continue;
            for (columns = 0; columns < 2; columns++) {
                if (this.cells[3 * rows + columns].children[0].innerHTML !== this.cells[3 * rows + columns + 1].children[0].innerHTML) {
                    flag = false;
                    break;
                }
            }
            if (flag) return [flag, rows, "rows"];
        }
        /* ##########CHECK COLUMNS########## */
        for (columns = 0; columns < 3; columns++) {
            flag = this.cells[columns].children[0].innerHTML;
            if (flag === undefined) continue;
            for (rows = 0; rows < 2; rows++) {
                if (this.cells[3 * rows + columns].children[0].innerHTML !== this.cells[3 * (rows + 1) + columns].children[0].innerHTML) {
                    flag = false;
                    break;
                }
            }
            if (flag) return [flag, columns, "columns"];
        }
        /* ##########CHECK DIAGONALS########## */
        if (this.cells[4].children[0].innerHTML !== "" &&
           (this.cells[0].children[0].innerHTML === this.cells[4].children[0].innerHTML && this.cells[4].children[0].innerHTML === this.cells[8].children[0].innerHTML ||
            this.cells[2].children[0].innerHTML === this.cells[4].children[0].innerHTML && this.cells[4].children[0].innerHTML === this.cells[6].children[0].innerHTML)) {
            return [this.cells[4].children[0].innerHTML, this.cells[0].children[0].innerHTML === this.cells[8].children[0].innerHTML, "diagonals"];
        }
        return false;
    };

    window.onload = function() { new Game("game-field"); };
})();

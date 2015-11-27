const SAVED_VALUES = ['type', 'createdAt', 'duration', 'attempts', 'cells'];

/**
 * Модель игры пользователя
 * @class UserGame
 */
class UserGame {
  /**
   * @constructor
   */
  constructor(data, onChange) {
    this.type = data.type;
    this.createdAt = data.createdAt || Date.now();
    this.attempts = data.attempts || 0;
    this._duration = data.duration || 0;
    this.cells = data.cells || generateGame(this.type);

    this.startedAt = Date.now();
    this.state = this.getState();
    this.mask = Math.pow(2, Math.pow(this.type, 2) - 1) - 1;
    this.onChange = onChange;
  }

  /**
   * Завершена ли игры?
   *
   * @method
   * @return {boolean}
   */
  get complete() {
    return this.state === this.mask;
  }

  get duration() {
    return this._duration + Math.round((Date.now() - this.startedAt) / 1000);
  }

  /**
   * Возвращает индекс пустого поля
   *
   * @method
   * @return {number}
   */
  getEmptyCell() {
    return this.cells.indexOf(0);
  }

  /**
   * Возвращает состояние текущей игры (2-ое число,
   * где 1 — ячейка на своем месте).
   *
   * @method
   * @return {number}
   */
  getState() {
    let state = 0;

    this.cells.forEach((value, index) => {
      if (value !== 0 && value === index + 1) {
        state = state | 0b1 << index;
      }
    });

    return state;
  }

  /**
   * Меняет местами значения двух индексов
   *
   * @method
   * @param {number} oldIndex текущей индекс поля
   * @param {number} newIndex новый индекс поля
   */
  swapCells(oldIndex, newIndex) {
    const value = this.cells[oldIndex];

    this.attempts += 1;

    this.cells[oldIndex] = this.cells[newIndex];
    this.cells[newIndex] = value;

    if (value === newIndex + 1) {
      this.state = this.state | 0b1 << newIndex;
    } else {
      this.state = this.state & ((0b1 << newIndex) ^ this.mask);
    }

    this.onChange(this.convertToSave());
  }

  convertToSave() {
    let result = {};

    SAVED_VALUES.forEach((value) => result[value] = this[value]);

    return JSON.stringify(result);
  }
}

export default UserGame;

function spliceRandom(arr) {
  const index = Math.round(Math.random() * (arr.length - 1));

  return arr.splice(index, 1)[0];
}

function fixGame(cells) {
  window.console.log('fix!');
  let swapCells = [];
  let i = cells.length;

  while (swapCells.length < 2) {
    i--;
    if (cells[i] !== 0) {
      swapCells.push({ value: cells[i], index: i });
    }
  }

  cells[swapCells[0].index] = swapCells[1].value;
  cells[swapCells[1].index] = swapCells[0].value;
}

function checkGame(cells) {
  let chaos = 0;
  const length = cells.length;

  cells.forEach((cell, index) => {
    let i = index + 1;

    if (cell !== 0) {
      for (i; i < length; i++) {
        if (cells[i] !== 0 && cell > cells[i]) {
          chaos++;
        }
      }
    }
  });

  if (chaos % 2 === 1) {
    fixGame(cells);
  }
}

function generateGame(size) {
  let values = [];
  let result = [];

  const cells = Math.pow(size, 2);

  for (let i = 0; i < cells; i++) {
    values.push(i);
  }

  for (let i = 0; i < cells; i++) {
    result.push(spliceRandom(values));
  }

  checkGame(result);

  return result;
}

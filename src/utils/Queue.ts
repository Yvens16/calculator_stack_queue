import { Operator } from "./stack";
export class Queue {
  items: Array<number | Operator> = [];
  constructor() { }

  emptyQueue() {
    this.items = [];
  }
  // isEmpty()
  isEmpty() {
    // return true if this.items is empty else false;
    return this.items.length === 0;
  }

  // Enqueue veut dire ajouter un element à la fin de la queue
  enqueue(number: number | Operator) {
    this.items.push(number);
  }

  // Dequeue veut dire retirer un element du début de la queue
  dequeue() {
    if (!this.isEmpty()) {
      return this.items.shift();
    }
    return "Queue Empty"
  }

  ShowFirstInQueue() {
    if (!this.isEmpty()) {
      return this.items[0];
    }
    return "Queue Empty";
  }

  printQueue() {
    let str = "";
    for (let i = 0; i < this.items.length; i++) {
      str += this.items[i] + " ";
    }
    return str;
  }

  getNextOperator() {
    let idx: number = 0;
    for (const token of this.items) {
      if (typeof token !== "number") {
        idx = this.items.indexOf(token)
        break;
      }
    }
    return this.items.splice(idx, 1)[0]; 
  }

  getSize() {
    return this.items.length;
  }
}
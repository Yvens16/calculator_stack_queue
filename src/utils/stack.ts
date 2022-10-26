// Classes
// https://www.typescriptlang.org/docs/handbook/2/classes.html#constructors


// Stack
// https://www.geeksforgeeks.org/implementation-stack-javascript/#:~:text=In%20this%20article%2C%20we%20would,(First%20in%20Last%20Out).
export type Operator = "+" | "-" | "÷" | "X"  | "=" | "%" | "AC";

export class Stack {
  items: Array<number | Operator> = [];
  constructor() {
  }
  emptyStack(){
    this.items = [];
  }
  // Push an eleement to the stack
  push(element: number | Operator) {
    this.items.push(element);
  }

  // pop()
  pop() {
    if (!this.isEmpty()) return this.items.pop();
    return "Stack Empty";
  }

  // peek()
  peek() {
    return this.items[this.items.length - 1]
  }

  // isEmpty()
  isEmpty() {
    // return true if this.items is empty else false;
    return this.items.length === 0;
  }


  // printStack()
  printStack() {
    // Print a string with all current elements in the stack
    let str = "";
    for (var i = 0; i < this.items.length; i++)
      str += this.items[i] + " ";
    return str;
  }

  getSize() {
    return this.items.length;
  }
}
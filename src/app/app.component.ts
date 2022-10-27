import { Component } from '@angular/core';
import { Stack, Operator } from 'src/utils/stack';
import { Queue } from 'src/utils/Queue';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  onInit() {}
  topkeys = [
    { value: 'AC', type: 'operator' },
    { value: '%', type: 'operator' },
    { value: '÷', type: 'operator' },
  ];
  middleKeys = [
    { value: '7', type: 'number' },
    { value: '8', type: 'number' },
    { value: '9', type: 'number' },
    { value: 'X', type: 'operator' },
    { value: '4', type: 'number' },
    { value: '5', type: 'number' },
    { value: '6', type: 'number' },
    { value: '-', type: 'operator' },
    { value: '1', type: 'number' },
    { value: '2', type: 'number' },
    { value: '3', type: 'number' },
    { value: '+', type: 'operator' },
  ];
  bottomkeys = [
    { value: '0', type: 'number' },
    { value: '.', type: 'number' },
    { value: '=', type: 'operator' },
  ];
  numberToDisplay: number = 0;
  numberString: string = '0';
  result: number = 0;
  title = 'calculator_stack_queue';
  queue = new Queue();
  tempStack = new Stack();
  calculatorStack = new Stack();
  precedence: { [key: string]: number } = {
    '+': 1,
    '-': 1,
    X: 2,
    '÷': 2,
    '%': 3,
  };

  isAnumber(key: Operator | number | string) {
    return typeof key === 'number';
  }

  addOperatorToTempStack(key: Operator | number | string) {
    this.tempStack.push(key as Operator);
  }

  removeOperatorToTempStack() {
    this.tempStack.pop();
  }

  moveOperatorFromStackToQueue(key: Operator | number | string) {
    let operator = this.tempStack.pop();
    this.queue.enqueue(operator as Operator);
    this.addOperatorToTempStack(key);
  }

  EmptyStack() {
    // Quand j'appuie sur égal, je dois vider le stack si il y reste des éléments
    let stackSize = this.tempStack.getSize();
    for (let i = 0; i < stackSize; i++) {
      let operatorToPush = this.tempStack.pop() as Operator;
      this.queue.enqueue(operatorToPush);
    }
  }

  makeOperation(token: string, number1: number, number2: number) {
    switch (token) {
      case '+':
        return number1 + number2;
      case '-':
        return number1 - number2;
      case 'X':
        return number1 * number2;
      case '÷':
        return number1 / number2;
      case '%':
        let nextToken = this.queue.getNextOperator();
        return this.calculatePercentage(
          nextToken as unknown as Operator,
          number1,
          number2
        );
    }
    return 'wrong operator';
  }

  keySent = false;
  getKey(key: string) {
    console.log('prevKey:', this.prevKey);

    if (key === 'AC') {
      this.clearStackAndQueue();
      this.calculatorStack.emptyStack();
      this.result = 0;
      this.numberString = '0';
      return;
    }
    console.log('this.numberString:', this.numberString);
    if (isNaN(parseFloat(key)) && key !== '.') {
      if (
        parseFloat(this.prevKey as string) ||
        parseFloat(this.prevKey as string) === 0
      ) {
        this.keyManager(parseFloat(this.numberString));
      }
      this.keyManager(key);
      this.keySent = true;
    } else {
      if (this.numberString === '0' || this.keySent === true) {
        this.numberString = '';
        this.keySent = false;
      }
      this.numberString += key;
    }
    this.prevKey = key;
  }

  calculatePercentage(nextToken: Operator, number1: number, number2: number) {
    switch (nextToken) {
      case '+':
        return (number2 / 100) * number1 + number1;
      case '-':
        return number1 - (number2 / 100) * number1;
      case 'X':
        return (number2 / 100) * number1;
      case '÷':
        return (number1 * 100) / number2;
    }
    return 'wrong operator';
  }

  calculateResult() {
    while (this.queue.getSize() > 0) {
      let token = this.queue.dequeue();
      if (typeof token === 'number') {
        this.calculatorStack.push(token);
      } else {
        let number2 = this.calculatorStack.pop();
        let number1 = this.calculatorStack.pop();
        let result = this.makeOperation(
          token as string,
          number1 as number,
          number2 as number
        );
        this.calculatorStack.push(result as number);
      }
    }

    // Quand il n'y a plus rien dans la queue
    this.result = this.calculatorStack.peek() as number;
    console.log('this.result:', this.result);
    this.numberString = `${this.result}`;
    console.log('this.numberString:', this.numberString);
  }

  clearStackAndQueue() {
    this.tempStack.emptyStack();
    this.queue.emptyQueue();
    // this.calculatorStack.emptyStack();
  }

  isNewCalcul(key: Operator | number | string) {
    if (this.result > 0 && typeof key === 'number' && this.queue.getSize() > 0)
      return true;
    return false;
  }

  keyManager(key: number | Operator | string) {
    if (this.isNewCalcul(key)) {
      this.calculatorStack.emptyStack();
      if (parseFloat(this.prevKey as string)) this.numberString = '0';
    }

    if (key === '=') {
      this.EmptyStack();
      this.calculateResult();
      this.clearStackAndQueue();
      return;
    }
    // Shunting Yard Algorithms see src/utils/explanation/Shunting-yard_Algorithm.png
    // C'est un peu différent car on ajoute les éléement au fur et à mesure
    this.addAllKeysToQueue(key);
  }

  prevKey: number | Operator | string = '';

  addAllKeysToQueue(key: number | Operator | string) {
    console.log('prevKey:', this.prevKey);
    // Ici dès qu'on rencontre un chiffre on le met dans la queue
    // Ensuite il y a 3 possibilités quand on rencontre un opérateur (voir ***)
    if (this.isAnumber(key)) this.queue.enqueue(key as number);
    else {
      if (
        this.prevKey === '+' ||
        this.prevKey === '-' ||
        this.prevKey === 'X' ||
        this.prevKey === '÷'
      )
        this.removeOperatorToTempStack();
      if (this.tempStack.isEmpty()) {
        // Soit la stack est vide donc on ajoute l'opérateur direct dans la pile ***
        this.addOperatorToTempStack(key);
      } else {
        if (this.precedence[key] > this.precedence[this.tempStack.peek()]) {
          // Soit l'opérateur selectionné à une plus grande précédence par rapport à celui qui est présent dans la pile  ***
          // Donc on l'ajoute par dessus pas de soucis
          this.addOperatorToTempStack(key);
        } else {
          // Soit l'opérateur selectionné à une plus petite précédence par rapport à celui qui est présent dans la pile  ***
          // Donc on retire celui de la pile pour le mettre dans la queue
          this.moveOperatorFromStackToQueue(key);
        }
      }
    }
  }
}

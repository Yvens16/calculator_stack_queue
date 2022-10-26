"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var stack_1 = require("src/utils/stack");
var Queue_1 = require("src/utils/Queue");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.result = 0;
        this.title = 'calculator_stack_queue';
        this.queue = new Queue_1.Queue();
        this.tempStack = new stack_1.Stack();
        this.calculatorStack = new stack_1.Stack();
        this.precedence = {
            "+": 1,
            "-": 1,
            "*": 2,
            "/": 2,
            "%": 2
        };
    }
    AppComponent.prototype.onInit = function () {
    };
    ;
    AppComponent.prototype.isAnumber = function (key) {
        return typeof key === "number";
    };
    AppComponent.prototype.addOperatorToTempStack = function (key) {
        this.tempStack.push(key);
    };
    AppComponent.prototype.moveOperatorFromStackToQueue = function (key) {
        var operator = this.tempStack.pop();
        this.queue.enqueue(operator);
        this.addOperatorToTempStack(key);
    };
    AppComponent.prototype.EmptyStack = function () {
        // Quand j'appuie sur égal, je dois vider le stack si il y reste des éléments
        var stackSize = this.tempStack.getSize();
        for (var i = 0; i < stackSize; i++) {
            var operatorToPush = this.tempStack.pop();
            this.queue.enqueue(operatorToPush);
        }
    };
    AppComponent.prototype.makeOperation = function (token, number1, number2) {
        console.log("#################", token);
        switch (token) {
            case "+":
                return number1 + number2;
            case "-":
                return number1 - number2;
            case "*":
                return number1 * number2;
            case "/":
                return number1 / number2;
            case "%":
                var nextToken = this.queue.dequeue();
                return this.calculatePercentage(nextToken, number1, number2);
        }
        return "wrong operator";
    };
    AppComponent.prototype.calculatePercentage = function (nextToken, number1, number2) {
        switch (nextToken) {
            case "+":
                return number2 / 100 * number1 + number1;
            case "-":
                return number1 - number2 / 100 * number1;
            case "*":
                return number2 / 100 * number1;
            case "/":
                return number1 * 100 / number2;
        }
        return "wrong operator";
    };
    AppComponent.prototype.calculateResult = function () {
        while (this.queue.getSize() > 0) {
            var token = this.queue.dequeue();
            if (typeof token === "number")
                this.calculatorStack.push(token);
            else {
                var number2 = this.calculatorStack.pop();
                var number1 = this.calculatorStack.pop();
                var result = this.makeOperation(token, number1, number2);
                this.calculatorStack.push(result);
                console.log('this.calculatorStack:#############################', this.calculatorStack.printStack());
            }
        }
        // Quand il n'y a plus rien dans la queue
        this.result = this.calculatorStack.peek();
    };
    AppComponent.prototype.clearStackAndQueue = function () {
        this.tempStack.emptyStack();
        this.queue.emptyQueue();
        // this.calculatorStack.emptyStack();
    };
    AppComponent.prototype.keyManager = function (key) {
        if (key === "AC") {
            this.clearStackAndQueue();
            this.calculatorStack.emptyStack();
            this.result = 0;
            return;
        }
        if (key === "=") {
            this.EmptyStack();
            this.calculateResult();
            this.clearStackAndQueue();
            return;
        }
        // Shunting Yard Algorithms see src/utils/explanation/Shunting-yard_Algorithm.png
        // C'est un peu différent car on ajoute les éléement au fur et à mesure
        this.addAllKeysToQueue(key);
    };
    AppComponent.prototype.addAllKeysToQueue = function (key) {
        // Ici dès qu'on rencontre un chiffre on le met dans la queue
        // Ensuite il y a 3 possibilités quand on rencontre un opérateur (voir ***)
        if (this.isAnumber(key))
            this.queue.enqueue(key);
        else {
            if (this.tempStack.isEmpty()) {
                // Soit la stack est vide donc on ajoute l'opérateur direct dans la pile ***
                this.addOperatorToTempStack(key);
            }
            else {
                if (this.precedence[key] >= this.precedence[this.tempStack.peek()]) {
                    // Soit l'opérateur selectionné à une plus grande précédence par rapport à celui qui est présent dans la pile  ***
                    // Donc on l'ajoute par dessus pas de soucis
                    this.addOperatorToTempStack(key);
                }
                else {
                    // Soit l'opérateur selectionné à une plus petite précédence par rapport à celui qui est présent dans la pile  ***
                    // Donc on retire celui de la pile pour le mettre dans la queue
                    this.moveOperatorFromStackToQueue(key);
                }
            }
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

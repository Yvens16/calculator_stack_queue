import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'calculator_stack_queue'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('calculator_stack_queue');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('calculator_stack_queue app is running!');
  // });

  it("Should Add numbers to Queue and Operator to Stack by precedence", () => {
    const calculator = TestBed.createComponent(AppComponent).componentInstance;
    calculator.keyManager(2);
    calculator.keyManager("+");
    expect(calculator.queue.printQueue()).toBe('2 ');
    expect(calculator.tempStack.printStack()).toBe('+ ');
    calculator.keyManager("*");
    expect(calculator.tempStack.printStack()).toBe('+ * ');
    calculator.keyManager("-");
    expect(calculator.tempStack.printStack()).toBe('+ - ');
    expect(calculator.queue.printQueue()).toBe('2 * ');
  });

  it('Should empty the tempStack', () => {
    const calculator = TestBed.createComponent(AppComponent).componentInstance;
    calculator.keyManager("+");
    calculator.keyManager("*");
    calculator.keyManager("-");
    calculator.keyManager("*");
    calculator.EmptyStack();
    expect(calculator.tempStack.printStack()).toBe('');
  })

  it("Should calculate result", () => {
    const calculator = TestBed.createComponent(AppComponent).componentInstance;
    calculator.keyManager(2);
    calculator.keyManager("*");
    calculator.keyManager(3);
    calculator.keyManager("=");
    expect(calculator.result).toEqual(6);
    calculator.keyManager("+");
    calculator.keyManager(2);
    calculator.keyManager("=");
    expect(calculator.result).toEqual(8);
    calculator.keyManager("AC");
    expect(calculator.result).toEqual(0);
  });

  it("Should calculate percentage", () => {
    const calculator = TestBed.createComponent(AppComponent).componentInstance;
    calculator.keyManager(2);
    calculator.keyManager("+");
    calculator.keyManager(2);
    calculator.keyManager("%");
    calculator.keyManager("=");
    expect(calculator.result).toEqual(2.04);
    calculator.keyManager("AC");
    calculator.keyManager(2);
    calculator.keyManager("-");
    calculator.keyManager(2);
    calculator.keyManager("%");
    calculator.keyManager("=");
    expect(calculator.result).toEqual(1.96);
    calculator.keyManager("AC");
    calculator.keyManager(2);
    calculator.keyManager("+");
    calculator.keyManager(2);
    calculator.keyManager("%");
    calculator.keyManager("+");
    calculator.keyManager(2);
    calculator.keyManager("="); 
    expect(calculator.result).toEqual(4.04);
  })
});

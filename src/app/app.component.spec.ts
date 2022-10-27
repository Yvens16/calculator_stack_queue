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
    calculator.getKey("2");
    calculator.getKey("+");
    expect(calculator.queue.printQueue()).toBe('2 ');
    expect(calculator.tempStack.printStack()).toBe('+ ');
    calculator.getKey("X");
    expect(calculator.tempStack.printStack()).toBe('X ');
    calculator.getKey("-");
    expect(calculator.tempStack.printStack()).toBe('- ');
    expect(calculator.queue.printQueue()).toBe('2 ');
  });

  it('Should empty the tempStack', () => {
    const calculator = TestBed.createComponent(AppComponent).componentInstance;
    calculator.getKey("+");
    calculator.getKey("X");
    calculator.getKey("-");
    calculator.getKey("X");
    calculator.EmptyStack();
    expect(calculator.tempStack.printStack()).toBe('');
  })

  it("Should calculate result", () => {
    const calculator = TestBed.createComponent(AppComponent).componentInstance;
    calculator.getKey("2");
    calculator.getKey("X");
    calculator.getKey("3");
    calculator.getKey("=");
    expect(calculator.result).toEqual(6);
    calculator.getKey("+");
    calculator.getKey("2");
    calculator.getKey("=");
    expect(calculator.result).toEqual(8);
    calculator.getKey("AC");
    expect(calculator.result).toEqual(0);
  });

  it("Should calculate percentage", () => {
    const calculator = TestBed.createComponent(AppComponent).componentInstance;
    calculator.getKey("2");
    calculator.getKey("+");
    calculator.getKey("2");
    calculator.getKey("%");
    calculator.getKey("=");
    expect(calculator.result).toEqual(2.04);
    calculator.getKey("AC");
    calculator.getKey("2");
    calculator.getKey("-");
    calculator.getKey("2");
    calculator.getKey("%");
    calculator.getKey("=");
    expect(calculator.result).toEqual(1.96);
    calculator.getKey("AC");
    calculator.getKey("2");
    calculator.getKey("+");
    calculator.getKey("2");
    calculator.getKey("%");
    calculator.getKey("+");
    calculator.getKey("2");
    calculator.getKey("="); 
    expect(calculator.result).toEqual(4.04);
  })
});

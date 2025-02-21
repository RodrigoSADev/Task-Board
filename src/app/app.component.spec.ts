import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the task board title', () => {
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('[data-test="task-board-title"]')?.textContent
    ).toContain('Meu Quadro de Tarefas');
  });

  it('should render the task form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-task-form')).toBeTruthy();
  });

  it('should render the task list', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-task-list')).toBeTruthy();
  });
});

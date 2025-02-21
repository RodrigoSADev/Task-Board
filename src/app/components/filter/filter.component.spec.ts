import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title correctly', () => {
    const element = fixture.nativeElement;
    const title = element.querySelector('[data-test="filter-title"]');
    expect(title).toBeTruthy();
  });

  it('should render mat-form-field', () => {
    const element = fixture.nativeElement;
    const formField = element.querySelector('[data-test="filter-form-field"]');
    expect(formField).toBeTruthy();
  });

  it('should render mat-select with correct label', () => {
    const element = fixture.nativeElement;
    const matLabel = element.querySelector('[data-test="filter-label"]');
    const matSelect = element.querySelector('[data-test="filter-select"]');

    expect(matLabel).toBeTruthy();
    expect(matSelect).toBeTruthy();
    expect(matLabel.textContent).toContain('Categoria');
  });

  it('should have predefined categories', () => {
    expect(component.categories).toHaveLength(5);
    expect(component.categories).toContainEqual({
      value: 'home',
      viewValue: 'Casa',
    });
    expect(component.categories).toContainEqual({
      value: 'work',
      viewValue: 'Trabalho',
    });
    expect(component.categories).toContainEqual({
      value: 'study',
      viewValue: 'Estudo',
    });
    expect(component.categories).toContainEqual({
      value: 'personal',
      viewValue: 'Pessoal',
    });
    expect(component.categories).toContainEqual({
      value: 'other',
      viewValue: 'Outros',
    });
  });

  it('should emit selected category when onFilterChange is called', () => {
    const emitSpy = jest.spyOn(component.filterChange, 'emit');

    const testCategory = 'home';
    component.onFilterChange(testCategory);

    expect(emitSpy).toHaveBeenCalledWith(testCategory);
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit different categories correctly', () => {
    const emitSpy = jest.spyOn(component.filterChange, 'emit');

    const testCategories = ['home', 'work', 'study'];

    testCategories.forEach((category) => {
      component.onFilterChange(category);
      expect(emitSpy).toHaveBeenCalledWith(category);
    });

    expect(emitSpy).toHaveBeenCalledTimes(testCategories.length);
  });
});

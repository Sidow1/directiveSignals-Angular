import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'orange';
  private _errors?: ValidationErrors | null;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }
  @Input() set errors(value: ValidationErrors | null) {
    this._errors = value;
    this.setErrorMessage();
  }
  constructor(private element: ElementRef<HTMLElement>) {
    this.htmlElement = element;
  }
  ngOnInit(): void {}

  setStyle(): void {
    if (!this.htmlElement) return;

    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerHTML = '';
      return;
    }

    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerHTML = 'Este campo es requerido';
      return;
    }

    if (errors.includes('minlength')) {
      const min = this._errors['minlength'].requiredLength;
      const actual = this._errors['minlength'].actualLength;
      this.htmlElement.nativeElement.innerHTML = `Este campo debe tener al menos ${min} caracteres, actualmente tiene ${actual}`;
      return;
    }

    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerHTML = 'Este campo debe ser un email';
      return;
    }
  }
}

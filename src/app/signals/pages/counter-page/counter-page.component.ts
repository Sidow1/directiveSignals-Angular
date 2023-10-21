import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styles: [],
})
export class CounterPageComponent {
  public counter = signal<number>(10);
  public squareCounter = computed(() => this.counter() * this.counter());

  increaseBy(value: number) {
    this.counter.update((current) => current + value);
  }

  decreaseBy(value: number) {
    this.counter.update((current) => current - value);
  }
}

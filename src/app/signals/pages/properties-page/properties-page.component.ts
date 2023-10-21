import { Component, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styles: [],
})
export class PropertiesPageComponent {
  public counter = signal<number>(10);

  public user = signal<User>({
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
  });

  public fullName = computed<string>(() => {
    return `${this.user().first_name} ${this.user().last_name}`;
  });

  public userChangedEffect = effect(() => {
    console.log(`${this.user().first_name} - ${this.counter()}`);
  });

  increaseBy(value: number): void {
    this.counter.update((current) => current + value);
  }

  onFieldUpdated(field: keyof User, value: string): void {
    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });

    // this.user.update((current) => {
    //   return {
    //     ...current,
    //     [field]: value,
    //   };
    // })

    this.user.mutate((current) => {
      switch (field) {
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'email':
          current.email = value;
          break;
        case 'id':
          current.id = Number(value);
          break;
      }
    });
  }
}

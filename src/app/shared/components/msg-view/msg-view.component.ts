import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-msg-view',
  standalone: true,
  imports: [NgClass],
  template: ` <p [ngClass]="type">{{ msg }}</p> `,
  styles: `
    p {
      font-size: 12px;

      &.success {
        color: green;
      } 

      &.error {
        color: red;
      }
    }
  `,
})
export class MsgViewComponent {
  @Input() type!: 'success' | 'error';
  @Input() msg!: string;
}

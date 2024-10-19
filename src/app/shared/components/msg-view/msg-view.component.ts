import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-msg-view',
  standalone: true,
  imports: [NgStyle],
  template: ` <p [ngStyle]="{ color: color }">{{ msg }}</p> `,
  styles: `
    p {
      font-size: 12px;

      &.success {
        color: green;
      } 

      &.error {
        color: yellow;
      }
    }
  `,
})
export class MsgViewComponent {
  @Input() msg!: string;
  @Input() color!: string;
}

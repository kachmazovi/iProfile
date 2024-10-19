import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `
    <div class="wrapper">
      <div class="spinner"></div>
    </div>
  `,
  styles: `
    .wrapper {
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      opacity: 0.5;
      position: absolute;
      z-index: 1;

      .spinner {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: lightblue;
        animation: rotate 2s linear  infinite;
      }
    }

    @keyframes rotate {
      50% {
        transform: rotateY(180deg)
      }
      100% {
        transform: rotateY(360deg)
      }
    }
  `,
})
export class SpinnerComponent {}

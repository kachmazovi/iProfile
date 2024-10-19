import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserInfoService } from './shared/services/user-info.service';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'iProfile';

  constructor(public userServ: UserInfoService) {}
}

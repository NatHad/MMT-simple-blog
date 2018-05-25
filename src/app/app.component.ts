import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router) {}

  public navigate(event): void {
    if (event.index === 0 ) { this.router.navigateByUrl('/list'); }
    if (event.index === 1 ) { this.router.navigateByUrl('/blog'); }
    }

}

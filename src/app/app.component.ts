import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private isSideNavCollapsed: boolean = false;
  title = 'angular-app';

  OnSideNavChange(flag) {
    this.isSideNavCollapsed = flag;
  }

  ngOnInit() {
    
  }
}

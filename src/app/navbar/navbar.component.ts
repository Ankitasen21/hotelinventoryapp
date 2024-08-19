import { Component } from '@angular/core';
import { SearchComponent } from "../search/search.component";

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [SearchComponent]
})
export class NavbarComponent {

}

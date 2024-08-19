import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  taskDone: boolean = false;

  handleClick(event: MouseEvent): void {
    const id = (event.target as HTMLElement).id;
    const label = document.getElementById(id);
    if (label) {
      label.style.textDecoration =
        label.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    }
  }
}

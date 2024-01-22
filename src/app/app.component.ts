import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, ContactFormComponent, ContactItemComponent, ContactListComponent]
})

export class AppComponent {
}

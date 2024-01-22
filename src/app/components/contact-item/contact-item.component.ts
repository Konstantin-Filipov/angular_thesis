import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContactsApiService } from '../../services/api/contacts-api.service';

@Component({
  selector: 'app-contact-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-item.component.html'
})
export class ContactItemComponent {
  @Input() contact: any;

  constructor(private contactApiService: ContactsApiService) { }

  handleEdit(): void {
    this.contactApiService.setCurrentContact(this.contact)
    console.log(this.contactApiService.currentContact$)
    window.scrollTo(0, 0)
  }

  handleDelete(): void {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      this.contactApiService.deleteContact(this.contact._id);
      this.contactApiService.setCurrentContact(null)
    }
  }

}

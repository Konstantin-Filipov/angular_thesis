import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ContactsApiService } from '../../services/api/contacts-api.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './contact-form.component.html'
})

export class ContactFormComponent implements OnInit {

  getInitialContactState = () => ({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  contact: any = this.getInitialContactState();

  constructor(private contactService: ContactsApiService) { }

  ngOnInit(): void {
    this.contactService.currentContact$.subscribe(currentContact => {
      this.contact = currentContact || this.getInitialContactState();
    });
  }

  handleSubmit(form: NgForm): void {
    if (this.contact._id) {
      this.contactService.updateContact(this.contact._id, this.contact);
    } else {
      this.contactService.addContact(this.contact);
    }
    this.contact = this.getInitialContactState();
    this.contactService.setCurrentContact(null);
  }

  handleChange(name: string, value: any): void {
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      this.contact = {
        ...this.contact,
        address: {
          ...this.contact.address,
          [addressField]: value
        }
      };
    } else {
      this.contact = { ...this.contact, [name]: value };
    }
  }

  handleCancel(): void {
    this.resetFormAndCurrentContact();
  }

  private resetFormAndCurrentContact(): void {
    this.contact = this.getInitialContactState();
    this.contactService.setCurrentContact(null);
  }

  shouldShowCancelButton(): boolean {
    return !!this.contact._id;
  }
}


import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common'
import { ContactsApiService } from '../../services/api/contacts-api.service';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { initializeContactList } from '../../services/state/contact-state.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [NgFor, ContactItemComponent],
  templateUrl: './contact-list.component.html', // loop through array and render it from here
  styleUrl: '/src/app/app.component.css'
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];

  constructor(private contactApiService: ContactsApiService) { }

  ngOnInit(): void {
    // call a function promise to api service
    initializeContactList(this.contactApiService, (contacts: any[]) => {
      //update contacts
      this.contacts = contacts;
    });
  }
}

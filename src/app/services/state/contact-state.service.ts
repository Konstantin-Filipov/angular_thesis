import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContactsApiService } from '../api/contacts-api.service';


export function initializeContactList(contactApiService: ContactsApiService, callback: (contacts: any[]) => void): void {
  contactApiService.contacts$.subscribe(contacts => {
    callback(contacts);
  });

  // Fetch initial contacts
  contactApiService.getContacts();
}
export class ContactStateService {

  constructor() { }

  // addContact(contact: any): void {
  //   const currentContacts = this.contactsSubject.value;
  //   this.contactsSubject.next([...currentContacts, contact]);
  // }

  // updateContact(updatedContact: any): void {
  //   const currentContacts = this.contactsSubject.value;
  //   const updatedContacts = currentContacts.map(contact =>
  //     contact.id === updatedContact.id ? updatedContact : contact
  //   );
  //   this.contactsSubject.next(updatedContacts);
  // }

  // deleteContact(contactId: any): void {
  //   const currentContacts = this.contactsSubject.value;
  //   const updatedContacts = currentContacts.filter(contact => contact.id !== contactId);
  //   this.contactsSubject.next(updatedContacts);
  // }
}

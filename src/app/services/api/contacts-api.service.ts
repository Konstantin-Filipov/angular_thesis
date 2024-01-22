import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { ContactStateService } from '../state/contact-state.service';
import { BehaviorSubject } from 'rxjs';


const API_URL = "http://localhost:5000/contacts"

@Injectable({
  providedIn: 'root'
})
export class ContactsApiService {
  //state for all contacts
  private contactsSubject = new BehaviorSubject<any[]>([]);//create behaviour subject 
  contacts$ = this.contactsSubject.asObservable(); //set an observable

  //state fot current contact
  private currentContactSubject = new BehaviorSubject<any | null>(null);
  currentContact$ = this.currentContactSubject.asObservable()

  constructor() { }



  async getContacts() {
    try {
      // req to api
      const response = await axios.get(API_URL);
      //response
      const contacts = response.data;

      console.log("Retrieved contacts:", contacts);//simple log to check array

      //update the state using behaviour subject
      this.contactsSubject.next(contacts);

      console.log("retrieval of data- successful")
      return contacts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  setCurrentContact(contact: any | null) {
    this.currentContactSubject.next(contact);
  }


  async addContact(contactData: any): Promise<void> {
    try {
      const response = await axios.post(API_URL, contactData);
      this.contactsSubject.next([...this.contactsSubject.value, response.data]);
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  }

  async updateContact(id: any, contactData: any): Promise<void> {
    try {
      const response = await axios.put(`${API_URL}/${id}`, contactData);
      const updatedContacts = this.contactsSubject.value.map((contact) =>
        contact._id === id ? response.data : contact
      );
      this.contactsSubject.next(updatedContacts);
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  }

  async deleteContact(id: any): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedContacts = this.contactsSubject.value.filter(
        (contact) => contact._id !== id
      );
      this.contactsSubject.next(updatedContacts);
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
}

import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { ContactStateService } from '../state/contact-state.service';
import { BehaviorSubject } from 'rxjs';


const API_URL = "http://localhost:5000/contacts"

@Injectable({
  providedIn: 'root'
})
export class ContactsApiService {

  private contactSubject = new BehaviorSubject<any[]>([]);//create behaviour subject 
  contacts$ = this.contactSubject.asObservable(); //set an observable

  constructor() { }

  async getContacts() {
    try {
      // req to api
      const response = await axios.get(API_URL);
      //response
      const contacts = response.data;

      console.log("Retrieved contacts:", contacts);//simple log to check array

      //update the state using behaviour subject
      this.contactSubject.next(contacts);

      console.log("retrieval of data- successful")
      return contacts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // constructor(private contactStateService: ContactStateService) { }

  // async getAllContacts(): Promise<void> {
  //   try {
  //     const resp = await axios.get(API_URL);
  //   } catch (error) {
  //     console.error('Error getting contacts:', error);
  //     throw error;
  //   }
  // }

  // async addContact(contactData: any): Promise<void> {
  //   try {
  //     const response = await axios.post(API_URL, contactData);
  //     this.contactStateService.addContact(response.data);
  //   } catch (error) {
  //     console.error('Error adding contact:', error);
  //     throw error;
  //   }
  // }

  // async updateContact(id: any, contactData: any): Promise<void> {
  //   try {
  //     const response = await axios.put(`${API_URL}/${id}`, contactData);
  //     this.contactStateService.updateContact(response.data);
  //   } catch (error) {
  //     console.error('Error updating contact:', error);
  //     throw error;
  //   }
  // }

  // async deleteContact(id: any): Promise<void> {
  //   try {
  //     await axios.delete(`${API_URL}/${id}`);
  //     this.contactStateService.deleteContact(id);
  //   } catch (error) {
  //     console.error('Error deleting contact:', error);
  //     throw error;
  //   }
  // }
}

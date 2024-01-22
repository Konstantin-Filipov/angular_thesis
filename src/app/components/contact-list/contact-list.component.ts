import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { NgFor } from '@angular/common'
import { ContactsApiService } from '../../services/api/contacts-api.service';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { initializeContactList } from '../../services/state/contact-state.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [NgFor, ContactItemComponent],
  templateUrl: './contact-list.component.html' // loop through array and render it from here
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];
  visibleCount = 10;

  constructor(private contactApiService: ContactsApiService) { }

  ngOnInit(): void {
    // call a function promise to api service
    initializeContactList(this.contactApiService, (contacts: any[]) => {
      // update contacts
      this.contacts = contacts;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.shouldLoadMore()) {
      // Load more contacts
      this.visibleCount += 10;
    }
  }

  shouldLoadMore(): boolean {
    // Check if the user has scrolled to the bottom
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.body.scrollHeight;

    return scrollPosition >= documentHeight;
  }
}


import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-contact-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-item.component.html',
  styleUrl: '/src/app/app.component.css'
})
export class ContactItemComponent {
  @Input() contact: any;

  handleEdit(): void {
    // Add logic for handling edit
  }

  handleDelete(): void {
    // Add logic for handling delete
  }

  constructor() { }
}

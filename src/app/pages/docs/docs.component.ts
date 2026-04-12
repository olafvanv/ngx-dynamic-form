import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicFormComponent, DynamicFormService } from 'ngx-dynamic-form';
import { API_DATA } from './data/api.data';
import { CONTROLS_DATA } from './data/controls.data';
import { UTILITIES_DATA } from './data/utilities.data';
import { LibraryDoc } from './docs.models';

type CategorySection = {
  name: string;
  section: LibraryDoc[];
};

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    DynamicFormComponent
  ],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.scss'
})
export class DocsComponent {
  private dynamicFormService = inject(DynamicFormService);

  public sections = signal<LibraryDoc[]>([...CONTROLS_DATA, ...API_DATA, ...UTILITIES_DATA]);
  public sectionsByCategory = computed<CategorySection[]>(() => {
    return this.sections().reduce((acc, section) => {
      const category = acc.find((c) => c.name === section.category);
      if (category) {
        category.section.push(section);
      } else {
        acc.push({ name: section.category, section: [section] });
      }
      return acc;
    }, [] as CategorySection[]);
  });

  public selectedSection = signal<LibraryDoc>(this.sections()[0]);

  public categories = ['Controls', 'API', 'Utilities'];
  // public selectedSection = this.sections()[0];
  public formsControls: Map<string, FormGroup> = new Map();

  constructor() {
    this.sections().forEach((s) => {
      if (s.config) {
        this.formsControls.set(s.id, this.dynamicFormService.createFormGroup(s.config));
      }
    });
  }

  public selectSection(section: LibraryDoc) {
    this.selectedSection.set(section);
  }

  public getSectionsByCategory(category: string) {
    return this.sections().filter((s) => s.category === category);
  }
}

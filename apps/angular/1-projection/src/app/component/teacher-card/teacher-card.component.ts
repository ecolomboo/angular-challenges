import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <ng-template #teacherTemplate let-item>
      <app-list-item
        [name]="item.firstName"
        [id]="item.id"
        (deleteItem)="deleteItem($event)" />
    </ng-template>
    <app-card
      [itemTemplate]="teacherTemplate"
      [list]="teachers()"
      (onAddItem)="addNewItem()"
      customClass="bg-light-red">
      <img ngSrc="assets/img/teacher.png" width="200" height="200" />
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }
}

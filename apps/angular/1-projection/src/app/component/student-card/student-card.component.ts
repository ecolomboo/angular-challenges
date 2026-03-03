import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <ng-template #studentTemplate let-item>
      <app-list-item
        [name]="item.firstName"
        [id]="item.id"
        (deleteItem)="deleteItem($event)" />
    </ng-template>
    <app-card
      [itemTemplate]="studentTemplate"
      [list]="students()"
      customClass="bg-light-green"
      (onAddItem)="addNewItem()">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgOptimizedImage, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;
  cardType = CardType.STUDENT;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }
}

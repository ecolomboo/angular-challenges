import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [style.background-color]="style()">
      <ng-content select="img"></ng-content>

      <section>
        @for (item of list(); track item) {
          <ng-container
            *ngTemplateOutlet="
              itemTemplate();
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  @Output() onDeleteItem = new EventEmitter<number>();
  @Output() onAddItem = new EventEmitter<void>();

  readonly itemTemplate = input.required<TemplateRef<any>>();
  readonly style = input('');
  readonly list = input<any[] | null>(null);

  deleteItem(id: number) {
    this.onDeleteItem.emit(id);
  }

  addNewItem() {
    this.onAddItem.emit();
  }
}

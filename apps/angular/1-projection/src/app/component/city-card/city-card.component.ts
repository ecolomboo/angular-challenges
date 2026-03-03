import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <ng-template #cityTemplate let-item>
      <app-list-item
        [name]="item.name"
        [id]="item.id"
        (deleteItem)="deleteItem($event)" />
    </ng-template>
    <app-card
      [itemTemplate]="cityTemplate"
      [list]="cities()"
      (onAddItem)="addNewItem()"
      customClass="bg-light-red">
      <img ngSrc="assets/img/city.png" width="200" height="200" />
    </app-card>
  `,
  imports: [CardComponent, ListItemComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.citiesList;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }
}

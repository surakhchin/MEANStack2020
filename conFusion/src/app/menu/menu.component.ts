import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Leader } from "../shared/leader";

import { DishService } from '../services/dish.service';
import { LeaderService } from "../services/leader.service";

import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})


export class MenuComponent implements OnInit {


  dishes: Dish[];
  leaders: Leader[];
  errMess: string;

  // selectedDish: Dish;
  //
  // onSelect(dish: Dish) {
  //   this.selectedDish = dish;
  // }

  constructor(private dishService: DishService,
              @Inject('BaseURL') private BaseURL,
              private leaderService: LeaderService) { }

  ngOnInit() {

   // this is when we had Promises, now we are using Observables
   // this.dishService.getDishes()
   //      .then(dishes => this.dishes = dishes);

    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);


    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders);


  }

}

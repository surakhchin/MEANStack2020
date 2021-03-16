import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Leader } from "../shared/leader";

import { DishService } from '../services/dish.service';
import { LeaderService } from "../services/leader.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {


  dishes: Dish[];
  leaders: Leader[];

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

    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);


    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders);


  }

}

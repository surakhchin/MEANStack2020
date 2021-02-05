import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
// import { DISHES } from '../shared/dishes';
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

  selectedDish: Dish;

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

  constructor(private dishService: DishService,
              private leaderService: LeaderService) { }

  ngOnInit() {
   this.dishService.getDishes()
        .then(dishes => this.dishes = dishes);
    this.leaderService.getLeaders()
        .then(leaders => this.leaders = leaders);

  }

}

import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Comment } from '../shared/comment';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { DishService } from '../services/dish.service';

import { switchMap } from 'rxjs/operators';
import {ContactType, Feedback} from "../shared/feedback";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";




@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})


export class DishdetailComponent implements OnInit {


  @ViewChild('cform') commentFormDirective;

  commentForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  dishcopy: Dish;

  formErrors = {
    'author': '',
    'comment': '',
    'rating': '',
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 2 characters long.',
      'maxlength':     'Comment cannot be more than 100 characters long.'
    },
    'rating': {
      'required':      'Rating is required.'
    },
  };



  // @Input()
  dish: Dish;
  errMess: string;

  comment: Comment;

  dishIds: string[];
  prev: string;
  next: string;


  constructor(private dishservice: DishService,
    @Inject('BaseURL') private BaseURL,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
    this.createForm();

  }


  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.dishservice.getDish(id)
        .subscribe(dish => this.dish = dish);

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
        errmess => this.errMess = <any>errmess );
  }


  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)] ],
      rating: ['5', [Validators.required] ]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  addComment(comment) {
    const id = this.route.snapshot.params['id'];
    DISHES[id].comments.push(comment)
  }

  onSubmit() {
    this.feedback = this.commentForm.value;
    this.feedback.date = new Date().toISOString();
    console.log(this.feedback);

    this.dishcopy.comments.push(this.feedback);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => {
      console.log('error')});

    this.commentFormDirective.resetForm({rating: '5'});
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: '5',
    });
    this.addComment(this.feedback);




  }


  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

  }

}

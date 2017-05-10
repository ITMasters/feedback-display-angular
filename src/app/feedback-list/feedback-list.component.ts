import { Component, OnInit } from '@angular/core';
import {FeedbackService} from '../feedback.service';
import {Feedback} from '../feedback';
import {EventStats} from '../eventstats';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbackItems: Feedback[];
  events: string[] = [];
  eventStats: EventStats[] = [];
  searchActive: boolean;
  searchResults: EventStats[] = [];
  currentStats: EventStats[] = [];
  sortDirection: boolean;
  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.getFeedbackItems();
    this.searchActive = false;
    this.currentStats = this.eventStats;
    this.sortDirection = true;
  }
  getFeedbackItems(): void {
    this.feedbackService.getFeedback()
      .then(feedbackItems => {
        this.feedbackItems = feedbackItems;
        this.updateEvents();
      });
  }
  updateEvents(): void {
    this.feedbackItems.forEach(item => {
      if (this.events.indexOf(item.event) === -1) {
        this.events.push(item.event);
      }
    });
    this.events.forEach(event => {
      let responses = 0;
      let totalRating = 0;
      const eventStat = new EventStats();
      this.feedbackItems.filter(item => item.event === event)
        .forEach(item => {
          responses += 1;
          totalRating += +item.rating;
        });
      eventStat.name = event;
      eventStat.numRatings = responses;
      eventStat.aggregateRating = totalRating / responses;
      this.eventStats.push(eventStat);
    });
  }
  getEventFeedback(event: string): Feedback[] {
    return this.feedbackItems.filter(item => item.event === event);
  }
  search(term: string): void {
    if (term !== ''){
      this.searchActive = true;
      this.searchResults = this.eventStats.filter(event => event.name.indexOf(term) !== -1);
      this.currentStats = this.searchResults;
    } else {
      this.searchResults = [];
      this.currentStats = this.eventStats;
      this.searchActive = false;
    }
  }
  sortStats(type: string): void {
    this.currentStats.sort((a, b) => {
      let sortA: any;
      let sortB: any;
      if (type === 'name'){
        sortA = a.name.toLowerCase();
        sortB = b.name.toLowerCase();
      } else if (type === 'rating') {
        sortA = a.aggregateRating;
        sortB = b.aggregateRating;
      } else if (type === 'responses') {
        sortA = a.numRatings;
        sortB = b.numRatings;
      }
      if (this.sortDirection) {
        if ( sortA > sortB) {
          return 1;
        } else if ( sortA < sortB) {
          return -1;
        } else {
          return 0;
        }
      } else {
        if ( sortA > sortB) {
          return -1;
        } else if ( sortA < sortB) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    this.sortDirection = !this.sortDirection;
  }
}

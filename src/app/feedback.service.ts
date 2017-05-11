import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Feedback } from './feedback';
@Injectable()
export class FeedbackService {

  private key = 'Ala137lN2uezKOwn40Uct3c1z3asTnNm';
  private feedbackUrl = 'https://www.itmasters.edu.au/wp-json/itm/v1/get_feedback_results?key=' + this.key;  // URL to web api
  constructor(private http: Http) { }
  getFeedback(): Promise<Feedback[]> {
    return this.http.get(this.feedbackUrl)
      .toPromise()
      .then(response => response.json() as Feedback[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

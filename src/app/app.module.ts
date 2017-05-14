import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackService } from './feedback.service';
import { CsvDownloader } from './csv-downloader';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackListComponent,
    CsvDownloader,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
  ],
  providers: [FeedbackService],
  bootstrap: [AppComponent]
})
export class AppModule { }

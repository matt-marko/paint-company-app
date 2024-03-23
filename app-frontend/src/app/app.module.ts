import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwimlaneComponent } from './components/swimlane/swimlane.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { PaintPipe } from './pipes/paint.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SwimlaneComponent,
    KanbanBoardComponent,
    PaintPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    /* Angular Material modules */
    MatGridListModule,
    DragDropModule,
    MatButtonModule
  ],
  providers: [
    PaintPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

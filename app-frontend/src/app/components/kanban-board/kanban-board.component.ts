import { Component, inject } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { PaintStockService } from 'src/app/services/paint-stock.service';
import { Status } from 'src/app/enums/status';
import { PaintPipe } from 'src/app/pipes/paint.pipe';
import { Paint } from 'src/app/paint';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent {
  outOfStock: string[] = [];
  runningLow: string[] = [];
  available: string[] = [];

  outOfStockCurrent: string[] = [];
  runningLowCurrent: string[] = [];
  availableCurrent: string[] = [];

  changesMade: boolean = false;

  paintPipe: PaintPipe = inject(PaintPipe);
  paintStockService: PaintStockService = inject(PaintStockService);
  router: Router = inject(Router);

  ngOnInit(): void {

    this.paintStockService.getPaints().subscribe(paints => {
      this.loadPaints(paints);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    this.changesMade = true;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  cancelChanges(): void {
    this.changesMade = false;

    this.outOfStock = [...this.outOfStockCurrent];
    this.runningLow = [...this.runningLowCurrent];
    this.available = [...this.availableCurrent];
  }

  saveChanges(): void {
    let paintPayload: Paint[] = [];

    this.outOfStock.forEach(outOfStockPaintColour => {
      paintPayload.push({
        colour: outOfStockPaintColour,
        status: 'out of stock',
      });
    });

    this.runningLow.forEach(runningLowPaintColour => {
      paintPayload.push({
        colour: runningLowPaintColour,
        status: 'running low',
      });
    });

    this.available.forEach(availablePaintColour => {
      paintPayload.push({
        colour: availablePaintColour,
        status: 'available',
      });
    });

    this.paintStockService.updatePaints(paintPayload).subscribe(paints => {
      this.loadPaints(paints);
    });
  }

  loadPaints(paints: Paint[]): void {
    this.outOfStockCurrent = [];
    this.runningLowCurrent = [];
    this.availableCurrent = [];

    this.paintStockService.getPaints().subscribe(paints => {
      paints.forEach(paint => {
        switch(paint.status) {
          case 'out of stock':
            this.outOfStockCurrent.push(paint.colour);
            break;
          case 'running low':
            this.runningLowCurrent.push(paint.colour);
            break;
          case 'available':
            this.availableCurrent.push(paint.colour);
            break;
          default:
            break;
        }
      });

      this.outOfStock = [...this.outOfStockCurrent];
      this.runningLow = [...this.runningLowCurrent];
      this.available = [...this.availableCurrent];
    });
  }

  handleLogout(): void {
    this.router.navigate(['']);
  }
}

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

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent {
  outOfStock: string[] = [];
  runningLow: string[] = [];
  available: string[] = [];

  changesMade: boolean = false;

  paintPipe: PaintPipe = inject(PaintPipe);
  paintStockService: PaintStockService = inject(PaintStockService);

  ngOnInit(): void {
    this.loadPaints();
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
    this.loadPaints();
  }

  loadPaints(): void {
    this.outOfStock = [];
    this.runningLow = [];
    this.available = [];

    this.paintStockService.getPaints().forEach(paint => {
      switch(paint.status) {
        case Status.outOfStock:
          this.outOfStock.push(this.paintPipe.transform(paint));
          break;
        case Status.runningLow:
          this.runningLow.push(this.paintPipe.transform(paint));
          break;
        case Status.available:
          this.available.push(this.paintPipe.transform(paint));
          break;
        default:
          break;
      }
    });    
  }
}

import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-counter',
  imports: [CommonModule],
  templateUrl: './game-counter.component.html',
  styleUrls: ['./game-counter.component.scss']
})
export class GameCounterComponent {
  counter = 10;
}

import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-counter.component.html',
  styleUrls: ['./game-counter.component.scss']
})
export class GameCounterComponent implements AfterViewInit {
  counter = 10;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => {
        this.startCountdown();
        this.cdRef.detectChanges();
      });
    }
  }

  async startCountdown() {
    while (this.counter > 0) {
      await this.sleep(1000);
      this.counter--;
    }

    this.router.navigate(['register']);
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

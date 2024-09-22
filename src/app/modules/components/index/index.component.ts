import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
    currentState: 'default' | 'shortBreak' | 'longBreak' = 'default';
    value = 25;
    intervalId: any;
    isStart = false
  
    default() {
      this.clearInterval();
      this.currentState = 'default';
      this.value = 25;
      this.updateMainClass();
      this.updateStart()
    }
  
    shortBreak() {
      this.clearInterval();
      this.currentState = 'shortBreak';
      this.value = 5;
      this.updateMainClass();
      this.updateStart()
    }
  
    longBreak() {
      this.clearInterval();
      this.currentState = 'longBreak';
      this.value = 15;
      this.updateMainClass();
      this.updateStart()
    }
  
    updateMainClass() {
      const mainElement = document.querySelector('main');
      const num = document.querySelector('.num');
  
      mainElement?.classList.remove('default', 'shortBreak', 'longBreak');
      mainElement?.classList.add(this.currentState);
  
      if(num) {
        num.innerHTML = `${this.value}`;
      }
    }

    updateStart() {
      if(this.isStart) {
        this.isStart = false
      }
    }
  
    start() {
      this.isStart = true
      this.clearInterval();
      this.intervalId = setInterval(() => {
        this.value -= 1;
        if(this.value === 0) {
          this.clearInterval();
        }
        this.updateMainClass();
      }, 1000);
    }
  
    clearInterval() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }

  pause() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.updateStart()
    }
  }
}


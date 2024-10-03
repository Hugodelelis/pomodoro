import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Howl } from 'howler';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
    // variables
      currentState: 'default' | 'shortBreak' | 'longBreak' = 'default';
      minute: number = 25;
      second: number = 0
      value = `${this.format(this.minute)}:${this.format(this.second)}`
      intervalId: any;
      isStart = false
      isChecked = true;
  
    // sounds
      alarm = new Howl({
        src: ['assets/alarme.mp3'],
        volume: 1.0,
      });

      sound = new Howl({
        src: ['assets/music.mp3'],
        volume: 0.5,
        loop: true
      });
    
    // modes funcs
    default() {
      this.clearInterval();
      this.currentState = 'default';
      this.minute = 25
      this.second = 0
      this.value = `${this.format(this.minute)}:${this.format(this.second)}`;
      this.updateMainClass();
      this.updateStart()
    }
  
    shortBreak() {
      this.clearInterval();
      this.currentState = 'shortBreak';
      this.minute = 5
      this.second = 0
      this.value = `${this.format(this.minute)}:${this.format(this.second)}`;
      this.updateMainClass();
      this.updateStart()
    }
  
    longBreak() {
      this.clearInterval();
      this.currentState = 'longBreak';
      this.minute = 15
      this.second = 0
      this.value = `${this.format(this.minute)}:${this.format(this.second)}`;
      this.updateMainClass();
      this.updateStart()
    }
    
    // updates funcs
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

    format(value: any) {
      return value < 10 ? value = `0${value}` : value
    }
  
    // controls funcs
    start() {
      this.isStart = true;
      this.clearInterval();
    
      this.intervalId = setInterval(() => {
        if (this.minute === 0 && this.second === 0) {
          this.clearInterval();
          
          this.alarm.play()

          setTimeout(() => {
            this.alarm.stop();
          }, 5500);

          if(this.currentState === 'longBreak' || this.currentState === 'shortBreak') {
            setTimeout(() => {
              this.currentState = 'default'
              this.default()
            }, 2000);
          } else {
            setTimeout(() => {
              this.currentState = 'shortBreak'
              this.shortBreak()
            }, 2000);
          }
        }
        
        this.second -= 1;
    
        if (this.second < 0) {
          this.second = 59;
          this.minute -= 1;
        }
    
        this.value = `${this.format(this.minute)}:${this.format(this.second)}`;
    
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

  next() {
    if(this.currentState === 'default') {
      this.shortBreak()
    } else {
      this.default()
    }
  }

  checkCheckbox() {
    if (this.isChecked) {
      this.sound.play()
      this.isChecked = false
    } else {
      this.sound.stop()
      this.isChecked = true
    }
  }
}


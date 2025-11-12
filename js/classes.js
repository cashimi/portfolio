// ------------------- Brownian Motion -------------------
class cvTriMotion {
  constructor(num, range, strokeColor = 255, fillColor = [255, 0, 0], opacity = 70) {
      this.num = num;
      this.range = range;
      this.ax = [];
      this.ay = [];
      this.strokeColor = strokeColor;
      this.fillColor = fillColor;
      this.opacity = opacity;
      
      for (let i = 0; i < this.num; i++) {
        this.ax[i] = width / 2;
        this.ay[i] = height / 2;
      }
    }
    
    // Method to set new colors
    setColors(stroke, fill, opacity) {
      this.strokeColor = stroke;
      this.fillColor = fill;
      this.opacity = opacity;
    }
    
    display() {
      // Draw a line connecting the points
      for (let j = 1; j < this.num; j++) {
        let val = j / this.num * 204.0 + 51;
        // stroke(this.strokeColor);
        noStroke();
        fill(this.fillColor[0], this.fillColor[1], this.fillColor[2], this.opacity);
        triangle(this.ax[j - 1], this.ay[j - 1], this.ax[j], this.ay[j],this.ax[(j + 1) % this.num], this.ay[(j + 1) % this.num]);
      }
    }

    update() {
      // Shift all elements 1 place to the left
      for (let i = 1; i < this.num; i++) {
        this.ax[i - 1] = this.ax[i];
        this.ay[i - 1] = this.ay[i];
      }
      
      // Put a new value at the end of the array
      this.ax[this.num - 1] += random(-this.range, this.range);
      this.ay[this.num - 1] += random(-this.range, this.range);
      
      // Constrain all points to the screen
      this.ax[this.num - 1] = constrain(this.ax[this.num - 1], 0, width);
      this.ay[this.num - 1] = constrain(this.ay[this.num - 1], 0, height);
    }
  }
  


  
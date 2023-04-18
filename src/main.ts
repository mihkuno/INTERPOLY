import p5 from 'p5';

const sketch = (p: p5) => {
  p.setup = (): void => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  }

  p.draw = (): void => {
    p.background(220);
    
  }
}

const app: HTMLDivElement = document.querySelector('#app')!;
new p5(sketch, app);
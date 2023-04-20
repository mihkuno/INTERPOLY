import p5 from 'p5';


const sketch = (p: p5) => {

  // cartesian coordinates
  let vertices = [
    [0, 0],
    [5, 8],
    [9, 0],
    [13, 4]
  ];

  const windowWidth = 500;
  const windowHeight = 300;
  const cvt_x = (n: number) => (25 * n) + 50;
  const cvt_y = (n: number) => windowHeight - 50 - (25 * n);

  p.setup = (): void => {
    p.createCanvas(windowWidth, windowHeight);
    p.textSize(9);

    // convert cartesian to screen coordinates
    for (const v of vertices) {
      v[0] = cvt_x(v[0]);
      v[1] = cvt_y(v[1]);
    }

    p.print(vertices.flat());
  }

  p.draw = (): void => {
    p.background(30);


    /* create grid */
    p.strokeWeight(1);

    // horizontal line
    for (let i = 50; i <= windowHeight - 50; i += 25) {
      p.stroke('#2c3e50');
      p.line(50, i, windowWidth - (windowWidth / 4), i);
      p.noStroke();
      p.fill(200);
      p.text((windowHeight-i-50) / 25, 30, i+3);
    }

    // vertical line
    for (let i = 50; i <= windowWidth - (windowWidth / 4); i += 25) {
      p.stroke('#2c3e50');
      p.line(i, 50, i, windowHeight - 50);
      p.noStroke();
      p.fill(200);
      p.text((i-50) / 25, i-3, windowHeight - 30);
    }


    /* create points */
    p.stroke('#2ecc71');
    p.strokeWeight(7);

    for (const v of vertices) {
      p.point(v[0], v[1]);
    }

    /* create line */
    p.noFill();
    p.strokeWeight(3);

    const x1 = 50;
    const y1 = 250;
    const x2 = 175;
    const y2 = 50;
    const x3 = 275;
    const y3 = 250;
    const x4 = 375;
    const y4 = 150;

    p.curve(x1, y1, x1, y1, x2, y2, x3, y3);
    p.curve(x1, y1, x2, y2, x3, y3, x4, y4);
    p.curve(x2, y2, x3, y3, x4, y4, x4, y4);


    /* create square */
    p.stroke(0);
    p.strokeWeight(1);
    p.fill('#3498db');
    p.square(cvt_x(15), cvt_y(0)-50 / 2, 50);
    
    p.strokeWeight(7);
    p.point(cvt_x(16), cvt_y(0));

    
    /* create glider */
    p.stroke('#e74c3c');
    p.point(cvt_x(0.5), cvt_y(1));
     
  }
}

const app: HTMLDivElement = document.querySelector('#app')!;
new p5(sketch, app);
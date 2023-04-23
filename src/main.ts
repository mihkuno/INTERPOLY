  /*
    Polynomial interpolation
    Dataset:
  
    x  | y
    ------
    0  | 1
    5  | 7
    9  | 1
    13 | 4

    Equation:
    f(0)  = a(0)^3  + b(0)^2  + c(0)  + d = 1 
    f(5)  = a(5)^3  + b(5)^2  + c(5)  + d = 7
    f(9)  = a(9)^3  + b(9)^2  + c(9)  + d = 1
    f(13) = a(13)^3 + b(13)^2 + c(13) + d = 4

    Matrix:
    [ 0    0   0   1  | 1 ]
    [ 125  25  5   1  | 7 ]
    [ 729  81  9   1  | 1 ]
    [ 2197 169 13  1  | 4 ]

    Solution:
    a = 93 / 2080
    b = -963 / 1040
    c = 9801 / 2080
    d = 1

    f(x) = ((93 / 2080) * x^3) - ((963 / 1040) * x^2) + ((9801 / 2080) * x) + 1

  */



import p5 from 'p5';

type Vertex = [number, number];
type Vertices = [Vertex, Vertex, Vertex, Vertex];

const windowWidth = 500;
const windowHeight = 300;
const cvt_x = (n: number) => (25 * n) + 50;
const cvt_y = (n: number) => windowHeight - 50 - (25 * n);

let x_curr = 0;
let loop_backwards = false;

const polynomial_interpolation = (p: p5) => {

  // cartesian coordinates  
  let vertices: Vertices = [ [0, 1], [5, 7], [9, 1], [13, 4] ];
  const f = (x: number) => ((93 / 2080) * Math.pow(x, 3)) - ((963 / 1040) * Math.pow(x, 2)) + ((9801 / 2080) * x) + 1;

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
    
    /* create polynomial line */
    p.strokeWeight(2.2);

    // computational expensive
    // for (let i = 0; i < 13; i += 0.01) {
    //   p.point(cvt_x(i), cvt_y(f(i)));
    // }

    // efficient method
    p.strokeWeight(2.2);
    p.noFill();
    p.beginShape();
    for (let i = 0; i <= 13; i += 0.35) {
      p.vertex(cvt_x(i), cvt_y(f(i)));
    }
    p.endShape();


    /* create glider */
    p.stroke('#3498db');
    p.strokeWeight(10);
    p.point(cvt_x(x_curr), cvt_y(f(x_curr)));

    if (x_curr >= 12.9) {
      loop_backwards = true;    
    }
    else if (x_curr <= 0.05) {
      loop_backwards = false;
    }

    // console.log(x_curr.toFixed(2), 0, 13);

    if (loop_backwards) {
      x_curr -= 0.1;
    }
    else {
      x_curr += 0.1; 
    }

    /* create glider line */
    p.stroke('#2c3e50');
    p.strokeWeight(1);

    for (let v of vertices) {
      p.line(v[0], v[1], cvt_x(x_curr), cvt_y(f(x_curr)));
    }
    p.line(cvt_x(16), cvt_y(f(x_curr)), cvt_x(x_curr), cvt_y(f(x_curr)));
    
    /* create square */
    p.noStroke();
    p.fill('#3498db');
    p.square(cvt_x(15), cvt_y(f(x_curr)) - 50 / 2, 50);  
    p.stroke(30);
    p.strokeWeight(10);
    p.point(cvt_x(16), cvt_y(f(x_curr)));
     
  }
}





const linear_interpolation = (p: p5) => {

  // cartesian coordinates  
  let vertices: Vertices = [ [0, 1], [5, 7], [9, 1], [13, 4] ];
  let nextVertice = 0;

  p.setup = (): void => {
    p.createCanvas(windowWidth, windowHeight);
    p.textSize(9);
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
      p.point(cvt_x(v[0]), cvt_y(v[1]));
    }
    
    /* create linear line */
    p.strokeWeight(2.2);
    for (let i = 0; i < vertices.length - 1; i++) {
      p.line(cvt_x(vertices[i][0]), cvt_y(vertices[i][1]), cvt_x(vertices[i+1][0]), cvt_y(vertices[i+1][1]));
    }


    /* create glider */

    // [0, 1], [5, 7], [9, 1], [13, 4] 


    console.log(x_curr.toFixed(2), vertices[nextVertice][0]);
    
    if (!loop_backwards && x_curr > vertices[nextVertice+1][0]) {
      nextVertice++;
    }
    else if (x_curr < vertices[nextVertice][0] && vertices[nextVertice][0] != 0) {
      nextVertice--;
    }

    const m = (vertices[nextVertice+1][1] - vertices[nextVertice][1])  / (vertices[nextVertice+1][0] - vertices[nextVertice][0]);
    const b = (-1 * m * vertices[nextVertice][0]) + vertices[nextVertice][1];
    const f = (x: number) => (m * x) + b;
    
    p.stroke('#3498db');
    p.strokeWeight(10);
    p.point(cvt_x(x_curr), cvt_y(f(x_curr)));

    console.log(x_curr);


    /* create glider line */
    p.stroke('#2c3e50');
    p.strokeWeight(1);

    for (let v of vertices) {
      p.line(cvt_x(v[0]), cvt_y(v[1]), cvt_x(x_curr), cvt_y(f(x_curr)));
    }
    p.line(cvt_x(16), cvt_y(f(x_curr)), cvt_x(x_curr), cvt_y(f(x_curr)));
    

    /* create square */
    p.noStroke();
    p.fill('#3498db');
    p.square(cvt_x(15), cvt_y(f(x_curr)) - 50 / 2, 50);  
    p.stroke(30);
    p.strokeWeight(10);
    p.point(cvt_x(16), cvt_y(f(x_curr)));
     
  }
}

const app: HTMLDivElement = document.querySelector('#app')!;
new p5(linear_interpolation, app);
new p5(polynomial_interpolation, app);

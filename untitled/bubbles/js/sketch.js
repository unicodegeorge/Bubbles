let originCell;
let cells = [];
let viruses = [];
let virus;
let cell;
let cellCount = 1;
let width = 1000;
let height = 1000;

function setup() {
    createCanvas(width, height);
    originCell = new Cell(randomPos(), 90, "cell#0");
    cells.push(originCell);
}

function draw() {
  background(100);
  if (cells.length > 5000) {
    cells.splice(0,1000);
  }
  for (let i = 0; i < cells.length; i++) {
    cell = cells[i];
    cell.show();

    if(!cell.grow()) die(i);
    if(!cell.canGrow) {cells.push(cell.mitosis()); cellCount++;}
    cell.move();

  }

    for (let y = 0; y < viruses.length; y++) {
      virus = viruses[y];
      virus.show();
      if(virus.empty()) {
        virus.see(cells);
      } else {
        continue;
      }

    }



}

function randomPos() {
  return createVector(random(0, width), random(0,height));
}

function die(i) {
  cells.splice(i, 1);
  console.log(cells[i].name + " died aged: " + cells[i].age);
}

function test() {
  for (let i = 0; i < 100; i++) {
    cells.push(cell.mitosis());
    cellCount++;
  }
}

function mousePressed(){
  console.log("new Virus");
  viruses.push(new Virus(createVector(mouseX, mouseY), random(10,20)));

}





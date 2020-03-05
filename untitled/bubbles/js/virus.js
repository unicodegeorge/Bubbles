class Virus {
  constructor(pos, radius) {
    this.damage = random(10,50);
    this.hp = random(300,600);
    this.speed = random(5, 20);
    this.pos = pos;
    this.r = radius;
    this.color = color("red");
    this.vision = this.r*20;
    this.onJob = false;

    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.maxspeed = 0.001;    // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
  }

  show() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r);
    fill(255,255,255,20);
    ellipse(this.pos.x, this.pos.y, this.vision);
  }

  see(cells) {

    let d;
    let cell;
    for (let i = 0; i < cells.length; i++) {

      cell = cells[i];
      d = p5.Vector.dist(this.pos, cell.pos);
      if(d < this.vision) {
        this.onJob = true;
        this.kill(cell);//go to cell and kill
        break;
      }

    }
  }

  kill(cell) {
    console.log("killing");
    for (let i = 0; cell.hp > 0; i++) {
      let goal = p5.Vector.sub(cell.pos, this.pos);
      goal.normalize();
      goal.mult(this.maxspeed);
      let steer = p5.Vector.sub(goal, this.velocity);
      steer.limit(this.maxforce); // Limit to maximum steering force
      steer.mult(1.0);
      this.acceleration.add(steer);
      // Update velocity
      this.velocity.add(this.acceleration);
      // Limit speed
      this.velocity.limit(this.maxspeed);
      this.pos.add(this.velocity);
      // Reset acceleration to 0 each cycle
      this.acceleration.mult(0);
      if(this.collision(cell)) {
        this.damageCell(cell);
      }
    }

    if(cell.hp <= 0) {
      this.onJob = false;
    }

  }

  damageCell(other){
    other.hp -= this.damage;
  }

  collision(other) {

    let d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r) {
      return true;
    } else {
      return false;
    }

  }

  empty() {
    return !this.onJob;
  }

}

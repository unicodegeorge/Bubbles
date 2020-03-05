class Cell {


  constructor(pos, radius, name){
    this.name = name;
    this.maxAge = 5000;
    this.maxSize = 100;
    this.canGrow = true;
    this.age = 100;
    this.pos = pos;
    this.r = radius;
    this.vel = createVector(0, 0);
    this.maxhp = this.calcHp("hp");
    this.hp = this.maxhp;
    //this.color = this.calcColor();
    this.color = color(random(0, 255), random(0,255), random(0,255), 50);
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  grow() {
    if(this.age%100==0) this.life();

    this.age++;
    if(this.hp > 0 && this.age < this.maxAge) {

        if(this.canGrow) {

          let newSize = ((sqrt(5)*sqrt((this.r*2)*sqrt(this.age)))/2500);
          //let newSize = sqrt(((this.r*2)*sqrt(this.age))/1000)/100;

          if (this.r+newSize < this.maxSize) {
            this.r += newSize;
          } else {
            this.canGrow = false;
          }

        }

        return true;

      } else {

        return false;
      }

  }

  mitosis() {
    this.split();
    console.log("split");
    let newPos = createVector(width/2, height/2);
    let newCell = new Cell(newPos, this.r+random(0,10), "cell#"+cellCount.toString());
    return newCell;
  }

  split() {
    this.r = this.r/4;
    this.canGrow = true;
  }

  life() {
    this.maxhp = this.calcHp("hp");
    //this.color = this.calcColor();
  }

  move(vector) {
    let vel = p5.Vector.random2D();
    this.pos.add(vel);
    /*
    if (this.pos.x > width - this.r) {
      this.pos.add(createVector(-10,0));
    } else if (this.pos.x < this.r) {
      this.pos.add(createVector(10,0));
    }
    if (this.pos.y > height - this.r) {
      this.pos.add(createVector(0,-10));
    } else if (this.pos.y < this.r) {
      this.pos.add(createVector(0,10));
    }
    */



  }

  collision(other) {

    let d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r) {
      return true;
    } else {
      return false;
    }

  }



















  brandNew() {
    console.log("test add cells");
    let newPos = createVector(width/2, height/2);
    let newCell = new Cell(newPos, random(40,80));
    return newCell;
  }





  calcHp(retType) {

    switch (retType) {
      case "hp":
        return ((this.r*2)*sqrt(this.age))/100;
        break;
      case "perc":
        let onePerc = this.maxhp/100;
        return this.hp/onePerc;
        break;
      default:
        console.log("calcHp error");
        break;
    }

  }
/*
  calcColor() {
      let percent = this.calcHp("perc");
      let red, green, blue  = 0;
      console.log(percent);
      if(percent < 50) {
        red = 255;
        green = Math.round(5.1 * percent);
      }
      else {
        green = 255;
        red = Math.round(510 - 5.10 * percent);
      }
      let h = red * 0x10000 + green * 0x100 + blue * 0x1;
      let result = '#' + ('000000' + h.toString(16)).slice(-6);
      let r = unhex(result.slice(1,3));
      let g  = unhex(result.slice(3,5));
      let b = unhex(result.slice(5,7));
      return color(r,g,b);
  }
  */
}


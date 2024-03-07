let mainCat;
let handFedCat;
let cat3;
let vomitCircles = [];
let vomitTime;
let afterVomitTime;
let catEatsSound; 
let catYakSound;  

let fedCount = 0;

function preload() {
    mainCat = loadImage('cat1.png');
    handFedCat = loadImage('handfed.png');
    cat3 = loadImage('cat3.png');
  
    catEatsSound = loadSound('cateats.mp3');
    catYakSound = loadSound('catyak.mp3');
}

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(255);
    background('lightblue');

    image(mainCat, 0, 0, width, height);

    if (keyIsPressed) {
        image(handFedCat, 25, 325, handFedCat.width / 2, handFedCat.height / 2);
        
        // Start playing the first sound only if it's not already playing
        if (!catEatsSound.isPlaying()) {
            catEatsSound.loop();
        }
        
        // Stop the second sound
        catYakSound.stop();
    } else if (mainCat === cat3) {
        // Start playing the second sound when vomit circles appear
        if (!catYakSound.isPlaying()) {
            catYakSound.play();
        }
        
        // Stop the first sound
        catEatsSound.stop();
        
        for (let i = 0; i < vomitCircles.length; i++) {
            let circle = vomitCircles[i];
            fill(random(255), random(255), random(255));
            ellipse(circle.x, circle.y, circle.size, circle.size);
        }

        if (vomitCircles.length > 0 && millis() - vomitTime > 5000) {
            mainCat = loadImage('cat1.png');
            vomitCircles = [];
            afterVomitTime = millis();
        }
    }

    if (afterVomitTime && millis() - afterVomitTime > 5000) {
        image(handpetCat, mouseX - handpetCat.width / 2, mouseY - handpetCat.height / 2);
    }



 fill(0); 
 textAlign(CENTER, CENTER); 
 textSize(25); 
 text("Press space bar to feed cat", width / 2, height - 30);
}

function keyPressed() {
    if (key === ' ') {
        fedCount++;
        if (fedCount >= 5) {
            mainCat = cat3;
            fedCount = 0;
            for (let i = 0; i < 10; i++) {
                let circle = {
                    x: random(width),
                    y: random(height),
                    size: random(10, 30)
                };
                vomitCircles.push(circle);
            }
            vomitTime = millis();
            afterVomitTime = null; 
        } else {
            mainCat = loadImage('cat1.png');
        }
    }
}
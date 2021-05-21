
let BACKGROUND, BASE, BOTTOM_PIPE, TOP_PIPE, BIRD, DIE, HIT, WING, SWOOSH, FONT;
let start = false;
let po = 200;
let points = 0;
let position=1350;
let bx=300,by=250;

function preload() { // Load all the media files
    BACKGROUND = loadImage('media/background.png');
    BASE = loadImage('media/base.png');
    TOP_PIPE = loadImage("media/pipe-top.png");
    BOTTOM_PIPE = loadImage("media/pipe-bottom.png");
    BIRD = loadImage("media/flappybird-animation.gif");
    DIE = loadSound("media/die.mp3");
    HIT = loadSound("media/hit.mp3");
    WING = loadSound("media/wing.mp3");
    SWOOSH = loadSound("media/swoosh.mp3");
    FONT = loadFont('media/Roboto-Light.ttf');
}

function setup() {
    
    createCanvas(1350, 625);
    BACKGROUND.resize(1350, 650);
    BASE.resize(1350, BASE.height);
    TOP_PIPE.resize(TOP_PIPE.width, 200);
    BOTTOM_PIPE.resize(BOTTOM_PIPE.width,275);
    BIRD.resize(40,35);
}
function gameOver()
{
    noLoop();
    image(BACKGROUND,0,0);
    image(BASE,0,650-BASE.height);
    textAlign(CENTER, CENTER);
    textSize(80);
    fill(255,0,0);
    text('Game Over', 1350/2, 200);
    textSize(50);
    fill(255);
    text('Your Score is ' + points, 1350/2, 300);
}


function draw()
{
    
    image(BACKGROUND,0,0);
    image(BASE,0,650-BASE.height);
   
    if(!start)
   {
        textAlign(CENTER, CENTER);
        textSize(75);
        fill(255);
        text('Flappy Bird', 1350/2, 155);
        textSize(50);
        text('Click to start', 1350/2, 600);
   }
       
    else
   {
        textSize(50);
        fill(255);
        text('Score: '+ points,1010,100);
        image(TOP_PIPE, position, 0);
        image(BOTTOM_PIPE, position, po+100);
        position=position-8;
        if(position<-50)
        {
            position=1350;
            po=random(50,425);
            TOP_PIPE.resize(TOP_PIPE.width, po);
            BOTTOM_PIPE.resize(BOTTOM_PIPE.width,575-po-100);
        
        }
        image(BIRD,bx,by);
        if(mouseIsPressed)
        {
            by-=8;
        }
        if(mouseIsPressed&&!WING.isPlaying())
        {
        
            WING.play();
        }
        by+=4;
    
        if(by<=0||by>=575)
        {
            HIT.play();
            gameOver();

        }
        if(position<=300&&position>=250)
        {
            if(!(by>po&&by<po+100))
            {
                    HIT.play();
                    DIE.play();
                    restart=1;
                    gameOver();
            }
        }
        if(position==-50)
        {
            points+=1;
        }

    }
   
    if(mouseIsPressed)
    start=true;

}

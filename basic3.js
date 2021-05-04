const canvas  = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width =window.innerWidth;
canvas.height =window.innerHeight;
const particleArray =[];
let hue = 0;

window.addEventListener('resize',function(){
    canvas.width =window.innerWidth;
    canvas.height =window.innerHeight;
})

const mouse ={
    x:undefined,
    y:undefined
}
canvas.addEventListener('click',function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    init();
})
canvas.addEventListener('mousemove',function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    init();
})
// class that make Particle
class Particle{
    constructor() { 
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random()*canvas.width;
         // this.y = Math.random()*canvas.height;
        this.size = Math.random()*15+1;
        this.speedX = Math.random()*3-1.5;
        this.speedY = Math.random()*3-1.5;
        this.color ='hsl('+hue+', 100% , 50%)';
        
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size>0.2) {
            this.size-=0.1;
        }
    }
    draw(){
    ctx.fillStyle =this.color;
    ctx.strokeStyle =this.color;
    ctx.lineWidth =5;
    ctx.beginPath();
     ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.stroke();
    ctx.fill();
    }

}

function drawCircle(){
    ctx.fillStyle ="yellow";
    ctx.strokeStyle ="orchid";
    ctx.lineWidth =5;
    ctx.beginPath();
     ctx.arc(mouse.x,mouse.y,20,0,Math.PI*2);
    ctx.stroke();
}
function init(){
    for (let i = 0; i < 5; i++) {
    particleArray.push(new Particle());        
    }
}


// func that handle particle 
function handleParticle (){
    for (let i = 0; i < particleArray.length; i++){
        particleArray[i].update();
        particleArray[i].draw();
       
        for (let j = i; j < particleArray.length; j++) {
                const dx= particleArray[i].x-particleArray[j].x;
                const dy= particleArray[i].y-particleArray[j].y;
                const distance= Math.sqrt(dx*dx+dy*dy); 
                if (distance<100) {
                    ctx.beginPath();
                    ctx.lineWidth=particleArray[i].size/10;
                    ctx.strokeStyle=particleArray[i].color;
                    ctx.moveTo(particleArray[i].x, particleArray[i].y);
                    ctx.lineTo(particleArray[j].x, particleArray[j].y);
                    ctx.stroke();

                }            
        }
        if (particleArray[i].size<=0.3) {
            particleArray.splice(i,1);
            // console.log(particleArray.length);
            i--;
        }
        // particleArray[i].
    }
}
// Code runing recuserivly and make animation
function animation(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // new code 
    // ctx.fillStyle ='rgba(0,0,0,0.02)';
    // ctx.fillRect(0,0,canvas.width,canvas.height);
    // new code ends
    // drawCircle();
    handleParticle();
    hue+=0.5;
    requestAnimationFrame(animation);
}

animation();




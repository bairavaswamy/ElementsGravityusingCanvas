const canvas = document.querySelector("canvas")

canvas.width = innerWidth
canvas.height = innerHeight

const all = canvas.getContext("2d");


const mouse = {
    x:undefined,
    y:undefined
}

let gravity = 1;
let friction  = 0.60;

addEventListener("mousemove",(event)=>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener("resize", ()=>{
    canvas.width = innerWidth
    canvas.height = innerHeight
    init();
})
addEventListener("click", ()=>{
    init();
})

function Balls(x,y,dx,dy,radius,color){
    this.x = x;
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color

    this.draw = function(){
        all.beginPath()
        all.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        all.stroke();
        all.fillStyle = this.color
        all.fill()
    }

    this.anime = function(){
        if (this.y + this.radius + this.dy > innerHeight){
            this.dy = -this.dy * friction;
        }else{
            this.dy += gravity;
            console.log(this.dy)
        }
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx
        }
        this.x +=  this.dx
        this.y += this.dy;
        this.draw()
    }
}
let ballsArray;
function init(){
    ballsArray = []
    for(let i=0;i<500;i++){
        let radius = Math.random() * 30
        let r = Math.random() * 255
        let g = Math.random() * 255
        let b = Math.random() * 255
        let color = `rgb(${r},${g},${b})`
        let x = Math.random() * (innerWidth -radius * 2) + radius
        let y = Math.random() * (innerHeight - radius * 2) + radius
        let dx = Math.random() * 4 - 2
        ballsArray.push(new Balls(x,y,dx,4,radius,color))
    }
}

function animate(){
    requestAnimationFrame(animate)
    all.clearRect(0,0,innerWidth,innerHeight)
    for(let i =0;i <ballsArray.length;i++){
        ballsArray[i].anime()
    }
    all.fillText("Bairavaswamy",mouse.x,mouse)
}
init()
animate()

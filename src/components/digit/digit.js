
import React, { useState, useEffect } from 'react'
import "./digit.css"
import * as tf from '@tensorflow/tfjs';




function Digit() {
    // fixing canvas dimensions
    const [guess, setGuess] = useState(0)
    useEffect(() => {
        let canvas = document.getElementById("digit-canvas")
        canvas.width = Math.min(window.innerHeight,window.innerWidth)*0.75
        canvas.height = Math.min(window.innerHeight,window.innerWidth)*0.75

        let mouseDown = false
        let pos = {x:0, y:0}
        const ctx = canvas.getContext("2d")
        ctx.strokeStyle = "#FFFFFF"
        ctx.lineWidth = 30
        ctx.lineCap = 'round';

        // making background black
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        canvas.onmousedown = (e)=>{
            mouseDown = true
        }
        canvas.onmouseup = (e)=>{
            mouseDown = false
        }
        canvas.onmousemove = (e)=>{
            ctx.moveTo(pos.x, pos.y)
            let newPos = {x:e.clientX-canvas.getBoundingClientRect().left, y:e.clientY-canvas.getBoundingClientRect().top}
            if (mouseDown){
                ctx.lineTo(newPos.x, newPos.y)
            }
            ctx.stroke()
            pos = newPos
        }

        // ---
        let touch
        canvas.ontouchstart = (e)=>{
            mouseDown = true
            touch = e.touches[0]

            pos = {x:touch.clientX-canvas.getBoundingClientRect().left, y:touch.clientY-canvas.getBoundingClientRect().top}
        }
        canvas.ontouchend = (e)=>{
            mouseDown = false
        }
        canvas.ontouchmove = (e)=>{

            ctx.moveTo(pos.x, pos.y)
            let newPos
            touch = e.touches[0]
            // setGuess(touch.clientX)
            if(touch){
                newPos = {x:touch.clientX-canvas.getBoundingClientRect().left, y:touch.clientY-canvas.getBoundingClientRect().top}
            }
            if (mouseDown){
                ctx.lineTo(newPos.x, newPos.y)
            }
            ctx.stroke()
            pos = newPos
        }


    });

    let model
    (async function (){model = await tf.loadLayersModel("https://raw.githubusercontent.com/Suman94310/MlModals/main/model.json")})();




    const predict = (tfImage)=>{
        let output = model.predict(tfImage);
        let result = Array.from(output.dataSync());
        let maxPossibility = result.reduce(function(a,b){return Math.max(a,b)});
        setGuess(result.indexOf(maxPossibility))
    }

    const handleSubmit = ()=>{
        let canvas = document.getElementById('digit-canvas');
        let ctx = canvas.getContext('2d');
    
        //console.log(ctx.getImageData(0,0, 100, 100));
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // ctx.putImageData(imageData, 150, 10);
        let tfImage = tf.browser.fromPixels(imageData, 1);

        //Resize to 28X28
        let tfResizedImage = tf.image.resizeNearestNeighbor(tfImage, [28,28]);

        //Make another dimention as the model expects
        predict(tfResizedImage.reshape([1, 28, 28, 1]));
    }

    return (
        <div className="digit">
            <div className="digit-tools">
                <button className="digit-button"><i class="fas fa-pencil-alt"></i></button>
                <button className="digit-button"><i class="fas fa-eraser"></i></button>
                <button className="digit-button" onClick={() =>handleSubmit()}>CHECK</button>
                <div>
                    {guess}
                </div>
            </div>
            <div className="digit-canvasContainer" id="digit-canvasContainer">
                <canvas className="digit-canvas" id="digit-canvas" height="400" width="400"></canvas>
            </div>
        </div>
    )
}

export default Digit

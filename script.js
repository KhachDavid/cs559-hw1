/**
 * @long @summary
 * Check README  
 *
 * @short @summary CS 559, Assignment #1
 * @author David <dkhachatryan@wisc.edu>
 *
 * Created on : September 24, 2021 
 * 
 * @credits
 * Check ReadMe
 */


// get the canvas element
const canvas = document.getElementById('myCanvas');

// get the canvas context
const context = canvas.getContext('2d');

const a = 2 * Math.PI / 6;
const r = 50;

var currentObject = "hexagon"
var hypnosis = false

var slider1 = document.getElementById("slider1")
var slider2 = document.getElementById("slider2")
var hypnosisButton = document.getElementById("hypnosis")

slider1.value = 50
slider2.value = 55

var drawFunctions = { 
  drawHexagon: function () {
    slider1.value = Math.floor(Math.random() * (100))
    for (var i = 0; i < 6; i++) {
      context.lineTo(200 + slider1.value * Math.cos(a * i), 200 + slider1.value * Math.sin(a * i)) 
    }
  },

  drawTriangle: function () {
    slider1.value = Math.floor(Math.random() * (350 - 50) + 50)

    let triangleWidth = slider1.value
    let triangleHeight = 150
    console.log(slider1.value);
    let x = canvas.width / 2
    let y = canvas.height / 2 - triangleWidth / 2

    context.moveTo(x, y);
    context.lineTo(x + triangleWidth / 2, y + triangleHeight);
    context.lineTo(x - triangleWidth / 2, y + triangleHeight);
  },

  drawSquare: function () {
    let oneSide = Math.floor(Math.random() * (400 - 0) + 0)
    let otherSide = Math.floor(Math.random() * (400 - 0) + 0)

    context.rect(oneSide, oneSide, otherSide, otherSide)
  },

  drawRectangle: function () {
    let oneSide = Math.floor(Math.random() * (400 - 0) + 0)
    let twoSide = Math.floor(Math.random() * (400 - 0) + 0)
    let threeSide = Math.floor(Math.random() * (400 - 0) + 0)
    let fourSide = Math.floor(Math.random() * (400 - 0) + 0)

    context.rect(oneSide, twoSide, threeSide, fourSide)
  }
}

function draw(object) {
  if (currentObject !== object) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    currentObject = object
    changeSliderValue()
  }

  context.beginPath();

  if (hypnosis) {

    context.fillStyle = 'black'
  }
  
  else {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'orange'
  }
    
  // add a brush color
  context.strokeStyle = 'orange'
  context.lineWidth = 10
  
  drawFunctions["draw" + object.charAt(0).toUpperCase() + object.slice(1)]()

  context.closePath();
  context.fill();
  context.stroke();
}

var changeSliderValue = async function() {
  draw(currentObject)
}

var animationInterval = window.setInterval(changeSliderValue, slider2.value)

var changeAnimationInterval = function() {
  // Number 120 is the range coefficient

  clearInterval(animationInterval)
  animationInterval = setInterval(changeSliderValue, 120 - slider2.value)
}

var toggleHypnosis = function() {
  
  hypnosis = !hypnosis

  if (hypnosis) {
    hypnosisButton.innerHTML = "Turn Off Hypnosis"
  }
  else {
    hypnosisButton.innerHTML = "Turn On Hypnosis"
  }

  draw(currentObject)
}

draw(currentObject)

slider1.addEventListener("input", draw("hexagon"))
slider2.addEventListener("input", changeAnimationInterval)
rectangleButton.addEventListener("click", draw("rectangle"))
hexagonButton.addEventListener("click", draw("hexagon"))
triangleButton.addEventListener("click", draw("triangle"))
squareButton.addEventListener("click", draw("square"))
hypnosisButton.addEventListener("click", toggleHypnosis)

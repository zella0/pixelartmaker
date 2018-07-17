let sizeBtn = document.getElementById('setSize');
let heightInput = document.getElementById('heightInput');
let widthInput = document.getElementById('widthInput');
let gridBox = document.getElementById('gridBox');

//colors
let red = document.getElementById("red");
let green = document.getElementById("green");
let blue = document.getElementById("blue");
let canvas = document.getElementById("canvas")
let palette = document.getElementById('palette')
let currentColor;
let counter = 0;

let defaultHeight = 20;
let defaultWidth = 20;
generateSquares(defaultWidth, defaultHeight);

let imageBox = document.getElementById('imgLoader');
let imageBtn = document.getElementById('addImage');
let inputBox = document.getElementById('iconUrl');

var mouseDown = false;

document.addEventListener('mousedown', function() {
  mouseDown = true
  console.log(mouseDown)
})
document.addEventListener('mouseup', function() {
  mouseDown = false
  console.log(mouseDown)
})

//Clears local storage when page loads
window.onload = function() {
  localStorage.clear();
};

function generateSquares(width, height) {
  let table = document.createElement('div');
  for (let i = 0; i < height; i++) {
    let row = document.createElement('div');
    for (let j = 0; j < width; j++) {
      let square = document.createElement('div');
      square.style.display = "block";
      square.style.border = "1px solid black";
      square.style.float = 'left'
      square.style.height = "20px";
      square.style.width = "20px";
      square.style.opacity = 0.1;
      let opacityCounter = 0;
      // if(mouseDown === true){
      square.addEventListener('mouseover', function() {
        if (mouseDown === true) {
          let squareStyle = event.currentTarget.style;
          if (currentColor === undefined) {} else if (squareStyle.opacity >= 0.1 && squareStyle.backgroundColor !== currentColor) {
            squareStyle.backgroundColor = currentColor;
            opacityCounter = 0.1;
            squareStyle.opacity = opacityCounter;
            squareStyle.border = "0px";
          } else {
            squareStyle.backgroundColor = currentColor;
            opacityCounter += 0.1;
            squareStyle.opacity = opacityCounter;
            squareStyle.border = "0px";
          }
        }
      })

      row.appendChild(square);
    }
    table.appendChild(row);
  }
  gridBox.appendChild(table)

}


//Function to test to see if URL input is valid
function is_url(str) {
  regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}

function pixelateImg(width, height, quality, size) {
  let userInput = document.getElementById('iconUrl').value;
  let sqSize = size;
  //Getting the image from url - storing image
  localStorage.setItem(localStorage.length + 1, inputBox.value);
  let canvas = document.getElementById('canvas');
  canvas.innerText = '';
  for (let i = 1; i < localStorage.length + 1; i++) {

    //Generating Image to canvas
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = localStorage.getItem(i);
      img.addEventListener('load', function() {
        canvas.width = width * sqSize;
        canvas.height = height * sqSize;
        ctx.drawImage(img, 1, 1, canvas.width, canvas.height);
        var x;
        var y;
        let table = document.createElement('div');
        for (let i = 0; i < height * sqSize; i += sqSize / quality) {
          let row = document.createElement('div');
          for (let x = 0; x < width * sqSize; x += sqSize / quality) {
            var pixel = ctx.getImageData(x, i, 1, 1);
            var data = pixel.data;

            let square = document.createElement('div');
            square.style.display = "block";
            square.style.border = "1px solid rgba(0, 0, 0, .1)";
            square.style.borderWidth = "1px 1px"
            square.style.float = 'left'
            square.style.height = sqSize + "px";
            square.style.width = sqSize + "px";
            square.style.backgroundColor = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
            row.appendChild(square);

            console.log(i, x)
          }
          table.appendChild(row);
        }
        pixelatedImg.appendChild(table)

      }, false);

    }
  }
}

red.addEventListener('click', function() {
  currentColor = 'red';
  counter = 0;
})
green.addEventListener('click', function() {
  currentColor = 'green';
  counter = 0;
})
blue.addEventListener('click', function() {
  currentColor = 'blue';
  counter = 0;
})
// white.addEventListener('click', function() {
//   currentColor = 'white';
// })

sizeBtn.addEventListener('click', function() {
  let width = widthInput.value;
  let height = heightInput.value;
  if (width === '' || height === '') {
    width = 25;
    height = 25;
    userTxtDisplay.innerHTML = 'Default Size'
  }
  gridBox.innerHTML = '';
  generateSquares(width, height);
})

var pxHeightInput = document.getElementById('pxHeightInput');
var pxWidthInput = document.getElementById('pxWidthInput');
var pxQualityInput = document.getElementById('pxQualityInput');
var pxSizeInput = document.getElementById('pxSizeInput');

imageBtn.addEventListener('click', function() {
  pixelateImg(20, 20, 10, 5);
  //width, height, quality, size
})

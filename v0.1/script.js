let sizeBtn = document.getElementById('setSize');
let heightInput = document.getElementById('heightInput');
let widthInput = document.getElementById('widthInput');
let gridBox = document.getElementById('gridBox');
let defaultHeight = 10;
let defaultWidth = 20;
generateSquares(defaultWidth, defaultHeight);


sizeBtn.addEventListener('click', function() {
  let width = widthInput.value;
  let height = heightInput.value;
  if(width === '' || height === ''){
    width = 20;
    height = 20;
    userTxtDisplay.innerHTML = 'Invalid Amount'
  }
  gridBox.innerHTML = '';
  generateSquares(width, height);
})


function generateSquares(width, height) {
  for (let i = 0; i < height; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < width; j++) {
      let td = document.createElement('td');
      td.className = " blankStyle"
      td.style.border = "1px solid black";
      td.height = 20;
      td.width = 20;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  table.style.borderCollapse = 'collapse';
  table.style.tableLayout = 'fixed';
  gridBox.appendChild(table)

  gridBox.height =  height * 20;
  gridBox.width = width * 20;
}

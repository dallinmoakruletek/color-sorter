const size = 9
let colors = [];

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms));
}

function draw(){
  let topCount = 0;
  for(let i in colors){
    let colorsRow = colors[i];
    for(let j in colorsRow){
      let color = colorsRow[j];
      colString = 'background-color: rgb('+ color.red+','+ color.green + ','+ color.blue + ");";
      document.getElementById(topCount).setAttribute("style",colString);
      // document.getElementById(topCount).innerHTML = color.index;
      topCount++;
    }
  }
}

function buildColors(s){
  let size = s;
  let indices = []

  for (let i = 0; i < Math.pow(size,2); i ++){
    indices.push(i);
  }


  let indexCount = 0;
  for (let i = 0; i < size; i ++){
    let red = Math.floor((255/(size-1)*i));
    let colorsRow = [];
    colors.push(colorsRow);
    for (let j = 0; j < size; j++){
      let thisRow = colors[i];
      let green = Math.floor((255/(size-1)*j));
      let thisObj = {
        index: indexCount,
        red: red,
        green: green,
        blue: 128
      }
      thisRow.push(thisObj);
      indexCount ++;
    }
  }
}

function shuffle() {
  for(let i = colors.length-1; i > 0; i--){
    let colorsRow = colors[i];
    for (let j = colorsRow.length-1;  j > 0; j--){
      const j_r = Math.floor(Math.random() * j);
      const i_r = Math.floor(Math.random() * i);
      [colors[i][j] , colors[i_r][j_r]] = [colors[i_r][j_r] , colors[i][j]];
    }
  }
  draw();
}

function buildTable(){
  let indexCount = 0;
  for (let i in colors) {
    let tRow = document.createElement('tr');
    tRow.setAttribute('id','tr'+i)
    document.getElementById('table1').appendChild(tRow);
    let colorsRow = colors[i];
    for (let j in colorsRow){
      let tData = document.createElement('td');
      tData.setAttribute('id',indexCount);
      document.getElementById('tr'+i).appendChild(tData);
      indexCount++;
    }
  }
  draw();
}


function sortColors(){
  let colLen = colors.length;
  for(let i in colors){
    let colorsRow = colors[i];
    let rowLen = colorsRow.length;
    for( let j in colorsRow ){
      let cur_j = parseInt(j);
      let cur_i = parseInt(i)
      let nxt_j = 0;
      let nxt_i = 0;
      if ( cur_j + 1 < rowLen ){
        nxt_j = cur_j+1;
        nxt_i = cur_i;
      } else if ( cur_i < rowLen ){
        nxt_j = 0;
        nxt_i = cur_i + 1; 
      } else { return true; };
      if (colors[cur_i][cur_j].index > colors[nxt_i][nxt_j].index) {
        [colors[cur_i][cur_j],colors[nxt_i][nxt_j]] = [colors[nxt_i][nxt_j],colors[cur_i][cur_j]];
        return false;
      }
    }
  }
}

function initiate(s){
  let size = s;
  buildColors(size);
  buildTable();
  document.getElementById('initiate').setAttribute('hidden','true');
  document.getElementById('shuffle').setAttribute('hidden','false');
  document.getElementById('shuffle').setAttribute('style','display: inherit;');
  console.log('shuffle hidden: ',document.getElementById('shuffle'));
  document.getElementById('sort').setAttribute('hidden','false');
  document.getElementById('sort').setAttribute('style','display: inherit;');
}

async function sortAll(){
  let done = false
  let i = 0;
  while (!done){
    done = sortColors();
    await sleep(1);
    draw();
    await sleep(1);
    console.log("sorted " + i);
    i++;
  }
}

// initiate(size);
// shuffle();
// sortAll();

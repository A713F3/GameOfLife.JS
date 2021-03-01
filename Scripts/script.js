var rows = 102;
var columns = 142;

cell_size = 5;

var grid = [];

var mouse_pressed = false;
var stop = false;

function randomize_grid(){
	for (var y = 1; y < rows - 1; y++){
		grid[y] = [];
		for (var x = 1; x < columns - 1; x++){
			if (int(random(0,20)) == 1){
				grid[y][x] = 1;
			}
			else{
				grid[y][x] = 0;
			}			
		}	
	}
}


function clear_grid(){
	for (var y = 0; y < rows; y++){
		grid[y] = [];
		for (var x = 0; x < columns; x++){
			grid[y][x] = 0;			
		}	
	}
}

function start_stop(start_stop){
	stop = start_stop;
}


function setup(){	
	var canvas = createCanvas(702,502); //columns, rows
	background(220);
	canvas.parent("script-div");

	clear_grid();
}


function countNeighbors(x,y){
	var neighbors = 0;
	for (i = -1; i < 2; i++){
		for (j = -1; j < 2; j++){
			neighbors += grid[y + i][x + j];
		}
	}
	neighbors -= grid[y][x];

	return neighbors;
}


function Rules(x,y){
	
	if (!mouse_pressed && stop){
		neighbors = countNeighbors(x,y);
	
		if (neighbors < 2){
			grid[y][x] = 0;
		} else if (neighbors > 3){
			grid[y][x] = 0;
		} else if (neighbors == 3){
			grid[y][x] = 1;
		}
	}
}


function Grid(){
	var draw_x = 2;
	var draw_y = 2;

	for (var y = 1; y < rows - 1; y++){
		for (var x = 1; x < columns - 1; x++){

			if (grid[y][x] == 1){
				fill(0);
				stroke(0);
				rect(draw_x, draw_y, cell_size, cell_size)
			}
 			
 			Rules(x,y);

			draw_x += cell_size;
	
		}
		draw_y += cell_size;
		draw_x = 2;		
	}
}


function mousePressed(){
	mouse_pressed = true;
}
function mouseDragged(){
	if (mouse_pressed){
		x = int(mouseX / cell_size) + 1;
		y = int(mouseY / cell_size) + 1;

		grid[y][x] = 1;
	}	
}


function mouseReleased(){
	mouse_pressed = false;
}


function draw(){
	background(220);

	Grid();
}
$(document).ready(function(){
	$('.digit').on('click',buttonPress);
	$('.equals').on('click',evaluate);
	$('.operator').on('click',operandKey);
	$('.clear').on('click',clearData);
	$('.clear').on('click',clearDisplay);
	$(document).keypress(whichButton);
});
	//function that records input
	//on press
	var input=[];
	var equation="";
	var finalInput;
	var operators=[];
	var inputs = [];
	var equalsButton=false;

function buttonPress(event){
	$(this).blur();
	event.preventDefault();

	// if the equals button has been pressed prior to a digit being pressed it is an effective clear
	if(equalsButton){
		clearData(event);
	}

	var val = $(this).data("action");
	createDisplay(val);
}
// pushes final value to input, and joins values as a string and pushes the final input to the display
function createDisplay(val){
	input.push(val);
	finalInput = input.join("");
	$('.display').val(finalInput);
}
// used when a key on the keyboard is pressed to input data rather then a button
function keyPress(button){
	if(equalsButton){
		equalsButton=false;
		clearData(event);
		
	}
	var val = button;
	createDisplay(val);
}
// when an operand button is clicked, this function will run and then call the operand function
function operandKey(event){
	// removes focus if a button is clicked
	$(this).blur();

	var operator = $(this).data("action");
	operand(operator);
}
// this function takes an operater value and tests if the operator is a parentheses. 
function operand(operator){
	if(operator=="(" && equalsButton === true){
		// usually when a parenteses is pressed, we no longer need previous data, so clearData() is called to reset the program and we reset the equals button
		clearData(event);
	}
	operators.push(operator);
	if(operator !==")"){
		if(operator =="("){
			if(input.length>0){
				console.log("there is a number before parentheses");
				inputs.push(finalInput);
			}
			inputs.push("");
		}else{
			inputs.push(finalInput);
			console.log("operand");
		}
		input=[];
	}else{
		console.log(" pushing input to inputs");
		inputs.push(finalInput);
		input=[];
	}
	
}
function clearData(event){
	// var c=$(this).data("action");
	input=[];
	equation="";
	finalInput="";
	operators=[];
	inputs = [];
	equalsButton = false;
	console.log("reset");
}
function clearDisplay(){
	$('.display').val('0');
}
function evaluate(){
	$(this).blur();
	// var equals=$(this).data("action");
	inputs.push(finalInput);
	console.log(operators);
	console.log(inputs);
	// this code creates the equation
	for(var i = 0 ; i<operators.length;i++){
		if(operators[i-1] ==")"){
			equation+=operators[i]+inputs[i];
			console.log("special case parentheses");
		}else{
			// console.log("this is running");
			if(operators[i]=="("){
				console.log("opening equation detected");
				if(inputs[i+1]===""){
					console.log("special case operator syntax omitted");
					equation+=inputs[i]+"*"+operators[i];
					inputs.splice(i,1);
				}else{
					equation+=operators[i]+inputs[i];
					console.log("regular test case one")
				}
			}else{
				equation =equation+inputs[i]+operators[i];
				console.log("regular test case two")
			}
			if(i==operators.length-1 && operators[i]!==")"){
				equation=equation+inputs[i+1];
			}
			if(operators[i] ==")"){
				equation+=operators[i]+inputs[i+1];
			}
		}
	}
	console.log(equation);
	// checking for parentheses in the operator array this code is for error handling, when parentheses are not closed
	if(($.inArray("(",operators)>-1 && $.inArray(")",operators)===-1)||($.inArray("(",operators)===-1 && $.inArray(")",operators)>-1)){
		$('.display').val("ERROR");
	// this code runs when there are no parentheses
	}else{
		console.log('equation ok');
		console.log(equation);
		result=eval(equation);
		$('.display').val(result);
		equalsButton=true;
	}
	
	
}
// this button decides which button is pressed based on shift key boolean and keycodes, it wires up the ui with the keyboard and decides what functions to call
function whichButton(event){
	console.log("keypress");
	event.preventDefault();
	var keypress=event.keyCode;
	// this connects all of the number keys
	if(48<=keypress && keypress<=57){
		key = keypress - 48;
		keyPress(key.toString());
	}
	// enter key is equals
	if(keypress === 13){
		evaluate();
	}
	// operator keys
	if(keypress == 43 && event.shiftKey === true){
		operator = "+";
		operand(operator);
	}else if(keypress ==45){
		operator = "-";
		operand(operator);
	}else if(keypress == 42 && event.shiftKey ===true){
		operator = "*";
		operand(operator);
	}else if(keypress ==47){
		operator = "/";
		operand(operator);
	}else if(keypress ==40 && event.shiftKey ===true){
		operator = "(";
		operand(operator);
	}else if(keypress ==41 && event.shiftKey ===true){
		operator = ")";
		operand(operator);
	}
	// clear key
	if(keypress == 99||keypress == 27){
		clearData();
		clearDisplay();
	}
}
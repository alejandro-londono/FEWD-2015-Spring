$(document).ready(function(){
	$(".calculator").submit(calculate);

});
function calculate(event){
	event.preventDefault();

	

	var inputOne = $('.input_one').val();
	var operator = $('.operator').val();
	var inputTwo = $('.input_two').val();
	var equation,
		result;
	equation = inputOne+operator+inputTwo;
	

	//error checking
	var valid = false;

	if (!isNaN(inputOne) && !isNaN(inputTwo)){
		valid = true;
		}


	if (valid){
		result = eval(equation);
	}else{
		result = "ERROR";

	}
	$('.output').val(result);
}
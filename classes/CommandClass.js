class CommandInput{
	constructor(input){
		this.inputString = input;
		this.commandName = '';
		this.commandArguments = [];
		this.processCommand();
	}
	
	/**
	 * Processes the input as a command
	 */
	processCommand(){
		if(!this.isCommand()){
			return;
		}
		
		// Get the commandName without the leading commandSymbol (!)
		var firstSpace = this.inputString.indexOf(' ');
		firstSpace = (firstSpace > -1) ? firstSpace : undefined;
		
		this.commandName = this.inputString.substr(1, firstSpace - 1);
		
		// The arguments are what is left after the first space
		if(firstSpace === undefined){
			return;
		}
		
		// Process the arguments
		this.commandArguments = this.processArguments(this.inputString.substr(firstSpace + 1));
	}
	
	/**
	 * Processes the input as an argument string
	 * 
	 * @param {*string} argumentString 
	 */
	processArguments(argumentString){
		let commandArguments = [];
		let quoted = false;
		let startPosition = 0;
		
		for(let i = 0; i < argumentString.length;i++){
			let char = argumentString.charAt(i);
			let endPosition = i - startPosition;
			
			// If it's a space and we are not in a quoted argument push
			if(char === ' ' && !quoted){
				if(startPosition + 1 < endPosition){
					commandArguments.push(argumentString.substr(startPosition, endPosition));
				}
				startPosition = i + 1;
			}
			
			// If it's a quoute toggle quote and push if it's the end quote
			if(char === '"'){
				if(quoted){
					quoted = false;
					commandArguments.push(argumentString.substr(startPosition, endPosition));
					startPosition = i + 1;
				}else{
					quoted = true;
					startPosition = i + 1;
				}
			}
		}
		
		// After going through it there is one argument unprocessed
		var lastArgument = argumentString.substr(startPosition);
		
		if(lastArgument.length > 1){
			commandArguments.push(lastArgument);
		}
		return commandArguments;
	}
	
	/**
	 * Returns wheather or not the input provided was a command
	 */
	isCommand (){
		return this.inputString.charAt(0) === '!';
	}
	
	/**
	 * Gets the name of the command executed
	 * 
	 * @return {*string}
	 */
	getCommandName(){
		return this.commandName;
	}
	
	/**
	 * Returns the number of arguments the command was given
	 * 
	 * @return {*integer}
	 */
	getArgumentCount(){
		return this.commandArguments.length;
	}
	
	/**
	 * Returns a list of arguments the command has
	 * 
	 * @return {*array}
	 */
	getArguments(){
		return this.commandArguments;
	}
	
}

var testingStrings = [
	'me someone action',
	'!me someone action',
	'!me "some name" action',
	'!me name "action"',
	'!ping'
];

for(var string of testingStrings){
	testCommand = new CommandInput(string);
	console.log("Input: " + string);
	console.log("Is command: " + testCommand.isCommand());
	console.log("Command name: "  + testCommand.getCommandName());
	console.log("Argument count: "  + testCommand.getArgumentCount());
	console.log("Arguments: " );console.log(testCommand.getArguments());
	console.log('---------------------');
}
const yargs = require('yargs');
const fs = require('fs');
const controllerFileBased = require('./src/controllerFileBased');
const controllerCmdBased = require('./src/controllerCmdBased');




let commands = yargs.argv._;

if( commands[0]=='readFromFile'){
    fs.readFile(commands[1],'utf8',(err,text)=>{
        let textByLine = text.split("\r\n")
        controllerFileBased(textByLine);
    })
}

if(commands[0]=='readFromCmd'){
    var obj ={};
    var standard_input = process.stdin;
    standard_input.setEncoding('utf-8');

    standard_input.on('data', function (data) {
        if(data === 'exit\n'){
            process.exit();
        }else
        {
            controllerCmdBased(data,obj)
        }
    });
}




yargs.parse()
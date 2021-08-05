const yargs = require('yargs');
const fs = require('fs');
const controllerFileBased = require('./src/controllerFileBased');
const parkingLotCreater = require('./src/ParkingLotCreator')




let commands = yargs.argv._;

if( commands[0]=='readFromFile'){
    fs.readFile(commands[1],'utf8',(err,text)=>{
        let textByLine = text.split("\r\n")
        controllerFileBased(textByLine);
    })
}

if(commands[0]=='readFromCmd'){
    var parkingLot;
    var standard_input = process.stdin;
    standard_input.setEncoding('utf-8');

    standard_input.on('data', function (data) {
        if(data === 'exit\n'){
            process.exit();
        }else
        {
            data = data.replace(/[\r\n]/g, "")
            let arr = data.split(' ');
            switch ( arr[0] ){
                case 'create_parking_lot' : {  parkingLot = new parkingLotCreater(Number(arr[1]));  break;}
                case 'park':{ parkingLot.park(arr[1],arr[2]); break;}
                case 'leave':{ parkingLot.leave( Number(arr[1]) ); break;}
                case 'status':{ parkingLot.status( ); break;}
                case 'registration_numbers_for_cars_with_colour':{ parkingLot.colorBasedSelectionRegist(arr[1]); break;}
                case 'slot_numbers_for_cars_with_colour':{ parkingLot.colorBasedSelectionSlot(arr[1]); break;}
                case 'slot_number_for_registration_number':{ parkingLot.registNoBasedSelection(arr[1]); break;}
                default:break;
            }
        }
    });
}




yargs.parse()
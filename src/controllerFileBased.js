const parkingLotCreator = require("./ParkingLotCreator");

function controllerFileBased(commands){

    for(let i =0;i<commands.length;i++){

        let arr = commands[i].split(' ');
        switch ( arr[0] ){
            case 'create_parking_lot' : { var parkingLot = new parkingLotCreator(Number(arr[1])); break;}
            case 'park':{ parkingLot.park(arr[1],arr[2]); break;}
            case 'leave':{ parkingLot.leave( Number(arr[1]) ); break;}
            case 'status':{ parkingLot.status( ); break;}
            case 'registration_numbers_for_cars_with_colour':{ parkingLot.colorBasedSelectionRegist(arr[1]); break;}
            case 'slot_numbers_for_cars_with_colour':{ parkingLot.colorBasedSelectionSlot(arr[1]); break;}
            case 'slot_number_for_registration_number':{ parkingLot.registNoBasedSelection(arr[1]); break;}
            default:break;
        }

    }

}

module.exports= controllerFileBased;

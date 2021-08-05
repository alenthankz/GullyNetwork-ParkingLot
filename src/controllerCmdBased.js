const parkingLotCreater = require('./ParkingLotCreator')

function controllerCmdBased(data, obj){

    data = data.replace(/[\r\n]/g, "")
    let arr = data.split(' ');
    switch ( arr[0] ){
        case 'create_parking_lot' : {  obj['parkingLot'] = new parkingLotCreater(Number(arr[1]));  break;}
        case 'park':{ obj.parkingLot.park(arr[1],arr[2]); break;}
        case 'leave':{ obj.parkingLot.leave( Number(arr[1]) ); break;}
        case 'status':{ obj.parkingLot.status( ); break;}
        case 'registration_numbers_for_cars_with_colour':{ obj.parkingLot.colorBasedSelectionRegist(arr[1]); break;}
        case 'slot_numbers_for_cars_with_colour':{ obj.parkingLot.colorBasedSelectionSlot(arr[1]); break;}
        case 'slot_number_for_registration_number':{ obj.parkingLot.registNoBasedSelection(arr[1]); break;}
        default:break;
    }

}

module.exports= controllerCmdBased;

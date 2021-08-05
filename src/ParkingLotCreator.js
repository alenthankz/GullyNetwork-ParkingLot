const issueTicket = require('./issueTicket')
const MinHeap = require('min-heap');
const statusPrinter = require('./statusPrinter');
const colorBasedSelector = require('./colorBasedSelector');

class parkingLotCreator{

    constructor(num){
        this.capacity = num;
        this.currSize = num;
        this.availableSlots = new MinHeap();
        this.slots =  Array(num+1).fill(null);
        this.colorCars=[];
        this.regist_slot={};

        this.initialiseSlots();

        console.log("Created a parking lot with "+num+" slots");
    }

    initialiseSlots(){
        for(let i =1;i<=this.capacity;i++) this.availableSlots.insert(i);
    }

    park(registNo,color){
        if(this.currSize==0) {console.log( "Sorry , parking lot is full" ); return;}
        
        registNo=registNo.toUpperCase()
        color=color.toUpperCase()
        let slot = this.availableSlots.removeHead();

        let issuedTicket = new issueTicket(slot,registNo,color);
        this.slots[slot]=issuedTicket;

        if(!this.colorCars[color]){
            this.colorCars[color]= new Set();
        }
        this.colorCars[color].add(slot);

        this.regist_slot[registNo]=slot;

        this.currSize--;
        console.log( "Allocated slot number: "+slot );

    }
    leave(slot){
        let car = this.slots[slot];
        this.colorCars[car.color].delete(car.slotNo);
        this.slots[slot]=null;
        delete this.regist_slot[car.registNo];

        this.currSize++;
        this.availableSlots.insert(slot);

        console.log( "Slot number "+slot+" is free" );
    }
    status(){
        console.log("Slot No      Registration No          Colour")
        this.slots.forEach((item)=>statusPrinter(item));
    }

    colorBasedSelectionRegist(color){
        color = color.toUpperCase()
        let selectedRegistNos = colorBasedSelector(this.slots,this.colorCars,color)

        
        console.log(selectedRegistNos.toString());
    }

    colorBasedSelectionSlot(color){
        color = color.toUpperCase()
        let selectedSlots = [];
        this.colorCars[color].forEach( slot => selectedSlots.push(slot) )

        console.log(selectedSlots.toString());
    }

    registNoBasedSelection(registNo){
        registNo=registNo.toUpperCase()
        if(this.regist_slot[registNo]){
            console.log(this.regist_slot[registNo]+'');
        }else{
            console.log("Not Found");
        }

    }


};

module.exports= parkingLotCreator;
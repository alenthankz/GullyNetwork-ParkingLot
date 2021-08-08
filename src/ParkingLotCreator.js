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

        //total time complexity O(n)
        //min heap is used as it was mentioned in problem that to allot a car parking slot nearest to entry Gate.
        //i assumed nearest entry as smaller slot number as it was not clearly mentioned where is the entry Gate.
        //if not that way we can use a set to reduce the time complexity to O(1)
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

        //Total Time complexity = log(n) from min Heap. 
       
    }
    leave(slot){
        let car = this.slots[slot];
        this.colorCars[car.color].delete(car.slotNo);
        this.slots[slot]=null;
        delete this.regist_slot[car.registNo];

        this.currSize++;
        this.availableSlots.insert(slot);

        console.log( "Slot number "+slot+" is free" );

        //Time Complexity O(1) 
    }
    status(){
        console.log("Slot No      Registration No          Colour")
        this.slots.forEach((item)=>statusPrinter(item));

        //Time Complexity O(n) 
    }

    colorBasedSelectionRegist(color){
        color = color.toUpperCase()
        let selectedRegistNos = colorBasedSelector(this.slots,this.colorCars,color)

        console.log(selectedRegistNos.toString());

        //Time Complexity O(1) 
    }

    colorBasedSelectionSlot(color){
        color = color.toUpperCase()
        let selectedSlots = [];
        this.colorCars[color].forEach( slot => selectedSlots.push(slot) )

        console.log(selectedSlots.toString());

        //Time Complexity O(n) if all cars are of same color ( worst case)
    }

    registNoBasedSelection(registNo){
        registNo=registNo.toUpperCase()
        if(this.regist_slot[registNo]){
            console.log(this.regist_slot[registNo]+'');
        }else{
            console.log("Not Found");
        }

        //Time Complexity O(1) 

    }


};

module.exports= parkingLotCreator;
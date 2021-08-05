function colorBasedSelector(slots , colorCars ,color){
    var output=[];
    colorCars[color].forEach( slot =>  output.push(slots[slot].registNo)  );
    return output;
}

module.exports = colorBasedSelector;
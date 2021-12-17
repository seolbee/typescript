module.exports = class Stock {
    code:string;
    name:string;
    price:number;
    time:number;

    constructor( code:string, name:string, price:number, time:number){
        this.code = code;
        this.name = name;
        this.price = price;
        this.time = time;
    }
};
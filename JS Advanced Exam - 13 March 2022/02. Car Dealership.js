class CarDealership {
    #model;
    #horsepower;
    #price;
    #mileage;
    constructor(name) {
        this.name = name;
        this.availableCars = [];
        this.soldCars = [];
        this.totalIncome = 0;
    }
 
    get Model() {
        return this.#model;
    }
    get Horsepower() {
        return this.#horsepower;
    }
    get Price() {
        return this.#price;
    }
    get Mileage() {
        return this.#mileage;
    }
    set Model(value) {
        if (typeof value != 'string' || value.length == 0) {
            this.throwError();
 
        }
        this.#model = value;
 
    }
    set Horsepower(value) {
        if (typeof value != 'number' || value < 0 || !Number.isInteger(value)) {
            this.throwError();
 
        }
        this.#horsepower = Math.floor(value);
 
    }
    set Price(value) {
        if (typeof value != 'number' || value < 0) {
            this.throwError();
 
        }
        this.#price = value;
 
    }
    set Mileage(value) {
        if (typeof value != 'number' || value < 0) {
 
            this.throwError();
        }
 
        this.#mileage = value;
    }
    
    addCar(model, horsepower, price, mileage) {
        this.Model = model;
        this.Horsepower = horsepower;
        this.Price = price;
        this.Mileage = mileage;
 
        this.availableCars.push({ model, horsepower, price, mileage });
        return `New car added: ${model} - ${horsepower} HP - ${mileage.toFixed(2)} km - ${price.toFixed(2)}$`;
    }
    
    sellCar(model, desiredMileage){
      let car = this.availableCars.find(m => m.model == model);
      
      if (car == undefined) {
        throw new Error(`${model} was not found!`);
      }
      
      let soldPrice = car.price;
      
      if (car.mileage <= desiredMileage) {
        soldPrice *= 1;
      } else if (car.mileage  - desiredMileage <= 40000) {
        soldPrice *= .95;
      } else {
        soldPrice *= .9;
      }
      
      //this.availableCars = this.availableCars.filter(m => m.model != model);
      this.availableCars = this.availableCars.filter(m => m != car);
      
      let horsepower = car.horsepower; 
      
      this.soldCars.push({model, horsepower, soldPrice});
      this.totalIncome += soldPrice;
      
      return `${model} was sold for ${soldPrice.toFixed(2)}$`; 
    }
    
    currentCar(){
      let s = '-Available cars:\n';
      
      if (this.availableCars.length == 0) {
        s = "There are no available cars";
      } else {
        let arr = [];
        for (var prop of this.availableCars) {
          arr.push(`---${prop.model} - ${prop.horsepower} HP - ${prop.mileage.toFixed(2)} km - ${prop.price.toFixed(2)}$`);
        }
        s += arr.join('\n');
      }
      
      return s;
    }
    
    salesReport(criteria){
      if(!(criteria == "horsepower" || criteria == "model")){
        throw new Error("Invalid criteria!");
      }
      
      if(criteria == "horsepower"){
        this.soldCars.sort((a, b) => {
          return b.horsepower - a.horsepower;
        });
      } else {
        this.soldCars.sort((a, b) => {
          return a.model.localeCompare(b.model);
        });
      }
          
          let s = `-${this.name} has a total income of ${this.totalIncome.toFixed(2)}$\n`;
          s += `-${this.soldCars.length} cars sold:\n`;
          
          let arr = [];
          
          for (var prop of this.soldCars) {
            arr.push(`---${prop.model} - ${prop.horsepower} HP - ${prop.soldPrice.toFixed(2)}$`);
          }
          
          return s + arr.join('\n');
      
    }
    
    throwError() {
        throw new Error("Invalid input!");
    }
}

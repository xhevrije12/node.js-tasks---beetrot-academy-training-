function Person(name, address) {
  this.name = name;
  this.address = address;
  
  this.getInfo = function() {
    console.log(`Name: ${this.name}`);
    console.log(`Address: ${this.address}`);
  };
}

module.exports = Person;
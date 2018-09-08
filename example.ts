import CreditCardGenerator from "./CreditCardGenerator";

const creditCardGenerator = new CreditCardGenerator();
console.log("Number: ", creditCardGenerator.generateSingle("VISA"));
console.log("Numbers: ", creditCardGenerator.generateMultiple("VISA", 3));

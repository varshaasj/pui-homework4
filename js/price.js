


const glazingPrices = {
	"Keep original": 0.0,
	"Sugar milk": 0.0,
	"Vanilla milk": 0.50,
	"Double chocolate": 1.50
};

const packPrices = {
	"1": 1, "3": 3, "6": 5, "12": 10
};

let totalCartPrice = 0;

class Roll {

	   constructor(rollType, rollGlazing, packSize, basePrice) {
	       this.type = rollType;
	       this.glazing =  rollGlazing;
	       this.size = packSize;
	       this.basePrice = basePrice;
	   }
   }
   var cart = [];
   const cartA = new Roll('Original', 'Sugar milk',1,0)
   const cartB = new Roll('Walnut', 'Vanilla milk',12,0.5)
   const cartC = new Roll('Raisin', 'Sugar milk',3,0)
   const cartD = new Roll('Apple', 'Keep original',3,0)
   cart.push(cartA);
   cart.push(cartB);
   cart.push(cartC);
   cart.push(cartD);

//function rollDisplay (roll){
//	document.getElementById("cart-item").innerHTML = roll;
//}

for (const roll of cart) {
	console.log(roll);
	createElement(roll);
  }

function createElement(roll) {
	console.log('creating an element');
	const template = document.querySelector('#roll-template');
	const clone = template.content.cloneNode(true);
	roll.element = clone.querySelector('.cart-item');
	console.log(roll.element);

	const btnDelete = roll.element.querySelector('.remove');
	console.log(btnDelete);
	btnDelete.addEventListener('click', () => {
		deleteNote(roll);

	});

	const cartWrapperElement = document.querySelector('.cart-wrapper');
	cartWrapperElement.append(roll.element);
	updateElement(roll);
}

function updateElement(roll){
	const glazingPrices = {
		"Keep original": 0.0,
		"Sugar milk": 0.0,
		"Vanilla milk": 0.50,
		"Double chocolate": 1.50
	};
	const packPrices = {
		"1": 1, "3": 3, "6": 5, "12": 10
	};

	const productImageElement = roll.element.querySelector('.product-image');
	const itemDetailElement = roll.element.querySelector('.item-detail');
	const itemPriceElement = roll.element.querySelector('.item-price');
	const itemTypeElement = roll.element.querySelectorAll('item-price roll-type')
	
	console.log(itemTypeElement);

	productImageElement.src = "images/products/" + rolls[roll.type]["imageFile"];
	itemDetailElement.innerText = roll.type + " Cinammon Roll" + "\n \nGlazing: " + roll.glazing + "\n \nPack Size: " + roll.size;
	//itemTypeElement.innerText = roll.type;
	console.log(roll.basePrice) 
	console.log(glazingPrices[roll.glazing]) 
	const total = (rolls[roll.type]['basePrice'] + glazingPrices[roll.glazing]) * packPrices[String(roll.size)]
	totalCartPrice = totalCartPrice + total;
	console.log(total)
	itemPriceElement.innerText = "$ " + total.toFixed(2);
	document.getElementById("total-price").innerHTML = totalCartPrice.toFixed(2);
}

function deleteNote(roll){
	if(cart.length!=0){
		roll.element.remove();
		cart.pop(roll);
		totalCartPrice = totalCartPrice - (rolls[roll.type]['basePrice'] + glazingPrices[roll.glazing]) * packPrices[String(roll.size)];
		document.getElementById("total-price").innerHTML = totalCartPrice.toFixed(2);
	}
	
}

const basePrice = rolls[rollType]['basePrice'];
let currentGlazingPrice = 0; // keep original
let currentPackPrice = 1; // 1
let currentGlazing = "Keep original";
let currentPack = '1';


const basePriceField = document.querySelector("#add-cart span");
basePriceField.textContent = "$" + basePrice;

/* Populate glazing options with corresponding price adaptation values */
const glazingSelect = document.querySelector("select#glazing-options");

for (const [glazing, price] of Object.entries(glazingPrices)) {
	const option = document.createElement("option");
	option.textContent = glazing;
	option.value = glazing;
	glazingSelect.appendChild(option);
}

/* Populate pack options with corresponding price adaptation values */
const packSelect = document.querySelector("select#pack-options");

for (const [pack, price] of Object.entries(packPrices)) {
	const option = document.createElement("option");
	option.textContent = pack;
	option.value = pack;
	packSelect.appendChild(option);
}

/* Record the current glazing option and update the total price */
function glazingChange(element) {
	
	currentGlazing= element.value;
	updateTotalPrice();
}

/* Record the current pack option and update the total price */
function packChange(element) {
	//currentPack = element.textContent;
	currentPack= element.value;
	updateTotalPrice();
}

function updateTotalPrice() {
	const totalPrice = (basePrice + glazingPrices[currentGlazing]) * packPrices[currentPack];
	const totalPriceField = document.querySelector("#add-cart span");
	totalPriceField.textContent = "$" + totalPrice.toFixed(2);
}



function saveData() {
	let newRoll = new Roll(rollType,currentGlazing,currentPack,basePrice);
	cart.push(newRoll)
	console.log(cart)
}



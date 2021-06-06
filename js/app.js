'use strict';

let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');
let maxAttempts =25;
let userAttemptsCounter = 0;
let leftImageIndex;
let middleImageIndex;
let rightImageIndex;

function Product(name, source, timesShown) {
  this.name = name;
  this.source = source;
  this.timesShown = timesShown;
  this.timesShown = 0;
  this.votes = 0;
  Product.allProducts.push(this);
}

Product.allProducts = [];
new Product('bag', 'images/bag.jpg');
new Product('banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dog-duck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('pen', 'images/pen.jpg');
new Product('pet-sweep', 'images/pet-sweep.jpg');
new Product('scissors', 'images/scissors.jpg');
new Product('shark', 'images/shark.jpg');
new Product('sweep', 'images/sweep.png');
new Product('tauntaun', 'images/tauntaun.jpg');
new Product('unicorn', 'images/unicorn.jpg');
new Product('usb', 'images/usb.gif');
new Product('water-can', 'images/water-can.jpg');
new Product('wine-glass', 'images/wine-glass.jpg');

function creatingRandomIndex() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

creatingRandomIndex();
console.log(creatingRandomIndex());

function renderThreeImages() {
  leftImageIndex = creatingRandomIndex();
  middleImageIndex = creatingRandomIndex();
  rightImageIndex = creatingRandomIndex();
  while (leftImageIndex === middleImageIndex || leftImageIndex === rightImageIndex) {
    rightImageIndex = creatingRandomIndex();
    middleImageIndex = creatingRandomIndex();
  }
  while (rightImageIndex === middleImageIndex) {
    middleImageIndex = creatingRandomIndex();
  }
  leftImageElement.src = Product.allProducts[leftImageIndex].source;
  Product.allProducts[leftImageIndex].timesShown++;
  rightImageElement.src = Product.allProducts[rightImageIndex].source;
  Product.allProducts[rightImageIndex].timesShown++;
  middleImageElement.src = Product.allProducts[middleImageIndex].source;
  Product.allProducts[middleImageIndex].timesShown++;


}

renderThreeImages();

let container = document.getElementById('container');
container.addEventListener('click', handleUserClick);
function handleUserClick(event) {
  userAttemptsCounter++;
  if (userAttemptsCounter <= maxAttempts) {
    if (event.target.id !== 'container' && event.target.id === 'left-image') {
      Product.allProducts[leftImageIndex].votes++;
    }
    else if (event.target.id !== 'container' && event.target.id === 'middle-image') {
      Product.allProducts[middleImageIndex].votes++;
    }
    else {
      Product.allProducts[rightImageIndex].votes++;
    }
    renderThreeImages();
  } else {
    container.removeEventListener('click', handleUserClick);
    let button = document.getElementById('btn').style.display ='block';
    button=document.getElementById('btn');
    button.addEventListener('click', showingResults);
    // eslint-disable-next-line no-inner-declarations
    function showingResults(event) {
      let list = document.getElementById('results-list');
      for (let i = 0; i < Product.allProducts.length; i++) {
        let productResult = document.createElement('li');
        list.appendChild(productResult);
        productResult.textContent = `${Product.allProducts[i].name} has ${Product.allProducts[i].votes} votes, and was seen ${Product.allProducts[i].timesShown} times.`;
        button.removeEventListener('click', showingResults);
      }
    }
  }

}



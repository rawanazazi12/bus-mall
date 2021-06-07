'use strict';

let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');
let maxAttempts =25;
let userAttemptsCounter = 0;
let leftImageIndex;
let middleImageIndex;
let rightImageIndex;
let productNames=[];
let votes=[];
let shown=[];
let price=true;

function Product(name, source, timesShown) {
  this.name = name;
  this.source = source;
  this.timesShown = timesShown;
  this.shown = 0;
  this.votes = 0;
  Product.allProducts.push(this);
  productNames.push(this.name);
  let price='rawan';
  this.price=4

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
// console.log(creatingRandomIndex());

let imagesArr=[];
function renderThreeImages() {
  leftImageIndex = creatingRandomIndex();
  middleImageIndex = creatingRandomIndex();
  rightImageIndex = creatingRandomIndex();
  while (leftImageIndex === middleImageIndex || leftImageIndex === rightImageIndex ||rightImageIndex===middleImageIndex ||imagesArr.includes(leftImageIndex) || imagesArr.includes(middleImageIndex) || imagesArr.includes(rightImageIndex)){
    rightImageIndex = creatingRandomIndex();
    middleImageIndex = creatingRandomIndex();
    leftImageIndex=creatingRandomIndex();
  }
  imagesArr[0]=(leftImageIndex);
  imagesArr[1]=(middleImageIndex);
  imagesArr[2]=(rightImageIndex);
  console.log(imagesArr);

  leftImageElement.src = Product.allProducts[leftImageIndex].source;
  Product.allProducts[leftImageIndex].shown++;
  rightImageElement.src = Product.allProducts[rightImageIndex].source;
  Product.allProducts[rightImageIndex].shown++;
  middleImageElement.src = Product.allProducts[middleImageIndex].source;
  Product.allProducts[middleImageIndex].shown++;


}

renderThreeImages();

let container = document.getElementById('container');
container.addEventListener('click', handleUserClick);
let button = document.getElementById('btn');
function handleUserClick(event) {
  userAttemptsCounter++;
  if (userAttemptsCounter <= maxAttempts) {
    if (event.target.id !== 'container' && event.target.id === 'left-image') {
      Product.allProducts[leftImageIndex].votes++;
    }
    else if (event.target.id !== 'container' && event.target.id === 'middle-image') {
      Product.allProducts[middleImageIndex].votes++;
    }
    else if (event.target.id !== 'container' && event.target.id === 'right-image'){
      Product.allProducts[rightImageIndex].votes++;
    }else{
      alert('PLEASE Click on the Images only');
    }
    renderThreeImages();
  } else {
    container.removeEventListener('click', handleUserClick);
    button.hidden=false;
    button.addEventListener('click', showingResults);
    for(let i=0; i<Product.allProducts.length;i++){
      votes.push(Product.allProducts[i].votes);
      shown.push(Product.allProducts[i].shown);
    }
    chart();
  }
}

function showingResults() {
  let list = document.getElementById('results-list');
  for (let i = 0; i < Product.allProducts.length; i++) {
    let productResult = document.createElement('li');
    list.appendChild(productResult);
    productResult.textContent = `${Product.allProducts[i].name} has ${Product.allProducts[i].votes} votes, and was seen ${Product.allProducts[i].shown} times.`;
  }
  button.removeEventListener('click', showingResults);
}

function chart() {
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Showns',
        data: shown,
        backgroundColor: [
          'rgba(25, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }


  });

}

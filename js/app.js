'use strict';

function AppState() {
  this.allProducts = [];
}

AppState.prototype.instantiateProducts = function () {

  const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

  for (let i = 0; i < productNames.length; i++) {
    if (productNames[i] === 'sweep') {
      this.allProducts.push(new Product(productNames[i], 'png'))
    } else {
      this.allProducts.push(new Product(productNames[i]))
    }
  }

}

AppState.prototype.saveToLocalStorage = function () {
  if (votingRounds === 0) {
    let stringifiedProducts = JSON.stringify(this.allProducts);
    localStorage.setItem('myProducts',stringifiedProducts);
  }
}

AppState.prototype.loadItems = function () {
  let retrieveData = localStorage.getItem('myProducts');
  let parsedData = JSON.parse(retrieveData);

  if (retrieveData) {
    for (let i = 0; i < parsedData.length; i++) {
      if (parsedData[i].name === 'sweep') {
        let reconstructedSweep = new Product(parsedData[i].name, 'png');
        reconstructedSweep.timesShown = parsedData[i].timesShown;
        reconstructedSweep.timesClicked = parsedData[i].timesClicked;
        this.allProducts.push(reconstructedSweep);
      } else {
        let reconstructedProducts = new Product(parsedData[i].name);
        reconstructedProducts.timesShown = parsedData[i].timesShown;
        reconstructedProducts.timesClicked = parsedData[i].timesClicked;
        this.allProducts.push(reconstructedProducts);
      }
    }
  } else {
    this.instantiateProducts();

  }

}

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.source = `assets/${name}.${fileExtension}`;
  this.timesShown = 0;
  this.timesClicked = 0;
}
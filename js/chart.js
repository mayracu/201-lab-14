'use strict';

let canvasElem = document.getElementById('chart')

/* TODO:
 * - Instantiate a new AppState
 * - Use a method on that AppState to load vote data from localStorage.
 * - Create a data object for chart.js using your AppState's allProducts array.
 * - Combine the data object with configuration information for chart.js type, colors, etc
 * - Call chart.js with the configuration and the canvasElem
 *
 */
function renderChart() {
  let state = new AppState();
  state.loadItems();
  let productNames = [];
  let productViews = [];
  let productVotes = [];
  for (let i = 0; i < state.allProducts.length; i++) {
    productNames[i] = state.allProducts[i].name;
    productViews[i] = state.allProducts[i].timesShown;
    productVotes[i] = state.allProducts[i].timesClicked;
  }
  let chartResults ={
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        backgroundColor: 'rgba(245, 40, 145, 0.8)',
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: productVotes,
        backgroundColor: 'rgba(245, 167, 145, 0.8)',
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
  };
  new Chart(canvasElem, chartResults);
}


renderChart();
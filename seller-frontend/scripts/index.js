// Bar Chart


var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["red", "green","blue","orange","brown"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "World Wine Production 2018"
    }
  }
});


// sidebar buttons show - hide

var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [35, 49, 44, 24, 15];
var barColors = ["red", "green", "blue", "orange", "brown"];

new Chart("myChart", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        legend: { display: false },
        title: {
            display: true,
            text: "World Wine Production 2018"
        }
    }
});

// show hide
const homeBtn = document.getElementById("Home")
const productsBtn = document.getElementById("Products")
const couponsBtn = document.getElementById("Coupons")
const adsBtn = document.getElementById("Ads")
const chatBtn = document.getElementById("Chat")

const homeDiv = document.getElementById("homeDiv")
const productsDiv = document.getElementById("productsDiv")
const couponsDiv = document.getElementById("couponsDiv")
const adsDiv = document.getElementById("adsDiv")
const chatDiv = document.getElementById("chatDiv")

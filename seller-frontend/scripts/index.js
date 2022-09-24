var xValues = ["Total Sales", "Total Income", "Total Views"];
var yValues = [29, 49, 17, 0];
var barColors = ["red", "green","orange","blue"];

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
            text: "Statistics"
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

homeBtn.addEventListener("click", () => {
    homeDiv.style.display = 'block'

    productsDiv.style.display = 'none'
    couponsDiv.style.display = 'none'
    adsDiv.style.display = 'none'
    chatDiv.style.display = 'none'
})
productsBtn.addEventListener("click", () => {
    productsDiv.style.display = 'block'

    homeDiv.style.display = 'none'
    couponsDiv.style.display = 'none'
    adsDiv.style.display = 'none'
    chatDiv.style.display = 'none'
})
couponsBtn.addEventListener("click", () => {
    couponsDiv.style.display = 'block'

    homeDiv.style.display = 'none'
    adsDiv.style.display = 'none'
    productsDiv.style.display = 'none'
    chatDiv.style.display = 'none'
})
adsBtn.addEventListener("click", () => {
    adsDiv.style.display = 'block'

    homeDiv.style.display = 'none'
    couponsDiv.style.display = 'none'
    productsDiv.style.display = 'none'
    chatDiv.style.display = 'none'
})
chatBtn.addEventListener("click", () => {
    chatDiv.style.display = 'block'

    homeDiv.style.display = 'none'
    couponsDiv.style.display = 'none'
    adsDiv.style.display = 'none'
    productsDiv.style.display = 'none'
})

const nav = document.getElementById("myLinks");
const navBtn = document.getElementById("openNav")
navBtn.addEventListener("click", () => {
  if (nav.style.display === "block") {
    nav.style.display = "none";
  } else {
    nav.style.display = "block";
  }
})
const mainContainer = document.getElementById("main-container")
mainContainer.addEventListener("click", () => {
  if (nav.style.display === "block") {
    nav.style.display = "none";
  }
})
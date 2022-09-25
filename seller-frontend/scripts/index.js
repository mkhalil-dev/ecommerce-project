// Chart settings

var xValues = ["Total Sales", "Total Income", "Total Views"];
var barColors = ["red", "green","orange",];




// show hide main content when clicking sidebar buttons
document.getElementById("addproduct").style.display = 'none'
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
const editproduct = document.getElementById("addproduct")

homeBtn.addEventListener("click", () => {
    homeDiv.style.display = 'block'

    editproduct.style.display = 'none'
    productsDiv.style.display = 'none'
    couponsDiv.style.display = 'none'
    adsDiv.style.display = 'none'
    chatDiv.style.display = 'none'
})
productsBtn.addEventListener("click", () => {
    productsDiv.style.display = 'block'

    editproduct.style.display = 'none'
    homeDiv.style.display = 'none'
    couponsDiv.style.display = 'none'
    adsDiv.style.display = 'none'
    chatDiv.style.display = 'none'
})
couponsBtn.addEventListener("click", () => {
    couponsDiv.style.display = 'block'

    editproduct.style.display = 'none'
    homeDiv.style.display = 'none'
    adsDiv.style.display = 'none'
    productsDiv.style.display = 'none'
    chatDiv.style.display = 'none'
})
adsBtn.addEventListener("click", () => {
    adsDiv.style.display = 'block'

    editproduct.style.display = 'none'
    homeDiv.style.display = 'none'
    couponsDiv.style.display = 'none'
    productsDiv.style.display = 'none'
    chatDiv.style.display = 'none'
})
chatBtn.addEventListener("click", () => {
    chatDiv.style.display = 'block'

    editproduct.style.display = 'none'
    homeDiv.style.display = 'none'
    couponsDiv.style.display = 'none'
    adsDiv.style.display = 'none'
    productsDiv.style.display = 'none'
})

// document.getElementById("edit-prod").addEventListener("click", () => {
//   editproduct.style.display = 'block'

//   productsDiv.style.display = 'none'
//   homeDiv.style.display = 'none'
//   couponsDiv.style.display = 'none'
//   adsDiv.style.display = 'none'
//   chatDiv.style.display = 'none'
// })

// Show hide drop down menu

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

let sid = new FormData()
sid.set('id', "4")
axios.post('http://localhost/ecommerce-project/ecommerce-server/top_products.php', sid).then((response) => {
  const data = response.data
  data.forEach(item => {
    document.getElementById("top-5-v").insertAdjacentHTML('beforeend', '<tr><td style="text-align: center;">'+item.name+'</td><td style="text-align: center;">'+item.id+'</td><td style="text-align: center;">'+item.view+'</td></tr>')
  });
})

axios.post('http://localhost/ecommerce-project/ecommerce-server/revenue.php', sid).then((response) => {
  const data = response.data
  document.getElementById("week").innerText = data.week+"$"
  document.getElementById("month").innerText = data.month+"$"
  document.getElementById("year").innerText = data.year+"$"
})

axios.post('http://localhost/ecommerce-project/ecommerce-server/seller_views.php', sid).then((response) => {
  const data = response.data
  document.getElementById("view").innerText = data[0]
  var yValues = [29, 49, data[0]];
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
})

axios.post('http://localhost/ecommerce-project/ecommerce-server/get_seller_ads.php', sid).then((newresp) => {
  const newrespdata = newresp.data
  if(newrespdata){
    newrespdata.forEach((ad)=> {
      adsDiv.insertAdjacentHTML('beforeend', '<div class="cards-pr"><h1>'+ad.name+'</h1><div><img src="data:image/png;base64,'+ad.ad+'" style="max-width: 100%; max-height: 100%;" alt=""></div><button class="btn-pr" id="btn-'+ad.id+'">Delete Ad</button></div>')
      document.getElementById("btn-"+ad.id).addEventListener('click', function(){
        axios.post('http://localhost/ecommerce-project/ecommerce-server/remove_ads.php?id='+ad.id).then((response) => {
          console.log(response)
        })
      })
    })
  }
})

axios.post('http://localhost/ecommerce-project/ecommerce-server/get_seller_products.php', sid).then((response) => {
  const data = response.data
  data.forEach((item) => {
    document.getElementById("display-pro").insertAdjacentHTML('beforeend', '<tr><td>'+item.name+'</td><td>'+item.desc+'</td><td>'+item.price+'</td><td id="activead"><input type="file" name="createad" id="createad-'+item.id+'" style="display:none;" accept="image/png, image/jpeg"><label for="createad-'+item.id+'" class="btn-table" size="12" id="btn-ad">Create Ad</label></td><td id="activedisc"><input type="number" id="coup-percent-'+item.id+'" min="1" max="100" size="10.5%" placeholder="enter %" style="border:1px solid #67acb4; border-radius: 3px; margin: 2px;"><input type="text" placeholder="Code" id="code-discount-'+item.id+'" size="10.5%" style=" border:1px solid #67acb4; border-radius: 3px; margin: 2px;"><button id="create-'+item.id+'" class="btn-table" width="12" id="btn-coupon">Create Coupon</button></td><td><button id="edit-'+item.id+'" class="btn-table" size="12">Edit Product</button></td></tr>')
    document.getElementById("createad-"+item.id).addEventListener('change', (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        let createadform = new FormData()
        createadform.set('ad', reader.result.split(",")[1])
        createadform.set('id', e.target.id.split("-")[1])
        axios.post('http://localhost/ecommerce-project/ecommerce-server/create_ads.php', createadform)
      };
      reader.readAsDataURL(file);
    });
  })
})



axios.post('http://localhost/ecommerce-project/ecommerce-server/get_seller_ads.php', sid).then((newresp) => {
  const newrespdata = newresp.data
  if(newrespdata){
    newrespdata.forEach((ad)=> {
      adsDiv.insertAdjacentHTML('beforeend', '<div class="cards-pr"><h1>'+ad.name+'</h1><div><img src="data:image/png;base64,'+ad.ad+'" style="max-width: 100%; max-height: 100%;" alt=""></div><button class="btn-pr" id="btn-'+ad.id+'">Delete Ad</button></div>')
      document.getElementById("btn-"+ad.id).addEventListener('click', function(){
        axios.post('http://localhost/ecommerce-project/ecommerce-server/remove_ads.php?id='+ad.id).then((response) => {
          console.log(response)
        })
      })
    })
  }
})
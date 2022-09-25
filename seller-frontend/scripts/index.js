// Chart settings

let xValues = ["Total Sales", "Total Income", "Total Views"];
let barColors = ["red", "green","orange",];
let yValues = []



// show hide main content when clicking sidebar buttons
document.getElementById("addproduct").style.display = 'none'
const homeBtn = document.getElementById("Home")
const productsBtn = document.getElementById("Products")
const categoriesBtn = document.getElementById("categories")
const couponsBtn = document.getElementById("Coupons")
const adsBtn = document.getElementById("Ads")
const chatBtn = document.getElementById("Chat")

const homeDiv = document.getElementById("homeDiv")
const productsDiv = document.getElementById("productsDiv")
const categoriesDiv = document.getElementById("categoriesDiv")
const couponsDiv = document.getElementById("couponsDiv")
const adsDiv = document.getElementById("adsDiv")
const chatDiv = document.getElementById("chatDiv")
const createproduct = document.getElementById("addproduct")
const editproduct = document.getElementById("editproduct")
let pid;
categoriesDiv.style.display = 'none'
editproduct.style.display = 'none'

homeBtn.addEventListener("click", () => {
    homeDiv.style.display = 'block'
    categoriesDiv.style.display = 'none'
    editproduct.style.display = 'none'
    createproduct.style.display = 'none'
    productsDiv.style.display = 'none'
    couponsDiv.style.display = 'none'
    adsDiv.style.display = 'none'
    chatDiv.style.display = 'none'
})
productsBtn.addEventListener("click", () => {
    productsDiv.style.display = 'block'
    categoriesDiv.style.display = 'none'
    editproduct.style.display = 'none'
    createproduct.style.display = 'none'
    homeDiv.style.display = 'none'
    couponsDiv.style.display = 'none'
    adsDiv.style.display = 'none'
    chatDiv.style.display = 'none'
})
categoriesBtn.addEventListener("click", () => {
  productsDiv.style.display = 'none'
  categoriesDiv.style.display = 'block'
  editproduct.style.display = 'none'
  createproduct.style.display = 'none'
  homeDiv.style.display = 'none'
  couponsDiv.style.display = 'none'
  adsDiv.style.display = 'none'
  chatDiv.style.display = 'none'
})
couponsBtn.addEventListener("click", () => {
    couponsDiv.style.display = 'block'
    categoriesDiv.style.display = 'none'
    editproduct.style.display = 'none'
    createproduct.style.display = 'none'
    homeDiv.style.display = 'none'
    adsDiv.style.display = 'none'
    productsDiv.style.display = 'none'
    chatDiv.style.display = 'none'
})
adsBtn.addEventListener("click", () => {
    adsDiv.style.display = 'block'
    categoriesDiv.style.display = 'none'
    editproduct.style.display = 'none'
    createproduct.style.display = 'none'
    homeDiv.style.display = 'none'
    couponsDiv.style.display = 'none'
    productsDiv.style.display = 'none'
    chatDiv.style.display = 'none'
})
chatBtn.addEventListener("click", () => {
    chatDiv.style.display = 'block'
    categoriesDiv.style.display = 'none'
    editproduct.style.display = 'none'
    createproduct.style.display = 'none'
    homeDiv.style.display = 'none'
    couponsDiv.style.display = 'none'
    adsDiv.style.display = 'none'
    productsDiv.style.display = 'none'
})

document.getElementById("create-new-product").addEventListener("click", () => {
  createproduct.style.display = 'block'
  categoriesDiv.style.display = 'none'
  editproduct.style.display = 'none'
  productsDiv.style.display = 'none'
  homeDiv.style.display = 'none'
  couponsDiv.style.display = 'none'
  adsDiv.style.display = 'none'
  chatDiv.style.display = 'none'
})

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
sid.set('id', localStorage.getItem('userid'))
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
  yValues[2] = data[0];
  displaychart(yValues)
})

axios.post('http://localhost/ecommerce-project/ecommerce-server/sellers_sold.php', sid).then((response) => {
  const data = response.data
  document.getElementById("total-sales").innerText = data[0]['count(pr.name)']
  yValues[0] = data[0]['count(pr.name)'];
  displaychart(yValues)
})

axios.post('http://localhost/ecommerce-project/ecommerce-server/sellers_income.php', sid).then((response) => {
  const data = response.data
  document.getElementById("total-income").innerText = data[0]['SUM(pr.price)']
  yValues[1] = data[0]['SUM(pr.price)'];
  displaychart(yValues)
})

function displaychart(array){
  if(array.length == "3"){
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
}
}

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
    document.getElementById("display-pro").insertAdjacentHTML('beforeend', '<tr><td>'+item.name+'</td><td>'+item.desc+'</td><td>'+item.price+'</td><td id="activead"><input type="file" name="createad" id="createad-'+item.id+'" style="display:none;" accept="image/png, image/jpeg"><label for="createad-'+item.id+'" class="btn-table" size="12" id="btn-ad">Create Ad</label></td><td><input type="number" id="coup-percent-'+item.id+'" min="1" max="100" size="10.5%" placeholder="enter %" style="border:1px solid #67acb4; border-radius: 3px; margin: 2px;"><input type="text" placeholder="Code" id="code-discount-'+item.id+'" size="10.5%" style=" border:1px solid #67acb4; border-radius: 3px; margin: 2px;"><button id="create-'+item.id+'" class="btn-table" width="12" id="btn-coupon">Create Coupon</button></td><td><button id="edit-'+item.id+'" class="editp btn-table" size="12">Edit Product</button></td></tr>')
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
    document.getElementById("create-"+item.id).addEventListener('click', (e) => {
      const perc = document.getElementById('coup-percent-'+e.target.id.split("-")[1]).value
      const code = document.getElementById('code-discount-'+e.target.id.split("-")[1]).value
      let discountform = new FormData()
      discountform.set('amount', perc)
      discountform.set('code', code)
      if(perc > 100 || perc < 1){
        return;
      } else if(!perc || !code){
        return;
      }
      axios.post('http://localhost/ecommerce-project/ecommerce-server/create_discounts.php', discountform)
    });
  })
  document.querySelectorAll(".editp").forEach((item)=>{
    item.addEventListener("click", (e) => {
      pid = e.target.id.split("-")[1]
      editproduct.style.display = 'block'
  
      createproduct.style.display = 'none'
      productsDiv.style.display = 'none'
      homeDiv.style.display = 'none'
      couponsDiv.style.display = 'none'
      adsDiv.style.display = 'none'
      chatDiv.style.display = 'none'
    })
  })
})



axios.post('http://localhost/ecommerce-project/ecommerce-server/seller_discounts.php', sid).then((newresp) => {
  const newrespdata = newresp.data
  if(newrespdata){
    newrespdata.forEach((ad)=> {
      couponsDiv.insertAdjacentHTML('beforeend', '<div class="cards-pr"><h1>'+ad.name+'</h1><h3>'+ad.code+'</h3><h5>'+ad.amount+'%</h5><div><img src="data:image/png;base64,'+ad.image+'" style="max-width: 100%; max-height: 100%;" alt=""></div><button class="btn-pr" id="coupon-delete-'+ad.id+'">Delete Coupon</button></div>')
      document.getElementById("coupon-delete-"+ad.id).addEventListener('click', function(){
        console.log("TBD")
      })
    })
  }
})

axios.post('http://localhost/ecommerce-project/ecommerce-server/get_categories.php').then((response) => {
  const data = response.data
  data.forEach((element) => {
    document.getElementById("display-cat").insertAdjacentHTML('beforeend', '<tr><td>'+element.name+'</td></tr>')
  })
})

let image;
document.getElementById("np-image").addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    image = reader.result.split(",")[1]
    console.log(reader.result)
  };
  reader.readAsDataURL(file);
});

document.getElementById("np-create").addEventListener('click', function(){
  let name = document.getElementById("np-name").value
  let desc = document.getElementById("np-desc").value
  let price = document.getElementById("np-price").value
  let catg = document.getElementById("np-catg").value
  if(name && desc && price && catg && image){
    let createproduct = new FormData()
    createproduct.set('seller_id', localStorage.getItem('userid'))
    createproduct.set('name', name)
    createproduct.set('price', price)
    createproduct.set('desc', desc)
    createproduct.set('categories_id', catg)
    createproduct.set('image', image)
    axios.post('http://localhost/ecommerce-project/ecommerce-server/create_products.php', createproduct).then((response) => {
      console.log(response)
    })
  }
  else{
    console.log("missing info")
  }
})

let imageupdate;
document.getElementById("e-image").addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    imageupdate = reader.result.split(",")[1]
  };
  reader.readAsDataURL(file);
});
document.getElementById("e-create").addEventListener('click', function(){
  let name = document.getElementById("e-name").value
  let desc = document.getElementById("e-desc").value
  let price = document.getElementById("e-price").value
  console.log(name, desc, price, imageupdate)
  if(name || desc || price || imageupdate){
    let editproducts = new FormData()
    editproducts.set('id', pid)
    editproducts.set('name', name)
    editproducts.set('price', price)
    editproducts.set('desc', desc)
    editproducts.set('image', imageupdate)
    axios.post('http://localhost/ecommerce-project/ecommerce-server/edit_products.php', editproducts).then((response) => {
      console.log(response)
    })
  }
  else{
    console.log("missing info")
  }
})

document.getElementById("create-new-category").addEventListener('click', function(){
  let newcat = document.getElementById("new-cat").value
  if(!newcat){return;}
  axios.post('http://localhost/ecommerce-project/ecommerce-server/create_categories.php?name='+newcat).then((response) => {
    const data = response.data
    console.log(data)
    if(!data.success){
      alert("Category already exists!")
    }else{
      document.getElementById("display-cat").insertAdjacentHTML('beforeend', '<tr><td>'+newcat+'</td></tr>')
    }
  })
})
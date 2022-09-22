let pPath = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
console.log(pPath)
if(pPath == "index.html"){
  mainpage()
}
else if(pPath == "signin.html"){
  login()
}

function checksignin(){
  if(!localStorage.getItem('userid')){
    alert("Sign in first!")
    return false;
  }
  return true;
}

function mainpage(){
  let slideIndex = 1;
  showDivs(slideIndex);

  function plusDivs(n) {
    showDivs(slideIndex += n);
  }

  function currentDiv(n) {
    showDivs(slideIndex = n);
  }

  function showDivs(n) {
    let i;
    let x = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" hero-white", "");
    }
    x[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " hero-white";
  }
  let seen;
  let count = 0;
  const loadmore = document.getElementById("loadmore");
  const getproducts = () => {
    const productsbox = document.getElementById("products-box");
    let productsbody = new FormData();
    productsbody.set('seen', seen);
    let newdata = (response) => {
      const data = response.data;
      count += data.length;
      for (item of data){
        if(!seen){
          seen = item.id;
        }
        else{
          seen += ", "+item.id;
        }
        productsbox.insertAdjacentHTML('beforeend', '<div id="p-'+ item.id +'" class="product"><a href=""><img src="data:image/png;base64,'+item.image+'"></a><div class="product-actions flex-display"><button class="header-btn white-btn add-to-favorites white-btn-wider" ><i class="fa fa-heart"></i></button><button class="header-btn white-btn add-to-wishlist white-btn-wider" ><i class="fa fa-plus-square" aria-hidden="true"></i></button><button class="header-btn white-btn add-to-cart white-btn-wider" ><i class="fa fa-cart-plus" aria-hidden="true"></i>Add to cart</button></div><h4>'+item.name+'</h4><h5>'+item.price+'$</h5></div>')
      }
      if(count >= data[0].product_count){
        loadmore.remove();
      }
      document.querySelectorAll(".add-to-favorites").forEach(button => {
        let productid = button.parentElement.parentElement.id.split("-")[1];
        button.addEventListener('click', function(){
          favwish(productid, 'favorite')
        });
      });
      document.querySelectorAll(".add-to-wishlist").forEach(button => {
        let productid = button.parentElement.parentElement.id.split("-")[1];
        button.addEventListener('click', function(){
          favwish(productid, 'wish')
        });
      });
      document.querySelectorAll(".add-to-cart").forEach(button => {
        let productid = button.parentElement.parentElement.id.split("-")[1];
        button.addEventListener('click', function(){
          atc(productid)
        });
      });
    }
    if(!seen){
      axios.post('http://localhost/ecommerce-project/ecommerce-server/get_products.php')
      .then((response) => {
        newdata(response)
      }, (error) => {
        console.log(error);
      });
    }
    else{
      axios.post('http://localhost/ecommerce-project/ecommerce-server/get_products.php', productsbody)
      .then((response) => {
        newdata(response)
      }, (error) => {
        console.log(error);
      });
    }
  }
  loadmore.addEventListener('click', getproducts)  
  getproducts();

  function favwish(productid, op){
    if(!checksignin()) return;
    let user = localStorage.getItem('userid');
    let favbody = new FormData();
    favbody.set('user', user);
    favbody.set('product', productid);
    favbody.set('op', op);
    axios.post('http://localhost/ecommerce-project/ecommerce-server/fav_wish_products.php', favbody)
  }

  function atc(productid){
    if(!checksignin()) return;
    let user = localStorage.getItem('userid');
    let atcbody = new FormData();
    atcbody.set('user', user);
    atcbody.set('product', productid);
    axios.post('http://localhost/ecommerce-project/ecommerce-server/add_to_cart.php', atcbody)
  }
}

function login(){


}
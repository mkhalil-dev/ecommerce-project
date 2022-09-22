var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
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

mainpage()
function mainpage(){
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
        productsbox.insertAdjacentHTML('beforeend', '<div class="product"><a href=""><img src="data:image/png;base64,'+item.image+'"></a><div class="product-actions flex-display"><button class="header-btn white-btn add-to-favorites white-btn-wider" ><i class="fa fa-heart"></i></button><button class="header-btn white-btn add-to-wishlist white-btn-wider" ><i class="fa fa-plus-square" aria-hidden="true"></i></button><button class="header-btn white-btn add-to-wishlist white-btn-wider" ><i class="fa fa-cart-plus" aria-hidden="true"></i>Add to cart</button></div><h4>'+item.name+'</h4><h5>'+item.price+'$</h5></div>')
      }
      if(count >= data[0].product_count){
        loadmore.remove();
      }
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

}
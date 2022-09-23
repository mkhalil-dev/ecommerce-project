let pPath = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
if(pPath == "index.html"){
  mainpage()
}
else if(pPath == "signin.html"){
  login()
}
else if(pPath == "signup.html"){
  signup()
}
else if(pPath == "resetreq.html"){
  resetreq()
}
else if(pPath == "resetpass.html"){
  resetpass()
}
else if(pPath == "product.html"){
  productpage()
}

function checksignin(){
  if(!localStorage.getItem('userid')){
    alert("Sign in first!")
    return false;
  }
  return true;
}

function mainpage(){
  displaycatg()
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
        productsbox.insertAdjacentHTML('beforeend', '<div id="p-'+ item.id +'" class="product"><a href=./product.html?='+item.id+'><img src="data:image/png;base64,'+item.image+'"></a><div class="product-actions flex-display"><button class="header-btn white-btn add-to-favorites white-btn-wider" ><i class="fa fa-heart"></i></button><button class="header-btn white-btn add-to-wishlist white-btn-wider" ><i class="fa fa-plus-square" aria-hidden="true"></i></button><button class="header-btn white-btn add-to-cart white-btn-wider" ><i class="fa fa-cart-plus" aria-hidden="true"></i>Add to cart</button></div><h4>'+item.name+'</h4><h5>'+item.price+'$</h5></div>')
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
  document.getElementById("signin").addEventListener('click', function (){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let loginbody = new FormData();
    let textbox = document.getElementById("resp");
    if(!email && !password){
      textbox.innerText = "Email and password cannot be empty"
      return;
    }
    else if(!email){
      textbox.innerText = "Email cannot be empty"
      return;
    }
    else if(!password){
      textbox.innerText = "Password cannot be empty"
      return;
    }
    loginbody.set('email', email);
    loginbody.set('password', password);
    axios.post('http://localhost/ecommerce-project/ecommerce-server/signin.php', loginbody)
    .then((response) => {
      if(response.data.success){
        textbox.innerText = "Logged In!"
        this.removeEventListener('click', arguments.callee);
        localStorage.setItem('userid', response.data.userid)
        setTimeout(()=>{
          window.location.href = "./index.html";
        },500)
      }
      else{
        textbox.innerText = "User and password combination are incorrect"
        return;
      }
    })
  })
}

function signup(){
  document.getElementById("signup").addEventListener('click', function (){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let cpassword = document.getElementById("confirm-password").value;
    let signupbody = new FormData();
    let textbox = document.getElementById("resp");
    if(!email && !password){
      textbox.innerText = "Email and password cannot be empty"
      return;
    }
    else if(!email){
      textbox.innerText = "Email cannot be empty"
      return;
    }
    else if(!password){
      textbox.innerText = "Password cannot be empty"
      return;
    }
    else if(!cpassword){
      textbox.innerText = "Please confirm your password"
      return;
    }
    else if(!fname){
      textbox.innerText = "Your first name is missing"
      return;
    }
    else if(!lname){
      textbox.innerText = "Your last name is missing"
      return;
    }
    else if(password != cpassword){
      textbox.innerText = "Your passwords do not match"
      return;
    }
    signupbody.set('email', email);
    signupbody.set('password', password);
    signupbody.set('fname', fname);
    signupbody.set('lname', lname);
    axios.post('http://localhost/ecommerce-project/ecommerce-server/signup.php', signupbody)
    .then((response) => {
      if(response.data.success){
        textbox.innerText = "Signed up!"
        this.removeEventListener('click', arguments.callee);
        localStorage.setItem('userid', response.data.userid)
        setTimeout(()=>{
          window.location.href = "./index.html";
        },500)
      }
      else{
        if(response.data.message == "email already exists"){
          textbox.innerText = "Email already exists!"
          return;
        }
      }
    })
  })
}

function resetreq(){
  document.getElementById("submit").addEventListener('click', function (){
    let email = document.getElementById("email").value;
    let textbox = document.getElementById("req");
    let resetpassbody = new FormData();
    resetpassbody.set('email', email)
    axios.post('http://localhost/ecommerce-project/ecommerce-server/reset_request.php', resetpassbody)
    .then((response) => {
      console.log(response)
      if(response.data.success){
        textbox.innerText = "Signed up!"
        this.removeEventListener('click', arguments.callee);
        localStorage.setItem('userid', response.data.userid)
      }
    })
  })
}

function resetpass(){
  let token = window.location.search.substring(1);
  document.getElementById("submit").addEventListener('click', function (){
    let password = document.getElementById("password").value;
    let resetpassbody = new FormData();
    resetpassbody.set('password', password)
    resetpassbody.set('token', token)
    axios.post('http://localhost/ecommerce-project/ecommerce-server/reset_password.php?', resetpassbody)
    .then((response) => {
        console.log(response)
    })
  })
}

function displaycatg(){
  axios.post('http://localhost/ecommerce-project/ecommerce-server/get_categories.php')
  .then((response) => {
    let data = response.data
    data.forEach((element) => {
      document.getElementById('catg').insertAdjacentHTML('beforeend', '<a href="#">'+element.name+'</a>')
    })
  })
}

function productpage(){
  displaycatg()
  let id = window.location.search.substring(1).split("=")[1];
  let productid = new FormData();
  productid.set('id', id)
  axios.post('http://localhost/ecommerce-project/ecommerce-server/get_product.php', productid).then((response) => {
    if(response.data.success){
      const data = response.data[0];
      image = "data:image/png;base64,"+data.image;
      document.getElementById('productimg').src= image;
      document.getElementById('name').innerText = data.name;
      document.getElementById('desc').innerText = data.desc;
      document.getElementById("price").innerText = data.price+"$";
      axios.post('http://localhost/ecommerce-project/ecommerce-server/add_view.php', productid)
    }else{
      document.getElementById('productdiv').innerHTML = "PRODUCT NOT FOUND";
    }
  })
}


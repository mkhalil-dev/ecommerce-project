let slideIndex = 1;

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
else if(pPath == "vouchers.html"){
  vouchers()
}
else if(pPath == "favorites.html"){
  favorites()
}
else if(pPath == "wishlist.html"){
  wishlist()
}

function checksignin(){
  if(!localStorage.getItem('userid')){
    return false;
  }
  return true;
}

function mainpage(){
  showDivs(slideIndex);
  displayname()
  displaycatg()
  let seen;
  let count = 0;
  const loadmore = document.getElementById("loadmore");
  const getproducts = () => {
    const productsbox = document.getElementById("products-box");
    let productsbody = new FormData();
    let catid = window.location.search.substring(1).split("=")[1];
    if(seen){
      productsbody.set('seen', seen);
    }
    if(catid){
      productsbody.set('catid', catid);
    }
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
      axios.post('http://localhost/ecommerce-project/ecommerce-server/get_products.php', productsbody)
      .then((response) => {
        newdata(response)
      }, (error) => {
        console.log(error);
      });
  }
  loadmore.addEventListener('click', getproducts)  
  getproducts();

  function atc(productid){
    if(!checksignin()) return;
    let user = localStorage.getItem('userid');
    let atcbody = new FormData();
    atcbody.set('id', user);
    atcbody.set('product', productid);
    axios.post('http://localhost/ecommerce-project/ecommerce-server/add_to_cart.php', atcbody)
  }
}

function signout(){
  localStorage.clear()
  window.location.reload();
}

function login(){
  displaycatg();
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
        localStorage.setItem('userid', response.data.userid);
        localStorage.setItem('fname', response.data.fname);
        localStorage.setItem('lname', response.data.lname);
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

function displayname(){
  if(localStorage.getItem('fname')){
    document.getElementById('signout').parentElement.href = ""
    document.getElementById('signout').addEventListener('click', signout)
    document.querySelector(".user-name").innerText = localStorage.getItem('fname') + " " + localStorage.getItem('lname')
  }
  else{
    document.getElementById('signout').innerHTML = '<i class="fa fa-sign-in" aria-hidden="true"></i>'
    document.getElementById('signout').parentElement.href = "./signin.html"
  }
}

function displaycatg(){
  axios.post('http://localhost/ecommerce-project/ecommerce-server/get_categories.php')
  .then((response) => {
    let data = response.data
    data.forEach((element) => {
      document.getElementById('catg').insertAdjacentHTML('beforeend', '<a href="./index.html?='+element.id+'">'+element.name+'</a>')
    })
  })
}

function productpage(){
  displayname()
  displaycatg()
  let id = window.location.search.substring(1).split("=")[1];
  let productid = new FormData();
  let qty = document.getElementById('qty').innerText;
  qty = parseInt(qty)
  document.getElementById("minus").addEventListener('click', function(){
    if(qty>1){
      qty -= 1;
      document.getElementById('qty').innerText = qty
    }
  })
  document.getElementById("plus").addEventListener('click', function(){
      qty += 1;
      document.getElementById('qty').innerText = qty
  })
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

  document.getElementById("atc").addEventListener('click', function(){
    if(checksignin()){
      let atc = new FormData();
      atc.set('id', localStorage.getItem('userid'))
      atc.set('product', id)
      atc.set('amount', qty)
      axios.post('http://localhost/ecommerce-project/ecommerce-server/add_to_cart.php', atc).then((response) => {
      })
    }
    else{
      console.log("sign in first")
    }
  })
}

function vouchers(){
  displaycatg()
  axios.get('http://localhost/ecommerce-project/ecommerce-server/get_vouchers.php?id='+localStorage.getItem('userid'))
  .then((response) => {
    let data = response.data
    if(data[0]){
      data.forEach((element) => {
        document.getElementById('vouchers').insertAdjacentHTML('beforeend', '<div class="item flex-display"><div class="item-img-name flex-display"><img src="data:image/png;base64,'+element.image+'" alt="" style="border: 0px;"><h3>'+element.name+'</h3></div><div class="item-qty-price flex-display"><h3>'+element.price+'$</h3><button id="r-'+element.id+'" class="header-btn wider-btn wider-btn-editted">Redeem</button><a href="?id='+element.id+'#popup2"><button class="header-btn wider-btn wider-btn-editted">Send voucher</button></a></div></div>')
      })
    }
    else{
      document.getElementById('vouchers').innerHTML = 'You dont have any Vouchers.'
    }
  })
  let sendbtn = document.getElementById('send')
  sendbtn.addEventListener('click', sendvoucher)
}

function sendvoucher(){
  let sendv = new FormData();
  let email = document.getElementById('email').value;
  let vid = window.location.search.substring(1).split("=")[1]
  sendv.set('id', localStorage.getItem('userid'))
  sendv.set('vid', vid)
  sendv.set('email', email)
  axios.post('http://localhost/ecommerce-project/ecommerce-server/send_voucher.php', sendv)
  .then((response) => {
    console.log(response)
  })
}

function favorites(){
  displaycatg()
  displayname()
  if(!checksignin()){
    document.getElementById('favorites').innerHTML = 'Sign in to view your favorites.'
    return;
  }
  axios.get('http://localhost/ecommerce-project/ecommerce-server/list_favorites.php?users_id='+localStorage.getItem('userid'))
  .then((response) => {
    let data = response.data
    if(data[0]){
      data.forEach((element) => {
        document.getElementById('favorites').insertAdjacentHTML('beforeend', '<div id="'+element.id+'" class="item flex-display"><div class="item-img-name flex-display"><img style="border: 0px;" src="data:image/png;base64,'+element.image+'" alt=""><h3>'+element.name+'</h3></div><div class="item-qty-price flex-display"><h3>'+element.price+'$</h3><button class="header-btn remove-fav"><i class="fa fa-trash" aria-hidden="true"> &nbsp Remove</i></button></div></div>')
      })
      document.querySelectorAll(".remove-fav").forEach(button => {
        let productid = button.parentElement.parentElement.id;
        button.addEventListener('click', function(){
          document.getElementById(productid).remove();
          favwish(productid, 'unfavorite')
          if(document.getElementById('favorites').childElementCount == 0){
            document.getElementById('favorites').innerHTML = 'You dont have any Favorites.'
          }
        });
      })
    }
    else{
      document.getElementById('favorites').innerHTML = 'You dont have any Favorites.'
    }
  })
}

function wishlist(){
  displaycatg()
  displayname()
  if(!checksignin()){
    document.getElementById('wishlist').innerHTML = 'Sign in to view your Wishlist.'
    return;
  }
  axios.get('http://localhost/ecommerce-project/ecommerce-server/list_wish.php?users_id='+localStorage.getItem('userid'))
  .then((response) => {
    let data = response.data
    if(data[0]){
      data.forEach((element) => {
        document.getElementById('wishlist').insertAdjacentHTML('beforeend', '<div id="'+element.id+'" class="item flex-display"><div class="item-img-name flex-display"><img style="border: 0px;" src="data:image/png;base64,'+element.image+'" alt=""><h3>'+element.name+'</h3></div><div class="item-qty-price flex-display"><h3>'+element.price+'$</h3><button><i class="fa fa-trash remove-wish" aria-hidden="true"></i></button><button class="header-btn wider-btn wider-btn-editted">Proceed to Checkout</button></div></div>')
      })
      document.querySelectorAll(".remove-wish").forEach(button => {
        let productid = button.parentElement.parentElement.parentElement.id;
        button.addEventListener('click', function(){
          document.getElementById(productid).remove();
          favwish(productid, 'unwish')
          if(document.getElementById('wishlist').childElementCount == 0){
            document.getElementById('wishlist').innerHTML = 'You dont have any items in the wishlist.'
          }
        });
      })
    }
    else{
      document.getElementById('wishlist').innerHTML = 'You dont have any items in the wishlist.'
    }
  })
}

function favwish(productid, op){
  if(!checksignin()) return;
  let user = localStorage.getItem('userid');
  let favbody = new FormData();
  favbody.set('user', user);
  favbody.set('product', productid);
  favbody.set('op', op);
  axios.post('http://localhost/ecommerce-project/ecommerce-server/fav_wish_products.php', favbody)
}
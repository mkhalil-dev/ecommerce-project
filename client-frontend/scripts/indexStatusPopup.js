/*console.log("status-popup");
let test = document.getElementById("test");
test.onclick(() => {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    console.log("function startedddddddddddddddddddddddddddddddd");
})
function statusPopup() {
    
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    console.log("function startedddddddddddddddddddddddddddddddd");
}*/
let statuspopup = document.getElementById("status-popup");
showPopUp();
function showPopUp(){
	statuspopup.style.display="block";
    setTimeout(ClosePopUp, 3000);
}
function ClosePopUp(){
	statuspopup.style.display="none";
}
/*setTimeout(ClosePopUp,120000)*/
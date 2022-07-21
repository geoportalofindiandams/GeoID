// Mobile Navbar Open and Close
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


// Sections
var li_elements = document.querySelectorAll(".navbar ul li");
var item_elements = document.querySelectorAll(".item");
for (var i = 0; i < li_elements.length; i++) {
  li_elements[i].addEventListener("click", function() {
    li_elements.forEach(function(li) {
      li.classList.remove("active");
    });
    this.classList.add("active");
    var li_value = this.getAttribute("data-li");
    item_elements.forEach(function(item) {
      item.style.display = "none";
    });
    if (li_value == "Home") {
      document.querySelector("." + li_value).style.display = "block";
    } else if (li_value == "About") {
      document.querySelector("." + li_value).style.display = "block";
    } else if (li_value == "Contact") {
      document.querySelector("." + li_value).style.display = "block";
    }else {
      console.log("");
    }
  });
}


// Footer Sections
var footer_elements = document.querySelectorAll(".footer ul li");
var footer_ele = document.querySelectorAll(".item");
for (var i = 0; i < footer_elements.length; i++) {
  footer_elements[i].addEventListener("click", function() {
    footer_elements.forEach(function(li) {
      li.classList.remove("active");
    });
    this.classList.add("active");
    var li_value = this.getAttribute("data-li");
    footer_ele.forEach(function(item) {
      item.style.display = "none";
    });
    if (li_value == "term-condition") {
      document.querySelector("." + li_value).style.display = "block";
    } else if (li_value == "privacy-policy") {
      document.querySelector("." + li_value).style.display = "block";
    }else if (li_value == "acknowledgement") {
      document.querySelector("." + li_value).style.display = "block";
    } else if (li_value == "Report") {
      document.querySelector("." + li_value).style.display = "block";
    }else {
      console.log("");
    }
  });
}


// Contact Form
const form = document.querySelector(".contact-form"),
statusTxt = form.querySelector(".button-area span");
form.onsubmit = (e)=>{
  e.preventDefault();
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sending your message...";
  form.classList.add("disabled");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "contact.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;
      if(response.indexOf("required") != -1 || response.indexOf("valid") != -1 || response.indexOf("failed") != -1){
        statusTxt.style.color = "red";
      }else{
        form.reset();
        setTimeout(()=>{
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}




// Report Risk Form
const form1 = document.querySelector(".report-form"),
statusTxt1 = form1.querySelector(".report-button-area span");
form1.onsubmit = (e)=>{
  e.preventDefault();
  statusTxt1.style.color = "#0D6EFD";
  statusTxt1.style.display = "block";
  statusTxt1.innerText = "Sending your message...";
  form1.classList.add("disabled");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "ReportRisk.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;
      if(response.indexOf("required") != -1 || response.indexOf("valid") != -1 || response.indexOf("failed") != -1){
        statusTxt1.style.color = "red";
      }else{
        form1.reset();
        setTimeout(()=>{
          statusTxt1.style.display = "none";
        }, 3000);
      }
      statusTxt1.innerText = response;
      form1.classList.remove("disabled");
    }
  }
  let formData = new FormData(form1);
  xhr.send(formData);
}




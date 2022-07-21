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
const contact_scriptURL = "https://script.google.com/macros/s/AKfycbzfjNNFlBIEPSfM8dejvnYdLMxW7RgEiCINq8Au0fu7Bzu5OdVPaUTPtWdsgXc5KRr-sA/exec";
const contactForm = document.forms['contactForm']
const contactMessage= document.getElementById("contact-success-message");

contactForm.addEventListener('submit', e => {
  e.preventDefault()
  fetch(contact_scriptURL, { method: 'POST', body: new FormData(contactForm)})
    .then(response => {
      contactMessage.innerHTML = "Your message has been sent."
      setTimeout(function(){
        contactMessage.innerHTML=""
      },3000)
      contactForm.reset()
    })
    .catch(error => console.error('Error!', error.message))
})



// Report Risk Form
const report_scriptURL = "https://script.google.com/macros/s/AKfycbzK8A7obE3yNsDs7981vn8D3f0o-LtfCHJsmOPQNSxztZl_EYdZGIAFgeDJ6Nv8wLuBfQ/exec";
const reportForm = document.forms['reportForm']
const reportMessage= document.getElementById("report-success-message");

reportForm.addEventListener('submit', e => {
  e.preventDefault()
  fetch(report_scriptURL, { method: 'POST', body: new FormData(reportForm)})
    .then(response => {
      reportMessage.innerHTML = "Your message has been sent."
      setTimeout(function(){
        reportMessage.innerHTML=""
      },3000)
      reportForm.reset()
    })
    .catch(error => console.error('Error!', error.message))
})
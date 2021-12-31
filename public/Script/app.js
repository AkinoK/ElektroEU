
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
  
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  
    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    }); 


// Validation for Contact form of Contact page 

"use strict";

var formValidity = true;

/* validate required fields */
function validateRequired() {
   var inputElements = document.querySelectorAll("#contact-form input, #contact-form textarea");
   var errorDiv = document.getElementById("error-message");
   var requiredValidity = true;
   var currentElement;
   try {
      for (var i = 0; i < inputElements.length; i++) 
      { 
         // validate all input elements in fieldset
         currentElement = inputElements[i];
         if (currentElement.value === "") 
         {
            currentElement.style.background = "rgb(255,233,233)";
            requiredValidity = false;
         } else {
            currentElement.style.background = "white";
         }
      }
      if (requiredValidity === false) { 
         throw "Please complete all fields.";
      } 
      errorDiv.style.display = "none";
      errorDiv.innerHTML = "";
   }
   catch(msg) {
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg; 
      formValidity = false;
   }
}

 // validate entered email
 function validateEmail() {
    var emailInput = document.getElementById("email");
    var errorDiv = document.getElementById("emailError");
    var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
    try {

       if (emailCheck.test(emailInput.value) === false) {
          throw "Please provide a valid email address";
       }
        // remove any email error styling and message
       emailInput.style.background = "";
       errorDiv.innerHTML = "";
       errorDiv.style.display = "none";
       // convert email address to lowercase
       emailInput.value = emailInput.value.toLowerCase();

    }
    catch(msg) {
       // display error message
       errorDiv.innerHTML = msg;
       errorDiv.style.display = "block";
       // change input style
       emailInput.style.background = "rgb(255,233,233)";
       formValidity = false;
    }
 }

 //validate form
 function validateForm(evt) 
 {
    if (evt.preventDefault) {
       evt.preventDefault(); // prevent form from submitting
    } else {
       evt.returnValue = false; // prevent form from submitting in IE8
    }
   formValidity = true; // reset value for revalidation
    validateRequired();
    validateEmail();

    if (formValidity === true) 
   {
      var inputElements = document.querySelectorAll("#contact-form input, #contact-form textarea"); //Capture user's inputs
      var inputs = [];
      for (var i = 0; i < inputElements.length; i++) {
         inputs.push(inputElements[i].value);
      }
      
      //Show user their inputs in a confirm window
      var r = confirm("Please confirm your inputs.\n\nYour Name: " + inputs[0] + "\nEmail:: " + inputs[1] + "\nSubjectl: " + inputs[2] + "\nMessage: " + inputs[3]);
      if(r==true){
         window.location = '/'; //Redireted to Home
      } else{
         //Stay in contact page
      }  
   }
 } 

 // Create EventListner
function createEventListeners() {
   //Validate fastname, email and message
    var register = document.getElementById("submit");
    if (register.addEventListener) {
       register.addEventListener("click", validateForm, false);
    } else if (register.attachEvent) {
       register.attachEvent("onclick", validateForm);
    }
   //Validate email
    var emailInput = document.getElementById("email");
    if (emailInput.addEventListener) {  
       emailInput.addEventListener("change", validateEmail, false); 
    } else if (provinceInput.attachEvent) {
       emailInput.attachEvent("onchange", validateEmail);
    }
    
 }
 
 //Run initial form configuration functions 
 function setUpPage() {
    createEventListeners();
 }
 
  if (window.addEventListener) {
     window.addEventListener("load", createEventListeners, false);
  } else if (window.attachEvent) {
     window.attachEvent("onload", createEventListeners);
  }



// İNPUT-GROUP İÇİN
const inputGrup = document.querySelectorAll('.input-group');
const fromDetails = document.querySelectorAll('.form-details ')
const fromLastChild = document.querySelectorAll('.input-group');
inputGrup.forEach(input =>{
    let childrenx = [...input.children]
    childrenx.forEach(childx =>{
        let islemYap = childx.className.includes('form-details')
        if(islemYap){
            fromDetails.forEach(formGroup =>{
                formGroup.style.width = '100%'
            })
        }
    })
    if (childrenx.length >= 2) { 
        childrenx[0].style.borderRadius = '10px 0px 0px 10px';
        childrenx[1].style.borderRadius = '0px'
        if(childrenx[2]){
          childrenx[2].style.borderRadius='0px'
        }
        if(childrenx[3]){
          childrenx[3].style.borderRadius='0px'
        }
        childrenx[childrenx.length-1].style.borderRadius = '0px 10px 10px 0px'
        
    }else{
        childrenx[0].style.borderRadius = '10px'
    }
});

// DROPDOWN İÇİN

const dropdownButtons = document.querySelectorAll('.dropdown-toggle');
dropdownButtons.forEach((dropdownButton) => {
  const dropdownContainer = dropdownButton.parentNode;
  const dropdownListContainer = dropdownContainer.querySelector('.dropdown-menu');
  const arrowIcon = dropdownContainer.querySelector('.dropdown-arrowicon svg path');
  const menuLinks = dropdownContainer.querySelectorAll('.dropdown-menu a');
 

  dropdownButton.addEventListener('click', function() {
    dropdownContainer.classList.toggle('open');
  });

  document.addEventListener('click', function(event) {
    if (!dropdownContainer.contains(event.target)) {
      dropdownContainer.classList.remove('open');
    }
  });


  dropdownListContainer.style.backgroundColor = getComputedStyle(dropdownButton).backgroundColor;

  

  menuLinks.forEach(link => {
    link.style.color = arrowIcon.getAttribute('fill');
  });
});

// SELECT İÇİN

const selectGroup = document.querySelectorAll('.select-group');
const formDetails = document.querySelectorAll('.form-details');

selectGroup.forEach(group => {
  const childrenx = [...group.children];
  
  if (childrenx.length >= 2) {
    childrenx[0].style.borderRadius = '10px 0px 0px 10px';
    childrenx[childrenx.length - 1].style.borderRadius = '0px 10px 10px 0px';
  } else {
    childrenx[0].style.borderRadius = '10px';
  }
  
  const select = group.querySelector('select');
  const button = group.querySelector('button');
  
  
  
  formDetails.forEach(form => {
    form.style.width = '100%';
  });
});

// --- SLIDER ---
  document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll(".slider-container");

    sliders.forEach((slider) => {
      const sliderContent = slider.querySelector(".slider-content");
      const arrows = slider.querySelectorAll(".arrow");
      const slides = slider.querySelectorAll(".slide");
      const slideWidth = slides[0].clientWidth;
      const totalSlides = slides.length;

      let currentPosition = 0;

      arrows.forEach((arrow) => {
        arrow.addEventListener("click", function () {
          const method = this.dataset.method;

          if (method === "prev") {
            currentPosition += slideWidth;
          } else if (method === "next") {
            currentPosition -= slideWidth;
          }

          // Sağa veya sola geçiş sırasında son slayta gelinip gelinmediğini kontrol ediyoruz
          if (currentPosition > 0) {
            currentPosition = -(totalSlides - 1) * slideWidth;
          } else if (currentPosition < -(totalSlides - 1) * slideWidth) {
            currentPosition = 0;
          }

          sliderContent.style.transform = `translateX(${currentPosition}px)`;
        });
      });
    });
  });
// --- SLIDER AUTOPLAY ---
document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".slider-container-auto");

  sliders.forEach((slider) => {
    const sliderContent = slider.querySelector(".slider-content");
    const arrows = slider.querySelectorAll(".arrow");
    const slides = slider.querySelectorAll(".slide");
    const slideWidth = slides[0].clientWidth;
    const totalSlides = slides.length;
    let currentPosition = 0;

    const autoplayEnabled = slider.getAttribute("data-autoplay") === "true"; // Otomatik oynatma özelliğini etkinleştirmek için slider'da 'data-autoplay' özelliğini kontrol ediyoruz

    let intervalId; // Otomatik oynatmayı durdurmak için kullanacağımız aralık kimliği

    // Çizgileri oluşturan ve güncelleyen fonksiyon
    function createDots() {
      const dotsContainer = slider.querySelector(".carousel-indicators");

      // Mevcut çizgileri kaldırıyoruz
      while (dotsContainer.firstChild) {
        dotsContainer.removeChild(dotsContainer.firstChild);
      }

      // Çizgileri oluşturuyoruz
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("li");
        dot.classList.add("dot");
        dot.dataset.slideTo = i;

        dot.addEventListener("click", function () {
          currentPosition = -i * slideWidth;
          sliderContent.style.transform = `translateX(${currentPosition}px)`;
          updateDots();
          stopAutoplay();
        });

        dotsContainer.appendChild(dot);
      }
    }

    // İlgili çizgiyi aktif hale getiren fonksiyon
    function updateDots() {
      const dots = slider.querySelectorAll(".dot");

      dots.forEach((dot, index) => {
        if (index === Math.abs(currentPosition) / slideWidth) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    // Bir sonraki slayda geçmek için kullanılan fonksiyon
    function moveToNextSlide() {
      currentPosition -= slideWidth;
      console.log(currentPosition)
      // Slaytların sonuna ulaşıp ulaşmadığımızı kontrol ediyoruz
      if (currentPosition < -(totalSlides - 1) * slideWidth) {
        currentPosition = 0;
      }

      sliderContent.style.transform = `translateX(${currentPosition}px)`;
      updateDots(); // Slayt değiştiğinde çizgileri güncelliyoruz
    }

    // Otomatik oynatmayı başlatmak için kullanılan fonksiyon
    function startAutoplay() {
      intervalId = setInterval(moveToNextSlide, 3000); // Otomatik oynatma aralığını (milisaniye cinsinden) ihtiyacınıza göre ayarlayabilirsiniz
    }

    // Otomatik oynatmayı durdurmak için kullanılan fonksiyon
    function stopAutoplay() {
      clearInterval(intervalId);
    }

    if (autoplayEnabled) {
      // Sayfa yüklendiğinde otomatik oynatmayı başlat
      startAutoplay();

      // Fare sliderın üzerine geldiğinde otomatik oynatmayı durdur
      slider.addEventListener("mouseenter", stopAutoplay);

      // Fare sliderın üzerinden çıktığında otomatik oynatmayı tekrar başlat
      slider.addEventListener("mouseleave", startAutoplay);
    }

    arrows.forEach((arrow) => {
      arrow.addEventListener("click", function () {
        stopAutoplay(); // Kullanıcı manuel olarak slaytı değiştirdiğinde otomatik oynatmayı durdur

        const method = this.dataset.method;

        if (method === "prev") {
          currentPosition += slideWidth;
        } else if (method === "next") {
          currentPosition -= slideWidth;
        }

        // Sağa veya sola geçiş sırasında son slayta gelinip gelinmediğini kontrol ediyoruz
        if (currentPosition > 0) {
          currentPosition = -(totalSlides - 1) * slideWidth;
        } else if (currentPosition < -(totalSlides - 1) * slideWidth) {
          currentPosition = 0;
        }

        sliderContent.style.transform = `translateX(${currentPosition}px)`;
        updateDots(); // Slayt değiştiğinde çizgileri güncelliyoruz

      });
    });

    // Sayfa yüklendiğinde çizgileri oluştur ve ilk çizgiyi aktif hale getir
    createDots();
    updateDots();
  });
});


// Login içi script
function togglePasswordVisibility() {
  var passwordInput = document.querySelector('input[name="password"]');
  var icon = document.getElementById("password-icon");
  
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    icon.innerHTML = "&#128275;";
  } else {
    passwordInput.type = "password";
    icon.innerHTML = "🔒";
  }
}
// ACCORDION YAPISI

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

/* ------ MODAL POPUP ------- */
document.addEventListener("DOMContentLoaded", function () {
  const btns = document.querySelectorAll("[data-target]");
  const popupTransitionDuration = 0.5; // Geçiş süresi (saniye cinsinden)

  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const targetId = btn.getAttribute("data-target");
      const popup = document.getElementById(targetId);

      const body = document.querySelector("body");

      if (popup.style.visibility === "visible") {
        popup.style.transform = "translate(-50%, -50%) scale(0.1)";
        popup.style.visibility = "hidden";
        body.style.backgroundColor = "";
      } else {
        // Diğer pop-up'ları kapat
        btns.forEach(function (otherBtn) {
          const otherTargetId = otherBtn.getAttribute("data-target");
          const otherPopup = document.getElementById(otherTargetId);
          if (otherPopup && otherPopup.style.visibility === "visible") {
            otherPopup.style.transform = "translate(-50%, -50%) scale(0.1)";
            otherPopup.style.visibility = "hidden";
          }
        });

        popup.style.transition = `transform ${popupTransitionDuration}s`;
        popup.style.visibility = "visible";
        popup.style.transform = "translate(-50%, -50%) scale(1)";
        body.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
      }
    });
  });
});




// NAVBAR 

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar");

  menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("active-nav");
  });

  // Menüyü kapatmak için herhangi bir yere tıklamada
  document.addEventListener("click", function (event) {
    if (!navbar.contains(event.target)) {
      navbar.classList.remove("active-nav");
    }
  });
});



// NAVBAR İÇİN
// Kullanacağım dom yapılarının çağırılması

const collapseItem = document.querySelector('.collapse-item')
const navbar = document.querySelector('.navbar-logo')
const menuBtn = document.querySelector('.collapse')
console.log()
if(navbar){
  let media = navbar.offsetWidth + collapseItem.offsetWidth +200 + navbar.parentElement.parentElement.offsetWidth-navbar.parentElement.offsetWidth
    if(media < 475){
        media = 475
    }
    // eleman sayısına göre bir media quary belirledik  ! Mediaquarylist
    const mediaQuery = window.matchMedia(`(max-width: ${media}px)`)
   
    
    
    // Belirlenen media quary'e göre navbar responsive fonksyonun oluşturulması
    function responsiveNav(e) {
        console.log(navbar.offsetWidth)
        if (e.matches) {
            collapseItem.classList.add('hidden-collapse')
            menuBtn.style.display='block'
        } else{
            collapseItem.classList.remove('hidden-collapse')
            menuBtn.style.display='none'
            if(collapseItem.classList.contains('active-2')){
                collapseItem.classList.remove('active-2')
            }
        }
    }   
    // fonksyonun çağırılması
    window.addEventListener('resize',function(){
        responsiveNav(mediaQuery) 
        
    })
    //  icona tıkladığımızda collapse yapısının görünür olması için active clasının eklenmesi
    menuBtn.addEventListener('click',function(){
        collapseItem.classList.toggle('active-2')
    })
    // Tıklanan yer eğer collapse menu yada icon değilse collapse kısmının tekrar kapanması için
    // composedPath bir dizi döndüyor tıkladığımız şeyden html e kadar
    document.addEventListener('click',(e)=>{
        if(
            !e.composedPath().includes(menuBtn) &&
            !e.composedPath().includes(collapseItem)){
            collapseItem.classList.remove('active-2')
        }
    })  
    // fonksyon sayfa ilk açıldığındada çağırılıyor
    responsiveNav(mediaQuery)
    
}
//OFFCANVAS NAVBAR-SİDEBAR
      function openNav() { document.getElementById("mySidenav").classList.add("open");}
        function closeNav() { document.getElementById("mySidenav").classList.remove("open");}
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

        if (autoplayEnabled) {
          startAutoplay(); // Manuel gezinti sonrası otomatik oynatmayı tekrar başlat
        }
      });
    });

    // Sayfa yüklendiğinde çizgileri oluştur ve ilk çizgiyi aktif hale getir
    createDots();
    updateDots();
  });
});


// ---- CAROUSEL1 ----
    const gap = 50;
    const carousel = document.getElementById("slider-carousel"),
      content = document.getElementById("slider-content"),
      next = document.getElementById("next"),
      prev = document.getElementById("prev");
    
    next.addEventListener("click", e => {
      carousel.scrollBy(width + gap, 0);
      if (carousel.scrollWidth !== 0) {
        prev.style.display = "flex";
      }
      if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
        next.style.display = "none";
      }
    });
    prev.addEventListener("click", e => {
      carousel.scrollBy(-(width + gap), 0);
      if (carousel.scrollLeft - width - gap <= 0) {
        prev.style.display = "none";
      }
      if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
        next.style.display = "flex";
      }
    });
    
    let width = carousel.offsetWidth;
    window.addEventListener("resize", e => (width = carousel.offsetWidth));



        // ----- CAROUSEL2 -----
  "use strict";
  var _slayt = document.getElementsByClassName("slides");
  var slaytSayisi = _slayt.length;
  var slaytNo = 0;
  var i = 0;

  slaytGoster(slaytNo);

  function nextSlide() {
    slaytNo++;
    slaytGoster(slaytNo);
  }

  function previousSlide() {
    slaytNo--;
    slaytGoster(slaytNo);
  }

  function slaytGoster(slaytNumarasi) {
    slaytNo = slaytNumarasi;

    if (slaytNumarasi >= slaytSayisi) slaytNo = 0;

    if (slaytNumarasi < 0) slaytNo = slaytSayisi - 1;

    for (i = 0; i < slaytSayisi; i++) {
      _slayt[i].style.display = "none";
    }

    _slayt[slaytNo].style.display="block";

}
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
//! DATA TARGET DENEMELERİ -SEARCH NAVBAR

document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-icon');
    const searchBtn = document.querySelector('.search-icon');
    const cancelBtn = document.querySelector('.cancel-icon');
  
    menuBtn.onclick = () => {
      const targetId = menuBtn.dataset.target;
      const targetElement = document.getElementById(targetId);
  
      targetElement.classList.toggle('active');
      menuBtn.classList.toggle('hide');
      searchBtn.classList.toggle('hide');
      cancelBtn.classList.toggle('show');
    };
  
    cancelBtn.onclick = () => {
      const targetId = cancelBtn.dataset.target;
      const targetElement = document.getElementById(targetId);
  
      targetElement.classList.remove('active');
      menuBtn.classList.remove('hide');
      searchBtn.classList.remove('hide');
      cancelBtn.classList.remove('show');
      targetElement.classList.remove('active');
      cancelBtn.style.color = 'primary';
    };
  
    searchBtn.onclick = () => {
      const targetId = searchBtn.dataset.target;
      const targetElement = document.getElementById(targetId);
  
      targetElement.classList.toggle('active');
      searchBtn.classList.toggle('hide');
      cancelBtn.classList.toggle('show');
    };
  });
  
/* ------ ---------------- ------- */
/* ------ Akordiyon Yapısı ------- */


const gizlibolumler = document.querySelectorAll(".accordion");

gizlibolumler.forEach((oge) => {
  oge.addEventListener("click", () => {
    const acik = document.querySelector(oge.dataset.target);
    const icon = document.querySelector(oge.dataset.icon);

    // .panel-active sınıfını toggle etmek için contains, remove ve add kullanımı
    if (acik.classList.contains("panel-active")) {
      acik.classList.remove("panel-active");
      // .rotate sınıfını 0.4 saniye sonra kaldır
      setTimeout(() => {
        icon.classList.remove("rotate");
      }, 75);
    } else {
      acik.classList.add("panel-active");
      icon.classList.add("rotate");
    }
  });
});

/* ------ -------------------- ------- */
/* ------ Akordiyon Yapısı SON ------- */

/* ------ MODAL POPUP ------- */
document.addEventListener("DOMContentLoaded", function () {
    const btns = document.querySelectorAll("[data-target]");
  
    // Tüm data-target ögelerine tıklama olayı ekle
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const targetId = btn.getAttribute("data-target");
        const popup = document.getElementById(targetId);
  
        // Body elementini seçelim
        const body = document.querySelector("body");
  
        if (popup.style.visibility === "visible") {
          popup.style.transform = "translate(-50%, -50%) scale(0.1)";
          popup.style.visibility = "hidden";
  
          // Popup kapandığında overlay'i kaldırarak arkaplanı eski haline getir
          body.style.backgroundColor = "transparent";
        } else {
          popup.style.visibility = "visible";
          popup.style.transform = "translate(-50%, -50%) scale(1)";
  
          // Popup açıldığında overlay'i ekleyerek arkaplanı yarı saydam karanlık yap
          body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        }
      });
    });
  });
// Window popup
  let window_url = document.getElementById('window-url')

document.getElementById('openButton').addEventListener('click', function () {

  window.open(window_url.innerHTML, 'YeniPencere', 'width=1920,height=1080');

}); 
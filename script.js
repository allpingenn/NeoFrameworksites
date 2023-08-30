// Cdn Links
const copyButtons = document.querySelectorAll(".fa-copy");

copyButtons.forEach(button => {
  button.addEventListener("click", function() {
    // Tıklanan düğmenin içindeki <code> öğesinin içeriğini al
    const codeContent = this.parentElement.querySelector("code").textContent;

    // Geçici bir input oluştur, kopyalanacak bağlantıyı içine koy
    const tempInput = document.createElement("input");
    tempInput.value = codeContent;
    document.body.appendChild(tempInput);

    // Input içeriğini seç ve kopyala
    tempInput.select();
    document.execCommand("copy");

    // Geçici input'u kaldır
    document.body.removeChild(tempInput);

    // Kullanıcıya bağlantının kopyalandığına dair bildirim ver
    alert("Bağlantı kopyalandı: " + codeContent);
  });
});

// DARK MODE 

const modeButton = document.getElementById("modeButton");
  const modeSwitch = document.getElementById("modeSwitch");
  const modeIconLight = document.querySelector(".mode-icon-light");

  // Sayfa yüklendiğinde varsayılan olarak light mode'u aktif etmek için
  modeSwitch.checked = false;
  handleModeChange();

  modeButton.addEventListener("click", () => {
    modeSwitch.checked = !modeSwitch.checked;
    handleModeChange();
  });

  modeSwitch.addEventListener("change", handleModeChange);

  function handleModeChange() {
    document.body.classList.toggle("dark-mode", modeSwitch.checked);
    document.body.classList.toggle("light-mode", !modeSwitch.checked);

    if (modeSwitch.checked) {
      modeIconLight.style.opacity = "1";
    } else {
      modeIconLight.style.opacity = "0";
    }
  }


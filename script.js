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

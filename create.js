document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('cardform').addEventListener('submit', function (e) {
    e.preventDefault();


    const authorName = document.getElementById('authorName').value;
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const authorImageFile = document.getElementById('authorImageFile').files[0];
    const productImageFile = document.getElementById('productImageFile').files[0];
    const productDescription = document.getElementById('productDescription').value.trim();

    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = function (e1) {
      const authorImageSrc = e1.target.result;

      reader2.onload = function (e2) {
        const productImageSrc = e2.target.result;

        const cardData = {
          authorName,
          productName,
          productPrice,
          authorImageSrc,
          productImageSrc,
          productDescription,
        };


        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards.push(cardData);
        localStorage.setItem('cards', JSON.stringify(cards));

        
        window.location.href = '../index.html';
      };

      reader2.readAsDataURL(productImageFile);
    };

    reader1.readAsDataURL(authorImageFile);
  });

});
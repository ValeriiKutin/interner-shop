"use strict"

// Показываем попап
$('.cart-addons__item-btn_gravirovka').click(function(){

  // Если на кнопке не выводится тип гравировки, то показываем попап
  if ( !$(this).hasClass('cart-addons__item-btn_selected') ) {

    if (window.matchMedia("(max-width: 760px)").matches) {
      GravirovkaPopupShowCentered(false);
    } else {
      GravirovkaPopupShowCentered(true);
    }

  } else {
    // Иначе просто возвращаем кнопку в исходное состояние
    $(this).removeClass('cart-addons__item-btn_selected').text( $(this).data('not-selected') );
  }

});


  function GravirovkaPopupShowCentered(isCentered) {
    let blackBg = document.getElementsByClassName('black-overlay-4')[0];
    blackBg.style.display = 'block';

    let popup = document.getElementsByClassName('gravirovka')[0];
    popup.style.display = 'block';

    if ( isCentered == true ) {
      let popupWidth = popup.offsetWidth;
      let popupHeight = popup.offsetHeight;

      // Устанавливаем попап по центру экрана
      popup.style.left = `calc(50% - ${popupWidth/2}px)`;
      popup.style.top = `calc(50% - ${popupHeight/2}px)`;
    }

    popup.style.opacity = 1;
  }



// Закрываем попап
$('.gravirovka__close, .black-overlay-4').click(function(){
  gravirovkaPopupClose();
});



  function gravirovkaPopupClose(){

    let blackBg = document.getElementsByClassName('black-overlay-4')[0];
    blackBg.style.display = 'none';

    let popup = document.getElementsByClassName('gravirovka')[0];
    popup.style.display = 'none';

  }


// Проверка поля индивидуальной гравировки на заполнение при смене фокуса
$('.gravirovka__input').on('blur', function(){

  if ( $(this).val().length > 0 ) {
    $(this).next().addClass('gravirovka__placeholder_filled');
  } else {
    $(this).next().removeClass('gravirovka__placeholder_filled');
  }

});

// Очищаем поле при клике
$('.gravirovka__input').on('focus', function(){
  $(this).removeClass('gravirovka__input_error')
    .val('')
    .next()
    .removeClass('gravirovka__placeholder_filled');

});


// Проверка поля индивидуальной гравировки при клике по кнопке ДОБАВИТЬ
$('.gravirovka__btn-individ').click(function(){

  let individText = $('.gravirovka__input').val();

  // Если поле заполнено, то закрываем попап и выводим тип гравировки на кнопке
  if ( individText.length > 0 && !$('.gravirovka__input').hasClass('gravirovka__input_error') ) {
    gravirovkaPopupClose();

    let selectedText =  '<img src="img/icon-checked-black.svg" width="11" height="11" alt="">' + $('.cart-addons__item-btn_gravirovka').data('selected');
    $('.cart-addons__item-btn_gravirovka').addClass('cart-addons__item-btn_selected').html(selectedText + 'индивидуальная');

  } else {
    // Если поле не заполнено, то выводим ошибку и выделяем красным
    $('.gravirovka__input').addClass('gravirovka__input_error')
    .val('Обязательное поле')
    .next()
    .addClass('gravirovka__placeholder_filled');
  }

});


// Закрываем попап при клике на кнопку шаблонной гравировки и выводим тип гравировки на кнопке
$('.gravirovka__btn-shablon').click(function(){

  let individText = $(this).text();

  gravirovkaPopupClose();

  let selectedText =  '<img src="img/icon-checked-black.svg" width="11" height="11" alt="">' + $('.cart-addons__item-btn_gravirovka').data('selected');
  $('.cart-addons__item-btn_gravirovka').addClass('cart-addons__item-btn_selected').html(selectedText + 'шаблонная');


});




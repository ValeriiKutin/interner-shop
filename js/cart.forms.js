// Проверка поля на заполнение и вывод названий полей для INPUT
$('.cart-order__input').on('blur', CartInputsCheck);

function CartInputsCheck(){
  if ( $(this).val().length > 0 ) {
    $(this).next().addClass('cart-order__placeholder_filled');
  } else if ( $(this).prop('required') == true ) {
    $(this).addClass('cart-order__input_error')
    .val('Обязательное поле')
    .next()
    .addClass('cart-order__placeholder_filled');
  } else {
    $(this).removeClass('cart-order__placeholder_filled');
  }
}

// Удаляем красное выделение поля при клике по нему
$('.cart-order__input').on('focus', function(){
  $(this).removeClass('cart-order__input_error');

  if ( $(this).val() == 'Обязательное поле' ) {
    $(this).val('');
  }

});


// Если поля заполнены при загрузке страницы (например, нажата кнопка Назад)
// то применяем стили к полям
window.onload = function(){

  $('.cart-order__input').each(function(){

    if ( $(this).val().length > 0 ) {
      $(this).next().addClass('cart-order__placeholder_filled');
    }

    if ( $(this).val() == 'Обязательное поле'  ) {
      $(this).addClass('cart-order__input_error');
    }

  });

};



// Проверка поля на заполнение и вывод названий полей для SELECT
$('.cart-order__select:required').on('blur', CartSelectsCheck);


function CartSelectsCheck(){
  if ( $(this).val().length > 0 ) {
    $(this).next().addClass('cart-order__placeholder_filled');
  } else {
    $(this).next().addClass('cart-order__placeholder_filled');
    $(this).addClass('cart-order__input_error')
    .children('#empty-select')
    .prop('selected', true)
    .text('Обязательное поле');
  }
}


// Удаляем красное выделение поля при клике по нему
$('.cart-order__select:required').on('focus', function(){
  $(this).removeClass('cart-order__input_error')
  .children('#empty-select')
  .prop('selected', false)
  .text('');
});


$('.cart-order__btn').click(function(){

  $('.cart-order__input:required').each(CartInputsCheck); // Проверяем поля на заполненность
  $('.cart-order__select:required').each(CartSelectsCheck); // Проверяем поля на заполненность

  $("html, body").animate({ scrollTop: $('.cart-order__input_error, .cart-order__select_error').offset().top + -100 }, 300);
});





  // Перекидываем блок с заказанными товарами в левую или правую колонку
  $( document ).ready(function(){
    CartBlockMove();
  });

  // Вызываем функцию с задержкой 500мс при изменении окна браузера
  // Чтобы не вызвать ее сто раз во время изменения окна браузера
  var resizeId;
  window.addEventListener('resize', function() {
      clearTimeout(resizeId);
      resizeId = setTimeout(doneResizing, 500);
  });

  function doneResizing(){
      CartBlockMove();
  }


  //Функция переброски блока корзины в зависимости от разрешения устройства
  function CartBlockMove() {

      if (window.matchMedia('(max-width: 992px)').matches) {

        //Если блок в правой колонке, то перемещаем его в левую колонку
        if ($('.cart-order__wrap-1 > .cart-order__wrap-3').length) {
        $('.cart-order__wrap-3').detach().insertBefore( '#order-step-5' ) ;
        }
      }
      if (window.matchMedia('(min-width: 993px)').matches) {

    //Если блок внутри левой колонки, то перемещаем его в правую колонку
        if ($('.cart-order__wrap-2 > .cart-order__wrap-3').length) {
          $('.cart-order__wrap-3').detach().insertAfter( '.cart-order__wrap-2' ) ;
        }
      }
  }


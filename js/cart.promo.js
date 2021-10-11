"use strict"


// Показываем/скрываем поле ввода промо кода

$('.cart-stats__promo-cancel, #promo-link').click(function(e){
  e.preventDefault();

  if ( $('.cart-stats__promo-row').css('display') == 'table-row' ){
    $('.cart-stats__promo-row').hide('fast');
    $('#promo-input').val('');
    $('.cart-stats__arrow-down').removeClass('cart-stats__arrow-down_up');
  } else {
    $('.cart-stats__promo-row').show('fast');
    $('.cart-stats__arrow-down').addClass('cart-stats__arrow-down_up');
  }

});


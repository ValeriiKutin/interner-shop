"use strict"


// Переключение вкладок товарных карточек

$('.prices__menu-item').click(function(){

  // Если нажата неактивная категория
  if ( !$(this).hasClass('prices__menu-item_active') ) {
    $('.prices__menu-item_active').removeClass('prices__menu-item_active');
    $(this).addClass('prices__menu-item_active');

    // ЗАпоминаем название неактивной категории
    let catName = $(this).data('category');

    // Прячем активную категорию (она не имеет класса  .prices__wrapper_hidden)
    $('.prices__wrapper').not('.prices__wrapper_hidden').addClass('prices__wrapper_hidden');
    // Показываем нужную нам категорию
    $('.prices__wrapper[data-category="' + catName + '"]').removeClass('prices__wrapper_hidden');

  }
});
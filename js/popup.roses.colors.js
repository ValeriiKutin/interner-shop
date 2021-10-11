"use strict";

$('.product__colors').on('click', function(){

  // вычисляем высоту и ширину окна
  let viewportHeight = window.innerHeight,
      viewportWidth = window.innerWidth;

  let heightRatio = 0.55, // коэффициенты по умолчанию
      widthRatio  = 0.9;

  let popupHeight = 0,
      popupWidth  = 0;

  let leftCoord = 0,
      topCoord  = 0;

  function showPopupCentered() {

    // Вычисляем координаты, чтобы разместить попап по центру
    leftCoord = 'calc(50% - ' + popupWidth/2 +'px)',
    topCoord = 'calc(50% - ' + popupHeight/2 +'px)';

    $('.black-overlay-3').show();
    $('.colors').css( {'width':popupWidth, 'height':popupHeight,'left':leftCoord, 'top':topCoord} ).show();
  }

  // Выбираем какой % от высоты экрана займет попап при альбомной ориентации экрана
  if (window.matchMedia("(orientation: landscape)").matches) {
    //alert('Альбомная');

    if (window.matchMedia("(max-width: 1600px)").matches) {
      heightRatio = 0.6;
    }
    if (window.matchMedia("(max-width: 992px)").matches) {
      heightRatio = 0.75;
    }
    if (window.matchMedia("(max-width: 760px)").matches) {
      heightRatio = 0.75;
    }

    viewportHeight = window.innerHeight;

    // Задаем высоту и ширину попапа
    popupHeight = heightRatio*viewportHeight,
    popupWidth  = 1.95*popupHeight;

    showPopupCentered();

  }

  // Выбираем какой % от высоты экрана займет попап при портретной ориентации экрана
  if (window.matchMedia("(orientation: portrait)").matches) {

    //alert('Портретная');

      viewportWidth = window.innerWidth;

    if (window.matchMedia("(min-width: 993px)").matches) {

      // Задаем высоту и ширину попапа
      popupWidth = widthRatio*viewportWidth,
      popupHeight  = popupWidth / 1.95;

      showPopupCentered();

    }

    if (window.matchMedia("(max-width: 992px)").matches) {
      widthRatio  = 1;

      // Задаем высоту и ширину попапа
      popupWidth = widthRatio*viewportWidth,
      popupHeight  = 'auto';

      // Вычисляем координаты, чтобы разместить попап по центру
      leftCoord = 'calc(50% - ' + popupWidth/2 +'px)',
      topCoord = 'calc(50% - ' + popupHeight/2 +'px)';

      $('.black-overlay-3').show();
      // Показываем попап
      $('.colors')
      .css( {'width':popupWidth, 'height':popupHeight,'left':0, 'right':0, top:'auto', 'bottom':0} )
      .show();

      // Плагин тач скролла бутонов
      $('.colors__inner-3').kinetic(
        {   y:false,
            filterTarget: function(target, e){

              if (!/down|start/.test(e.type)){
                  return !(/img/i.test(target.tagName));
              }
            }
        }
      );

    }
  }
});


// Показ большого фото розы при кликах на бутоны
$('.colors__item').click(function(){
  let newPhoto = 'img/roses/colors/' +  $(this).data('image-url');
  $('.colors__photo').attr('src',newPhoto);
  $('.colors__photo-title-color').text( $(this).data('color') );
});


//закрываем попап выбора цветов при клике по фону или крестику
$('.black-overlay-3, .colors__close').click(function(){
    $('.colors__inner-3').kinetic('start', { velocity: -1000 }); // Перематываем бутоны в начало перед закрытием попапа
    $('.colors__inner-3').kinetic('stop');
    $('.colors__item:first-child').click(); // При закрытии переключаем бутон на красный цвет

  // закрываем попап через 200 мс (когда бутоны перемотаются в начало)
  setTimeout(function(){
    $('.black-overlay-3').hide();
    $('.colors').hide();
  }, 100);
});


{ // Закрываем попап с выбором цветов, при свайпе вниз

  let myElement = document.getElementById('swipeBlock');

  let mc = new Hammer(myElement);

  //enable all directions
  mc.get('swipe').set({
    direction: Hammer.DIRECTION_ALL,
    threshold: 10,
    velocity: 0.5
  });

  mc.on("swipedown", function(ev) {

    $('.colors__inner-3').kinetic('start', { velocity: -1000 }); // Перематываем бутоны в начало перед закрытием попапа
    $('.colors__inner-3').kinetic('stop');
    $('.colors__item:first-child').click(); // При закрытии переключаем бутон на красный цвет

    // закрываем попап через 200 мс (когда бутоны перемотаются в начало)
    setTimeout(function(){
      $('.black-overlay-3').hide();
      $('.colors').slideUp('fast');
    }, 100);

    $('.h1').click();

  });

}


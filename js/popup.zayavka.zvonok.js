"use strict"

// СКРИПТ ОТПРАВКИ ФОРМЫ

// Функция запрещает вводить символы согласно установленному фильтру.
//<Начало>
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.oldValue = "";
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}

// Разрешаем только цифры в поле номер телефона
setInputFilter(document.getElementById("user-phone"), function(value) {
  return /^\d*$/.test(value);
});
// <Конец>



// Проверка поля на заполнение и вывод названий полей для INPUT
$('.order__input:required').on('blur', OrderInputsCheck);

function OrderInputsCheck(){
  if ( $(this).val().length > 0 ) {
    $(this).next().addClass('order__placeholder_filled');
  } else {
    $(this).addClass('order__input_error')
    .val('Обязательное поле')
    .next()
    .addClass('order__placeholder_filled');
  }
}

// Удаляем красное выделение поля при клике по нему
$('.order__input:required').on('focus', function(){
  $(this).removeClass('order__input_error')
  .val('');
});






// НАЧАЛО Проверка заполнения полей при клике на кнопку
$('.order__btn').click(function(e){

  e.preventDefault();

  $('.order__input:required').each(OrderInputsCheck); // Проверяем заполнены поля или нет

  let inputsErrors = 0;

  $('.order__input:required').each(function(){

    if ( $(this).hasClass('order__input_error') == true ) {
      inputsErrors += 1; // Если в поле добавен класс ошибки, то увеличиваем счетчик ошибок
    }

  });

  // Если ошибок нет, то отправляем форму
  if ( inputsErrors === 0 ) {

    sendToSenler();

    // Выбираем из всех полей на странице только поля с номером формы
    var user_name    = $('#user-name').val();
    var user_phone = $('#user-phone').val();
    // отправляем данные
    $.ajax({
        url: "/php-mailer-395.php", // куда отправляем
        type: "post", // метод передачи
        dataType: "json", // тип передачи данных
        data: { // что отправляем
            "user_name":    user_name,
            "user_phone": user_phone
        },
        // после получения ответа сервера
        success: function(data){
            //document.location.href = 'https://vk.cc/a9l9hb';
            $('.order__form-wrap').hide();
            $('.order__footer').css({'display':'block'});
            $('.order__success').css({'display':'flex'});
            $('.order__notice').show();
            popupTimer();
        }
    });



  }

});
//КОНЕЦ



// Функция таймера в футере попапа заявки на звонок
function popupTimer(){

  var counter = 5;
  var interval = setInterval(function() {
      counter--;
      $('.order__seconds').text(counter);
      if (counter == 0) {
          // Display a login box
          clearInterval(interval);
          popupClose(); // закрываем попап
          $('.order__footer').hide(); // прячем уведомление что попап закроется через 5 сек

      }
  }, 1000);

}


// Скрипт показа попапа заявки на звонок
  // показываем попап заявки на звонок
  $('.callback, .product__btn').click(function(){
    $('.black-overlay-2').show();
    $('.order').css({'display':'flex'});
  });


  //закрываем попап заявки на звонок
  function popupClose(){
    $('.order').hide();
    $('.black-overlay-2').hide();
  }

  $('.black-overlay-2, .order__close, .order__close-mobile').click(function(){
    popupClose(); // Прячем попап с телефоном
  });


{ // Закрываем попап с заявки на звонок при свайпе вниз

  let myElement = document.getElementById('orderPopup');

  let mc = new Hammer(myElement);

  //enable all directions
  mc.get('swipe').set({
    direction: Hammer.DIRECTION_ALL,
    threshold: 10,
    velocity:0.5
  });


  mc.on("swipedown", function(ev) {
    $('.black-overlay-2').hide();
    $('.order').slideUp('fast');
  });

}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


// КОПИРУЕТЕ НА СТРАНИЦУ КУДА ПОЛЬЗОВАТЕЛЬ ЗАХОДИТ (?vkuid=......)
var vkuid = getUrlParam("vkuid", 0);
if (vkuid != 0) {
    setCookie("vkuid", vkuid, 100);
    // Можно убрать
    //console.log('Set cookie');
}


// Можно вызвать где угодно.
function sendToSenler() {
    // Можно убрать
    //console.log('Try send to senler' );

    var Http = new XMLHttpRequest();
    // Прописать полный путь к sender.php
    var url = 'https://rozzettaopt.ru/senler.php';
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(Http.responseText)
        }
    }
}

$('.slider').slick({
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 1500,
    infinite: true
  });
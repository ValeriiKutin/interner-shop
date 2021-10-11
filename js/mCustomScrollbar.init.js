//Функция добавляет класс и инициирует плагин скролла если мобильная версия
function addHorizScroll() {

    if (window.matchMedia('(max-width: 760px)').matches) {

        $(".prices__menu").addClass("mCustomScrollbar"); //Класс стилей горизонтального скролла
        $(".prices__menu").mCustomScrollbar({
            axis:"x",
            theme:"light-2",
            contentTouchScroll: 25,
            autoHideScrollbar: true,
            scrollbarPosition: "outside",
            advanced:{autoExpandHorizontalScroll:true}
        });
    }
}

//Добавляем/удаляем горизонтальный скролл при изменении окна браузера
$(document).ready(addHorizScroll());
$(window).resize(function(){
    addHorizScroll();
    if (window.matchMedia('(min-width: 761px)').matches) {
        $(".prices__menu").mCustomScrollbar("destroy"); //Удаляем горизонтальный скролл
    }
});

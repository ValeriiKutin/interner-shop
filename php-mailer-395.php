<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);


$msg_box = ""; // в этой переменной будем хранить сообщения формы
$errors = array(); // контейнер для ошибок
// проверяем корректность полей
if($_POST['user_name'] == "")    $errors[] = "Поле \"Ваше имя\" не заполнено!";
//if($_POST['user_email'] == "")   $errors[] = "Поле \"Телефон\" не заполнено!";
if($_POST['user_phone'] == "") $errors[] = "Поле \"Телефон\" не заполнено!";

// если форма без ошибок
if(empty($errors)){
    // собираем данные из формы
    $message  = "Имя клиента: " . $_POST['user_name'] . "<br/>";
    //$message .= "E-mail пользователя: " . $_POST['user_email'] . "<br/>";
    $message .= "Номер телефона: " . $_POST['user_phone'];
    send_mail($message); // отправим письмо
    // выведем сообщение об успехе
    $msg_box = "Спасибо! Сообщение успешно отправлено.";
}else{
    // если были ошибки, то выводим их
    $msg_box = "";
    foreach($errors as $one_error){
        $msg_box .= "<span style='color: red;'>$one_error</span><br/>";
    }
}

// делаем ответ на клиентскую часть в формате JSON
echo json_encode(array(
    'result' => $msg_box
));


// функция отправки письма
function send_mail($message){
    // почта, на которую придет письмо
    $mail_to = "rozzettaopt@yandex.ru";
    // тема письма
    $subject = "[RozzettaOpt.Ru]: Заявка на звонок";

    // заголовок письма
    $headers= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
    $headers .= "From: rozzettaopt.ru <admin@rozzettaopt.ru>\r\n"; // от кого письмо

    // отправляем письмо
    mail($mail_to, $subject, $message, $headers);
}


?>
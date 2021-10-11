<?php


/**
 * @param $secret_key - секретный ключ
 * @param $group_id - числовой идентификатор сообщества ВКонтакте
 * @param $user_id - идентификатор пользователя ВКонтакте
 * @param int $subscription_id - идентификатор группы подписчиков (по умолчанию 0 - без группы)
 */
function sendContact($secret_key, $group_id, $user_id, $subscription_id = 0)
{
    $params = [
        "vk_group_id" => $group_id,
        "vk_user_id" => $user_id,
        "subscription_id" => $subscription_id
    ];
    $values = "";
    foreach ($params as $value) {
        $values .= (is_array($value) ? implode("", $value) : $value);
    }
    $hash = md5($values . $secret_key);
    $params['hash'] = $hash;
    $url = "https://senler.ru/api/subscribers/add?V=1.0&HASH=$hash";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}

// Проверяем есть ли куки и отправляем запрос
if (isset($_COOKIE["vkuid"])) {
    echo $_COOKIE['vkuid'];
    $response = sendContact("9b4476cccf10f7991b72cacb8c3637058bbaf2fe", 189718505, $_COOKIE["vkuid"], 572504);
    // ВЫВОДИМ ОТВЕТ ОТ АПИ. Можно убрать строчку
    echo $response;
} else {
    echo "No vkuid";
}
?>
<?php
if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
 $otvet = json_encode(
 array(
 'text' => 'Возникла ошибка при отправке данных'
 ));
 die($otvet);
 } 

 if(!isset($_POST["name"]) || !isset($_POST["mail"]) || !isset($_POST["sub"]) || !isset($_POST["message"]))
 {
 $otvet = json_encode(array('type'=>'error', 'text' => 'Заполните форму полностью'));
 die($otvet);
 }
 $user_name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
 $user_mail = filter_var($_POST["mail"], FILTER_SANITIZE_STRING);
 $user_sub = filter_var($_POST["sub"], FILTER_SANITIZE_STRING);
 $user_mes = filter_var($_POST["message"], FILTER_SANITIZE_STRING);
 
$user_name = $_POST["name"];
$user_mail = $_POST["mail"];
$user_sub = $_POST["sub"];
$user_mes = $_POST["message"];
$user_name = htmlspecialchars($user_name);
$user_mail = htmlspecialchars($user_mail);
$user_sub = htmlspecialchars($user_sub);
$user_mes = htmlspecialchars($user_mes);
 $mysqli = new mysqli('localhost', 'root', '', 'project_cote');
 $mysqli->query("INSERT INTO `message`(`id`,`user`,`user_mail`,`user_sub`,`user_message`) VALUES (NULL,'$user_name','$user_mail','$user_sub','$user_mes')");
 mail("alex30031998@yandex.ru", "Сообщение с сайта «CoTe»", 
 "Имя:".$user_name.". E-mail: ".$user_mail.". Тема: ".$user_sub.". Сообщение: ".$user_mes,'Content-type: text/plain; charset=utf-8');
 $otvet = json_encode(array('text' => 'Успешно!'));
 die($otvet);
?>
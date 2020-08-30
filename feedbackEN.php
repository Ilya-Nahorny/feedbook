<?php
 
/* https://api.telegram.org/botXXXXXXXXXXXXXXXXXXXXXXX/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */
 
//Переменная $name,$phone, $message получает данные при помощи метода POST из формы
$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$message = $_POST['user_message'];
 
//в переменную $token нужно вставить токен, который нам прислал @botFather
$token = "961070329:AAEth57wyTqQ6U2Lxi6EGRQ56qz2EeXywcA";
 
//нужна вставить chat_id (Как получить chad id, читайте ниже)
$chat_id = "-468099402";
 
//Далее создаем переменную, в которую помещаем PHP массив
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone,
  'Сообщение' => $message
);
 
//При помощи цикла перебираем массив и помещаем переменную $txt текст из массива $arr
foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};
 
//Осуществляется отправка данных в переменной $sendToTelegram
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
 
//Если сообщение отправлено, напишет "Thank you", если нет - "Error"
if ($sendToTelegram) {
  echo  <<<HTML
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@500;700&display=swap');
    body{
        display:flex;
        justify-content:center;
        align-items:center;
        background-image:url('img/bg.jpg');
        background-size:cover;
        background-repeat:no-repeat;
        font-family:'Source Sans Pro', sans-serif;
      }
      .modal {
        padding: 40px;
        min-width:500px;
        max-width:1200px;
        height:300px;
        background-color:rgba(0, 0, 0, 0.7);
        border-top:1px solid white;
        border-bottom:1px solid white;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-around;
      }
      .thanks{
        font-size:60px;
        color:white;
        text-align:center;
        line-height:200px;
      }
      .backBtn{
        display:block;
        width:400px;
        height:40px;
        color: white;
        text-decoration:none;
        font-size:30px;
        padding:20px;
        font-weight:normal;
        text-align:center;
        border-right:1px solid white;
        border-left:1px solid white;
      }
</style>
    <div class="modal">
      <span class="thanks">Thanks for your feedback</span>
      <a class="backBtn" href="javascript:history.go(-1)">Back to page</a>
    </div>

HTML;
} else {
  echo "Error";
}
?>
<?php

// 以每分鐘為單位，獲取卡號複寫，若未獲取卡號會增加log
//必要條件 請求功能、MAC
$system_id = $_GET[system_id];
$mac = strtoupper($_GET[mac]);
//手機 //流水號(接收) //HerTecID
$serial_num = $_GET[Serial];
$hid = $_GET[hid];
//---------------------------------------------------
$ip = $_SERVER['REMOTE_ADDR']; //IP
$datetime = date("Y-m-d H:i:s"); //更新時間
//請求Server，1：EPG、2：廣告
$guide2 = array(
    "1" => "www.jowinwin.com.tw",
    "2" => "59.125.190.111",
);
//條件:若發完後，等待時間
$condition = array(
    "1" => "45",
    "2" => "5",
);
//獨立Server資料夾
if (!is_dir(dirname(__FILE__) . "/origin/s" . $_GET[system_id])) {
    mkdir(dirname(__FILE__) . "/origin/s" . $_GET[system_id]); //建立資料夾
}
//Server發號碼牌txt
if (!is_dir(dirname(__FILE__) . "/origin/s" . $_GET[system_id] . "/" . date("Ymd"))) {
    mkdir(dirname(__FILE__) . "/origin/s" . $_GET[system_id] . "/" . date("Ymd"));
}
//寫入同一天
$filename = dirname(__FILE__) . "/origin/s" . $_GET[system_id] . "/" . date("Ymd") . "/" . date("Y-m-d") . ".txt";
$look = file($filename); //將TXT按照筆數轉陣列
$number = 1;
if (!empty($look)) {
//// 抓最後一筆成功時間，若小於限制時間，Number+1，若大於則歸零
    krsort($look);
    foreach ($look as $key => $value) {
        if (strpos($value, "success") !== false) {
            $num = $key;
            break;
        }
    }
    $data = json_decode($look[$num]);
    if (strtotime(date("Y-m-d H:i:s")) <= strtotime("{$data->datetime} +1 minute")) {
        $number = $data->number + 1;
    } else {
        $number = 1;
    }
}
//限制功能數量
switch ($system_id) {
    case 1:
        if ($number <= 5) {
            $return[mac] = $mac;
            $return[number] = $number;
            $return[guide] = $guide2[$system_id];
            $return[status] = "success";
            $return[waiting] = "";
            $return[datetime] = $datetime;
            $content = json_encode($return) . "\r\n";
            // 若在同一分鐘時複寫最後一行
            if ($number > 1) {
                $num = count($look) - 1;
                $look[$num] = $content;
                ksort($look);
                $myfile = fopen($filename, "w");
                fwrite($myfile, implode("", $look));
                fclose($myfile);
            } else {
                //若超出一分鐘歸零
                $myfile = fopen($filename, "a");
                fwrite($myfile, $content);
                fclose($myfile);
            }
            echo json_encode($return);
        } else {
            $return[mac] = $mac;
            ksort($look);
            $data = json_decode(end($look));
            $number = $data->number + 1;
            $return[number] = $number;
            $return[guide] = $guide2[$system_id];
            $return[status] = "FULL";
            $return[waiting] = $condition[$system_id];
            $return[datetime] = $datetime;
            $content = json_encode($return) . "\r\n";
            $myfile = fopen($filename, "a+");
            fwrite($myfile, $content);
            fclose($myfile);
            echo json_encode($return);
        }
        break;
}
?>
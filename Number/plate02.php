<?php
//目前已小時為單位
//必要條件 請求功能、MAC
$system_id = $_GET[system_id];
$mac = strtoupper($_GET[mac]);
//手機---------------------------------------------  
$serial_num = $_GET[Serial]; //流水號(接收)
$hid = $_GET[hid]; //HerTecID
$ip = $_SERVER['REMOTE_ADDR']; //IP
$datetime = date("Y-m-d H:i:s"); //更新時間
//請求Server，1：EPG、2：廣告
$guide2 = array(
    "1" => "www.jowinwin.com.tw",
    "2" => "59.125.190.111",
);

//獨立Server資料夾
if (!is_dir(dirname(__FILE__) . "/origin/s" . $_GET[system_id])) {
    mkdir(dirname(__FILE__) . "/origin/s" . $_GET[system_id]); //建立資料夾
}

//Server 每天
if (!is_dir(dirname(__FILE__) . "/origin/s" . $_GET[system_id] . "/" . date("Ymd"))) {
    mkdir(dirname(__FILE__) . "/origin/s" . $_GET[system_id] . "/" . date("Ymd"));
}

//每小時歸0
$filename = dirname(__FILE__) . "/origin/s" . $_GET[system_id] . "/" . date("Ymd") . "/" . date("Y-m-d H:00:00") . ".txt"; //TXT位置
$look = file($filename); //將TXT按照筆數轉陣列
(empty($look)) ? $number = 1 : $number = count($look) + 1;

//條件
switch ($system_id) {
    case 1:
        $limit = 10;
        $condition = "5";
//高峰條件        
//        if ("16:30" < date('H:i') && date('H:i') < "20:30") {}
        break;
    case 2:
        $limit = 10;
        $condition = "5";
        break;
}

//寫入
switch ($system_id) {
    case 1:
        if ($number <= $limit) {
            $return[mac] = $mac;
            $return[number] = $number;
            $return[guide] = $guide2[$system_id];
            $return[status] = "success";
            $return[waiting] = "";
            $return[datetime] = $datetime;
            $content = json_encode($return) . "\r\n";
            $myfile = fopen($filename, "a+");
            fwrite($myfile, $content);
            fclose($myfile);
            echo json_encode($return);
        } else {
            $return[mac] = $mac;
            $return[number] = $number;
            $return[guide] = $guide2[$system_id];
            $return[status] = "FULL";
            $return[waiting] = $condition;
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
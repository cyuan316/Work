<?php
$system_id = $_GET[system_id];	//請求系統名稱
$serial_num = $_GET[Serial];	//流水號(接收)
$mac = strtoupper($_GET[mac]);	//MAC
$hid = $_GET[hid];	//HerTecID
$ip = $_SERVER['REMOTE_ADDR'];	//IP
$datetime = date("Y-m-d H:i:s");	//更新時間
$line = 0;	//初始化行數
$num = 0;	//號碼牌

$order = 0;	//處理順序
$number = 1;	//號碼牌
$wait = 0;	//等待總數
$request_num = '';	//再次請求時間(數字)
$request_unit = '';	//再次請求時間(單位)
$return = array();
$guide2 = array(
			"1" => "www.jowinwin.com.tw",
			"2" => "211.75.2.123",
			"3" => "59.125.190.111",
			"4" => "59.125.190.110");		//請求Server，1：EPG、2：廣告、3：APK OTA、4：展業


if(!is_dir(dirname(__FILE__) . "/origin/".date("Ymd"))){
	mkdir(dirname(__FILE__) . "/origin/".date("Ymd"));	//建立資料夾
}

$filename = dirname(__FILE__) . "/origin/".date("Ymd")."/".date("Y-m-d H:00:00").".txt";	//TXT位置
$fp = fopen($filename , 'r');	//開啟並查看TXT內容
$look = file($filename);	//將TXT按照筆數轉陣列



if($fp){
	while(stream_get_line($fp,99999,"\n")){	//獲取文件的一行内容
		$look2 = explode(",", $look[$line]);
		if(strtotime($look2[11]) >= strtotime(date("Y-m-d H:00:00")) && strtotime($look2[11]) <= strtotime(date("Y-m-d H:59:59"))){
			$number++;	//計算號碼牌數
		}
		$line++;	//計算行數
	}
	fclose($fp);//关闭文件
}
$wait = $wait + $number;
//echo "號碼牌：" . $number . "<br>";
//echo "等待總數：" . $wait . "<br>";

if($number <= 100){
	//輸入內容
	$content = $system_id . "," . $mac . "," . $hid . "," . $serial_num . "," . $ip . "," . $guide2[$system_id] . "," . $order . "," . $number . "," . $wait . "," . $request_num . "," . $request_unit . "," . $datetime . "\r\n";
	$myfile = fopen($filename, "a+");
	fwrite($myfile,$content);
	fclose($myfile);
	
	//$wait = $wait + $number;
	$return[guide] = $guide2[$system_id];
	$return[order] = $order;
	$return[number] = $number;
	$return[wait] = $wait;
	$return[request_num] = $request_num;
	$return[request_unit] = $request_unit;
	echo json_encode($return);
}else{
	$location2 = 'http://59.125.190.110/plate/plate02.php?system_id='.$system_id.'&mac='.$mac;
	header ( 'Location:'.$location2);
	exit;
}


?>
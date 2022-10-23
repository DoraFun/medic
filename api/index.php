<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'connect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $path = $_SERVER['REQUEST_URI'];
        //check for url to perform different requests
        if ($path == '/api/doctors') {
            $sql = "SELECT * FROM docs INNER JOIN specs on docs.spec_id = specs.spec_id";

            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $docs = $stmt->fetchAll(PDO::FETCH_ASSOC);


            echo json_encode($docs);
        }

        break;
    
    case "POST":
        $path = $_SERVER['REQUEST_URI'];
        if ($path == '/api/appointmentsave'){

            $user = json_decode( file_get_contents('php://input') );
            $sql = "INSERT INTO appointments(app_id,doctor, `date`, pac_name, pac_phone, pac_ad) VALUES(0,:doctore, :dato, :pacnamee, :pacphone, :pacad)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':doctore', $user->doctore);
            $stmt->bindParam(':dato', $user->startDate);
            $stmt->bindParam(':pacnamee', $user->inputs->pacname);
            $stmt->bindParam(':pacphone', $user->inputs->pacphone);
            $stmt->bindParam(':pacad', $user->inputs->pacad);
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }
            echo json_encode($response);

            require('fpdf/fpdf.php');
    // создаем PDF документ
        $pdf= new FPDF();
    // устанавливаем заголовок документа
        $pdf->SetTitle("TALOH");
    // создаем страницу
        $pdf->AddPage('P');
        $pdf->SetDisplayMode('real','default');
    // добавляем шрифт ариал
        $pdf->AddFont('Arial','','arial.php'); 
    // устанавливаем шрифт Ариал
        $pdf->SetFont('Arial');
    // устанавливаем размер шрифта
        $pdf->SetFontSize(16);
    // добавляем текст
        $pdf->SetXY(10,10);
        $pdf->Write(0,iconv('utf-8', 'windows-1251',"Талон на посещение врача"));
    // добавляем текст
        $pdf->SetFontSize(12);
        $pdf->SetXY(10,30);
        $pdf->Write(0,iconv('utf-8', 'windows-1251',"ФИО пациента:  ".$user->inputs->pacname));
    // добавляем текст
        $pdf->SetXY(10,40);
        $pdf->Write(0,iconv('utf-8', 'windows-1251',"Номер телефона пациента:  ".$user->inputs->pacphone));
    // добавляем текст
        $pdf->SetFontSize(12);
        $pdf->SetXY(10,50);
        $pdf->Write(0,iconv('utf-8', 'windows-1251',"Дата: ".$user->startDate));
    // добавляем текст
        $pdf->SetXY(10,60);
        $pdf->Write(0,iconv('utf-8', 'windows-1251',"Причина обращения:  ".$user->inputs->pacad));
    // добавляем текст
        $pdf->SetXY(10,70);
        $pdf->Write(0,iconv('utf-8', 'windows-1251',"Специалист:  ".$user->doctore));

    //Вывод пдф файла в режиме скачивания
    
         $pdf->Output('Talon'.".pdf","F");

            break;
        }
        else {
            $user = json_decode( file_get_contents('php://input') );
            $sql = "SELECT * FROM `users` WHERE `login` like ? and `pass` like ?";
            $stmt = $conn -> prepare($sql);
            $stmt-> execute(array($user->login,md5($user->pass)));
            $lines = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $count = count($lines);
            if ($count>0){
                $response = ['status' => 1, 'message' => 'Authorized'];
            }
            else{
                break;
            }
            echo json_encode($response);
            break;
        }

       


        // if ($stmt->execute(array("$user->login","md5($user->pass)"))) {
        //     $response = ['status' => 1, 'message' => 'Authorized'];
        // } else {
        //     $response = ['status' => 0, 'message' => 'Failed to Authorize'];
        // }
        // echo json_encode($response);
        // break;
}

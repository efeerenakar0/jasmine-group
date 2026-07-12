<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$dataFile = 'data.json';

function getData() {
    global $dataFile;
    if (!file_exists($dataFile)) return ['properties' => [], 'settings' => []];
    return json_decode(file_get_contents($dataFile), true);
}

function saveData($data) {
    global $dataFile;
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$action = $_GET['action'] ?? '';

if ($action === 'get_properties') {
    $data = getData();
    echo json_encode(['status' => 'success', 'data' => $data['properties']]);
    exit;
}

if ($action === 'get_settings') {
    $data = getData();
    echo json_encode(['status' => 'success', 'data' => $data['settings']]);
    exit;
}

if ($action === 'login') {
    $user = $_POST['username'] ?? '';
    $pass = $_POST['password'] ?? '';
    if ($user === 'jasmine' && $pass === 'jasmine') {
        $_SESSION['admin_logged_in'] = true;
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Hatalı kullanıcı adı veya şifre']);
    }
    exit;
}

if ($action === 'logout') {
    session_destroy();
    header("Location: admin.php");
    exit;
}

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    echo json_encode(['status' => 'error', 'message' => 'Yetkisiz erişim']);
    exit;
}

if ($action === 'add_property') {
    $data = getData();
    $uploadedImages = [];
    
    // Klasör kontrolü
    $uploadDir = '../images/uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    // Dosya yüklendiyse işle
    if (isset($_FILES['images']) && !empty($_FILES['images']['name'][0])) {
        foreach($_FILES['images']['tmp_name'] as $key => $tmpName) {
            $fileName = time() . '_' . basename($_FILES['images']['name'][$key]);
            $targetFilePath = $uploadDir . $fileName;
            if (move_uploaded_file($tmpName, $targetFilePath)) {
                $uploadedImages[] = 'images/uploads/' . $fileName; // Relative for frontend
            }
        }
    }

    // Eğer dosya yüklenmediyse ama URL verildiyse URL'yi kullan
    if (empty($uploadedImages) && !empty($_POST['image_url'])) {
        $uploadedImages = [$_POST['image_url']];
    }
    
    $newProp = [
        'id' => 'JG-' . strtoupper(substr(md5(time()), 0, 4)),
        'type' => $_POST['type'] ?? 'sale',
        'title' => $_POST['title'] ?? '',
        'location' => $_POST['location'] ?? '',
        'rooms' => $_POST['rooms'] ?? '',
        'bathrooms' => $_POST['bathrooms'] ?? '',
        'area_net' => $_POST['area_net'] ?? '',
        'area_gross' => $_POST['area_gross'] ?? '',
        'desc' => $_POST['desc'] ?? '',
        'price_eur' => intval($_POST['price_eur'] ?? 0),
        'badge' => $_POST['badge'] ?? '',
        'badge_color' => $_POST['badge_color'] ?? '',
        'images' => $uploadedImages
    ];
    $data['properties'][] = $newProp;
    saveData($data);
    echo json_encode(['status' => 'success']);
    exit;
}

if ($action === 'delete_property') {
    $id = $_POST['id'] ?? '';
    $data = getData();
    $filtered = array_filter($data['properties'], function($p) use ($id) {
        return $p['id'] !== $id;
    });
    $data['properties'] = array_values($filtered);
    saveData($data);
    echo json_encode(['status' => 'success']);
    exit;
}

echo json_encode(['status' => 'error', 'message' => 'Geçersiz işlem']);
?>

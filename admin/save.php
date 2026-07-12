<?php
// admin/save.php
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

// Read the raw POST data
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data.']);
    exit;
}

$dataFile = 'data.json';

// Read the existing data
if (!file_exists($dataFile)) {
    echo json_encode(['success' => false, 'message' => 'Database file not found.']);
    exit;
}

$currentDataJSON = file_get_contents($dataFile);
$currentData = json_decode($currentDataJSON, true);

if (!$currentData) {
    echo json_encode(['success' => false, 'message' => 'Error reading database.']);
    exit;
}

// Append the new property to the array
if (!isset($currentData['properties'])) {
    $currentData['properties'] = [];
}

// Ensure the new property is added at the beginning of the array so it shows up first
array_unshift($currentData['properties'], $input);

// Write the data back to the file
$success = file_put_contents($dataFile, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Property saved successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to write to database. Check file permissions.']);
}
?>

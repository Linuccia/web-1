<?php
session_start();
date_default_timezone_set("Europe/Moscow");
$time = date("Y-m-d H:i:s");
$x = (float)$_GET['x'];
$y = $_GET['y'];
$r = $_GET['r'];

function checkXYR($x, $y, $r) {
    return is_numeric($x) && $x <= 5 && $x >= -3 &&
        in_array($y, array(-4, -3, -2, -1, 0, 1, 2, 3, 4)) &&
        in_array($r, array(1, 2, 3, 4, 5));
}

function hit($x, $y, $r)
{
    if (($x >= 0) && ($y <= 0) && ($x * $x + $y * $y <= ($r * $r) / 4)) {
        return 'true';
    }
    if (($x <= 0) && ($y <= 0) && ($y >= - 2 * $x - $r)) {
        return 'true';
    }
    if (($x <= 0) && ($y >= 0) && ($x >= -$r / 2) && ($y <= $r / 2) ) {
        return 'true';
    }
    return 'false';
}

if (checkXYR($x, $y, $r)) {
    $hit = hit($x, $y, $r);
    $runtime = round(microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"],8);
    $answer = "<tr class='result_php'>
    <td>$x</td>
    <td>$y</td>
    <td>$r</td>
    <td>$hit</td>
    <td>$time</td>
    <td>$runtime</td>
    </tr>";
    echo $answer;
} else {
    http_response_code(400);
    return;
}


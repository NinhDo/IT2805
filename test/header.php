<?php
    $myfile = fopen("./assets/header.txt", "r") or die("Unable to open file!");
    echo fread($myfile,filesize("./assets/header.txt"));
    fclose($myfile);
?>
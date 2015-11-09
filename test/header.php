<?php
    $myfile = fopen("header.txt", "r") or die("Unable to open file!");
    echo fread($myfile,filesize("header.txt"));
    fclose($myfile);
?>
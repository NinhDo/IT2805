<?php
    $myfile = fopen("footer.txt", "r") or die("Unable to open file!");
    echo fread($myfile,filesize("footer.txt"));
    fclose($myfile);
?>
<?php
    $myfile = fopen("./assets/footer.txt", "r") or die("Unable to open file!");
    echo fread($myfile,filesize("./assets/footer.txt"));
    fclose($myfile);
?>
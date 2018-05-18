<?php

session_start();

$testVar = $_SESSION;

echo "<script type="text/javascript">
        console.log("'.$testVar'")
        </script>";

?>

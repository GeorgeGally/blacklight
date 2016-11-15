<!DOCTYPE html>
<html>
<body>

hello
<?php
libxml_use_internal_errors(true);
$url = 'http://aqicn.org/city/shanghai/';
$html=file_get_contents(url);
echo $html;
$dom = new DOMDocument;
$dom->loadHTML($html);

foreach($dom->getElementsByTagName('td') as $ptag)
{
echo "..";
    if($ptag->getAttribute('class')=="aqivalue")
    {
        echo "<h6>".$ptag->nodeValue."</h6>";
    }
}

?>

</body>
</html>

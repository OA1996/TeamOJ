<?php
function eBaySearch($searchTerm)
{
    ?>
    <?php
    error_reporting(E_ALL);  // Turn on all errors, warnings and notices for easier debugging

    // API request variables
    $endpoint = 'http://svcs.ebay.com/services/search/FindingService/v1';  // URL to call
    $version = '1.0.0';  // API version supported by your application
    $appid = 'JoshuaJa-CT4009As-PRD-c2ccbdeee-6f9ae60b';  // Replace with your own AppID
    $globalid = 'EBAY-US';  // Global ID of the eBay site you want to search (e.g., EBAY-DE)
    $query = $searchTerm;  // You may want to supply your own query
    $safequery = urlencode($query);  // Make the query URL-friendly

    // Construct the findItemsByKeywords HTTP GET call
    $apicall = "$endpoint?";
    $apicall .= "OPERATION-NAME=findItemsByKeywords";
    $apicall .= "&SERVICE-VERSION=$version";
    $apicall .= "&SECURITY-APPNAME=$appid";
    $apicall .= "&GLOBAL-ID=$globalid";
    $apicall .= "&keywords=$safequery";
    $apicall .= "&paginationInput.entriesPerPage=3";

    // Load the call and capture the document returned by eBay API
    $resp = simplexml_load_file($apicall);

    // Check to see if the request was successful, else print an error
    if ($resp->ack == "Success") {
        $results = '';
        // If the response was loaded, parse it and build links
        foreach($resp->searchResult->item as $item) {
            $pic   = $item->galleryURL;
            $link  = $item->viewItemURL;
            $title = $item->title;

            // For each SearchResultItem node, build a link and append it to $results
            $results .= "<tr><td><img src=\"$pic\"></td><td><a href=\"$link\">$title</a></td></tr>";
        }
    }
    // If the response does not indicate 'Success,' print an error
    else {
        $results  = "<h3>Oops! The request was not successful. Make sure you are using a valid ";
        $results .= "AppID for the Production environment.</h3>";
    }
    ?>
    <!-- Build the HTML page with values from the call response -->
    <html>
    <head>
        <title>eBay Search Results for <?php echo $query; ?></title>
        <style type="text/css">body { font-family: arial,sans-serif;} </style>
    </head>
    <body>

        <h1>eBay Search Results for <?php echo $query; ?></h1>

        <table>
            <tr>
                <td>
                    <?php echo $results;?>
                </td>
            </tr>
        </table>

    </body>
    </html>
    <?php
}
?>

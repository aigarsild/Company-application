<!-- Add header -->
<?php
$pageTitle = 'My dashboard'; //Add page title
include 'templates/header.php';
?>

<h1>My dashboard</h1>
<span>Find information about company</span>

<div data-target="comp-list" class="list-group">
</div>


<!-- Add footer -->
<?php
$templateJs = '__app/getCall.js'; //Add template specific js
include 'templates/footer.php';
?>
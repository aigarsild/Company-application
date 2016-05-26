<!-- Add header -->
<?php
$pageTitle = 'My dashboard'; //Add page title
include 'templates/header.php';
?>

<h1>Add a new company</h1>

<div class="input-group col-xs-12">
    <label for="name">Name *</label>
    <input data-target="name" type="text" class="form-control" id="name">
</div>

<div class="input-group col-xs-12">
    <label for="contact_number">Contact number *</label>
    <input data-target="contact_number" type="text" class="form-control" id="contact_number">
</div>

<div class="input-group col-xs-12">
    <label for="field">Field of work *</label>
    <input data-target="field" type="text" class="form-control" id="field">
</div>

<span data-target="add" class="btn btn-default col-xs-12" style="margin: 20px 0;">Add</span>

<!-- Add footer -->
<?php
$templateJs = '__app/createCall.js'; //Add template specific js
include 'templates/footer.php';
?>
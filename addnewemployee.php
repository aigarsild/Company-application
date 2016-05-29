<!-- Add header -->
<?php
$pageTitle = 'My dashboard'; //Add page title
include 'templates/header.php';
?>

<h3>Add a new employee to:</h3>

<h3 data-target="parent_name"></h3>
<div class="input-group col-xs-12">
    <label for="name">Name *</label>
    <input data-target="name" type="text" class="form-control" id="name" required>
</div>

<div class="input-group col-xs-12">
    <label for="email">Email *</label>
    <input data-target="email" type="text" class="form-control" id="name" required>
</div>

<div class="input-group col-xs-12">
    <label for="contact_number">Contact number *</label>
    <input data-target="contact_number" type="text" class="form-control" id="contact_number" required>
</div>

<div class="input-group col-xs-12">
    <label for="position">Field of work *</label>
    <input data-target="position" type="text" class="form-control" id="position" required>
</div>

<button data-target="add-employee" class="btn btn-default col-xs-12" style="margin: 20px 0;">Add</button>

<!-- Add footer -->
<?php
$templateJs = '__app/createCall.js'; //Add template specific js
include 'templates/footer.php';
?>
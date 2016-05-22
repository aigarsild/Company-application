<!-- Add header -->
<?php
$pageTitle = 'Log in'; //Add page title
include 'templates/header.php';
?>
    <h1>Login in</h1>
        <div class="form-group">
            <label for="InputEmail1">Email address</label>
            <input type="email" class="form-control" id="InputEmail1" placeholder="Email">
        </div>
        <div class="form-group">
            <label for="InputPassword1">Password</label>
            <input type="password" class="form-control" id="InputPassword1" placeholder="Password">
        </div>
        <span data-target="log-in-button" class="btn btn-default">Submit</span>
    <!-- Add footer -->
<?php
$templateJs = '__app/login.js'; //Add template specific js
include 'templates/footer.php';
?>
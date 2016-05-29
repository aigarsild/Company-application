<!-- Add header -->
<?php
$pageTitle = 'Welcome to App'; //Add page title
include 'templates/header.php';
?>
    <div class="col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
        <h3><small>Welcome to</small> REST application</h3>
        <p data-target="name"></p>
        <p data-target="field"></p>
    </div>
</div>
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
    <script   src="https://code.jquery.com/ui/1.12.0-rc.2/jquery-ui.min.js"   integrity="sha256-55Jz3pBCF8z9jBO1qQ7cIf0L+neuPTD1u7Ytzrp2dqo="   crossorigin="anonymous"></script>

    <!-- Latest compiled and minified JavaScript -->
    <script type="text/javascript" src="js/__app/app.js"></script>
</body>
</html>

<!-- Add footer -->
<?php
$templateJs = '__app/login.js'; //Add template specific js
include 'templates/footer.php';
?>
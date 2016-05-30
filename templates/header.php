<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title><?php echo $pageTitle ? $pageTitle : 'Page title'; ?></title>
    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="css/bootsrap.min.css">
    <style>
        #loader {
            position: absolute;
            top: 0;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            background: rgba(0, 0, 0, 0.35);
            bottom: 0;
            z-index: 99999;
        }
        #loader img {
            margin-top: 200px;
            margin-left: 35%;
            width: 150px;
            -webkit-animation:spin 2s linear infinite;
            -moz-animation:spin 2s linear infinite;
            animation:spin 2s linear infinite;
        }
        #loader h2 {
            margin-top: 20px;
            margin-left: 35%;
            width: 150px;
        }
        @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
        @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
        @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
    </style>
</head>
<body>
<div id="loader" style="display: none">
    <img class="col-md-12 col-md-offset-3" src="https://d30y9cdsu7xlg0.cloudfront.net/png/35633-200.png">
    <h2>Loading...</h2>
</div>
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.php">Application</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li>
                    <a href="index.php">Homepage</span></a>
                </li>
                <li>
                    <a href="dashboard.php">Dashboard</a>

                </li>
                <li>
                    <a href="addnewcompany.php">Add new company</a>
                </li>
                <li>
                    <a data-target="login" href="login.php">Login</a>
                </li>
                <li>
                    <a data-target="logout" class="hidden" href="#">Log out</a>
                </li>
            </ul>
            <p data-target="userName" class="navbar-text navbar-right hidden">Signed in as <a href="#" data-target="userNameInsert" class="navbar-link"></a></p>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>
<div class="container">
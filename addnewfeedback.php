<!-- Add header -->
<?php
$pageTitle = 'Feedback'; //Add page title
include 'templates/header.php';
?>

<p>See feedback <span data-target="count" class="badge"></span></p>

<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingOne">
            <h4 class="panel-title">
                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Personal details
                </a>
            </h4>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div data-target="personal-details" class="panel-body">
                <div class="input-group col-xs-12">
                    <label for="personal_tags">Add personal tags (Comma seperated) *</label>
                    <input data-target="personal_tags" type="text" class="form-control" id="personal_tags">
                </div>
                <div class="input-group col-xs-12">
                    <label for="professional_tags">Add professional tags (Comma seperated) *</label>
                    <input data-target="professional_tags" type="text" class="form-control" id="professional_tags">
                </div>

            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingTwo">
            <h4 class="panel-title">
                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Ratings
                </a>
            </h4>
        </div>
        <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
            <div data-target="descriptions" class="panel-body">
                <div class="input-group col-xs-12">
                    <label for="personal_rating">Add rating as a person *</label>
                    <input data-target="personal_rating" type="text" class="form-control" id="personal_rating">
                </div>

                <div class="input-group col-xs-12">
                    <label for="professional_rating">Add rating as a professional *</label>
                    <input data-target="professional_rating" type="text" class="form-control" id="professional_rating">
                </div>

            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingThree">
            <h4 class="panel-title">
                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Descriptions and feedbacks
                </a>
            </h4>
        </div>
        <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
            <div data-target="personal-feedback" class="panel-body">
                <div class="input-group col-xs-12">
                    <label for="employee_desc">Add employee description *</label>
                    <textarea data-target="employee_desc" id="employee_desc" class="form-control" rows="3"></textarea>
                </div>

                <div class="input-group col-xs-12">
                    <label for="employee_personal_desc">Add employee personal description *</label>
                    <textarea data-target="employee_personal_desc" id="employee_personal_desc" class="form-control" rows="3"></textarea>
                </div>
                <div class="input-group col-xs-12">
                    <label for="employee_prof_desc">Add employee professional description *</label>
                    <textarea data-target="employee_prof_desc" id="employee_prof_desc" class="form-control" rows="3"></textarea>
                </div>

                <div class="input-group col-xs-12">
                    <label for="employee_feedback">Add employee personal feedback *</label>
                    <textarea data-target="employee_feedback" id="employee_feedback" class="form-control" rows="3"></textarea>
                </div>

            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingFour">
            <h4 class="panel-title">
                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Personal details
                </a>
            </h4>
        </div>
        <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
            <div data-target="personal-data" class="panel-body">

                <div class="input-group col-xs-12">
                    <label for="contact_number">Is employee sociable? *</label><br>
                    <input data-target="sociable" type="radio" name="sociable" value="1"> Yes
                    <input data-target="sociable" type="radio" name="sociable" value="0"> No<br>
                </div>

                <div class="input-group col-xs-12">
                    <label for="contact_number">Is employee creepy? *</label><br>
                    <input data-target="creepy" type="radio" name="creepy" value="1"> Yes
                    <input data-target="creepy" type="radio" name="creepy" value="0"> No<br>
                </div>

                <div class="input-group col-xs-12">
                    <label for="contact_number">Is employee awesome? *</label><br>
                    <input data-target="awesome" type="radio" name="awesome" value="1"> Yes
                    <input data-target="awesome" type="radio" name="awesome" value="0"> No<br>
                </div>
            </div>
        </div>
    </div>
    <span data-target="add-feedback" class="btn btn-default col-xs-12" style="margin: 20px 0;">Add</span>
</div>


<!-- Add footer -->
<?php
$templateJs = '__app/addNewFeedback.js'; //Add template specific js
include 'templates/footer.php';
?>
/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
/*Save Driver*/
let baseUrl = "http://localhost:8080/Back_End_war/";

// $("#btnSaveDriver").attr('disabled', true);

$("#btnSaveDriver").click(function () {
    let formData = new FormData($("#driverForm")[0]);
    console.log(formData);
    $.ajax({
        url: baseUrl + "driver", method: "post", data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            saveUpdateAlert("User", res.message);
            generateDriverID();
        }, error: function (error) {
            unSuccessUpdateAlert("Driver", JSON.parse(error.responseText).message);
        }
    });
});

generateDriverID();
checkValidity(customerValidations);
setTextFieldValues("", "", "", "","", "", "", "","","", "", "");


/* Driver Id Gentrator */
function generateDriverID() {
    $("#driver_Id").val("DRI-001");
    $.ajax({
        url: baseUrl + "driver/driverIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" + id);
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#driver_Id").val("DRI-00" + tempId);
            } else if (tempId <= 99) {
                $("#driver_Id").val("DRI-0" + tempId);
            } else {
                $("#driver_Id").val("DRI-" + tempId);
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

function setTextFieldValues(firstName, lastName, contact_No, address, email, nic_No, license_No, license_Img, user_Name, password) {
    $("#firstName").val(firstName);
    $("#lastName").val(lastName);
    $("#contact_No").val(contact_No);
    $("#address").val(address);
    $("#email").val(email);
    $("#nic_No").val(nic_No);
    $("#license_No").val(license_No);
    $("#license_Img").val(license_Img);
    $("#user_Name").val(user_Name);
    $("#password").val(password);

    $("#firstName").focus();
    checkValidity(customerValidations);
    $("#btnSaveCustomer").attr('disabled', true);
}

/**
 * Auto Forces Input Fields Save
 * */
$("#firstName").focus();
const regExFirstName = /^[A-z ]{3,20}$/;
const regExLastName = /^[A-z ]{3,20}$/;
const regExContactNum = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;
const regExCusAddress = /^[A-z0-9/ ]{4,30}$/;
const regExEmailCusAddress = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regExNIC = /^([0-9]{12}|[0-9V]{10})$/;
const regExDrivingNIC = /^[A-Z0-9-]+$/;
const regExUserName = /^[A-z0-9/ ]{4,30}$/;
const regExPassword = /^([A-Z a-z]{5,15}[0-9]{1,10})$/;

let customerValidations = [];
customerValidations.push({
    reg: regExFirstName, field: $('#firstName'), error: 'User First Name Pattern is Wrong'
});
customerValidations.push({
    reg: regExLastName, field: $('#lastName'), error: 'User Last Name Pattern is Wrong'
});
customerValidations.push({
    reg: regExContactNum, field: $('#contact_No'), error: 'User Contact Number Pattern is Wrong'
});
customerValidations.push({
    reg: regExCusAddress, field: $('#address'), error: 'User Address Pattern is Wrong'
});
customerValidations.push({
    reg: regExEmailCusAddress, field: $('#email'), error: 'User Email Address Pattern is Wrong'
});
customerValidations.push({
    reg: regExNIC, field: $('#nic_No'), error: 'User NIC Pattern is Wrong'
});
customerValidations.push({
    reg: regExDrivingNIC, field: $('#license_No'), error: 'User Driving License Pattern is Wrong'
});
customerValidations.push({
    reg: regExUserName, field: $('#user_Name'), error: 'User User Name Pattern is Wrong'
});
customerValidations.push({
    reg: regExPassword, field: $('#password'), error: 'User Password Pattern is Wrong'
});
//disable tab key of all four text fields using grouping selector in CSS
$("#firstName,#lastName,#contact_No,#address,#email,#nic_No,#license_No,#user_Name,#password").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#firstName,#lastName,#contact_No,#address,#email,#nic_No,#license_No,#user_Name,#password").on('keyup', function (event) {
    checkValidity(customerValidations);
});

$("#firstName,#lastName,#contact_No,#address,#email,#nic_No,#license_No,#user_Name,#password").on('blur', function (event) {
    checkValidity(customerValidations);
});

$("#firstName").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExFirstName, $("#firstName"))) {
        $("#lastName").focus();
    } else {
        focusText($("#firstName"));
    }
});

$("#lastName").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExLastName, $("#lastName"))) {
        focusText($("#contact_No"));
    }
});

$("#contact_No").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExContactNum, $("#contact_No"))) {
        focusText($("#address"));
    }
});

$("#address").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress, $("#address"))) {
        if (event.which === 13) {
            focusText($("#email"));
        }
    }
});

$("#email").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmailCusAddress, $("#email"))) {
        focusText($("#nic_No"));
    }
});

$("#nic_No").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExNIC, $("#nic_No"))) {
        focusText($("#license_No"));
    }
});

$("#license_No").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExDrivingNIC, $("#license_No"))) {
        if (event.which === 13) {
            focusText($("#user_Name"));
        }
    }
});

$("#user_Name").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExUserName, $("#user_Name"))) {
        if (event.which === 13) {
            focusText($("#password"));
        }
    }
});

$("#password").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExPassword, $("#password"))) {
        if (event.which === 13) {
            $('#btnSaveCustomer').focus();
        }
    }
});


function setButtonState(value) {
    if (value > 0) {
        $("#btnSaveDriver").attr('disabled', true);
    } else {
        $("#btnSaveDriver").attr('disabled', false);
    }
}
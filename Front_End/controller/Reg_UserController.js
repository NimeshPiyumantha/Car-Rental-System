/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
/*Save Users*/
let baseUrl = "http://localhost:8080/Back_End_war/";
loadAllRegUsers();
// $("#btnSaveCustomer").attr('disabled', true);
// $("#btnUpdateCustomer").attr('disabled', true);
// $("#btnDeleteCustomer").attr('disabled', true);

/**
 * Customer Save
 * */

$("#btnSaveCustomer").click(function () {
    let formData = new FormData($("#customerForm")[0]);
    // let formData = $("#customerForm").serialize();
    console.log(formData);
    $.ajax({
        url: baseUrl + "reg_User", method: "post", data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            saveUpdateAlert("User", res.message);
            loadAllRegUsers();
        }, error: function (error) {
            unSuccessUpdateAlert("User", JSON.parse(error.responseText).message);
        }
    });
});



/* User Id Gentrator */
function generateCustomerID() {
    $("#user_Id").val("C00-001");
    $.ajax({
        url: baseUrl + "reg_User/reg_UserIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" + id);
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#user_Id").val("C00-00" + tempId);
            } else if (tempId <= 99) {
                $("#user_Id").val("C00-0" + tempId);
            } else {
                $("#user_Id").val("C00-" + tempId);
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

/**
 * clear input fields Values Method
 * */
function setTextFieldValues(firstName, lastName, contact_No, address, email, nic, license_No, nic_Img, license_Img, user_Name, password) {
    $("#firstName").val(firstName);
    $("#lastName").val(lastName);
    $("#contact_No").val(contact_No);
    $("#address").val(address);
    $("#email").val(email);
    $("#nic").val(nic);
    $("#license_No").val(license_No);
    $("#nic_Img").val(nic_Img);
    $("#license_Img").val(license_Img);
    $("#user_Name").val(user_Name);
    $("#password").val(password);

    $("#firstName").focus();
    checkValidity(customerValidations);
    $("#btnSaveCustomer").attr('disabled', true);
}

/**
 * load all customers Method
 * */
function loadAllRegUsers() {
    $("#customerTable").empty();
    $.ajax({
        url: baseUrl + "reg_User/loadAllUsers",
        method: "GET", dataType: "json", success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let user_Id =i.user_Id;
                let name = i.name;
                let contact_No = i.contact_No;
                let address = i.address;
                let email = i.email;
                let nic = i.nic;
                let license_No = i.license_No;
                let nic_Img = i.nic_Img;
                let license_Img = i.license_Img;
                let role_Type = i.role_Type;
                let user_Name = i.user_Name;
                let password = i.password;

                let row = "<tr><td>" + user_Id + "</td><td>" + name+ "</td><td>" + contact_No + "</td><td>" + address + "</td><td>" + email + "</td><td>" + nic + "</td><td>" + license_No + "</td><td>" + role_Type + "</td><td>" + user_Name + "</td><td>" + password + "</td></tr>";
                $("#customerTable").append(row);
            }
           /* blindClickEvents();*/
            generateCustomerID();
            setTextFieldValues("", "", "", "","", "", "", "","","", "", "");
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
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
    reg: regExNIC, field: $('#nic'), error: 'User NIC Pattern is Wrong'
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
$("#firstName,#lastName,#contact_No,#address,#email,#nic,#license_No,#user_Name,#password").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#firstName,#lastName,#contact_No,#address,#email,#nic,#license_No,#user_Name,#password").on('keyup', function (event) {
    checkValidity(customerValidations);
});

$("#firstName,#lastName,#contact_No,#address,#email,#nic,#license_No,#user_Name,#password").on('blur', function (event) {
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
        focusText($("#nic"));
    }
});

$("#nic").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExNIC, $("#nic"))) {
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
        $("#btnSaveCustomer").attr('disabled', true);
    } else {
        $("#btnSaveCustomer").attr('disabled', false);
    }
}
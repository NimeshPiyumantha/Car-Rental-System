/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

let driverBaseUrl = "http://localhost:8080/Back_End_war/";
loadAllDrivers();

$("#btnSaveDriver").attr('disabled', true);
$("#btnUpdateDriver").attr('disabled', true);
$("#btnDeleteDriver").attr('disabled', true);


/**
 * Customer Save
 * */
$("#btnSaveDriver").click(function () {
    let formData = new FormData($("#driverForm")[0]);
    console.log(formData);
    $.ajax({
        url: driverBaseUrl + "driver",
        method: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res)
            saveUpdateAlert("Driver", res.message);
            loadAllDrivers();
        },
        error: function (error) {
            unSuccessUpdateAlert("Driver", JSON.parse(error.responseText).message);
        }
    });
});

/**
 * User Driver Generator
 * */
function generateDriverID() {
    $("#user_Id").val("DRI-001");
    $.ajax({
        url: driverBaseUrl + "driver/driverIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" + id);
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#user_Id").val("DRI-00" + tempId);
            } else if (tempId <= 99) {
                $("#user_Id").val("DRI-0" + tempId);
            } else {
                $("#user_Id").val("DRI-" + tempId);
            }
        },
        error: function (ob, statusText, error) {
        }
    });
}

/**
 * clear input fields Values Method
 * */
function setTextFieldValuesD(firstName, lastName, contact_No, address, email, nic_No, license_No, license_Img, driverAvailability, user_Name, password) {
    $("#firstName").val(firstName);
    $("#lastName").val(lastName);
    $("#contact_No").val(contact_No);
    $("#address").val(address);
    $("#email").val(email);
    $("#nic_No").val(nic_No);
    $("#license_No").val(license_No);
    $("#license_Img").val(license_Img);
    $("#driverAvailability").val(driverAvailability);
    $("#user_Name").val(user_Name);
    $("#password").val(password);

    $("#firstName").focus();
    checkValidity(driverValidations);
    $("#btnSaveDriver").attr('disabled', true);
}

/**
 * load all customers Method
 * */
function loadAllDrivers() {
    $("#driverTable").empty();
    $.ajax({
        url: driverBaseUrl + "driver/loadAllDrivers", method: "GET", dataType: "json", success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let user_Id = i.user_Id;
                let firstName = i.name.firstName;
                let lastName = i.name.lastName;
                let contact_No = i.contact_No;
                let address = i.address;
                let email = i.email;
                let nic_No = i.nic_No;
                let license_No = i.license_No;
                let license_Img = i.license_Img;
                let driverAvailability = i.driverAvailability;
                let role_Type = i.user.role_Type;
                let user_Name = i.user.user_Name;
                let password = i.user.password;

                let row = "<tr><td>" + user_Id + "</td><td>" + firstName + "</td><td>" + lastName + "</td><td>" + contact_No + "</td><td>" + address + "</td><td>" + email + "</td><td>" + nic_No + "</td><td>" + license_No + "</td><td>" + driverAvailability + "</td><td>" + role_Type + "</td><td>" + user_Name + "</td><td>" + password + "</td></tr>";
                $("#driverTable").append(row);
            }
            blindClickEventsD();
            generateDriverID();
            setTextFieldValuesD("", "", "", "", "", "", "", "", "", "", "");
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}

/**
 * Search id and Load Table
 * */
$("#search_Id").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#search_Id").val();
        $("#driverTable").empty();
        $.ajax({
            url: driverBaseUrl + "driver/searchDriver/?driver_Id="+ search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                $("#user_Id").val(res.user_Id);
                $("#firstName").val(res.name.firstName);
                $("#lastName").val(res.name.lastName);
                $("#contact_No").val(res.contact_No);
                $("#address").val(res.address);
                $("#email").val(res.email);
                $("#nic_No").val(res.nic_No);
                $("#license_No").val(res.license_No);
                $("#license_Img").prop(res.license_Img);
                $("#driverAvailability").val(res.driverAvailability);
                $("#role_Type").val(res.user.role_Type);
                $("#user_Name").val(res.user.user_Name);
                $("#password").val(res.user.password);
                let row = "<tr><td>" + res.user_Id + "</td><td>" + res.name.firstName + "</td><td>" + res.name.lastName + "</td><td>" + res.contact_No + "</td><td>" + res.address + "</td><td>" + res.email + "</td><td>" + res.nic_No + "</td><td>" + res.license_No + "</td><td>" + res.driverAvailability + "</td><td>" + res.user.role_Type + "</td><td>" + res.user.user_Name + "</td><td>" + res.user.password + "</td></tr>";
                $("#driverTable").append(row);
            },
            error: function (error) {
                loadAllDrivers();
                let message = JSON.parse(error.responseText).message;
                emptyMassage(message);
            }
        })
    }

});


/**
 * Table Listener Click and Load textFields
 * */
function blindClickEventsD() {
    $("#driverTable>tr").on("click", function () {
        let user_Id = $(this).children().eq(0).text();
        let firstName = $(this).children().eq(1).text();
        let lastName = $(this).children().eq(2).text();
        let contact_No = $(this).children().eq(3).text();
        let address = $(this).children().eq(4).text();
        let email = $(this).children().eq(5).text();
        let nic_No = $(this).children().eq(6).text();
        let license_No = $(this).children().eq(7).text();
        let driverAvailability = $(this).children().eq(8).text();
        let role_Type = $(this).children().eq(9).text();
        let user_Name = $(this).children().eq(10).text();
        let password = $(this).children().eq(11).text();


        console.log(user_Id, firstName, lastName, contact_No, address, email, nic_No, license_No, driverAvailability, role_Type, user_Name,password);

        $("#user_Id").val(user_Id);
        $("#firstName").val(firstName);
        $("#lastName").val(lastName);
        $("#contact_No").val(contact_No);
        $("#address").val(address);
        $("#email").val(email);
        $("#nic_No").val(nic_No);
        $("#license_No").val(license_No);
        $("#driverAvailability").val(driverAvailability);
        $("#role_Type").val(role_Type);
        $("#user_Name").val(user_Name);
        $("#password").val(password);
    });
    $("#btnSaveDriver").attr('disabled', true);
}

/**
 * Update Action
 * */
$("#btnUpdateDriver").click(function () {
    let formData = new FormData($("#driverForm")[0]);
    console.log(formData);
    $.ajax({
        url: driverBaseUrl + "driver/update",
        method: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res)
            saveUpdateAlert("Driver", res.message);
            loadAllDrivers();
        },
        error: function (error) {
            unSuccessUpdateAlert("Driver", JSON.parse(error.responseText).message);
        }
    });
});


/**
 * Delete Action
 * */
$("#btnDeleteDriver").click(function () {
    let id = $("#user_Id").val();
    $.ajax({
        url: driverBaseUrl + "driver?id=" + id , method: "delete", dataType: "json", success: function (resp) {
            saveUpdateAlert("Driver", resp.message);
            loadAllDrivers();
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Driver", message);
        }
    });
});

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

let driverValidations = [];
driverValidations.push({
    reg: regExFirstName, field: $('#firstName'), error: 'Driver First Name Pattern is Wrong'
});
driverValidations.push({
    reg: regExLastName, field: $('#lastName'), error: 'Driver Last Name Pattern is Wrong'
});
driverValidations.push({
    reg: regExContactNum, field: $('#contact_No'), error: 'Driver Contact Number Pattern is Wrong'
});
driverValidations.push({
    reg: regExCusAddress, field: $('#address'), error: 'Driver Address Pattern is Wrong'
});
driverValidations.push({
    reg: regExEmailCusAddress, field: $('#email'), error: 'Driver Email Address Pattern is Wrong'
});
driverValidations.push({
    reg: regExNIC, field: $('#nic_No'), error: 'Driver NIC Pattern is Wrong'
});
driverValidations.push({
    reg: regExDrivingNIC, field: $('#license_No'), error: 'Driver Driving License Pattern is Wrong'
});
driverValidations.push({
    reg: regExUserName, field: $('#user_Name'), error: 'Driver User Name Pattern is Wrong'
});
driverValidations.push({
    reg: regExPassword, field: $('#password'), error: 'Driver Password Pattern is Wrong'
});
//disable tab key of all four text fields using grouping selector in CSS
$("#firstName,#lastName,#contact_No,#address,#email,#nic_No,#license_No,#user_Name,#password").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#firstName,#lastName,#contact_No,#address,#email,#nic_No,#license_No,#user_Name,#password").on('keyup', function (event) {
    checkValidity(driverValidations);
});

$("#firstName,#lastName,#contact_No,#address,#email,#nic_No,#license_No,#user_Name,#password").on('blur', function (event) {
    checkValidity(driverValidations);
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
            $('#btnSaveDriver').focus();
        }
    }
});


function setButtonState(value) {
    if (value > 0) {
        $("#btnSaveDriver").attr('disabled', true);
        $("#btnUpdateDriver").attr('disabled', true);
        $("#btnDeleteDriver").attr('disabled', true);
    } else {
        $("#btnSaveDriver").attr('disabled', false);
        $("#btnUpdateDriver").attr('disabled', false);
        $("#btnDeleteDriver").attr('disabled', false);
    }
}
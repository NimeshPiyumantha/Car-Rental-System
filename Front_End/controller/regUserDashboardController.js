/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

let RentbaseUrl = "http://localhost:8080/Back_End_war/";
loadAllRent();
$("#updateCustomer").attr('disabled', true);
/**
 * User Id Generator
 * */
generateRentID();

function generateRentID() {
    $("#rent_Id").val("REN-001");
    $.ajax({
        url: RentbaseUrl + "rent/rentIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" + id);
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#rent_Id").val("REN-00" + tempId);
            } else if (tempId <= 99) {
                $("#rent_Id").val("REN-0" + tempId);
            } else {
                $("#rent_Id").val("REN-" + tempId);
            }
        },
        error: function (ob, statusText, error) {
        }
    });
}

/**
 * Filter a data in Car Details
 * */
$("#fuel_Type").click(function () {
    let category_type = $("#category_type").val();
    let fuel_Type = $("#fuel_Type").val();
    console.log(category_type);
    console.log(fuel_Type);
    $("#car_Id").empty();
    $.ajax({
        url: RentbaseUrl + "car/filterCarDetails/?category_type=" + category_type + "&fuel_Type=" + fuel_Type,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res) {
                let car_Id = i.car_Id;

                $("#car_Id").append(`<option>${car_Id}</option>`);
            }
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            emptyMassage(message);
        }
    })
});

/**
 * Logics
 * Search
 * */
$("#car_Id").click(function () {
    var search = $("#car_Id").val();
    $.ajax({
        url: RentbaseUrl + "car/searchCar/?car_Id=" + search,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#name").val(res.name);
            $("#brand").val(res.brand);
            $("#number_Of_Passengers").val(res.number_Of_Passengers);
            let url1 = res.image.front_View;
            let url2 = res.image.back_View;
            let url3 = res.image.side_View;
            let url4 = res.image.interior;
            $("#imageLoad1").css({
                "background": `url(${RentbaseUrl + url1})`, "background-size": "cover"
            });
            $("#imageLoad2").css({
                "background": `url(${RentbaseUrl + url2})`, "background-size": "cover"
            });
            $("#imageLoad3").css({
                "background": `url(${RentbaseUrl + url3})`, "background-size": "cover"
            });
            $("#imageLoad4").css({
                "background": `url(${RentbaseUrl + url4})`, "background-size": "cover"
            });
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    })
});


/**
 * Car Details
 * */
let tableRow = [];
let car_Id;
let pickUpDate;
let pickUpTime;
let returnDate;
let returnTime;
let requestType;
let goLocation;

/**
 * Logics
 * Add cart
 * */
$("#btnAddCart").on("click", function () {
    let duplicate = false;
    for (let i = 0; i < $("#cartTable tr").length; i++) {
        if ($("#car_Id option:selected").text() === $("#cartTable tr").children(':nth-child(1)')[i].innerText) {
            duplicate = true;
        }
    }
    if (duplicate !== true) {
        loadCartTableDetail();
        $('#car_Id,#pickUpDate,#name,#brand,#number_Of_Passengers,#pickUpTime,#returnDate,#returnTime,#requestType,#location').val("");
        $("#cartTable").attr('disabled', true);

    } else if (duplicate === true) {
        $(tableRow).children(':nth-child(2)').text($("#pickUpDate").val());
        $(tableRow).children(':nth-child(3)').text($("#pickUpTime").val())
        $(tableRow).children(':nth-child(4)').text($("#returnDate").val());
        $(tableRow).children(':nth-child(5)').text($("#returnTime").val());
        $(tableRow).children(':nth-child(6)').text($("#requestType").val());
        $(tableRow).children(':nth-child(7)').text($("#location").val());

    }
    /**
     * Logics
     * Place order
     * Table Add logic
     * */
    $("#cartTable>tr").click('click', function () {
        tableRow = $(this);
        let car_Id = $(this).children(":eq(0)").text();
        let pickUpDate = $(this).children(":eq(1)").text();
        let pickUpTime = $(this).children(":eq(2)").text();
        let returnDate = $(this).children(":eq(3)").text();
        let returnTime = $(this).children(":eq(4)").text();
        let requestType = $(this).children(":eq(5)").text();
        let location = $(this).children(":eq(6)").text();

        $("#car_Id").val(car_Id);
        $("#pickUpDate").val(pickUpDate);
        $("#pickUpTime").val(pickUpTime);
        $("#returnDate").val(returnDate);
        $("#returnTime").val(returnTime);
        $("#requestType").val(requestType);
        $("#location").val(location);

    });
});

/**
 * Logics
 * Place order
 * Table Load
 * */
$("#cartTable").empty();

function loadCartTableDetail() {
    car_Id = $("#car_Id").val();
    pickUpDate = $("#pickUpDate").val();
    pickUpTime = $("#pickUpTime").val();
    returnDate = $("#returnDate").val();
    returnTime = $("#returnTime").val();
    requestType = $("#requestType").val();
    goLocation = $("#location").val();

    let row = `<tr><td>${car_Id}</td><td>${pickUpDate}</td><td>${pickUpTime}</td><td>${returnDate}</td><td>${returnTime}</td><td>${requestType}</td><td>${goLocation}</td></tr>`;

    $("#cartTable").append(row);
}

/**
 * Logics
 * Place order
 * Remove Row
 * */

$("#cartTable").dblclick(function () {
    Swal.fire({
        title: 'Do you want to Delete the Select row?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
            actions: 'my-actions', cancelButton: 'order-1 right-gap', confirmButton: 'order-2', denyButton: 'order-3',
        }
    }).then((result) => {
        if (result.isConfirmed) {
            $(this).children('tr').eq(0).remove();
            Swal.fire('Delete!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Select row are not Delete', '', 'info')
        }
    })
});

/**
 * Logics
 * Place order
 * Purchase Order button
 * */

$("#btnReservation").click(function () {
    let rentDetails = [];
    for (let i = 0; i < $("#cartTable tr").length; i++) {
        var rentDetail = {
            carID: $("#cartTable").children(`:eq(${i})`).children(":eq(0)").text(),
            rentID: $("#rent_Id").val(),
            driverID: null
        }
        rentDetails.push(rentDetail);
    }

    for (let i = 0; i < $("#cartTable tr").length; i++) {
        let rentID = $("#rent_Id").val();
        let pickUpDate = $("#cartTable").children(`:eq(${i})`).children(":eq(1)").text();
        let pickUpTime = $("#cartTable").children(`:eq(${i})`).children(":eq(2)").text();
        let returnDate = $("#cartTable").children(`:eq(${i})`).children(":eq(3)").text();
        let returnTime = $("#cartTable").children(`:eq(${i})`).children(":eq(4)").text();
        let requestType = $("#cartTable").children(`:eq(${i})`).children(":eq(5)").text();
        let rentType = "PENDING";
        let location = $("#cartTable").children(`:eq(${i})`).children(":eq(6)").text();
        let userID = $("#user_Id").val();

        let rentOB = {
            rentID: rentID,
            pickUpDate: pickUpDate,
            pickUpTime: pickUpTime,
            returnDate: returnDate,
            returnTime: returnTime,
            requestType: requestType,
            rentType: rentType,
            location: location,
            regUser: {user_Id: userID},
            rentDetails: rentDetails
        }
        console.log(rentDetails)
        console.log(rentOB)


        $.ajax({
            url: RentbaseUrl + "rent",
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(rentOB),
            success: function (res) {
                saveUpdateAlert("Rent", res.message);
                generateRentID();
                loadAllRent();
            },
            error: function (error) {
                // let message = JSON.parse(error.responseText).message;
                // unSuccessUpdateAlert("Rent", message);
            }

        });
    }
    $("#cartTable").empty();
});

/**
 * Logics
 * current user
 * */
let user;

$.ajax({
    url: RentbaseUrl + "loginForm/current", method: "get", success: function (res) {
        user = res.data.user_Id;
        console.log(res.data)
        $("#user_Id").val(res.data.user_Id);
    }
});

/**
 * Logics
 * current user profile
 * */
$.ajax({
    url: RentbaseUrl + "reg_User/loadAllUsers",
    method: "get",
    contentType: "application/json",
    dataType: "json",
    success: function (res) {
        for (var cus of res.data) {
            if (user === cus.user_Id) {
                $("#cusUserID").val(cus.user_Id);
                $("#userFirstName").val(cus.name.firstName);
                $("#userLastName").val(cus.name.lastName);
                $("#customerContactNo").val(cus.contact_No);
                $("#customerAddress").val(cus.address);
                $("#customerDriverEmail").val(cus.email);
                $("#customerNic").val(cus.nic);
                $("#customerLicence").val(cus.license_No);
                $("#customerUserName").val(cus.user.user_Name);
                $("#customerPassword").val(cus.user.password);
                let urlone = cus.nic_Img;
                let urltwo = cus.license_Img;
                $("#photoImg1").css({
                    "background": `url(${RentbaseUrl + urlone})`, "background-size": "cover"
                });
                $("#photoImg2").css({
                    "background": `url(${RentbaseUrl + urltwo})`, "background-size": "cover"
                });
            }
        }
    }
});

/**
 * Logics
 * current user update
 * */
$("#updateCustomer").click(function () {
    let formData = new FormData($("#customerDetailsForm")[0]);
    console.log(formData);
    $.ajax({
        url: RentbaseUrl + "reg_User/update",
        method: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            saveUpdateAlert("User", res.message);
            loadAllRegUsers();
        },
        error: function (error) {
            unSuccessUpdateAlert("User", JSON.parse(error.responseText).message);
        }
    });
});

/**
 * Get Rent
 * current user Rents
 * */
function loadAllRent() {
    $.ajax({
        url: RentbaseUrl + "rent/loadAllRents",
        method: "get",
        contentType: "application/json",
        dataType: "json",
        async: true,
        success: function (res) {
            console.log(res.data)
            for (var i of res.data) {
                if (user === i.regUser.user_Id) {
                    let row = "<tr><td>" + i.rentID + "</td><td>" + i.regUser.user_Id + "</td><td>" + i.rentDetails.at(car_Id).carID + "</td><td>" + i.pickUpDate + "</td><td>" + i.returnDate + "</td><td>" + i.returnTime + "</td><td>" + i.location + "</td><td>" + i.rentType + "</td></tr>";
                    $("#tblResponse").append(row);
                }
            }
            blindClickEvents();
            generateRentID();
        }
    });
}

function blindClickEvents() {
    $("#tblResponse>tr").on("click", function () {
        let user_Id = $(this).children().eq(0).text();
        $("#responseRentId").val(user_Id);
    });
}


$("#btnDeleteRental").click(function () {
    let id = $("#responseRentId").val();
    $.ajax({
        url: RentbaseUrl + "rent?id=" + id , method: "delete", dataType: "json", success: function (resp) {
            saveUpdateAlert("Rent", resp.message);
           loadAllRent();
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Rent", message);
        }
    });
});

/**
 * Auto Forces Input Fields Save
 * */
$("#userFirstName").focus();
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
    reg: regExFirstName, field: $('#userFirstName'), error: 'Customer First Name Pattern is Wrong'
});
customerValidations.push({
    reg: regExLastName, field: $('#userLastName'), error: 'Customer Last Name Pattern is Wrong'
});
customerValidations.push({
    reg: regExContactNum, field: $('#customerContactNo'), error: 'Customer Contact Number Pattern is Wrong'
});
customerValidations.push({
    reg: regExCusAddress, field: $('#customerAddress'), error: 'Customer Address Pattern is Wrong'
});
customerValidations.push({
    reg: regExEmailCusAddress, field: $('#customerDriverEmail'), error: 'Customer Email Address Pattern is Wrong'
});
customerValidations.push({
    reg: regExNIC, field: $('#customerNic'), error: 'Customer NIC Pattern is Wrong'
});
customerValidations.push({
    reg: regExDrivingNIC, field: $('#customerLicence'), error: 'Customer Driving License Pattern is Wrong'
});
customerValidations.push({
    reg: regExUserName, field: $('#customerUserName'), error: 'Customer User Name Pattern is Wrong'
});
customerValidations.push({
    reg: regExPassword, field: $('#customerPassword'), error: 'Customer Password Pattern is Wrong'
});
//disable tab key of all four text fields using grouping selector in CSS
$("#userFirstName,#userLastName,#customerContactNo,#customerAddress,#customerDriverEmail,#customerNic,#customerLicence,#customerUserName,#customerPassword").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#userFirstName,#userLastName,#customerContactNo,#customerAddress,#customerDriverEmail,#customerNic,#customerLicence,#customerUserName,#customerPassword").on('keyup', function (event) {
    checkValidity(customerValidations);
});

$("#userFirstName,#userLastName,#customerContactNo,#customerAddress,#customerDriverEmail,#customerNic,#customerLicence,#customerUserName,#customerPassword").on('blur', function (event) {
    checkValidity(customerValidations);
});

$("#userFirstName").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExFirstName, $("#userFirstName"))) {
        $("#userLastName").focus();
    } else {
        focusText($("#userFirstName"));
    }
});

$("#userLastName").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExLastName, $("#userLastName"))) {
        focusText($("#customerContactNo"));
    }
});

$("#customerContactNo").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExContactNum, $("#customerContactNo"))) {
        focusText($("#customerAddress"));
    }
});

$("#customerAddress").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress, $("#customerAddress"))) {
        if (event.which === 13) {
            focusText($("#customerDriverEmail"));
        }
    }
});

$("#customerDriverEmail").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmailCusAddress, $("#customerDriverEmail"))) {
        focusText($("#customerNic"));
    }
});

$("#customerNic").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExNIC, $("#customerNic"))) {
        focusText($("#customerLicence"));
    }
});

$("#customerLicence").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExDrivingNIC, $("#customerLicence"))) {
        if (event.which === 13) {
            focusText($("#customerUserName"));
        }
    }
});

$("#customerUserName").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExUserName, $("#customerUserName"))) {
        if (event.which === 13) {
            focusText($("#customerPassword"));
        }
    }
});

$("#customerPassword").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExPassword, $("#customerPassword"))) {
        if (event.which === 13) {
            $('#updateCustomer').focus();
        }
    }
});


function setButtonState(value) {
    if (value > 0) {
        $("#updateCustomer").attr('disabled', true);
    } else {
        $("#updateCustomer").attr('disabled', false);
    }
}
/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
/*Save Driver*/
let baseUrl = "http://localhost:8080/Back_End_war/";
loadAllDrivers();

// $("#btnSaveDriver").attr('disabled', true);

/**
 * Customer Save
 * */
$("#btnSaveDriver").click(function () {
    let formData = new FormData($("#driverForm")[0]);
    console.log(formData);
    $.ajax({
        url: baseUrl + "driver",
        method: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res)
            saveUpdateAlert("Driver", res.message);
            generateDriverID();
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
function setTextFieldValues(firstName, lastName, contact_No, address, email, nic_No, license_No, license_Img, driverAvailability, user_Name, password) {
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
    // checkValidity(driverValidations);
    $("#btnSaveDriver").attr('disabled', true);
}

/**
 * load all customers Method
 * */
function loadAllDrivers() {
    $("#driverTable").empty();
    $.ajax({
        url: baseUrl + "driver/loadAllDrivers", method: "GET", dataType: "json", success: function (res) {
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
            // blindClickEvents();
            generateDriverID();
            setTextFieldValues("", "", "", "", "", "", "", "", "", "", "", "");
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}
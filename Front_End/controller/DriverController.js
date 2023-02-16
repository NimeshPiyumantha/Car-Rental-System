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


/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
/*Save Users*/
let baseUrl = "http://localhost:8080/Back_End_war/";
$("#btnSaveCustomer").click(function () {
    let formData = $("#customerForm").serialize();
    console.log(formData);
    $.ajax({
        url: baseUrl + "reg_User",
        method: "post",
        data: formData,
        success: function (res) {
            saveUpdateAlert("User", res.message);
            generateCustomerID();
        }, error: function (error) {
            unSuccessUpdateAlert("User", JSON.parse(error.responseText).message);
        }
    });
});

generateCustomerID();
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
            console.log("id" +id);
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
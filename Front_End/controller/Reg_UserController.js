/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
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
        }, error: function (error) {
            unSuccessUpdateAlert("User", JSON.parse(error.responseText).message);
        }
    });
});
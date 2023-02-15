/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
let baseUrl = "http://localhost:8080/Back_End_war/";
$("#btnSaveCustomer").click(function () {
    let formData = $("#customerForm").serialize();
    console.log(formData);
    $.ajax({
        url: baseUrl + "customer", method: "post", data: formData, dataType: "json", success: function (res) {
            saveUpdateAlert("Customer", res.message);
            loadAllCustomer();
        }, error: function (error) {
            unSuccessUpdateAlert("Customer", JSON.parse(error.responseText).message);
        }
    });
});
/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
let userbasurl = "http://localhost:8080/Back_End_war/";

let user;

$.ajax({
    url: userbasurl + "loginForm/current",
    method: "get",
    success: function (res) {
        user = res.data.user_Id;
        console.log(res.data)
        $("#search_Id").val(res.data.user_Id);
    }
});

/**
 * Logics
 * current user profile
 * */
$.ajax({
    url: userbasurl + "driver/loadAllDrivers",
    method: "get",
    contentType: "application/json",
    dataType: "json",
    success: function (res) {
        for (var driver of res.data) {

            if (user === driver.user_Id) {
                console.log(res.data)
                $("#cusUserID").val(driver.user_Id);
                $("#userFirstName").val(driver.name.firstName);
                $("#userLastName").val(driver.name.lastName);
                $("#customerContactNo").val(driver.contact_No);
                $("#customerAddress").val(driver.address);
                $("#customerDriverEmail").val(driver.email);
                $("#customerNic").val(driver.nic_No);
                $("#customerLicence").val(driver.license_No);
                $("#customerUserName").val(driver.user.user_Name);
                $("#customerPassword").val(driver.user.password);
            }
        }
    }
});


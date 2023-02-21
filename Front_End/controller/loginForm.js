/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

let baseUrl = "http://localhost:8080/Back_End_war/";

$("#btnLogin").click(function () {
    const role_Type = $('#role_Type').val();
    const userName = $('#userName').val();
    const userPassword = $('#userPassword').val();

    $.ajax({
        url: baseUrl + "loginForm",
        method: "GET",
        contentType: "application/json",
        data :{role_Type,userName,userPassword},
        success: function (res) {
            console.log(res)

        },
        error: function (error) {
            unSuccessUpdateAlert("User Login", JSON.parse(error.responseText).message);
        }
    });
});
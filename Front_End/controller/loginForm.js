/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

let baseUrlLogin = "http://localhost:8080/Back_End_war/";


/**
 * load all customers Method
 * */

$("#btnLogin").on('click', function () {
    login();
});

function login() {
    let role_Type = $('#role_Type').val();
    let user_Name = $('#user_Name').val();
    let password = $('#password').val();

    $.ajax({
        url: baseUrlLogin + "loginForm/?role_Type="+role_Type+"&user_Name="+user_Name+"&password="+password,
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            for (var login of res) {
                  if (role_Type === "DRIVER" && user_Name === login.user_Name && password === login.password) {
                        window.location.href = 'driverDashboard.html';
                    } else if (role_Type === "REGISTERED_USER" && user_Name === login.user_Name && password === login.password) {
                        window.location.href = 'reg_UserDashboard.html';
                    } else if (role_Type === "ADMIN" && user_Name === login.user_Name && password === login.password) {
                        window.location.href = 'adminDashboard.html';
                    }
                    return;
                }
            }
    });
}

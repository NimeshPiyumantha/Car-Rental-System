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
    let loginRole_Type = $("#role_Type").val();
    let loginUserName = $("#user_Name").val();
    let loginPassword = $("#password").val();

    $.ajax({
        url: baseUrlLogin + "loginForm",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            for (var login of res.data) {
                if (loginRole_Type === login.role_Type && loginUserName === login.user_Name && loginPassword === login.password) {
                    if (loginRole_Type === "DRIVER" && loginUserName === login.user_Name && loginPassword === login.password) {
                        $.ajax({
                            url: baseUrlLogin + "loginForm/?username=" + loginUserName + "&password=" + loginPassword,
                            data:res.data,
                            method:"get",
                            success:function (res1) {
                            }
                        })
                        window.location.href = 'driverDashboard.html';
                    } else if (loginRole_Type === "REGISTERED_USER" && loginUserName === login.user_Name && loginPassword === login.password) {
                        $.ajax({
                            url: baseUrlLogin + "loginForm/?username=" + loginUserName + "&password=" + loginPassword,
                            data:res.data,
                            method:"get",
                            success:function (res1) {
                            }
                        });
                        window.location.href = 'reg_UserDashboard.html';
                    } else if (loginRole_Type === "ADMIN" && loginUserName === login.user_Name && loginPassword === login.password) {
                        window.location.href = 'adminDashboard.html';
                    }
                    return;
                }
            }
        }
    });
}
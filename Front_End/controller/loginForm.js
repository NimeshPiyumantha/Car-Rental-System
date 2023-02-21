/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

let baseUrl = "http://localhost:8080/Back_End_war/";


/**
 * load all customers Method
 * */
$("#btnLogin").click(function () {
    let role_Type = $('#role_Type').val();
    let user_Name = $('#user_Name').val();
    let password = $('#password').val();

    $.ajax({
        url: baseUrl + "loginForm", method: "GET", contentType: "application/json", success: function (res) {

            for (let login of res.data) {
                    if (role_Type === login.role_Type && user_Name.trim() === login.user_Name && password.trim() === login.password) {
                        console.log(role_Type);
                        console.log(user_Name);
                        console.log(password);

                    } else {

                    }
            }

        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
});



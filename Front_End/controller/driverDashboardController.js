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
        user = res.data;
        console.log(res.data)
        $("#search_Id").val(res.data.user_Id);
    }
});


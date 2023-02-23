/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

let baseUrl = "http://localhost:8080/Back_End_war/";

$.ajax({
    url: baseUrl + "loginForm/available",
    method: "GET",
    success: function (res) {
        console.log(res.data)
    }//omda ow Poddak kalpana karala kiyanna ona bn Uba mn hadapu widiyata newei hadala thiyenne ekai calllgnimko
});
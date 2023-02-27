/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
let baseUrlIncome = "http://localhost:8080/Back_End_war/";

$.ajax({
    url: baseUrlIncome + "income/dailyIncome",
    method: "GET",
    dataType: "json",
    success: function (res) {
        console.log(res);
    }

});
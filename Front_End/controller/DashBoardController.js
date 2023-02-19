/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

let baseUrl = "http://localhost:8080/Back_End_war/";

$("#carCount").val("00");
$.ajax({
    url: baseUrl + "car/carCount",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#carCount").text(num);

    },
    error: function (ob, statusText, error) {

    }
});

$("#driverCount").val("00");
$.ajax({
    url: baseUrl + "driver/driverCount",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#driverCount").text(num);

    },
    error: function (ob, statusText, error) {

    }
});
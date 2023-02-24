/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

let dashboard = "http://localhost:8080/Back_End_war/";

/**
 * Car Count
 * */
$("#carCount").val("00");
$.ajax({
    url: dashboard + "car/carCount",
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

/**
 * Available Car Count
 * */
$("#availableCarCount").val("00");
$.ajax({
    url: dashboard + "car/availablCarCount",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#availableCarCount").text(num);
    },
    error: function (ob, statusText, error) {
    }
});

/**
 * Driver Count
 * */
$("#driverCount").val("00");
$.ajax({
    url: dashboard + "driver/driverCount",
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

/**
 * User Count
 * */
$("#customerCount").val("00");
$.ajax({
    url: dashboard + "reg_User/customerCount",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#customerCount").text(num);

    },
    error: function (ob, statusText, error) {

    }
});
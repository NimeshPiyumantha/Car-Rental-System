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
 * Reserved Car Count
 * */
$("#reservedCarCount").val("00");
$.ajax({
    url: dashboard + "car/reservedCarCount",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#reservedCarCount").text(num);
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
 * Driver Available Count
 * */
$("#availableDriverCount").val("00");
$.ajax({
    url: dashboard + "driver/driverAvailableCount",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#availableDriverCount").text(num);

    },
    error: function (ob, statusText, error) {

    }
});

/**
 * Driver Unavailable Count
 * */
$("#unAvailableDriverCount").val("00");
$.ajax({
    url: dashboard + "driver/driverUnavailableCount",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#unAvailableDriverCount").text(num);

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

/**
 * Booking Count
 * */
$("#BookingCount").val("00");
$.ajax({
    url: dashboard + "rent/booking",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#BookingCount").text(num);

    },
    error: function (ob, statusText, error) {

    }
});

/**
 * Booking Pending Count
 * */
$("#BookingPendingCount").val("00");
$.ajax({
    url: dashboard + "rent/bookingPending",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#BookingPendingCount").text(num);

    },
    error: function (ob, statusText, error) {

    }
});

/**
 * Booking Active Count
 * */
$("#BookingActiveCount").val("00");
$.ajax({
    url: dashboard + "rent/bookingActive",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#BookingActiveCount").text(num);

    },
    error: function (ob, statusText, error) {

    }
});

/**
 * Maintain Car Count
 * */
$("#maintainCarCount").val("00");
$.ajax({
    url: dashboard + "car/maintainCar",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#maintainCarCount").text(num);

    },
    error: function (ob, statusText, error) {

    }
});

/**
 * Under Maintain Car Count
 * */
$("#underMaintainCarCount").val("00");
$.ajax({
    url: dashboard + "car/underMaintainCar",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#underMaintainCarCount").text(num);

    },
    error: function (ob, statusText, error) {

    }
});
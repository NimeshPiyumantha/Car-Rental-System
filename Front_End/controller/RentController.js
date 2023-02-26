/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
let RentAllManageBaseUrl = "http://localhost:8080/Back_End_war/";
loadAllRentDetails();

/**
 * All Rent Details load
 **/

function loadAllRentDetails() {
    $.ajax({
        url: RentAllManageBaseUrl + "rent/loadAllRents",
        method: "get",
        contentType: "application/json",
        dataType: "json",
        async: true,
        success: function (res) {
            console.log(res.data)
            for (var i of res.data) {
                let row = "<tr><td>" + i.rentID + "</td><td>" + i.rentDetails.at().carID + "</td><td>" + i.regUser.user_Id + "</td><td>" + i.rentDetails.at().driverID + "</td><td>" + i.requestType + "</td><td>" + i.rentType + "</td><td>" + i.pickUpDate + "</td><td>" + i.pickUpTime + "</td><td>" + i.returnTime + "</td><td>" + i.returnDate + "</td><td>" + i.location + "</td></tr>";
                $("#rentAllDetails").append(row);
                $("#retManage").append(row);
                blindClickEventsRent();
            }
        }
    });
}

function blindClickEventsRent() {
    $("#retManage>tr").on("click", function () {
        let requestRentId = $(this).children().eq(0).text();
        let driverId = $(this).children().eq(3).text();
        let userID = $(this).children().eq(2).text();
        let requestState = $(this).children().eq(5).text();

        $("#requestRentId").val(requestRentId);
        $("#driverId").val(driverId);
        $("#userID").val(userID);
        $("#requestState").val(requestState);

        $("#rentID").val(requestRentId);
    });
}

$.ajax({
    url: RentAllManageBaseUrl + "driver/loadAvalabilityDrivers",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (res) {
        console.log(res.data);

        for (let i of res.data) {
            let driverId = i.user_Id;

            $("#driverId").append(`<option>${driverId}</option>`);
        }
    },
    error: function (error) {
        let message = JSON.parse(error.responseText).message;
        emptyMassage(message);
    }
});

$("#btnAccept").on("click", function () {
    let rentID = $("#requestRentId").val();
    let driverID = $("#driverId").val();
    $.ajax({
        url: RentAllManageBaseUrl + "rent/rentConfrom/?rentID=" + rentID + "&driverId=" + driverID,
        method: "post",
        dataType: "json",
        success: function (res) {
            saveUpdateAlert("Booking Conform", res.message);
            $("#retManage").empty();
            loadAllRentDetails();
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            emptyMassage(message);
        }
    });

});

$("#btnReject").on("click", function () {
    let rentID = $("#requestRentId").val();
    let driverID = $("#driverId").val();
    $.ajax({
        url: RentAllManageBaseUrl + "rent/rentReject/?rentID=" + rentID + "&driverId=" + driverID,
        method: "post",
        dataType: "json",
        success: function (res) {
            saveUpdateAlert("Booking Reject", res.message);
            $("#retManage").empty();
            loadAllRentDetails();
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            emptyMassage(message);
        }
    });

});

/**
 * Payment ID Generator
 * */
function generatePaymentID() {
    $("#paymentID").val("PAY-001");
    $.ajax({
        url: RentAllManageBaseUrl + "payment/paymentIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" + id);
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#paymentID").val("PAY-00" + tempId);
            } else if (tempId <= 99) {
                $("#paymentID").val("PAY-0" + tempId);
            } else {
                $("#paymentID").val("PAY-" + tempId);
            }
        },
        error: function (ob, statusText, error) {
        }
    });
}

generatePaymentID();
/**
 * Logics
 * Local Date And Time set
 * Enter Cash and Balance display
 * */
/*$(document).ready(function () {
    var date = new Date(); // get current date and time
    var localDate = Date.now(); // get local date in string format
    var localTime = Date.now(); // get local time in string format ethana bn date picker ekak
    $('#date').val(localDate); // set date text in element with ID "date"
    $('#time').val(localTime); // set time text in element with ID "time"
});*/


/**
 * Logics
 * Rent
 * Enter Cash and Balance display
 * */

$(document).on("change keyup blur", "#lostDamage,#rentFee,#driverFee", function () {
    /**
     * Payment Details
     * */
    let lostDamage = $('#lostDamage').val();
    let carFee = $('#rentFee').val();
    let driverFee = $('#driverFee').val();

    $("#total").val(parseFloat(lostDamage) + parseFloat(carFee) + parseFloat(driverFee));

});

$("#btnPay").on("click", function () {
    /*let rentID = $("#rentID").val();
    // let formData = new FormData($("#PayementToRent")[0]);
    let formData = $("#PayementToRent").serialize();
    console.log(formData);*/

    let paymentId = $("#paymentID").val();
    let rentID = $("#rentID").val();
    let paymentType = $("#paymentType").val();
    let paymentDate = $("#date").val();
    let paymentTime = $("#time").val();
    let lostDamage = $("#lostDamage").val();
    let carFee = $("#rentFee").val();
    let driverFee = $("#driverFee").val();
    let total = $("#total").val();

    var paymentOb = {
        paymentID: paymentId,
        rentID:{
            rentID: rentID
        },
        paymentType: paymentType,
        date: paymentDate,
        time: paymentTime,
        lostDamage: lostDamage,
        rentFee: carFee,
        driverFee: driverFee,
        total: total,
    }


    $.ajax({
        url: RentAllManageBaseUrl + "payment/?rentID="+rentID,
        method: "POST",
        data: JSON.stringify(paymentOb),
        dataType: "json",
        contentType:"application/json",
        success: function (res) {
            console.log(res)
            saveUpdateAlert("Payment", res.message);
            generatePaymentID();
        },
        error: function (error) {
            unSuccessUpdateAlert("Payment", JSON.parse(error.responseText).message);
        }
    });
});

$.ajax({
    url: RentAllManageBaseUrl + "payment",
    method: "GET",
    dataType: "json",
    contentType:"application/json",
    success: function (res) {
        console.log(res.data);
        for (let i of res.data) {
            let row = "<tr><td>" + i.paymentID + "</td><td>" + i.rentID.rentID + "</td><td>" + i.rentID.regUser.user_Id + "</td><td>" + i.paymentType + "</td><td>" + i.date + "</td><td>" + i.time + "</td><td>" + i.total + "</td></tr>";
            $("#paymentTable").append(row);
        }
    },
    error: function (error) {
    }
});



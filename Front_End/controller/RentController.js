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
    $("#rentAllDetails").empty();
    $("#retManage").empty();
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

/**
 * Search Rents
 * */
$("#search_Id").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#search_Id").val();
        $("#retManage").empty();
        $.ajax({
            url: RentAllManageBaseUrl + "rent/searchDtails?search_Id=" + search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (i) {
                console.log(i);
                console.log(i.rentID)
                let row = "<tr><td>" + i.rentID + "</td><td>" + i.rentDetails.at().carID + "</td><td>" + i.regUser.user_Id + "</td><td>" + i.rentDetails.at().driverID + "</td><td>" + i.requestType + "</td><td>" + i.rentType + "</td><td>" + i.pickUpDate + "</td><td>" + i.pickUpTime + "</td><td>" + i.returnTime + "</td><td>" + i.returnDate + "</td><td>" + i.location + "</td></tr>";
                $("#retManage").append(row);
                blindClickEventsRent();
            },
            error: function (error) {
                loadAllRentDetails();
                let message = JSON.parse(error.responseText).message;
                emptyMassage(message);
            }
        })
    }

});
let carID;

function blindClickEventsRent() {
    $("#retManage>tr").on("click", function () {
        let requestRentId = $(this).children().eq(0).text();
        let driverId = $(this).children().eq(3).text();
        let userID = $(this).children().eq(2).text();
        let requestState = $(this).children().eq(5).text();
        carID = $(this).children().eq(1).text();


        $("#requestRentId").val(requestRentId);
        $("#driverId").val(driverId);
        $("#userID").val(userID);
        $("#requestState").val(requestState);

        $("#rentID").val(requestRentId);
        $("#driverId").append(`<option>${driverId}</option>`);
        loadAllCars();
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
$(document).ready(function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var formattedDate = year + "-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");
    var formattedTime = hour.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0") + ":" + second.toString().padStart(2, "0");
    var date = formattedDate;
    var time = formattedTime;
    $('#date').val(date); // set date text in element with ID "date"
    $('#time').val(time); // set time text in element with ID "time"
});


/**
 * Logics
 * Rent
 * Enter Cash and Balance display
 * */
function loadAllCars() {
    $.ajax({
        url: RentAllManageBaseUrl + "car/searchCar/?car_Id=" + carID,
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            $('#rentFee').val(res.rent_Duration_Price.daily_Rate);
            let mileagePrice = res.price_Extra_KM;
            let freeMileage = res.free_Mileage;

            $(document).on("change keyup blur","#days,#lostDamage,#rentFee,#driverFee,#mileage", function () {
                /**
                 * Payment Details
                 * */
                let lostDamage = $('#lostDamage').val();
                let carFee = $('#rentFee').val();
                let driverFee = $('#driverFee').val();
                let mileage = $('#mileage').val();
                let days = $('#days').val();
                let mileageCost;
                let m = parseFloat(mileage) / parseFloat(days);
                console.log(m);
                if (m => freeMileage) {
                    let mileageSize = parseFloat(mileage) - (parseFloat(days)*parseFloat(freeMileage));
                    mileageCost = parseFloat(mileageSize) * parseFloat(mileagePrice);

                    let carTotal = parseFloat(carFee) * parseFloat(days);
                    let driverTotal = parseFloat(driverFee) * parseFloat(days);

                    $("#total").val(parseFloat(lostDamage) + parseFloat(carTotal) + parseFloat(driverTotal) + mileageCost);

                }
                if (m < freeMileage) {

                    let carTotal = parseFloat(carFee) * parseFloat(days);
                    let driverTotal = parseFloat(driverFee) * parseFloat(days);

                    $("#total").val(parseFloat(lostDamage) + parseFloat(carTotal) + parseFloat(driverTotal));
                }
            });

        }
    });
}

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
        rentID: {
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
        url: RentAllManageBaseUrl + "payment/?rentID=" + rentID,
        method: "POST",
        data: JSON.stringify(paymentOb),
        dataType: "json",
        contentType: "application/json",
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
    contentType: "application/json",
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
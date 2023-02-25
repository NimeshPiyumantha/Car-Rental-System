/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
let RentAllManageBaseUrl = "http://localhost:8080/Back_End_war/";

/**
 * All Rent Details load
 **/
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
    });
}

$.ajax({
    url: RentAllManageBaseUrl + "driver/loadAllDrivers",
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
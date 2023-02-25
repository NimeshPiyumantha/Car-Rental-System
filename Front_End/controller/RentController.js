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
                let row = "<tr><td>" + i.rentID + "</td><td>" + i.rentDetails.at().carID + "</td><td>" + i.regUser.user_Id + "</td><td>" + i.rentDetails.at().driverID + "</td><td>" + i.requestType + "</td><td>" + i.pickUpDate + "</td><td>" + i.pickUpTime + "</td><td>" + i.returnTime + "</td><td>" + i.returnDate + "</td><td>" + i.location + "</td></tr>";
                $("#rentAllDetails").append(row);
        }
    }
});
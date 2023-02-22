/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

let baseUrl = "http://localhost:8080/Back_End_war/";

/**
 * User Id Generator
 * */
generateRentID();

function generateRentID() {
    $("#rent_Id").val("REN-001");
    $.ajax({
        url: baseUrl + "rent/rentIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" + id);
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#rent_Id").val("REN-00" + tempId);
            } else if (tempId <= 99) {
                $("#rent_Id").val("REN-0" + tempId);
            } else {
                $("#rent_Id").val("REN-" + tempId);
            }
        },
        error: function (ob, statusText, error) {
        }
    });
}

/**
 * Filter a data in Car Details
 * */
$("#fuel_Type").click(function () {
    let category_type = $("#category_type").val();
    let fuel_Type = $("#fuel_Type").val();
    console.log(category_type);
    console.log(fuel_Type);
    $("#car_Id").empty();
    $.ajax({
        url: baseUrl + "car/filterCarDetails/?category_type="+category_type+"&fuel_Type="+fuel_Type,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res) {
                let car_Id = i.car_Id;

                $("#car_Id").append(`<option>${car_Id}</option>`);
            }
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            emptyMassage(message);
        }
    })
});


$("#car_Id").click(function () {
    var search = $("#car_Id").val();
    $.ajax({
        url: baseUrl + "car/searchCar/?car_Id=" + search,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#name").val(res.name);
            $("#brand").val(res.brand);
            $("#number_Of_Passengers").val(res.number_Of_Passengers);
            let url = res.image.front_View;
            console.log(url);
            console.log(res.image.front_View);
            $("#imageLoad").css({
                "background": `url(${baseUrl + url})`,
                "background-size": "cover",
                "height": '100%'
            });
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    })
});


/**
 * Car Details
 * */
let tableRow = [];
let car_Id;
let pickUpDate;
let pickUpTime;
let returnDate;
let returnTime;
let requestType;
let goLocation;

/**
 * Logics
 * Place order
 * */
$("#btnAddCart").on("click", function () {
    let duplicate = false;
    for (let i = 0; i < $("#cartTable tr").length; i++) {
        if ($("#car_Id option:selected").text() === $("#cartTable tr").children(':nth-child(1)')[i].innerText) {
            duplicate = true;
        }
    }
    if (duplicate !== true) {
        loadCartTableDetail();
        $('#car_Id,#pickUpDate,#name,#brand,#number_Of_Passengers,#pickUpTime,#returnDate,#returnTime,#requestType,#location').val("");
        $("#cartTable").attr('disabled', true);

    } else if (duplicate === true) {
        $(tableRow).children(':nth-child(2)').text($("#pickUpDate").val());
        $(tableRow).children(':nth-child(3)').text($("#pickUpTime").val())
        $(tableRow).children(':nth-child(4)').text($("#returnDate").val());
        $(tableRow).children(':nth-child(5)').text($("#returnTime").val());
        $(tableRow).children(':nth-child(6)').text($("#requestType").val());
        $(tableRow).children(':nth-child(7)').text($("#location").val());

    }



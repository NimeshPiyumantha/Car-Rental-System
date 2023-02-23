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
        url: baseUrl + "car/filterCarDetails/?category_type=" + category_type + "&fuel_Type=" + fuel_Type,
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

/**
 * Logics
 * Search
 * */
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
                "background-size": "cover"

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
 * Add cart
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
    /**
     * Logics
     * Place order
     * Table Add logic
     * */
    $("#cartTable>tr").click('click', function () {
        tableRow = $(this);
        let car_Id = $(this).children(":eq(0)").text();
        let pickUpDate = $(this).children(":eq(1)").text();
        let pickUpTime = $(this).children(":eq(2)").text();
        let returnDate = $(this).children(":eq(3)").text();
        let returnTime = $(this).children(":eq(4)").text();
        let requestType = $(this).children(":eq(5)").text();
        let location = $(this).children(":eq(6)").text();

        $("#car_Id").val(car_Id);
        $("#pickUpDate").val(pickUpDate);
        $("#pickUpTime").val(pickUpTime);
        $("#returnDate").val(returnDate);
        $("#returnTime").val(returnTime);
        $("#requestType").val(requestType);
        $("#location").val(location);

    });
});

/**
 * Logics
 * Place order
 * Table Load
 * */
$("#cartTable").empty();

function loadCartTableDetail() {
    car_Id = $("#car_Id").val();
    pickUpDate = $("#pickUpDate").val();
    pickUpTime = $("#pickUpTime").val();
    returnDate = $("#returnDate").val();
    returnTime = $("#returnTime").val();
    requestType = $("#requestType").val();
    goLocation = $("#location").val();

    let row = `<tr><td>${car_Id}</td><td>${pickUpDate}</td><td>${pickUpTime}</td><td>${returnDate}</td><td>${returnTime}</td><td>${requestType}</td><td>${goLocation}</td></tr>`;

    $("#cartTable").append(row);
}

/**
 * Logics
 * Place order
 * Remove Row
 * */

$("#cartTable").dblclick(function () {
    Swal.fire({
        title: 'Do you want to Delete the Select row?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
        }
    }).then((result) => {
        if (result.isConfirmed) {
            $(this).children('tr').eq(0).remove();
            Swal.fire('Delete!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Select row are not Delete', '', 'info')
        }
    })
});

/**
 * Logics
 * Place order
 * Purchase Order button
 * */

$("#btnReservation").click(function () {

    let rent_Details = [];
    for (let i = 0; i < $("#cartTable tr").length; i++) {
        var rentDetail = {
            car_Id:  $("#cartTable").children(`:eq(${i})`).children(":eq(0)").text(),
            rent_Id: $("#rent_Id").val()
        }
        rent_Details.push(rentDetail);
    }

    for (let i = 0; i < $("#cartTable tr").length; i++) {
        let rent_Id = $("#rent_Id").val();
        // $("#cartTable").parent().parent().children(`:eq(${i})`).children(":eq(0)").text(),
        let pickUpDate =  $("#cartTable").children(`:eq(${i})`).children(":eq(1)").text();
        let pickUpTime =  $("#cartTable").children(`:eq(${i})`).children(":eq(2)").text();
        let returnDate =  $("#cartTable").children(`:eq(${i})`).children(":eq(3)").text();
        let returnTime =  $("#cartTable").children(`:eq(${i})`).children(":eq(4)").text();
        let requestType = $("#cartTable").children(`:eq(${i})`).children(":eq(5)").text();
        let rentType = "PENDING";
        let location =  $("#cartTable").children(`:eq(${i})`).children(":eq(6)").text();
        let user_Id = $("#user_Id").val();

        let rentOB = {
            rent_Id: rent_Id,
            pickUpDate: pickUpDate,
            pickUpTime: pickUpTime,
            returnDate: returnDate,
            returnTime: returnTime,
            requestType: requestType,
            rentType: rentType,
            location: location,
            user: user_Id,
            rent_Details: rent_Details
        }
        console.log(rent_Details)
        console.log(rentOB)

        $.ajax({
            url: baseUrl + "rent",
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(rentOB),
            success: function (res) {
                saveUpdateAlert("Rent", res.message);
                generateRentID();
            },
            error: function (error) {
                let message = JSON.parse(error.responseText).message;
                unSuccessUpdateAlert("Rent", message);
            }

        });
    }
});
/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

let carBaseUrl = "http://localhost:8080/Back_End_war/";
loadAllCars();

$("#btnSaveCar").attr('disabled', true);
$("#btnUpdateCar").attr('disabled', true);
$("#btnDeleteCar").attr('disabled', true);

/**
 * Car Save
 * */
$("#btnSaveCar").click(function () {
    let formData = new FormData($("#carForm")[0]);
    console.log(formData);
    $.ajax({
        url: carBaseUrl + "car",
        method: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res)
            saveUpdateAlert("Car", res.message);
            loadAllCars();
        },
        error: function (error) {
            unSuccessUpdateAlert("Car", JSON.parse(error.responseText).message);
        }
    });
});

/**
 * Car Id Generator
 * */
function generateCarID() {
    $("#car_Id").val("CAR-001");
    $.ajax({
        url: carBaseUrl + "car/carIDGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" + id);
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#car_Id").val("CAR-00" + tempId);
            } else if (tempId <= 99) {
                $("#car_Id").val("CAR-0" + tempId);
            } else {
                $("#car_Id").val("CAR-" + tempId);
            }
        },
        error: function (ob, statusText, error) {
        }
    });
}

/**
 * clear input fields Values Method
 * */
function setTextFieldValuesC(name, brand, type, front_View, back_View, side_View, interior, number_Of_Passengers, transmission_Type, fuel_Type, daily_Rate, monthly_Rate, price_Extra_KM, registration_Number, free_Mileage, color, vehicleAvailabilityType) {
    $("#name").val(name);
    $("#brand").val(brand);
    $("#type").val(type);
    $("#front_View").val(front_View);
    $("#back_View").val(back_View);
    $("#side_View").val(side_View);
    $("#interior").val(interior);
    $("#number_Of_Passengers").val(number_Of_Passengers);
    $("#transmission_Type").val(transmission_Type);
    $("#fuel_Type").val(fuel_Type);
    $("#daily_Rate").val(daily_Rate);
    $("#monthly_Rate").val(monthly_Rate);
    $("#price_Extra_KM").val(price_Extra_KM);
    $("#registration_Number").val(registration_Number);
    $("#free_Mileage").val(free_Mileage);
    $("#color").val(color);
    $("#vehicleAvailabilityType").val(vehicleAvailabilityType);

    $("#name").focus();
    checkValidity(carValidations);
    $("#btnSaveCar").attr('disabled', true);
}

/**
 * load all customers Method
 * */
function loadAllCars() {
    $("#carTable").empty();
    $.ajax({
        url: carBaseUrl + "car/loadAllCars", method: "GET", dataType: "json", success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let car_Id = i.car_Id;
                let name = i.name;
                let brand = i.brand;
                let type = i.type;
                let front_View = i.image.front_View;
                let back_View = i.image.back_View;
                let side_View = i.image.side_View;
                let interior = i.image.interior;
                let number_Of_Passengers = i.number_Of_Passengers;
                let transmission_Type = i.transmission_Type;
                let fuel_Type = i.fuel_Type;
                let daily_Rate = i.rent_Duration_Price.daily_Rate;
                let monthly_Rate = i.rent_Duration_Price.monthly_Rate;
                let price_Extra_KM = i.price_Extra_KM;
                let registration_Number = i.registration_Number;
                let free_Mileage = i.free_Mileage;
                let color = i.color;
                let vehicleAvailabilityType = i.vehicleAvailabilityType;


                let row = "<tr><td>" + car_Id + "</td><td>" + name + "</td><td>" + brand + "</td><td>" + type + "</td><td>" + number_Of_Passengers + "</td><td>" + transmission_Type + "</td><td>" + fuel_Type + "</td><td>" + daily_Rate + "</td><td>" + monthly_Rate + "</td><td>" + price_Extra_KM + "</td><td>" + registration_Number + "</td><td>" + free_Mileage + "</td><td>" + color + "</td><td>" + vehicleAvailabilityType + "</td></tr>";
                $("#carTable").append(row);
                console.log(row);
            }
            blindClickEventsC();
            generateCarID();
            setTextFieldValuesC("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
}

/**
 * Search id and Load Table
 * */
$("#search_Id").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#search_Id").val();
        $("#carTable").empty();
        $.ajax({
            url: carBaseUrl + "car/searchCar/?car_Id=" + search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                $("#car_Id").val(res.car_Id);
                $("#name").val(res.name);
                $("#brand").val(res.brand);
                $("#type").val(res.type);
                $("#front_View").prop(res.image.front_View);
                $("#back_View").prop(res.image.back_View);
                $("#side_View").prop(res.image.side_View);
                $("#interior").prop(res.image.interior);
                $("#number_Of_Passengers").val(res.number_Of_Passengers);
                $("#transmission_Type").val(res.transmission_Type);
                $("#fuel_Type").val(res.fuel_Type);
                $("#daily_Rate").val(res.rent_Duration_Price.daily_Rate);
                $("#monthly_Rate").val(res.rent_Duration_Price.monthly_Rate);
                $("#price_Extra_KM").val(res.price_Extra_KM);
                $("#registration_Number").val(res.registration_Number);
                $("#free_Mileage").val(res.free_Mileage);
                $("#color").val(res.color);
                $("#vehicleAvailabilityType").val(res.vehicleAvailabilityType);

                let row = "<tr><td>" + res.car_Id + "</td><td>" + res.name + "</td><td>" + res.brand + "</td><td>" + res.type + "</td><td>" + res.number_Of_Passengers + "</td><td>" + res.transmission_Type + "</td><td>" + res.fuel_Type + "</td><td>" + res.rent_Duration_Price.daily_Rate + "</td><td>" + res.rent_Duration_Price.monthly_Rate + "</td><td>" + res.price_Extra_KM + "</td><td>" + res.registration_Number + "</td><td>" + res.free_Mileage + "</td><td>" + res.color + "</td><td>" + res.vehicleAvailabilityType + "</td></tr>";
                $("#carTable").append(row);
            },
            error: function (error) {
                loadAllCars();
                let message = JSON.parse(error.responseText).message;
                emptyMassage(message);
            }
        })
    }

});


/**
 * Table Listener Click and Load textFields
 * */
function blindClickEventsC() {
    $("#carTable>tr").on("click", function () {
        let car_Id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let brand = $(this).children().eq(2).text();
        let type = $(this).children().eq(3).text();
        let number_Of_Passengers = $(this).children().eq(4).text();
        let transmission_Type = $(this).children().eq(5).text();
        let fuel_Type = $(this).children().eq(6).text();
        let daily_Rate = $(this).children().eq(7).text();
        let monthly_Rate = $(this).children().eq(8).text();
        let price_Extra_KM = $(this).children().eq(9).text();
        let registration_Number = $(this).children().eq(10).text();
        let free_Mileage = $(this).children().eq(11).text();
        let color = $(this).children().eq(12).text();
        let vehicleAvailabilityType = $(this).children().eq(13).text();


        console.log(car_Id, name, brand, type, number_Of_Passengers, transmission_Type, fuel_Type, daily_Rate, monthly_Rate, price_Extra_KM, registration_Number, free_Mileage, color, vehicleAvailabilityType);

        $("#car_Id").val(car_Id);
        $("#name").val(name);
        $("#brand").val(brand);
        $("#type").val(type);
        $("#number_Of_Passengers").val(number_Of_Passengers);
        $("#transmission_Type").val(transmission_Type);
        $("#fuel_Type").val(fuel_Type);
        $("#daily_Rate").val(daily_Rate);
        $("#monthly_Rate").val(monthly_Rate);
        $("#price_Extra_KM").val(price_Extra_KM);
        $("#registration_Number").val(registration_Number);
        $("#free_Mileage").val(free_Mileage);
        $("#color").val(color);
        $("#vehicleAvailabilityType").val(vehicleAvailabilityType);
    });
    $("#btnSaveCar").attr('disabled', true);
}

$("#btnUpdateCar").click(function () {
    let formData = new FormData($("#carForm")[0]);
    console.log(formData);
    $.ajax({
        url: carBaseUrl + "car/update",
        method: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res)
            saveUpdateAlert("Car", res.message);
            loadAllCars();
        },
        error: function (error) {
            unSuccessUpdateAlert("Car", JSON.parse(error.responseText).message);
        }
    });
});

/**
 * Delete Action
 * */
$("#btnDeleteCar").click(function () {
    let id = $("#car_Id").val();
    $.ajax({
        url: carBaseUrl + "car?id=" + id + "", method: "delete", dataType: "json", success: function (resp) {
            saveUpdateAlert("Car", resp.message);
            loadAllCars();
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Car", message);
        }
    });
});

/**
 * Auto Forces Input Fields Save
 * */
$("#name").focus();
const regExBrand = /^[A-z ]{3,20}$/;
const regExModel = /^[A-z 0-9]{3,20}$/;
const regExType = /^[A-z ]{3,20}$/;
const regExNoPassengers = /^[0-9 ]{1,2}$/;
const regExTransmissionType = /^[A-z ]{3,20}$/;
const regExFuelType = /^[A-z ]{3,20}$/;
const regExDailyRate = /^[0-9 ]{1,20}$/;
const regExMonthlyRate = /^[0-9 ]{1,20}$/;
const regExKM = /^[0-9 ]{1,4}$/;
const regExRegNumber = /^[A-Z]{3}-?\d{3}|^\d{3}-?[A-Z]{3}$/;
const regExMileage = /^[0-9 ]{1,4}$/;
const regExColor = /^[A-z ]{3,20}$/;

let carValidations = [];
carValidations.push({
    reg: regExBrand, field: $('#name'), error: 'Car Brand Name Pattern is Wrong'
});
carValidations.push({
    reg: regExModel, field: $('#brand'), error: 'Car Model Name Pattern is Wrong'
});
carValidations.push({
    reg: regExType, field: $('#type'), error: 'Car Type Pattern is Wrong'
});
carValidations.push({
    reg: regExNoPassengers, field: $('#number_Of_Passengers'), error: 'Car Passengers Pattern is Wrong'
});
carValidations.push({
    reg: regExTransmissionType, field: $('#transmission_Type'), error: 'Car Transmission Type Pattern is Wrong'
});
carValidations.push({
    reg: regExFuelType, field: $('#fuel_Type'), error: 'Car Fuel Type is Wrong'
});
carValidations.push({
    reg: regExDailyRate, field: $('#daily_Rate'), error: 'Car Daily Rate Pattern is Wrong'
});
carValidations.push({
    reg: regExMonthlyRate, field: $('#monthly_Rate'), error: 'Car Monthly Rate Pattern is Wrong'
});
carValidations.push({
    reg: regExKM, field: $('#price_Extra_KM'), error: 'Car Price Extra KM Pattern is Wrong'
});
carValidations.push({
    reg: regExRegNumber,
    field: $('#registration_Number'),
    error: 'Car Register Number Pattern is Wrong (CDF-001/123-DFG)'
});
carValidations.push({
    reg: regExMileage, field: $('#free_Mileage'), error: 'Car Free Mileage Pattern is Wrong'
});
carValidations.push({
    reg: regExColor, field: $('#color'), error: 'Car Color Pattern is Wrong'
});

//disable tab key of all four text fields using grouping selector in CSS
$("#name,#brand,#type,#number_Of_Passengers,#transmission_Type,#fuel_Type,#daily_Rate,#monthly_Rate,#price_Extra_KM,#registration_Number,#free_Mileage,#color").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#name,#brand,#type,#number_Of_Passengers,#transmission_Type,#fuel_Type,#daily_Rate,#monthly_Rate,#price_Extra_KM,#registration_Number,#free_Mileage,#color").on('keyup', function (event) {
    checkValidity(carValidations);
});

$("#name,#brand,#type,#number_Of_Passengers,#transmission_Type,#fuel_Type,#daily_Rate,#monthly_Rate,#price_Extra_KM,#registration_Number,#free_Mileage,#color").on('blur', function (event) {
    checkValidity(carValidations);
});

$("#name").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExBrand, $("#name"))) {
        $("#brand").focus();
    } else {
        focusText($("#name"));
    }
});

$("#brand").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExModel, $("#brand"))) {
        focusText($("#type"));
    }
});

$("#type").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExType, $("#type"))) {
        focusText($("#number_Of_Passengers"));
    }
});

$("#number_Of_Passengers").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExNoPassengers, $("#number_Of_Passengers"))) {
        if (event.which === 13) {
            focusText($("#transmission_Type"));
        }
    }
});

$("#transmission_Type").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExTransmissionType, $("#transmission_Type"))) {
        focusText($("#fuel_Type"));
    }
});

$("#fuel_Type").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExFuelType, $("#fuel_Type"))) {
        focusText($("#daily_Rate"));
    }
});

$("#daily_Rate").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExDailyRate, $("#daily_Rate"))) {
        if (event.which === 13) {
            focusText($("#monthly_Rate"));
        }
    }
});

$("#monthly_Rate").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExMonthlyRate, $("#monthly_Rate"))) {
        if (event.which === 13) {
            focusText($("#price_Extra_KM"));
        }
    }
});

$("#price_Extra_KM").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExKM, $("#price_Extra_KM"))) {
        if (event.which === 13) {
            focusText($("#registration_Number"));
        }
    }
});

$("#registration_Number").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExRegNumber, $("#registration_Number"))) {
        if (event.which === 13) {
            focusText($("#free_Mileage"));
        }
    }
});

$("#free_Mileage").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExMileage, $("#free_Mileage"))) {
        if (event.which === 13) {
            focusText($("#color"));
        }
    }
});

$("#color").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExColor, $("#color"))) {
        if (event.which === 13) {
            $('#btnSaveCar').focus();
        }
    }
});


function setButtonState(value) {
    if (value > 0) {
        $("#btnSaveCar").attr('disabled', true);
        $("#btnUpdateCar").attr('disabled', true);
        $("#btnDeleteCar").attr('disabled', true);
    } else {
        $("#btnSaveCar").attr('disabled', false);
        $("#btnUpdateCar").attr('disabled', false);
        $("#btnDeleteCar").attr('disabled', false);
    }
}
/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

let baseUrl = "http://localhost:8080/Back_End_war/";
loadAllCars();

// $("#btnSaveCar").attr('disabled', true);
// $("#btnUpdateCar").attr('disabled', true);
// $("#btnDeleteCar").attr('disabled', true);

/**
 * Car Save
 * */
$("#btnSaveCar").click(function () {
    let formData = new FormData($("#carForm")[0]);
    console.log(formData);
    $.ajax({
        url: baseUrl + "car",
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
        url: baseUrl + "car/carIDGenerate",
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
    // checkValidity(carValidations);
    $("#btnSaveCar").attr('disabled', true);
}

/**
 * load all customers Method
 * */
function loadAllCars() {
    $("#carTable").empty();
    $.ajax({
        url: baseUrl + "car/loadAllCars", method: "GET", dataType: "json", success: function (res) {
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
    let car_Id = $("#car_Id").val();
    let name = $("#name").val();
    let brand = $("#brand").val();
    let type = $("#type").val();
    let number_Of_Passengers = $("#number_Of_Passengers").val();
    let transmission_Type = $("#transmission_Type").val();
    let fuel_Type = $("#fuel_Type").val();
    let daily_Rate = $("#daily_Rate").val();
    let monthly_Rate = $("#monthly_Rate").val();
    let price_Extra_KM = $("#price_Extra_KM").val();
    let registration_Number = $("#registration_Number").val();
    let free_Mileage = $("#free_Mileage").val();
    let color = $("#color").val();
    let vehicleAvailabilityType = $("#vehicleAvailabilityType").val();

    const carOb = {
        car_Id: car_Id,
        name: name,
        brand: brand,
        type: type,
        image: {
            front_View: front_View, back_View: back_View, side_View: side_View, interior: interior
        },
        number_Of_Passengers: number_Of_Passengers,
        transmission_Type: transmission_Type,
        fuel_Type: fuel_Type,
        rent_Duration_Price: {
            daily_Rate : daily_Rate,
            monthly_Rate: monthly_Rate,
        },
        price_Extra_KM: price_Extra_KM,
        registration_Number: registration_Number,
        free_Mileage: free_Mileage,
        color: color,
        vehicleAvailabilityType: vehicleAvailabilityType
    };

    $.ajax({
        url: baseUrl + "car",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(carOb),
        success: function (res) {
            saveUpdateAlert("Car", res.message);
            loadAllCars();
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Car", message);
        }
    });
});

/**
 * Delete Action
 * */
$("#btnDeleteCar").click(function () {
    let id = $("#car_Id").val();
    $.ajax({
        url: baseUrl + "car?id=" + id + "", method: "delete", dataType: "json", success: function (resp) {
            saveUpdateAlert("Car", resp.message);
            loadAllCars();
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Car", message);
        }
    });
});
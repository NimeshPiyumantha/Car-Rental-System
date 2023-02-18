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
function setTextFieldValues(car_Id, name, brand, type, front_View, back_View, side_View, interior, number_Of_Passengers, transmission_Type, fuel_Type, daily_Rate, monthly_Rate, price_Extra_KM, registration_Number, free_Mileage, color, vehicleAvailabilityType) {
    $("#car_Id").val(car_Id);
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

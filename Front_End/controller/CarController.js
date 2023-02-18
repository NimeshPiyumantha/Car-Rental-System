/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

let baseUrl = "http://localhost:8080/Back_End_war/";
/*loadAllCars();*/
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
        },
        error: function (error) {
            unSuccessUpdateAlert("Car", JSON.parse(error.responseText).message);
        }
    });
});

generateCarID();
/**
 * User Id Generator
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

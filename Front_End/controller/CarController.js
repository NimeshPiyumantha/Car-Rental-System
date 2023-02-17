/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
/*Save Driver*/
let baseUrl = "http://localhost:8080/Back_End_war/";

// $("#btnSaveDriver").attr('disabled', true);

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

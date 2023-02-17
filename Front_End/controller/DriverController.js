/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
/*Save Driver*/
let baseUrl = "http://localhost:8080/Back_End_war/";

// $("#btnSaveDriver").attr('disabled', true);

$("#btnSaveDriver").click(function () {
    let formData = new FormData($("#driverForm")[0]);
    console.log(formData);
    $.ajax({
        url: baseUrl + "driver", method: "post", data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res)
            saveUpdateAlert("Driver", res.message);

        }, error: function (error) {
            unSuccessUpdateAlert("Driver", JSON.parse(error.responseText).message);
        }
    });
});


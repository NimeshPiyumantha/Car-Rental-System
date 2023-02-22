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
    $("#user_Id").val("REN-001");
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
                $("#user_Id").val("REN-00" + tempId);
            } else if (tempId <= 99) {
                $("#user_Id").val("REN-0" + tempId);
            } else {
                $("#user_Id").val("REN-" + tempId);
            }
        },
        error: function (ob, statusText, error) {
        }
    });
}
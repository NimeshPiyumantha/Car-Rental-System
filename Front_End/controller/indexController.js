/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/

let carBaseUrl = "http://localhost:8080/Back_End_war/";

loadAllCars();

function loadAllCars() {
    $("#carSection").empty();
    $.ajax({
        url: carBaseUrl + "car/loadAllCars", method: "GET", dataType: "json", success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let url1 = i.image.front_View;
                $("#carSection").append(`<div data-aos="fade-up" id="carSection" class="position-relative d-flex justify-content-center mt-5 sectionBorder">
                <div class="d-flex align-items-center col-lg-12 flex-wrap justify-content-center">
                    <img class="position-relative cars-img img-fluid m-3 p-2 col-lg-5" src="${carBaseUrl + url1}"
                         href="">

                    <div class="position-relative col-xl-8 col-md-10 flex-wrap">

                        <h4 class="m-2 p-2 text-center txt-head">${i.name + " " + i.brand} <br>
                            <p><span>${i.type}</span><span>&nbsp;- &nbsp;</span><span>${i.transmission_Type}</span></p></h4>
                        <div class="row listStyle m-1">
                            <div class="col">
                                <ul class="list-group">
                                    <li class="list-group-item">Daily Rate (Rs) <strong>${i.rent_Duration_Price.daily_Rate}</strong></li>
                                    <li class="list-group-item">Free <strong>${i.free_Mileage}</strong> KM for a Day</li>
                                    <li class="list-group-item">Price per Extra KM (Rs) <strong>${i.price_Extra_KM}</strong>
                                    </li>
                                </ul>
                            </div>
                            <div class="col">
                                <ul class="list-group">
                                    <li class="list-group-item">Monthly Rate (Rs) <strong>${i.rent_Duration_Price.monthly_Rate}</strong></li>
                                    <li class="list-group-item">Free <strong>${(i.free_Mileage) * 24}</strong> KM for a Month</li>
                                    <li class="list-group-item">Modification</li>
                                </ul>
                            </div>
                        </div>

                        <div class="d-flex mt-2 m-3 p-2 justify-content-around flex-wrap">
                            <div class="d-flex justify-content-center mb-4">
                                <div class="px-2">
                                    <i class="fa-solid fa-car m-2 fontSize"></i>
                                    <span class="span">2020</span>
                                </div>
                                <div class="px-2 border-left border-right">
                                    <i class="fa-solid fa-gears m-2 fontSize"></i>
                                    <span class="span">${i.transmission_Type}</span>
                                </div>
                                <div class="px-2">
                                    <i class="fa-solid fa-chair m-2 fontSize"></i>
                                    <span class="span">4</span>
                                </div>
                                <div class="px-2">
                                    <i class="fa-solid fa-road m-2 fontSize"></i>
                                    <span class="span">50</span>
                                </div>
                                <div class="px-2">
                                    <i class="fa-sharp fa-solid fa-door-open m-2 fontSize"></i>
                                    <span class="span">4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 `);

            }
        }
    });
}

$("#searchBtn").on("click", function () {
    filterCarDetails();
});

function filterCarDetails() {
    $("#carSection").empty();
    name=$("#cName").val();
    fuel_Type=$("#fuelType").val();
    type=$("#carType").val();
    transmission_Type=$("#cTransmission").val();
    $.ajax({
        url: carBaseUrl + "car/filterDetails?name=" + name + "&fuel_Type=" + fuel_Type+ "&type=" + type+ "&transmission_Type=" + transmission_Type,
        method: "GET", dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res) {
                let url1 = i.image.front_View;
                $("#carSection").append(`<div data-aos="fade-up" id="carSection" class="position-relative d-flex justify-content-center mt-5 sectionBorder">
                <div class="d-flex align-items-center col-lg-12 flex-wrap justify-content-center">
                    <img class="position-relative cars-img img-fluid m-3 p-2 col-lg-5" src="${carBaseUrl + url1}"
                         href="">

                    <div class="position-relative col-xl-8 col-md-10 flex-wrap">

                        <h4 class="m-2 p-2 text-center txt-head">${i.name + " " + i.brand} <br>
                            <p><span>${i.type}</span><span>&nbsp;- &nbsp;</span><span>${i.transmission_Type}</span></p></h4>
                        <div class="row listStyle m-1">
                            <div class="col">
                                <ul class="list-group">
                                    <li class="list-group-item">Daily Rate (Rs) <strong>${i.rent_Duration_Price.daily_Rate}</strong></li>
                                    <li class="list-group-item">Free <strong>${i.free_Mileage}</strong> KM for a Day</li>
                                    <li class="list-group-item">Price per Extra KM (Rs) <strong>${i.price_Extra_KM}</strong>
                                    </li>
                                </ul>
                            </div>
                            <div class="col">
                                <ul class="list-group">
                                    <li class="list-group-item">Monthly Rate (Rs) <strong>${i.rent_Duration_Price.monthly_Rate}</strong></li>
                                    <li class="list-group-item">Free <strong>${(i.free_Mileage) * 24}</strong> KM for a Month</li>
                                    <li class="list-group-item">Modification</li>
                                </ul>
                            </div>
                        </div>

                        <div class="d-flex mt-2 m-3 p-2 justify-content-around flex-wrap">
                            <div class="d-flex justify-content-center mb-4">
                                <div class="px-2">
                                    <i class="fa-solid fa-car m-2 fontSize"></i>
                                    <span class="span">2020</span>
                                </div>
                                <div class="px-2 border-left border-right">
                                    <i class="fa-solid fa-gears m-2 fontSize"></i>
                                    <span class="span">${i.transmission_Type}</span>
                                </div>
                                <div class="px-2">
                                    <i class="fa-solid fa-chair m-2 fontSize"></i>
                                    <span class="span">4</span>
                                </div>
                                <div class="px-2">
                                    <i class="fa-solid fa-road m-2 fontSize"></i>
                                    <span class="span">50</span>
                                </div>
                                <div class="px-2">
                                    <i class="fa-sharp fa-solid fa-door-open m-2 fontSize"></i>
                                    <span class="span">4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 `);

            }
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            emptyMassage(message);
            loadAllCars();
        }
    });
}
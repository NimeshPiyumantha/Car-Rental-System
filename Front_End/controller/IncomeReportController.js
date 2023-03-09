/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
let baseUrlIncome = "http://localhost:8080/Back_End_war/";

document.addEventListener("DOMContentLoaded", () => {
    /**
     * Daily Income
     **/
    let dataPoints1 = [];
    let options1 = {
        animationEnabled: true, theme: "light2", title: {
            text: "Daily Sales Income"
        }, axisX: {
            valueFormatString: "YYYY MMM DD",
        }, axisY: {
            title: "LKR", titleFontSize: 20
        }, data: [{
            type: "spline", yValueFormatString: "$#,###.##", dataPoints: dataPoints1
        }]
    };

    $.ajax({
        url: baseUrlIncome + "income/dailyIncome", method: "GET", dataType: "json", success: function (res) {
            console.log(res);
            for (let i = 0; i < res.length; i++) {
                let date = res[i][0];
                let now = new Date(date);
                let newDate = now.getDate();
                let newMonth = now.getMonth() + 1;
                let newYear = now.getFullYear();
                var formattedDate = newYear + "-" + newMonth.toString().padStart(2, "0") + "-" + newDate.toString().padStart(2, "0");
                let count = res[i][1];
                let total = res[i][2];
                let row = "<tr><td>" + formattedDate + "</td><td>" + count + "</td><td>" + total + "</td></tr>";
                $("#dailyIncomeTable").append(row);

                dataPoints1.push({
                        x: new Date(res[i][0]), y: total
                });
            }
            $("#dailyIncomeChart").CanvasJSChart(options1);
        }
    });


    /**
     * Monthly Income
     **/
    let dataPoints2 = [];
    let options2 = {
        animationEnabled: true, theme: "light2", title: {
            text: "Monthly Sales Income"
        }, axisX: {
            valueFormatString: "MMM"
        }, axisY: {
            title: "LKR", titleFontSize: 20
        }, data: [{
            type: "spline", yValueFormatString: "$#,###.##", dataPoints: dataPoints2
        }]
    };


    $.ajax({
        url: baseUrlIncome + "income/monthlyIncome", method: "GET", dataType: "json", success: function (res) {
            console.log(res);
            for (let i = 0; i < res.length; i++) {
                let date = res[i][0];
                let count = res[i][1];
                let total = res[i][2];
                let row = "<tr><td>" + date + "</td><td>" + count + "</td><td>" + total + "</td></tr>";
                $("#monthlyIncomeTable").append(row);

                dataPoints2.push({
                    x: new Date(res[i][0]), y: total
                });
            }
            $("#monthlyIncomeChart").CanvasJSChart(options2);
        }
    });

    /**
     * Annually Income
     **/
    let dataPoints3 = [];
    let options3 = {
        animationEnabled: true, theme: "light2", title: {
            text: "Annually Sales Income"
        }, axisX: {
            valueFormatString: "YYYY",
        }, axisY: {
            title: "LKR", titleFontSize: 20
        }, data: [{
            type: "spline", yValueFormatString: "$#,###.##", dataPoints: dataPoints3
        }]
    };

    $.ajax({
        url: baseUrlIncome + "income/AnnuallyIncome", method: "GET", dataType: "json", success: function (res) {
            console.log(res);
            for (let i = 0; i < res.length; i++) {
                let date = res[i][0];
                let count = res[i][1];
                let total = res[i][2];
                let row = "<tr><td>" + date + "</td><td>" + count + "</td><td>" + total + "</td></tr>";
                $("#annuallyIncomeTable").append(row);

                dataPoints3.push({
                    x: new Date(res[i][0]), y: total
                });
            }
            $("#annuallyIncomeChart").CanvasJSChart(options3);
        }
    });
});
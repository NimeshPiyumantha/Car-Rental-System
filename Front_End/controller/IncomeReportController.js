/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
let baseUrlIncome = "http://localhost:8080/Back_End_war/";

$.ajax({
    url: baseUrlIncome + "income/dailyIncome",
    method: "GET",
    dataType: "json",
    success: function (res) {
        console.log(res);
        for (let i=0; i<res.length; i++) {
       let date = res[i][0];
        let now= new Date(date);
        let newDate = now.getDate();
        let newMonth = now.getMonth()+1;
        let newYear = now.getFullYear();
        var formattedDate = newYear + "-" + newMonth.toString().padStart(2, "0") + "-" + newDate.toString().padStart(2, "0");
            let count = res[i][1];
            let total = res[i][2];
            let row = "<tr><td>" + formattedDate+ "</td><td>" + count + "</td><td>" + total + "</td></tr>";
            $("#dailyIncomeTable").append(row);
        }
    }

});


$.ajax({
    url: baseUrlIncome + "income/monthlyIncome",
    method: "GET",
    dataType: "json",
    success: function (res) {
        console.log(res);
        for (let i=0; i<res.length; i++) {
            let date = res[i][0];
            let count = res[i][1];
            let total = res[i][2];
            let row = "<tr><td>" + date+ "</td><td>" + count + "</td><td>" + total + "</td></tr>";
            $("#monthlyIncomeTable").append(row);
        }
    }

});

$.ajax({
    url: baseUrlIncome + "income/AnnuallyIncome",
    method: "GET",
    dataType: "json",
    success: function (res) {
        console.log(res);
        for (let i=0; i<res.length; i++) {
            let date = res[i][0];
            let count = res[i][1];
            let total = res[i][2];
            let row = "<tr><td>" + date+ "</td><td>" + count + "</td><td>" + total + "</td></tr>";
            $("#annuallyIncomeTable").append(row);
        }
    }

});
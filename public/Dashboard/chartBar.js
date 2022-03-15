const ctx1 = document.getElementById('myChart').getContext('2d');
        
var data2 = {'sql': 'SELECT DISTINCT "Minutes5DK", "CO2Emission" FROM "co2emis" \
                        ORDER BY "Minutes5DK" desc LIMIT 200  \
                        '};

var co2e = [];
var timeStamp = [];
var time = [];

$.ajax({
    url: 'https://api.energidataservice.dk/datastore_search_sql',
    type: "GET",
    data: data1,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(data) {
      console.log("CO2 API:", data.result.records[0]['CO2Emission'])

    for (let i = 0; i < data.result.records.length; i++) {
        co2e.push(data.result.records[i]['CO2Emission']);
        timeStamp.push(new Date(data.result.records[i]['Minutes5DK']));

        if (i % 11) {
            continue; // this keyword means skip following steps, jump to next iteration
        }
        else {
            time.push(timeStamp[i].getHours() + ":" + timeStamp[i].getMinutes());
        }
    }

    console.log("test..........", co2e, timeStamp);
    console.log("test2..........", time.sort());

    }
}).done(function (data) {

    const myChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: time.sort(),
            datasets: [{
                label: 'gCO2e/kWh',
                data: co2e,
                backgroundColor: [
                    'rgba(255, 206, 86, 0.4)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMin: 0,
                    suggestedMax: 300
                }
            }
        }
    }); 

});


/* 
    var isoDate = new Date().toISOString(); 
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
    
    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude)
    }

    console.log("isoDate----->:", isoDate)
*/



const ctx2 = document.getElementById('FcastChart').getContext('2d');


var data2 = {'sql': 'SELECT DISTINCT "Minutes5DK", "CO2Emission" FROM "co2emisprog" \
                        ORDER BY "Minutes5DK" desc LIMIT 100  \
                        '};
                                           

                         
var co2eFcast = [];
var timeStamp2 = [];
var time1 = [];
$.ajax({
    url: 'https://www.energidataservice.dk/proxy/api/datastore_search_sql',
    type: "GET",
    data: data2,
    dataType: 'jsonp',
    success: function(data) {
      console.log("CO2 API:", data.result.records[0]['CO2Emission'])

    for (let i = 0; i < data.result.records.length; i++) {
        co2eFcast.push(data.result.records[i]['CO2Emission']);
        timeStamp2.push(new Date(data.result.records[i]['Minutes5DK']));


        if (i % 11) {
            continue; // this keyword means skip following steps, jump to next iteration
        }
        else {
            time1.push(timeStamp2[i].getHours() + ":" + timeStamp2[i].getMinutes());
        }
    }

   


    console.log("test--->", co2eFcast, timeStamp2);
    console.log("test2..........", time1);

    }
}).done(function (data) {

    const myChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: time1,
            datasets: [{
                label: 'gCO2e/kWh',
                data: co2eFcast,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.4)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)'
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



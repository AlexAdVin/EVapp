const ctx = document.getElementById('myChart').getContext('2d');


var data1 = {'sql': 'SELECT DISTINCT "Minutes5DK", "CO2Emission" FROM "co2emis" \
                        ORDER BY "Minutes5DK" desc LIMIT 10  \
                        '};
                                           

                         
var co2e = [];
var timeStamp = [];
var time = [];
$.ajax({
    url: 'https://www.energidataservice.dk/proxy/api/datastore_search_sql',
    type: "GET",
    data: data1,
    dataType: 'jsonp',
    success: function(data) {
      console.log("CO2 API:", data.result.records[0]['CO2Emission'])

    var isoDate = new Date().toISOString(); 
    var timeTest = new Date().toLocaleTimeString('en-US',
                 { timeZone: 'CET' });
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
    
    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude)
    }

    console.log("isoDate----->:", isoDate, timeTest, teste)

    for (let i = 0; i < data.result.records.length; i++) {
        co2e.push(data.result.records[i]['CO2Emission']);
        timeStamp.push(new Date(data.result.records[i]['Minutes5DK']));


        if (data.result.records[i]['Minutes5DK'] >= "2022-01-12T00:00:00") {
            continue; // this keyword means skip following steps, jump to next iteration
        }
        else {
            time.push(timeStamp[i].getHours() + ":" + timeStamp[i].getMinutes());
        }
    }

   

    console.log("co2e",co2e);
    console.log("test..........", timeStamp);
    console.log("test2..........", time);

    }
}).done(function (data) {

    console.log("co2e is not null..........", co2e)

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: time,
            datasets: [{
                label: '# of Votes',
                data: co2e,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(75, 192, 192, 0.4)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(75, 192, 192, 0.4)'
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



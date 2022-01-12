var data = {
    resource_id: 'co2emis', // the resource id
    limit: 5, // get 5 results
    sort: "Minutes5DK desc"
  };
  $.ajax({
    url: 'https://api.energidataservice.dk/datastore_search',
    type: "GET",
    data: data,
    dataType: 'JSON',
    help: "https://api.energidataservice.dk/datastore_search",
    success: function(result) {
      
      for (let i = 0; i < result.result.records.length; i++) {
        console.log('Total results found: ' + result.result.records[i]['CO2Emission'], "@", result.result.records[i]['Minutes5DK']);
 
      }
      
    }
  });






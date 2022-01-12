const CSV =
    "https://raw.githubusercontent.com/chris3edwards3/exampledata/master/plotlyJS/line.csv";

function plotFromCSV() {
    Plotly.d3.csv(CSV, function(err, rows) {
        console.log(rows);
        processData(rows);
    });
}

function processData(allRows) {
    let x = [];
    let y1 = [];
    let y2 = [];
    let row;

    let i = 0;
    while (i < allRows.length) {
        row = allRows[i];
        x.push(row["Date"]);
        y1.push(row["A"]);
        y2.push(row["B"]);
        i += 1;
    }
    
    console.log("X", x);
    console.log("Y1", y1);

    makePlotly(x, y1, y2);
}

function makePlotly(x, y1, y2) {
    let traces = [
        {
            x: x,
            y: y1,
            name: "A",
            marker: {
                color: "#387fba",
                width: 3
            },
            type: 'bar'
        },
        {
            x: x,
            y: y2,
            name: "B",
            marker: {
                color: "#54ba38",
                width: 3,
                // dash: "dash"
            },
            type: 'bar'
        }
    ];

    let layout = {
        title: "Basic Line Chart",
        yaxis: {
            range: [0, 100]
        },
        xaxis: {
            // tickformat: "%d/%m/%y"
        },
        hovermode: 'closest',
        paper_bgcolor: '#121212',
        plot_bgcolor: '#121212'
    };

    //https://plot.ly/javascript/configuration-options/
    let config = { 
        responsive: true,
        scrollZoom: true,
        displaylogo: false,
        toImageButtonOptions: {
            format: 'svg', // one of png, svg, jpeg, webp
            filename: 'custom_image',
            height: 500,
            width: 700,
            scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
          }
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot", traces, layout, config);
}

plotFromCSV();
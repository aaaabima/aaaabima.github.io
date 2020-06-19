function constructChart(getData) {
    const purgedData = [];
    $.each(getData, (i, val) => {
        const dataRow = [val.Date.slice(5, 10), val.Cases];
        purgedData.push(dataRow);
    });

    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {

        var data = new google.visualization.DataTable();
        // Declare columns
        data.addColumn('string', 'X');
        data.addColumn('number', 'Confirmed Cases');

        // Add data.
        data.addRows(purgedData);

        var options = {
            colors: ['#00CC00'],
            hAxis: {
                title: 'Date',
                textStyle: {
                    fontSize: '20'
                }
            },
            vAxis: {
                title: 'Case',
                textStyle: {
                    fontSize: '20'
                }
            },
            crosshair: {
                trigger: 'both',
                orientation: 'both'
            },
            legend: {
                position: 'bottom'
            },
            tooltip: {
                textStyle: {
                    fontSize: '14'
                }
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart'));

        chart.draw(data, options);
    }

    $(window).resize(() => {
        drawBasic();
    });
}


$.ajax({
    url: 'https://api.covid19api.com/country/indonesia/status/confirmed',
    type: 'get',
    dataType: 'json',
    data: {
        'from': '2020-03-01T00:00:00Z',
        'to': '${dateNow.toISOString().slice(0, 10)}T00:00:00Z'
    },
    success: function (result) {
        if (result.length != 0) {
            constructChart(result);
        } else {
            console.log("Data tidak terambil")
        }
    }
});


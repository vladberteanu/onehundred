
$(function () {
    Highcharts.chart('money-chart', {
        exporting: { enabled: false },
        title: {
            text: '',
            x: -20 //center
        },
        xAxis: {
            title: {
                text: 'Years'
            },
            categories: ['1', '2', '3', '4', '5', '6',
                '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
        },
        yAxis: {
            title: {
                text: 'Your Money'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            headerFormat: "<span style='font-size: 10px'>{point.key} years</span><br/>",
            valuePrefix: '$'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [
            {
                name: 'Saving & Investing',
                data: [1239, 2568, 3993, 5520, 7159, 8916, 10799, 12819, 14985, 17308, 19798, 22469, 25333, 28403, 31696, 35226, 39012, 43072, 47425, 52092],
            },
            {
                name: 'Just Saving',
                data: [1200, 2400, 3600, 4800, 6000, 7200, 8400, 9600, 10800, 12000, 13200, 14400, 15600, 16800, 18000, 19200, 20400, 21600, 22800, 24000]
            },
        ]
    });
});

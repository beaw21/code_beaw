let StatGraphInitialize = function ()
{
    var dps =[] ;
    var dataPointsUpper = [{ x: 0, y: lineRed},{ x:100, y:lineRed}];
    var dataPointsLower = [{ x: 0, y: lineNormal},{ x:100, y:lineNormal}];
    var lineRed=6;
    var lineNormal=5;

    if (typeof(Worker) !== "undefined") {
        console.log('Yes! Web worker support!');

        let dataWorker;

        if (typeof(dataWorker) == "undefined") {
            dataWorker = new Worker('/js/performance/graph_worker.js');
        }

        dataWorker.onmessage = function(event) {
            // console.log(event.data);
            // dps.push({ x: xNum, y: parseFloat(event.data.data.Distance[0]) });
            //console.log(dps);

            event.data.payload.forEach(function(element) {
                xNum++;

                dataPointsUpper.push({ x: xNum , y: lineRed });
                dataPointsLower.push({ x: xNum,  y: lineNormal});
                dps.push({ x: xNum, y: parseFloat(element.Distance),'timeStamp':element.TimeStamp });
            });

            updateChart();


        };

    } else {
        console.log('Sorry! No Web Worker support..')
    }


    var chart = new CanvasJS.Chart
    (
        "chartContainer",
        {
            exportEnabled: true,
            backgroundColor: "#313030",
            legend :
                {
                    horizontalAlign : "right"
                },
            axisX :
                {
                    labelFontColor: false,
                    lineThickness: false,
                    tickColor: false,
                },
            axisY:
                {
                    includeZero: false,
                    gridColor: false ,
                    tickColor: false,
                    tickMarkColor : false,
                    drawOnChartArea : false,
                    labelFontColor: false,
                    lineThickness: false,
                },
            data:
                [{
                    type: "spline",
                    dataPoints: dataPointsUpper , //เส้นแดง ห้ามเกินนี้     deltay1
                    markerColor : "#c45850" ,
                    markerSize: 0,
                    lineColor:"#c45850",
                    lineThickness : 4
                },
                    {
                        type: "spline",
                        dataPoints: dataPointsLower,   //เส้นเขียว    deltay2
                        markerColor : "#3cba9f" ,
                        markerSize: 0,
                        lineColor:"#3cba9f",
                        lineThickness : 4
                    },
                    {
                        type: "line",
                        markerSize: 2,
                        markerColor : "#3e95cd" ,
                        dataPoints: dps ,
                        lineColor:"#3e95cd",
                        lineThickness : 4

                    }]
        }
    );

    var xNum = 0;
    var xVal = 0;
    var yVal = 0;
    var updateInterval = 1;
    var dataLength = 250 ; // number of dataPoints visible at any point

    var updateChart = function ()
    {

        //dps.push([{	x: 10 , y: 20 }, { x:4,y:12}]);
        if (dps.length > dataLength)
        {
            dps.shift();
        }
        if (dataPointsUpper.length > dataLength)
        {
            dataPointsUpper.shift();
        }
        if (dataPointsLower.length > dataLength)
        {
            dataPointsLower.shift();
        }
        chart.render();
    };

    return {
        init: function ()
        {

        }
    }
}();

jQuery(document).ready(function ()
{
    StatGraphInitialize.init()
});

function update_chart() {
    
}
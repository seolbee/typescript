const canvas = document.querySelector('canvas') as HTMLCanvasElement;
let chart = null;

function initChart():void{
    let data = {
        datasets:[{
            data: [],
            label:"",
            fill:false,
            borderColor:'rgb(75, 192, 192)',
            borderWidth:1,
            pointRadius:0
        }]
    };
    
    let config = {
        type:'line',
        data,
        options:{
            responsive:false,
            scales:{
                xAxes:[
                    {
                        type:'time',
                        time:{
                            stepSize:60,
                            displayFormats:{
                                quarter:'h:mm a'
                            }
                        }
                    }
                ]
            }
        }
    };
    chart = new Chart(canvas.getContext('2d'), config);
};

function drawChart(prices:number[], time:Date[], name:string, sTime:number, mTime:number, hv:number, lv:number):void{
    if(chart === null) {
        initChart();
    };
    chart.data.labels=time;
    chart.data.datasets[0].data=prices;
    chart.data.datasets[0].label=name;
    chart.options.scales.yAxes[0].ticks.suggestedMin = lv;
    chart.options.scales.yAxes[0].ticks.suggestedMax = hv;
    chart.update();
};
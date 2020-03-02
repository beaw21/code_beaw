self.importScripts('/js/performance/httpd.js');

setTimeout(()=>{
    get_calculate();
},2000);

let cacheData_frequency = {};
function get_calculate(timeout = 2000)
{
    //console.log('RUN');
    postData('/process/objectManikinsProcess.php', { CMD : "GET-ALL-CALCULATE-DATA" }).then((data) => {
        if(data.Error === 0)
        {
            if( JSON.stringify(data) !== cacheData_frequency) {
                cacheData_frequency = JSON.stringify(data);
                postMessage({
                    frequency: data.frequency.data === null || data.frequency.data === 'undefined' || data.frequency.data === undefined ? 'N/A' : data.frequency.data,
                    avgDepth: data.avgDepth.data === null || data.avgDepth.data === 'undefined' || data.avgDepth.data === undefined ? 'N/A' : data.avgDepth.data,
                    pushRate: data.pushRate.data === null || data.pushRate.data === 'undefined' || data.pushRate.data === undefined ? 'N/A' : data.pushRate.data,
                    pressure: data.pressure.data === null || data.pressure.data === 'undefined' || data.pressure.data === undefined ? 'N/A' : data.pressure.data,
                });
            }
        }
        else
        {
            console.error('get_frequency : ',data.ErrorMessage);
        }

        setTimeout(() => {
            get_calculate();
        },timeout);
    }).catch((error) => {
        console.error('get_frequency : ',error);
        setTimeout(() => {
            get_calculate();
        },timeout);
    });
}

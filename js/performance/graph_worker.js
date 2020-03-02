self.importScripts('/js/performance/httpd.js');

setTimeout(()=>{
    get_graph_data();
},1000);

let cacheData = {};
let lastTimeStamp = 'NOW(6)';

function get_graph_data(timeout = 10) {
    postData('/process/graphProcess.php', { TimeStamp : lastTimeStamp }).then((data) => {
        //console.log(data);
        if(data.payload.length > 0) {
            let nowLastTime = data.payload[data.payload.length-1].TimeStamp;
            if(nowLastTime !== lastTimeStamp) {
                lastTimeStamp = nowLastTime;
                if( JSON.stringify(data) !== cacheData) {
                    cacheData = JSON.stringify(data);
                    postMessage(data);
                }
            }
        }

        setTimeout(() => {
            get_graph_data();
        },timeout);
    }).catch((error) => {
         console.error(error);
        setTimeout(() => {
            get_graph_data();
        },timeout);
    });
}

let startBtn_01;
let restartBtn_01;
let video_01;
let canvas_01;
let interval_01;
let secondInterval;
let seconds_01;
let chart_01;
let resChart_01;
let resDonut_01;
let byteArrays;
let image_count = 1;
let focusedCount;
let unfocusedCount;

let calculatedInterval_01;
let processingInterval_01;
let prevResult;

const videoWidth = 960;
const videoHeight = 540;

$(async () => {
    await init_01();
})

const init_01 = async () => {

    seconds_01= 0;
    focusedCount = 0;
    unfocusedCount =0 ;
    video_01 = $('#video01');
    video_01[0].srcObject = null;
    video_01[0].width = 0;
    video_01[0].height = 0;

    startBtn_01 = $('#start01');
    startBtn_01.unbind('click');
    startBtn_01.bind('click', startAnalysis_01);
    canvas_01 = document.createElement('canvas');

    restartBtn_01 =$('#restart01');
    restartBtn_01.unbind('click');
    restartBtn_01.bind('click', reset_01);

    $('#timer01').text('00:0' + seconds_01);

    $(".popup__btn-next").eq(2).bind('click', displayResults_01);
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: videoWidth, height: videoHeight } })
        video_01[0].srcObject = stream;
    } catch (error) {
        console.log("Something went wrong!");
    }
    video_01[0].width = videoWidth;
    video_01[0].height = videoHeight;

    calculatedInterval_01={
        focused: [],
        unfocused:[]
    }

    prevResult = {
        payload:{
            result: ''
        }
    };
    processingInterval_01 =1;
    init_chart_01();
}

const init_chart_01=()=>{
    let ctx01 = $("#cv_chart01")[0].getContext('2d');
    if(chart_01 !== undefined) chart_01.destroy();
    chart_01 = new Chart(ctx01,{
       type: 'bar',
         data: {
           labels: [''],
           datasets:[]
          },
         options: {
             indexAxis: 'y',
             plugins: {
                 legend: {display: false}
             },
             responsive: true,
             maintainAspectRatio: false,
             scales: {
               x: {
                display: false,
                stacked: true,
                ticks: {
                   stepSize: 3
                },
                min: 0,
                max: 60,
                grid:{
                   display: false
                }
               },
               y: {
                 stacked: true,
                 grid:{
                    display: false
                 }
               }
             },

         }
    });

    let rCtx01 = $("#cv_resChart01")[0].getContext('2d');
    if(resChart_01 !== undefined) resChart_01.destroy();
    resChart_01 = new Chart(rCtx01,{
         type: 'bar',
           data: {
             labels: [''],
             datasets:[]
            },
           options: {
               indexAxis: 'y',
               plugins: {
                   legend: {display: false}
               },
               responsive: true,
               maintainAspectRatio: false,
               scales: {
                 x: {
                  display:false,
                  stacked: true,
                  ticks: {
                     stepSize: 3,
                     display:false
                  },
                  min: 0,
                  max: 60,
                  grid:{
                     display: false
                  }
                 },
                 y: {
                   stacked: true,
                   grid:{
                      display: false
                   }
                 }
               },

           }
      });

  }


const reset_01= () => {
    $("#ul-attention").children("li.select").trigger('click');
    $("#video01").get(0).play();
    $("#guideline_01").show();

    init_01();
}

const startAnalysis_01 = async () => {
    try {
        startBtn_01.unbind('click');
        startBtn_01.bind('click', stopAnalysis_01);
        await startFaceAnalysis_01();
    } catch (error) {
        console.log(error);
    }
};

const startFaceAnalysis_01 = async() => {
    await AduPosenet.load(videoWidth, videoHeight);
    if (seconds_01 > 61) {
        stopAnalysis_01();
    } else {
        let keypointList = [];

        interval_01 = setInterval( async() => {
            const posenetResult = await AduPosenet.inference(video_01[0]);
            keypointList.push(posenetResult[0]);
            image_count++;

            if (image_count === 49) {
                image_count =1;
                $.ajax({
                    url: BASE_URL+"/analysis/attention",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        keypointList
                    }),
                    async: false,
                    success: function (result) {
                        console.log('data : ', result);
                        console.log("API call successful.");
                        drawDataOnChart_01(result,seconds_01);
                        calculateInterval_01(result);
                        keypointList = [];
                    },
                    error: function () {
                        keypointList = [];
                        console.log("An exception occurred from the remote server.");
                    }
                });
            }
        }, 60)
        secondInterval = setInterval(async= ()=>  {
                if (seconds_01 < 10) $('#timer01').text('00:0' + seconds_01);
                else $('#timer01').text('00:' + seconds_01);
                seconds_01++;
            }, 1000
        )
    }
}

const drawDataOnChart_01=(result, seconds_01) =>{
    if(result.payload.result === 'focused'){
        chart_01.data.datasets.push(
            {
              data: [3],
              backgroundColor: 'blue',
            }
        );
         resChart_01.data.datasets.push(
             {
                 data: [3],
                 backgroundColor: 'blue'
             }
        );
        focusedCount++;
    }else if( result.payload.result ==='unfocused'){
         chart_01.data.datasets.push(
         {
             data: [3],
             backgroundColor: 'red'
         }
        );
        resChart_01.data.datasets.push(
         {
             data: [3],
             backgroundColor: 'red'
         }
        );
        unfocusedCount++;
    }
    chart_01.update();
    resChart_01.update();

}
const calculateInterval_01 =(currResult)=>{
    if(currResult===prevResult) {
        processingInterval_01++;
    }else{
        if(prevResult.payload.result === 'focused'){
            calculatedInterval_01.focused.push(processingInterval_01);
        }else if(prevResult.payload.interest ==='unfocused'){
            calculatedInterval_01.unfocused.push(processingInterval_01);
        }
    }
    processingInterval_01 = 1;
    prevResult = currResult;
}


const displayResults_01 =()=>{

    calculateInterval_01("finish");

    $("#focusedTotal").text(calculatedInterval_01.focused.length+'초');
    $("#unfocusedTotal").text(calculatedInterval_01.unfocused.length +'초');

    $("#max-focused-time").text(Math.max(...calculatedInterval_01.focused, 0)+'초');
    $("#max-unfocused-time").text(Math.max(...calculatedInterval_01.unfocused, 0)+'초');

    const ctx06 = $("#resDonut01")[0].getContext('2d');
    if(resDonut_01 !== undefined) resDonut06.destroy();
    resDonut06 = new Chart(ctx06, {
        type: "doughnut",
        data: {
            datasets: [
                {
                    data: [focusedCount, unfocusedCount],
                    backgroundColor: [
                        "#46c7ff", //흥미높음
                        "#ff5959", //흥미낮음
                    ],
                    borderColor: [
                        "#46c7ff",
                        "#ff5959",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    })


}

const stopAnalysis_01 = () => {
    clearInterval(interval_01);
    clearInterval(secondInterval);
    video_01[0].srcObject.getTracks().forEach(function (track) {
        track.stop();
    });
    $("#cv_chart01").hide();
}

let startBtn_02;
let restartBtn_02;
let video_02;
let canvas_02;
let interval_02;
let chart_02;
let resChart_02;
let seconds_02;
let resDonut_02;
let calculatedInterval_02;
let prevInterest;
let processingInterval_02;
let ciHighCount;
let ciNeutralCount;
let ciNACount;
let viPosCount;
let viNeutralCount;
let viNegCount;
let viNACount;
videoWidth = 960;
videoHeight = 540;


$(() => {
    init_02();
})

const init_02 = () => {
    seconds_02= 0;
    ciHighCount =0 ;
    ciNeutralCount =0;
    ciNACount=0 ;
    viPosCount =0;
    viNeutralCount =0;
    viNegCount =0 ;
    viNACount =0;
    video_02 = $('#video02');
    video_02[0].srcObject = null;
    startBtn_02 = $('#start02');
    startBtn_02.unbind('click');
    startBtn_02.bind('click', startAnalysis_02);
    canvas_02 = document.createElement('canvas');
    restartBtn_02 =$('#restart02');
    restartBtn_02.unbind('click');
    restartBtn_02.bind('click', reset_02);
    calculatedInterval_02= {
        ciHigh: [],
        ciNeutral: [],
        ciNA: [],
        viPos: [],
        viNeutral:[],
        viNeg: [],
        viNA:[]
    };
    prevInterest = {
        payload:{
            ci:0,
            interest:'',
            vi:0,
            valence: ''
        }
    };
    processingInterval_02 =1;

    $(".popup__btn-next").eq(2).bind('click', displayResults_02);

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(function (stream) {
              video_02[0].srcObject = stream;
          })
          .catch(function (error) {
              console.log("Something went wrong!");
          });
    }
    init_chart_02();
}

const init_chart_02=()=>{
    let ctx02 = $("#cv_chart02")[0].getContext('2d');

    const grdCi = ctx02.createLinearGradient(0,200,0,0);
    grdCi.addColorStop(0, "rgba(209, 242, 235,0.5)")
    grdCi.addColorStop(1, "rgba(23, 165, 137, 0.5)")
    const grdVi = ctx02.createLinearGradient(0,200,0,0);
    grdVi.addColorStop(0, "rgba(203, 67, 53, 0.5)");
    grdVi.addColorStop(1, "rgba(245, 183, 177, 0.5)");

    if(chart_02 !== undefined) chart_02.destroy();
    chart_02 = new Chart(ctx02,{
        type: 'line',
        data: {
            labels:[],
            datasets:[
                {
                    type: 'line',
                    data: [],
                    fill: true,
                    lineTension: 0.4,
                    backgroundColor: grdCi,
                    borderColor: "rgb(23, 165, 137)",
                    pointRadius: 2,
                    borderWidth: 1.5,
                    yAxisID:'y_ci'
                },
                {
                    type: 'line',
                    data: [],
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor:grdVi,
                    //borderColor: "rgb(209, 242, 235)",
                    pointRadius: 2,
                    borderWidth: 1.5,
                    yAxisID:'y_vi'
                }
            ]
         },
        options: {
            plugins: {
                legend: {display: false}
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                   min:0,
                   max:30
                },
                y_ci:
                {
                  type:'linear',
                  position:'left',
                  min: 0,
                  max: 100,
                  ticks:{
                    stepSize: 50,
                    callback: function(value, index){
                     if(this.getLabelForValue(value) ==100) return '높음';
                     else if(this.getLabelForValue(value) ==50) return '중간';
                     else if(this.getLabelForValue(value) ==0) return '낮음';
                    }
                  }
                },
                y_vi:
                {
                  type:'linear',
                  position:'right',
                  min: -0.8,
                  max: 0.8,
                   ticks:{
                      stepSize: 0.8,
                      callback: function(value, index){
                       if(this.getLabelForValue(value) ==0.8) return '긍정';
                       else if(this.getLabelForValue(value) ==0) return '중립';
                       else if(this.getLabelForValue(value) ==-0.8) return '부정';
                      }
                    }

                },
            }
         }
  });
    let rCtx02 = $("#cv_resChart02")[0].getContext('2d');

    const grdCiR = rCtx02.createLinearGradient(0,200,0,0);
    grdCiR.addColorStop(0, "rgba(209, 242, 235,0.5)")
    grdCiR.addColorStop(1, "rgba(23, 165, 137, 0.5)")
    const grdViR = rCtx02.createLinearGradient(0,200,0,0);
    grdViR.addColorStop(0, "rgba(203, 67, 53, 0.5)");
    grdViR.addColorStop(1, "rgba(245, 183, 177, 0.5)");
    if(resChart_02 !== undefined) resChart_02.destroy();
    resChart_02 = new Chart(rCtx02,{
        type: 'line',
        data: {
            labels:[],
            datasets:[
                {
                    type: 'line',
                    data: [],
                    fill: true,
                    lineTension: 0.4,
                    backgroundColor: grdCiR,
                    borderColor: "rgb(23, 165, 137)",
                    pointRadius: 2,
                    borderWidth: 1.5,
                    yAxisID:'y_ci'
                },
                {
                    type: 'line',
                    data: [],
                    fill: true,
                    lineTension: 0.5,
                    backgroundColor:grdViR,
                    //borderColor: "rgb(209, 242, 235)",
                    pointRadius: 2,
                    borderWidth: 1.5,
                    yAxisID:'y_vi'
                }
            ]
         },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {display: false}
            },
            scales: {
                x: {
                   min:0,
                   max:30
                },
                y_ci:
                {
                  type:'linear',
                  position:'left',
                  min: 0,
                  max: 100,
                  ticks:{
                    stepSize: 50,
                    callback: function(value, index){
                     if(this.getLabelForValue(value) ==100) return '높음';
                     else if(this.getLabelForValue(value) ==50) return '중간';
                     else if(this.getLabelForValue(value) ==0) return '낮음';
                    }
                  }
                },
                y_vi:
                {
                  type:'linear',
                  position:'right',
                  min: -0.8,
                  max: 0.8,
                   ticks:{
                      stepSize: 0.8,
                      callback: function(value, index){
                       if(this.getLabelForValue(value) ==0.8) return '긍정';
                       else if(this.getLabelForValue(value) ==0) return '중립';
                       else if(this.getLabelForValue(value) ==-0.8) return '부정';
                      }
                    }

                },
            }
         }
  });
}

const reset_02= () => {
    $("#ul-interest").children("li.select").trigger('click');
    $("#video02").get(0).play();
    $("#guideline_02").show();

    init_02();
}

const startAnalysis_02 = () => {
    try {
		navigator.mediaDevices.getUserMedia({
            video: { width: videoWidth, height: videoHeight },
            audio: false,
        }).then((stream) => {
	        video_02[0].srcObject = stream;
	        startBtn_02.unbind('click');
	        startBtn_02.bind('click', stopAnalysis_02);
	        startFaceAnalysis_02();
        })
    } catch (error) {
        console.log(error);
    }
};

const startFaceAnalysis_02 = () => {
    const context = canvas_02.getContext('2d');

    interval_02 = setInterval(async () => {
        if (seconds_02 > 30) {
            stopAnalysis_02();
        }else{
            const params = JSON.stringify(captureImage_02(context))

        	$.ajax({
                url: BASE_URL+"/analysis/interest",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: params,
                success: function (result) {
                    console.log("API call successful.");
                    drawDataOnChart_02(result, seconds_02);
                    calculateInterval_02(result);
                    seconds_02++;
                },
                error: function () {
                    console.log("An exception occurred from the remote server.");
                }
            });
        }
	}, 1000)
}

const drawDataOnChart_02 =(result, seconds_02)=> {

    chart_02.data.labels.push(seconds_02);
    chart_02.data.datasets[0].data.push(result.payload.ci);
    chart_02.data.datasets[1].data.push(result.payload.vi);
    chart_02.update();

    resChart_02.data.labels.push(seconds_02);
    resChart_02.data.datasets[0].data.push(result.payload.ci);
    resChart_02.data.datasets[1].data.push(result.payload.vi);
    resChart_02.update();

    if(result.payload.interest === "긍정"){
        ciHighCount++;
    }else if(result.payload.interest === "중립"){
        ciNeutralCount++;
    }else if(result.payload.interest === "측정불가"){
        ciNACount++;
    }

    if(result.payload.valence === "긍정"){
        viPosCount++;
    }else if(result.payload.valence === "중립"){
        viNeutralCount++;
    }else if(result.payload.valence === "부정"){
        viNegCount++;
    }else if(result.payload.valence === "측정불가"){
        viNACount++;
    }

}

const captureImage_02 = (context) => {
    canvas_02.width = videoWidth;
    canvas_02.height = videoHeight;
    context.drawImage(video_02[0], 0, 0, canvas_02.width, canvas_02.height);

    const image = canvas_02.toDataURL('image/png', 1);
    const byteArray = btoa(
        new Uint8Array(base64ToArrayBuffer_02(image.replace(/^data:image\/(png|jpg);base64,/, "")))
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    const params = {
        "image": byteArray
    };
    return params;
}

const base64ToArrayBuffer_02 = (base64) => {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

const stopAnalysis_02 = () => {
    clearInterval(interval_02);
    video_02[0].srcObject.getTracks().forEach(function (track) {
        track.stop();
    });
    $("#cv_chart02").hide();
}

const calculateInterval_02 =(currResult)=>{
    if(currResult===prevInterest) {
        processingInterval_02++;
    }else{
        if(prevInterest.payload.interest === '긍정'){
            calculatedInterval_02.ciHigh.push(processingInterval_02);
        }else if(prevInterest.payload.interest ==='중립'){
            calculatedInterval_02.ciNeutral.push(processingInterval_02);
        }else if(prevInterest.payload.interest === '측정불가'){
            calculatedInterval_02.ciNA.push(processingInterval_02);
        }

        if(prevInterest.payload.valence === "긍정"){
            calculatedInterval_02.viPos.push(processingInterval_02);
        }else if(prevInterest.payload.valence === "부정"){
            calculatedInterval_02.viNeg.push(processingInterval_02);
        }else if(prevInterest.payload.valence === "중립"){
            calculatedInterval_02.viNeutral.push(processingInterval_02);
        }else if(prevInterest.payload.valence==="측정불가"){
            calculatedInterval_02.viNA.push(processingInterval_02);
        }
    }

    processingInterval_02 = 1;
    prevInterest = currResult;
}

const displayResults_02 =()=>{
    calculateInterval_02("finish");

    $("#ciHighTotal").text(calculatedInterval_02.ciHigh.length+'초');
    $("#ciNeutralTotal").text(calculatedInterval_02.ciNeutral.length +'초');
    $("#ciNATotal").text(calculatedInterval_02.ciNA.length+'초');

    $("#max-interested-time").text(Math.max(...calculatedInterval_02.ciHigh, 0)+'초');
    $("#min-interested-time").text(Math.max(...calculatedInterval_02.ciNeutral, 0)+'초');


    const ctx07 = $("#resDonut02")[0].getContext('2d');
    if(resDonut_02 !== undefined) resDonut_02.destroy();
    resDonut_02 = new Chart(ctx07, {
        type: "doughnut",
        data: {
            datasets: [
                {
                    data: [ciHighCount, ciNeutralCount , ciNACount],
                    backgroundColor: [
                        "#46c7ff", //흥미높음
                        "#ff5959", //흥미낮음
                        "#8957ff", //분석불가
                    ],
                    borderColor: [
                        "#46c7ff",
                        "#ff5959",
                        "#8957ff",
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
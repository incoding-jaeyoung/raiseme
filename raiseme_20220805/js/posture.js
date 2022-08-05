let startBtn_03;
let restartBtn_03;
let video_03;
let canvas_03;
let interval_03;
let seconds_03;
let likeCount;
let badCount;
let awayCount;
let resDonut_03;
let calculatedInterval_03;
let previousPosture;
let processingInterval_03;
videoWidth = 960;
videoHeight = 540;

$(() => {
    init_03();
})

const init_03 = () => {
    seconds_03 = 0;
    likeCount = 0;
    badCount = 0;
    awayCount = 0;
    video_03 = $('#video03');
    video_03[0].srcObject = null;
    startBtn_03 = $('#start03');
    startBtn_03.unbind('click');
    startBtn_03.bind('click', startAnalysis_03);
    canvas_03 = document.createElement('canvas');
    restartBtn_03 =$('#restart03');
    restartBtn_03.unbind('click');
    restartBtn_03.bind('click', reset_03);
    calculatedInterval_03 = {
        like: [],
        bad: [],
        away: []
    };
    previousPosture = null;
    processingInterval_03 = 1;

    $('#likeCount').text(likeCount + '초');
    $('#badCount').text(badCount + '초');
    $('#awayCount').text(awayCount + '초');

    $(".popup__btn-next").eq(2).bind('click', displayResults_03);

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(function (stream) {
              video_03[0].srcObject = stream;
          })
          .catch(function (error) {
              console.log("Something went wrong!");
          });
    }
}

const reset_03= () => {
    $("#ul-posture").children("li.select").trigger('click');
    $("#video03").get(0).play();
    $("#guideline_03").show();

    init_03();

}

const startAnalysis_03 = () => {
    try {
        navigator.mediaDevices.getUserMedia({
            video: { width: videoWidth, height: videoHeight },
            audio: false,
        }).then((stream) => {
            video_03[0].srcObject = stream;
            $(".popup__cont-time").find(".popup__btn-basic").unbind('click');
            $(".popup__cont-time").find(".popup__btn-basic").bind('click', stopAnalysis_03);
            startFaceAnalysis_03();
        })
    } catch (error) {
        console.log(error);
    }
};

const startFaceAnalysis_03 = () => {


    const context = canvas_03.getContext('2d');

    interval_03 = setInterval(async () => {
        if (seconds_03 > 30) {
            stopAnalysis_03();
        } else {
            const params = JSON.stringify(captureImage_03(context))

            $.ajax({
                url:BASE_URL+"/analysis/posture",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: params,
                async: false,
                success: function (result) {
                    if (result.payload.result === 'good') {
                        $('.popup__quick-foot div').attr('class', 'bg-BU');
                        $('.popup__quick-foot div span').attr('class', 'i-like2');
                        $('.popup__quick-foot div span').text('자세좋음');
                        $('#likeCount').text(likeCount + '초');
                        likeCount++;
                    } else if (result.payload.result === 'bad') {
                        $('.popup__quick-foot div').attr('class', 'bg-R');
                        $('.popup__quick-foot div span').attr('class', 'i-bad');
                        $('.popup__quick-foot div span').text('자세나쁨');
                        $('#badCount').text(badCount + '초');
                        badCount++;
                    } else if (result.payload.result === 'absent') {
                        $('.popup__quick-foot div').attr('class', 'bg-GY');
                        $('.popup__quick-foot div span').attr('class', 'i-away');
                        $('.popup__quick-foot div span').text('자리비움');
                        $('#awayCount').text(awayCount + '초');
                        awayCount++;
                    }
                    calculateInterval_03(result.payload.result);
                    seconds_03++;
                },
                error: function () {
                    console.log("An exception occurred from the remote server.");
                }
            });
        }
    }, 1000)
}

const captureImage_03 = (context) => {
    canvas_03.width = videoWidth;
    canvas_03.height = videoHeight;
    context.drawImage(video_03[0], 0, 0, canvas_03.width, canvas_03.height);

    const image = canvas_03.toDataURL('image/png', 1);
    const byteArray = btoa(
        new Uint8Array(base64ToArrayBuffer_03(image.replace(/^data:image\/(png|jpg);base64,/, "")))
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    const params = {
        "width": canvas_03.width,
        "height": canvas_03.height,
        "image": byteArray
    };

    return params;
}

const base64ToArrayBuffer_03 = (base64) => {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

const stopAnalysis_03 = () => {
    clearInterval(interval_03);
    video_03[0].srcObject.getTracks().forEach(function (track) {
        track.stop();
    });
}

const displayResults_03 =()=>{
    calculateInterval_03("finish");

    $("#resAway").text(awayCount+'초(' + calculatedInterval_03.away.length + '회)');
    $("#resLike").text(likeCount +'초(' + calculatedInterval_03.like.length + '회)');
    $("#resBad").text(badCount+'초(' + calculatedInterval_03.bad.length + '회)');

    $("#longest-away-time").text(Math.max(...calculatedInterval_03.away, 0)+'초');
    $("#longest-like-time").text(Math.max(...calculatedInterval_03.like, 0)+'초');
    $("#longest-bad-time").text(Math.max(...calculatedInterval_03.bad, 0)+'초');

    const ctx08 = $("#resDonut03")[0].getContext('2d');
    if(resDonut_03 !== undefined) resDonut_03.destroy();
    resDonut_03 = new Chart(ctx08, {
        type: "doughnut",
        data: {
            datasets: [
                {
                    data: [awayCount, likeCount , badCount],
                    backgroundColor: [
                        "#9196a9", //자리비움
                        "#46c7ff", //자세좋음
                        "#8957ff", //자세나쁨
                    ],
                    borderColor: [
                        "#9196a9",
                        "#46c7ff",
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
    });
}

const calculateInterval_03 = (currentPosture) => {
    if (currentPosture === previousPosture) {
        processingInterval_03++;
    } else {
        if (previousPosture === 'good') {
            calculatedInterval_03.like.push(processingInterval_03);
        } else if (previousPosture === 'bad') {
            calculatedInterval_03.bad.push(processingInterval_03);
        } else if (previousPosture === 'absent') {
            calculatedInterval_03.away.push(processingInterval_03);
        }
        processingInterval_03 = 1;
        previousPosture = currentPosture;
    }
}

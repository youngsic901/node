import * as tf from 'https://esm.sh/@tensorflow/tfjs@latest';
import * as tfvis from 'https://esm.sh/@tensorflow/tfjs-vis@latest';
import * as ss from 'https://esm.sh/simple-statistics@7.7.0';

let model;

async function fetchHousingData() {
    console.log('데이터 로드 중...');

    try{
        const response = await fetch('https://raw.githubusercontent.com/selva86/datasets/master/BostonHousing.csv');
        if(!response.ok){
            throw new Error(`데이터 읽기 실패 : ${response.statusText}`);
        }
        const data = await response.text();
        // console.log(data);
        const rows = data.split('\n').slice(1).filter(row => row.length > 0);
        // console.log(rows);

        const paseredData = rows.map(row => {
            const cols = row.split(',');
            // console.log(cols);
            return { // 방 갯수와 주택가격 칼럼만 반환
                rm:parseFloat(cols[5]),
                medv:parseFloat(cols[13])
            }
        });

        // console.log(paseredData);
        return paseredData;
    } catch(error) {
        console.error(error);
        return [];
    }
}

function createScatterPlot(dataX, dataY, predictions) {
    const actualValues = dataX.map((x, i) => ({x:x, y:dataY[i]}));
    const predictValues = dataX.map((x, i) =>({x:x, y:predictions[i]}));

    const container = document.getElementById("scatter-plot");

    tfvis.render.scatterplot(container, {values:[actualValues, predictValues]},
        {
            xLabel:'주택당 방 수(RM)',
            yLabel:'주택의 평균 중간값(MEDV)',
            height:500,
            series:['Actual', 'Predicted'],
            yAxisDomain: [0, 60],  // 예시: y축 0~60까지 표시 (데이터 범위에 따라 조절)
            yAxis: {
                scaleType: 'linear',
            }
        }
    );
}

export async function runAnaylsis() {
     console.log('분석 시작...');

     // 데이터 로딩
     const data = await fetchHousingData();
     if(data.length ===0) {
        console.log('데이터가 없음');
        return;
     }

     const dataX = data.map(d => d.rm);     // 독립변수
     const dataY = data.map(d => d.medv);   // 종속변수
    //  console.log(dataX);
    //  console.log(dataY);

    // 데이터를 2D 텐서(벡터)로 변환
    const tensorX = tf.tensor2d(dataX, [dataX.length, 1]);
    const tensorY = tf.tensor2d(dataY, [dataY.length, 1]);

    if(!model) {
        // 모델 초기화 및 학습
        model = tf.sequential();
        model.add(tf.layers.dense({units:1, inputShape:[1]}));
        model.compile({loss:'meanSquaredError', optimizer:'sgd'});
        
        await model.fit(tensorX, tensorY, {epochs:500});
        console.log('모델 학습 완료');

        // 예측
        const predictions = model.predict(tensorX).dataSync();

        // 산포도 차트를 생성하여 실제값과 예측값 비교
        createScatterPlot(dataX, dataY, predictions);
        displayPredictions(dataY, predictions);
    }

    document.getElementById("result-container").style.display = "block";
}

// 실제값과 예측값을 목록으로 표시하는 함수
function displayPredictions(dataY, predictions){
    const predictionList = document.getElementById("predictions-list");
    predictionList.innerHTML = '';

    predictions.forEach((pred, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `실제값 : ${dataY[index].toFixed(2)}, 예측값 : ${pred.toFixed(2)}`;
        predictionList.appendChild(listItem);
    });
}

export async function predictPrice() {
    // 사용자가 입력한 방 갯수를 받아 방값 예측
    const roomsInput = document.getElementById("roomsInput").value;
    if(roomsInput && model){
        console.log('입력된 방수 : ', roomsInput);

        // 입력값을 2D 텐서로 변환
        const inputTensor = tf.tensor2d([parseFloat(roomsInput)], [1,1]);

        let prediction = model.predict(inputTensor).dataSync()[0];
        // console.log('예측된 가격 : ', prediction);
        if(prediction < 0) {
            prediction = 0;
            console.log('방 갯수가 너무 적음');
        }
        document.getElementById("singlePrediction").textContent = `예측 가격은 ${prediction.toFixed(2)}`
    } else {
        document.getElementById("singlePrediction").textContent = '방 갯수 입력';
    }
}

document.getElementById("showButton").addEventListener('click', runAnaylsis);
document.getElementById("predictButton").addEventListener('click', predictPrice);
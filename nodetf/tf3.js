const iris_csv_url = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv";

let model;

async function loadIrisData() {
    const response = await fetch(iris_csv_url);
    const data = await response.text();
    // console.log(data);
    const lines = data.split('\n').slice(1);
    // console.log(lines);
    const features = []; // 참고 : 독립변수(x)를 ML에서는 featurs라고 부름
    const labels = [];

    lines.forEach(line => {
        const [sepalLength, sepalWidth, petalLength, petalWidth, species] = line.split(',');

        if(!species) return;
        features.push([
            parseFloat(sepalLength), 
            parseFloat(sepalWidth), 
            parseFloat(petalLength), 
            parseFloat(petalWidth)
        ]);

        //label(꽃의 종류)은 One-hot incoding 사용
        if(species === 'setosa') labels.push([1,0,0]);
        if(species === 'versicolor') labels.push([0,1,0]);
        if(species === 'virginica') labels.push([0,0,1]);
    });

    // console.log(features);
    // console.log(labels);

    return{
        features: tf.tensor2d(features),
        labels: tf.tensor2d(labels)
    }
}

async function trainModel() {
    // 로딩 메세지 표시
    document.getElementById('loadingMessage').style.display = 'block';

    const data = await loadIrisData();
    // console.log(data);
    // 텐서를 배열로 변환
    const featuresArray = await data.features.arraySync();
    const labelsArray = await data.labels.arraySync();
    console.log(featuresArray);

    data.features.dispose();
    data.labels.dispose();

    // 모델 생성 후 학습
    model = tf.sequential();
    model.add(tf.layers.dense({inputShape:[4], units:16, activation: 'relu'}));
    model.add(tf.layers.dense({units:3, activation: 'softmax'}));

    model.compile({
        loss:'categoricalCrossentropy',
        optimizer:tf.train.adam(),
        metrics:['accuracy']
    });

    // 학습 상태 시각화 콜백
    const metricsContainer = {
        name:'학습 진행 상태',
        tab: 'Training'
    };

    const callbacks = tfvis.show.fitCallbacks(metricsContainer, ['loss', 'acc'], {
        height: 200,
        callbacks:['onEpochEnd']
    });

    const history = await model.fit(tf.tensor2d(featuresArray), tf.tensor2d(labelsArray), {
        epochs:100,
        callbacks:callbacks
    });
    console.log(history.history);

    document.getElementById('trainingStatus').innerText = `모델 학습 완료(정확도:${(history.history.acc.slice(-1)[0] * 100).toFixed(2)}%)`;

    // 로딩 메세지 숨기기
    document.getElementById('loadingMessage').style.display = 'none';

    tfvis.show.modelSummary({name: '요약', tab:'모델정보'}, model); // 모델 정보 시각화

    visualizeScatterPlot(featuresArray, labelsArray); // 산포도 시각화
}

function visualizeScatterPlot(featuresArray, labelsArray) {
    const classes = ['setosa', 'versicolor', 'virginica'];

    // 각 품종별 데이터 분리
    const seriesData = classes.map((className, classIndex) => {
        const values = featuresArray
            .map((feature, i) => {
                const label = labelsArray[i].indexOf(1);   // One-hot에서 클래스 인덱스 가져오기
                if (label === classIndex) {
                    return { x: feature[0], y: feature[2] };  // Sepal Length vs Petal Length
                }
                return null;
            })
            .filter(point => point !== null);    // 유효한 데이터만 필터링
        return { name: className, values };    // 시리즈 생성
    });

    // 시리즈 데이터와 색상 매핑의 길이를 검증
    console.log('Series Data:', seriesData);

    // Scatter Plot 렌더링
    tfvis.render.scatterplot(
        { name: 'Sepal Length vs Petal Length (품종별)' },
        { values: seriesData.map(series => series.values) }, // 데이터 시리즈의 values만 전달
        {
            xLabel: 'Sepal Length',
            yLabel: 'Petal Length',
            height: 400,
            seriesColors: ['red', 'yellow', 'blue'],   // 각 시리즈에 대해 색상 지정
        }
    );
}

async function predictSpecies() {
    if(!model){
        alert('모델이 아직학습되지 않음');
        return;
    }

    const sepalLength = parseFloat(document.getElementById('sepalLength').value);
    const sepalWidth = parseFloat(document.getElementById('sepalWidth').value);
    const petalLength = parseFloat(document.getElementById('petalLength').value);
    const petalWidth = parseFloat(document.getElementById('petalWidth').value);
    const inputTensor = tf.tensor2d([[sepalLength, sepalWidth, petalLength, petalWidth]]);
    const prediction = model.predict(inputTensor);
    // alert(prediction);
    const predictIndex = prediction.argMax(-1).dataSync()[0];
    // alert(predictIndex);
    
    inputTensor.dispose();

    let pred_species;

    if(predictIndex === 0) pred_species = 'setosa';
    else if(predictIndex === 1) pred_species = 'versicolor';
    else if(predictIndex === 2) pred_species = 'virginica';

    document.getElementById('scatter-plot').innerText = `예측된 꽃은 iris 중 ${pred_species}`;
}

document.getElementById('trainModelButton').addEventListener('click', trainModel);
document.getElementById('predictButton').addEventListener('click', predictSpecies);
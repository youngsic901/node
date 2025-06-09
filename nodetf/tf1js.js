export function abc() {
    const model = tf.sequential(); // 순차모델 생성(단순한 신경망 모델로 Layer가 순서대로 쌓여있는 구조)
    
    // dense(node, 뉴런)
    model.add(tf.layers.dense({units:1, inputShape:[1]}));

    // 학습을 위한 준비(손실함수와 최적화 함수를 설정)
    // optimizer : y = wx + b 일 때 (w : 기울기, b : 절편) 랜덤한 w와 b를 최적의 값으로 조정
    model.compile({loss:'meanSquaredError', optimizer:'sgd'});

    const xs = tf.tensor2d([1,2,3,4,5,6,7,8,9,10],[10,1]); // 독립변수(x) - 영향을 주는 변수
    const ys = tf.tensor1d([1,0,5,4,6,8,4,8,9,12]); // 종속변수(y, 답) - 영향을 받는 변수
    // 학습은 모델을 통해 미지의 숫자에 대한 결과치는 얼마일까? 에 대한 답을 구하는 것이 목적

    // 데이터를 이용해 학습
    model.fit(xs, ys).then(() => {
        const prediction = model.predict(tf.tensor2d([6], [1,1])); // 모델에서 예측한 결과 반환
        prediction.print();
        // document.getElementById("aa").innerText = prediction.tostring();
        document.getElementById("aa").innerText = prediction.dataSync();

        chart();
    });

    function getData() {
        // dataSync() : 텐서(벡터, 배열)의 모든 값을 동기적으로 가져와 자바스크립트 배열로 반환한다.
        const dataX = xs.dataSync();
        const dataY = ys.dataSync();

        return Array.from(dataX).map((value, index) => {
            return {index:value, value:dataY[index]};
        });
    }

    function chart(){
        const surface = tfvis.visor().surface({name:'MyBarchart'});
        tfvis.render.barchart(surface, getData());
    }
}
function Chart(ctx, data){
    this.canvasWid = ctx.getAttribute("width");
    this.canvasHei = ctx.getAttribute("height");
    this.ctx = ctx;
    this.data = data;
    this.drawStick = function() {
        console.log("stick OK");
        let stickSize = this.canvasHei / 10;
        let stickGap = stickSize / 2;
        this.ctx.setAttribute("width", (this.data.datasets.data.length * (stickSize + stickGap) + stickGap + 1) * 2);
        let canvasWid = this.ctx.getAttribute("width");
        let maxSize = this.canvasHei - stickSize;
        this.ctx = this.ctx.getContext("2d");


        /* 기준 선 그리기 */
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#333333";
        this.ctx.moveTo(stickGap, stickSize);
        this.ctx.lineTo(stickGap, this.canvasHei - stickSize);

        this.ctx.moveTo(stickGap, this.canvasHei - stickSize);
        this.ctx.lineTo(canvasWid - stickGap, this.canvasHei - stickSize);
        this.ctx.stroke();

        /* 그래프 그리기 */
        let i = 0;
        let maxValue = 0;
        while(i< this.data.datasets.data.length) {

            if( this.data.datasets.data[i] > maxValue ) {
                maxValue = this.data.datasets.data[i];
            }
            i++;
        }
        console.log(maxValue);
        i = 0;
        while(i < this.data.datasets.data.length) {
            this.ctx.fillStyle = this.data.datasets.backgroundColor[i];
            this.ctx.fillRect(
                (stickSize * i) + (stickGap * (i+1)) * 3,
                (maxSize + stickSize) - (maxSize * (this.data.datasets.data[i] / maxValue)),
                stickSize,
                maxSize - stickSize - (maxSize - (maxSize * (this.data.datasets.data[i] / maxValue)))
            );

            /* 데이터 이름 출력 */
            this.ctx.font = "bold 15px Arial";
            this.ctx.fillStyle = "#333333";
            this.ctx.textAlign = "center";
            this.ctx.fillText(
                this.data.labels[i],
                (stickSize * i) + (stickGap * (i+1)) * 3 + stickGap,
                this.canvasHei - stickSize + 15
            );

            /* 데이터 퍼센트 출력 */
            this.ctx.font = "bold 13px "+this.fontFamily;
            this.ctx.fillStyle = "#333";
            this.ctx.textAlign = "center";
            this.ctx.fillText(
                (this.data.datasets.data[i] / maxValue * 100).toFixed(2) + "%",
                (stickSize * i) + (stickGap * (i+1)) * 3 + stickGap,
                (maxSize + stickSize) - (maxSize * (this.data.datasets.data[i] / maxValue)) - 10
            );

            /* 데이터 값 출력 */
            this.ctx.font = "bold 15px "+this.fontFamily;
            this.ctx.fillStyle = "#fff";
            this.ctx.textAlign = "center";
            this.ctx.fillText(
                this.data.datasets.data[i],
                (stickSize * i) + (stickGap * (i+1)) * 3 + stickGap,
                (maxSize + stickSize) - (maxSize * (this.data.datasets.data[i] / maxValue)) + 20
            );
            i++;
        }
    }
    this.drawCircle = function() {
        console.log("circle OK");
        let cols = this.data.datasets.columns;
        let rows = this.data.datasets.rows;
        let boxSize = (this.data.datasets.radiusSize + this.data.datasets.borderWidth) / 2;
        let radius = this.data.datasets.radiusSize / 2;
        let border = this.data.datasets.borderWidth;
        let bgColor = this.data.datasets.backgroundColor;
        let data = this.data.datasets.data;
        let labels = this.data.labels;
        let refValue = this.data.datasets.refValue;
        let i = 0;
        console.log(refValue);
        0
        // 보더가 더 큰 경우 보더크기를 조정
        if( border > boxSize ) {
            border = boxSize;
        }

        // 기준점이 없을 때, 데이터 중 제일 높은 값을 기준점으로
        if ( refValue == undefined ) {
            refValue = 0;
            while( i < data.length ) {
                if ( data[i] > refValue ) {
                    refValue = data[i];
                }
                i++;
            }
        }
        console.log(refValue);

        this.ctx.setAttribute("width", (boxSize * 2 * cols) + (boxSize * (cols - 1)));
        this.ctx.setAttribute("height", (boxSize * 2 * rows) + (boxSize * (rows - 1)));
        this.ctx = this.ctx.getContext("2d");

        let circleStart = 1.5;
        let circleEnd = 0;
        i = 0;
        let cnt = 0;
        while(i < rows) {
            let j = 0;
            while(j< cols) {
                if(data[cnt] != undefined) {
                    circleEnd = circleStart + (data[cnt] / refValue * 2);

                    /* 호 그리기 */
                    this.ctx.beginPath();
                    this.ctx.lineWidth = border;
                    this.ctx.strokeStyle = bgColor[cnt];
                    this.ctx.arc(boxSize + (boxSize * 3 * j), boxSize + (boxSize * 3 * i), radius, circleStart * Math.PI, circleEnd * Math.PI);
                    this.ctx.stroke();


                    /* 데이터 이름 출력 */
                    this.ctx.font = "bold 15px Arial";
                    this.ctx.fillStyle = "#333333";
                    this.ctx.textAlign = "center";
                    this.ctx.fillText(
                        this.data.labels[cnt],
                        boxSize + (boxSize * 3 * j),
                        boxSize + (boxSize * 3 * i) + 25
                    );


                    /* 데이터 값 출력 */
                    this.ctx.font = "bold 15px "+this.fontFamily;
                    this.ctx.fillStyle = "#000";
                    this.ctx.textAlign = "center";
                    this.ctx.fillText(
                        data[cnt],
                        boxSize + (boxSize * 3 * j),
                        boxSize + (boxSize * 3 * i)
                    );
                    

                    /* 데이터 퍼센트 출력 */
                    this.ctx.font = "bold 13px "+this.fontFamily;
                    this.ctx.fillStyle = "#777";
                    this.ctx.textAlign = "center";
                    this.ctx.fillText(
                        (data[cnt] / refValue * 100).toFixed(2) + "%",
                        boxSize + (boxSize * 3 * j),
                        boxSize + (boxSize * 3 * i) - 25
                    );
                }
                j++;
                cnt ++;
            }
            i++;
        }


    }
    this.drawDoughnut = function() {
        console.log("doughnut Ok");
        if( this.canvasWid >= this.canvasHei ) {
            this.ctx.setAttribute("width", this.canvasHei);
            var radius = (this.canvasHei - this.data.datasets.borderWidth) / 2;
            var frame = this.canvasHei/2;
        } else {
            this.ctx.setAttribute("height", this.canvasWid);
            var radius = (this.canvasWid - this.data.datasets.borderWidth) / 2;
            var frame = this.canvasWid/2;
        }
        this.ctx = this.ctx.getContext("2d");
        let i = 0; let sumData = 0;
        while(i < this.data.datasets.data.length) {
            sumData += this.data.datasets.data[i];
            i++;
        }
        let circleStart = 1.5;
        let circleEnd = 0;
        i = 0;
        while(i < this.data.datasets.data.length) {
            let textX = 0;
            let textY = 0;

            circleEnd = circleStart + (this.data.datasets.data[i]/sumData*2);

            /* 호 그리기 */
            this.ctx.beginPath();
            this.ctx.lineWidth = this.data.datasets.borderWidth;
            this.ctx.strokeStyle = this.data.datasets.backgroundColor[i];
            this.ctx.arc(frame, frame, radius, circleStart * Math.PI, circleEnd * Math.PI);
            this.ctx.stroke();
            this.ctx.closePath();
            
            /* 정보 텍스트 */
            
            textX = (radius * 1.1) + (frame * 0.7 * Math.cos((circleStart - ((circleStart - circleEnd) / 2)) * Math.PI));
            textY = (radius * 1.1) + (frame * 0.7 * Math.sin((circleStart - ((circleStart - circleEnd) / 2)) * Math.PI));
            this.ctx.globalCompositeOperation = "source-over";

            this.ctx.beginPath();
            this.ctx.font = "bold "+frame/10+"px "+this.fontFamily;
            this.ctx.fillStyle = "#333333";
            this.ctx.textAlign = "center";
            this.ctx.fillText(this.data.labels[i], textX, textY - 5);

            this.ctx.font = frame/15+"px "+this.fontFamily;
            this.ctx.fillStyle = "#777777";
            this.ctx.textAlign = "center";
            this.ctx.fillText((this.data.datasets.data[i]/sumData*100).toFixed(2) + "%", textX, textY + 15);

            this.ctx.closePath();
            circleStart = circleEnd;

            i++;
        }
    }
    this.drawPie = function() {
        console.log("pie Ok");
        if( this.canvasWid >= this.canvasHei ) {
            this.ctx.setAttribute("width", this.canvasHei);
            var frame = this.canvasHei/2;
        } else {
            this.ctx.setAttribute("height", this.canvasWid);
            var frame = this.canvasWid/2;
        }
        this.ctx = this.ctx.getContext("2d");
        let i = 0; let sumData = 0;
        while(i < this.data.datasets.data.length) {
            sumData += this.data.datasets.data[i];
            i++;
        }
        let circleStart = 1.5;
        let circleEnd = 0;
        i = 0;
        while(i < this.data.datasets.data.length) {
            let textX = 0;
            let textY = 0;

            circleEnd = circleStart + (this.data.datasets.data[i]/sumData*2);

            /* 호 그리기 */
            
            this.ctx.beginPath();
            this.ctx.lineWidth = frame;
            this.ctx.strokeStyle = this.data.datasets.backgroundColor[i];
            this.ctx.arc(frame, frame, (frame/2), circleStart * Math.PI, circleEnd * Math.PI);
            this.ctx.stroke();
            this.ctx.closePath();
            
            /* 정보 텍스트 */
            
            textX = frame + (frame * 0.7 * Math.cos((circleStart - ((circleStart - circleEnd) / 2)) * Math.PI));
            textY = frame + (frame * 0.7 * Math.sin((circleStart - ((circleStart - circleEnd) / 2)) * Math.PI));
            this.ctx.globalCompositeOperation = "source-over";

            this.ctx.beginPath();
            this.ctx.font = "bold "+frame/10+"px "+this.fontFamily;
            this.ctx.fillStyle = "#333333";
            this.ctx.textAlign = "center";
            this.ctx.fillText(this.data.labels[i], textX, textY - 5);

            this.ctx.font = frame/15+"px "+this.fontFamily;
            this.ctx.fillStyle = "#999";
            this.ctx.textAlign = "center";
            this.ctx.fillText((this.data.datasets.data[i]/sumData*100).toFixed(2) + "%", textX, textY + 15);

            this.ctx.closePath();
            circleStart = circleEnd;

            i++;
        }
    }
    this.drawLine = function() {
    }

    switch(this.data.type) {
        case "stick" : this.drawStick(); break;
        case "horizon_stick" : this.drawHorizonStick(); break;
        case "circle" : this.drawCircle(); break;
        case "doughnut" : this.drawDoughnut(); break;
        case "pie" : this.drawPie(); break;
        case "line" : this.drawLine(); break;
        default : break;
    }
}
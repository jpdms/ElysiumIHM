/* 
 * Création de 3 graphes X, Y, Z avec canvasJS
 */
window.onload = function () {
    var dpsX = [];      // les points sur X
    var dpsY = [];      // les points sur Y
    var dpsZ = [];      // les points sur Z
    
    var nbPoints = 0;           // nbr de points dans le graphe (inutile)
    var yValX = 0;              // valeur initiale de la courbe X
    var yValY = 0;
    var yValZ = 0;	
    var nbVal = 20;             // nb de points ajoutés à chaque intervalle de temps
    var updateInterval = 200;   // durée d'un intervalle de temps en ms
    var dataLength = 3000;      // nombre de points visibles dans le graphe
                                // 30s à 100Hz
    var chartX = new CanvasJS.Chart("divChartX", {
        axisX:{ valueFormatString: "hh:mm:ss"},
        axisY: { valueFormatString: "#0mg" },
        includeZero: true,	
        data: [{
            type: "line",
            color: "orange",
            dataPoints: dpsX
        }]
    });
    var chartY = new CanvasJS.Chart("divChartY", {
        axisX:{ valueFormatString: "hh:mm:ss"},
        axisY: {valueFormatString: "#0mg"},
        includeZero: true,		
        data: [{
            type: "line",
            color: "green",
            dataPoints: dpsY
        }]
    });
    var chartZ = new CanvasJS.Chart("divChartZ", {
        axisX:{ valueFormatString: "hh:mm:ss"},
        axisY: {valueFormatString: "#0mg"},
        includeZero: true,		
        data: [{
            type: "line",
            color: "darkBlue",
            dataPoints: dpsZ
        }]
    });

    var updateChart = function () {
        var date = new Date();
        var time = date.getTime();

        for (var j = 0; j < nbVal; j++) {	
            yValX +=  Math.round(5 -10*Math.random());
            yValY +=  Math.round(5 -10*Math.random());
            yValZ +=  Math.round(5 -10*Math.random());
            dpsX.push({ x: date, y: yValX });
            dpsY.push({ x: date, y: yValY });
            dpsZ.push({ x: date, y: yValZ });
            nbPoints++;
            time += 10;             // ajout de 10ms, acquisition à 100 Hz
            date = new Date(time);
        };
        if (dpsX.length > dataLength) {
            nbEnTrop = dpsX.length - dataLength;
            for (var i = 0; i < nbEnTrop; i++) {
                dpsX.shift();
                dpsY.shift();
                dpsZ.shift();
            }
        }
        chartX.render();
        chartY.render();
        chartZ.render();		
    };
    // pour des graphes fixes (test)
    // updateChart(); 
    // mise à jour cyclique (temps réel) des datas 
    setInterval(function(){updateChart();}, updateInterval); 
};
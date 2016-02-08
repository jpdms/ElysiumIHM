/* 
 * Création de 3 graphes X, Y, Z avec canvasJS
 * 
 */

// ----------------- Variables globales nécessaires ----------------------
var chartX;
var chartY;
var chartZ;
var dpsX = [];      // les points sur X
var dpsY = [];      // les points sur Y
var dpsZ = [];      // les points sur Z

window.onload = function () {
    // 30s à 100Hz
    chartX = new CanvasJS.Chart("divChartX", {
        axisX: {valueFormatString: "hh:mm:ss"},
        axisY: {valueFormatString: "#0mg"},
        includeZero: true,
        backgroundColor: "#fdf1e3",
        data: [{
                type: "line",
                color: "orange",
                dataPoints: dpsX
            }]
    });
    chartY = new CanvasJS.Chart("divChartY", {
        axisX: {valueFormatString: "hh:mm:ss"},
        axisY: {valueFormatString: "#0mg"},
        includeZero: true,
        backgroundColor: "#fdf1e3",
        data: [{
                type: "line",
                color: "green",
                dataPoints: dpsY
            }]
    });
    chartZ = new CanvasJS.Chart("divChartZ", {
        axisX: {valueFormatString: "hh:mm:ss"},
        axisY: {valueFormatString: "#0mg"},
        includeZero: true,
        backgroundColor: "#fdf1e3",
        data: [{
                type: "line",
                color: "darkBlue",
                dataPoints: dpsZ
            }]
    });
};

/* ------------------ traiter la trame sismometre -----------------------------
 * Cette trame contient N datas sismométrique 
 * Une donnée sismométrique est constitue de : sXXXX,sYYYY,sZZZZ (17 caractères)
 * Les données sont séparées par ';'
 * Mots clef Requête mv (mesure vibration)
 * s : signe, XXXX : valeur des vibrations en X
 * t : signe, YYYY : valeur des vibrations en Y
 * u : signe, ZZZZ : valeur des vibrations en Z
 * Symbole de fin de trame ;
 * Par exemple : 
 *   +0000,+0000,+0000;+0003,+0001,+0001;+0012,+0003,+0002;+0007,+0001,+0000;
 *   Au max : 50 données par trame par 1/2s => 50x18 cars = 900 cars
 *   La trame se terminera par un zéro (null)
 ----------------------------------------------------------------------------- 
 */
function g_updateDonnees(trame) {
    var nbPoints = 0;           // nbr de points dans le graphe (inutile)
    var yValX = 0;              // valeur initiale de la courbe X
    var yValY = 0;
    var yValZ = 0;
    var dataLength = 3000;      // 30s de points visibles dans le graphe
    var date = new Date();
    var time = date.getTime();

    var donnees = trame.split(";");    // Je sépare les mesures (une toutes les 10ms)
    var nbDonnees = donnees.length;
    for (var i = 0; i < nbDonnees - 1; i++) {
        // je sépare les valeurs en X, Y, Z
        var valeurs = donnees[i].split(",");
        if (valeurs.length == 3) {
            yValX = parseInt(valeurs[0]);
            yValY = parseInt(valeurs[1]);
            yValZ = parseInt(valeurs[2]);
            dpsX.push({x: date, y: yValX});
            dpsY.push({x: date, y: yValY});
            dpsZ.push({x: date, y: yValZ});
            //document.write("<br/>" + dpsX.length + " : ");
            //document.write(yValX + " " + yValY + " " + yValZ);
            nbPoints++;
            time += 10;             // ajout de 10ms, acquisition à 100 Hz
            date = new Date(time);
        }
    }
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
}

function formater(num) {
    var s = "0000";
    if (num < 0) {
        s += -num;
        return '-' + s.substr(s.length - 4);
    }
    else {
        s += num;
        return '+' + s.substr(s.length - 4);
    }
}

function faireTrame(nbVal) {
    var x, y, z;
    var trame = "";
    for (var j = 0; j < nbVal; j++) {
        x = Math.round(500 - 1000 * Math.random());
        y = Math.round(500 - 1000 * Math.random());
        z = Math.round(500 - 1000 * Math.random());
        trame += formater(x) + "," + formater(y) + "," + formater(z) + ";";
    }
    return trame;
}

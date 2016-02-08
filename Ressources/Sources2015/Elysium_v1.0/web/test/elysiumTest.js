/* 
 * Scripts en Javascript permettant le dynamisme du site INSIGHT
 * 
 * Syntaxe des sélecteurs $() en JQuery
 * http://www.w3schools.com/jquery/jquery_ref_selectors.asp
 * 
 * Pour tester le JS : http://jsfiddle.net + jQuery 1.11.0 + jQuery Mobile 1.4.4
 * 
 * Utilise 'CBatterie.js' & 'CIhm.js'
 * 
 */

/* global CONF_OUVERTURE_PINCE, CONF_POSE_HP3, CONF_LACHER_WTS, CONF_SAISIR_WTS, CONF_NIVELL_SEIS, CONF_LACHER_SEIS, CONF_LANCER_TESTS, CONF_SAISIR_SEIS, CONF_REPRISE_PB_PAN1, CONF_REPRISE_PB_PAN2, CONF_REMONTER_HP3_POUR_ARRET, CONF_REMONTER_WTS_POUR_ARRET, REMONTER_SEIS_POUR_ARRET, CONF_FERMER_PANNEAUX_POUR_ARRET, C_REPRISE_WTS, C_DEPOSE_WTS, C_REPRISE_SEIS, C_DEPOSE_SEIS, C_REPRISE_HP3, C_DEPOSE_HP3, C_ARRET_SYSTEME, C_OUVERTURE_PANNEAUX, C_FERMETURE_PANNEAUX, U_ARRU, DECISION_DEFAUT_DETECTES_DONC_ARRETER, DECISION_DEFAUT_DETECTES_MAIS_CONTINER, DECISION_SORTIE_INITIALISATION_ET_ARRETER, DECISION_SORTIE_INITIALISATION_ET_CONTINUER, DECISION_SORTIE_TESTS_ET_ARRETER, DECISION_SORTIE_TESTS_ET_CONTINUER, DECISION_BATTERIE_FAIBLES_DONC_ARRETER, DECISION_BATTERIE_FAIBLES_MAIS_CONTINUER, U_FIN_ARRU */

// ----------------- Déclaration de variable globales -----------------------
var SIMU = false;                // si on est sur le simulateur, false sinon

var PANNEAUX = 0;
var HP3 = 1;
var SEIS = 2;
var WTS = 3;
var PANNEAUX_O = 0;
var PANNEAUX_F = 1;
var HP3_D = 2;
var HP3_R = 3;
var SEIS_D = 4;
var SEIS_R = 5;
var WTS_D = 6;
var WTS_R = 7;
var QUITTER = 8;
var START = 2;
var STOP = 3;

var ihm = new CIhm();           // état fictif pour tester la classe 'CIhm'
var batterie = new CBatterie(); // pour tester la classe 'Batterie'
// --------------------------------------------------------------------------

/**
 * ---------- Fonction exécutée après le chargement de la page --------------
 */ 
$(function() {
    $( document ).ready(init);      // lancé quand le DOM est initialisé (prêt)
    // --------------------------- page 2 ------------------------------
    $("#btnTest1").click(function() { btnTest1(); });
    $("#btnTest2").click(function() { btnTest2(); });
    $("#btnTest3").click(function() { btnTest3(); });
    
    $("#btnMain_P1").click(function() { btnMain_P1(); });
    $("#btnMain_P5").click(function() { btnMain_P5(); });
    // -------------------------- main page ----------------------------
    // clicks d'infos sur les icones du HEADER
    $("#imgNasa").click(function() { ihm.openPopup("popNasa"); });
    $("#imgCnes").click(function() { ihm.openPopup("popCnes"); });
    $("#imgInsight").click(function() { ihm.openPopup("popInsight"); });
    $("#imgElysium").click(function() { ihm.openPopup("popElysium"); });
    $("#imgAcToulouse").click(function() { ihm.openPopup("popAcToulouse"); });
    $("#imgLangue").click(function() { ihm.openPopup("popLangue"); });
    $("#divBatterie").click(function() { ihm.openPopup("popBatterie"); });
    // ---------- fermeture des popup liées aux icones du HEADER --------------
    $("#popNasa").click(function() { ihm.closePopup(); });
    $("#popCnes").click(function() { ihm.closePopup(); });
    $("#popInsight").click(function() { ihm.closePopup();});
    $("#popElysium").click(function() { ihm.closePopup(); });
    $("#popAcToulouse").click(function() { ihm.closePopup(); });
    
    // --------------- gestion des popups de commandes -------------------------
    $("#btnPanneaux").click(function() { btnCommande(PANNEAUX); });
    $("#btnSEIS").click(function() { btnCommande(SEIS); });
    $("#btnWTS").click(function() { btnCommande(WTS); });
    $("#btnHP3").click(function() { btnCommande(HP3); });
    $("#btnQuitter").click(function() { btnCommande(QUITTER); });
    $("#btnQuitter_P1").click(function() { btnCommande(QUITTER); });
    
    $("#btnPopCommandeOK").click(function() { btnPopCommande(true); });
    $("#btnPopCommandeNO").click(function() { btnPopCommande(false); });
    
    $("#btnPopConfirm").click(function() { btnPopConfirm(); });
    
    $("#btnPopDecisionOK").click(function() { btnPopDecision(true); });
    $("#btnPopDecisionNO").click(function() { btnPopDecision(false); });
    
    // --------------- gestion des popups de vidéo/graphes ---------------------
    $("#video").click(function() { video(); });
    $("#divGraphe").click(function() { divGraphe();});
    $("#btnPopVideoShowGraphe").click(function() { btnPopVideoShowGraphe(); });
    $("#btnPopShowGraphe").click(function() { btnPopShowGraphe(); });
    $("#btnPopChangeVue").click(function() { btnPopChangeVue(); });
    $("#btnPopGrapheReset").click(function() { btnPopGrapheReset(); });
    $("#btnPopGrapheStart").click(function() { btnPopGrapheStart(); });
    
    // -------------------- gestion des langues -------------------------------
    $("#btnPopFrancais").click(function() { setLangue('fr'); });
    $("#btnPopAnglais").click(function() { setLangue('us'); });
    
    // -------------------- gestion de l'ARU ----------------------------------
    $("#btnARU").click(function() { btnARU();});
    $("#btnPopAruOK").click(function() { btnPopAruOK();});
});

/**
 * fonction d'initialisation de l'IHM relancée à chaque actualisation de la page
 */ 
function init() {
    document.onselectstart = new Function ("return false");
    $("[data-role='header'], [data-role='footer']").toolbar();
    $("[data-role='popup']").popup().enhanceWithin();
    sseConnexion();
    $("#imgCamera").attr("src", (SIMU ? "images/lander.jpg" : "http://10.5.128.3/ipcam/mjpeg.cgi"));
    cacherGraphe();                 // au départ on ne voit que la vidéo
    ml_setLangue("fr");
    ihm.disableButton("btnWTS");    // seul ce bouton n'est pas accessible
    ihm.montrerPage(3);
}

function btnTest1() {
    ihm.showInit(0,0);
    ihm.showInit(1,1);
    ihm.showInit(2,2);
}

function btnTest2() {
    ihm.showInit(0, 1);
    ihm.showInit(1, 2);
}

function btnTest3() {
    ihm.removeInit(1);
}

function btnMain_P1() {
    c_envoi(CONF_LANCER_TESTS);
}

function btnMain_P5() {
    ;
}

/**
 */
function btnPopGrapheStart() {        // gestion locale
    ihm.closePopup();
    var etat = ihm.getEtat("btnPopGrapheStart");
    if (etat === 0) {                            // le graphe est actif
        g_pause();
        // cacher le bouton de reset, pas de reset possible en pause
        ihm.cacher("btnPopGrapheReset");
        ihm.setEtat("btnPopGrapheStart", 1);    // on l'arrête
    }
    else {
        g_start();
        ihm.montrer("btnPopGrapheReset");       // montrer le bouton de reset
        ihm.setEtat("btnPopGrapheStart", 0);    // on le relance
    }
    ml_updateEtat();
}

function btnPopChangeVue() {        // gestion locale
    ihm.closePopup();
    if ($("#div3Graphes").hasClass("hide")) {
        ihm.montrer("div3Graphes");
        ihm.cacher("divGrapheXYZ");
    }
    else {
        ihm.montrer("divGrapheXYZ");
        ihm.cacher("div3Graphes");
    }
    g_refresh();
}

function btnPopVideoShowGraphe() {        // gestion locale
    ihm.closePopup();
    var etat = ihm.getEtat("btnPopVideoShowGraphe");
    if (etat === 0)
        cacherGraphe();
    else
        montrerGraphe();
}

function btnPopShowGraphe() {        // gestion locale
    ihm.closePopup();
    var etat = ihm.getEtat("btnPopShowGraphe");
    if (etat === 0)
        cacherGraphe();
    else
        montrerGraphe();
}

function btnPopGrapheReset() {        // gestion locale
    ihm.closePopup();
    g_resetDatas();
}

function montrerGraphe() {        // gestion locale
    $("#imgCamera").css({left:"10px"});              // mettre la vidéo à gauche
    ihm.montrer("divGraphe");
    g_refresh();                // pour avoir de suite le bon format des graphes
    ihm.setEtat("btnPopVideoShowGraphe", 0);
    ihm.setEtat("btnPopShowGraphe", 0);
    ml_updateEtat();
}

function cacherGraphe() {        // gestion locale
    $("#imgCamera").css({left:"300px"});             // centrer la vidéo
    ihm.cacher("divGraphe");
    ihm.setEtat("btnPopVideoShowGraphe", 1);
    ihm.setEtat("btnPopShowGraphe", 1);
    ml_updateEtat();
}

function montrerEnCours(oui) {
    if (oui)
        $("#imgEnCours").css("display", "block");
    else 
        $("#imgEnCours").css("display", "none");
}

function btnPopConfirm() {
    var numConfirmation = ihm.getEtat("msgPopConfirm");
    switch (numConfirmation) {
        case  0x01   : c_envoi(CONF_OUVERTURE_PINCE); break;
        case  0x02   : c_envoi(CONF_POSE_HP3); break;
        case  0x04   : c_envoi(CONF_LACHER_WTS); break;
        case  0x08   : c_envoi(CONF_SAISIR_WTS); break;
        case  0x010  : c_envoi(CONF_NIVELL_SEIS); break;
        case  0x020  : c_envoi(CONF_LACHER_SEIS); break;
        case  0x040  : c_envoi(CONF_SAISIR_SEIS); break;
        case  0x080  : c_envoi(CONF_LANCER_TESTS); break;
        case  0x100  : c_envoi(CONF_REPRISE_PB_PAN1); break;
        case  0x200  : c_envoi(CONF_REPRISE_PB_PAN2); break;
        case  0x400  : c_envoi(CONF_REPRISE_PB_PAN1); break;
        case  0x800  : c_envoi(CONF_REPRISE_PB_PAN2); break;
        case  0x1000 : c_envoi(CONF_REMONTER_HP3_POUR_ARRET); break;
        case  0x2000 : c_envoi(CONF_REMONTER_WTS_POUR_ARRET); break;
        case  0x4000 : c_envoi(REMONTER_SEIS_POUR_ARRET); break;
        case  0x8000 : c_envoi(CONF_FERMER_PANNEAUX_POUR_ARRET); break;
    }
}

function btnPopDecision(ok) {
    var numDecision = ihm.getEtat("msgPopDecision");
    switch (numDecision) {
        case 0x01 : 
            if (ok)
                c_envoi(DECISION_BATTERIE_FAIBLES_MAIS_CONTINUER);
            else
                c_envoi(DECISION_BATTERIE_FAIBLES_DONC_ARRETER);
            break;
        case 0x02 :
            if (ok)
                c_envoi(DECISION_SORTIE_TESTS_ET_CONTINUER);
            else
                c_envoi(DECISION_SORTIE_TESTS_ET_ARRETER);
            break;
        case 0x04 :
            if (ok)
                c_envoi(DECISION_SORTIE_INITIALISATION_ET_CONTINUER);
            else
                c_envoi(DECISION_SORTIE_INITIALISATION_ET_ARRETER);
            break;
        case 0x08 :
            if (ok)
                c_envoi(DECISION_DEFAUT_DETECTES_MAIS_CONTINER);
            else
                c_envoi(DECISION_DEFAUT_DETECTES_DONC_ARRETER);
            break;
    }
}

function btnCommande(sousSysteme) {
    var etat, id, st;
    switch (sousSysteme) {
        case PANNEAUX : id = "btnPanneaux";    st = PANNEAUX_O;    break;
        case HP3 :      id = "btnHP3";         st = HP3_D;         break;
        case SEIS :     id = "btnSEIS";        st = SEIS_D;        break;
        case WTS :      id = "btnWTS";         st = WTS_D;         break;
        case QUITTER :  id = "btnQuitter";     st = QUITTER;       break;
    }
    var opacite = parseInt($("#" + id).css("opacity"));
    // le bouton est t'il actif ?
    if (ihm.isButtonEnable(id)) {
        etat = ihm.getEtat(id);
        // si l'état = 0 c'est qu'il faut déposer le sous système
        // si l'état = 1 c'est qu'il faut reprendre le sous système
        if (etat === 0)
            ihm.setEtat("msgPopCommande", st);
        else
            ihm.setEtat("msgPopCommande", st + 1);
        ml_updateEtat();
        ihm.openPopup("popCommande");        // gestion locale
    }
}

function btnPopCommande(OK) {
    if (OK) {
        var sousSysteme = ihm.getEtat("msgPopCommande");
        switch (sousSysteme) {
            case PANNEAUX_O :   c_envoi(C_OUVERTURE_PANNEAUX); break;
            case PANNEAUX_F :   c_envoi(C_FERMETURE_PANNEAUX); break;
            case HP3_D :        c_envoi(C_DEPOSE_HP3); break;
            case HP3_R :        c_envoi(C_REPRISE_HP3); break;
            case SEIS_D :       c_envoi(C_DEPOSE_SEIS); break;
            case SEIS_R :       c_envoi(C_REPRISE_SEIS); break;
            case WTS_D :        c_envoi(C_DEPOSE_WTS); break;
            case WTS_R :        c_envoi(C_REPRISE_WTS); break;
            case QUITTER :      c_envoi(C_ARRET_SYSTEME); break;
        }
    }
    else {
        ihm.closePopup();
    }
    ml_updateEtat();
}

function video() {
    ihm.openPopup("popVideo");          // gestion locale
}

function divGraphe() {
    ihm.openPopup("popGraphes");        // gestion locale
}

function btnARU() {
    c_envoi(U_ARRU);
}

function btnPopAruOK() {
    c_envoi(U_FIN_ARRU);
}

function setLangue(code) {
    ihm.closePopup();                   // gestion locale
    ml_setLangue(code); 
}
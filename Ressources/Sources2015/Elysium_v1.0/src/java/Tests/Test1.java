/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Tests;

/**
 *
 * @author jpdms
 */
public class Test1 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        int 
            O_AA = 0, L_AA = 2,                 // AA:VAL_ORG_ARRU
            O_YY = 3, L_YY = 2,                 // YY:VAL_ETAT_SYSTEME
            O_EE = 6, L_EE = 2,                 // EE:VAL_SEQ_EN_COURS
            O_MM = 9, L_MM = 2,                // MM:FLAGS_MODE
            O_CCCCCCCC = 12, L_CCCCCCCC = 8,    // CCCCCCCC:CODE
            O_IIIIIIII = 21, L_IIIIIIII = 8,    // IIIIIIII:FLAGS_DEM_IHM
            O_SS = 30, L_SS = 2,                // SS:FLAGS_SITUATION_SEIS
            O_ssssssss = 33, L_ssssssss = 8,    // ssssssss:CODE
            O_WW = 42, L_WW = 2,                // WW:FLAGS_SITUATION_WTS
            O_HH = 45, L_HH = 2,                // HH:FLAGS_SITUATION_HP3
            O_PP = 48, L_PP = 2,                // PP:VAL_ETAT_PANNEAU
            O_pppppppp = 51, L_pppppppp = 8,    // pppppppp:CODE
            O_NN = 60, L_NN = 2,                // NN:VAL_ETAT_PINCE
            O_BB = 63, L_BB = 2,                // BB:VAL_ETAT_BRAS
            O_bbbbbbbb = 66, L_bbbbbbbb = 8,    // bbbbbbbb:CODE
            O_TTTT = 75, L_TTTT = 4,    // TTTT:Tension batteries (0,1V)
            O_RRRR = 80, L_RRRR = 4,    // RRRR:Charges des batteries (0,1%)
            O_BBBB = 85, L_BBBB = 4,    // BBBB:Courant dans batteries (0,1A)
            O_OOOO = 90, L_OOOO = 4,    // OOOO:Charge consommée (0,1%)
            O_UUUU = 95, L_UUUU = 4,    // UUUU:Durée restante dans batteries (100s)
            O_ee = 100, L_ee = 2;       // ee:CODE
        
        int ATTENTE = 3000;
    
        String trameNulle = "00;00;00;00;00000000;00000000;00;00000000;00;00;00;00000000;00;00;00000000;0000;0000;0000;0000;0000;00;";
        String trame = trameNulle;
        System.out.println(trame);
        trame = replacePart(trame, O_AA, L_AA, 0x1a);
        trame = replacePart(trame, O_YY, L_YY, 0xbc);
        trame = replacePart(trame, O_EE, L_EE, 0xde);
        trame = replacePart(trame, O_MM, L_MM, 0xf1);
        trame = replacePart(trame, O_CCCCCCCC, L_CCCCCCCC, 0x1234abcd);
        trame = replacePart(trame, O_IIIIIIII, L_IIIIIIII, 0x001234ab);
        trame = replacePart(trame, O_SS, L_SS, 0xf0);
        trame = replacePart(trame, O_ssssssss, L_ssssssss, 0x001234ab);
        trame = replacePart(trame, O_WW, L_WW, 0xef);
        trame = replacePart(trame, O_HH, L_HH, 0xef);
        trame = replacePart(trame, O_PP, L_PP, 0xef);
        trame = replacePart(trame, O_pppppppp, L_pppppppp, 0x001234ab);
        trame = replacePart(trame, O_NN, L_NN, 0xef);
        trame = replacePart(trame, O_BB, L_BB, 0xef);
        trame = replacePart(trame, O_bbbbbbbb, L_bbbbbbbb, 0x001234ab);
        trame = replacePart(trame, O_TTTT, L_TTTT, 0xfeed);
        trame = replacePart(trame, O_RRRR, L_RRRR, 0xfeed);
        trame = replacePart(trame, O_BBBB, L_BBBB, 0xfeed);
        trame = replacePart(trame, O_UUUU, L_UUUU, 0xfeed);
        trame = replacePart(trame, O_ee, L_ee, 0xcd);
        System.out.println(trame);
    }
    
    private static String replacePart(String trame, int start, int length, int valeur) {
        String out = "00000000";
        out += Integer.toHexString(valeur);
        out = out.substring(out.length() - length);
        System.out.println(out);
        return trame.substring(0, start) + out + trame.substring(start+length, trame.length());
    }
    
}

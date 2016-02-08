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
public class Test2 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // extraire le bit à 1
        System.out.println("0x00 pos : " + pos(0x00));
        System.out.println("0x01 pos : " + pos(0x01));
        System.out.println("0x02 pos : " + pos(0x02));
        System.out.println("0x04 pos : " + pos(0x04));
        System.out.println("0x08 pos : " + pos(0x08));
        System.out.println("0x10 pos : " + pos(0x10));
        System.out.println("0x20 pos : " + pos(0x20));
        System.out.println("0x40 pos : " + pos(0x40));
        System.out.println("0x80 pos : " + pos(0x80));
        System.out.println("0x100 pos : " + pos(0x100));
        System.out.println("0x200 pos : " + pos(0x200));
        System.out.println("0x400 pos : " + pos(0x400));
        System.out.println("0x800 pos : " + pos(0x800));
        System.out.println("0x1000 pos : " + pos(0x1000));
        System.out.println("0x2000 pos : " + pos(0x2000));
        System.out.println("0x4000 pos : " + pos(0x4000));
        System.out.println("0x8000 pos : " + pos(0x8000));
    }
    
    public static int pos(int valeur) {
        if (valeur == 0) {
            return 0;
        }
        else {
            int pos = 1;
            while (true) {
                if ((valeur & 0x01) == 0x01)
                    return pos;
                else {
                    valeur = valeur >> 1;
                    pos++;
                }
            }
        }
    }
    
}

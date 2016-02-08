
package SSE;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet(name = "SSE_SEIS", urlPatterns = {"/SSE_SEIS"})
public class SSE_SEIS extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws IOException, ServletException {
        try {
            Thread.sleep(6000);
        } catch (Exception ex) { }
        envoiVibrations(res);
    }
    
    private static void envoiVibrations(HttpServletResponse res) {
        double a = 0;
        double inc = 2*Math.PI / 500;
        double amp = 100.0;                     // amplitude de la sinusoïde
        try {
            res.setContentType("text/event-stream");
            res.setCharacterEncoding("UTF-8");
            PrintWriter writer = res.getWriter();
            while (true) {
                // envoi de 50 vibrations (x,y,z) par 1/2 seconde (ici des sinusoïdes)
                // au format "sXXXX,sYYYY,sZZZZ;" suivi d'un '\n' par trame.
                String trame = "";
                for (int i = 0; i < 50; i++) {
                    int x = (int)Math.floor(amp*Math.sin(a));
                    int y = (int)Math.floor(amp*Math.sin(a - 75*inc)); // pour les décaler % à x
                    int z = (int)Math.floor(amp*Math.sin(a - 125*inc)); // pour les décaler % à x
                    trame += String.format("%s,%s,%s;", formatter(x), formatter(y), formatter(z));
                    a += inc;
                    if (a >= 2*Math.PI)
                        a = 0;
                }
                writer.write("event: vibration\n");
                writer.write("data: " + trame + "\n\n");
                writer.flush();

                Thread.sleep(500);                          // attente de 500ms
            }
        } catch (Exception ex) { }
    }
    
    private static String formatter(int num) {
        String s = "0000";
        if (num < 0) {
            s += -num;
            return '-' + s.substring(s.length() - 4);
        }
        else {
            s += num;
            return '+' + s.substring(s.length() - 4);
        }
    }
 
}

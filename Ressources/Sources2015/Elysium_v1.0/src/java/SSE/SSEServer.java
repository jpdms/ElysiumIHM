package SSE;

import java.io.*;
import java.net.Socket;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet(urlPatterns = {"/SSEServer"})
public class SSEServer extends HttpServlet {
    Socket clientSocket;
    DataOutputStream outToServer;
    BufferedReader  inFromServer;

    @Override
    public void init() throws ServletException {
        try {
            clientSocket = new Socket("localhost", 5000);
            outToServer = new DataOutputStream(clientSocket.getOutputStream());
            inFromServer = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        } catch (IOException ex) { }
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
                        throws ServletException, IOException {
        outToServer.writeBytes("confe");
        while (true) {
            String texteIn = inFromServer.readLine();
            envoyerStream(response, texteIn);
        }
    }

    private void envoyerStream(HttpServletResponse response, String texte) throws IOException {
        response.setContentType("text/event-stream");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print("event: etat\n");
        out.print("data: " + texte + "\n\n");
        out.flush();
    }
}

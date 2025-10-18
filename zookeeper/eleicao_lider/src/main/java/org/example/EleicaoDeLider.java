package org.example;

import org.apache.zookeeper.KeeperException;
import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.ZooKeeper;

import java.io.IOException;

public class EleicaoDeLider {
    private static final String HOST = "localhost";
    private static final String PORTA = "2181";
    private static final int TIMEOUT = 5000;
    private ZooKeeper zooKeeper;
    public static void main(String[] args) throws Exception {
        System.out.printf("Método main executando na thread %s\n", Thread.currentThread().getName());
        var eleicaoDeLider = new EleicaoDeLider();
        eleicaoDeLider.conectar();
        eleicaoDeLider.executar();
//        Thread.sleep(1000);

    }

    public void conectar ( ) throws IOException {
        zooKeeper = new ZooKeeper(
                String.format("%s:%s",HOST,PORTA),
                TIMEOUT,
                (event) -> {
                    System.out.printf("Evento aconteceu na thread %s\n", Thread.currentThread().getName());
                    System.out.println(event.getType());
                    System.out.println(event.getState());
                }
        );
    }

    public void executar() throws Exception {
        synchronized (zooKeeper) {
            zooKeeper.wait();
        }
    }
}

#!/usr/bin/env python3
"""Bridge: listen on unix socket for hatari, expose TCP for client."""
import socket, threading, sys, os

UNIX_PATH = os.path.abspath(sys.argv[1])
TCP_PORT = int(sys.argv[2])

if os.path.exists(UNIX_PATH):
    os.unlink(UNIX_PATH)

srv = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
srv.bind(UNIX_PATH)
srv.listen(1)
print(f"waiting for hatari on {UNIX_PATH}...", flush=True)

conn = None
lock = threading.Lock()

def accept_hatari():
    global conn
    while True:
        c, _ = srv.accept()
        with lock:
            conn = c
        print("hatari connected", flush=True)
        t = threading.Thread(target=pump, args=(c,), daemon=True)
        t.start()

def pump(c):
    # forward hatari -> any tcp client output queue
    try:
        while True:
            data = c.recv(4096)
            if not data:
                break
            with lock:
                clients = list(tcp_clients)
            for cl in clients:
                try:
                    cl.sendall(data)
                except OSError:
                    pass
    except OSError:
        pass

tcp_clients = []

def tcp_server():
    tsrv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tsrv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    tsrv.bind(('127.0.0.1', TCP_PORT))
    tsrv.listen(4)
    while True:
        cl, _ = tsrv.accept()
        tcp_clients.append(cl)
        threading.Thread(target=handle_client, args=(cl,), daemon=True).start()

def handle_client(cl):
    try:
        while True:
            data = cl.recv(4096)
            if not data:
                break
            with lock:
                c = conn
            if c:
                c.sendall(data)
    except OSError:
        pass
    finally:
        if cl in tcp_clients:
            tcp_clients.remove(cl)

threading.Thread(target=accept_hatari, daemon=True).start()
tcp_server()

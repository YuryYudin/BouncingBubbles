#!/usr/bin/env python3
"""Minimal Hatari control-socket client (correct protocol)."""
import socket, time

# Atari hardware scancodes
KEY = {
    'space': '57', 'a': '30', 's': '31', 'd': '32', 'return': '28', 'enter': '114',
    'esc': '1', 'left': '75', 'right': '77', 'up': '72', 'down': '80',
    'f1': '59', 'f2': '60', 'f3': '61', 'f4': '62', 'f10': '68',
    'help': '98', 'undo': '97', '1': '2', '2': '3', '3': '4',
}

class Hatari:
    def __init__(self, port=6400):
        self.port = port
        self.sock = None

    def connect(self, retries=60):
        for i in range(retries):
            try:
                self.sock = socket.create_connection(('127.0.0.1', self.port), timeout=2)
                return True
            except OSError:
                time.sleep(1)
        return False

    def send(self, msg):
        self.sock.sendall((msg + '\n').encode())

    def keydown(self, k):
        self.send(f'hatari-event keydown {KEY.get(k, k)}')

    def keyup(self, k):
        self.send(f'hatari-event keyup {KEY.get(k, k)}')

    def key(self, k):
        self.send(f'hatari-event keypress {KEY.get(k, k)}')

    def type(self, text):
        self.send(f'hatari-event text {text}')

    def pause(self):
        self.send('hatari-stop')

    def cont(self):
        self.send('hatari-cont')

    def screenshot(self):
        self.send('hatari-shortcut screenshot')

    def option(self, opt):
        self.send(f'hatari-option {opt}')

    def quit(self):
        try:
            self.send('hatari-shortcut quit')
        except Exception:
            pass

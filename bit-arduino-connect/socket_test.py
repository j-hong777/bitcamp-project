import socket

HOST='192.168.10.136'
PORT=33333

sever_socket=socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sever_socket.bind((HOST, PORT))
sever_socket.listen(1)

connect, info=sever_socket.accept()
while True:
    print ('waiting for connection...')
    connect, info = sever_socket.accept()
    if connect:
        print('Connected by', info)
        while True:
            data = connect.recv(1024)
            message = "Hellow? client"
            if not data: break
            connect.sendall(message)
            print(data)
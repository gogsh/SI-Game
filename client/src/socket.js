import io from 'socket.io-client'

export const socket = io('http://localhost:5000', {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false
});

export const chatSocket = io('/main');
export const lobbySocket = io('/playingRoom');


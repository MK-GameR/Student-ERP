import { Socket } from 'socket.io-client';

export const SocketService = {
  emitEvent: (socket: Socket | null, eventName: string, data: any): void => {
    if (socket && socket.connected) {
      socket.emit(eventName, data);
    } else {
      console.warn(`[Socket Outbox Failure] Engine disconnected. Could not dispatch: ${eventName}`);
    }
  },

  listenToEvent: (socket: Socket | null, eventName: string, callback: (data: any) => void): (() => void) => {
    if (!socket) return () => {};
    
    socket.on(eventName, callback);
    
    // Teardown return handler to cleanly unbind events on component unmount
    return () => {
      socket.off(eventName, callback);
    };
  }
};
import { useEffect } from 'react';
import { useSocketContext } from '../app/providers/SocketProvider';
import { SocketService } from '../services/socket/socket';

export const useSocket = (eventName?: string, callback?: (data: any) => void) => {
  const { socket, isConnected } = useSocketContext();

  useEffect(() => {
    if (!socket || !eventName || !callback) return;

    // Direct event listener binding using the core storage utility layer
    const unsubscribe = SocketService.listenToEvent(socket, eventName, callback);

    return () => {
      unsubscribe();
    };
  }, [socket, eventName, callback]);

  const emit = (event: string, payload: any) => {
    SocketService.emitEvent(socket, event, payload);
  };

  return {
    emit,
    isConnected,
    socketId: socket?.id || null,
  };
};
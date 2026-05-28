import { useEffect, useState } from 'react';
import { SocketService } from '../services/socket/socket';

export const useSocket = (eventName?: string, callback?: (data: any) => void) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = SocketService.connect();
    setIsConnected(socket.connected);

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    // If tracking a live event streaming pipe, bind listener
    if (eventName && callback) {
      const unsubscribe = SocketService.listenToEvent(eventName, callback);
      return () => {
        unsubscribe();
        socket.off('connect', handleConnect);
        socket.off('disconnect', handleDisconnect);
      };
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [eventName, callback]);

  const emit = (event: string, payload: any) => {
    SocketService.emitEvent(event, payload);
  };

  return {
    emit,
    isConnected,
  };
};
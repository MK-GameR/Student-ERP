import { io, type Socket } from 'socket.io-client';
import { ENV } from '../../config/env';
import { TokenStorage } from '../storage/token.storage';

// Private socket instance holder
let socketInstance: Socket | null = null;

export const SocketService = {
  /**
   * Initializes or returns the existing authenticated socket connection connection.
   */
  connect: (): Socket => {
    if (socketInstance?.connected) return socketInstance;

    const token = TokenStorage.getToken();

    socketInstance = io(ENV.API_URL, {
      auth: { token },
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    socketInstance.on('connect_error', (err) => {
      console.error('[Socket Connection Error]:', err.message);
    });

    return socketInstance;
  },

  /**
   * Disconnects the socket instance completely (e.g., on user logout).
   */
  disconnect: (): void => {
    if (socketInstance) {
      socketInstance.disconnect();
      socketInstance = null;
    }
  },

  /**
   * Dispatches data out bound safely if the pipe is open.
   */
  emitEvent: (event: string, data: any): void => {
    if (socketInstance && socketInstance.connected) {
      socketInstance.emit(event, data);
    } else {
      console.warn(`[Socket Outbox Failure] Engine disconnected. Could not dispatch: ${event}`);
    }
  },

  /**
   * Binds an event listener and returns a pristine clean-up teardown engine.
   */
  listenToEvent: (event: string, callback: (data: any) => void): (() => void) => {
    if (!socketInstance) {
      // Auto-connect if someone tries to listen before initialization
      SocketService.connect();
    }

    socketInstance!.on(event, callback);
    
    return () => {
      socketInstance?.off(event, callback);
    };
  }
};
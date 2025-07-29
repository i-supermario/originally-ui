import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // adjust to your backend URL

export const useLiveLocation = (groupId: string, userId: string) => {
  useEffect(() => {
    if (!groupId || !userId) return;

    socket.emit('joinGroup', { groupId, userId });

    const locationInterval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('updateLocation', {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }, 5000); // update every 5s

    return () => clearInterval(locationInterval);
  }, [groupId, userId]);

  return socket;
};

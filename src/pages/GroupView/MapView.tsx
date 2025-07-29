import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression, icon } from 'leaflet';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const userIcon = icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

interface MemberLocation {
  userId: string;
  lat: number;
  lng: number;
}

export default function MapView({ groupId, userId }: { groupId: string; userId: string }){
  const [members, setMembers] = useState<Record<string, MemberLocation>>({});
  console.log('GroupId', groupId);
  console.log('UserId', userId)
  console.log("Member location updates",members);
  const [defaultLocation, setDefaultLocation] = useState<LatLngExpression | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    socket.emit('join-group', { groupId, userId });

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newLocation: LatLngExpression = [latitude, longitude];
        setDefaultLocation((prev) => prev ?? newLocation);
        console.log("Sending location updates")

        setMembers((prev) => ({
          ...prev,
          [userId]: { userId, lat: latitude, lng: longitude },
        }));


        socket.emit('update-location', {
          userId,
          groupId,
          lat: latitude,
          lng: longitude,
        });

        if (mapRef.current) {
          mapRef.current.setView(newLocation, mapRef.current.getZoom());
        }
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    socket.on('group-location-update', (locations: MemberLocation[]) => {
      const locationMap: Record<string, MemberLocation> = {};
      locations.forEach((loc) => {
        locationMap[loc.userId] = loc;
      });
      setMembers((prev) => ({
        ...prev,
        ...locationMap,
      }));
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.disconnect();
    };
  }, [groupId, userId]);

  if (!defaultLocation) return <p>Loading location...</p>;

  return (
    <MapContainer
      center={defaultLocation}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      whenReady={({ target }) => (mapRef.current = target)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {Object.values(members).map((member) => (
        <Marker
          key={member.userId}
          position={[member.lat, member.lng]}
          icon={userIcon}
        >
          <Popup>{member.userId == userId ? "You" : member.userId}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

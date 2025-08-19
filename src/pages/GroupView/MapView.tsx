import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, icon } from 'leaflet';
import { ref, onValue, set } from 'firebase/database';
import { FirebaseService } from '@/lib/firebase/FirebaseService';
import { User } from '.';
import { motion, AnimatePresence } from 'framer-motion';

const userIcon = icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const db = FirebaseService.getInstance().getRealtimeDB();

interface MemberLocation {
  userId: string;
  lat: number;
  lng: number;
}

export default function MapView({
  groupId,
  userId,
  memberDetails,
}: {
  groupId: string;
  userId: string;
  memberDetails: User[];
}) {
  const [members, setMembers] = useState<Record<string, MemberLocation>>({});
  const [defaultLocation, setDefaultLocation] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newLoc = { lat: latitude, lng: longitude };
        setDefaultLocation((prev) => prev ?? [latitude, longitude]);

        // Push location to Firebase
        set(ref(db, `groups/${groupId}/${userId}`), {
          ...newLoc,
          timestamp: Date.now(),
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    const groupRef = ref(db, `groups/${groupId}`);
    const unsubscribe = onValue(groupRef, (snapshot) => {
      const val = snapshot.val() || {};
      const locationMap: Record<string, MemberLocation> = {};
      Object.entries(val).forEach(([uid, loc]: any) => {
        locationMap[uid] = { userId: uid, lat: loc.lat, lng: loc.lng };
      });
      setMembers(locationMap);
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
      unsubscribe();
    };
  }, [groupId, userId]);

  if (!defaultLocation) return <p>Loading map...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{ height: '100%', width: '100%' }}
    >
      <MapContainer center={defaultLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <AnimatePresence>
          {Object.values(members).map((member) => (
            <motion.div
              key={member.userId}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Marker key={member.userId} position={[member.lat, member.lng]} icon={userIcon}>
                <Popup>
                  {member.userId === userId
                    ? 'You'
                    : memberDetails.find((m) => m._id === member.userId)?.firstName}
                </Popup>
              </Marker>
            </motion.div>
          ))}
        </AnimatePresence>
      </MapContainer>
    </motion.div>
  );
}

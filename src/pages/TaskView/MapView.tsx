import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import AddTaskPopup from "./AddTaskPopup";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Task } from "../TaskDashboard";
import TaskPopupCard from "./TaskPopupCard";
import L from "leaflet";

type Props = {
  assignmentId: string;
  tasks: Task[];
  onTaskAddedOrUpdated: () => void;
};

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // replace with your own
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
  className: 'user-marker-icon'
});


export default function GeocodingMapView({ assignmentId,tasks, onTaskAddedOrUpdated }: Props) {
  const [showAddedTasks, setShowAddedTasks] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<
    { name: string; lat: number; lng: number }[]
  >([]);
  const [userLocation, setUserLocation] = useState<number[] | null>();
  const mapRef = useRef<any>(null);

  // Get user's current location
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newLocation = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(newLocation);

        if (mapRef.current) {
          mapRef.current.setView(newLocation, mapRef.current.getZoom());
        }
      },
      (err) => {
        console.error("Failed to get live location", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      }
    );

    // Cleanup on unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);


  const handleSearch = async () => {
    if (!search) return;
    try {
      const result = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${search}&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
      );
      const results = result.data.features.map((location: any) => ({
        lng: location.geometry.coordinates[0],
        lat: location.geometry.coordinates[1],
        name: location.properties.full_address,
      }));
      console.log(results)
      setSearchResults(results);
    } catch (e) {
      console.error("Search failed", e);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className="border px-2 py-1 w-full rounded"
          type="text"
          placeholder="Search for a place..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          // color="green"
          // className="bg-gray-300 data-[state=checked]:bg-blue-500"
          checked={showAddedTasks}
          onCheckedChange={setShowAddedTasks}
          id="task-toggle"
        />
        <Label htmlFor="task-toggle">Show { showAddedTasks ? "Search Results" : "Added tasks" }</Label>
      </div>
      {userLocation && (
        <MapContainer
          className="z-20"
          center={userLocation}
          zoom={12}
          style={{ height: "500px", width: "100%" }}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker
            key="user-location"
            position={userLocation}
            // position={[37.7785, -122.4056]}
            icon={userIcon}
          >
            <Popup>
              <p className="font-bold">YOU!</p>
            </Popup>
          </Marker>
          {
            showAddedTasks ?
            tasks.map((task, idx) => (
              <Marker
                key={`${task.name}-${idx}`}
                position={[task.latitude, task.longitude]}
              >
                <Popup>
                  <TaskPopupCard 
                    sequenceNo={idx + 1} 
                    assignmentId={assignmentId} 
                    task={task} 
                    userLat={userLocation[0]} 
                    userLng={userLocation[1]}
                    // userLat={37.7785} 
                    // userLng={-122.4056}
                    onMarkFinished={onTaskAddedOrUpdated} 
                  />
                </Popup>
              </Marker>
            ))
            :
            searchResults.map((result, idx) => (
              <Marker key={`result-${idx}`} position={[result.lat, result.lng]}>
                <Popup>
                  <p className="font-bold">Address: {result.name}</p>
                  <AddTaskPopup
                    lat={result.lat}
                    lng={result.lng}
                    assignmentId={assignmentId}
                    onSuccess={() => {
                      onTaskAddedOrUpdated()
                    }}
                  />
                </Popup>
              </Marker>
            ))
          }
        </MapContainer>
      )}
    </div>
  );
}

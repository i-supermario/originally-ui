import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import axios from "axios";
import AddTaskPopup from "./AddTaskPopup";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type TaskLocation = {
  name: string;
  latitude: number;
  longitude: number;
};

type Props = {
  taskId: string;
  tasks: TaskLocation[];
  onTaskAdded: () => void;
};

export default function GeocodingMapView({ taskId,tasks, onTaskAdded }: Props) {
  const [showAddedTasks, setShowAddedTasks] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<
    { name: string; lat: number; lng: number }[]
  >([]);
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);
  const mapRef = useRef<any>(null);

  // Get user's current location
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error("Failed to get location", err);
        // fallback to center of India
        setUserLocation([20.5937, 78.9629]);
      }
    );
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
        <Label htmlFor="task-toggle">Show Added Tasks / Search Results</Label>
      </div>
      {userLocation && (
        <MapContainer
          center={userLocation}
          zoom={12}
          style={{ height: "500px", width: "100%" }}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {
            showAddedTasks ?
            tasks.map((task, idx) => (
              <Marker
                key={`${task.name}-${idx}`}
                position={[task.latitude, task.longitude]}
              >
                <Popup>
                  <strong>
                    {idx + 1}. {task.name}
                  </strong>
                </Popup>
              </Marker>
            ))
            :
            searchResults.map((result, idx) => (
              <Marker key={`result-${idx}`} position={[result.lat, result.lng]}>
                <Popup>
                  <AddTaskPopup
                    lat={result.lat}
                    lng={result.lng}
                    taskId={taskId}
                    onSuccess={() => {
                      onTaskAdded()
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

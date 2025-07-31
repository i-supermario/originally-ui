import { useEffect, useState } from "react"
import { Task, TaskStatus } from "../TaskDashboard"
import { API } from "@/api"
import { toast } from "sonner"

type Props = {
  sequenceNo: number
  assignmentId: string
  task: Task
  userLat: number
  userLng: number
  onMarkFinished: () => void
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3 // meters
  const toRad = (x: number) => (x * Math.PI) / 180

  const φ1 = toRad(lat1)
  const φ2 = toRad(lat2)
  const Δφ = toRad(lat2 - lat1)
  const Δλ = toRad(lon2 - lon1)

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // in meters
}

export default function TaskPopupCard({ sequenceNo,assignmentId, task, userLat, userLng, onMarkFinished }: Props) {
  const [isNearby, setIsNearby] = useState(false)

  const handleTaskFinished = async () => {
    if (!isNearby) return;
    await API.METHODS.PUT(API.ENDPOINTS.assignment.markTaskAsComplete(assignmentId, task._id), {}, { withCredentials: true }, {
      onSuccess: (response) => {
        toast.success(response.message)
        onMarkFinished()
      },
      onError: (response) => toast.error(response.message)
    })
  }

  useEffect(() => {
    const dist = haversineDistance(userLat, userLng, task.latitude, task.longitude)
    setIsNearby(dist < 100) // 100 meters range
  }, [userLat, userLng, task.latitude, task.longitude])

  return (
    <div className="flex flex-col min-w-[200px]">
      <p className="text-sm font-bold">{sequenceNo}</p>
      <p className="text-sm font-bold">{task.name}</p>
      <p className="text-xs text-muted-foreground">{task.description}</p>
      <p className="text-xs">
        Status:{" "}
        <span
          className={
            task.status === TaskStatus.FINISHED
              ? "text-green-600"
              : task.status === TaskStatus.PROGRESSING
                ? "text-yellow-600"
                : "text-blue-600"
          }
        >
          {task.status}
        </span>
      </p>

      {task.status !== TaskStatus.FINISHED && (
        <label className="text-sm flex items-center gap-2">
          <input
            type="checkbox"
            disabled={!isNearby}
            onChange={() => { handleTaskFinished() }}
          />
          <span className={isNearby ? "" : "text-gray-400"}>Mark as Finished</span>
        </label>
      )}

      {!isNearby && task.status !== TaskStatus.FINISHED && (
        <p className="text-[10px] text-gray-500 mt-1 italic">You need to be closer to finish this task.</p>
      )}
    </div>
  )
}

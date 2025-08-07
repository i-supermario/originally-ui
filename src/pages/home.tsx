import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground flex justify-center px-6">
      <motion.div
        className="max-w-3xl text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Stay Connected, Live.
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          We’re building a simple app where people in a group can see each
          other’s live location on a map. Anyone in the group can join, share
          their location, and track others in real-time. It’s all fast and
          smooth using WebSockets and Redis — perfect for staying connected on
          the move.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button className="text-lg px-6 py-4">
            Start Sharing Location
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-background text-foreground px-6 py-4 space-y-24">
      {/* Hero Section */}
      <motion.div
        className="max-w-5xl mx-auto text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Stay Connected, Live.
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Want to experience blazing fast location sharing?
        </p>
      </motion.div>

      {/* Feature Section: Group Location Sharing */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-4">
        <motion.div
        className="flex flex-col gap-y-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">Group Live Location</h2>
            <p className="text-muted-foreground text-lg">
              Keep your team or friends connected wherever they are. Watch members move
              live on the map with ultra-low latency. Perfect for road trips,
              festivals, or quick coordination.
            </p>
          </div>
          <Button onClick={() => navigate('/groups')} variant="outline" className="max-w-72 text-lg px-6 py-4">
            Create a group now! <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div
          className="w-full h-64 bg-muted rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Placeholder for map / animation / image */}
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Live Group Map Preview
          </div>
        </motion.div>
      </div>

      {/* Feature Section: Vendor Task Location Tracking */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-4">
        <motion.div
          className="order-2 md:order-1 bg-muted rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Placeholder for courier/task map UI */}
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Courier Task Tracker
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-y-4 order-1 md:order-2"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">Track Tasks by Location</h2>
            <p className="text-muted-foreground text-lg">
              Vendors can monitor courier locations as they complete tasks at specific
              spots. Each task is tied to a map point — giving you complete
              visibility over progress and delivery efficiency.
            </p>
          </div>
          <Button onClick={() => navigate('/assignments')} variant="outline" className="max-w-80 text-lg px-6 py-4">
            Start your first assignment! <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Final CTA */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-semibold">
          Ready to make movement smarter?
        </h3>
        <Button variant="outline" onClick={() => navigate('/sign-up')} size="lg" className="text-lg px-6 py-4">
          Try Live Tracking Now
        </Button>
      </motion.div>
    </div>
  );
}


import DashboardNav from "@/components/dashboard/DashboardNav";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const stats = [
  { name: "Total Products", value: "125" },
  { name: "Active Manufacturers", value: "12" },
  { name: "Team Members", value: "8" },
  { name: "Storage Used", value: "2.4 GB" },
];

const Dashboard = () => {
  return (
    <div>
      <DashboardNav />
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">Welcome back!</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </h3>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

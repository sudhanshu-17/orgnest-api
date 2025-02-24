
import { useState } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { manufacturers } from "@/data/mockData";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Manufacturers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredManufacturers = manufacturers.filter((manufacturer) =>
    manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (manufacturerId: string) => {
    toast({
      title: "Manufacturer deleted",
      description: "The manufacturer has been deleted successfully.",
    });
  };

  return (
    <div>
      <DashboardNav />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manufacturers</h1>
          <Button>
            <Plus className="mr-2" />
            Add Manufacturer
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Manufacturers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search manufacturers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredManufacturers.map((manufacturer, index) => (
            <motion.div
              key={manufacturer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <img
                    src={manufacturer.logo}
                    alt={manufacturer.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">
                    {manufacturer.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {manufacturer.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {manufacturer.productsCount} Products
                    </span>
                    <div className="space-x-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(manufacturer.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Manufacturers;

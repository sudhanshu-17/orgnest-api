
import { useState, useEffect } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Manufacturer } from "@/types";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getManufacturers, deleteManufacturer } from "@/lib/supabase";

const Manufacturers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadManufacturers = async () => {
      try {
        const data = await getManufacturers();
        setManufacturers(data);
      } catch (error) {
        console.error("Error loading manufacturers:", error);
        toast({
          title: "Error",
          description: "Failed to load manufacturers. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadManufacturers();
  }, [toast]);

  const filteredManufacturers = manufacturers.filter((manufacturer) =>
    manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (manufacturer: Manufacturer) => {
    // In a real app, this would navigate to an edit form or open a modal
    toast({
      title: "Edit Manufacturer",
      description: `Editing ${manufacturer.name}...`,
    });
    // Navigate to edit page
    // window.location.href = `/dashboard/manufacturers/edit/${manufacturer.id}`;
  };

  const handleDelete = async (manufacturerId: string) => {
    try {
      await deleteManufacturer(manufacturerId);
      setManufacturers(manufacturers.filter(m => m.id !== manufacturerId));
      toast({
        title: "Manufacturer deleted",
        description: "The manufacturer has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting manufacturer:", error);
      toast({
        title: "Error",
        description: "Failed to delete manufacturer. Please try again.",
        variant: "destructive",
      });
    }
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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="w-full h-32 bg-muted rounded-lg mb-4"></div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-24 bg-muted rounded"></div>
                    <div className="space-x-2 flex">
                      <div className="h-10 w-10 bg-muted rounded"></div>
                      <div className="h-10 w-10 bg-muted rounded"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredManufacturers.length === 0 ? (
              <p className="text-center col-span-3 py-10 text-muted-foreground">
                No manufacturers found. Try adjusting your search.
              </p>
            ) : (
              filteredManufacturers.map((manufacturer, index) => (
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
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleEdit(manufacturer)}
                          >
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Manufacturers;

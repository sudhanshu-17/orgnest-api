
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DashboardNav = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // TODO: Implement sign out with Supabase
    navigate("/");
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="/dashboard" className="font-semibold">
              Dashboard
            </a>
            <a href="/dashboard/products" className="text-muted-foreground hover:text-foreground">
              Products
            </a>
            <a href="/dashboard/manufacturers" className="text-muted-foreground hover:text-foreground">
              Manufacturers
            </a>
          </div>
          <Button variant="ghost" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;

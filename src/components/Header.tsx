import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Brain, BarChart3, Mail, Settings as SettingsIcon, Star, Users, LogOut, User, ChevronDown, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export function Header() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary shadow-glow">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Moza AI</h1>
              <p className="text-sm text-muted-foreground">Email & SMS Automation</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {!user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    Industries
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/contractors">General Contractors</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/hospitality">Hospitality</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/car-wash">Car Washes</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/restaurants">Restaurants</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {user && (
              <>
                <Button variant="ghost" className="gap-2" asChild>
                  <Link to="/dashboard">
                    <BarChart3 className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" className="gap-2" asChild>
                  <Link to="/leads">
                    <Users className="h-4 w-4" />
                    Leads
                  </Link>
                </Button>
                <Button variant="ghost" className="gap-2" asChild>
                  <Link to="/reviews">
                    <Star className="h-4 w-4" />
                    Reviews
                  </Link>
                </Button>
                <Button variant="ghost" className="gap-2" asChild>
                  <Link to="/google-profile">
                    <MapPin className="h-4 w-4" />
                    Google Profile
                  </Link>
                </Button>
                <Button variant="ghost" className="gap-2" asChild>
                  <Link to="/settings">
                    <SettingsIcon className="h-4 w-4" />
                    Settings
                  </Link>
                </Button>
              </>
            )}
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="hero" size="lg" asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
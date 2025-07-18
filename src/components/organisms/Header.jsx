import { useState } from "react";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onMenuClick, onSearch, title = "Dashboard" }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
    onSearch && onSearch(term);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 font-display">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-80 hidden md:block">
            <SearchBar onSearch={handleSearch} />
          </div>
          <Button variant="ghost" size="sm">
            <ApperIcon name="Bell" className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden mt-4">
        <SearchBar onSearch={handleSearch} />
      </div>
    </header>
  );
};

export default Header;
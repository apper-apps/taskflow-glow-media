import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleOpenModal = (type, data = null) => {
    setModalType(type);
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setModalData(null);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={handleCloseSidebar} 
        />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header 
            onMenuClick={handleMenuClick}
            onSearch={handleSearch}
          />
          
<main className="flex-1 overflow-auto">
            <div className="p-6">
              <Outlet context={{ 
                searchTerm, 
                openModal: handleOpenModal,
                closeModal: handleCloseModal,
                isModalOpen,
                modalType,
                modalData 
              }} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
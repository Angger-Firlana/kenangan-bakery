import Sidebar from "../components/ui/sidebar";
import "../modules/dashboard/Dashboard.css";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="kb-container">
      <Sidebar />
        {children}
    </div>
  );
}
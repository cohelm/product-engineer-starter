import { DashboardProvider } from "@/context/dashboard-context";

export default function PriorAuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardProvider>
            <div className="w-full max-w-6xl mx-auto">
                {children}
            </div>
        </DashboardProvider>
    );
}
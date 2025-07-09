import React, { ReactNode } from "react";
import Header from "./Header";
import AsideBigScreen from "./AsideBigScreen";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      {/* <Header */}
      <Header />

      <div className="pt-16">
        {/* aside big screen */}
        <AsideBigScreen />
        {/* main */}
        <main
          className=" min-h-[calc(100vh-64px)]
        lg:pl-72 p-4
        "
        >
          <div className="w-full max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

import React from "react";
import Layout from "../layout/layout";

const DashboardLayout = ({ title, children, sidebar: Sidebar }) => (
  <Layout title={title}>
    <div className="bg-surface-muted min-h-[calc(100vh-4rem)]">
      <div className="max-w-8xl mx-auto container-padding py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 lg:gap-8">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Sidebar />
          </aside>
          <main className="min-w-0 space-y-6">{children}</main>
        </div>
      </div>
    </div>
  </Layout>
);

export default DashboardLayout;

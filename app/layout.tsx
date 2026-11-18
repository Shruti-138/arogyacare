import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Header from "./components/Header";
import Reminders from "./components/Reminders";

export const metadata: Metadata = {
  title: "ArogyaCare",
  description: "Smart Hospital Appointment & Patient Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Suspense
          fallback={<div className="h-14 border-b border-gray-200 bg-white" />}
        >
          <Header />
        </Suspense>
        <Suspense fallback={null}>
          <Reminders />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
// pages/Home.js
import React from "react";
import { GeneralMetrics } from "./GeneralMetrics";
import { ChartsSection } from "./ChartsSection";
import { LatestRecords } from "./LatestRecords";

export function Home() {
  return (
    <div className="mt-12">
      <GeneralMetrics />
      <ChartsSection />
      <LatestRecords />
    </div>
  );
}

export default Home;

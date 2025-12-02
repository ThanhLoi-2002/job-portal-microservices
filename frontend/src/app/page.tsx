"use client"
import CareerGuide from "@/components/career-guide";
import { useAppData } from "@/components/context/AppContext";
import Hero from "@/components/hero";
import Loading from "@/components/loading";
import ResumeAnalyzer from "@/components/resume-analyzer";
import React from "react";

const Home = () => {
  const { loading } = useAppData();
  if (loading) return <Loading />;
  return (
    <div>
      <Hero />
      <CareerGuide />
      <ResumeAnalyzer />
    </div>
  );
};

export default Home;

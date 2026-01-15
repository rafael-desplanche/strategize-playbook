import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandingHero } from "@/components/benchmark/LandingHero";

const Index = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/benchmark");
  };

  return <LandingHero onStart={handleStart} />;
};

export default Index;

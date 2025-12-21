import { Button } from "@/components/ui/button";
import React from "react";
import Main_menu from "./components/main_menu";
import Projects from "./components/projects";
import Contact from "./components/contact";

const page = () => {
  return (
    <>
      <Main_menu></Main_menu>
      <Projects></Projects>
      <Contact></Contact>
    </>
  );
};

export default page;

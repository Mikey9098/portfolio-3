import { Button } from "@/components/ui/button";
import React from "react";
import Main_menu from "./components/main_menu";
import Projects from "./components/projects";
import Contact from "./components/contact";
import Skills from "./components/skills";
import Main from "./components/game";

const page = () => {
  return (
    <>
      <Main_menu></Main_menu>
      <Skills />
      <Projects></Projects>
      <Main />
      <Contact></Contact>
    </>
  );
};

export default page;

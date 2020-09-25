import React from "react";
import {Accordion} from "./Accordion";

export default {
  title: "Accordion",
  component: Accordion,
}

const Template = (args) => <Accordion {...args} />

export const AccordionSimple = Template.bind({});
const exampleContent = <p>some text</p>;
AccordionSimple.args = {
  items: [
    {heading: "The heading", content: exampleContent, id: "1"},
    {heading: "Another heading", content: exampleContent, id: "2"},
    {heading: "The heading", content: exampleContent, id: "3"},
    {heading: "Another heading", content: exampleContent, id: "4"}
  ]
};
import React from "react";
import { Accordion } from "./Accordion";
import {
  AccordionCtx,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "./accordionWithContext";

export default {
  title: "Accordion",
  component: Accordion,
};

const Template = (args) => <Accordion {...args} />;

export const AccordionSimple = Template.bind({});
const exampleContent = (
  <>
    <h4>a sub heading</h4>
    <p>some text</p>
  </>
);
AccordionSimple.args = {
  items: [
    { heading: "The heading", content: exampleContent, id: "1" },
    { heading: "Another heading", content: exampleContent, id: "2" },
    { heading: "The heading", content: exampleContent, id: "3" },
    { heading: "Another heading", content: exampleContent, id: "4" },
  ],
  headingLevel: 3,
};

const TemplateCtx = (args) => <AccordionCtx {...args} />;

export const AccordionWithContext = TemplateCtx.bind({});
AccordionWithContext.args = {
  children: (
    <AccordionCtx>
      <AccordionItem>
        <h3>
          <AccordionButton>You can activate me</AccordionButton>
        </h3>
        <AccordionPanel>
          Ante rhoncus facilisis iaculis nostra faucibus vehicula ac consectetur
          pretium, lacus nunc consequat id viverra facilisi ligula eleifend,
          congue gravida malesuada proin scelerisque luctus est convallis.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h3>
          <AccordionButton>and me</AccordionButton>
        </h3>
        <AccordionPanel>
          Ante rhoncus facilisis iaculis nostra faucibus vehicula ac consectetur
          pretium, lacus nunc consequat id viverra facilisi ligula eleifend,
          congue gravida malesuada proin scelerisque luctus est convallis.
        </AccordionPanel>
      </AccordionItem>
       <AccordionItem>
        <h3>
          <AccordionButton>and me</AccordionButton>
        </h3>
        <AccordionPanel>
          Ante rhoncus facilisis iaculis nostra faucibus vehicula ac consectetur
          pretium, lacus nunc consequat id viverra facilisi ligula eleifend,
          congue gravida malesuada proin scelerisque luctus est convallis.
        </AccordionPanel>
      </AccordionItem>
       <AccordionItem>
        <h3>
          <AccordionButton>and me</AccordionButton>
        </h3>
        <AccordionPanel>
          Ante rhoncus facilisis iaculis nostra faucibus vehicula ac consectetur
          pretium, lacus nunc consequat id viverra facilisi ligula eleifend,
          congue gravida malesuada proin scelerisque luctus est convallis.
        </AccordionPanel>
      </AccordionItem>
    </AccordionCtx>
  ),
};

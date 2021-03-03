import React from "react";
import { Carousel } from "./Carousel";

export default {
  title: "Carousel",
  component: Carousel,
};

const dummyItems = ["item 1", "item 2", "item 3"];

const Template = (args) => <Carousel {...args} />;

export const CarouselStory = Template.bind({});
CarouselStory.args = {
  items: dummyItems,
};

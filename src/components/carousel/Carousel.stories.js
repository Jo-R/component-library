import React from "react";
import { Carousel } from "./Carousel";
import { CarouselScrollSnap } from "./CarouselCssVersion/CarouselCss";
import styles from "./CarouselCssVersion/CarouselCss.module.css";

export default {
  title: "Carousel",
};

const dummyItems = ["item 1", "item 2", "item 3"];

const CarouselTemplate = (args) => <Carousel {...args} />;

export const CarouselStory = CarouselTemplate.bind({});
CarouselStory.args = {
  items: dummyItems,
};

const CarouselScrollSnapTemplate = (args) => <CarouselScrollSnap {...args} />;

export const CarouselScrollSnapStory = CarouselScrollSnapTemplate.bind({});
CarouselScrollSnapStory.args = {
  children: (
    <>
      <div className={styles.item}>Item 1</div>
      <div className={styles.item}>Item 2</div>
      <div className={styles.item}>Item 3</div>
      <div className={styles.item}>Item 4</div>
      <div className={styles.item}>Item 5</div>
      <div className={styles.item}>Item 6</div>
    </>
  ),
};

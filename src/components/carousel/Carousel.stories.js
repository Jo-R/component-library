import React from "react";
import { Carousel } from "./Carousel";
import { CarouselScrollSnap } from "./CarouselCssVersion/CarouselScrollSnap";
import styles from "./CarouselCssVersion/CarouselScrollSnap.module.css";

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
CarouselScrollSnapStory.decorators = [
  (story) => <div style={{ width: "50%" }}>{story()}</div>,
];
CarouselScrollSnapStory.args = {
  children: (
    <>
      <div className={styles.item} role="group" aria-roledescription="slide">
        Item 1
      </div>
      <div className={styles.item} role="group" aria-roledescription="slide">
        Item 2
      </div>
      <div className={styles.item} role="group" aria-roledescription="slide">
        Item 3
      </div>
      <div className={styles.item} role="group" aria-roledescription="slide">
        Item 4
      </div>
      <div className={styles.item} role="group" aria-roledescription="slide">
        Item 5
      </div>
      <div className={styles.item} role="group" aria-roledescription="slide">
        Item 6
      </div>
    </>
  ),
};

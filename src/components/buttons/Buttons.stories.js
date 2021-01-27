import React from "react";
import { IconButton } from "./iconButton/IconButton";
import {ToggleButton, ToggleButtonAria} from "./toggleButton/ToggleButton";

export default {
  title: "Buttons",
};

const ToggleBtnTemplate = (args) => <ToggleButton {...args} />;

export const ToggleBtn = ToggleBtnTemplate.bind({});
ToggleBtn.args = {
  pressedLabel: "Toggle me off!",
  notPressedLabel: "Toggle me on!"
};

const ToggleAriaTemplate = (args) => <ToggleButtonAria {...args} />;

export const ToggleBtnAria = ToggleAriaTemplate.bind({});
ToggleBtnAria.args = {
  label: "Toggle me!",
};

const IconBtnTemplate = (args) => <IconButton {...args} />;
export const IconBtn = IconBtnTemplate.bind({});


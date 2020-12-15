import React from "react";
import { Alert } from "./Alert";

export default {
  title: "Alert",
  component: Alert,
};

const Template = (args) => <Alert {...args} />;

export const AlertSucess = Template.bind({});
AlertSucess.args = {
  message: "Something good happened",
  isSuccess: true,
  onClose: () => alert("close")
}

export const AlertWarn = Template.bind({});
AlertWarn.args = {
  message: "Something not so good happened",
  isSuccess: false,
  onClose: () => alert("close")
}
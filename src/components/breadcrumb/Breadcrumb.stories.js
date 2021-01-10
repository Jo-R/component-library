import React from "react";
import { Breadcrumb } from "./Breadcrumb";

export default {
  title: "Breadcrumb",
  component: Breadcrumb,
};

const Template = (args) => <Breadcrumb {...args} />;

export const Breadcrumbs = Template.bind({});
Breadcrumbs.args = {
  links: [
    {
      link: "/parent",
      label: "Parent",
      current: false
    },
    {
      link: "/next-level",
      label: "Next level",
      current: false
    },
    {
      link: "/this-page",
      label: "This page",
      current: true
    }
  ]
}
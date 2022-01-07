import "@testing-library/jest-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Login, { LoginMethod } from "./components/Login";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

describe("Login Component", () => {
  let wrapper = shallow(<Login />);

  const initialProps = {
    validEmail: "abc@gmail.com",
    invalidEmail: "abcded",
    validPassword: "123456",
    invalidPassword: "1",
  };

  it("should have a header", () => {
    expect(wrapper.find("h1")).toHaveLength(1);
  });

  it("should have a header that contains a title", () => {
    expect(wrapper.find("h1").text()).toEqual("Prokeep");
  });

  it("should have a sub header", () => {
    expect(wrapper.find("h2")).toHaveLength(1);
  });

  it("should have a sub header that contains a text", () => {
    expect(wrapper.find("h2").text()).toEqual("Please sign in to your account");
  });

  // Label for Email and Password
  it("should have a label for email", () => {
    expect(wrapper.find("label")).toHaveLength(2);
  });

  it("should have an empty email and password state variable", () => {
    expect(wrapper.find('input[name="password"]').prop("value")).toBe("");
    expect(wrapper.find('input[name="email"]').prop("value")).toBe("");
  });

  it("should run onChange value", () => {
    wrapper.find('input[name="email"]').simulate("change", {
      target: { id: "emailInput", value: "email@id.com" },
    });
    wrapper.find('input[name="password"]').simulate("change", {
      target: { id: "passwordInput", value: "123456" },
    });
    expect(wrapper.find('input[name="email"]').exists()).toBe(true);
    wrapper.update();
    expect(wrapper.find('input[name="email"]').props().value).toBe(
      "email@id.com"
    );
    expect(wrapper.find('input[name="password"]').props().value).toBe("123456");
  });

  it("should check that an email is valid or not", () => {
    expect(LoginMethod().isEmailValid(initialProps.validEmail)).toBeTruthy();
    expect(LoginMethod().isEmailValid(initialProps.invalidEmail)).toBeFalsy();
  });

  it("should check that password is valid or not", () => {
    expect(
      LoginMethod().isPasswordValid(initialProps.invalidPassword)
    ).toBeFalsy();
    expect(
      LoginMethod().isPasswordValid(initialProps.validPassword)
    ).toBeTruthy();
  });
});

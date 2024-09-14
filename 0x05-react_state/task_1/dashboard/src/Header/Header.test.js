import React from "react";
import Header from "./Header";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";
import { AppContext } from "../App/AppContext";

beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("Header", () => {
    it("render without crashing", () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.exists()).toEqual(true);
    });

    it("should render a h1", () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.exists("img")).toEqual(true);
        expect(wrapper.containsMatchingElement(<h1>School dashboard</h1>)).toEqual(true);
    });

    it("should not display logout section when user is not logged in", () => {
        const contextValue = { user: { isLoggedIn: false }, logOut: jest.fn() };
        const wrapper = shallow(
            <AppContext.Provider value={contextValue}>
                <Header />
            </AppContext.Provider>
        );
        expect(wrapper.find("#logoutSection").length).toBe(0);
    });

    it("should display logout section when user is logged in", () => {
        const contextValue = { user: { isLoggedIn: true, email: "test@test.com" }, logOut: jest.fn() };
        const wrapper = shallow(
            <AppContext.Provider value={contextValue}>
                <Header />
            </AppContext.Provider>
        );
        expect(wrapper.find("#logoutSection").length).toBe(1);
        expect(wrapper.find("#logoutSection").text()).toContain("Welcome test@test.com");
    });

    it("should call logOut function when logout is clicked", () => {
        const logOutMock = jest.fn();
        const contextValue = { user: { isLoggedIn: true, email: "test@test.com" }, logOut: logOutMock };
        const wrapper = shallow(
            <AppContext.Provider value={contextValue}>
                <Header />
            </AppContext.Provider>
        );
        wrapper.find("#logoutSection span").simulate("click");
        expect(logOutMock).toHaveBeenCalled();
    });
});
import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import moment from 'moment'

// must mock out moment library to get snapshot working correctly -> in '__mocks__' folder in test
test("Should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("Should render ExpenseForm with expense data", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test("Should render error for invalid form submition", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}, // fixes jest error of preventDefault being undefined
  }); // onSubmit handler
  // find lets us find things by tag name, id, className, etc... (tag name in this case)
  // simulate: called w/ string and potential event arguments: https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/simulate.html
  expect(wrapper.state("errorState").length).toBeGreaterThan(0);
  // fetches state and makes sure the error message in ExpenseForm is not an empty string
  expect(wrapper).toMatchSnapshot();
  // renders 2 new snapshot to make sure they match when they run (1st one no error, 2nd one is error)
});

test("should set description on input change", () => {
  const value = "new description";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input").at(0).simulate("change", {
    target: { value },
  });
  // .at() fetches by the index of inputs
  expect(wrapper.state("description")).toBe(value);
  // make sure state changed correctly
});

test("should set note on text area change", () => {
  const value = "new text";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("textarea").simulate("change", {
    target: { value },
  });
  expect(wrapper.state("note")).toBe(value);
  // make sure state changed correctly
});

test("should set amount if valid input", () => {
  const value = "23.50";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input").at(1).simulate("change", {
    target: { value },
  });
  expect(wrapper.state("amount")).toBe(value);
});

test("should not set amount if invalid input", () => {
  const value = "12.122"; // invalid w/ reg expression only allowing 2 decimal places!
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input").at(1).simulate("change", {
    target: { value },
  });
  expect(wrapper.state("amount")).toBe("");
  // ecxpected to be empty string b/c we didn't pass in a value or default value
});

test("should call onSubmit prop for valid form submission", () => {
  const onSubmitSpy = jest.fn(); // this is the function we call for a new spy
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  )
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state('errorState')).toBe('')
  expect(onSubmitSpy).toHaveBeenLastCalledWith( {
      description: expenses[0].description,
      amount: expenses[0].amount,
      note: expenses[0].note,
      createdAt: expenses[0].createdAt
  })
});


test('should set new date on onDateChange', () => {
    const timeNow = moment();
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onDateChange')(timeNow);
    // finds single date picker and graqbs ondatechange prop
    // sets onDateChange value to timeNow
    expect(wrapper.state('createdAt')).toEqual(timeNow);
    // access createdAt value and expect it to be timeNow
})

test('should set on focus to true', () => {
    const focused = true
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused})

    expect(wrapper.state('calendarFocused')).toBe(focused);
});
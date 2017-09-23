import React from 'react';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';
import Rating from '.';
import noop from 'lodash/noop';

// We need to mock Lodash's uniqueId generator so that we can generate
// a valid snapshot and query the component.
jest.mock('lodash/uniqueId', () => jest.fn(() => 'rating-some-random-id'));

describe('Rating component', () => {
  it('renders without crashing', () => {
    mount(<Rating onSubmit={noop} />);
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <Rating onSubmit={noop} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('bootstraps with the correct initial state', () => {
    const wrapper = shallow(<Rating onSubmit={noop} />);

    expect(wrapper.state('rating')).toEqual(0);
    expect(wrapper.state('submitted')).toEqual(false);
  });

  it('renders the customised title, button text and success message if provided', () => {
    const wrapper = shallow(
      <Rating
        title="Rate us!"
        buttonText="Cast my vote"
        successMessage="Thanks for that"
        onSubmit={noop} />
    );
    const button = wrapper.find('.Rating__button');

    expect(wrapper.find('.Rating__title').text()).toEqual('Rate us!');
    expect(button.text()).toEqual('Cast my vote');

    // Now submit the form so that we can query the success message.
    button.simulate('click', { preventDefault() {} });
    expect(wrapper.find('.Rating__message').text()).toEqual('Thanks for that');
  });

  it('updates the internal state after selecting a rating', () => {
    const wrapper = mount(<Rating onSubmit={noop} />);
    const stars = wrapper.find('.Star__radio');
    const input = wrapper.find('.Rating__button');

    // First click on the first star and expect the rating to be 1.
    stars.first().simulate('change', { target: { value: 1 } });

    expect(wrapper.state('rating')).toEqual(1);
    expect(wrapper.state('submitted')).toEqual(false);

    // Then click on the fourth star (the one at index 3)
    // and expect the rating to be 4.
    stars.at(3).simulate('change', { target: { value: 4 } });

    expect(wrapper.state('rating')).toEqual(4);
    expect(wrapper.state('submitted')).toEqual(false);

    // Now submit the form and expect the correct rating value.
    input.simulate('click', { preventDefault() {} });

    expect(wrapper.state('rating')).toEqual(4);
    expect(wrapper.state('submitted')).toEqual(true);
  });

  it('calls the onSubmit function with the correct default value', () => {
    const spy = jest.fn();
    const wrapper = shallow(<Rating onSubmit={spy} />);
    const input = wrapper.find('.Rating__button');

    // Click submit without changing anything and
    // expect the onSubmit callback to be called with rating=0.
    input.simulate('click', { preventDefault() {} });

    expect(spy).toHaveBeenLastCalledWith(0);
  });

  it('calls the onSubmit function with the correct value', () => {
    const spy = jest.fn();
    const wrapper = mount(<Rating onSubmit={spy} />);
    const star = wrapper.find('#rating-some-random-id-stars-4');
    const input = wrapper.find('.Rating__button');

    // Now click on the fourth star and expect the callback
    // to be called with rating=4.
    star.simulate('change', { target: { value: 4 } });
    input.simulate('click', { preventDefault() {} });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(4);
  });

  it('allows no further interaction once the form is submitted', () => {
    const wrapper = mount(<Rating onSubmit={noop} />);
    const stars = wrapper.find('.Star__radio');
    const input = wrapper.find('.Rating__button');

    // Select any random value and submit the form.
    // Then try to select any other rating. The internal state should not change.
    stars.at(2).simulate('change', { target: { value: 3 } });
    input.simulate('click', { preventDefault() {} });
    stars.at(4).simulate('change', { target: { value: 5 } });

    expect(wrapper.state('rating')).toEqual(3);
  });
});

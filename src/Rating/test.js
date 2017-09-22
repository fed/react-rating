import React from 'react';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';
import Rating from '.';
import noop from 'lodash/noop';

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

  it('updates the internal state after selecting a rating', () => {
    const wrapper = shallow(<Rating onSubmit={noop} />);
    const star = wrapper.find('.Rating__radio');
    const input = wrapper.find('.Rating__button');

    // First click on the first star and expect the rating to be 1.
    star.first().simulate('change', { target: { value: 1 } });

    expect(wrapper.state('rating')).toEqual(1);
    expect(wrapper.state('submitted')).toEqual(false);

    // Then click on the fourth star (the one at index 3)
    // and expect the rating to be 4.
    star.at(3).simulate('change', { target: { value: 4 } });

    expect(wrapper.state('rating')).toEqual(4);
    expect(wrapper.state('submitted')).toEqual(false);

    // Now submit the form and expect the correct rating value.
    input.simulate('click', { preventDefault() {} });

    expect(wrapper.state('rating')).toEqual(4);
    expect(wrapper.state('submitted')).toEqual(true);
  });

  it('calls the onSubmit function with the correct value', () => {
    const spy = jest.fn();
    const wrapper = shallow(<Rating onSubmit={spy} />);
    const star = wrapper.find('#rating-stars-4');
    const input = wrapper.find('.Rating__button');

    // Click submit without changing anything and
    // expect the onSubmit callback to be called with rating=0.
    input.simulate('click', { preventDefault() {} });

    expect(spy).toHaveBeenLastCalledWith(0);

    // Now click on the fourth star and expect the callback
    // to be called with rating=4.
    star.simulate('change', { target: { value: 4 } });
    input.simulate('click', { preventDefault() {} });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith(4);
  });
});

import React from 'react';
import {mount, shallow} from 'enzyme';
import Average from '.';

describe('Average component', () => {
  it('renders without crashing', () => {
    mount(<Average rating={3} />);
  });

  it('has the correct className applied', () => {
    const wrapper = shallow(<Average />);

    expect(wrapper.hasClass('Average')).toEqual(true);
  });

  it('always renders five stars', () => {
    const wrapper = shallow(<Average />);

    expect(wrapper.find('.Average__stars').children()).toHaveLength(5);
  });

  it('renders correctly when no props are passed in', () => {
    const wrapper = shallow(<Average />);

    expect(wrapper.hasClass('Average')).toEqual(true);
    expect(wrapper.find('.Average__title').text()).toEqual('Average rating');

    // Renders 5 inactive stars
    expect(wrapper.find('.Average__star').filterWhere(item => {
      return item.prop('src') === 'star-inactive.svg';
    })).toHaveLength(5);

    // Renders no active stars
    expect(wrapper.find('.Average__star').filterWhere(item => {
      return item.prop('src') === 'star-active.svg';
    })).toHaveLength(0);
  });

  it('renders custom titles correctly', () => {
    const wrapper = shallow(<Average title="This is a cool new title" />);

    expect(wrapper.find('.Average__title').text()).toEqual('This is a cool new title');
  });

  it('renders custom rating values correctly', () => {
    const wrapper = shallow(<Average rating={3} />);

    expect(wrapper.find('.Average__star').filterWhere(item => {
      return item.prop('src') === 'star-active.svg';
    })).toHaveLength(3);

    expect(wrapper.find('.Average__star').filterWhere(item => {
      return item.prop('src') === 'star-inactive.svg';
    })).toHaveLength(2);
  });

  it('displays the correct title on hover', () => {
    const wrapper = shallow(<Average rating={2} />);

    expect(wrapper.find('.Average__stars').prop('title')).toEqual('2 stars out of 5');
  });

  it('defaults to rating=0 if a negative value is passed in', () => {
    const wrapper = shallow(<Average rating={-7} />);

    expect(wrapper.find('.Average__star').filterWhere(item => {
      return item.prop('src') === 'star-active.svg';
    })).toHaveLength(0);

    expect(wrapper.find('.Average__star').filterWhere(item => {
      return item.prop('src') === 'star-inactive.svg';
    })).toHaveLength(5);
  });

  it('defaults to rating=5 if a value greater than 5 gets passed in', () => {
    const wrapper = shallow(<Average rating={12} />);

    expect(wrapper.find('.Average__star').filterWhere(item => {
      return item.prop('src') === 'star-active.svg';
    })).toHaveLength(5);

    expect(wrapper.find('.Average__star').filterWhere(item => {
      return item.prop('src') === 'star-inactive.svg';
    })).toHaveLength(0);
  });
});

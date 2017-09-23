import React from 'react';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';
import Stars from '.';
import noop from 'lodash/noop';

// We need to mock Lodash's uniqueId generator so that we can generate
// a valid snapshot and query the component.
jest.mock('lodash/uniqueId', () => jest.fn(() => 'rating-some-random-id'));

describe('Stars component', () => {
  it('renders without crashing', () => {
    mount(<Stars onChange={noop} />);
  });

  it('renders correctly with the default values', () => {
    const tree = renderer.create(
      <Stars onChange={noop} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders any number of stars', () => {
    const wrapper = shallow(<Stars onChange={noop} total={3} />);

    expect(wrapper.children()).toHaveLength(3);
  });
});

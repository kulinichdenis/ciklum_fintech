import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, shallow, configure } from 'enzyme';
import { Table, TableRow } from '../src/views/components'

configure({ adapter: new Adapter() })

describe('should <Table />', () => {
  it('should render <Table />', () => {
    const wrapper = shallow(<Table rows={[]} />);
    expect(wrapper.find('table')).toHaveLength(1);
    expect(wrapper.find('th')).toHaveLength(5);
    expect(wrapper.find('th').at(0).text()).toEqual('Date');
    expect(wrapper.find('th').at(3).text()).toEqual('Closest NEO');
  });

  it('should render <Table /> with waiting for data', () => {
    const wrapper = shallow(<Table rows={[]} />);
    expect(wrapper.find('tbody').text()).toEqual('Loading...');
  })

  it('should render <Table /> with rows', () => {
    const wrapper = shallow(<Table rows={[{ date: new Date()}]} />);
    expect(wrapper.find('TableRow')).toHaveLength(1); 
  });
});

describe('should render <TableRow />', () => {
  const date = new Date();
  const props = {
    date,
    estimated_diameter: 10,
    fastest: 10,
    closest: 10,
    hazardous_asteroid: 10,
  }

  it('should render <TableRow>', () => {
    const wrapper = shallow(< TableRow { ...props } hightestHazardous={[]}/>);
    expect(wrapper.find('td')).toHaveLength(5);
  });

  it('should render rows of hazardous asteroid with class name "Dangerous"', () => {
    const wrapper = shallow(<TableRow { ...props } hightestHazardous={[ { date } ]} />); 
    expect(wrapper.find('.Dangerous')).toHaveLength(1);
  });

  it('should render rows of hazardous asteroid without class name "Dangerous"', () => {
    const wrapper = shallow(<TableRow { ...props } hightestHazardous={[]} />);
    expect(wrapper.find('.Dangerous')).toHaveLength(0);
  })
})


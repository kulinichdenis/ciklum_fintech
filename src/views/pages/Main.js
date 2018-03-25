import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'views/components';
import { fetchNeo, updateNeo } from 'state/reducers/Neo';
import '../../style/style.scss';

class Main extends Component {
  componentDidMount() {
    this.props.fetchNeo();
    this.interval = setInterval(this.props.updateNeo, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        <Table rows={this.props.neo} />
      </div>
    )
  }
}

const mapToProps = (state) => ({
  neo: state.neo.list
});

Main.propTypes = {
  neo: PropTypes.array.isRequired,
}

export default connect(mapToProps, { fetchNeo, updateNeo })(Main);

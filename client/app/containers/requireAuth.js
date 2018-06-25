import React, { Component } from 'react'
import { connect } from 'react-redux'

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.authReducer.authenticated
    };
  }

  return connect(
    mapStateToProps,
    null)(ComposedComponent);
};

//Imagine we are in commentbox.js
//import requireAuth from 'components/requireAuth';

//class CommentBox {

//}

//export default requireAuth(CommentBox);

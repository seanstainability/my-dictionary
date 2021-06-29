import React from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import WordList from "./WordList";
import AddWord from "./AddWord";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { getWordsFB } from "./redux/modules/words";
import UpdateWord from "./UpdateWord";

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  load: () => {
    dispatch(getWordsFB());
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={WordList} />
          <Route path="/add" exact component={AddWord} />
          <Route path="/update/:word_idx" exact component={UpdateWord} />
        </Switch>
        {/* <WordList /> */}
        {/* <AddWord /> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

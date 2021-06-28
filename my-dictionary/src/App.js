import React from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import WordList from "./WordList";
import AddWord from "./AddWord";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <WordList />
        {/* <AddWord /> */}
      </div>
    );
  }
}

export default App;

import React from 'react';
import Spinner from "react-spinkit";
import GrepResult from './GrepResult.js';
require('../../css/components/GitGrep.css');

class GrepBox extends React.Component {
  constructor(props) {
    super(props);
    var query = this.props.location.query || {};
    this.state = {repo: query.repo || query.project || '^ul', text: query.text || query.grep || '', branch: query.branch || query.ref || 'HEAD', path: query.path || '.', data: [], pending: false};
  }
  loadGrepFromServer(params) {
    this.setState({pending: true});
    fetch(`http://git-viewer:1337/repo/${params.repo}/grep/${params.branch}?q=${params.text}&path=${params.path}`, { })
      .then(response => response.json() )
      .then(json => {
        this.setState({data: json, pending: false});
      }).catch(ex => {
         console.log('parsing failed', ex)
      });
  }
  handleRepoChange(e) {
    this.setState({repo: e.target.value});
  }
  handleTextChange(e) {
    this.setState({text: e.target.value});
  }
  handleBranchChange(e) {
    this.setState({branch: e.target.value});
  }
  handlePathChange(e) {
    this.setState({path: e.target.value});
  }
  componentDidMount() {
    var query = this.props.location.query || {};
    if (query.submit == 'Grep') {
      this.loadGrepFromServer(this.state);
    }
  }
  render() {
    var loading = this.state.pending ? ( <Spinner spinnerName='circle' noFadeIn /> ) : ( <div/> );
    var grepNodes = this.state.data.map(grep => (
      <GrepResult repo={grep.repo} branch={grep.branch} file={grep.file} line_no={grep.line_no} line={grep.line}/>
      )
    );
    return (
      <div>
        <div style={{background: 'white', display: 'flex'}}>
          <form className="grepForm">
            <input name="repo" type="search" placeholder="Matching repos (e.g. ul)" value={this.state.repo} onChange={this.handleRepoChange} />
            <input name="text" type="search" placeholder="Search expression" value={this.state.text} onChange={this.handleTextChange} />
            <input name="branch" type="search" placeholder="Matching branches (e.g. HEAD)" value={this.state.branch} onChange={this.handleBranchChange} />
            <input name="path" type="search" placeholder="Matching path (e.g. *.java)" value={this.state.path} onChange={this.handlePathChange} />
            <input name="submit" type="submit" value="Grep" />
          </form>
          {loading}
        </div>
        <pre>
        {grepNodes}
        </pre>
      </div>
    );
  }
}

export default GrepBox;  


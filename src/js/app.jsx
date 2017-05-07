const React = require('react');
const ReactDOM = require('react-dom');

class HelloMessage extends React.Component {
	render() {
		    return <div>Top {this.props.name}</div>;
		  
	}
	
}

ReactDOM.render(<HelloMessage name="Kek!"/>, document.querySelector('#app'));

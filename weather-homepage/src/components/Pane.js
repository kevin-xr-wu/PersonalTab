var React = require('react'); 

class Pane extends React.Component {
    render() {
        return (
            <div className="pane">
                {this.props.children}
            </div>
        );
    }
}

module.exports = Pane;
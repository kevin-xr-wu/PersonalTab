var React = require('react'); 

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected : 0
        };
    }

    handleClick(index, event) {
        event.preventDefault();
        this.setState({
            selected: index
        });
    }

    _renderTitles() {
        function labels(child, index) {
            // let activeClass = (this.state.selected === index ? 'active' : '');            
            return (
                <li className="tab-list" key={index}> 
                    <a className="tab-title-label hvr-grow hvr-underline-from-center" href="Tab Number"
                    onClick={this.handleClick.bind(this,index)}> 
                        {child.props.label}
                    </a>
                </li>
            );
        }

        return (
            <div> 
                <div className="tab-title-design"> 
                    {this.props.children.map(labels.bind(this))}
                </div>
            </div>
        );
    }

    _renderContent() {
        return ( 
            <div className="tabs_content">
                {this.props.children[this.state.selected]} 
            </div> 
        );
    }

    render() {
        return (
            <div className="tabs">
                {this._renderTitles()}
                {this._renderContent()}
            </div>
        );
    }
};

module.exports = Tabs;
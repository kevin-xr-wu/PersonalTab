var React = require('react'); 
var {Editor, EditorState, convertFromRaw, convertToRaw} = require('draft-js');

class Notes extends React.Component {
    constructor(props) {
        super(props);

        const content = window.localStorage.getItem('content');
        const reminder = window.localStorage.getItem('reminder'); 

        this.state = { }; 
        if (content) {
          this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
        } else {
          this.state.editorState = EditorState.createEmpty();
        }

        if (reminder) {
            this.state.reminderState = EditorState.createWithContent(convertFromRaw(JSON.parse(reminder)));
        } else {
            this.state.reminderState = EditorState.createEmpty();
        }

        this.onChange = this.onChange.bind(this);
        this.onReminderChange = this.onReminderChange.bind(this);
        this.saveContent = this.saveContent.bind(this);
        this.saveReminderContent = this.saveReminderContent.bind(this);
    }

    saveContent = (content) => {
        window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
    }

    saveReminderContent = (content) => {
        window.localStorage.setItem('reminder', JSON.stringify(convertToRaw(content)));
    }

    onChange = (editorState) => {
        this.setState({
            editorState
        }, () => {
            const contentState = this.state.editorState.getCurrentContent();
            this.saveContent(contentState); 
        });
    }

    onReminderChange = (reminderState) => {
        this.setState({
            reminderState
        }, () => {
            const contentState = this.state.reminderState.getCurrentContent();
            this.saveReminderContent(contentState); 
        });
    }

    render() {
        return (
            <div className="filler">
                <div className="title"> Your Workspace </div> 
                <div className="notes-container">
                    <div className="notes"> 
                        <Editor editorState={this.state.editorState} onChange={this.onChange} />
                    </div>
                    <div className="reminder"> 
                        <Editor editorState={this.state.reminderState} onChange={this.onReminderChange} />
                    </div>
                </div>
            </div> 
        );
    }
}

module.exports = Notes; 
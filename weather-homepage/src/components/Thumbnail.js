/* eslint-disable */
var React = require('react'); 

function AddThumbnail(props) {
  return (
      <li className='thumbnail-item' className='thumbnail-container' onClick={props.onSelect.bind(null)}>
          <ul>
              <div className='thumbnail-header'>
                  Add to your routine
              </div> 
              <li>
                  <img
                      className='add'
                      src={require('../images/greyplus.png')}
                  />
              </li>
          </ul>
      </li>
  )
}

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      needToAdd: false
    };

    this.handleAdd = this.handleAdd.bind(this); 
  }

  handleAdd() {
    this.setState(function() {
      return {
        needToAdd: !this.state.needToAdd
      }
    });
  }

  render() {
    return (
    <div>
      <h2 className='dailyRoutine'> Your daily routine... </h2>
      <ul className='popular-list'>
        <li className='thumbnail-item' className='thumbnail-container'>
          <a href='http://www.businessinsider.com/'>
            <ul>
                <div className='thumbnail-header'>
                  <img
                    className='icon'
                    src={require('../images/bi_favicon.jpg')}
                  />
                    Business Insider
                </div> 
                <li>
                    <img
                        className='thumbnail'
                        src={require('../images/BI_thumbnail.PNG')}
                    />
                </li>
            </ul>
          </a>
        </li>
        <li className='thumbnail-item' className='thumbnail-container'>
          <a href='http://www.npr.org/sections/news/'>
            <ul>
                <div className='thumbnail-header'>
                  <img
                    className='icon'
                    src={require('../images/npr_favicon.png')}
                  />
                    National Public Radio
                </div> 
                <li>
                    <img
                        className='thumbnail'
                        src={require('../images/npr_thumbnail.PNG')}
                    />
                </li>
            </ul>
          </a>
        </li>
        <li className='thumbnail-item' className='thumbnail-container'>
          <a href='https://www.reddit.com/r/cscareerquestions/'>
            <ul>
                <div className='thumbnail-header'>
                  <img
                    className='icon'
                    src={require('../images/reddit_favicon.png')}
                  />
                    CS Career Questions
                </div> 
                <li>
                    <img
                        className='thumbnail'
                        src={require('../images/cscareer_thumbnail.PNG')}
                    />
                </li>
            </ul>
          </a>
        </li>
        <li className='thumbnail-item' className='thumbnail-container'>
          <a href='https://www.reddit.com/r/programming/'>
            <ul>
                <div className='thumbnail-header'>
                  <img
                    className='icon'
                    src={require('../images/reddit_favicon.png')}
                  />
                    Programming
                </div> 
                <li>
                    <img
                        className='thumbnail'
                        src={require('../images/programming_thumbnail.PNG')}
                    />
                </li>
            </ul>
          </a>
        </li>
        <li className='thumbnail-item' className='thumbnail-container'>
          <a href='https://www.reddit.com/r/androiddev/'>
            <ul>
                <div className='thumbnail-header'>
                  <img
                    className='icon'
                    src={require('../images/reddit_favicon.png')}
                  />
                    AndroidDev
                </div> 
                <li>
                    <img
                        className='thumbnail'
                        src={require('../images/androiddev_thumbnail.PNG')}
                    />
                </li>
            </ul>
          </a>
        </li>
        <li className='thumbnail-item' className='thumbnail-container'>
          <a href='http://imgur.com/'>
            <ul>
                <div className='thumbnail-header'>
                  <img
                    className='icon'
                    src={require('../images/imgur_icon.png')}
                  />
                    Imgur
                </div> 
                <li>
                    <img
                        className='thumbnail'
                        src={require('../images/imgur_thumbnail.PNG')}
                    />
                </li>
            </ul>
          </a>
        </li>
        <li className='thumbnail-item' className='thumbnail-container'>
          <a href='https://www.reddit.com/r/summonerswar/'>
            <ul>
                <div className='thumbnail-header'>
                  <img
                    className='icon'
                    src={require('../images/reddit_favicon.png')}
                  />
                    Summoners War
                </div> 
                <li>
                    <img
                        className='thumbnail'
                        src={require('../images/sw_thumbnail.PNG')}
                    />
                </li>
            </ul>
          </a>
        </li>
        <li className='thumbnail-item' className='thumbnail-container'>
          <a href='https://www.messenger.com'>
            <ul>
                <div className='thumbnail-header'>
                  <img
                    className='icon'
                    src={require('../images/messenger_icon.png')}
                  />
                    Messenger
                </div> 
                <li>
                    <img
                        className='thumbnail'
                        src={require('../images/messenger_thumbnail.png')}
                    />
                </li>
            </ul>
          </a>
        </li>
        {/* <AddThumbnail onSelect={this.handleAdd}/>                                         */}
      </ul>
    </div>
    )
  }
}

module.exports = Thumbnail; 
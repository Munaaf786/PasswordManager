import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const colorsList = [
  'yellow',
  'darkGreen',
  'lightGreen',
  'orange',
  'red',
  'blue',
]

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isChecked: false,
    searchInput: '',
  }

  onAddPassword = event => {
    event.preventDefault()

    const {website, username, password} = this.state
    const classNameValue = colorsList[Math.floor(Math.random() * 6)]
    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
      classNameValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newPassword],
      website: '',
      username: '',
      password: '',
      isTrue: true,
    }))
  }

  onChangeWebsiteInput = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeCheckboxInput = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  deletePassword = id => {
    const {latestList} = this.state
    const newFilteredList = latestList.filter(eachItem => eachItem.id !== id)
    this.setState({
      latestList: newFilteredList,
    })
  }

  renderPasswordsList = filteredList => {
    const {isChecked} = this.state

    return filteredList.map(eachPasswordDetails => {
      const firstLetter = eachPasswordDetails.website[0].toUpperCase()

      const onClickDelete = () => {
        this.deletePassword(eachPasswordDetails.id)
      }

      return (
        <li className="password-list-item" key={eachPasswordDetails.id}>
          <p className={`profile ${eachPasswordDetails.classNameValue}`}>
            {firstLetter}
          </p>
          <div>
            <p className="content website">{eachPasswordDetails.website}</p>
            <p className="content">{eachPasswordDetails.username}</p>
            {!isChecked && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                alt="stars"
                className="stars"
              />
            )}
            {isChecked && (
              <p className="content">{eachPasswordDetails.password}</p>
            )}
          </div>
          <button
            type="button"
            className="del-btn"
            onClick={onClickDelete}
            data-testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
              className="del-image"
            />
          </button>
        </li>
      )
    })
  }

  render() {
    const {latestList, website, username, password, searchInput} = this.state
    const filteredList = latestList.filter(eachDetail =>
      eachDetail.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    let {isTrue} = this.state
    if (filteredList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="input-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="pswd-manager-sm-image"
          />
          <form className="input-form" onSubmit={this.onAddPassword}>
            <h1 className="add-pswd-heading">Add New Password</h1>
            <div className="input-field-container">
              <div className="input-logos-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-logos"
                />
              </div>
              <input
                type="text"
                className="input-field"
                placeholder="Enter Website"
                onChange={this.onChangeWebsiteInput}
                value={website}
                required
              />
            </div>
            <div className="input-field-container">
              <div className="input-logos-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-logos"
                />
              </div>
              <input
                type="text"
                className="input-field"
                placeholder="Enter Username"
                onChange={this.onChangeUsernameInput}
                value={username}
                required
              />
            </div>
            <div className="input-field-container">
              <div className="input-logos-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-logos"
                />
              </div>
              <input
                type="password"
                className="input-field"
                placeholder="Enter Password"
                onChange={this.onChangePasswordInput}
                value={password}
                required
              />
            </div>
            <div className="button-container">
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="pswd-manager-lg-image"
          />
        </div>
        <div className="password-list-section">
          <div className="section-navbar">
            <div className="your-pswd-heading">
              <h1 className="heading-text">Your Passwords</h1>
              <p className="pswd-count">{latestList.length}</p>
            </div>
            <div className="search-container">
              <div className="search-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-image"
                />
              </div>
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="separator" />
          <div className="show-pswd-container">
            <input
              type="checkbox"
              className="checkbox"
              id="show-pswd"
              onChange={this.onChangeCheckboxInput}
            />
            <label htmlFor="show-pswd" className="show-pswd-label">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="empty-image"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="passwords-list">
              {this.renderPasswordsList(filteredList)}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App

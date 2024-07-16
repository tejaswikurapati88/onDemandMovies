import './index.css'

const CastItems = props => {
  const {castDetails} = props
  const {name, character, profileImage, profilePath} = castDetails
  return (
    <li className="list">
      {profilePath !== null && (
        <div className="lis-cont">
          <img className="profile-img" src={profileImage} alt={name} />
          <p className="name">{name}</p>
          <p className="char-name">{character}</p>
        </div>
      )}
    </li>
  )
}

export default CastItems

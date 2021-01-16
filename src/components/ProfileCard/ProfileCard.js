
const ProfileCard = ({ profile }) => {

    return <div className='profile'>
        <div>
            <div>
                <h4 className='profile__name'>
                    {profile.FirstName} {profile.LastName}
                </h4>

                <p className='profile__username'>{profile.UserName}</p>
            </div>
        </div>
    </div>
}

export default ProfileCard;

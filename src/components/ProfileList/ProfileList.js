import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import ProfileCard from '../ProfileCard/ProfileCard';

const ProfileList = ({ profiles }) => {

    return <section aria-label='profile-list'>
        {profiles.map((profile, index) => {
            return <Fragment key={`profile-${index}`}>
                <ProfileCard profile={profile} />
            </Fragment>
        })}
    </section>
}

export default ProfileList;

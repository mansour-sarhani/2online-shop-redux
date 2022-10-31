function ProfileContent({user}) {
    return (
        <div className="profile-wrapper">
            <div className="profile-item">
                <span>نام و نام خانوادگی: </span>
                <span>{user.name}</span>
            </div>
            <div className="profile-item">
                <span>نام کاربری: </span>
                <span>{user.userName}</span>
            </div>
            <div className="profile-item">
                <span>ایمیل: </span>
                <span>{user.email}</span>
            </div>
            <div className="profile-item">
                <span>شماره موبایل: </span>
                <span>{user.telNo}</span>
            </div>
        </div>
    );
}

export default ProfileContent;
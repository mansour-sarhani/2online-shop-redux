import Layout from "../Layout/Layout";
import ProfileContent from "../Components/Profile/ProfileContent";
import '../Components/Profile/profile.css'
import {useAuthState} from "../Context/Auth/authContext";
import Loader from "../Common/Loader";

function ProfilePage() {
    const {user} = useAuthState()

    return (
        <Layout>
            <div className="inner-page panel-page">
                <div className="container">
                    {!user ? <Loader /> : <ProfileContent user={user} />}
                </div>
            </div>
        </Layout>
    );
}

export default ProfilePage;
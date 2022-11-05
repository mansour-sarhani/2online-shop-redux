import Layout from "../Layout/Layout";
import ProfileContent from "../Components/Profile/ProfileContent";
import '../Components/Profile/profile.css'
import Loader from "../Common/Loader";
import {useSelector} from "react-redux";

function ProfilePage() {
    const {user} = useSelector(state => state.auth)
    console.log(user)

    return (
        <Layout>
            <div className="inner-page panel-page">
                <div className="container">
                    {user ? <ProfileContent user={user} /> : <Loader />}
                </div>
            </div>
        </Layout>
    );
}

export default ProfilePage;
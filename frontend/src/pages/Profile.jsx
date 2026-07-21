import { useEffect, useState } from "react";
import API from "../api/axios";

function Profile() {

  const [profile, setProfile] = useState(null);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const response = await API.get(
        "/api/users/profile"
      );

      setProfile(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <h1>Profile Page</h1>

      {profile && (

        <div>

          <h3>Email: {profile.email}</h3>

          <h3>Role: {profile.roles}</h3>

          <h3>Status: {profile.status}</h3>

        </div>

      )}

    </div>

  );
}

export default Profile;
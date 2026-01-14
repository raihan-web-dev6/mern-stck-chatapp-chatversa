import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { serverURL } from "../main";
import { setUserData } from "../redux/userSlice";

/**
 * Custom hook to fetch currently logged-in user
 * Uses cookie-based auth
 */
const getCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/user/current`,
          { withCredentials: true }
        );

        // backend returns: { user: {...} }
        dispatch(setUserData(result.data.user));
      } catch (error) {
        console.log("Fetch Current User Error:", error.response?.data || error.message);
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default getCurrentUser;

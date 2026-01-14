import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../main";
import { setmessages } from "../redux/messageslice";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!selectedUser?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${serverURL}/api/message/get/${selectedUser._id}`,
          { withCredentials: true }
        );

        dispatch(setmessages(res.data));
      } catch (error) {
        console.log("Fetch Messages Error:", error);
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]);
};

export default useGetMessages;

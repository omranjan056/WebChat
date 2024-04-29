import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllChats } from "../apicalls/chats";
import { GetAllUsers, GetCurrentUser } from "../apicalls/users";
import { HideLoader, ShowLoader } from "../redux/loaderSlice";
import { SetAllUsers, SetUser, SetAllChats } from "../redux/userSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    try {
      // dispatch(ShowLoader());
      const response = await GetCurrentUser();
      const allUsersResponse = await GetAllUsers();
      const allChatsResponse = await GetAllChats();
      // dispatch(HideLoader());
      if (response.success) {
        dispatch(SetUser(response.data));
        dispatch(SetAllUsers(allUsersResponse.data));
        dispatch(SetAllChats(allChatsResponse.data));
      } else {
        toast.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-100 p-2">
      {/* header */}
      <div className="flex justify-between p-5 bg-cyan-600 rounded">
            
            <div className="flex items-center gap-1">
              <i class="ri-question-answer-line text-2xl text-black "></i>
              <h1 className="text-black text-2xl uppercase font-semibold cursor-pointer"
                onClick={()=>(navigate("/"))}
              >WECHAT</h1>
        </div>
        <div className="flex gap-2 text-md items-center bg-slate-300 p-2 rounded">
          {user?.profilePic && 
            <img
              src={user?.profilePic}
              alt="profile"
              className="h-8 w-8 rounded-full object-cover"
            />
          }
          {!user?.profilePic && <i class="ri-user-3-fill text-primary cursor-pointer"
            onClick={() => {
              navigate("/profile");
            }}
          ></i>}
          <h1
            className="underline text-primary cursor-pointer text-xl"
            onClick={() => {
              navigate("/profile");
            }}
          >
            {user?.name}
          </h1>

          <i class="ri-logout-circle-r-line ml-5 text-xl cursor-pointer text-primary"
                onClick={()=>{
                  localStorage.removeItem("token");
                  navigate("/login")
                }}
                ></i>
        </div>
      </div>

      {/* content (pages) */}
      <div className="py-5">{children}</div>
    </div>
  );
}

export default ProtectedRoute;
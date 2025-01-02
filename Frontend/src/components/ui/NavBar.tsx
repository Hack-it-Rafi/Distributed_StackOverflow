import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { message, Popover, Button, Divider, Typography } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationsMutation,
} from "../../redux/features/user/userAccess.api";
import { debounce } from "lodash";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";

const { Text } = Typography;

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(useCurrentUser);
  const [updateNotifications] = useUpdateNotificationsMutation();
  const [seenNotifications, setSeenNotifications] = useState(new Set());
  const dispatch = useAppDispatch();

  const handleCreatePost = () => {
    navigate(`/create-post`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const { data, refetch } = useGetAllNotificationsQuery(undefined);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  const debouncedFetch = useCallback(
    debounce(() => {
      refetch();
    }, 5000),
    [refetch]
  );

  useEffect(() => {
    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  const handlePostRedirect = (id) => {
    navigate(`/post/${id}`);
  };

  const handleNotificationSeen = async (item) => {
    try {
      await updateNotifications({
        id: item._id,
        data: { seenUser: [...item.seenUser, user?.userId] },
      });
      setSeenNotifications((prev) => new Set(prev).add(item._id));
    } catch (error) {
      message.error("Failed to update Notification.");
    }
  };

  const handleHomeRedirect = () => {
    navigate(`/`);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  const notificationContent = (
    <div
      className="w-80 max-h-80 overflow-y-auto"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE 10+
      }}
    >
      <style>
        {`
          .w-80::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div className="flex flex-col gap-3">
        {data?.data
          ?.filter(
            (item) =>
              (!item.seenUser.includes(user?.userId) || item.isDeleted === false)&&item.postId.userEmail!==user?.userEmail
          )
          .map((item) => (
            <button
              key={item._id}
              onClick={() => {
                if (
                  !item.seenUser.includes(user?.userId) &&
                  !seenNotifications.has(item._id)
                ) {
                  handleNotificationSeen(item);
                }
                handlePostRedirect(item.postId._id);
              }}
            >
              <div
                className={`py-2 ${
                  item.seenUser.includes(user?.userId) ||
                  seenNotifications.has(item._id)
                    ? "bg-gray-200"
                    : "bg-white"
                }`}
              >
                <span className="font-semibold">{`${item.postId.userName}`}</span>
                <span> asked: </span>
                <span className="font-semibold">{`${item.headLine}`}</span>
              </div>
            </button>
          ))}
      </div>
    </div>
  );

  const userPopoverContent = (
    <div style={{ textAlign: "center" }}>
      <img
        src={user?.userImage}
        alt="User avatar"
        className="mx-auto"
        style={{ width: 50, height: 50, marginBottom: 10 }}
      />
      <Text strong>{user?.userName}</Text>
      <br />
      <Text type="secondary">{user?.userEmail}</Text>
      <Divider style={{ margin: "10px 0" }} />
      <Button onClick={handleLogout} type="primary" danger>
        Logout
      </Button>
    </div>
  );

  return (
    <div className="navbar bg-base-100 py-5">
      <div className="navbar-start">
        <div className="w-36">
          <button onClick={handleHomeRedirect}>
            <img className="w-full" src="/logo.png" alt="Logo" />
          </button>
        </div>
      </div>
      <div className="navbar-end gap-10">
        {location.pathname !== "/create-post" && (
          <button onClick={handleCreatePost} className="btn bg-[#F48024] text-white">
            Create Post
          </button>
        )}
        <Popover placement="bottom" content={notificationContent} trigger="click">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <IoIosNotificationsOutline size={25}/>
              <span className="badge badge-xs bg-[#F48024] indicator-item"></span>
            </div>
          </button>
        </Popover>
        <Popover placement="bottom" content={userPopoverContent} trigger="click">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="User avatar" src={user?.userImage} />
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default NavBar;

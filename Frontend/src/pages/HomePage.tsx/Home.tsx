import { useCallback, useEffect, useState } from "react";
import { useGetAllPostsQuery } from "../../redux/features/user/userAccess.api";
import { debounce } from "lodash";
import PostCard from "../../components/ui/PostCard";
import { Input } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const user = useAppSelector(useCurrentUser);

  // console.log(user?.userEmail);

  const queryParams = [
    { name: "page", value: 1 },
    { name: "limit", value: 9 },
    { name: "searchTerm", value: debouncedSearch },
  ].filter((item) => item.value !== undefined);

  const { data, refetch } = useGetAllPostsQuery(queryParams);

  const debouncedFetch = useCallback(
    debounce(() => {
      setDebouncedSearch(search); 
      refetch();
    }, 1000),
    [search, refetch]
  );

  useEffect(() => {
    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch, search]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(intervalId); 
  }, [refetch]);

  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
        <Input
          className="input input-bordered w-24 md:w-96 h-10 mx-auto"
          placeholder="Search posts"
          value={search}
          size="middle"
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
      </div>
      <div className="flex flex-col gap-10 max-w-4xl mx-auto">
        {data?.data?.filter(
            (item) =>
              item.userEmail!==user?.userEmail
          ).map((item) => (
          <PostCard key={item._id} item={item}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default Home;

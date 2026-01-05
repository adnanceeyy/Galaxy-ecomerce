import React from "react";

// Example user data - replace this with real data from API, context, or props
const mockUser = {
  name: "Fathima pathu",
  email: "pathufathima221@gmail.com",
  photoUrl:
    "https://imgs.search.brave.com/ppAKovkBSGPYcIAkbLfyiahNkoYx-nhQ4_-rBp2D-n8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQ3Lzg0/L2U5LzQ3ODRlOTdk/OTlkNjBmYmJjNDcy/Mzg2NGUzZjU3Mjgx/LmpwZw",
  isVerified: true,
};

// Example data for the grid cards (you can fetch these dynamically too)
const gridItems = [
  { id: 1, title: "Posts", value: 42 },
  { id: 2, title: "Followers", value: "1.2k" },
  { id: 3, title: "Following", value: 320 },
  { id: 4, title: "Likes", value: "5.8k" },
  { id: 5, title: "Comments", value: 890 },
  { id: 6, title: "Shares", value: 120 },
];

// Example content for the bottom section (e.g., recent posts, bio, etc.)
const bottomContent = {
  bio: "Passionate about coding, design, and building beautiful web experiences. ✨",
  recentPosts: ["Post 1", "Post 2", "Post 3"],
};

export default function Profile() {
  // In a real app, you'd get this from props, context, or useEffect + fetch
  const user = mockUser;

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] md:pb-[400px] fixed top-0"></div>

      <div className="w-[99.5%] place-self-center h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-lg shadow-black mb-60 md:mb-96">
        {/* Header Section */}
        <div className="w-full h-72 bg-gradient-to-r from-[#7db9d1] to-[#c5f0ff] rounded-[60px] flex items-center justify-between p-6">
          <div className="flex h-full w-auto">
            <div className="bg-green-400 h-56 w-56 rounded-full border-4 border-red-50 overflow-hidden">
              <img
                className="w-full h-full object-cover bg-center"
                src={user.photoUrl}
                alt={user.name}
              />
            </div>

            <div className="h-full w-auto p-7 pb-5 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-semibold">{user.name}</h1>
                <h4 className="text-lg">{user.email}</h4>
              </div>

              {user.isVerified && (
                <h3 className="text-xl p-4 py-3 font-medium rounded-4xl bg-[#ffffffda] w-fit">
                  Verified Account
                </h3>
              )}
            </div>
          </div>

          <div className="p-10 h-full items-center flex">
            <button className="bg-[#ffffff] px-6 py-3 rounded-2xl text-xl font-semibold border-4 border-[#5294ad] hover:bg-[#5294ad] hover:text-white transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Dynamic Grid Section (e.g., stats) */}
        <div className="w-full py-5">
          <div className="grid grid-cols-3 gap-5">
            {gridItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-400 p-6 rounded-2xl text-center shadow-md"
              >
                <h3 className="text-2xl font-bold">{item.value}</h3>
                <p className="text-gray-600">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Bottom Section (e.g., bio, posts, gallery) */}
        <div className="w-full bg-white rounded-3xl p-8 shadow-inner">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-lg text-gray-700 mb-6">{bottomContent.bio}</p>

          <h3 className="text-xl font-medium mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {bottomContent.recentPosts.map((post, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-xl">
                {post}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
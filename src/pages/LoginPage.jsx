import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IconCamera, IconBrandGoogle, IconBrandFacebook } from "@tabler/icons-react";
import { useAuth } from "../components/AuthWrapper";

export default function LoginPage() {
  const navigate = useNavigate();
  const { handleLogin, isLoggedIn, currentUser } = useAuth(); // Use AuthWrapper's handleLogin

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      navigate("/profile");
    }
  }, [isLoggedIn, currentUser, navigate]);

  // --- REUSED LOGIC FROM OLD MODAL ---
  const [users, setUsers] = useState([]);
  
  // IDs (Placeholders as in original code)
  const GOOGLE_CLIENT_ID = "482780462210-8lek18unaerjv42kuc0bgrmsqhsgam55.apps.googleusercontent.com";
  const FACEBOOK_APP_ID = "YOUR_FACEBOOK_APP_ID_HERE";

  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem("users") || "[]";
      setUsers(JSON.parse(savedUsers));
    } catch (e) {
      console.error("Failed to load users:", e);
      setUsers([]);
    }
  }, []);

  const getShortName = (fullName) => (fullName ? fullName.split(" ")[0] : "");
  
  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const findUserByEmail = (emailToFind) =>
    users.find((u) => u.email.toLowerCase() === emailToFind.toLowerCase());

  const validatePassword = (pass) => {
    return pass.length >= 6 && /[a-zA-Z]/.test(pass) && /[0-9]/.test(pass);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const performLogin = (userData) => {
    handleLogin(userData); // Updates context and localStorage
    navigate("/profile"); // Redirect to profile
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    if (isSignup) {
      if (!name) {
        setError("Name required");
        return;
      }
      if (!validatePassword(password)) {
        setError("Password must be 6+ chars with letter & number");
        return;
      }
      if (findUserByEmail(email)) {
        setError("Email already exists");
        return;
      }

      const newUser = {
        id: Date.now(),
        name: getShortName(name),
        fullName: name,
        email,
        password,
        provider: "email",
        profileImage: profileImage || null,
      };

      saveUsers([...users, newUser]);
      performLogin(newUser);
    } else {
      const user = findUserByEmail(email);
      if (!user || user.password !== password) {
        setError("Wrong email or password");
        return;
      }
      performLogin(user);
    }
  };

  // Google Mock/Real Init (Simplified for brevity, ensuring same logic)
  useEffect(() => {
    // Note: Google Button rendering logic omitted for cleaner UI control unless requested.
    // For now we will use custom buttons triggering the same flows.
  }, []);

  const handleMockGoogleLogin = () => {
     // Mocking the success response
     const payload = {
        name: "Google User",
        email: `google${Date.now()}@example.com`,
        picture: "https://via.placeholder.com/150?text=Google",
      };
      
      let userData = findUserByEmail(payload.email);
      if (!userData) {
        userData = {
          id: Date.now(),
          name: getShortName(payload.name),
          fullName: payload.name,
          email: payload.email,
          provider: "google",
          profileImage: payload.picture,
        };
        saveUsers([...users, userData]);
      }
      performLogin(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7db9d1] to-[#5294ad] flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side - Visual */}
        <div className="hidden md:flex w-1/2 bg-[#2b5f72] flex-col justify-center items-center p-12 text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="relative z-10 text-center">
             <h1 className="text-5xl font-extrabold mb-6">Welcome Back!</h1>
             <p className="text-xl opacity-90 mb-8">
               {isSignup 
                 ? "Join our community and start your journey with us today."
                 : "Access your dashboard, orders, and wishlist with a single click."}
             </p>
             <button 
               onClick={() => setIsSignup(!isSignup)}
               className="border-2 border-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-[#2b5f72] transition-colors"
             >
               {isSignup ? "Sign In Instead" : "Create Account"}
             </button>
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="md:hidden text-center mb-8">
             <h1 className="text-3xl font-bold text-[#2b5f72] mb-2">{isSignup ? "Create Account" : "Welcome Back"}</h1>
             <p className="text-gray-600">
               {isSignup ? "Already a member?" : "New here?"} 
               <button onClick={() => setIsSignup(!isSignup)} className="ml-1 text-[#2b5f72] font-bold underline">
                 {isSignup ? "Login" : "Sign Up"}
               </button>
             </p>
          </div>

          <h2 className="hidden md:block text-4xl font-bold text-gray-800 mb-2">
            {isSignup ? "Create Account" : "Sign In"}
          </h2>
          <p className="hidden md:block text-gray-500 mb-8">
            {isSignup ? "Fill in your details below" : "Enter your email and password"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
             {isSignup && (
                 <div className="flex flex-col items-center mb-4">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-400 overflow-hidden bg-gray-50 flex items-center justify-center relative hover:bg-gray-100 transition-colors cursor-pointer group">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <IconCamera size={32} className="text-gray-400 group-hover:text-gray-600" />
                      )}
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleImageUpload} />
                    </div>
                    <span className="text-xs text-center text-gray-500 mt-2">Upload Photo</span>
                 </div>
             )}

             {isSignup && (
               <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2b5f72]/50 transition-all font-medium"
                  />
               </div>
             )}
             
             <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2b5f72]/50 transition-all font-medium"
                />
             </div>

             <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2b5f72]/50 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500 hover:text-[#2b5f72]"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
             </div>

             {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm font-bold border border-red-100">
                  {error}
                </div>
             )}

             <button
                type="submit"
                className="w-full bg-[#2b5f72] hover:bg-[#224b5a] text-white py-4 rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl transition-all transform active:scale-[0.98]"
             >
                {isSignup ? "Sign Up" : "Login"}
             </button>
          </form>

          <div className="mt-8">
            <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500 font-medium">Or continue with</span>
                <div className="absolute inset-x-0 top-1/2 -z-10 border-t border-gray-200"></div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
               <button 
                 onClick={handleMockGoogleLogin}
                 className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
               >
                 <IconBrandGoogle className="text-red-500" />
                 <span className="font-semibold text-gray-700">Google</span>
               </button>
               <button 
                 onClick={() => setError("Facebook login not configured yet")}
                 className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
               >
                 <IconBrandFacebook className="text-blue-600" />
                 <span className="font-semibold text-gray-700">Facebook</span>
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

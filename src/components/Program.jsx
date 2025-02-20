// src/pages/Program.jsx
import { useState, useContext, useEffect } from "react"
import { User, Lock, Mail } from "lucide-react"
import { authService } from "../Api/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../context/AuthContext" // Pastikan file ini ada

// Reusable Input Component
const FormInput = ({ icon: Icon, type, placeholder, id, value, onChange }) => (
  <div className="mb-4 flex items-center">
    <Icon className="mr-2 text-purple-400" />
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="bg-zinc-200 text-white text-zinc-600 font-mono 
                 ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 
                 outline-none duration-300 rounded-full px-5 py-2
                 placeholder:text-zinc-600 placeholder:opacity-50 
                 shadow-md focus:shadow-lg focus:shadow-rose-400 
                 dark:shadow-purple-500"
      placeholder={placeholder}
      autoComplete="off"
    />
  </div>
)

// Reusable Button Component
const ActionButton = ({ onClick, color, type, children }) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-${color}-500 hover:bg-${color}-700 
                text-white font-bold py-2 px-4 rounded 
                focus:outline-none focus:shadow-outline 
                transition duration-300 ease-in-out`}
  >
    {children}
  </button>
)

// Link Button Component
const LinkButton = ({ onClick, children }) => (
  <button onClick={onClick} className="text-blue-500 hover:text-blue-700">
    {children}
  </button>
)

const Program = () => {
  const navigate = useNavigate()
  // Ambil fungsi setIsAuthenticated dan setUser dari AuthContext
  const { setIsAuthenticated, setUser } = useContext(AuthContext)

  const [view, setView] = useState("login") // 'login' | 'register' | 'forgot'
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [forgotEmail, setForgotEmail] = useState("") // State untuk forgot password

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleForgotChange = (e) => {
    setForgotEmail(e.target.value)
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    // Tampilkan toast loading dan simpan ID-nya
    const toastId = toast.loading("Processing login...")

    try {
      const data = await authService.login(formData)
      // Perbarui context autentikasi
      setIsAuthenticated(true)
      setUser(data.user)

      // Perbarui toast loading dengan notifikasi sukses
      toast.update(toastId, {
        render: "Login Successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
      console.log(data)
      // Pindah ke halaman dashboard setelah login berhasil
      navigate("/dashboard")
    } catch (error) {
      // Perbarui toast loading dengan notifikasi error
      toast.update(toastId, {
        render: `Login Failed: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      })
      console.error("Error:", error)
    }
  }

  const handleSubmitRegister = async (e) => {
    e.preventDefault()
    const toastId = toast.loading("Processing registration...")
    try {
      const response = await authService.register(formData)
      if (response.success) {
        toast.update(toastId, {
          render: "Registration successful! Please check your email for confirmation.",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        })
        console.log(response)
        setView("login")
      } else {
        throw new Error(response.message || "Registration failed")
      }
    } catch (error) {
      toast.update(toastId, {
        render: `Registration failed: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      })
      console.error("Error:", error)
    }
  }

  const handleEmailConfirmation = async (token) => {
    try {
      const response = await authService.confirmEmail(token)
      if (response.success) {
        toast.success("Email confirmed successfully! You can now log in.")
        setView("login")
      } else {
        throw new Error(response.message || "Email confirmation failed")
      }
    } catch (error) {
      toast.error(`Email confirmation failed: ${error.message}`)
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const confirmationToken = urlParams.get("confirm")
    if (confirmationToken) {
      handleEmailConfirmation(confirmationToken)
    }
  }, [handleEmailConfirmation]) // Added handleEmailConfirmation to dependencies

  const handleSubmitForgotPassword = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Processing send email...");
    try {
      // Kirim hanya email, bukan objek
      const data = await authService.forgotPassword(forgotEmail);
      toast.update(toastId, {
        render: "Link reset password telah dikirim ke email Anda",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setView("login");
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Gagal mengirim email reset password",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error("Error:", error);
    }
  };

  const renderLoginForm = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center gradient-text">Login</h2>
      <form onSubmit={handleSubmitLogin}>
        <FormInput
          icon={Mail}
          type="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          icon={Lock}
          type="password"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="flex items-center justify-between">
          <ActionButton color="blue" type="submit">
            Login
          </ActionButton>
        </div>
      </form>
      <div className="mt-4 text-center space-y-3">
        <LinkButton onClick={() => setView("register")}>Don't have an account? Register</LinkButton>
        <div>
          <LinkButton onClick={() => setView("forgot")}>Forgot Password?</LinkButton>
        </div>
      </div>
    </div>
  )

  const renderRegisterForm = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center gradient-text">Register</h2>
      <form onSubmit={handleSubmitRegister}>
        <FormInput
          icon={User}
          type="text"
          id="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
        />
        <FormInput
          icon={Mail}
          type="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          icon={Lock}
          type="password"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="flex items-center justify-between">
          <ActionButton color="green" type="submit">
            Register
          </ActionButton>
        </div>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 mb-2">You will receive a confirmation email after registration.</p>
        <LinkButton onClick={() => setView("login")}>Already have an account? Login</LinkButton>
      </div>
    </div>
  )

  const renderForgotPasswordForm = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center gradient-text">Forgot Password</h2>
      <form onSubmit={handleSubmitForgotPassword}>
        <FormInput
          icon={Mail}
          type="email"
          id="forgotEmail"
          placeholder="Enter your email to reset password"
          value={forgotEmail}
          onChange={handleForgotChange}
        />
        <div className="flex items-center justify-between">
          <ActionButton color="yellow" type="submit">
            Reset Password
          </ActionButton>
        </div>
      </form>
      <div className="mt-4 text-center">
        <LinkButton onClick={() => setView("login")}>Back to Login</LinkButton>
      </div>
    </div>
  )

  const descriptions = {
    login: {
      title: "Login Page",
      text: "Please login or register to access the content. If you don't have an account, you can easily create one.",
    },
    register: {
      title: "Register Page",
      text: "Don't have an account? Register now to gain access to exclusive features. It's quick and easy to get started!",
    },
    forgot: {
      title: "Forgot Password Page",
      text: "Forgot your password? No worries! Just enter your email, and we'll send you instructions to reset it.",
    },
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden">
        {/* Left Side (Form) */}
        <div
          className={`transition-transform duration-500 ease-in-out w-1/2 ${view !== "login" ? "transform translate-x-full" : ""}`}
        >
          {view === "login" && renderLoginForm()}
          {view === "register" && renderRegisterForm()}
          {view === "forgot" && renderForgotPasswordForm()}
        </div>

        {/* Right Side (Description) */}
        <div
          className={`w-1/2 flex flex-col justify-center items-center 
                     text-center bg-100 p-8 transition-transform 
                     duration-500 ease-in-out ${view !== "login" ? "transform -translate-x-full" : ""}`}
        >
          <h3 className="text-xl font-bold mb-4 gradient-text">{descriptions[view].title}</h3>
          <p className="text-700">{descriptions[view].text}</p>
        </div>
      </div>
    </div>
  )
}

export default Program


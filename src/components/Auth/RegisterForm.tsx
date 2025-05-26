"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  Avatar,
  Container,
  LinearProgress,
  Fade,
  Link as MuiLink,
} from "@mui/material"
import {
  Visibility,
  VisibilityOff,
  Security,
  Email,
  Lock,
  Person,
  CheckCircle,
  Warning,
  Error,
  Info,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import PasswordStrengthIndicator from "./PasswordStrengthIndicator"
import { Link } from "react-router"
import VerificationDialog from "./VerificationDialog"
import userStore from "../User pages/userStore"

const StyledCard = styled(Card)(() => ({
  background: "rgba(30, 41, 59, 0.8)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(71, 85, 105, 0.3)",
  borderRadius: "16px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
}))

const GradientBackground = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
})

const SecurityAvatar = styled(Avatar)(() => ({
  width: 64,
  height: 64,
  backgroundColor: "#2563eb",
  margin: "0 auto 24px",
}))

interface RegisterFormProps {
  onRegister: (userData: {
    name: string
    email: string
    password: string
  }) => Promise<void>
  isLoading?: boolean
}

interface AlertInfo {
  type: "success" | "error" | "warning" | "info"
  message: string
}

export default function RegisterForm({ onRegister, isLoading = false }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null)
  const [isVerificationOpen, setIsVerificationOpen] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: "weak", score: 25, color: "#ef4444" }
    if (password.length < 10) return { strength: "moderate", score: 60, color: "#eab308" }
    return { strength: "strong", score: 100, color: "#22c55e" }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const sendVerificationCode = async (email: string, name: string): Promise<string> => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    const subject = `Verify your email for KLIX-Link ${code}`;
    const body = `Hello, ${name}. Your verification code for KLIX-Link is ${code}.\n Please use it to complete your registration process.`;
    await userStore.sendEmail(email, subject, body);
    return Promise.resolve(code);
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password) {
      setAlertInfo({ type: "warning", message: "Please fill in all fields." })
      return
    }

    if (!validateEmail(formData.email)) {
      setAlertInfo({ type: "warning", message: "Please enter a valid email address." })
      return
    }

    if (passwordStrength.strength === "weak") {
      setAlertInfo({ type: "warning", message: "Password is too weak. Please choose a stronger password." })
      return
    }

    try {
      const code = await sendVerificationCode(formData.email, formData.name)
      setVerificationCode(code)
      setIsVerificationOpen(true)
      setAlertInfo(null)
    } catch (error) {
      setAlertInfo({ type: "error", message: "Failed to send verification code. Please try again." })
    }
  }

  const handleVerificationSuccess = async () => {
    try {
      await onRegister(formData)
      setAlertInfo({ type: "success", message: "Successfully registered!" })
      setIsVerificationOpen(false)
    } catch (error) {
      setAlertInfo({ type: "error", message: "Registration failed. Please try again." })
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle />
      case "error":
        return <Error />
      case "warning":
        return <Warning />
      default:
        return <Info />
    }
  }

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(51, 65, 85, 1)",
      color: "white",
      "& fieldset": {
        borderColor: "rgba(71, 85, 105, 1)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(148, 163, 184, 1)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2563eb",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(148, 163, 184, 1)",
      "&.Mui-focused": {
        color: "#2563eb",
      },
    },
  }

  return (
    <GradientBackground>
      <Container maxWidth="sm">
        <StyledCard>
          <CardContent sx={{ p: 4 }}>
            <Box textAlign="center" mb={4}>
              <SecurityAvatar>
                <Security sx={{ fontSize: 32, color: "white" }} />
              </SecurityAvatar>
              <Typography variant="h4" component="h1" gutterBottom sx={{ color: "white", fontWeight: "bold" }}>
                Create Account
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(148, 163, 184, 1)" }}>
                Join our secure cloud platform
              </Typography>
            </Box>

            {alertInfo && (
              <Fade in={true}>
                <Alert
                  severity={alertInfo.type}
                  icon={getAlertIcon(alertInfo.type)}
                  onClose={() => setAlertInfo(null)}
                  sx={{
                    mb: 3,
                    "& .MuiAlert-message": {
                      color:
                        alertInfo.type === "success" ? "#065f46" : alertInfo.type === "error" ? "#991b1b" : "#92400e",
                    },
                  }}
                >
                  {alertInfo.message}
                </Alert>
              </Fade>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "rgba(148, 163, 184, 1)" }} />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "rgba(148, 163, 184, 1)" }} />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "rgba(148, 163, 184, 1)" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "rgba(148, 163, 184, 1)" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />

              {formData.password && (
                <Box mt={2}>
                  <PasswordStrengthIndicator password={formData.password} />
                </Box>
              )}

              {isLoading && (
                <LinearProgress
                  sx={{
                    mt: 2,
                    backgroundColor: "rgba(71, 85, 105, 1)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#2563eb",
                    },
                  }}
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  backgroundColor: "#2563eb",
                  "&:hover": {
                    backgroundColor: "#1d4ed8",
                  },
                  "&:disabled": {
                    backgroundColor: "rgba(71, 85, 105, 1)",
                  },
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {isLoading ? "Creating Account..." : "Create Secure Account"}
              </Button>

              <Box textAlign="center">
                <MuiLink
                  component={Link}
                  to="/login"
                  sx={{
                    color: "#60a5fa",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#93c5fd",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Already have an account? Sign in
                </MuiLink>
              </Box>
            </Box>
          </CardContent>
        </StyledCard>

        <VerificationDialog
          isOpen={isVerificationOpen}
          onClose={() => setIsVerificationOpen(false)}
          onVerify={handleVerificationSuccess}
          email={formData.email}
          expectedCode={verificationCode}
        />
      </Container>
    </GradientBackground>
  )
}

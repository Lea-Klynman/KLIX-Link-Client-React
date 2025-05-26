

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
import { Visibility, VisibilityOff, Security, Email, Lock, CheckCircle, Warning, Error } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { Link } from "react-router"

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

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>
  isLoading?: boolean
}

interface AlertInfo {
  type: "success" | "error" | "warning" | "info"
  message: string
}

export default function LoginForm({ onLogin, isLoading = false }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePasswordStrength = (password: string) => {
    if (password.length < 6) return "weak"
    if (password.length < 10) return "moderate"
    return "strong"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setAlertInfo({ type: "warning", message: "Please fill in all fields." })
      return
    }

    if (!validateEmail(email)) {
      setAlertInfo({ type: "warning", message: "Please enter a valid email address." })
      return
    }

    const passwordStrength = validatePasswordStrength(password)
    if (passwordStrength === "weak") {
      setAlertInfo({ type: "warning", message: "Password is too weak. Please choose a stronger password." })
      return
    }

    try {
      await onLogin(email, password)
      setAlertInfo({ type: "success", message: "Successfully logged in!" })
    } catch (error) {
      setAlertInfo({ type: "error", message: "Failed to login. Please check your credentials and try again." })
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
        return <Warning />
    }
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
                Secure Login
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(148, 163, 184, 1)" }}>
                Access your secure cloud storage
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
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "rgba(148, 163, 184, 1)" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
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
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                sx={{
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
                }}
              />

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
                {isLoading ? "Signing In..." : "Sign In Securely"}
              </Button>

              <Box textAlign="center">
                <MuiLink
                  component={Link}
                  to="/register"
                  sx={{
                    color: "#60a5fa",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#93c5fd",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {"Don't have an account? Create one"}
                </MuiLink>
              </Box>
            </Box>
          </CardContent>
        </StyledCard>
      </Container>
    </GradientBackground>
  )
}

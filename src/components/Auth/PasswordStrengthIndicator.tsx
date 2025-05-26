"use client"
import { Box, Typography, LinearProgress, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { Check, Close } from "@mui/icons-material"
import { styled } from "@mui/material/styles"

const StrengthContainer = styled(Box)(() => ({
  padding: "16px",
  backgroundColor: "rgba(51, 65, 85, 0.5)",
  borderRadius: "8px",
  border: "1px solid rgba(71, 85, 105, 1)",
}))

interface PasswordStrengthIndicatorProps {
  password: string
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const requirements = [
    { label: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
    { label: "Contains uppercase letter", test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: "Contains lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: "Contains number", test: (pwd: string) => /\d/.test(pwd) },
    { label: "Contains special character", test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ]

  const metRequirements = requirements.filter((req) => req.test(password))
  const strength = metRequirements.length
  const strengthPercentage = (strength / requirements.length) * 100

  const getStrengthInfo = () => {
    if (strength <= 2) return { label: "Weak", color: "#ef4444" }
    if (strength <= 3) return { label: "Fair", color: "#eab308" }
    if (strength <= 4) return { label: "Good", color: "#3b82f6" }
    return { label: "Strong", color: "#22c55e" }
  }

  const strengthInfo = getStrengthInfo()

  if (!password) return null

  return (
    <StrengthContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="body2" sx={{ color: "rgba(148, 163, 184, 1)" }}>
          Password Strength
        </Typography>
        <Typography variant="body2" sx={{ color: strengthInfo.color, fontWeight: "medium" }}>
          {strengthInfo.label}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={strengthPercentage}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: "rgba(71, 85, 105, 1)",
          mb: 2,
          "& .MuiLinearProgress-bar": {
            backgroundColor: strengthInfo.color,
            borderRadius: 4,
          },
        }}
      />

      <List dense sx={{ p: 0 }}>
        {requirements.map((req, index) => {
          const isMet = req.test(password)
          return (
            <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                {isMet ? (
                  <Check sx={{ fontSize: 16, color: "#22c55e" }} />
                ) : (
                  <Close sx={{ fontSize: 16, color: "rgba(71, 85, 105, 1)" }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={req.label}
                primaryTypographyProps={{
                  variant: "caption",
                  sx: {
                    color: isMet ? "#22c55e" : "rgba(71, 85, 105, 1)",
                  },
                }}
              />
            </ListItem>
          )
        })}
      </List>
    </StrengthContainer>
  )
}

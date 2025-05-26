

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Avatar,
  Fade,
} from "@mui/material"
import { Email, Warning, Info } from "@mui/icons-material"
import { styled } from "@mui/material/styles"

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    background: "rgba(30, 41, 59, 0.95)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(71, 85, 105, 0.3)",
    borderRadius: "16px",
    color: "white",
  },
}))

const SecurityAvatar = styled(Avatar)(() => ({
  width: 64,
  height: 64,
  backgroundColor: "#2563eb",
  margin: "0 auto 16px",
}))

interface VerificationDialogProps {
  isOpen: boolean
  onClose: () => void
  onVerify: () => void
  email: string
  expectedCode: string
}

export default function VerificationDialog({
  isOpen,
  onClose,
  onVerify,
  email,
  expectedCode,
}: VerificationDialogProps) {
  const [inputCode, setInputCode] = useState("")
  const [error, setError] = useState("")

  const handleVerify = () => {
    if (inputCode === expectedCode) {
      onVerify()
      setInputCode("")
      setError("")
    } else {
      setError("Verification code is incorrect. Please try again.")
      setInputCode("")
    }
  }

  const handleClose = () => {
    setInputCode("")
    setError("")
    onClose()
  }

  return (
    <StyledDialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: 4, textAlign: "center" }}>
        <SecurityAvatar>
          <Email sx={{ fontSize: 32, color: "white" }} />
        </SecurityAvatar>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: "white", fontWeight: "bold" }}>
          Verify Your Email
        </Typography>

        <Typography variant="body1" sx={{ color: "rgba(148, 163, 184, 1)", mb: 3 }}>
          We've sent a verification code to{" "}
          <Box component="span" sx={{ color: "#60a5fa", fontWeight: "medium" }}>
            {email}
          </Box>
        </Typography>

        {error && (
          <Fade in={true}>
            <Alert
              severity="error"
              icon={<Warning />}
              sx={{
                mb: 2,
                "& .MuiAlert-message": {
                  color: "#991b1b",
                },
              }}
            >
              {error}
            </Alert>
          </Fade>
        )}

        <Alert
          severity="info"
          icon={<Info />}
          sx={{
            mb: 3,
            "& .MuiAlert-message": {
              color: "#1e40af",
            },
          }}
        >
          The verification code email might land in your spam folder. Please check your spam/junk folder if you don't
          see it within a few minutes.
        </Alert>

        <TextField
          fullWidth
          label="Verification Code"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Enter 6-digit code"
          inputProps={{
            maxLength: 6,
            style: {
              textAlign: "center",
              fontSize: "1.2rem",
              letterSpacing: "0.2em",
            },
          }}
          autoFocus
          sx={{
            mb: 3,
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
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            flex: 1,
            borderColor: "rgba(71, 85, 105, 1)",
            color: "rgba(148, 163, 184, 1)",
            "&:hover": {
              borderColor: "rgba(148, 163, 184, 1)",
              backgroundColor: "rgba(51, 65, 85, 0.5)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleVerify}
          variant="contained"
          disabled={inputCode.length !== 6}
          sx={{
            flex: 1,
            backgroundColor: "#2563eb",
            "&:hover": {
              backgroundColor: "#1d4ed8",
            },
            "&:disabled": {
              backgroundColor: "rgba(71, 85, 105, 1)",
            },
          }}
        >
          Verify
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}

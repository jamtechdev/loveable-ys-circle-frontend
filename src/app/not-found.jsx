"use client";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { keyframes } from "@mui/system";

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const slideIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      className=" min-h-screen  flex  items-center  justify-center  relative  overflow-hidden"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Animated Background Circles */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          animation: `${float} 6s ease-in-out infinite`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.08)",
          animation: `${float} 8s ease-in-out infinite`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "20%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          animation: `${float} 7s ease-in-out infinite`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={24}
          className=" p-12  text-center  rounded-3xl  backdrop-blur-lg"
          sx={{
            background: "rgba(255, 255, 255, 0.95)",
            animation: `${slideIn} 0.8s ease-out`,
          }}
        >
          {/* Animated 404 Text */}
          <Box sx={{ position: "relative", display: "inline-block", mb: 4 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "5rem", sm: "8rem", md: "12rem" },
                fontWeight: 900,
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                animation: `${pulse} 3s ease-in-out infinite`,
                letterSpacing: "-0.05em",
              }}
            >
              404
            </Typography>

            {/* Rotating Circle Behind 404 */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "200px", sm: "300px", md: "400px" },
                height: { xs: "200px", sm: "300px", md: "400px" },
                border: "3px dashed rgba(102, 126, 234, 0.3)",
                borderRadius: "50%",
                animation: `${rotate} 20s linear infinite`,
                zIndex: -1,
              }}
            />
          </Box>

          {/* Emoji Animation */}
          <Box
            sx={{
              fontSize: { xs: "4rem", sm: "5rem", md: "6rem" },
              mb: 3,
              animation: `${float} 3s ease-in-out infinite`,
            }}
          >
            🚀
          </Box>

          {/* Title */}
          <Typography
            variant="h3"
            className=" mb-4  font-bold"
            sx={{
              color: "#667eea",
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
              animation: `${slideIn} 1s ease-out 0.2s both`,
            }}
          >
            Houston, We Have a Problem!
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            className=" mb-8  text-gray-700  max-w-lg  mx-auto"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem" },
              lineHeight: 1.8,
              animation: `${slideIn} 1s ease-out 0.4s both`,
            }}
          >
            The page you're looking for has drifted off into the cosmos. It
            might have been abducted by aliens or lost in a black hole. Let's
            navigate you back to safety! 🛸
          </Typography>

          {/* Buttons */}
          <Box
            className=" flex  gap-4  justify-center  flex-wrap"
            sx={{
              animation: `${slideIn} 1s ease-out 0.6s both`,
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => router.push("/")}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 30px rgba(102, 126, 234, 0.6)",
                  background:
                    "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                },
              }}
            >
              Take Me Home
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBackIcon />}
              onClick={() => router.back()}
              sx={{
                borderColor: "#667eea",
                color: "#667eea",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 600,
                borderWidth: "2px",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderWidth: "2px",
                  borderColor: "#764ba2",
                  color: "#764ba2",
                  transform: "translateY(-3px)",
                  backgroundColor: "rgba(102, 126, 234, 0.05)",
                },
              }}
            >
              Go Back
            </Button>
          </Box>

          {/* Error Code */}
          <Box
            className=" mt-10  pt-8  border-t  border-gray-200"
            sx={{
              animation: `${slideIn} 1s ease-out 0.8s both`,
            }}
          >
            <Typography
              variant="caption"
              className=" text-gray-500"
              sx={{ fontSize: "0.9rem" }}
            >
              Error Code: <strong>404</strong> | Page Not Found
            </Typography>

            {/* Fun Stats */}
            <Box className=" flex  gap-6  justify-center  mt-4  flex-wrap">
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "#667eea", fontWeight: 700 }}
                >
                  ∞
                </Typography>
                <Typography variant="caption" className=" text-gray-600">
                  Lost Pages
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "#667eea", fontWeight: 700 }}
                >
                  🌟
                </Typography>
                <Typography variant="caption" className=" text-gray-600">
                  In Space
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "#667eea", fontWeight: 700 }}
                >
                  100%
                </Typography>
                <Typography variant="caption" className=" text-gray-600">
                  Confused
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

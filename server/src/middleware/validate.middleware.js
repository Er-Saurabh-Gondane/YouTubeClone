export const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || username.trim().length < 3) {
    return res.status(400).json({ message: "Username must be at least 3 characters" });
  }

  const emailOk = typeof email === "string" && email.includes("@");
  if (!emailOk) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Valid email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  next();
};


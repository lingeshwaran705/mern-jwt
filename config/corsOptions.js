const whitelist = [
  "http://localhost:5000",
  "https://www.yoursite.com",
  "http://127.0.0.1:5000",
];

const options = {
  origin: (origin, callback) => {
    if (
      whitelist.includes(origin) ||
      (process.env.NODE_ENV === "production" ? null : !origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
};

module.exports.corsOptions = options;

import sanitizeHtml from "sanitize-html";

const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== "object") return;

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (typeof value === "string") {
      obj[key] = sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
      }).trim();
    } else if (Array.isArray(value)) {
      obj[key] = value.map((item) => {
        if (typeof item === "string") {
          return sanitizeHtml(item, {
            allowedTags: [],
            allowedAttributes: {},
          }).trim();
        }

        if (item && typeof item === "object") {
          sanitizeObject(item);
        }

        return item;
      });
    } else if (value && typeof value === "object") {
      sanitizeObject(value);
    }
  });
};

const sanitizeInput = (req, res, next) => {
  if (req.body) {
    sanitizeObject(req.body);
  }

  next();
};

export default sanitizeInput;
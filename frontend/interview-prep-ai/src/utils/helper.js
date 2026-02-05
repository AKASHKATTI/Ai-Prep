export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};


export const getInitials = (title) => {
  if (!title) return "";
  const words = String(title.role).trim().split(/\s+/); // handles multiple spaces
  const initials = words.map(word => word[0]?.toUpperCase()).join("");
  return initials;
};
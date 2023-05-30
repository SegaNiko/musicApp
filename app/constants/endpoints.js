const API_URL = "http://localhost:8000";

const endpoints = {
  signIn: `${API_URL}/sign-in`,
  signUp: `${API_URL}/sign-up`,
  // logOut: `${API_URL}/sign-up`,
  musicians: `${API_URL}/musicians`,
  bands: `${API_URL}/bands`,
  test: `${API_URL}/`,
};

export default endpoints;

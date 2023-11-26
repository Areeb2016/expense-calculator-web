/* eslint-disable react-hooks/rules-of-hooks */

const BASE_URL =
  "https://expense-calculator-backend-git-main-areeb2016.vercel.app/api/";

const getHeaders = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    return {
      Authorization: `Bearer ${userData?.token}`,
      "Content-Type": "application/json",
    };
  }
  return {};
};

const useHeaders = () => {
  return {
    headers: getHeaders(),
  };
};

// Expense functions
const api = {
  login: async (data) => {
    try {
      const response = await fetch(`${BASE_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        return { message: `Login Error: ${error.message}`, success: false };
      }
      const responseData = await response.json();
      return { data: responseData, success: true };
    } catch (error) {
      console.error(error.message);
      return error;
    }
  },

  register: async (data) => {
    try {
      const response = await fetch(`${BASE_URL}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          message: `Registeration Error: ${error.error}`,
          success: false,
        };
      }
      const responseData = await response.json();

      return { data: responseData, success: true };
    } catch (error) {
      console.error(error.message);
      return { message: `Server Error: ${error.message}`, success: false };
    }
  },

  forgotPassword: async (email) => {
    console.log("email", email);
    try {
      const response = await fetch(`${BASE_URL}auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      console.log("2");
      if (!response.ok) {
        const error = await response.json();
        console.log("3");
        return { message: `Error: ${error.message}`, success: false };
      }
      console.log("4");
      return await response.json();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await fetch(`${BASE_URL}expenses`, {
        method: "POST",
        headers: {
          ...useHeaders().headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Create Error: ${error.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  read: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}expenses/${id}`, {
        method: "GET",
        headers: {
          ...useHeaders().headers,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Read Error: ${error.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await fetch(`${BASE_URL}expenses/${id}`, {
        method: "PUT",
        headers: {
          ...useHeaders().headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Update Error: ${error.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  delete: async (id, body) => {
    try {
      const response = await fetch(`${BASE_URL}expenses/${id}`, {
        method: "DELETE",
        headers: {
          ...useHeaders().headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Delete Error: ${error.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
};

export default api;

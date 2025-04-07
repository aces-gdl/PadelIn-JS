/* eslint-disable  react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from 'react-alert'

export const ResponseInterceptor = () => {
  const navigate = useNavigate();
  const interceptorId = useRef(null);
  const alert = useAlert();
  useEffect(() => {
    interceptorId.current = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log("Interceptor caught an error:", error);

        if (error.response) {
          console.log("Error status:", error.response.status);
          console.log("Error data:", error.response.data);

          switch (error.response.status) {
            case 401:
              console.log("Unauthorized access detected. Redirecting to login...");
              alert.info("Sesión expirada. Por favor inicia sesión nuevamente.");
              //localStorage.removeItem("user");
              navigate("/pages/login/login3");
              return Promise.reject(error);
            default:
              return Promise.reject(error);
          }
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Error setting up request:", error.message);
        }

        return Promise.reject(error);
      }
    );

    // Cleanup function
    return () => {
      axios.interceptors.response.eject(interceptorId.current);
    };
  }, [navigate]);

  return null;
};

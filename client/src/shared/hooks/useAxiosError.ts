import { isAxiosError } from "axios";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { Toast } from "../../features/landing/components/alerts";
export default function useAxiosError() {


    const navigate = useNavigate();

    const handleError = useCallback((error: unknown) => {

        if (!isAxiosError(error)) {
            return Toast.fire({
                icon: "error",
                title: error instanceof Error ? error.message : "Error desconocido del servidor",
            });
        }

        if (error.code === "ERR_NETWORK") {
            return Toast.fire({
                icon: "question",
                title: "Error de conexión, intente nuevamente.",
            });
        }

        if (error.status === 401) {
            if (error.response?.data?.redirect) navigate({ to: error.response.data.redirect });

            return Toast.fire({
                icon: "error",
                title: error.response?.data?.message || "No autorizado.",
            });
        }



        return Toast.fire({
            icon: "error",
            title: error.response?.data?.message || error.message || "Error desconocido del servidor.",
        });
    }, [navigate]);

    return { handleError };
}
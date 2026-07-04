import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Input from "../../shared/components/Input";
import AuthLayout from "./layout/authLayot";
import { useForm } from "@tanstack/react-form";
import Button from "../../shared/components/Button";
import useAxiosError from "../../shared/hooks/useAxiosError";
import { login } from "./services/auth";
import { useNavigate } from "@tanstack/react-router";
import { useUser } from "../../shared/hooks/useUserContext";
import { useEffect } from "react";
import { emailRegex } from "../../utils/regex";
import { Toast } from "../landing/components/alerts";

export default function Login() {
    const { handleError } = useAxiosError();
    const navigate = useNavigate();
    const { setUser, user } = useUser();

    const loginForm = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            try {
                const res = await login(value);

                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token);
                    setUser(res.data.user);

                    Toast.fire({
                        icon: "success",
                        title: res.data.message,
                    });

                    if (res.data.user.role === "administrador") {
                        navigate({ to: "/dashboard" });
                    } else {
                        navigate({ to: "/" });
                    }
                }
            } catch (error) {
                handleError(error);
            }
        },
    });

    useEffect(() => {
        if (user) {
            if (user.role === "administrador") {
                navigate({ to: "/dashboard" });
            } else {
                navigate({ to: "/" });
            }
        }
    }, [user, navigate]);

    return (
        <AuthLayout loginOrRegister="login">
            <form onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                loginForm.handleSubmit();
            }}
                className="space-y-6">
                {/* Email Field */}

                <loginForm.Field
                    name="email"
                    children={(field) => (
                        <Input
                            label="Correo Electrónico"
                            id="email"
                            value={field.state.value}
                            type="email"
                            icon={faEnvelope}
                            placeholder="nombre@ejemplo.com"
                            onChange={(e) => field.handleChange(e.target.value)}
                            error={field.state.meta.errors[0]}
                        />
                    )}
                    validators={{
                        onChange: ({ value }) =>
                            !value ? "El correo es requerido"
                                : !emailRegex.test(value) ? "El correo no es valido"
                                    : undefined
                    }}
                />

                <loginForm.Field
                    name="password"
                    children={(field) => (
                        <Input
                            label="Contraseña"
                            id="password"
                            value={field.state.value}
                            icon={faLock}
                            placeholder="••••••••"
                            password
                            onChange={(e) => field.handleChange(e.target.value)}
                            error={field.state.meta.errors[0]}
                        />
                    )}
                    validators={{
                        onChange: ({ value }) =>
                            !value ? "La contraseña es requerida"
                                : value.length < 6 ? "La contraseña debe tener al menos 6 caracteres"
                                    : undefined,
                    }}
                />

                <loginForm.Subscribe
                    children={({ isValid, isSubmitting }) => (
                        <Button onClick={() => loginForm.handleSubmit()} disabled={!isValid || isSubmitting}>
                            {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
                        </Button>
                    )}
                />

                {/* Submit Button */}
            </form>

        </AuthLayout>
    );
}
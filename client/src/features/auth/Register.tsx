import { faEnvelope, faHome, faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import Input from "../../shared/components/Input";
import AuthLayout from "./layout/authLayot";
import { useForm } from "@tanstack/react-form";
import { emailRegex } from "../../utils/regex";
import Button from "../../shared/components/Button";
import useAxiosError from "../../shared/hooks/useAxiosError";
import { useNavigate } from "@tanstack/react-router";
import { register } from "./services/auth";
import { Toast } from "../landing/components/alerts";


export default function Register() {


    const { handleError } = useAxiosError();
    const navigate = useNavigate();

    const registerForm = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: async ({ value }) => {
            try {
                const res = await register(value);
                if (res.status === 201) {
                    Toast.fire({
                        icon: "success",
                        title: res.data.message,
                    });

                    navigate({ to: "/login" });
                }
            } catch (error) {
                handleError(error);
            }
        },
    });

    return (
        <AuthLayout loginOrRegister="register">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    registerForm.handleSubmit();
                }}
                className="space-y-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <registerForm.Field
                        name="name"
                        children={(field) => (
                            <Input
                                label="Nombre Completo"
                                id="fullName"
                                type="text"
                                icon={faUser}
                                placeholder="Juan Pérez"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                error={field.state.meta.errors[0]}
                            />
                        )}
                        validators={{
                            onChange: ({ value }) =>
                                !value ? "El nombre es requerido"
                                    : value.length < 3 ? "El nombre debe tener al menos 3 caracteres"
                                        : undefined,
                        }}
                    />

                    <registerForm.Field
                        name="email"
                        children={(field) => (
                            <Input
                                label="Correo Electrónico"
                                id="email"
                                type="email"
                                icon={faEnvelope}
                                placeholder="nombre@ejemplo.com"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                error={field.state.meta.errors[0]}
                            />
                        )}
                        validators={{
                            onChange: ({ value }) =>
                                !value ? "El correo es requerido"
                                    : !emailRegex.test(value) ? "El correo no es valido"
                                        : undefined,
                        }}
                    />

                    <registerForm.Field
                        name="phone"
                        children={(field) => (
                            <Input
                                label="Número de teléfono"
                                id="phone"
                                type="text"
                                icon={faPhone}
                                placeholder="+57 300 000 0000"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                error={field.state.meta.errors[0]}
                            />
                        )}
                        validators={{
                            onChange: ({ value }) =>
                                !value ? "El número de teléfono es requerido"
                                    : value.length < 10 ? "El número de teléfono debe tener al menos 10 caracteres"
                                        : undefined,
                        }}
                    />

                    <registerForm.Field
                        name="address"
                        children={(field) => (
                            <Input
                                label="Dirección"
                                id="address"
                                type="text"
                                icon={faHome}
                                placeholder="Calle 123 #45-67"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                error={field.state.meta.errors[0]}
                            />
                        )}
                        validators={{
                            onChange: ({ value }) =>
                                !value ? "La dirección es requerida"
                                    : value.length < 10 ? "La dirección debe tener al menos 10 caracteres"
                                        : undefined,
                        }}
                    />

                    <registerForm.Field
                        name="password"
                        children={(field) => (
                            <Input
                                label="Contraseña"
                                id="password"
                                type="password"
                                icon={faLock}
                                placeholder="••••••••"
                                value={field.state.value}
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

                    <registerForm.Field
                        name="confirmPassword"
                        children={(field) => (
                            <Input
                                label="Confirmar Contraseña"
                                id="confirmPassword"
                                type="password"
                                icon={faLock}
                                placeholder="••••••••"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                error={field.state.meta.errors[0]}
                            />
                        )}
                        validators={{
                            onChange: ({ value }) =>
                                !value ? "La confirmación de la contraseña es requerida"
                                    : value !== registerForm.state.values.password ? "Las contraseñas no coinciden"
                                        : undefined,
                        }}
                    />


                </div>
                <registerForm.Subscribe
                    children={({ isValid, isSubmitting }) => (
                        <Button onClick={() => registerForm.handleSubmit()} disabled={!isValid || isSubmitting}>
                            {isSubmitting ? "Registrándose..." : "Registrarse"}
                        </Button>
                    )}
                />
            </form>
        </AuthLayout>
    );
}
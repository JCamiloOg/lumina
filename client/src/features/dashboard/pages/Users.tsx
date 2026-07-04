import { useEffect, useState } from "react";
import Table from "../components/Table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../../../@types/user";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { getUsers, registerUser } from "../services/users";
import useDelayValue from "../../../shared/hooks/useDelayValue";
import Button from "../../../shared/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faLock, faPhone, faPlus, faSave, faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import useAxiosError from "../../../shared/hooks/useAxiosError";
import { Toast } from "../../landing/components/alerts";
import { useForm } from "@tanstack/react-form";
import Modal from "../components/Modal";
import Input from "../../../shared/components/Input";
import { emailRegex } from "../../../utils/regex";


export default function UsersManagerPage() {

    const [isOpenModal, setIsOpenModal] = useState(false);


    const { page, limit, search } = useSearch({
        from: "/dashboard/users",
    });

    const { handleError } = useAxiosError();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const searchDelay = useDelayValue(search, 500);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users", page, limit, searchDelay],
        queryFn: async () => {
            const res = await getUsers(page, limit, search);
            return res.data;
        }
    });


    const users: User[] = data?.users || [];
    const { page: currentPage, limit: currentLimit, totalPages } = data?.pagination || {};

    const mutationCreateProduct = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users", page, limit, search]
            });
            userForm.reset();
            setIsOpenModal(false);
            Toast.fire({
                title: data.message, icon: "success"
            });

        },
        onError: (error) => {
            handleError(error);
        }
    });

    const userForm = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            role: "administrador"
        },
        onSubmit: async ({ value }) => {
            console.log(value);
            await mutationCreateProduct.mutateAsync(value);
        }
    });



    const handleSearch = (search: string) => {
        navigate({
            to: "/dashboard/users",
            search: {
                page: currentPage,
                limit: currentLimit,
                search
            }
        });
    };

    const handleLimitChange = (limit: number) => {
        navigate({
            to: "/dashboard/users",
            search: {
                page: currentPage,
                limit,
                search
            }
        });
    };

    const handlePageChange = (page: number) => {
        navigate({
            to: "/dashboard/users",
            search: {
                page,
                limit: currentLimit,
                search
            }
        });
    };

    useEffect(() => {
        if (isError) handleError(error);

    }, [isError, error, handleError]);




    return (
        <>
            <Table
                columns={["#", "Nombre", "Email", "Teléfono", "Dirección", "Rol", "Día de registro"]}
                title="Gestión de usuarios"
                searchValue={search ?? ""}
                onSearchChange={handleSearch}
                onLimitChange={handleLimitChange}
                subtitle="Lista de todos los usuarios registrados"
                icon="fa-solid fa-users"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                actions={
                    <Button
                        onClick={() => setIsOpenModal(true)}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="mr-2"
                        />
                        Crear Usuario
                    </Button>
                }
            >

                {
                    isLoading && (
                        <Table.Cell >

                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-slate-600 rounded-full animate-spin"></div>
                                <span>Cargando...</span>
                            </div>
                        </Table.Cell>
                    )
                }
                {
                    !isLoading && users.length === 0 && (
                        <Table.Cell >
                            <div className="flex items-center gap-2">
                                <span>No hay usuarios registrados</span>
                            </div>
                        </Table.Cell>
                    )
                }
                {
                    users.map((user, idx) => (
                        <Table.Row key={idx}>
                            <Table.Cell>{idx + 1}</Table.Cell>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.phone}</Table.Cell>
                            <Table.Cell>{user.address}</Table.Cell>
                            <Table.Cell variant={user.role === "administrador" ? "badge-success" : "badge-neutral"}>{user.role.toUpperCase()}</Table.Cell>
                            <Table.Cell>{Intl.DateTimeFormat("es-PE", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }).format(new Date(user.createdAt))}</Table.Cell>
                        </Table.Row>
                    ))
                }

            </Table>

            <Modal
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                size="xl"
                title="Crear usuario"
                subtitle="Completa el formulario para crear un nuevo usuario"
            >
                <form onSubmit={(e) => {
                    e.preventDefault();
                    userForm.handleSubmit();
                }}>
                    <div className="grid grid-cols-2 gap-4">
                        <userForm.Field
                            name="name"
                            children={(field) => (
                                <Input
                                    icon={faUser}
                                    label="Nombre completo"
                                    type="text"
                                    placeholder="Nombre"
                                    id="name"
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
                        <userForm.Field
                            name="email"
                            children={(field) => (
                                <Input
                                    id="email"
                                    icon={faEnvelope}
                                    label="Correo electrónico"
                                    type="email"
                                    placeholder="Email"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    error={field.state.meta.errors[0]}
                                />
                            )}
                            validators={{
                                onChange: ({ value }) =>
                                    !value ? "El correo electrónico es requerido"
                                        : !emailRegex.test(value) ? "El correo electrónico no es válido"
                                            : undefined,
                            }}
                        />
                        <userForm.Field
                            name="password"
                            children={(field) => (
                                <Input
                                    id="password"
                                    icon={faLock}
                                    label="Contraseña"
                                    type="password"
                                    placeholder="Contraseña"
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
                        <userForm.Field
                            name="phone"
                            children={(field) => (
                                <Input
                                    id="phone"
                                    icon={faPhone}
                                    label="Teléfono"
                                    type="text"
                                    placeholder="Teléfono"
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
                        <userForm.Field
                            name="address"
                            children={(field) => (
                                <div className="col-span-2">
                                    <Input
                                        id="address"
                                        icon={faLocationDot}
                                        label="Dirección"
                                        type="text"
                                        placeholder="Dirección"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        error={field.state.meta.errors[0]}
                                    />
                                </div>
                            )}
                            validators={{
                                onChange: ({ value }) =>
                                    !value ? "La dirección es requerida" : undefined,
                            }}
                        />
                        <userForm.Field
                            name="role"
                            children={(field) => (
                                <div className="col-span-2">
                                    <label htmlFor="role" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                        Rol
                                    </label>
                                    <select
                                        id="role"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="w-full bg-[#070A10]/60 border  rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500  transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] focus:outline-hidden focus:ring-2 border-white/10  focus:border-violet-500/80  focus:ring-violet-500/20"
                                    >
                                        <option value="administrador">Administrador</option>
                                        <option value="cliente">Cliente</option>
                                    </select>
                                </div>
                            )}
                        />
                    </div>
                    <Modal.Footer>
                        <Button
                            type="button"
                            onClick={() => setIsOpenModal(false)}
                            color="danger"
                        >
                            Cancelar
                        </Button>
                        <userForm.Subscribe
                            children={({ isValid, isSubmitting }) => (
                                <Button
                                    variant="success"
                                    disabled={!isValid || isSubmitting}
                                    onClick={() => userForm.handleSubmit()}
                                >
                                    {isSubmitting ? "Guardando..." : "Crear usuario"}
                                    {isSubmitting ? <FontAwesomeIcon icon={faSpinner} className="ml-2 animate-spin" />
                                        : <FontAwesomeIcon icon={faSave} className="ml-2" />
                                    }
                                </Button>
                            )}
                        />
                    </Modal.Footer>
                </form>
            </Modal >
        </>
    );
}
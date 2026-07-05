import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "../components/Table";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../../landing/services/products";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { Product } from "../../../@types/product";
import { useEffect, useState, } from "react";
import useAxiosError from "../../../shared/hooks/useAxiosError";
import useDelayValue from "../../../shared/hooks/useDelayValue";
import Button from "../../../shared/components/Button";
import { faBox, faPlus, faSave, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../components/Modal";
import { useForm } from "@tanstack/react-form";
import Input from "../../../shared/components/Input";
import { urlRegex } from "../../../utils/regex";
import { MySwal, Toast } from "../../landing/components/alerts";


export default function ProductsManagerPage() {

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalType, setModalType] = useState<'create' | 'edit'>('create');

    const [defaultValues, setDefaultValues] = useState<Omit<Product, "createdAt">>({
        name: "",
        description: "",
        price: 0,
        image_url: "",
        id: 0,
        status: false
    });
    const queryClient = useQueryClient();


    const productForm = useForm({
        defaultValues: defaultValues || {
            name: "",
            description: "",
            price: 0,
            image_url: "",
        },
        onSubmit: async ({ value }) => {
            if (modalType === "create") await mutationCreateProduct.mutateAsync(value);
            else await mutationUpdateProduct.mutateAsync(value);
        }
    });


    const { page, limit, search } = useSearch({
        from: "/dashboard/products"
    });


    const delaySearch = useDelayValue(search, 500);

    const { handleError } = useAxiosError();
    const navigate = useNavigate();

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["products", page, limit, delaySearch],
        queryFn: async () => {
            const res = await getProducts(page, limit, search);
            return res.data;
        }
    });



    const products: Product[] = data?.products || [];
    const { page: currentPage, limit: currentLimit, totalPages } = data?.pagination || {};

    const mutationCreateProduct = useMutation({
        mutationFn: createProduct,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["products", page, limit, search]
            });
            productForm.reset();
            setIsOpenModal(false);
            Toast.fire({
                title: data?.data?.message,
                icon: "success"
            });

        },
        onError: (error) => {
            handleError(error);
        }
    });

    const mutationUpdateProduct = useMutation({
        mutationFn: (value: Omit<Product, "createdAt">) => updateProduct(value.id, value),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["products", page, limit, search]
            });
            productForm.reset();
            setIsOpenModal(false);

            Toast.fire({
                title: data?.data?.message, icon: "success"
            });
        },
        onError: (error) => {
            handleError(error);
        }
    });

    const mutationDeleteProduct = useMutation({
        mutationFn: deleteProduct,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["products", page, limit, search]
            });
            Toast.fire({
                title: data?.data?.message, icon: "success"
            });
        },
        onError: (error) => {
            handleError(error);
        }
    });

    const handleEditProduct = (product: Product) => {
        setDefaultValues(product);
        setIsOpenModal(true);
        setModalType("edit");
    };

    const handleDeleteProduct = (id: number) => {
        MySwal.fire({
            text: "¿Estas seguro de eliminar el producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) mutationDeleteProduct.mutateAsync(id);

        });
    };

    useEffect(() => {
        if (isError) handleError(error);

    }, [isError, error, handleError]);

    useEffect(() => {
        if (!isOpenModal) {
            productForm.reset();
            // eslint-disable-next-line 
            setDefaultValues({
                name: "",
                description: "",
                price: 0,
                image_url: "",
                id: 0,
                status: false
            });
            setModalType("create");
        }
    }, [isOpenModal, productForm]);


    const handleSearch = (search: string) => {
        navigate({
            to: "/dashboard/products",
            search: {
                page: currentPage,
                limit: currentLimit,
                search
            }
        });
    };

    const handlePageChange = (page: number) => {
        navigate({
            to: "/dashboard/products",
            search: {
                page,
                limit: currentLimit,
                search
            }
        });
    };

    const handleLimitChange = (limit: number) => {
        navigate({
            to: "/dashboard/products",
            search: {
                page: currentPage,
                limit,
                search
            }
        });
    };

    return (
        <>

            <Table
                searchValue={search ?? ""}
                onSearchChange={handleSearch}
                onLimitChange={handleLimitChange}
                title="Gestión de productos"
                subtitle="Lista de todos los productos registrados"
                icon="fa-solid fa-box"
                columns={["ID", "Nombre", "Descripción", "Precio", "Estado", "Imagen", "Acciones"]}
                currentPage={page}
                actions={
                    <Button
                        onClick={() => setIsOpenModal(true)}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="mr-2"
                        />
                        Crear Producto
                    </Button>

                }
                totalPages={totalPages || 1}
                onPageChange={handlePageChange}
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
                    !isLoading && products.length === 0 && (
                        <Table.Cell >
                            <div className="flex items-center gap-2">
                                <span>No hay productos registrados</span>
                            </div>
                        </Table.Cell>
                    )
                }
                {
                    products.map((item, idx) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{idx + 1}</Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                            <Table.Cell variant="number">$ {Intl.NumberFormat().format(item.price)}</Table.Cell>
                            <Table.Cell variant={item.status ? "badge-success" : "badge-danger"}>{item.status ? "Activo" : "Inactivo"}</Table.Cell>
                            <Table.Cell>
                                <img src={item.image_url} alt={item.name} className="w-20 h-20 rounded-2xl" />
                            </Table.Cell>
                            <Table.Cell >
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEditProduct(item)}
                                        title="Editar"
                                        className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-2 py-1 rounded-lg">
                                        <i className="fa-solid fa-edit"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(item.id)}
                                        title="Eliminar"
                                        className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-2 py-1 rounded-lg">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
            </Table>

            <Modal

                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                title={modalType === "create" ? "Crear Producto" : "Editar Producto"}
                subtitle={modalType === "create" ? "Formulario para crear un nuevo producto" : "Formulario para editar un producto"}
                icon={modalType === "create" ? "fa-solid fa-plus" : "fa-solid fa-edit"}
            >
                <form
                    className="space-y-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        productForm.handleSubmit();
                    }}
                >
                    <productForm.Field
                        name="name"
                        children={(field) => (
                            <Input
                                label="Nombre del producto"
                                id="name"
                                type="text"
                                icon={faBox}
                                placeholder="Nombre del producto"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                error={field.state.meta.errors[0]}
                            />
                        )}
                        validators={{
                            onChange: ({ value }) =>
                                !value ? "El nombre es requerido" :
                                    value.length < 3 ? "El nombre debe tener al menos 3 caracteres" :
                                        undefined,
                        }}
                    />

                    <productForm.Field
                        name="description"
                        children={(field) => (
                            <Input
                                label="Descripción del producto"
                                id="description"
                                type="text"
                                icon={faBox}
                                placeholder="Descripción del producto"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                error={field.state.meta.errors[0]}
                            />
                        )}
                        validators={{
                            onChange: ({ value }) =>
                                !value ? "La descripción es requerida" :
                                    value.length < 3 ? "La descripción debe tener al menos 3 caracteres" :
                                        undefined,
                        }}
                    />

                    <productForm.Field
                        name="price"
                        children={(field) => (
                            <Input
                                label="Precio del producto"
                                id="price"
                                type="number"
                                icon={faBox}
                                placeholder="Precio del producto"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                error={field.state.meta.errors[0]}
                            />
                        )}
                        validators={{
                            onChange: ({ value }) =>
                                !value ? "El precio es requerido" :
                                    value <= 0 ? "El precio debe ser mayor a 0" :
                                        undefined,
                        }}
                    />

                    <productForm.Field
                        name="image_url"
                        children={(field) => (
                            <Input
                                label="Imagen del producto"
                                id="image_url"
                                type="text"
                                icon={faBox}
                                placeholder="URL de la imagen"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                error={field.state.meta.errors[0]}
                            />
                        )}
                        validators={{
                            onChange: ({ value }) =>
                                !value ? "La URL de la imagen es requerida" :
                                    !urlRegex.test(value) ? "URL de imagen inválida" :
                                        undefined,
                        }}
                    />
                    {
                        modalType === "edit" && (
                            <productForm.Field
                                name="status"
                                children={(field) => (
                                    // radio button
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name={field.name}
                                                checked={field.state.value}
                                                onChange={() => field.handleChange(true)}
                                                onBlur={field.handleBlur}
                                            />
                                            Activo
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name={field.name}
                                                checked={!field.state.value}
                                                onChange={() => field.handleChange(false)}
                                                onBlur={field.handleBlur}
                                            />
                                            Inactivo
                                        </label>
                                    </div>)}
                            />

                        )
                    }

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setIsOpenModal(false)}
                        >
                            Cancelar
                            <FontAwesomeIcon icon={faXmark} className="ml-2" />
                        </Button>

                        <productForm.Subscribe
                            children={({ isValid, isSubmitting }) => (
                                <Button
                                    variant="success"
                                    disabled={!isValid || isSubmitting}
                                    onClick={() => productForm.handleSubmit()}
                                >
                                    {isSubmitting ? "Guardando..." : modalType === "create" ? "Crear producto" : "Actualizar producto"}
                                    {isSubmitting ? <FontAwesomeIcon icon={faSpinner} className="ml-2 animate-spin" />
                                        : <FontAwesomeIcon icon={faSave} className="ml-2" />
                                    }
                                </Button>
                            )}
                        />
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
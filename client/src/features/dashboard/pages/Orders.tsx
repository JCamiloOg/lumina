import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosError from "../../../shared/hooks/useAxiosError";
import useDelayValue from "../../../shared/hooks/useDelayValue";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { changeStatusOrder, getAllOrders, getDetailOrder, getOrderByUser } from "../services/orders";
import type { DetailOrder, Order } from "../../../@types/order";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import { Toast } from "../../landing/components/alerts";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../../shared/hooks/useUserContext";


export default function OrdersManagerPage() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [orderId, setOrderId] = useState<string>("");
    const queryClient = useQueryClient();
    const { user } = useUser();

    const { page, limit, search } = useSearch({
        from: "/dashboard/orders"
    });

    const delaySearch = useDelayValue(search, 500);

    const { handleError } = useAxiosError();
    const navigate = useNavigate();

    const ordersQuery = useQuery({
        queryKey: ["orders", page, limit, delaySearch],
        queryFn: async () => {
            let res;
            if (user?.role === "administrador") {
                res = await getAllOrders(page, limit, search);
            } else {
                res = await getOrderByUser(user?.id || "");
            }
            return res.data;
        }
    });

    const detailOrderQuery = useQuery({
        queryKey: ["order", orderId],
        queryFn: async () => {
            const res = await getDetailOrder(orderId);
            return res.data;
        },
    });
    const orders: (Order & { user: { name: string } })[] = ordersQuery.data?.orders || [];

    const { page: currentPage, limit: currentLimit, totalPages } = ordersQuery.data?.pagination || {};

    const detailOrder: DetailOrder[] = detailOrderQuery.data?.orderDetails || [];

    const changeStatusMutation = useMutation({
        mutationFn: (value: { id: string, status: string }) => changeStatusOrder(value.id, value.status),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["orders", page, limit, search]
            });
            Toast.fire({
                icon: "success",
                title: data.data.message,
                timer: 2000
            });
        },
        onError: (error) => handleError(error)
    });


    const handleSearch = (search: string) => {
        navigate({
            to: "/dashboard/orders",
            search: {
                page: currentPage,
                limit: currentLimit,
                search
            }
        });
    };

    const handlePageChange = (page: number) => {
        navigate({
            to: "/dashboard/orders",
            search: {
                page,
                limit: currentLimit,
                search
            }
        });
    };

    const handleLimitChange = (limit: number) => {
        navigate({
            to: "/dashboard/orders",
            search: {
                page: currentPage,
                limit,
                search
            }
        });
    };

    const handleChangeStatus = async ({ id, status }: { id: string, status: string }) => {
        await changeStatusMutation.mutateAsync({ id, status });
    };




    useEffect(() => {
        if (ordersQuery.isError) handleError(ordersQuery.error);

    }, [ordersQuery.isError, ordersQuery.error, handleError]);


    return (
        <>
            <Table
                searchValue={search ?? ""}
                onSearchChange={handleSearch}
                onLimitChange={handleLimitChange}
                title="Gestión de productos"
                subtitle="Lista de todos los productos registrados"
                icon="fa-solid fa-box"
                columns={user?.role === "administrador" ? ["#", "Usuario", "Fecha", "Total", "Estado", ""] : ["#", "Fecha", "Total", "Estado", ""]}
                currentPage={page}
                totalPages={totalPages || 1}
                onPageChange={handlePageChange}
            >
                {
                    ordersQuery.isLoading && (
                        <Table.Cell >

                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-slate-600 rounded-full animate-spin"></div>
                                <span>Cargando...</span>
                            </div>
                        </Table.Cell>
                    )
                }
                {
                    !ordersQuery.isLoading && orders.length === 0 && (
                        <Table.Cell >
                            <div className="flex items-center gap-2">
                                <span>No hay pedidos registrados</span>
                            </div>
                        </Table.Cell>
                    )
                }

                {
                    orders.map((order, idx) => (
                        <Table.Row key={idx}>
                            <Table.Cell>{idx + 1}</Table.Cell>
                            {
                                user?.role === "administrador" && (
                                    <Table.Cell>
                                        <p className="cursor-pointer hover:text-blue-500 hover:underline">{order.user.name}</p>
                                    </Table.Cell>
                                )
                            }

                            <Table.Cell>
                                {
                                    Intl.DateTimeFormat("es-CO", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }).format(new Date(order.createdAt))
                                }</Table.Cell>
                            <Table.Cell variant="number">
                                $ {Intl.NumberFormat().format(order.total)}
                            </Table.Cell>
                            {
                                user?.role === "administrador" ? (
                                    <Table.Cell>
                                        <div className="relative inline-block">

                                            <select
                                                defaultValue={order.status}
                                                onChange={async (e) => {
                                                    await handleChangeStatus({ id: order.id, status: e.target.value });
                                                }}
                                                className={`appearance-none font-bold uppercase tracking-wider text-[10px] py-1 pl-3 pr-8 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500/20 ${order.status === "Aprobado" || order.status === "Entregado"
                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15"
                                                    : order.status === "Rechazado"
                                                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/15"
                                                        : order.status === "Pendiente"
                                                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/15"
                                                            : "bg-[#090D16]/80 text-violet-400 border-violet-500/20 hover:bg-[#0c121e]"
                                                    }`}
                                            >
                                                <option value="Pendiente" className="bg-[#090D16] text-amber-400 font-bold">PENDIENTE</option>
                                                <option value="Aprobado" className="bg-[#090D16] text-emerald-400 font-bold">APROBADO</option>
                                                <option value="Rechazado" className="bg-[#090D16] text-rose-400 font-bold">RECHAZADO</option>
                                                <option value="Enviado" className="bg-[#090D16] text-violet-400 font-bold">ENVIADO</option>
                                                <option value="Entregado" className="bg-[#090D16] text-emerald-400 font-bold">ENTREGADO</option>
                                            </select>
                                            <span className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] transition-colors duration-300 ${order.status === "Aprobado" || order.status === "Entregado"
                                                ? "text-emerald-400/70"
                                                : order.status === "Rechazado"
                                                    ? "text-rose-400/70"
                                                    : order.status === "Pendiente"
                                                        ? "text-amber-400/70"
                                                        : "text-violet-400/70"
                                                }`}>
                                                <i className="fa-solid fa-chevron-down" />
                                            </span>
                                        </div>
                                    </Table.Cell>
                                ) : (
                                    <Table.Cell variant={
                                        order.status === "Aprobado" || order.status === "Entregado"
                                            ? "badge-success"
                                            : order.status === "Rechazado"
                                                ? "badge-danger"
                                                : order.status === "Pendiente"
                                                    ? "badge-warning"
                                                    : "badge-neutral"
                                    }>{order.status}</Table.Cell>
                                )
                            }
                            <Table.Cell>
                                <button
                                    onClick={() => {
                                        setIsOpenModal(true);
                                        setOrderId(order.id);
                                    }}
                                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))
                }
                {
                    <Modal
                        isOpen={isOpenModal}
                        onClose={() => setIsOpenModal(false)}
                        title={`Pedido: #${orderId.slice(0, 8)}...`}
                        subtitle="Detalle completo de productos y montos del pedido"
                        icon="fa-solid fa-receipt"
                        size="xl"
                    >
                        {detailOrderQuery.isLoading && (
                            <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400">
                                <FontAwesomeIcon icon={faSpinner} className="text-3xl text-violet-500 animate-spin" />
                                <span className="text-xs font-semibold uppercase tracking-wider">Cargando detalles...</span>
                            </div>
                        )}

                        {!detailOrderQuery.isLoading && detailOrder.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 gap-2 text-slate-500">
                                <i className="fa-solid fa-folder-open text-3xl mb-1 text-slate-600" />
                                <span className="text-xs font-semibold uppercase tracking-wider">No se encontraron detalles para este pedido</span>
                            </div>
                        )}

                        {!detailOrderQuery.isLoading && detailOrder && detailOrder.length > 0 && (
                            <div className="space-y-6">
                                {/* Resumen del Pedido */}
                                <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0F1420]/60 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-violet-500/5 blur-2xl pointer-events-none" />
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ID del Pedido</p>
                                        <p className="text-xs font-mono text-slate-300 mt-1 select-all">{orderId}</p>
                                    </div>
                                    <div className="flex items-center gap-6 sm:text-right">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total de Artículos</p>
                                            <p className="text-sm font-bold text-slate-200 mt-0.5">
                                                {detailOrder.reduce((acc, item) => acc + item.quantity, 0)} uds
                                            </p>
                                        </div>
                                        <div className="h-8 w-px bg-white/10 hidden sm:block" />
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Monto Total</p>
                                            <p className="text-xl font-black text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400 mt-0.5">
                                                $ {Intl.NumberFormat("es-CO").format(detailOrder.reduce((acc, item) => acc + Number(item.subtotal), 0))}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Listado de Productos */}
                                <div>
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Productos comprados</h4>
                                    <div className="grid gap-3 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
                                        {detailOrder.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="group flex items-center justify-between gap-4 p-3.5 rounded-2xl border border-white/5 bg-white/1.5 hover:bg-white/3 hover:border-white/10 transition-all duration-300"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="relative h-14 w-14 rounded-xl border border-white/10 bg-[#0F1420] overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                                                        <img
                                                            src={item.product.image_url}
                                                            alt={item.product.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h5 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                                                            {item.product.name}
                                                        </h5>
                                                        <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                                                            <span>Cant: <strong className="text-slate-300">{item.quantity}</strong></span>
                                                            <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                                                            <span>P. Unit: <strong className="text-slate-300">$ {Intl.NumberFormat("es-CO").format(item.unit_price)}</strong></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Subtotal</p>
                                                    <p className="text-sm font-bold text-violet-400 mt-0.5">
                                                        $ {Intl.NumberFormat("es-CO").format(item.subtotal)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <Modal.Footer>
                            <button
                                onClick={() => setIsOpenModal(false)}
                                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faXmark} />
                                Cerrar Ventana
                            </button>
                        </Modal.Footer>
                    </Modal>

                }
            </Table >
        </>
    );
}
import http from "./httpService";

export default function editProduct(data, id) {
    return http.put(`/products/${id}`, data)
}
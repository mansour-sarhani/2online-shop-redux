import http from "./httpService";

export default function getOneProduct(id) {
    return http.get(`/products/${id}`)
}
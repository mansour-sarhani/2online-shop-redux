import http from "./httpService";

export default function getProducts() {
    return http.get('/products')
}

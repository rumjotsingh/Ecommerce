import { API_BASE_URL, API_ENDPOINTS } from "../config/api";

const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

/**
 * Resolve product image URL from API response.
 * Backend sets `photo` to photoUrl (https://...) or a relative API path.
 * Falls back to product-photo endpoint when only _id is available.
 */
export function getProductImageUrl(product) {
  if (!product) return "";

  if (product.photoUrl?.startsWith("http")) {
    return product.photoUrl;
  }

  if (typeof product.photo === "string" && product.photo.length > 0) {
    if (product.photo.startsWith("http")) {
      return product.photo;
    }
    if (product.photo.startsWith("/")) {
      return `${API_ORIGIN}${product.photo}`;
    }
  }

  if (product._id) {
    return API_ENDPOINTS.PRODUCT.GET_PHOTO(product._id);
  }

  return "";
}

export default getProductImageUrl;

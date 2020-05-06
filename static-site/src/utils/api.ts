import Cookies from "js-cookie";

const API = {
  get(url: string, options: Object = {}) {
    return fetch(`https://lesdessinsdevirgile.com${url}`, {
      method: "GET",
      mode: "cors",
      credentials: "include", // necessary to set commits via fetch
      headers: this.getHeaders("GET"),
      ...options,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        const error: any = new Error(res.statusText);
        error.response = res;
        throw error;
      }
    });
  },

  post(url: string, payload: Object) {
    return fetch(`https://lesdessinsdevirgile.com${url}`, {
      method: "POST",
      mode: "cors",
      credentials: "include", // necessary to set commits via fetch
      headers: this.getHeaders("POST"),
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((error) => {
          throw error;
        });
      }
    });
  },

  delete(url: string, payload: Object) {
    return fetch(`https://lesdessinsdevirgile.com${url}`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include", // necessary to set commits via fetch
      headers: this.getHeaders("POST"),
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((error) => {
          throw error;
        });
      }
    });
  },

  put(url: string, payload: Object) {
    return fetch(`https://lesdessinsdevirgile.com${url}`, {
      method: "PUT",
      mode: "cors",
      credentials: "include", // necessary to set commits via fetch
      headers: this.getHeaders("POST"),
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((error) => {
          throw error;
        });
      }
    });
  },
  getHeaders(method: string): Headers {
    const token = Cookies.get("token");
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    if (method === "POST") {
      headers.append("Accept", "application/json");
    }

    if (token) headers.append("token", token);

    return headers;
  },
};

export default API;

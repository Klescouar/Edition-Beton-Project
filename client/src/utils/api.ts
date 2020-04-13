const API = {
  get(url: string, options: Object = {}, token: string = "") {
    return fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include", // necessary to set commits via fetch
      headers: this.getHeaders("GET", token),
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

  post(url: string, payload: Object, token: string = "") {
    return fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "include", // necessary to set commits via fetch
      headers: this.getHeaders("POST", token),
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

  delete(url: string, payload: Object, token: string = "") {
    return fetch(url, {
      method: "DELETE",
      mode: "cors",
      credentials: "include", // necessary to set commits via fetch
      headers: this.getHeaders("POST", token),
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
  getHeaders(method: string, token: string): Headers {
    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    if (method === "POST") {
      headers.append("Accept", "application/json");
    }

    headers.append("token", token);

    return headers;
  },
};

export default API;

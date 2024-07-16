export class HttpClient {
  constructor(options) {
    if (!options.baseUrl) {
      throw Error("HttpClient:Base url is empty");
    }
    this.httpProvider = options.httpProvider;
    this.getToken = options.getToken;
    this.baseUrl = options.baseUrl;
  }
  // Метод для построения запросов
  buildRequest(options = {}) {
    const token = this.getToken();
    // Добавляем хедеры
    let headers = {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
    if (options.headers) {
      headers = {
        ...headers,
        ...options.headers,
      };
    }
    return {
      bseUrl: this.baseUrl,
      headers,
      ...options,
    };
  }
  // Метод проверки, если путь запроса начинается с /
  // Это поможет предотвратить ситуации, когда запрос my-domain.com/tasks/create выглядит так: my-domain.com/taskscreate
  checkPath(path) {
    if (!path.startsWith("/")) {
      throw Error("Путь должен начинаться с /", path);
    }
  }
  async get(path, options) {
    this.checkPath(path);
    return this.httpProvider.get(path, this.buildRequest(options));
  }
  async post(path, options) {
    this.checkPath(path);
    return this.httpProvider.post(path, this.buildRequest(options));
  }
  async put(path, options) {
    this.checkPath(path);
    return this.httpProvider.put(path, this.buildRequest(options));
  }
  async delete(path, options) {
    this.checkPath(path);
    return this.httpProvider.delete(path, this.buildRequest(options));
  }
}

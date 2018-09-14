let preApi = 'https://prod.com';

if (process.env.NODE_ENV === 'development') {
  preApi = 'https://dev.com';
}

const apis = {
  demo: `${preApi}/pathname/demo`,
}

const CORS = [preApi];

export {
  preApi,
  apis,
  CORS, // 支持跨域的域名集合
}

interface CookieOptions {
  name: string;
  value: string;
  expiresIn?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

export const setCookie = (options: CookieOptions) => {
  const { name, value, expiresIn, path, domain, secure, httpOnly } = options;

  let cookie = `${name}=${value};`;

  if (expiresIn) {
    cookie += `expires=${new Date(Date.now() + expiresIn * 1000)};`;
  }

  if (path) {
    cookie += `path=${path};`;
  }

  if (domain) {
    cookie += `domain=${domain};`;
  }

  if (secure) {
    cookie += "secure;";
  }

  if (httpOnly) {
    cookie += "httpOnly;";
  }

  document.cookie = cookie;
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
};

export const removeCookie = (name: string) => {
  setCookie({
    name,
    value: "",
    expiresIn: -1,
  });
};

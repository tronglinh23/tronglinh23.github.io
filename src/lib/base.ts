const baseUrl = import.meta.env.BASE_URL || '/';

export const basePath =
  baseUrl === '/' ? '' : baseUrl.replace(/\/+$/, '');

import { CookieOptions, Request, Response } from "express";

const setCookie = (res: Response, name: string, value: string, options: CookieOptions) => {
      return res.cookie(name, value, options);
};

const getCookie = (req: Request, name: string) => {
      return req.cookies[name]
};

const clearCookie = (res: Response, name: string, options: CookieOptions) => {
      return res.clearCookie(name, options);
};


export const cookieUtils = {
      setCookie,
      getCookie,
      clearCookie,
};
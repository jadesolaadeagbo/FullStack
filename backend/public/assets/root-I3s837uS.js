import { w as a, a as c } from './auth-B3Ozg4Wo.js';
import {
  o as s,
  M as i,
  L as p,
  S as l,
  p as u,
  a as h,
  O as m,
  q as d,
} from './chunk-DQRVZFIR-D7VV7TLo.js';
import { L as f } from './index-CKk8P0yu.js';
import { u as x } from './authStore-DGrP8jNA.js';
const E = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];
function L({ children: o }) {
  return s.jsxs('html', {
    lang: 'en',
    children: [
      s.jsxs('head', {
        children: [
          s.jsx('meta', { charSet: 'utf-8' }),
          s.jsx('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
          s.jsx(i, {}),
          s.jsx(p, {}),
        ],
      }),
      s.jsxs('body', { children: [s.jsx(f, {}), o, s.jsx(l, {}), s.jsx(u, {})] }),
    ],
  });
}
const S = a(function () {
    const t = x((e) => e.fetchUser);
    return (
      h.useEffect(() => {
        t();
      }, [t]),
      s.jsx(m, {})
    );
  }),
  O = c(function ({ error: t }) {
    let e = 'Oops!',
      r = 'An unexpected error occurred.',
      n;
    return (
      d(t) &&
        ((e = t.status === 404 ? '404' : 'Error'),
        (r = t.status === 404 ? 'The requested page could not be found.' : t.statusText || r)),
      s.jsxs('main', {
        className: 'pt-16 p-4 container mx-auto',
        children: [s.jsx('h1', { children: e }), s.jsx('p', { children: r }), n],
      })
    );
  });
export { O as ErrorBoundary, L as Layout, S as default, E as links };

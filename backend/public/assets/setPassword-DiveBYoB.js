import { w as L, r as R } from './auth-B3Ozg4Wo.js';
import { a as t, s as $, t as A, o as s } from './chunk-DQRVZFIR-D7VV7TLo.js';
import { L as B } from './logo-lY71twTc.js';
import { f as O } from './forgotPassword-DBpDdn6E.js';
import { e as N, a as b } from './eye-off-DSQ7H8ow.js';
import { b as q } from './back-B7fPkrzd.js';
import { y as a } from './index-CKk8P0yu.js';
const z = () => {
    var g, P;
    t.useEffect(() => {
      document.title = 'Set New Password';
    }, []);
    const [p, j] = t.useState(!1),
      [x, y] = t.useState(!1),
      [r, v] = t.useState(''),
      [n, S] = t.useState(''),
      [o, u] = t.useState({}),
      l = $(),
      f = A(),
      [i, h] = t.useState(!1),
      c = (g = f.state) == null ? void 0 : g.email,
      d = (P = f.state) == null ? void 0 : P.code;
    t.useEffect(() => {
      (!c || !d) &&
        (a.dismiss(),
        a.error('Access denied. Please start the password reset process again.'),
        l('/forgotPassword'));
    }, [c, d, l]);
    const C = () => {
        const e = {};
        return (
          r
            ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(r) ||
              (e.newPassword =
                'Password must be at least 8 characters and include uppercase, lowercase, number, and special character')
            : (e.newPassword = 'Password is required'),
          n
            ? r !== n && (e.confirmNewPassword = 'Passwords do not match')
            : (e.confirmNewPassword = 'Please confirm your password'),
          e
        );
      },
      k = async (e) => {
        e.preventDefault();
        const m = C();
        if (Object.keys(m).length > 0) {
          u(m);
          return;
        }
        h(!0), u({});
        try {
          await R({ email: c, code: d, newPassword: r }),
            a.dismiss(),
            a.success('Password reset successfully. Confirmation sent to your email.'),
            l('/login');
        } catch (w) {
          const E = (w == null ? void 0 : w.message) || 'Something went wrong';
          a.dismiss(), a.error(E);
        } finally {
          h(!1);
        }
      };
    return s.jsx('div', {
      className: 'px-10 lg:px-32 py-10 md:py-20 lg:py-10 h-screen',
      children: s.jsxs('div', {
        children: [
          s.jsx('img', { src: B, alt: 'logo', height: '30px', width: '30px' }),
          s.jsxs('div', {
            className: 'flex items-start justify-between',
            children: [
              s.jsxs('div', {
                className: 'pt-10 md:pt-30 w-[90vw] lg:w-[550px]',
                children: [
                  s.jsxs('a', {
                    href: '/login',
                    className: 'flex gap-2 pl-2 pb-4 text-sm',
                    children: [
                      s.jsx('img', { src: q, alt: 'Back', width: 10, height: 10 }),
                      'Back to login',
                    ],
                  }),
                  s.jsx('h1', {
                    className: 'text-5xl font-bold pb-3.5',
                    children: 'Set a password',
                  }),
                  s.jsx('p', {
                    className: 'font-light text-gray-500 pt-5',
                    children:
                      'Your previous password has been reset. Please set a new password for your account.',
                  }),
                  s.jsxs('form', {
                    onSubmit: k,
                    children: [
                      s.jsxs('div', {
                        className: 'flex flex-col pt-5 relative',
                        children: [
                          s.jsx('input', {
                            type: p ? 'text' : 'password',
                            value: r,
                            onChange: (e) => v(e.target.value),
                            className: 'border border-gray-500 rounded-sm h-10 px-2',
                            placeholder: 'Password',
                          }),
                          s.jsx('span', {
                            className:
                              'absolute right-3 top-[40px] transform -translate-y-1/2 cursor-pointer text-gray-600',
                            onClick: () => j((e) => !e),
                            children: p
                              ? s.jsx('img', { src: N, width: 20 })
                              : s.jsx('img', { src: b, width: 20 }),
                          }),
                          o.newPassword &&
                            s.jsx('p', {
                              className: 'text-red-500 text-sm mt-1',
                              children: o.newPassword,
                            }),
                        ],
                      }),
                      s.jsxs('div', {
                        className: 'flex flex-col pt-5 relative',
                        children: [
                          s.jsx('input', {
                            type: x ? 'text' : 'password',
                            value: n,
                            onChange: (e) => S(e.target.value),
                            className: 'border border-gray-500 rounded-sm h-10 px-2',
                            placeholder: 'Confirm Password',
                          }),
                          s.jsx('span', {
                            className:
                              'absolute right-3 top-[40px] transform -translate-y-1/2 cursor-pointer text-gray-600',
                            onClick: () => y((e) => !e),
                            children: x
                              ? s.jsx('img', { src: N, width: 20 })
                              : s.jsx('img', { src: b, width: 20 }),
                          }),
                          o.confirmNewPassword &&
                            s.jsx('p', {
                              className: 'text-red-500 text-sm mt-1',
                              children: o.confirmNewPassword,
                            }),
                        ],
                      }),
                      s.jsx('button', {
                        type: 'submit',
                        disabled: i,
                        className: `mt-10 w-full py-3 rounded-sm text-white 
                  ${i ? 'bg-blue-400' : 'bg-blue-600'}
                  ${i ? 'cursor-not-allowed' : 'cursor-pointer '}
                  transition-colors duration-200 ease-in-out`,
                        children: i ? 'Submitting...' : 'Set Password',
                      }),
                    ],
                  }),
                ],
              }),
              s.jsx('img', {
                src: O,
                alt: 'login page',
                className: 'pb-20 hidden xl:block',
                style: { height: 'calc(100vh - 80px)' },
              }),
            ],
          }),
        ],
      }),
    });
  },
  G = L(z);
export { G as default };

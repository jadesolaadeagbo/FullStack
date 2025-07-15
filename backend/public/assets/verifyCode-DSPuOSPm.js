import { w as x, v as u } from './auth-B3Ozg4Wo.js';
import { t as h, s as g, a as o, o as e } from './chunk-DQRVZFIR-D7VV7TLo.js';
import { L as y } from './logo-lY71twTc.js';
import { L as b } from './login-C8Y_XXD2.js';
import { b as v } from './back-B7fPkrzd.js';
import { y as s } from './index-CKk8P0yu.js';
const j = () => {
    var c;
    const m = h(),
      i = g(),
      [t, n] = o.useState(''),
      [a, d] = o.useState(!1),
      r = (c = m.state) == null ? void 0 : c.email;
    o.useEffect(() => {
      r ||
        (s.dismiss(), s.error('No email found. Please request a new code.'), i('/forgotPassword'));
    }, [r, i]),
      o.useEffect(() => {
        document.title = 'Verify Code';
      }, []);
    const p = async (l) => {
      if ((l.preventDefault(), !t || t.length < 6)) {
        s.dismiss(), s.error('Please enter a valid verification code.');
        return;
      }
      d(!0);
      try {
        await u({ email: r, code: t }),
          s.dismiss(),
          s.success('Code verified successfully! Please set a new password'),
          n(''),
          i('/setPassword', { state: { email: r, code: t } });
      } catch (f) {
        s.dismiss(), s.error(f.message || 'Invalid code. Please try again.');
      } finally {
        d(!1);
      }
    };
    return e.jsx('div', {
      className: 'px-10 lg:px-32 py-10 md:py-20 lg:py-10 h-screen',
      children: e.jsxs('div', {
        children: [
          e.jsx('img', { src: y, alt: 'Company Logo', height: 30, width: 30 }),
          e.jsxs('div', {
            className: 'flex items-start justify-between',
            children: [
              e.jsxs('div', {
                className: 'pt-10 md:pt-30 w-[90vw] lg:w-[550px]',
                children: [
                  e.jsxs('a', {
                    href: '/login',
                    className: 'flex gap-2 pl-2 pb-4 text-sm',
                    children: [
                      e.jsx('img', { src: v, alt: 'Back', width: 10, height: 10 }),
                      'Back to login',
                    ],
                  }),
                  e.jsx('h1', {
                    className: 'text-2xl md:text-5xl font-bold pb-5 md:pt-10 xl:pt-0',
                    children: 'Verify Code',
                  }),
                  e.jsx('p', {
                    className: 'font-light text-gray-500 pt-5',
                    children: 'An authentication code has been sent to your email.',
                  }),
                  e.jsxs('form', {
                    onSubmit: p,
                    children: [
                      e.jsx('div', {
                        className: 'flex flex-col pt-5',
                        children: e.jsx('input', {
                          type: 'text',
                          inputMode: 'numeric',
                          pattern: '\\d{4,6}',
                          maxLength: 6,
                          required: !0,
                          className: 'border border-gray-500 rounded-sm h-10 px-2',
                          placeholder: 'Enter code',
                          value: t,
                          onChange: (l) => n(l.target.value),
                        }),
                      }),
                      e.jsxs('span', {
                        className: 'flex pt-2 text-sm',
                        children: [
                          'Didn’t receive a code? ',
                          e.jsx('a', {
                            href: '/forgotPassword',
                            className: 'text-red-500',
                            children: 'Resend',
                          }),
                        ],
                      }),
                      e.jsx('button', {
                        type: 'submit',
                        disabled: a,
                        className: `mt-10 w-full py-3 rounded-sm text-white 
                  ${a ? 'bg-blue-400' : 'bg-blue-600'}
                  ${a ? 'cursor-not-allowed' : 'cursor-pointer '}
                  transition-colors duration-200 ease-in-out`,
                        children: a ? 'Verifying...' : 'Verify',
                      }),
                    ],
                  }),
                ],
              }),
              e.jsx('img', {
                src: b,
                alt: 'Verification Illustration',
                className: 'pb-20 hidden xl:block',
                style: { height: 'calc(100vh - 80px)' },
              }),
            ],
          }),
        ],
      }),
    });
  },
  E = x(j);
export { E as default };

import { w as f } from './auth-B3Ozg4Wo.js';
import { a as s, s as g, o as n } from './chunk-DQRVZFIR-D7VV7TLo.js';
import { u as w } from './authStore-DGrP8jNA.js';
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const x = (t) => t.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  C = (t) =>
    t.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, r, o) => (o ? o.toUpperCase() : r.toLowerCase())),
  l = (t) => {
    const e = C(t);
    return e.charAt(0).toUpperCase() + e.slice(1);
  },
  u = (...t) =>
    t
      .filter((e, r, o) => !!e && e.trim() !== '' && o.indexOf(e) === r)
      .join(' ')
      .trim(),
  y = (t) => {
    for (const e in t) if (e.startsWith('aria-') || e === 'role' || e === 'title') return !0;
  };
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var A = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const L = s.forwardRef(
  (
    {
      color: t = 'currentColor',
      size: e = 24,
      strokeWidth: r = 2,
      absoluteStrokeWidth: o,
      className: c = '',
      children: a,
      iconNode: m,
      ...i
    },
    d
  ) =>
    s.createElement(
      'svg',
      {
        ref: d,
        ...A,
        width: e,
        height: e,
        stroke: t,
        strokeWidth: o ? (Number(r) * 24) / Number(e) : r,
        className: u('lucide', c),
        ...(!a && !y(i) && { 'aria-hidden': 'true' }),
        ...i,
      },
      [...m.map(([p, h]) => s.createElement(p, h)), ...(Array.isArray(a) ? a : [a])]
    )
);
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const b = (t, e) => {
  const r = s.forwardRef(({ className: o, ...c }, a) =>
    s.createElement(L, {
      ref: a,
      iconNode: e,
      className: u(`lucide-${x(l(t))}`, `lucide-${t}`, o),
      ...c,
    })
  );
  return (r.displayName = l(t)), r;
};
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const j = [['path', { d: 'M21 12a9 9 0 1 1-6.219-8.56', key: '13zald' }]],
  k = b('loader-circle', j),
  P = f(function () {
    const { fetchUser: e } = w(),
      r = g();
    return (
      s.useEffect(() => {
        (async () => {
          await e(), r('/userProfile', { replace: !0 });
        })();
      }, []),
      n.jsxs('div', {
        className: 'h-screen flex flex-col justify-center items-center bg-gray-50 text-gray-700',
        children: [
          n.jsx(k, { className: 'animate-spin w-12 h-12 text-blue-600 mb-4' }),
          n.jsx('p', {
            className: 'text-lg font-medium',
            children: 'Logging you in with Google...',
          }),
          n.jsx('p', {
            className: 'text-sm text-gray-500 mt-2',
            children: 'Please wait, redirecting you to your profile.',
          }),
        ],
      })
    );
  });
export { P as default };

import { c as d } from './auth-B3Ozg4Wo.js';
import { v as i } from './chunk-DQRVZFIR-D7VV7TLo.js';
const l = (t) => {
    let e;
    const n = new Set(),
      r = (s, u) => {
        const o = typeof s == 'function' ? s(e) : s;
        if (!Object.is(o, e)) {
          const g = e;
          (e = (u ?? (typeof o != 'object' || o === null)) ? o : Object.assign({}, e, o)),
            n.forEach((b) => b(e, g));
        }
      },
      c = () => e,
      a = {
        setState: r,
        getState: c,
        getInitialState: () => f,
        subscribe: (s) => (n.add(s), () => n.delete(s)),
      },
      f = (e = t(r, c, a));
    return a;
  },
  h = (t) => (t ? l(t) : l),
  m = (t) => t;
function y(t, e = m) {
  const n = i.useSyncExternalStore(
    t.subscribe,
    () => e(t.getState()),
    () => e(t.getInitialState())
  );
  return i.useDebugValue(n), n;
}
const S = (t) => {
    const e = h(t),
      n = (r) => y(e, r);
    return Object.assign(n, e), n;
  },
  p = (t) => (t ? S(t) : S),
  O = p((t) => ({
    user: null,
    loading: !0,
    setUser: (e) => t({ user: e }),
    fetchUser: async () => {
      t({ loading: !0 });
      try {
        const e = await d();
        t({ user: e });
      } catch (e) {
        e.message !== 'Unauthorized' && console.error('Unexpected error fetching user:', e),
          t({ user: null });
      } finally {
        t({ loading: !1 });
      }
    },
  }));
export { O as u };

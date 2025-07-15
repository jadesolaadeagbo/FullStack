import { w as i } from './auth-B3Ozg4Wo.js';
import { o } from './chunk-DQRVZFIR-D7VV7TLo.js';
import { L as e } from './login-DgEyuP_S.js';
import { u as m } from './authStore-DGrP8jNA.js';
import { L as n } from './Loader-sp7Eh6iv.js';
import { U as s } from './userProfile-CMUs3_zE.js';
import './logo-lY71twTc.js';
import './login-C8Y_XXD2.js';
import './google-Bk_u_M2e.js';
import './index-CKk8P0yu.js';
import './eye-off-DSQ7H8ow.js';
function g({}) {
  return [{ title: 'Authentication' }, { name: 'description', content: 'Authentication project' }];
}
const w = i(function () {
  const { user: t, loading: r } = m();
  return r ? o.jsx(n, {}) : t ? o.jsx(s, {}) : o.jsx(e, {});
});
export { w as default, g as meta };

import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, useNavigate, Navigate, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { create } from "zustand";
import { Loader2 } from "lucide-react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const BASE_URL = void 0;
const signup$1 = async (formData) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }
  return data;
};
const login = async (formData) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),
    credentials: "include"
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
};
const logout = async () => {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Logout failed");
  }
  return data;
};
const authenticationStatus = async () => {
  const response = await fetch(`${BASE_URL}/auth/status`, {
    method: "GET",
    credentials: "include"
  });
  if (response.status === 401) {
    return null;
  }
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};
const googleLogin = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/google`, {
      method: "POST",
      credentials: "include"
    });
    const { url } = await response.json();
    window.location.href = url;
  } catch (error) {
    console.error("Google login error:", error);
  }
};
const forgotPassword$1 = async (formData) => {
  const response = await fetch(`${BASE_URL}/auth/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Password reset failed");
  }
  return data;
};
const verifyCode$1 = async (formData) => {
  const response = await fetch(`${BASE_URL}/auth/password-reset/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Password reset failed");
  }
  return data;
};
const resetPassword = async (formData) => {
  const response = await fetch(`${BASE_URL}/auth/password-reset/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Password reset failed");
  }
  return data;
};
const updateUserProfile = async (formData) => {
  const response = await fetch(`${BASE_URL}/user/edit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),
    credentials: "include"
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update user info");
  }
  return data;
};
const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    set({ loading: true });
    try {
      const user = await authenticationStatus();
      set({ user });
    } catch (error) {
      if (error.message !== "Unauthorized") {
        console.error("Unexpected error fetching user:", error);
      }
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  }
}));
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": true, "VITE_API_URL": "https://fullstack-ia7o.onrender.com" };
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(ToastContainer, {}), children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  useEffect(() => {
    fetchUser();
    console.log(__vite_import_meta_env__);
  }, [fetchUser]);
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Logo = "data:image/svg+xml,%3csvg%20width='14'%20height='17'%20viewBox='0%200%2014%2017'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M2.36689%201.92499C4.10884%200.395083%206.70968%200.0300522%208.85155%200.864792C11.9194%201.96525%2013.6936%205.60751%2012.8427%208.71832C12.4697%2010.012%2011.745%2011.1608%2011.0498%2012.3015C10.4164%2011.2118%209.52256%2010.3073%208.41942%209.69263C9.31321%208.7559%209.91712%207.35751%209.30247%206.10674C8.56704%204.13128%205.66827%203.55152%204.29672%205.19416C3.00837%206.46103%203.38146%208.53312%204.57049%209.72753C3.47003%2010.2617%202.62992%2011.1715%202.11459%2012.2747C0.89066%2010.7528%20-0.0890189%208.87936%200.0988646%206.86633C-0.00312927%204.96602%200.971181%203.16234%202.36689%201.92499Z'%20fill='%233869EB'/%3e%3cpath%20d='M4.5061%2015.262C4.90603%2013.4262%205.16101%2011.5634%205.5341%209.72217C6.16753%209.72485%206.79828%209.72485%207.43172%209.72485C7.82091%2011.5527%208.10005%2013.402%208.47045%2015.2352C7.82627%2015.823%207.31362%2016.7088%206.48962%2017.0067C5.67903%2016.6926%205.16101%2015.8284%204.5061%2015.262Z'%20fill='%233869EB'/%3e%3c/svg%3e";
const LoginImage = "/assets/login-DSnvXlk5.png";
const gmail = "data:image/svg+xml,%3csvg%20width='10'%20height='10'%20viewBox='0%200%2010%2010'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1_4118)'%3e%3cpath%20d='M8.60119%204.56027H8.2884V4.54415H4.79356V6.09741H6.98813C6.66796%207.00161%205.80765%207.65068%204.79356%207.65068C3.50688%207.65068%202.46366%206.60747%202.46366%205.32078C2.46366%204.0341%203.50688%202.99089%204.79356%202.99089C5.38749%202.99089%205.92783%203.21494%206.33925%203.58093L7.4376%202.48258C6.74407%201.83623%205.81638%201.43762%204.79356%201.43762C2.64909%201.43762%200.9104%203.17631%200.9104%205.32078C0.9104%207.46526%202.64909%209.20394%204.79356%209.20394C6.93804%209.20394%208.67672%207.46526%208.67672%205.32078C8.67672%205.06042%208.64993%204.80626%208.60119%204.56027Z'%20fill='%23FFC107'/%3e%3cpath%20d='M1.35791%203.51337L2.63372%204.44901C2.97894%203.59433%203.81498%202.99089%204.79334%202.99089C5.38727%202.99089%205.92761%203.21494%206.33903%203.58093L7.43739%202.48258C6.74385%201.83623%205.81617%201.43762%204.79334%201.43762C3.30182%201.43762%202.00834%202.27969%201.35791%203.51337Z'%20fill='%23FF3D00'/%3e%3cpath%20d='M4.79365%209.20395C5.79667%209.20395%206.70805%208.8201%207.39712%208.19588L6.19528%207.17889C5.79231%207.48534%205.29991%207.65109%204.79365%207.65069C3.78364%207.65069%202.92605%207.00667%202.60297%206.10791L1.33667%207.08355C1.97933%208.34111%203.28446%209.20395%204.79365%209.20395Z'%20fill='%234CAF50'/%3e%3cpath%20d='M8.60109%204.56018H8.2883V4.54407H4.79346V6.09733H6.98802C6.83487%206.52767%206.559%206.9037%206.1945%207.17899L6.19508%207.1786L7.39692%208.1956C7.31188%208.27287%208.67662%207.26228%208.67662%205.3207C8.67662%205.06033%208.64982%204.80618%208.60109%204.56018Z'%20fill='%231976D2'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1_4118'%3e%3crect%20width='9.31958'%20height='9.31958'%20fill='white'%20transform='translate(0.133545%200.660767)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const eye = "data:image/svg+xml,%3csvg%20width='8'%20height='8'%20viewBox='0%200%208%208'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1003_67)'%3e%3cpath%20d='M4.4102%204.436C4.88686%204.436%205.27328%204.04958%205.27328%203.57292C5.27328%203.09625%204.88686%202.70984%204.4102%202.70984C3.93353%202.70984%203.54712%203.09625%203.54712%203.57292C3.54712%204.04958%203.93353%204.436%204.4102%204.436Z'%20fill='%23313131'/%3e%3cpath%20d='M7.57711%203.33833C7.22028%202.7865%206.75732%202.31774%206.2384%201.98262C5.66431%201.6115%205.03049%201.41528%204.40557%201.41528C3.83216%201.41528%203.26833%201.57913%202.72971%201.90225C2.18044%202.2317%201.68283%202.713%201.25061%203.33267C1.20182%203.4027%201.17495%203.48565%201.17341%203.57099C1.17187%203.65633%201.19574%203.7402%201.24198%203.81194C1.59814%204.3693%202.05651%204.83874%202.56735%205.16927C3.14251%205.54188%203.7615%205.73068%204.40557%205.73068C5.03548%205.73068%205.67065%205.53608%206.24231%205.16806C6.76096%204.83402%207.22298%204.3635%207.57846%203.80709C7.62311%203.73701%207.64671%203.6556%207.64647%203.57251C7.64623%203.48942%207.62216%203.40815%207.57711%203.33833V3.33833ZM4.41015%204.8676C4.1541%204.8676%203.9038%204.79167%203.6909%204.64941C3.478%204.50716%203.31207%204.30497%203.21408%204.06841C3.1161%203.83185%203.09046%203.57154%203.14041%203.32041C3.19036%203.06928%203.31366%202.8386%203.49472%202.65755C3.67578%202.47649%203.90645%202.35319%204.15759%202.30324C4.40872%202.25328%204.66902%202.27892%204.90558%202.37691C5.14214%202.4749%205.34433%202.64083%205.48659%202.85373C5.62884%203.06663%205.70477%203.31693%205.70477%203.57298C5.70438%203.91621%205.56786%204.24528%205.32515%204.48798C5.08245%204.73068%204.75339%204.8672%204.41015%204.8676V4.8676Z'%20fill='%23313131'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1003_67'%3e%3crect%20width='6.90463'%20height='6.90463'%20fill='white'%20transform='translate(0.958008%200.120605)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const eyeOff = "data:image/svg+xml,%3csvg%20width='7'%20height='8'%20viewBox='0%200%207%208'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1003_55)'%3e%3cpath%20d='M5.82672%206.79297C5.79838%206.79302%205.77031%206.78745%205.74413%206.7766C5.71795%206.76574%205.69418%206.74981%205.67419%206.72973L0.927261%201.98279C0.888505%201.942%200.867217%201.88768%200.867938%201.83142C0.868658%201.77515%200.891329%201.72139%200.931117%201.68161C0.970906%201.64182%201.02466%201.61915%201.08093%201.61843C1.13719%201.61771%201.19151%201.63899%201.23231%201.67775L5.97924%206.42468C6.00939%206.45486%206.02993%206.49329%206.03824%206.53514C6.04656%206.57698%206.04229%206.62035%206.02597%206.65976C6.00964%206.69918%205.982%206.73287%205.94654%206.75658C5.91107%206.78029%205.86938%206.79295%205.82672%206.79297V6.79297ZM3.34536%205.01085L2.64695%204.31243C2.64294%204.30846%202.6378%204.30585%202.63223%204.30495C2.62667%204.30406%202.62096%204.30493%202.61592%204.30744C2.61088%204.30996%202.60675%204.31399%202.60411%204.31897C2.60148%204.32396%202.60047%204.32964%202.60123%204.33522C2.62943%204.51642%202.7145%204.68396%202.84417%204.81362C2.97384%204.94329%203.14138%205.02837%203.32257%205.05657C3.32816%205.05733%203.33384%205.05632%203.33882%205.05368C3.34381%205.05105%203.34784%205.04692%203.35035%205.04188C3.35287%205.03683%203.35374%205.03113%203.35284%205.02556C3.35195%205.02%203.34933%205.01485%203.34536%205.01085ZM3.56113%203.39662L4.26063%204.09585C4.26462%204.09988%204.26978%204.10254%204.27537%204.10347C4.28097%204.10439%204.28671%204.10353%204.29179%204.10101C4.29686%204.09849%204.30101%204.09443%204.30365%204.08941C4.30629%204.08439%204.30728%204.07867%204.30648%204.07306C4.27836%203.89162%204.19322%203.72384%204.06339%203.59401C3.93355%203.46417%203.76577%203.37903%203.58433%203.35091C3.57871%203.35004%203.57296%203.35097%203.5679%203.35357C3.56285%203.35616%203.55874%203.36029%203.55616%203.36536C3.55359%203.37043%203.55269%203.37618%203.55358%203.3818C3.55447%203.38741%203.55712%203.3926%203.56113%203.39662V3.39662Z'%20fill='%23313131'/%3e%3cpath%20d='M6.62246%204.4377C6.6671%204.36763%206.69071%204.28622%206.69047%204.20313C6.69023%204.12004%206.66616%204.03876%206.62111%203.96895C6.26428%203.41711%205.80132%202.94835%205.28239%202.61324C4.7075%202.24211%204.07368%202.0459%203.44902%202.0459C3.11972%202.04635%202.79266%202.10004%202.48049%202.20489C2.47175%202.2078%202.4639%202.21289%202.45769%202.21969C2.45148%202.22649%202.44711%202.23476%202.44501%202.24372C2.4429%202.25269%202.44312%202.26204%202.44565%202.27089C2.44817%202.27975%202.45293%202.28781%202.45945%202.2943L3.09651%202.93136C3.10313%202.93799%203.11136%202.94279%203.12039%202.94527C3.12943%202.94775%203.13895%202.94784%203.14803%202.94552C3.36396%202.8929%203.58981%202.89676%203.80383%202.95672C4.01785%203.01668%204.21282%203.13074%204.36998%203.2879C4.52714%203.44506%204.64119%203.64003%204.70116%203.85405C4.76112%204.06806%204.76498%204.29391%204.71236%204.50985C4.71006%204.51891%204.71017%204.52841%204.71265%204.53741C4.71513%204.54642%204.71991%204.55463%204.72652%204.56123L5.64286%205.47825C5.6524%205.4878%205.66516%205.49343%205.67864%205.49403C5.69213%205.49463%205.70534%205.49016%205.71568%205.48149C6.06841%205.18084%206.37407%204.829%206.62246%204.4377ZM3.45334%205.49821C3.25736%205.49822%203.06394%205.45374%202.88765%205.36812C2.71136%205.28249%202.55682%205.15796%202.43566%205.00392C2.31451%204.84987%202.22991%204.67033%202.18825%204.47883C2.14658%204.28733%202.14894%204.08887%202.19513%203.89842C2.19742%203.88936%202.19732%203.87986%202.19484%203.87085C2.19236%203.86185%202.18758%203.85364%202.18097%203.84704L1.2796%202.94525C1.27004%202.93568%201.25723%202.93005%201.24372%202.92948C1.23021%202.92891%201.21697%202.93343%201.20664%202.94215C0.877725%203.22279%200.572816%203.56424%200.294069%203.96328C0.245276%204.03331%200.218403%204.11627%200.216867%204.20161C0.21533%204.28695%200.239198%204.37082%200.285438%204.44256C0.641593%204.99992%201.09983%205.46935%201.6108%205.79988C2.1865%206.17249%202.80495%206.36129%203.44902%206.36129C3.78165%206.3604%204.11212%206.30785%204.42862%206.20553C4.43743%206.20272%204.44538%206.19768%204.45168%206.19091C4.45799%206.18413%204.46245%206.17585%204.46463%206.16686C4.46681%206.15786%204.46664%206.14846%204.46414%206.13955C4.46163%206.13064%204.45688%206.12253%204.45033%206.11599L3.81017%205.47596C3.80356%205.46935%203.79536%205.46457%203.78635%205.46209C3.77734%205.45961%203.76785%205.45951%203.75879%205.4618C3.65878%205.48603%203.55624%205.49826%203.45334%205.49821V5.49821Z'%20fill='%23313131'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1003_55'%3e%3crect%20width='6.90463'%20height='6.90463'%20fill='white'%20transform='translate(0.000976562%200.751221)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchUser } = useAuthStore();
  useEffect(() => {
    document.title = "Login";
  }, []);
  const isFormValid = email.trim() !== "" && password.trim() !== "";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast("");
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await login({ email: email.trim(), password });
      if (!response) {
        throw new Error((response == null ? void 0 : response.message) || "Login failed. Please try again.");
      }
      await fetchUser();
      toast.dismiss();
      toast.success("Login successful!");
      navigate("/userProfile");
      setEmail("");
      setPassword2("");
    } catch (error) {
      console.error("Login error:", error);
      toast.dismiss();
      toast.error(error.message || "Something went wrong during login.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await googleLogin();
    } catch (error) {
      console.error("Google login error:", error);
      toast.dismiss();
      toast.error("Something went wrong with Google login.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "px-[5%] sm:px-20 lg:px-32 py-20 lg:py-10 h-screen", children: [
    /* @__PURE__ */ jsx("img", { src: Logo, alt: "logo", height: "30px", width: "30px" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center lg:items-start justify-center xl:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "pt-10 sm:pt-40 md:pt-30", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl font-bold pb-3.5", children: "Login" }),
        /* @__PURE__ */ jsx("p", { className: "font-light text-gray-500", children: "Login to access your account" }),
        /* @__PURE__ */ jsxs("form", { className: " w-[90vw] lg:w-[80vw] xl:w-[550px]", onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col pt-5", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              className: "border border-gray-500 rounded-sm h-10 px-2",
              placeholder: "Email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col pt-5", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: showPassword ? "text" : "password",
                className: "border border-gray-500 rounded-sm h-10 px-2",
                placeholder: "Password",
                value: password,
                onChange: (e) => setPassword2(e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "absolute right-3 top-[40px] transform -translate-y-1/2 cursor-pointer text-gray-600",
                onClick: () => setShowPassword((prev) => !prev),
                children: /* @__PURE__ */ jsx("img", { src: showPassword ? eyeOff : eye, width: 20 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pt-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", className: "cursor-pointer" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Remember me" })
            ] }),
            /* @__PURE__ */ jsx("a", { href: "/forgotPassword", className: "text-sm text-red-500", children: "Forgot password?" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: loading,
              className: `mt-10 w-full py-3 rounded-sm text-white 
                  ${loading ? "bg-blue-400" : "bg-blue-600"}
                  ${loading ? "cursor-not-allowed" : "cursor-pointer "}
                  transition-colors duration-200 ease-in-out`,
              children: loading ? "Logging in..." : "Login"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "text-center flex pt-5 justify-center", children: [
            /* @__PURE__ */ jsx("span", { children: "Don't have an account?  " }),
            /* @__PURE__ */ jsx("a", { href: "/signup", className: "text-red-500", children: "Sign up" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center my-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-grow h-px bg-gray-300" }),
            /* @__PURE__ */ jsx("span", { className: "mx-4 text-gray-500", children: "or" }),
            /* @__PURE__ */ jsx("div", { className: "flex-grow h-px bg-gray-300" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleGoogleLogin,
            type: "button",
            className: "border cursor-pointer border-gray-400 py-2 w-full rounded-sm flex justify-center items-center gap-2",
            children: [
              /* @__PURE__ */ jsx("img", { src: gmail, alt: "Google", height: 20, width: 20 }),
              "Sign in with Google"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: LoginImage,
          alt: "login page",
          className: "pb-20 hidden xl:block",
          style: { height: "calc(100vh - 80px)" }
        }
      )
    ] })
  ] });
};
function Loader() {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" }) });
}
const UserProfile = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  const navigate = useNavigate();
  const { fetchUser, user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState((user == null ? void 0 : user.firstName) ?? "");
  const [lastName, setLastName] = useState((user == null ? void 0 : user.lastName) ?? "");
  const [phone, setPhone] = useState((user == null ? void 0 : user.phone) ?? "");
  const [loading, setLoading] = useState(false);
  const email = (user == null ? void 0 : user.email) ?? "";
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      await fetchUser();
      toast.dismiss();
      toast.success("User successfully logged out");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = async () => {
    if (isEditing) {
      setLoading(true);
      try {
        await updateUserProfile({ firstName, lastName, phone });
        await fetchUser();
        toast.dismiss();
        toast.success("Profile updated successfully");
        setIsEditing(false);
      } catch (error) {
        toast.dismiss();
        toast.error(error.message || "Failed to update profile");
      } finally {
        setLoading(false);
      }
    } else {
      setIsEditing(true);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-tl from-indigo-700 to-purple-500 h-[100vh] flex flex-col justify-center items-center gap-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white w-[70%] flex flex-col items-center justify-center rounded-xl h-[70%] ", children: [
      isEditing ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx("img", { src: Logo, alt: "", height: 200, width: 200 }) }),
        /* @__PURE__ */ jsxs("span", { className: "flex flex-col space-y-1.5 pt-10", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: firstName,
              onChange: (e) => setFirstName(e.target.value),
              className: "text-2xl outline-none border-b-2 border-black text-blue-600 font-bold text-center",
              placeholder: "First Name"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: lastName,
              onChange: (e) => setLastName(e.target.value),
              className: "text-2xl outline-none border-b-2 border-black text-blue-600 font-bold text-center",
              placeholder: "Last Name"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "text-xl text-center outline-none border-b-2",
              type: "text",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              placeholder: "Phone Number"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "pt-3 pb-8 text-gray-600", children: email })
      ] }) : /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("img", { src: Logo, alt: "", height: 200, width: 200 }) }),
        /* @__PURE__ */ jsxs("span", { className: "flex flex-col items-center space-y-1.5 pt-10", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-3xl text-blue-600 font-bold", children: [
            firstName,
            " ",
            lastName
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl", children: phone })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "pt-3 pb-8 text-gray-600 text-center", children: email })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleEdit,
          className: "px-4 py-1 border border-blue-500 text-blue-500 rounded-xl cursor-pointer",
          children: isEditing ? "Submit Changes" : "Edit"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleLogout,
        className: "hover:bg-blue-500 hover:text-white bg-white text-blue-500 px-7 py-4 border border-blue-500 rounded-xl cursor-pointer",
        children: "LOGOUT"
      }
    )
  ] });
};
function meta({}) {
  return [{
    title: "Authentication"
  }, {
    name: "description",
    content: "Authentication project"
  }];
}
const home = withComponentProps(function Home() {
  const {
    user,
    loading
  } = useAuthStore();
  if (loading) return /* @__PURE__ */ jsx(Loader, {});
  return user ? /* @__PURE__ */ jsx(UserProfile, {}) : /* @__PURE__ */ jsx(Login, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function PublicRoute({ children }) {
  const { user, loading } = useAuthStore();
  if (loading) return /* @__PURE__ */ jsx(Loader, {});
  return user ? /* @__PURE__ */ jsx(Navigate, { to: "/userProfile", replace: true }) : children;
}
const PublicLogin = withComponentProps(function PublicLogin2() {
  return /* @__PURE__ */ jsx(PublicRoute, {
    children: /* @__PURE__ */ jsx(Login, {})
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PublicLogin
}, Symbol.toStringTag, { value: "Module" }));
const SignupImage = "/assets/signup-PUFoOFGu.png";
const Signup = () => {
  useEffect(() => {
    document.title = "Signup";
  }, []);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const validate = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\d{10,15}$/.test(formData.phone)) errors.phone = "Enter a valid phone number";
    if (!formData.password) {
      errors.password = "Password is required";
    } else {
      const password = formData.password;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!passwordRegex.test(password)) {
        errors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
      }
    }
    if (!confirmPassword) errors.confirmPassword = "Please confirm your password";
    else if (confirmPassword !== formData.password) errors.confirmPassword = "Passwords do not match";
    if (!terms) errors.terms = "You must agree to the terms";
    return errors;
  };
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "terms") {
      setTerms(checked);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    var _a, _b, _c, _d;
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await signup$1(formData);
        if ((response == null ? void 0 : response.status) === 201 || ((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.success)) {
          toast.dismiss();
          toast.success("Signup successful!");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: ""
          });
          setConfirmPassword("");
          setTerms(false);
          navigate("/login");
        } else {
          toast.dismiss();
          toast.error(((_b = response == null ? void 0 : response.data) == null ? void 0 : _b.message) || "Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast.dismiss();
        toast.error(((_d = (_c = error == null ? void 0 : error.response) == null ? void 0 : _c.data) == null ? void 0 : _d.message) || error.message || "Something went wrong during signup.");
      }
    } else {
      toast.dismiss();
      toast.error("Please fix the form errors.");
    }
  };
  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await googleLogin();
    } catch (error) {
      console.error("Google login error:", error);
      toast.dismiss();
      toast.error("Something went wrong with Google login.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", {
    className: "px-10 lg:px-32 py-10 md:py-20 lg:py-10 h-screen",
    children: /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("div", {
        className: "flex justify-end",
        children: /* @__PURE__ */ jsx("img", {
          src: Logo,
          alt: "Logo",
          height: "30px",
          width: "30px"
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex items-start justify-between",
        children: [/* @__PURE__ */ jsx("img", {
          src: SignupImage,
          alt: "signup",
          className: "pb-20 hidden xl:block",
          style: {
            height: "calc(100vh - 80px)"
          }
        }), /* @__PURE__ */ jsxs("div", {
          className: "pt-10 md:pt-30 w-[90vw] lg:w-[700px]",
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-5xl font-bold pb-3.5",
            children: "Sign up"
          }), /* @__PURE__ */ jsx("p", {
            className: "font-light text-gray-500",
            children: "Let’s get you all set up so you can access your personal account."
          }), /* @__PURE__ */ jsxs("form", {
            onSubmit: handleSubmit,
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex gap-5 pt-5",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "w-1/2",
                children: [/* @__PURE__ */ jsx("input", {
                  type: "text",
                  name: "firstName",
                  value: formData.firstName,
                  onChange: handleChange,
                  className: "border border-gray-500 rounded-sm h-10 px-2 w-full",
                  placeholder: "First Name"
                }), formErrors.firstName && /* @__PURE__ */ jsx("p", {
                  className: "text-red-500 text-sm",
                  children: formErrors.firstName
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "w-1/2",
                children: [/* @__PURE__ */ jsx("input", {
                  type: "text",
                  name: "lastName",
                  value: formData.lastName,
                  onChange: handleChange,
                  className: "border border-gray-500 rounded-sm h-10 px-2 w-full",
                  placeholder: "Last Name"
                }), formErrors.lastName && /* @__PURE__ */ jsx("p", {
                  className: "text-red-500 text-sm",
                  children: formErrors.lastName
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex gap-5 pt-5",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "w-1/2",
                children: [/* @__PURE__ */ jsx("input", {
                  type: "text",
                  name: "email",
                  value: formData.email,
                  onChange: handleChange,
                  className: "border border-gray-500 rounded-sm h-10 px-2 w-full",
                  placeholder: "Email"
                }), formErrors.email && /* @__PURE__ */ jsx("p", {
                  className: "text-red-500 text-sm",
                  children: formErrors.email
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "w-1/2",
                children: [/* @__PURE__ */ jsx("input", {
                  type: "text",
                  name: "phone",
                  value: formData.phone,
                  onChange: handleChange,
                  className: "border border-gray-500 rounded-sm h-10 px-2 w-full",
                  placeholder: "Phone Number"
                }), formErrors.phone && /* @__PURE__ */ jsx("p", {
                  className: "text-red-500 text-sm",
                  children: formErrors.phone
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col pt-5 relative",
              children: [/* @__PURE__ */ jsx("input", {
                type: showPassword ? "text" : "password",
                name: "password",
                value: formData.password,
                onChange: handleChange,
                className: "border border-gray-500 rounded-sm h-10 px-2",
                placeholder: "Password"
              }), /* @__PURE__ */ jsx("span", {
                className: "absolute right-3 top-[40px] transform -translate-y-1/2 cursor-pointer text-gray-600",
                onClick: () => setShowPassword((prev) => !prev),
                children: /* @__PURE__ */ jsx("img", {
                  src: showPassword ? eyeOff : eye,
                  width: 20
                })
              }), formErrors.password && /* @__PURE__ */ jsx("p", {
                className: "text-red-500 text-sm pt-1",
                children: formErrors.password
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col pt-5 relative",
              children: [/* @__PURE__ */ jsx("input", {
                type: showConfirmPassword ? "text" : "password",
                name: "confirmPassword",
                value: confirmPassword,
                onChange: handleChange,
                className: "border border-gray-500 rounded-sm h-10 px-2",
                placeholder: "Confirm Password"
              }), /* @__PURE__ */ jsx("span", {
                className: "absolute right-3 top-[40px] transform -translate-y-1/2 cursor-pointer text-gray-600",
                onClick: () => setShowConfirmPassword((prev) => !prev),
                children: /* @__PURE__ */ jsx("img", {
                  src: showConfirmPassword ? eyeOff : eye,
                  width: 20
                })
              }), formErrors.confirmPassword && /* @__PURE__ */ jsx("p", {
                className: "text-red-500 text-sm",
                children: formErrors.confirmPassword
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center pt-6 gap-2",
              children: [/* @__PURE__ */ jsx("input", {
                type: "checkbox",
                name: "terms",
                className: "cursor-pointer",
                checked: terms,
                onChange: handleChange
              }), /* @__PURE__ */ jsxs("span", {
                className: "text-sm flex gap-0.5 md:gap-1",
                children: ["I agree to all the ", /* @__PURE__ */ jsx("p", {
                  className: "text-red-500",
                  children: "Terms"
                }), " and", " ", /* @__PURE__ */ jsx("p", {
                  className: "text-red-500",
                  children: "Privacy Policies"
                })]
              })]
            }), formErrors.terms && /* @__PURE__ */ jsx("p", {
              className: "text-red-500 text-sm",
              children: formErrors.terms
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              className: "mt-10 text-white bg-blue-600 py-3 w-full rounded-sm cursor-pointer",
              children: "Create Account"
            }), /* @__PURE__ */ jsxs("span", {
              className: "text-center flex pt-5 justify-center",
              children: ["Already have an account?  ", /* @__PURE__ */ jsx("a", {
                href: "/login",
                className: "text-red-500",
                children: "Log in"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center my-4",
              children: [/* @__PURE__ */ jsx("div", {
                className: "flex-grow h-px bg-gray-300"
              }), /* @__PURE__ */ jsx("span", {
                className: "mx-4 text-gray-500",
                children: "or"
              }), /* @__PURE__ */ jsx("div", {
                className: "flex-grow h-px bg-gray-300"
              })]
            })]
          }), /* @__PURE__ */ jsxs("button", {
            className: "cursor-pointer border border-gray-500 py-2 w-full rounded-sm flex justify-center mb-10",
            onClick: handleGoogleSignup,
            children: [/* @__PURE__ */ jsx("img", {
              src: gmail,
              alt: "",
              height: 20,
              width: 20
            }), "   Sign up with Google"]
          })]
        })]
      })]
    })
  });
};
const signup = withComponentProps(Signup);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: signup
}, Symbol.toStringTag, { value: "Module" }));
const forgotPasswordImage = "/assets/forgotPassword-B8obqiWX.png";
const back = "data:image/svg+xml,%3csvg%20width='4'%20height='7'%20viewBox='0%200%204%207'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3.14848%205.86165L0.527344%203.24052L3.14848%200.619385'%20stroke='%23313131'%20stroke-width='0.582474'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    document.title = "Forgot Password";
  }, []);
  const isValidEmail = (email2) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email2.trim());
  };
  const handleFormSubmit = async (e) => {
    var _a, _b;
    e.preventDefault();
    if (!email.trim()) {
      toast.dismiss();
      toast.error("Email is required.");
      return;
    }
    if (!isValidEmail(email)) {
      toast.dismiss();
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await forgotPassword$1({
        email
      });
      toast.dismiss();
      toast.success("A Verification code has been sent to your email. It will expire in 5 minutes");
      setEmail("");
      navigate("/verifyCode", {
        state: {
          email
        }
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      const errorMessage = ((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || (error == null ? void 0 : error.message) || "An unexpected error occurred. Please try again later.";
      toast.dismiss();
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  return /* @__PURE__ */ jsx("div", {
    className: "px-10 md:px-32 py-10 md:py-20 lg:py-10 h-screen",
    children: /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("img", {
        src: Logo,
        alt: "",
        height: "30px",
        width: "30px"
      }), /* @__PURE__ */ jsxs("div", {
        className: " flex items-start justify-between ",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "pt-10 md:pt-30 w-[90vw] lg:w-[550px]",
          children: [/* @__PURE__ */ jsxs("a", {
            href: "/login",
            className: "flex gap-2 pl-2 pb-4 text-sm",
            children: [/* @__PURE__ */ jsx("img", {
              src: back,
              alt: "",
              width: 10,
              height: 10
            }), "Back to login"]
          }), /* @__PURE__ */ jsx("h1", {
            className: " text-2xl md:text-5xl font-bold pb-3.5 md:pt-10 xl:pt-0",
            children: "Forgot your password?"
          }), /* @__PURE__ */ jsx("p", {
            className: "font-light text-gray-500 pt-5",
            children: "Don’t worry, happens to all of us. Enter your email below to recover your password"
          }), /* @__PURE__ */ jsxs("form", {
            onSubmit: handleFormSubmit,
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex flex-col pt-5",
              children: /* @__PURE__ */ jsx("input", {
                value: email,
                onChange: handleEmailChange,
                type: "text",
                className: "border border-gray-500 rounded-sm h-10 px-2",
                placeholder: "Email"
              })
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              disabled: loading,
              className: `cursor-pointer mt-10 text-white bg-blue-600 py-3 w-full rounded-sm ${loading ? "bg-blue-400" : "bg-blue-600"}
                  transition-colors duration-200 ease-in-out`,
              children: loading ? "Verifying..." : "Verify"
            })]
          })]
        }), /* @__PURE__ */ jsx("img", {
          src: forgotPasswordImage,
          alt: "login page",
          className: "pb-20 hidden xl:block",
          style: {
            height: "calc(100vh - 80px)"
          }
        })]
      })]
    })
  });
};
const forgotPassword = withComponentProps(ForgotPassword);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: forgotPassword
}, Symbol.toStringTag, { value: "Module" }));
const VerifyCode = () => {
  var _a;
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const email = (_a = location.state) == null ? void 0 : _a.email;
  useEffect(() => {
    if (!email) {
      toast.dismiss();
      toast.error("No email found. Please request a new code.");
      navigate("/forgotPassword");
    }
  }, [email, navigate]);
  useEffect(() => {
    document.title = "Verify Code";
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || code.length < 6) {
      toast.dismiss();
      toast.error("Please enter a valid verification code.");
      return;
    }
    setLoading(true);
    try {
      await verifyCode$1({
        email,
        code
      });
      toast.dismiss();
      toast.success("Code verified successfully! Please set a new password");
      setCode("");
      navigate("/setPassword", {
        state: {
          email,
          code
        }
      });
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", {
    className: "px-10 lg:px-32 py-10 md:py-20 lg:py-10 h-screen",
    children: /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("img", {
        src: Logo,
        alt: "Company Logo",
        height: 30,
        width: 30
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex items-start justify-between",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "pt-10 md:pt-30 w-[90vw] lg:w-[550px]",
          children: [/* @__PURE__ */ jsxs("a", {
            href: "/login",
            className: "flex gap-2 pl-2 pb-4 text-sm",
            children: [/* @__PURE__ */ jsx("img", {
              src: back,
              alt: "Back",
              width: 10,
              height: 10
            }), "Back to login"]
          }), /* @__PURE__ */ jsx("h1", {
            className: "text-2xl md:text-5xl font-bold pb-5 md:pt-10 xl:pt-0",
            children: "Verify Code"
          }), /* @__PURE__ */ jsx("p", {
            className: "font-light text-gray-500 pt-5",
            children: "An authentication code has been sent to your email."
          }), /* @__PURE__ */ jsxs("form", {
            onSubmit: handleSubmit,
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex flex-col pt-5",
              children: /* @__PURE__ */ jsx("input", {
                type: "text",
                inputMode: "numeric",
                pattern: "\\d{4,6}",
                maxLength: 6,
                required: true,
                className: "border border-gray-500 rounded-sm h-10 px-2",
                placeholder: "Enter code",
                value: code,
                onChange: (e) => setCode(e.target.value)
              })
            }), /* @__PURE__ */ jsxs("span", {
              className: "flex pt-2 text-sm",
              children: ["Didn’t receive a code? ", /* @__PURE__ */ jsx("a", {
                href: "/forgotPassword",
                className: "text-red-500",
                children: "Resend"
              })]
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              disabled: loading,
              className: `mt-10 w-full py-3 rounded-sm text-white 
                  ${loading ? "bg-blue-400" : "bg-blue-600"}
                  ${loading ? "cursor-not-allowed" : "cursor-pointer "}
                  transition-colors duration-200 ease-in-out`,
              children: loading ? "Verifying..." : "Verify"
            })]
          })]
        }), /* @__PURE__ */ jsx("img", {
          src: LoginImage,
          alt: "Verification Illustration",
          className: "pb-20 hidden xl:block",
          style: {
            height: "calc(100vh - 80px)"
          }
        })]
      })]
    })
  });
};
const verifyCode = withComponentProps(VerifyCode);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: verifyCode
}, Symbol.toStringTag, { value: "Module" }));
const SetPassword = () => {
  var _a, _b;
  useEffect(() => {
    document.title = "Set New Password";
  }, []);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const email = (_a = location.state) == null ? void 0 : _a.email;
  const code = (_b = location.state) == null ? void 0 : _b.code;
  useEffect(() => {
    if (!email || !code) {
      toast.dismiss();
      toast.error("Access denied. Please start the password reset process again.");
      navigate("/forgotPassword");
    }
  }, [email, code, navigate]);
  const validate = () => {
    const errors2 = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!newPassword) {
      errors2.newPassword = "Password is required";
    } else if (!passwordRegex.test(newPassword)) {
      errors2.newPassword = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
    }
    if (!confirmNewPassword) {
      errors2.confirmNewPassword = "Please confirm your password";
    } else if (newPassword !== confirmNewPassword) {
      errors2.confirmNewPassword = "Passwords do not match";
    }
    return errors2;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      await resetPassword({
        email,
        code,
        newPassword
      });
      toast.dismiss();
      toast.success("Password reset successfully. Confirmation sent to your email.");
      navigate("/login");
    } catch (error) {
      const message = (error == null ? void 0 : error.message) || "Something went wrong";
      toast.dismiss();
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", {
    className: "px-10 lg:px-32 py-10 md:py-20 lg:py-10 h-screen",
    children: /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx("img", {
        src: Logo,
        alt: "logo",
        height: "30px",
        width: "30px"
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex items-start justify-between",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "pt-10 md:pt-30 w-[90vw] lg:w-[550px]",
          children: [/* @__PURE__ */ jsxs("a", {
            href: "/login",
            className: "flex gap-2 pl-2 pb-4 text-sm",
            children: [/* @__PURE__ */ jsx("img", {
              src: back,
              alt: "Back",
              width: 10,
              height: 10
            }), "Back to login"]
          }), /* @__PURE__ */ jsx("h1", {
            className: "text-5xl font-bold pb-3.5",
            children: "Set a password"
          }), /* @__PURE__ */ jsx("p", {
            className: "font-light text-gray-500 pt-5",
            children: "Your previous password has been reset. Please set a new password for your account."
          }), /* @__PURE__ */ jsxs("form", {
            onSubmit: handleSubmit,
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex flex-col pt-5 relative",
              children: [/* @__PURE__ */ jsx("input", {
                type: showNewPassword ? "text" : "password",
                value: newPassword,
                onChange: (e) => setNewPassword(e.target.value),
                className: "border border-gray-500 rounded-sm h-10 px-2",
                placeholder: "Password"
              }), /* @__PURE__ */ jsx("span", {
                className: "absolute right-3 top-[40px] transform -translate-y-1/2 cursor-pointer text-gray-600",
                onClick: () => setShowNewPassword((prev) => !prev),
                children: showNewPassword ? /* @__PURE__ */ jsx("img", {
                  src: eyeOff,
                  width: 20
                }) : /* @__PURE__ */ jsx("img", {
                  src: eye,
                  width: 20
                })
              }), errors.newPassword && /* @__PURE__ */ jsx("p", {
                className: "text-red-500 text-sm mt-1",
                children: errors.newPassword
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col pt-5 relative",
              children: [/* @__PURE__ */ jsx("input", {
                type: showConfirmNewPassword ? "text" : "password",
                value: confirmNewPassword,
                onChange: (e) => setConfirmNewPassword(e.target.value),
                className: "border border-gray-500 rounded-sm h-10 px-2",
                placeholder: "Confirm Password"
              }), /* @__PURE__ */ jsx("span", {
                className: "absolute right-3 top-[40px] transform -translate-y-1/2 cursor-pointer text-gray-600",
                onClick: () => setShowConfirmNewPassword((prev) => !prev),
                children: showConfirmNewPassword ? /* @__PURE__ */ jsx("img", {
                  src: eyeOff,
                  width: 20
                }) : /* @__PURE__ */ jsx("img", {
                  src: eye,
                  width: 20
                })
              }), errors.confirmNewPassword && /* @__PURE__ */ jsx("p", {
                className: "text-red-500 text-sm mt-1",
                children: errors.confirmNewPassword
              })]
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              disabled: loading,
              className: `mt-10 w-full py-3 rounded-sm text-white 
                  ${loading ? "bg-blue-400" : "bg-blue-600"}
                  ${loading ? "cursor-not-allowed" : "cursor-pointer "}
                  transition-colors duration-200 ease-in-out`,
              children: loading ? "Submitting..." : "Set Password"
            })]
          })]
        }), /* @__PURE__ */ jsx("img", {
          src: forgotPasswordImage,
          alt: "login page",
          className: "pb-20 hidden xl:block",
          style: {
            height: "calc(100vh - 80px)"
          }
        })]
      })]
    })
  });
};
const setPassword = withComponentProps(SetPassword);
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: setPassword
}, Symbol.toStringTag, { value: "Module" }));
function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();
  if (loading) return /* @__PURE__ */ jsx(Loader, {});
  return user ? children : /* @__PURE__ */ jsx(Navigate, { to: "/login", replace: true });
}
const ProtectedUserProfile = withComponentProps(function ProtectedUserProfile2() {
  return /* @__PURE__ */ jsx(ProtectedRoute, {
    children: /* @__PURE__ */ jsx(UserProfile, {})
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProtectedUserProfile
}, Symbol.toStringTag, { value: "Module" }));
const OAuthLoading = withComponentProps(function OAuthLoading2() {
  const {
    fetchUser
  } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      await fetchUser();
      navigate("/userProfile", {
        replace: true
      });
    };
    checkAuth();
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "h-screen flex flex-col justify-center items-center bg-gray-50 text-gray-700",
    children: [/* @__PURE__ */ jsx(Loader2, {
      className: "animate-spin w-12 h-12 text-blue-600 mb-4"
    }), /* @__PURE__ */ jsx("p", {
      className: "text-lg font-medium",
      children: "Logging you in with Google..."
    }), /* @__PURE__ */ jsx("p", {
      className: "text-sm text-gray-500 mt-2",
      children: "Please wait, redirecting you to your profile."
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: OAuthLoading
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CHmgU2DK.js", "imports": ["/assets/chunk-DQRVZFIR-D7VV7TLo.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-Bo8RQ3fL.js", "imports": ["/assets/chunk-DQRVZFIR-D7VV7TLo.js", "/assets/auth-BVyxVugp.js", "/assets/index-CKk8P0yu.js", "/assets/authStore-D97feIYO.js"], "css": ["/assets/root-OJEi43Cx.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BYvbNHjW.js", "imports": ["/assets/auth-BVyxVugp.js", "/assets/chunk-DQRVZFIR-D7VV7TLo.js", "/assets/login-CssUzStZ.js", "/assets/authStore-D97feIYO.js", "/assets/Loader-sp7Eh6iv.js", "/assets/userProfile-DY_EI3f-.js", "/assets/logo-lY71twTc.js", "/assets/login-C8Y_XXD2.js", "/assets/google-Bk_u_M2e.js", "/assets/index-CKk8P0yu.js", "/assets/eye-off-DSQ7H8ow.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login/PublicLogin": { "id": "routes/login/PublicLogin", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/PublicLogin-BclurW31.js", "imports": ["/assets/auth-BVyxVugp.js", "/assets/chunk-DQRVZFIR-D7VV7TLo.js", "/assets/authStore-D97feIYO.js", "/assets/Loader-sp7Eh6iv.js", "/assets/login-CssUzStZ.js", "/assets/logo-lY71twTc.js", "/assets/login-C8Y_XXD2.js", "/assets/google-Bk_u_M2e.js", "/assets/index-CKk8P0yu.js", "/assets/eye-off-DSQ7H8ow.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/signup/signup": { "id": "routes/signup/signup", "parentId": "root", "path": "signup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/signup-Bwep3fZs.js", "imports": ["/assets/auth-BVyxVugp.js", "/assets/chunk-DQRVZFIR-D7VV7TLo.js", "/assets/logo-lY71twTc.js", "/assets/google-Bk_u_M2e.js", "/assets/eye-off-DSQ7H8ow.js", "/assets/index-CKk8P0yu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/forgotPassword/forgotPassword": { "id": "routes/forgotPassword/forgotPassword", "parentId": "root", "path": "forgotPassword", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/forgotPassword-CkB6Jc-9.js", "imports": ["/assets/auth-BVyxVugp.js", "/assets/chunk-DQRVZFIR-D7VV7TLo.js", "/assets/logo-lY71twTc.js", "/assets/forgotPassword-DBpDdn6E.js", "/assets/back-B7fPkrzd.js", "/assets/index-CKk8P0yu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/verifyCode/verifyCode": { "id": "routes/verifyCode/verifyCode", "parentId": "root", "path": "verifyCode", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/verifyCode-LAYtyucE.js", "imports": ["/assets/auth-BVyxVugp.js", "/assets/chunk-DQRVZFIR-D7VV7TLo.js", "/assets/logo-lY71twTc.js", "/assets/login-C8Y_XXD2.js", "/assets/back-B7fPkrzd.js", "/assets/index-CKk8P0yu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/setPassword/setPassword": { "id": "routes/setPassword/setPassword", "parentId": "root", "path": "setPassword", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/setPassword-D7qAZWrV.js", "imports": ["/assets/auth-BVyxVugp.js", "/assets/chunk-DQRVZFIR-D7VV7TLo.js", "/assets/logo-lY71twTc.js", "/assets/forgotPassword-DBpDdn6E.js", "/assets/eye-off-DSQ7H8ow.js", "/assets/back-B7fPkrzd.js", "/assets/index-CKk8P0yu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/userProfile/ProtectedUserProfile": { "id": "routes/userProfile/ProtectedUserProfile", "parentId": "root", "path": "userProfile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/ProtectedUserProfile-JHLROosU.js", "imports": ["/assets/auth-BVyxVugp.js", "/assets/chunk-DQRVZFIR-D7VV7TLo.js", "/assets/authStore-D97feIYO.js", "/assets/Loader-sp7Eh6iv.js", "/assets/userProfile-DY_EI3f-.js", "/assets/logo-lY71twTc.js", "/assets/index-CKk8P0yu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/OAuthLoading": { "id": "routes/OAuthLoading", "parentId": "root", "path": "auth/loading", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/OAuthLoading-jdVq0dAI.js", "imports": ["/assets/auth-BVyxVugp.js", "/assets/chunk-DQRVZFIR-D7VV7TLo.js", "/assets/authStore-D97feIYO.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-e575cccd.js", "version": "e575cccd", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/login/PublicLogin": {
    id: "routes/login/PublicLogin",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/signup/signup": {
    id: "routes/signup/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/forgotPassword/forgotPassword": {
    id: "routes/forgotPassword/forgotPassword",
    parentId: "root",
    path: "forgotPassword",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/verifyCode/verifyCode": {
    id: "routes/verifyCode/verifyCode",
    parentId: "root",
    path: "verifyCode",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/setPassword/setPassword": {
    id: "routes/setPassword/setPassword",
    parentId: "root",
    path: "setPassword",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/userProfile/ProtectedUserProfile": {
    id: "routes/userProfile/ProtectedUserProfile",
    parentId: "root",
    path: "userProfile",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/OAuthLoading": {
    id: "routes/OAuthLoading",
    parentId: "root",
    path: "auth/loading",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};

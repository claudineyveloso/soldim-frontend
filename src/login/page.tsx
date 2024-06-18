"use client";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };
  return (
    <section id="content" className="content">
      <div className="content__boxed w-100 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="content__wrap">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <div className="text-center">
                <h1 className="h3">Soldim Login</h1>
                <p>Faça login em sua conta</p>
              </div>

              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Usuário"
                    autoFocus={true}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Senha"
                  />
                </div>

                <div className="form-check">
                  <input
                    id="_dm-loginCheck"
                    className="form-check-input"
                    type="checkbox"
                  />
                  <label htmlFor="_dm-loginCheck" className="form-check-label">
                    Remember me
                  </label>
                </div>

                <div className="d-grid mt-5">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Entrar
                  </button>
                </div>
              </form>

              <div className="d-flex justify-content-between gap-md-5 mt-4">
                <a
                  href="./front-pages-password-reminder.html"
                  className="btn-link text-decoration-none"
                >
                  Esqueceu sua senha ?
                </a>
                <a
                  href="./front-pages-register.html"
                  className="btn-link text-decoration-none"
                >
                  Criar uma nova conta
                </a>
              </div>

              <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <h5 className="m-0">Login com</h5>

                <div className="ms-3">
                  <a
                    href="#"
                    className="btn btn-sm btn-icon btn-hover btn-primary text-inherit"
                  >
                    <i className="demo-psi-facebook fs-5"></i>
                  </a>
                  <a
                    href="#"
                    className="btn btn-sm btn-icon btn-hover btn-info text-inherit"
                  >
                    <i className="demo-psi-twitter fs-5"></i>
                  </a>
                  <a
                    href="#"
                    className="btn btn-sm btn-icon btn-hover btn-danger text-inherit"
                  >
                    <i className="demo-psi-google-plus fs-5"></i>
                  </a>
                  <a
                    href="#"
                    className="btn btn-sm btn-icon btn-hover btn-warning text-inherit"
                  >
                    <i className="demo-psi-instagram fs-5"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginPage;

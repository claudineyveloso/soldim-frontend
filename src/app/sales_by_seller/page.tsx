import Link from "next/link";
import { AuthWrapper } from "@/components/AuthWrapper";

const SalesBySeller = () => {
  return (
    <>
      <AuthWrapper>
        <section id="content" className="content">
          <div className="content__header content__boxed overlapping">
            <div className="content__wrap">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Produtos
                  </li>
                </ol>
              </nav>
              <h1 className="page-title mb-0 mt-2">
                Lista de vendas de produtos por vendedor
              </h1>
              <p className="lead">
                Visualizar opções de vendas de produtos por vendedor cadastrados
                no sistema.
              </p>
            </div>
          </div>
        </section>
      </AuthWrapper>
    </>
  );
};
export default SalesBySeller;

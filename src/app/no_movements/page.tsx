import Link from "next/link";
const NoMovements = () => {
  return (
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
            Lista de produtos sem movimentação
          </h1>
          <p className="lead">
            Visualizar opções de produtos sem movimentação cadastrados no
            sistema.
          </p>
        </div>
      </div>
    </section>
  );
};
export default NoMovements;

"use client";
import React, { useState, useEffect, useRef } from "react";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Link from "next/link";
import { AuthWrapper } from "@/components/AuthWrapper";
import axios from "axios";
import { fetchDrafts } from "@/services/draftService";

interface Product {
  codigo: string;
  nome: string;
  preco: string;
  unidade: string;
  tipo: string;
  situacao: string;
  condicao: string;
  formato: string;
}

const fetchProductsInWeb = (searchTerm: string) => {
  // Lógica para buscar produtos
  console.log("Searching for:", searchTerm);
  // Adicione a lógica de busca aqui
};

const DraftProduct = () => {
  const [results, setResults] = useState<any[]>([]);
  const [description, setDescription] = useState("Resultado");
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [requestTime, setRequestTime] = useState<number | null>(null);

  const [product, setProduct] = useState<Product>({
    codigo: "",
    nome: "",
    preco: "",
    unidade: "Un",
    tipo: "P",
    situacao: "A",
    condicao: "0",
    formato: "S",
  });

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleProductChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const getDrafts = async () => {
    try {
      const data = await fetchDrafts();
      console.log("Fetched drafts result:", data); // Verifique os dados recebidos
      if (data && Array.isArray(data)) {
        setResults(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Failed to fetch drafts:", error);
    }
  };

  useEffect(() => {
    getDrafts();
  }, []);

  useEffect(() => {
    if (results.length === 0 || !containerRef.current) return;

    const container = containerRef.current;

    // Limpar o contêiner antes de renderizar a tabela
    container.innerHTML = "";

    console.log("Rendering grid with results:", results);

    const grid = new Grid({
      className: {
        table: "table table-striped",
        thead: "thead-dark",
      },
      columns: [
        {
          name: "",
          width: "80px",
          formatter: (cell: string) => {
            const imageUrl = cell ? cell : "/assets/img/moldura.png"; // Usar a URL da imagem ou a imagem padrão
            return h("img", {
              src: imageUrl,
              width: 50,
              height: 50,
              onError: (e: any) => {
                e.target.src = "/assets/img/moldura.png";
              }, // Fallback se a imagem falhar
            });
          },
        },
        {
          name: "Descrição",
          formatter: (cell: string, row: any) => {
            console.log("Row data:", row.cells); // Verifique todos os dados da linha
            const source = row.cells[5]
              ? row.cells[5].data
              : "Fonte desconhecida"; // Verifique se row.cells[5] existe
            const link = row.cells[6] ? row.cells[6].data : "#"; // Verifique se row.cells[6] existe para o link
            return h("div", {}, [
              h(
                "a",
                { href: link, target: "_blank", rel: "noopener noreferrer" },
                cell,
              ),
              h("br", {}),
              h("small", { className: "text-body-secondary" }, source), // Adicionar o campo source
            ]);
          },
        },
        { name: "Preço", width: "100px" },
        { name: "Promoção", width: "120px" },
        { name: "Criado em:", width: "120px" },
        { name: "Source", hidden: true }, // Coluna oculta para armazenar a fonte
        { name: "Link", hidden: true }, // Coluna oculta para armazenar o link
        { name: "ID", hidden: true }, // Coluna oculta para armazenar o ID
        {
          name: "Ações",
          width: "110px",
          formatter: (_, row) => {
            const desc = row.cells[1] ? String(row.cells[1].data) : ""; // Converter descrição para string
            const resultId = row.cells[7] ? String(row.cells[7].data) : ""; // Converter resultId para string
            console.log("Result ID:", resultId); // Log do ID do usuário
            const editButton = h(
              "a",
              {
                herf: "#",
                className: "btn btn-icon btn-sm btn-hover bg-body-tertiary",
                onClick: () => {
                  console.log("Edit clicked for user:", row);
                  handleEditClick(row);
                },
              },
              h("i", { className: "demo-pli-pen-5 fs-5" }),
            );
            const deleteButton = h(
              "a",
              {
                href: "#",
                className: "btn btn-icon btn-sm btn-hover btn-danger",
                onClick: () => {
                  console.log("Delete clicked for result:", resultId);
                  deleteResult(resultId);
                },
              },
              h("i", { className: "demo-pli-trash fs-5" }),
            );
            return h("div", {}, [editButton, deleteButton]);
          },
        },
      ],
      sort: true,
      data: results.map((result) => {
        console.log("Result data:", result);
        return [
          result.image_url ? String(result.image_url) : "", // Garantir que todos os valores sejam strings
          result.description ? String(result.description) : "",
          result.price !== undefined
            ? result.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            : "",
          result.promotion !== undefined
            ? result.promotion
              ? "Sim"
              : "Não"
            : "",
          result.created_at
            ? new Date(result.created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "",
          result.source ? String(result.source) : "",
          result.link ? String(result.link) : "#", // Adicionar o link
          result.id ? String(result.id) : "", // Adicionar o ID do usuário como string
        ];
      }),
    });

    grid.render(container);

    return () => {
      // Cleanup function to remove the grid instance
      grid.destroy();
    };
  }, [results]);

  const newSearch = (description: string) => {
    console.log("search with the description:", description);
    // Implementar lógica para editar
  };

  const deleteResult = (id: string) => {
    console.log("Delete result with ID:", id);
    // Implementar lógica para excluir resultado
  };

  const draftProduct = (id: string) => {
    console.log("Draft product with ID:", id);
    // Implementar lógica para rascunho de produto
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDescription("Aguardando o resultado...");
    const startTime = new Date().getTime();
    fetchProductsInWeb(searchTerm);
    if (containerRef.current) {
      containerRef.current.classList.add("d-none");
    }

    // Chamar a API para criar a busca
    try {
      const response = await axios.post("http://localhost:8080/create_draft", {
        description: searchTerm,
      });
      console.log("Draft created:", response.data);

      await getDrafts(); // Atualizar os resultados após a criação da busca
    } catch (error) {
      console.error("Error creating search:", error);
    } finally {
      const endTime = new Date().getTime(); // Marca o fim do tempo
      const duration = (endTime - startTime) / 1000; // Calcula a duração em segundos
      setRequestTime(duration);
      setDescription("Resultado");
      if (containerRef.current) {
        containerRef.current.classList.remove("d-none");
      }
    }
  };

  const handleSaveProduct = async (product: Product) => {
    console.log("Product data:", product);

    try {
      const response = await axios.post("http://localhost:8080/create_draft", {
        product_id: product.codigo,
        description: product.nome,
        price: product.preco,
        link: product.unidade,
        image_url: product.formato,
        source: product.tipo,
        condition: product.condicao,
      });

      if (response.status === 200) {
        console.log("Draft created successfully:", response.data);
        // Adicione lógica adicional aqui, como atualização de
        // Adicione lógica adicional aqui, como atualização de estado ou notificação do usuário
        // Por exemplo, você pode fechar o modal após salvar:
        setModalOpen(false);
        getDrafts(); // Atualizar a lista de rascunhos após salvar o produto
      } else {
        console.error(
          "Failed to create draft:",
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error("Error creating draft:", error);
    }
  };

  const handleEditClick = (rowData: any) => {
    setProduct({
      codigo: rowData.cells[7].data, // Ajuste o índice conforme necessário
      nome: rowData.cells[1].data,
      preco: rowData.cells[2].data,
      unidade: product.unidade, // Mantém a unidade do estado atual, pode ser ajustada se necessário
      tipo: product.tipo, // Mantém o tipo do estado atual, pode ser ajustado se necessário
      situacao: "A", // Ajuste conforme necessário
      condicao: product.condicao, // Mantém a condição do estado atual, pode ser ajustada se necessário
      formato: rowData.cells[4].data,
    });
    setModalOpen(true);
  };

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
                    Rascunhos de Produtos
                  </li>
                </ol>
              </nav>
              <h1 className="page-title mb-0 mt-2">
                Lista de rascunho de produtos
              </h1>
              <p className="lead">
                Visualizar, adicionar, editar e excluir coletas cadastrados no
                sistema.
              </p>
            </div>
          </div>
          <div className="content__boxed">
            <div className="content__wrap">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="mb-3">
                    <h2>Rascunho de Produtos</h2>
                    <p className="m-0">
                      Utilize as ferramentas de busca e filtro para encontrar
                      rascunhos específicos e gerenciar seus perfis de forma
                      eficiente
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-md-8 offset-md-2 mb-3">
                      <form
                        className="searchbox input-group"
                        onSubmit={handleSubmit}
                      >
                        <input
                          className="searchbox__input form-control form-control-lg"
                          type="search"
                          placeholder="Localizar um rascunho..."
                          aria-label="Search"
                          value={searchTerm}
                          onChange={handleSearchTermChange}
                        />
                        <div className="searchbox__btn-group">
                          <button
                            className="searchbox__btn btn btn-icon bg-transparent shadow-none border-0 btn-sm"
                            type="submit"
                          >
                            <i className="demo-pli-magnifi-glass"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className={`modal fade ${isModalOpen ? "show" : ""}`}
                      id="modalDraft"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden={!isModalOpen}
                      style={{ display: isModalOpen ? "block" : "none" }}
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              Cadastrar novo produto
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => setModalOpen(false)}
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div className="col-md-12 mb-3">
                              <div className="card h-100 card-none-box-shadow">
                                <div className="card-body">
                                  <h5 className="card-title">Dados básicos</h5>

                                  <form className="row g-3">
                                    <div className="col-12">
                                      <label
                                        htmlFor="nome"
                                        className="form-label"
                                      >
                                        Nome
                                      </label>
                                      <input
                                        id="nome"
                                        name="nome"
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={product.nome}
                                        onChange={handleProductChange}
                                      />
                                    </div>

                                    <div className="col-md-6">
                                      <label
                                        htmlFor="codigo"
                                        className="form-label"
                                      >
                                        Código (SKU)
                                      </label>
                                      <input
                                        id="codigo"
                                        name="codigo"
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={product.codigo}
                                        onChange={handleProductChange}
                                      />
                                    </div>

                                    <div className="col-md-6">
                                      <label
                                        htmlFor="preco"
                                        className="form-label"
                                      >
                                        Preço venda
                                      </label>
                                      <input
                                        id="preco"
                                        name="preco"
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={product.preco}
                                        onChange={handleProductChange}
                                      />
                                    </div>

                                    <div className="col-md-6">
                                      <label
                                        htmlFor="unidade"
                                        className="form-label"
                                      >
                                        Unidade
                                      </label>
                                      <input
                                        id="unidade"
                                        name="unidade"
                                        type="text"
                                        className="form-control"
                                        value={product.unidade}
                                        onChange={handleProductChange}
                                      />
                                    </div>

                                    <div className="col-md-6">
                                      <label
                                        htmlFor="formato"
                                        className="form-label"
                                      >
                                        Formato
                                      </label>
                                      <select
                                        id="formato"
                                        name="formato"
                                        className="form-select"
                                        value={product.formato}
                                        onChange={handleProductChange}
                                      >
                                        <option value="S">
                                          Simples ou com variação
                                        </option>
                                        <option value="E">
                                          Com composição
                                        </option>
                                      </select>
                                    </div>

                                    <div className="col-md-6">
                                      <label
                                        htmlFor="tipo"
                                        className="form-label"
                                      >
                                        Tipo
                                      </label>
                                      <select
                                        id="tipo"
                                        name="tipo"
                                        className="form-select"
                                        value={product.tipo}
                                        onChange={handleProductChange}
                                      >
                                        <option value="P">Produto</option>
                                        <option value="S">Serviço</option>
                                      </select>
                                    </div>

                                    <div className="col-md-6">
                                      <label
                                        htmlFor="condicao"
                                        className="form-label"
                                      >
                                        Condição
                                      </label>
                                      <select
                                        id="condicao"
                                        name="condicao"
                                        className="form-select"
                                        value={product.condicao}
                                        onChange={handleProductChange}
                                      >
                                        <option value="0">
                                          Não especificado
                                        </option>
                                        <option value="1">Novo</option>
                                        <option value="2">Usado</option>
                                        <option value="3">
                                          Recondicionado
                                        </option>
                                      </select>
                                    </div>

                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        onClick={() => setModalOpen(false)}
                                      >
                                        Fechar
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() =>
                                          handleSaveProduct(product)
                                        }
                                      >
                                        Salvar
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="h4">{description}</h3>
                  <div id="_dm-gridjsSorting" ref={containerRef}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AuthWrapper>
    </>
  );
};

export default DraftProduct;

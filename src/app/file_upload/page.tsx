import Link from "next/link";

const FileUpload = () => {
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
                Upload de arquivos
              </li>
            </ol>
          </nav>
          <h1 className="page-title mb-0 mt-2">Upload de arquivo</h1>
          <p className="lead">
            Transmissão de dados de um arquivo para o sistemas.
          </p>
        </div>
      </div>
      <div className="content__boxed">
        <div className="content__wrap">
          <div className="card mb-3">
            <div className="card-body">
              <div>
                <h2>Upload</h2>
                <p className="m-0">
                  pré-visualizações de imagens e mostra boas barras de
                  progresso.
                </p>
              </div>

              <hr />

              <form
                action="#"
                id="_dm-dropzoneSimple"
                className="dropzone bg-light text-center rounded p-5"
              >
                <div className="dz-message m-0">
                  <div className="p-3 text-body-secondary text-opacity-25">
                    <i className="demo-psi-upload-to-cloud display-2"></i>
                  </div>
                  <h4>
                    Arraste e solte um arquivos para fazer upload do arquivo
                  </h4>
                  <p className="text-body-secondary mb-0">
                    ou clique para escolher manualmente
                  </p>
                </div>
                <div className="fallback">
                  <input name="file" type="file" multiple />
                </div>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5>Custom style</h5>
              <p>
                This is a bootstrap theme of Dropzone.js with a completely
                different user experience.
              </p>

              <hr />

              <div className="hstack gap-3">
                <button className="btn btn-primary hstack gap-2 _dm-dropzoneFileButton">
                  <i className="demo-psi-add fs-3"></i>
                  <span className="vr"></span>
                  Adicionar arquivos
                </button>

                <button
                  id="_dm-dropzoneCustomUploadBtn"
                  className="btn btn-success ms-auto"
                  type="submit"
                  disabled
                >
                  Upload
                </button>

                <button
                  id="_dm-dropzoneCustomRemoveBtn"
                  className="btn btn-light"
                  type="reset"
                  disabled
                >
                  Remover todos
                </button>
              </div>

              <div id="_dm-dropzonePreviews" className="mt-4">
                <div id="_dm-dropzoneTemplate" className="border-top">
                  <div className="d-flex align-items-center py-3">
                    <div className="flex-shrink-0">
                      <img className="dz-img rounded" data-dz-thumbnail />
                    </div>

                    <div className="d-flex justify-content-between align-items-center flex-grow-1 ms-3">
                      <div className="">
                        <p className="h5 mb-0" data-dz-name></p>
                        <small data-dz-size></small>
                        <small
                          className="dz-error text-danger"
                          data-dz-errormessage
                        ></small>
                      </div>
                      <div className="flex-shrink-0 d-flex align-items-center flex-row gap-3">
                        <div
                          id="_dm-dropzoneProgress"
                          style={{ width: "100px", opacity: "0" }}
                        >
                          <div
                            className="progress active"
                            role="progressbar"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={0}
                          >
                            <div
                              className="progress-bar bg-success"
                              style={{ width: "0%" }}
                              data-dz-uploadprogress
                            ></div>
                          </div>
                        </div>

                        <button
                          data-dz-remove
                          className="btn btn-icon btn-xs btn-danger rounded-circle dz-cancel"
                        >
                          <i className="demo-psi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FileUpload;

"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Profiles = () => {
  return (
    <section id="content" className="content">
      <div className="content__header content__boxed rounded-0">
        <div className="content__wrap d-md-flex align-items-start hv-outline-parent hv-outline-inherit">
          <figure className="m-0">
            <div className="d-inline-flex align-items-center position-relative pt-xl-3 mb-3">
              <div className="flex-shrink-0">
                <Image
                  className="hv-oc img-xl rounded-circle border"
                  src="/assets/img/claudiney.jpg"
                  alt="thumbnails"
                  width={256}
                  height={256}
                />
              </div>
              <div className="flex-grow-1 ms-4">
                <a href="#" className="h3 btn-link text-body-emphasis">
                  Claudiney Veloso
                </a>
                <p className="m-0">Administrador</p>
                <div className="mt-3 text-reset">
                  <a
                    href="#"
                    className="btn btn-icon btn-hover bg-blue-700 text-white"
                  >
                    <i className="demo-psi-facebook fs-4"></i>
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-hover bg-blue-400 text-white"
                  >
                    <i className="demo-psi-twitter fs-4"></i>
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-hover bg-red text-white"
                  >
                    <i className="demo-psi-google-plus fs-4"></i>
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-hover bg-orange text-white"
                  >
                    <i className="demo-psi-instagram fs-4"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="pb-4">
              <blockquote className="blockquote text-reset">
                <p>
                  Que tal se eu dormir mais um pouco e esquecer toda essa
                  bobagem?
                </p>
              </blockquote>
              <figcaption className="blockquote-footer mb-xl-0">
                Alguém famoso -{" "}
                <cite title="Source Title">Claudiney Veloso</cite>
              </figcaption>
            </div>
          </figure>
          <div className="d-inline-flex justify-content-end pt-xl-5 gap-2 ms-auto">
            <button className="btn btn-light text-nowrap">Editar Perfil</button>
            <button className="btn btn-success text-nowrap">
              Enviar mensagem
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profiles;

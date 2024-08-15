import React, { ChangeEvent, FocusEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormValues } from "@/schemas/userSchema";

interface UserModalProps {
  user: UserFormValues;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: (data: UserFormValues) => void;
  modalRef: React.RefObject<HTMLDivElement>;
  onFocus: (event: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  user,
  onChange,
  onSave,
  modalRef,
  onFocus,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      user_type: "S",
    },
  });

  useEffect(() => {
    setValue("email", user.email);
    setValue("password", user.password);
    setValue("user_type", user.user_type);
  }, [user, setValue]);

  const onSubmit = (data: UserFormValues) => {
    onSave(data);
  };

  return (
    <div className="row">
      <div
        className="modal fade"
        id="modalUser"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cadastrar novo usuário
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="col-md-12 mb-3">
                <div className="card h-100 card-none-box-shadow">
                  <div className="card-body">
                    <h5 className="card-title">Dados básicos</h5>

                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                      <div className="tab-base">
                        <div className="tab-content">
                          <div className="col-12 mb-3">
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                            <input
                              id="email"
                              type="text"
                              className="form-control"
                              autoComplete="off"
                              {...register("email")}
                              onChange={onChange}
                              onFocus={onFocus}
                            />
                            {errors.email && (
                              <div className="text-danger">
                                {errors.email.message}
                              </div>
                            )}
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label htmlFor="password" className="form-label">
                                Senha
                              </label>
                              <input
                                id="password"
                                type="password"
                                className="form-control"
                                autoComplete="off"
                                {...register("password")}
                                onChange={onChange}
                                onFocus={onFocus}
                              />
                              {errors.password && (
                                <div className="text-danger">
                                  {errors.password.message}
                                </div>
                              )}
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="user_type" className="form-label">
                                Tipo do usuário
                              </label>
                              <select
                                id="user_type"
                                className="form-select"
                                {...register("user_type")}
                                onChange={onChange}
                                onFocus={onFocus}
                              >
                                <option value="S">Super Admin</option>
                                <option value="A">Admin</option>
                                <option value="C">Colaborador</option>
                              </select>
                              {errors.user_type && (
                                <div className="text-danger">
                                  {errors.user_type.message}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Fechar
                        </button>
                        <button type="submit" className="btn btn-primary">
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
  );
};

export default UserModal;

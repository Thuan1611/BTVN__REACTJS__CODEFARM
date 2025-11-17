import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./FormTodos.css";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  createData,
  fetchDataDetail,
  updateData,
} from "../../../axios/ListProducts";
import { useAppDispatch } from "../../../hooks/hooks";
import { addTodos, updateTodos } from "../../../store/features/todosSlice";
import { toast } from "react-toastify";
import { ProductSchema } from "../../../schema/ProductSchema";

const FormTodos = () => {
  const navi = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  interface FormInput {
    _id: string | number;
    name: string;
    priority: number;
    dueDate: Date;
    completed: boolean;
    description: string;
  }
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(ProductSchema),
  });
  // Render Chi tiết sản phẩm
  useEffect(() => {
    if (id) {
      const loadData = async () => {
        const { data } = await fetchDataDetail(id);
        reset({
          ...data,
          dueDate: data.dueDate?.slice(0, 10),
        });
      };
      loadData();
    }
  }, [id, reset]);

  //SUBMIT: THÊM HOẶC SỬA
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const payload = {
        ...data,
        dueDate: data.dueDate.toISOString(),
        completed: data.completed ?? false,
      };
      if (!id) {
        console.log("CREATE:", payload);
        await createData(payload);
        dispatch(addTodos(payload));
        toast.success("Thêm thành công");
      } else {
        console.log("UPDATE:", payload);
        await updateData(id, payload);
        dispatch(updateTodos(payload));
        toast.success("Sửa thành công");
      }

      navi("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-todos-container">
      <div className="form-todos-wrapper">
        <div className="form-todos-card">
          {/* Header */}
          <div className="form-todos-header">
            {id ? <h1>📝 Sửa Công Việc </h1> : <h1>📝 Thêm Công Việc </h1>}
            <p>Quản lý công việc của bạn hiệu quả hơn</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="form-todos-form">
            {/* Tên công việc */}
            <div className="form-group">
              <label className="form-label">
                ✏️ Tên Công Việc <span className="required">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="form-input"
                placeholder="Nhập tên công việc..."
              />
              {errors.name && (
                <p className="form-error">
                  <span> {errors.name.message}</span>
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">🎯 Mức Độ Ưu Tiên</label>
              <select
                {...register("priority", { valueAsNumber: true })}
                defaultValue={1}
                className="form-select"
              >
                <option value={1}>🟢 Thấp</option>
                <option value={2}>🟡 Trung bình</option>
                <option value={3}>🔴 Cao</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                📅 Ngày Hết Hạn <span className="required">*</span>
              </label>
              <input
                type="date"
                {...register("dueDate", {
                  required: "Bắt buộc nhập ngày",
                  valueAsDate: true,
                })}
                className="form-input"
              />
              {errors.dueDate && (
                <p className="form-error">
                  <span>{errors.dueDate.message}</span>
                </p>
              )}
            </div>

            {id && (
              <div className="mb-6 flex items-center gap-2">
                <input type="checkbox" {...register("completed")} />
                <label className="form-labe">Completed</label>
              </div>
            )}

            {/* Mô tả */}
            <div className="form-group">
              <label className="form-label">📄 Mô Tả</label>
              <textarea
                {...register("description")}
                className="form-textarea"
                placeholder="Thêm mô tả chi tiết cho công việc..."
              />
            </div>

            {/* Submit button */}
            <button type="submit" className="form-submit">
              {id ? <h1>✨ Sửa Công Việc</h1> : <h1>✨ Thêm Công Việc </h1>}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="form-footer">
          Quản lý công việc thông minh với giao diện hiện đại
        </p>
      </div>
    </div>
  );
};

export default FormTodos;

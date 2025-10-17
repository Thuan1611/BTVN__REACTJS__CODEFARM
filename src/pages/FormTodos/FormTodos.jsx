import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  createData,
  fetchDataDetail,
  updateData,
} from "../../axios/ListProducts";
import "./FormTodos.css";

const FormTodos = () => {
  const navi = useNavigate();
  const { id } = useParams();
  const [dataDetail, setDataDetail] = useState({});
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleDetail = async (id) => {
    const dataDetail = await fetchDataDetail(id);
    setDataDetail(dataDetail);
    return dataDetail;
  };

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        const { data } = await handleDetail(id);
        const formattedDate = data?.dueDate ? data.dueDate.slice(0, 10) : "";
        reset({ ...data, dueDate: formattedDate });
      };
      loadData();
    }
  }, [id, reset]);
  const onSubmit = async (data) => {
    if (!id) {
      const respone = { ...data, completed: false };
      await createData(respone);
    } else {
      await updateData(id, data);
    }
    navi("/");
  };
  return (
    <div className="form-todos-container">
      <div className="form-todos-wrapper">
        <div className="form-todos-card">
          {/* Header */}
          <div className="form-todos-header">
            <h1>📝 Thêm Công Việc Mới</h1>
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
                {...register("name", { required: "Tên công việc là bắt buộc" })}
                className="form-input"
                placeholder="Nhập tên công việc..."
              />
              {errors.name && (
                <p className="form-error">
                  <span>⚠️</span>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Mức độ ưu tiên */}
            <div className="form-group">
              <label className="form-label">🎯 Mức Độ Ưu Tiên</label>
              <select
                {...register("priority")}
                defaultValue="1"
                className="form-select"
              >
                <option value="1">🟢 Thấp</option>
                <option value="2">🟡 Trung bình</option>
                <option value="3">🔴 Cao</option>
              </select>
            </div>

            {/* Ngày hết hạn */}
            <div className="form-group">
              <label className="form-label">
                📅 Ngày Hết Hạn <span className="required">*</span>
              </label>
              <input
                type="date"
                {...register("dueDate", { required: "Bắt buộc nhập ngày" })}
                className="form-input"
              />
              {errors.dueDate && (
                <p className="form-error">
                  <span>⚠️</span>
                  {errors.dueDate.message}
                </p>
              )}
            </div>
            <div className="mb-6 flex items-center gap-2">
              <input type="checkbox" {...register("completed")} />
              <label className="form-labe">Completed</label>
            </div>

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
              ✨ Thêm Công Việc
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

import React from "react";
import "./CourseCard.css";

const CourseCard = ({ course, onEdit, onDelete }) => {
  const {
    id,
    title,
    description,
    instructor,
    duration,
    price,
    category,
    is_active,
    image_url
  } = course;

  return (
    <div className={`course-card ${!is_active ? "inactive" : ""}`}>
      {/* Imagen del curso */}
      {image_url && (
        <div className="course-image">
          <img src={image_url} alt={title} />
        </div>
      )}

      {/* Contenido */}
      <div className="course-content">
        <h3 className="course-title">{title}</h3>

        <p className="course-description">
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>

        <div className="course-details">
          <span className="instructor">Por: {instructor}</span>
          <span className="duration">{duration} horas</span>
          <span className="category">{category}</span>
          <span className="price">${price}</span>
        </div>

        <div className="course-status">
          {is_active ? (
            <span className="status active">Activo</span>
          ) : (
            <span className="status inactive">Inactivo</span>
          )}
        </div>
      </div>

      {/* Botones: solo Editar y Eliminar */}
      <div className="course-actions">
        <button onClick={() => onEdit(id)} className="btn btn-secondary">
          Editar
        </button>

        <button onClick={() => onDelete(id)} className="btn btn-danger">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CourseCard;

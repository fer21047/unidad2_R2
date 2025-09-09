import React, { useState } from 'react';
import { courseService } from '../services/courseService';
import './CourseForm.css'

const CourseForm = ({ onCourseCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    price: '',
    category: '',
    is_active: true
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success | error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' })); // limpia error al cambiar
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!formData.description.trim()) newErrors.description = 'La descripción es obligatoria';
    if (!formData.instructor.trim()) newErrors.instructor = 'El instructor es obligatorio';
    if (!formData.category.trim()) newErrors.category = 'La categoría es obligatoria';
    if (!formData.duration) newErrors.duration = 'La duración es obligatoria';
    else if (isNaN(formData.duration) || parseInt(formData.duration) <= 0)
      newErrors.duration = 'La duración debe ser un número positivo';
    if (!formData.price) newErrors.price = 'El precio es obligatorio';
    else if (isNaN(formData.price) || parseFloat(formData.price) < 0)
      newErrors.price = 'El precio debe ser un número válido';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (!validate()) return;

    setLoading(true);

    try {
      const result = await courseService.createCourse({
        ...formData,
        duration: parseInt(formData.duration),
        price: parseFloat(formData.price)
      });

      if (result.success) {
        setMessage('Curso creado exitosamente!');
        setMessageType('success');
        setFormData({
          title: '',
          description: '',
          instructor: '',
          duration: '',
          price: '',
          category: '',
          is_active: true
        });
        setErrors({});
        if (onCourseCreated) onCourseCreated();
      } else {
        setMessage('Error al crear el curso: ' + result.error);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error al conectar con el backend');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-form">
      <h2>Crear Nuevo Curso</h2>
      <p className="subtitle">
        Completa la información requerida para agregar un nuevo curso al catálogo
      </p>
      
      <form onSubmit={handleSubmit}>
        {/* Título */}
        <div className="form-group">
          <label htmlFor="title">Título del Curso</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Introduce el título del curso" 
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        
        {/* Descripción */}
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Describe el contenido y los objetivos del curso" 
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        
        <div className="form-row">
          {/* Instructor */}
          <div className="form-group">
            <label htmlFor="instructor">Instructor</label>
            <input 
              type="text" 
              id="instructor" 
              name="instructor" 
              value={formData.instructor} 
              onChange={handleChange} 
              placeholder="Nombre del instructor" 
            />
            {errors.instructor && <span className="error">{errors.instructor}</span>}
          </div>
          
          {/* Categoría */}
          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <input 
              type="text" 
              id="category" 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              placeholder="Categoría del curso" 
            />
            {errors.category && <span className="error">{errors.category}</span>}
          </div>
        </div>
        
        <div className="form-row">
          {/* Duración */}
          <div className="form-group">
            <label htmlFor="duration">Duración (horas)</label>
            <input 
              type="number" 
              id="duration" 
              name="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              placeholder="Ej: 20" 
            />
            {errors.duration && <span className="error">{errors.duration}</span>}
          </div>
          
          {/* Precio */}
          <div className="form-group">
            <label htmlFor="price">Precio ($)</label>
            <input 
              type="text" 
              id="price" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              placeholder="Ej: 49.99" 
            />
            {errors.price && <span className="error">{errors.price}</span>}
          </div>
        </div>
        
        {/* Checkbox */}
        <div className="form-group checkbox-container">
          <div className="checkbox-label">
            <input 
              type="checkbox" 
              id="is_active" 
              name="is_active" 
              checked={formData.is_active} 
              onChange={handleChange} 
            />
            <label htmlFor="is_active">Curso activo (disponible para los estudiantes)</label>
          </div>
        </div>
        
        {/* Botón */}
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Curso'}
        </button>
        
        {/* Mensaje general */}
        {message && (
          <p className={`message ${messageType}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default CourseForm;

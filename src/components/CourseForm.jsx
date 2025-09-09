import React, { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';
import './CourseForm.css'

const CourseForm = ({ courseToEdit, onCourseSaved }) => {
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

  // Si hay un curso para editar, cargar sus datos al montar
  useEffect(() => {
    if (courseToEdit) {
      setFormData({
        title: courseToEdit.title || '',
        description: courseToEdit.description || '',
        instructor: courseToEdit.instructor || '',
        duration: courseToEdit.duration || '',
        price: courseToEdit.price || '',
        category: courseToEdit.category || '',
        is_active: courseToEdit.is_active ?? true
      });
      setMessage('');
      setMessageType('');
      setErrors({});
    }
  }, [courseToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
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
      let result;
      if (courseToEdit && courseToEdit.id) {
        // Editar curso existente
        result = await courseService.updateCourse(courseToEdit.id, {
          ...formData,
          duration: parseInt(formData.duration),
          price: parseFloat(formData.price)
        });
        if (result.success) {
          setMessage('Curso actualizado exitosamente!');
          setMessageType('success');
        } else {
          setMessage('Error al actualizar el curso: ' + result.error);
          setMessageType('error');
        }
      } else {
        // Crear nuevo curso
        result = await courseService.createCourse({
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
        } else {
          setMessage('Error al crear el curso: ' + result.error);
          setMessageType('error');
        }
      }

      if (result.success && onCourseSaved) onCourseSaved();
    } catch (error) {
      setMessage('Error al conectar con el backend');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-form">
      <h2>{courseToEdit ? 'Editar Curso' : 'Crear Nuevo Curso'}</h2>
      <p className="subtitle">
        Completa la información requerida {courseToEdit ? 'para actualizar el curso' : 'para agregar un nuevo curso'}
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
            className={errors.title ? 'error' : ''}
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
            className={errors.description ? 'error' : ''}
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
              className={errors.instructor ? 'error' : ''}
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
              className={errors.category ? 'error' : ''}
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
              className={errors.duration ? 'error' : ''}
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
              className={errors.price ? 'error' : ''}
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
          {loading ? (courseToEdit ? 'Actualizando...' : 'Creando...') : (courseToEdit ? 'Actualizar Curso' : 'Crear Curso')}
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

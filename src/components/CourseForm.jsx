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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success | error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

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
            required 
          />
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
            required 
          />
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
              required 
            />
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
              required 
            />
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
              required 
            />
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
              required 
            />
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
        
        {/* Mensaje */}
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
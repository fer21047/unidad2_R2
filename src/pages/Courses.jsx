import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import CourseForm from '../components/CourseForm';
import { courseService } from '../services/courseService';
import './Courses.css'

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await courseService.getCourses();
      if (result.success) {
        setCourses(result.data);
      } else {
        setError(result.error || 'Error al cargar los cursos');
      }
    } catch (err) {
      setError('Error de conexión al cargar los cursos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await courseService.deleteCourse(id);
      if (result.success) {
        fetchCourses();
      } else {
        alert("Error eliminando curso: " + result.error);
      }
    } catch (err) {
      alert("Error eliminando curso: " + err.message);
    }
  };

  const handleEdit = (id) => {
    alert(`Editar curso con ID: ${id}`);
  };

  const handleViewDetails = (id) => {
    alert(`Ver detalles del curso con ID: ${id}`);
  };

  return (
    <div className="courses-page">
      {/* Header */}
      <div className="courses-header">
        <h1>Cursos</h1>
        <button onClick={() => window.location.reload()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
            <path d="M21 21v-5h-5"/>
          </svg>
          Actualizar
        </button>
      </div>

      {/* Contenedor principal: Formulario (izquierda) + Lista (derecha) */}
      <div className="courses-main">
        {/* Formulario a la izquierda */}
        <div className="courses-form">
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            color: '#1f2937', 
            marginBottom: '1rem',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '0.5rem'
          }}>
            Crear Nuevo Curso
          </h2>
          <CourseForm onCourseCreated={fetchCourses} />
        </div>

        {/* Lista de cursos a la derecha */}
        <div className="courses-list">
          {loading ? (
            <div className="courses-loading">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #e5e7eb',
                  borderTop: '2px solid #2563eb',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Cargando cursos...
              </div>
            </div>
          ) : error ? (
            <div className="courses-error">
              <strong>Error:</strong> {error}
              <button 
                onClick={fetchCourses}
                style={{
                  marginLeft: '1rem',
                  padding: '0.25rem 0.5rem',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer'
                }}
              >
                Reintentar
              </button>
            </div>
          ) : courses.length === 0 ? (
            <div className="courses-empty">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
              <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>
                No hay cursos disponibles
              </h3>
              <p>Crea tu primer curso usando el formulario de la izquierda</p>
            </div>
          ) : (
            courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onViewDetails={handleViewDetails}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
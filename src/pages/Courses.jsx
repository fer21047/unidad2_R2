import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import CourseForm from '../components/CourseForm';
import { courseService } from '../services/courseService';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [courseToEdit, setCourseToEdit] = useState(null);

  // Obtener todos los cursos
  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await courseService.getCourses();
      if (result.success) setCourses(result.data);
      else setError(result.error || 'Error al cargar los cursos');
    } catch (err) {
      setError('Error de conexión al cargar los cursos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Eliminar curso
  const handleDelete = async (id) => {
    try {
      const result = await courseService.deleteCourse(id);
      if (result.success) fetchCourses();
      else alert("Error eliminando curso: " + result.error);
    } catch (err) {
      alert("Error eliminando curso: " + err.message);
    }
  };

  // Editar curso: cargar datos en el formulario
  const handleEdit = (id) => {
    const course = courses.find(c => c.id === id);
    if (course) setCourseToEdit(course);
  };

  // Ver detalles (opcional)
  const handleViewDetails = (id) => {
    alert(`Ver detalles del curso con ID: ${id}`);
  };

  // Después de crear o actualizar curso
  const handleCourseSaved = () => {
    setCourseToEdit(null); // limpiar formulario
    fetchCourses();         // actualizar lista
  };

  return (
    <div className="courses-page">
      {/* Header */}
      <div className="courses-header">
        <h1>Cursos</h1>
        <button onClick={fetchCourses}>Actualizar</button>
      </div>

      <div className="courses-main">
        {/* Formulario */}
        <div className="courses-form">
          <CourseForm
            courseToEdit={courseToEdit}
            onCourseSaved={handleCourseSaved}
          />
        </div>

        {/* Lista de cursos */}
        <div className="courses-list">
          {loading ? (
            <p>Cargando cursos...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : courses.length === 0 ? (
            <p>No hay cursos disponibles</p>
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

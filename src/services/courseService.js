const API_URL = "http://localhost:3000/api/courses";

export const courseService = {
  // Obtener todos los cursos
  getCourses: async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Crear un curso
  createCourse: async (course) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course)
      });
      const data = await res.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Cambiar estado activo/inactivo
  toggleCourseStatus: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/toggle`, {
        method: "PATCH"
      });
      const data = await res.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteCourse: async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Error eliminando curso");
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
};

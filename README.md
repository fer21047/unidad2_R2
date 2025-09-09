# Proyecto: Gestión de Cursos

## Descripción
Este proyecto es una aplicación para la gestión de cursos. Permite crear, editar, listar y eliminar cursos, además de activar o desactivar su disponibilidad. Está desarrollado con **React** en el frontend y **Express + MySQL** en el backend.

**Características principales:**
- Crear nuevos cursos con información completa (título, descripción, instructor, duración, precio, categoría y estado activo/inactivo).
- Editar cursos existentes.
- Listar todos los cursos con detalles resumidos.
- Eliminar cursos.
- Validación de campos y mensajes de error en el formulario.
- Gestión del estado activo/inactivo de cada curso.

## Instalación

### 1. Clonar el repositorio

git clone git@github.com:fer21047/unidad2_R2.git

cd unidad2_R2

# Instalcion de dependencias para base de datos:

1. npm install express cors mysql2
2. npm install react-router-dom

# En caso de que tsconfig.app.json ejecutar el siguiente comando:
npm install --save-dev @types/babel__generator @types/babel__template @types/babel__traverse

# Ejecucion del proyecto
npm i desde la carpeta raiz
npm i desde raiz/server 

# Desde Carpeta raiz 
npm run dev

# Desde server
npm start

## Flujo de Trabajo

El proyecto sigue una metodología basada en **ramas de características (feature branches)** y **pull requests** para mantener un control de versiones organizado y facilitar la integración de nuevas funcionalidades.

### Pasos:

1. **Crear una rama para la funcionalidad específica**:
   - `feature/crear-cursos`
   - `feature/editar-cursos`
   - `feature/listar-cursos`
   - `feature/eliminar-cursos`

2. **Desarrollar la funcionalidad** en la rama correspondiente.

3. **Hacer pull request** de la rama feature a `develop`.

4. **Revisar, aprobar y hacer merge** de `develop` a `main`.

Este flujo asegura que las nuevas funcionalidades se integren de manera controlada sin afectar la rama principal (`main`), manteniendo el proyecto estable y fácil de mantener.








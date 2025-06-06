# 🩺 Sistema de Gestión de Citas Médicas

Este proyecto es una aplicación web desarrollada con **Astro**, **React** y **TypeScript**, que permite gestionar un sistema de citas médicas con enfoque en **programación orientada a objetos (POO)**.

El sistema permite registrar y gestionar:
- **Pacientes**
- **Médicos**
- **Horarios de atención**
- **Citas médicas**

Cada entidad fue modelada como una clase con sus respectivos métodos CRUD.

## ⚙️ Funcionalidades Principales

- **CRUD completo** para pacientes, médicos, horarios y citas.
- **Asignación de horarios** a los médicos.
- **Validación de disponibilidad** al crear una cita: no se permite agendar si ya existe otra cita con el mismo médico en la misma fecha y hora.
- **Reprogramación de citas** (solo se puede modificar fecha y estado).
- **Filtros avanzados** para buscar citas por:
  - Paciente
  - Médico
  - Estado (Pendiente, Cancelada, Completada)
  - Combinaciones de los anteriores

## 🧠 Arquitectura y Tecnologías Usadas

- **Astro** – Framework web para sitios rápidos con componentes modernos.
- **React** – Librería de interfaces basada en componentes.
- **TypeScript** – Superset de JavaScript con tipado estático.
- **Zustand** – Librería ligera para manejo de estado global.
- **Jest** – Framework de pruebas para validar la lógica de clases.
- **Trello** – Herramienta para la organización y asignación de tareas.

## 🧪 Pruebas

Se implementaron **pruebas unitarias con Jest** para validar el correcto funcionamiento de las clases, enfocándose en la lógica de negocio y operaciones CRUD.

## ✅ Requisitos

- Node.js >= 18
- pnpm >= 8

## 🚀 Instalación y Uso

1. Clonar el repositorio:
```bash
   git clone https://github.com/KevinU20221275/Sistema_Citas_Medicas.git
   cd Sistema_Citas_Medicas
```

2. Intalar las dependecias
```bash
pnpm install
```

3. Ejecutar en modo desarrollo
```bash
pnpm dev
```
4. Ejecutar test
```bash
pnpm test
```


## 🧞 Comandos
Todos los comandos son ejecutados desde la raiz del proyecto, desde una terminal

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

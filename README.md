# ZetaAI

ZetaAI es una **interfaz de chat** construida para conversar con un **modelo gratuito de OpenAI**, diseñado originalmente como un módulo para integrarse en **TrainSimple.es**.  
Actualmente funciona como una **aplicación independiente** y **no guarda memoria** entre conversaciones (cada chat empieza “desde cero”).

> Estado: **en desarrollo** — todavía **no está lista** para su integración en TrainSimple.es.

---

## 🔌 Modelo (Hugging Face)

ZetaAI se conecta a un **modelo de OpenAI alojado en HuggingFace.co**, utilizándolo como backend de inferencia para responder en la conversación.

---

## ✨ Características

- 💬 Interfaz de chat para conversar con un modelo de OpenAI (vía Hugging Face)
- 🧠 **Sin memoria**: no persiste historial ni contexto entre sesiones
- 🧩 Arquitectura pensada para futura integración en TrainSimple.es
- 🧱 Base preparada para evolucionar hacia casos de uso de fitness y planificación

---

## 🧭 Objetivo (visión de producto)

Cuando se integre en **TrainSimple.es**, ZetaAI ayudará a los usuarios a:

- Elegir **rutinas de entrenamiento** en función de objetivos y disponibilidad
- Organizar entrenamientos en el **calendario**, decidiendo qué rutina hacer cada día
- Sugerir ajustes de planificación (volumen, descanso, distribución semanal, etc.)

---

## 🚧 Limitaciones actuales

- No hay memoria ni persistencia de conversaciones
- No se sincroniza con calendario ni con datos del usuario de TrainSimple.es
- El enfoque actual es únicamente chat “standalone”

---

## 🗺️ Roadmap (previsto)

- [ ] Persistencia opcional (historial / memoria por usuario)
- [ ] Perfiles (objetivo, nivel, material disponible, tiempo por sesión)
- [ ] Generación de rutinas estructuradas (plantillas + progresión)
- [ ] Integración con calendario (sugerencias de planificación por semana)
- [ ] Integración en TrainSimple.es (auth, permisos, contexto del usuario)
- [ ] Sistema de “herramientas” (tool calls) para calendarización y rutinas

---

## 🧩 Integración futura con TrainSimple.es

La integración buscará:
- Pasar **contexto útil** (disponibilidad, preferencias, rutina actual)
- Devolver **salidas estructuradas** (p.ej. JSON) para que TrainSimple.es pueda:
  - Pintar rutinas
  - Crear/editar eventos en el calendario
  - Replanificar semanas automáticamente

---

## 🔐 Privacidad y datos

- En la versión actual, ZetaAI **no almacena conversaciones**.
- La estrategia de almacenamiento (si se añade) se definirá antes de integrar en TrainSimple.es.

---

## 🛠️ Desarrollo

> Este repositorio contiene una base de interfaz para chat.  
> Ajusta esta sección a tu stack real (React/Next/Vite, Node, etc.).

### Requisitos
- Node.js (LTS recomendado)
- Acceso/credenciales para consumir el endpoint del modelo en Hugging Face

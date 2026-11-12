## Pruebas locales y GitHub Actions (Jean, 12-11-2026)

Esta regla sustituye las instrucciones anteriores sobre CI y despliegues automáticos.
Aplica a Claude Code, Codex y cualquier agente en todos los repositorios de JAPS, incluidos ventures.

- Antes de integrar, ejecutar en local las pruebas, lint, tipos y verificaciones que correspondan al cambio; corregir fallos y registrar comando, SHA y resultado real en el PR o tarea. Sin entorno local, declarar el bloqueo; nunca trasladar la suite a Actions.
- GitHub Actions se reserva para un despliegue o publicación de release explícitamente autorizado y sus validaciones críticas (versión, configuración, migraciones y salud). No ejecutar suites completas, cobertura, navegador, builds de desarrollo ni matrices de pruebas en Actions.
- No crear ni restaurar disparadores `push`, `pull_request`, `schedule`, `workflow_run` o equivalentes para CI. Los workflows de despliegue usan solo `workflow_dispatch`, desde la rama de release indicada, con `sha_probado` y `evidencia_local`. Un merge por sí solo no autoriza desplegar.
- No usar `gh run rerun`, `gh workflow run`, commits vacíos ni pushes sucesivos para depurar pruebas remotas. Ante un fallo de release, detenerse, diagnosticar y corregir localmente; una nueva ejecución requiere corrección verificada y autorización de despliegue vigente.
- Integrar por PR con evidencia local. La ausencia de un check de Actions es intencional y no impide el merge. Nunca presentar un check omitido como una prueba aprobada.
- Conservar límites de tiempo y concurrencia de release; no cancelar un despliegue en curso. Los YAML en `docs/actions-local/` conservan comandos y configuración de pruebas como referencia local: no devolverlos a `.github/workflows/`.
- Para repos nuevos o cambios de workflows, verificar esta política en local con `scripts/check-actions-policy.py` del repo `JAPS-Engineering/japs-os`.

## Despliegue de este repositorio

Este repositorio no tiene un workflow de release mantenido en YAML. No crear un CI para desarrollo. El procedimiento de publicación existente solo se usa con autorización de despliegue.

Las recetas antiguas en `docs/actions-local/` son referencia para ejecutar sus comandos de prueba localmente, con fixtures y servicios de desarrollo. No ejecutarlas como workflow ni ejecutar pasos de despliegue de esas referencias. Las pruebas y scripts de la aplicación se conservan.

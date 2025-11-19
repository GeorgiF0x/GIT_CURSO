# Guía Básica de Comandos de GitHub para Desarrolladores

## Tabla de Contenidos
- [Configuración Inicial](#configuración-inicial)
- [Conceptos Básicos](#conceptos-básicos)
- [Crear y Clonar Repositorios](#crear-y-clonar-repositorios)
- [Comandos Básicos de Git](#comandos-básicos-de-git)
- [Trabajar con Ramas (Branches)](#trabajar-con-ramas-branches)
- [Sincronizar con GitHub](#sincronizar-con-github)
- [Colaboración](#colaboración)
- [Comandos Útiles del Día a Día](#comandos-útiles-del-día-a-día)

---

## Configuración Inicial

### Configurar tu identidad (Obligatorio)
```bash
# Configurar nombre de usuario
git config --global user.name "Tu Nombre"

# Configurar email
git config --global user.email "tuemail@ejemplo.com"
```

### Ver tu configuración
```bash
# Ver toda la configuración
git config --list

# Ver configuración específica
git config user.name
git config user.email

# Ver configuración con ubicación del archivo
git config --list --show-origin
```

### Configurar editor por defecto
```bash
git config --global core.editor "code --wait"     # Para VS Code
git config --global core.editor "nano"            # Para Nano
git config --global core.editor "vim"             # Para Vim
git config --global core.editor "notepad"         # Para Notepad (Windows)
```

### Configurar colores en la terminal
```bash
# Activar colores en la salida de git
git config --global color.ui auto

# Configurar colores específicos
git config --global color.branch auto
git config --global color.diff auto
git config --global color.status auto
```

### Configurar comportamiento de line endings
```bash
# Para Windows (convierte LF a CRLF al checkout, CRLF a LF al commit)
git config --global core.autocrlf true

# Para Mac/Linux (convierte CRLF a LF al commit)
git config --global core.autocrlf input

# Desactivar conversión
git config --global core.autocrlf false
```

### Crear alias (atajos personalizados)
```bash
# Alias para comandos comunes
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --oneline --graph --decorate --all'

# Ahora puedes usar: git st en lugar de git status
```

### Configurar credenciales
```bash
# Guardar credenciales en caché (por defecto 15 minutos)
git config --global credential.helper cache

# Guardar credenciales en caché por más tiempo (en segundos)
git config --global credential.helper 'cache --timeout=3600'

# Guardar credenciales permanentemente (Windows)
git config --global credential.helper wincred

# Guardar credenciales permanentemente (Mac)
git config --global credential.helper osxkeychain

# Guardar credenciales permanentemente (Linux)
git config --global credential.helper store
```

### Configurar rama por defecto
```bash
# Establecer 'main' como nombre de rama por defecto (en lugar de 'master')
git config --global init.defaultBranch main
```

### Ver y editar configuración directamente
```bash
# Editar configuración global
git config --global --edit

# Editar configuración local del repositorio
git config --edit
```

---

## Conceptos Básicos

Antes de comenzar con los comandos, es importante entender algunos conceptos fundamentales:

### ¿Qué es Git?
**Git** es un sistema de control de versiones distribuido que te permite rastrear cambios en tu código a lo largo del tiempo. Piensa en él como un "historial de cambios" súper potente que te permite:
- Ver quién cambió qué y cuándo
- Volver a versiones anteriores de tu código
- Trabajar en diferentes funcionalidades simultáneamente
- Colaborar con otros desarrolladores sin pisar el trabajo de otros

### ¿Qué es GitHub?
**GitHub** es una plataforma web que aloja repositorios Git en la nube. Es como un "Google Drive" para código, pero con superpoderes:
- Almacena tu código en línea
- Facilita la colaboración entre desarrolladores
- Proporciona herramientas para revisión de código
- Permite gestionar proyectos y equipos

### ¿Qué es un Repositorio?
Un **repositorio** (o "repo") es como una carpeta de proyecto que Git rastrea. Contiene:
- Todos los archivos de tu proyecto
- El historial completo de cambios
- Configuración de Git
- Ramas (diferentes versiones del proyecto)

### ¿Qué es un Commit?
Un **commit** es como una "fotografía" de tu código en un momento específico. Cada commit:
- Guarda los cambios que hiciste
- Tiene un mensaje descriptivo
- Tiene un identificador único (hash)
- Se convierte en parte del historial permanente

**Ejemplo**: Si arreglaste un bug, haces un commit con el mensaje "Corregir error en login"

### ¿Qué es una Rama (Branch)?
Una **rama** es una línea de desarrollo independiente. Imagina que tu proyecto es un árbol:
- **main/master**: Es el tronco, la versión principal y estable
- **feature branches**: Son las ramas, donde desarrollas nuevas funcionalidades
- **merge**: Es cuando unes una rama de vuelta al tronco

**Ejemplo práctico**:
```
main:        A --- B --- C --- F
                   \         /
feature-login:      D ----- E
```

### ¿Qué es un Fork?
Un **fork** es una copia completa de un repositorio de otra persona en tu cuenta de GitHub. Es útil cuando:
- Quieres contribuir a un proyecto open source
- No tienes permisos de escritura en el repositorio original
- Quieres experimentar sin afectar el proyecto original

**Flujo típico**:
1. Haces fork del repositorio original → Ahora tienes tu propia copia
2. Clonas tu fork a tu computadora
3. Haces cambios en tu copia
4. Subes los cambios a tu fork
5. Creas un Pull Request para que el dueño original revise tus cambios

### ¿Qué es un Pull Request (PR)?
Un **Pull Request** es una solicitud para que tus cambios sean incorporados al repositorio original. Es como decir:
> "Hey, hice estos cambios en mi fork, ¿podrías revisarlos e incluirlos en tu proyecto?"

**Un Pull Request incluye**:
- Los cambios que propones
- Una descripción de qué hiciste y por qué
- Espacio para discusión y revisión de código
- Opción para hacer más cambios antes de ser aceptado

**Proceso típico de un PR**:
1. Subes tu rama con cambios a GitHub
2. Creas el Pull Request desde la interfaz web
3. Otros desarrolladores revisan tu código
4. Haces ajustes si es necesario
5. El mantenedor del proyecto acepta (merge) o rechaza tu PR

### ¿Qué es Clone vs Fork?
- **Clone**: Copia un repositorio a tu computadora (local)
- **Fork**: Copia un repositorio a tu cuenta de GitHub (remoto)

```
Repositorio Original (GitHub)
         |
         | fork
         ↓
    Tu Fork (GitHub)
         |
         | clone
         ↓
   Tu Computadora (local)
```

### ¿Qué es Push vs Pull?
- **Push**: Enviar (subir) tus commits locales a GitHub
- **Pull**: Descargar y fusionar cambios de GitHub a tu repositorio local

```
Tu Computadora  ←--pull--  GitHub
                --push-->
```

### ¿Qué es Staging Area?
El **staging area** (área de preparación) es como una "sala de espera" para tus cambios antes de hacer commit:

1. **Working Directory**: Haces cambios en archivos
2. **Staging Area** (`git add`): Seleccionas qué cambios quieres guardar
3. **Repository** (`git commit`): Guardas permanentemente los cambios

**Ejemplo**:
```bash
# Modificas 3 archivos: A.js, B.js, C.js
git add A.js B.js    # Solo A y B van al staging
git commit -m "..."  # Solo A y B se guardan en el historial
# C.js sigue modificado pero no está en el commit
```

### ¿Qué es Merge vs Rebase?
Ambos sirven para integrar cambios de una rama a otra, pero de forma diferente:

**Merge**: Crea un nuevo commit que combina los historiales
```
main:     A --- B --- C --- M
               \           /
feature:        D ------- E
```

**Rebase**: Reescribe el historial para que sea lineal
```
main:     A --- B --- C
feature:                D' --- E'
```

Para desarrolladores principiantes, **usa merge**, es más seguro.

### ¿Qué es origin vs upstream?
Son nombres convencionales para repositorios remotos:
- **origin**: Tu fork o tu repositorio principal
- **upstream**: El repositorio original del que hiciste fork

```bash
origin   → Tu fork en GitHub
upstream → Repositorio original en GitHub
```

---

## Crear y Clonar Repositorios

### Inicializar un repositorio local
```bash
git init
```

### Clonar un repositorio de GitHub
```bash
git clone https://github.com/usuario/repositorio.git
```

### Clonar con un nombre de carpeta diferente
```bash
git clone https://github.com/usuario/repositorio.git mi-proyecto
```

---

## Comandos Básicos de Git

### Ver el estado de tus archivos
```bash
git status
```

### Añadir archivos al staging area
```bash
git add archivo.txt              # Añadir un archivo específico
git add .                        # Añadir todos los archivos modificados
git add *.js                     # Añadir todos los archivos .js
```

### Hacer commit de los cambios
```bash
git commit -m "Mensaje descriptivo del commit"
```

### Añadir y hacer commit en un solo paso
```bash
git commit -am "Mensaje del commit"  # Solo funciona con archivos ya trackeados
```

### Ver el historial de commits
```bash
git log                          # Historial completo
git log --oneline               # Historial resumido
git log --oneline --graph       # Con gráfico de ramas
```

### Ver cambios en archivos
```bash
git diff                        # Cambios no staged
git diff --staged               # Cambios staged
git diff HEAD                   # Todos los cambios
```

---

## Trabajar con Ramas (Branches)

### Ver ramas existentes
```bash
git branch                      # Ramas locales
git branch -a                   # Todas las ramas (locales y remotas)
```

### Crear una nueva rama
```bash
git branch nombre-rama
```

### Cambiar a otra rama
```bash
git checkout nombre-rama
```

### Crear y cambiar a una rama nueva
```bash
git checkout -b nombre-rama
```

### Cambiar a una rama (método moderno)
```bash
git switch nombre-rama
git switch -c nombre-rama       # Crear y cambiar
```

### Fusionar una rama
```bash
git checkout main               # Ir a la rama destino
git merge nombre-rama          # Fusionar la rama
```

### Eliminar una rama
```bash
git branch -d nombre-rama       # Eliminar rama fusionada
git branch -D nombre-rama       # Forzar eliminación
```

---

## Sincronizar con GitHub

### Conectar repositorio local con GitHub
```bash
git remote add origin https://github.com/usuario/repositorio.git
```

### Ver repositorios remotos
```bash
git remote -v
```

### Subir cambios a GitHub
```bash
git push origin main            # Subir rama main
git push origin nombre-rama     # Subir otra rama
git push -u origin main         # Subir y establecer upstream
```

### Descargar cambios de GitHub
```bash
git pull origin main            # Descargar y fusionar
git fetch origin                # Solo descargar sin fusionar
```

### Actualizar todas las ramas
```bash
git fetch --all
```

---

## Colaboración

### ¿Cómo hacer un Fork?

**¿Qué estás haciendo?** Creando una copia del repositorio de otra persona en tu cuenta de GitHub.

**Pasos**:
1. Ve al repositorio en GitHub que quieres "forkear"
2. Haz clic en el botón "Fork" en la esquina superior derecha
3. GitHub creará una copia completa en tu cuenta
4. Ahora tienes tu propia versión del proyecto

```bash
# Después de hacer fork en GitHub, clona TU fork a tu computadora
git clone https://github.com/TU-USUARIO/repositorio.git
cd repositorio

# Añade el repositorio original como 'upstream' para poder recibir actualizaciones
git remote add upstream https://github.com/USUARIO-ORIGINAL/repositorio.git

# Verifica tus remotos
git remote -v
# origin    https://github.com/TU-USUARIO/repositorio.git (tu fork)
# upstream  https://github.com/USUARIO-ORIGINAL/repositorio.git (original)
```

### ¿Cómo crear un Pull Request?

**¿Qué estás haciendo?** Solicitando que tus cambios sean incluidos en el repositorio original.

**Pasos completos**:

```bash
# 1. Asegúrate de estar en tu fork actualizado
git checkout main
git pull upstream main

# 2. Crea una nueva rama para tu feature
git checkout -b mi-nueva-funcionalidad

# 3. Haz tus cambios y commits
git add .
git commit -m "Añadir nueva funcionalidad X"

# 4. Sube tu rama a TU fork en GitHub
git push origin mi-nueva-funcionalidad
```

**5. Crear el PR en GitHub**:
1. Ve a tu fork en GitHub
2. Verás un banner amarillo con "Compare & pull request" → Haz clic
3. Escribe un título descriptivo
4. Escribe una descripción detallada:
   - ¿Qué cambiaste?
   - ¿Por qué lo cambiaste?
   - ¿Cómo probaste los cambios?
5. Haz clic en "Create pull request"

**6. Espera revisión**:
- El dueño del proyecto revisará tu código
- Pueden pedirte cambios
- Si todo está bien, harán "merge" de tu PR

### Responder a comentarios en un PR

```bash
# Si te piden cambios, simplemente modifica tu código y haz commit
git add .
git commit -m "Corregir comentarios del PR"

# Sube los cambios a la misma rama
git push origin mi-nueva-funcionalidad

# El PR se actualizará automáticamente
```

### Mantener tu fork actualizado

**¿Por qué?** El repositorio original puede tener nuevos cambios que quieres en tu fork.

```bash
# 1. Cambiar a tu rama main
git checkout main

# 2. Descargar cambios del repositorio original
git fetch upstream

# 3. Fusionar los cambios del original a tu main local
git merge upstream/main

# Si prefieres rebase (más avanzado):
# git rebase upstream/main

# 4. Subir los cambios actualizados a tu fork en GitHub
git push origin main
```

**Atajo todo en uno**:
```bash
git pull upstream main    # Fetch + merge en un solo comando
git push origin main      # Actualizar tu fork
```

### Sincronizar tu rama de feature con main actualizado

**Situación**: Estás trabajando en una rama de feature, pero main se actualizó.

```bash
# Actualiza main primero
git checkout main
git pull upstream main

# Vuelve a tu rama de feature
git checkout mi-nueva-funcionalidad

# Trae los cambios de main a tu rama
git merge main

# O con rebase (más limpio pero más avanzado):
# git rebase main

# Sube los cambios
git push origin mi-nueva-funcionalidad
```

### Trabajar con ramas remotas
```bash
# Descargar una rama remota
git checkout -b nombre-rama origin/nombre-rama

# O con git switch
git switch nombre-rama          # Git buscará automáticamente en remoto
```

---

## Comandos Útiles del Día a Día

### Deshacer cambios

#### Descartar cambios en un archivo no staged
```bash
git checkout -- archivo.txt
git restore archivo.txt         # Método moderno
```

#### Quitar archivo del staging area
```bash
git reset HEAD archivo.txt
git restore --staged archivo.txt  # Método moderno
```

#### Deshacer el último commit (mantener cambios)
```bash
git reset --soft HEAD~1
```

#### Deshacer el último commit (descartar cambios)
```bash
git reset --hard HEAD~1
```

### Guardar cambios temporalmente
```bash
git stash                       # Guardar cambios
git stash list                  # Ver stashes guardados
git stash pop                   # Aplicar y eliminar último stash
git stash apply                 # Aplicar sin eliminar
git stash drop                  # Eliminar último stash
```

### Renombrar archivos
```bash
git mv archivo-viejo.txt archivo-nuevo.txt
```

### Eliminar archivos
```bash
git rm archivo.txt              # Eliminar archivo
git rm --cached archivo.txt     # Solo quitar del tracking, mantener local
```

### Ver quién modificó cada línea
```bash
git blame archivo.txt
```

### Buscar en el código
```bash
git grep "término-búsqueda"
```

### Etiquetar versiones
```bash
git tag v1.0.0                  # Crear tag
git tag -a v1.0.0 -m "Versión 1.0.0"  # Tag con mensaje
git push origin v1.0.0          # Subir tag a GitHub
git push origin --tags          # Subir todos los tags
```

---

## Buenas Prácticas

1. **Commits frecuentes y pequeños**: Haz commits con cambios lógicos y específicos
2. **Mensajes descriptivos**: Escribe mensajes de commit claros y concisos
3. **Usar ramas**: Crea una rama nueva para cada feature o bugfix
4. **Pull antes de Push**: Siempre descarga cambios antes de subir los tuyos
5. **Revisar antes de commit**: Usa `git status` y `git diff` antes de hacer commit
6. **No subir archivos sensibles**: Usa `.gitignore` para excluir archivos sensibles
7. **Mantén main/master limpio**: No hagas commits directos a la rama principal

---

## Archivo .gitignore Básico

Crea un archivo `.gitignore` en la raíz de tu proyecto:

```
# Dependencias
node_modules/
vendor/

# Variables de entorno
.env
.env.local

# Archivos de sistema
.DS_Store
Thumbs.db

# IDEs
.vscode/
.idea/
*.swp

# Builds
dist/
build/
*.log
```

---

## Recursos Adicionales

- [Documentación oficial de Git](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Última actualización**: 2025
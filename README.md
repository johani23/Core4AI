# \# Core4AI Frontend

# 

# Frontend application for \*\*Core4AI\*\* built with \*\*React + Vite\*\*.

# 

# \## 🧱 Project Structure (Context Architecture)

# 

# All application contexts follow a \*\*core + compatibility layer\*\* pattern to ensure:

# \- Clean internal imports

# \- Backward compatibility

# \- Safe refactors without breaking consumers

# 

# \### Structure





\### Rules

\- \*\*Define logic only in `src/context/core/`\*\*

\- \*\*Each core context exports a default Provider\*\*

\- \*\*Compatibility files re-export default + named exports\*\*

\- \*\*No file extensions in imports\*\*

\- \*\*Inside `core/`:\*\*

&nbsp; ```js

&nbsp; import { useX } from "../XContext";




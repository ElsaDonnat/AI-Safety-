# CLAUDE.md — AI Safety Repository Guide

## Project Overview

This repository is dedicated to **AI Safety** research and development. It serves as a central hub for AI safety-related code, experiments, documentation, and tooling.

## Repository Structure

```
AI-Safety-/
├── CLAUDE.md          # This file — guide for AI assistants and contributors
└── (new project)      # Repository is in initial setup phase
```

### Planned / Recommended Layout

```
AI-Safety-/
├── CLAUDE.md           # AI assistant guide
├── README.md           # Project overview and getting started
├── src/                # Main source code
│   └── ...
├── tests/              # Test suite
│   └── ...
├── docs/               # Documentation
│   └── ...
├── notebooks/          # Jupyter notebooks for experiments
│   └── ...
├── data/               # Data files (small/reference only — large data should use Git LFS or external storage)
├── configs/            # Configuration files
├── scripts/            # Utility scripts
├── requirements.txt    # Python dependencies
├── pyproject.toml      # Project metadata and build config
└── .github/
    └── workflows/      # CI/CD pipelines
```

## Development Workflow

### Branch Naming

- Feature branches: `feature/<description>`
- Bug fixes: `fix/<description>`
- Claude Code branches: `claude/<description>-<session-id>`

### Commit Conventions

- Use clear, descriptive commit messages
- Start with a verb in imperative mood: "Add", "Fix", "Update", "Remove", "Refactor"
- Keep the subject line under 72 characters
- Add a blank line and body for complex changes

### Code Style

- **Python**: Follow PEP 8. Use type hints where practical.
- **Formatting**: Use `black` for Python formatting, `isort` for import sorting.
- **Linting**: Use `ruff` or `flake8` for linting.
- **Docstrings**: Use Google-style docstrings for public functions and classes.

### Testing

- Use `pytest` as the test framework
- Place tests in `tests/` mirroring the `src/` structure
- Name test files `test_<module>.py`
- Run tests with: `pytest`

## Key Conventions for AI Assistants

1. **Read before modifying** — Always read existing files before making changes.
2. **Minimal changes** — Only change what is necessary to accomplish the task.
3. **No secrets** — Never commit API keys, credentials, or sensitive data.
4. **Test your changes** — Run tests after making modifications when a test suite exists.
5. **Preserve existing style** — Match the conventions already present in the codebase.
6. **Security first** — AI safety code demands careful attention to correctness and security. Validate inputs at system boundaries.
7. **Document experiments** — When adding research code or experiments, include clear documentation of methodology and results.

## Dependencies

Dependencies should be managed via `requirements.txt` (or `pyproject.toml` for packaged projects). Pin versions for reproducibility.

## Environment Setup

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Common Commands

| Command | Description |
|---------|-------------|
| `pytest` | Run all tests |
| `pytest -x` | Stop on first failure |
| `black .` | Format code |
| `ruff check .` | Lint code |
| `isort .` | Sort imports |

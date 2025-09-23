# Contributing to MozaWave

Thank you for your interest in contributing to MozaWave! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)

## 🤝 Code of Conduct

This project follows a code of conduct that we expect all contributors to adhere to:

- **Be respectful** and inclusive in all interactions
- **Be constructive** when providing feedback
- **Be patient** with newcomers and learning processes
- **Be professional** in all communications

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Importer

### Setup

1. **Fork and clone** the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/Moza-AI-MVP.git
   cd Moza-AI-MVP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a branch** for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### Branch Naming Convention

- **Features**: `feature/feature-name`
- **Bug fixes**: `fix/bug-description`
- **Documentation**: `docs/documentation-update`
- **Refactoring**: `refactor/component-name`
- **Hotfixes**: `hotfix/critical-fix`

### Commit Message Format

We use conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add JWT token refresh mechanism
fix(dashboard): resolve data loading issue
docs(readme): update installation instructions
```

## 🎯 Coding Standards

### TypeScript

- **Strict mode** enabled
- **Explicit types** for all function parameters and return values
- **Interface definitions** for all data structures
- **No `any` types** without explicit justification

### React

- **Functional components** with hooks
- **Custom hooks** for reusable logic
- **Proper prop types** with TypeScript interfaces
- **Memoization** for performance optimization

### CSS/Styling

- **Tailwind CSS** for styling
- **Mobile-first** responsive design
- **Consistent spacing** using Tailwind utilities
- **Dark mode** support for all components

### Component Structure

```typescript
// Component imports
import React from 'react';
import { motion } from 'framer-motion';

// Type definitions
interface ComponentProps {
  title: string;
  description?: string;
}

// Component definition
const Component: React.FC<ComponentProps> = ({ title, description }) => {
  // Hooks
  const [state, setState] = useState(false);
  
  // Event handlers
  const handleClick = () => {
    setState(!state);
  };
  
  // Render
  return (
    <div className="component-container">
      {/* Component JSX */}
    </div>
  );
};

export default Component;
```

## 📝 Pull Request Process

### Before Submitting

1. **Run tests** and ensure they pass
   ```bash
   npm run lint
   npm run type-check
   npm run test:security
   ```

2. **Update documentation** if needed
3. **Add tests** for new functionality
4. **Ensure responsive design** works on all devices

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Responsive design verified

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** on staging environment
4. **Approval** and merge

## 🐛 Issue Reporting

### Bug Reports

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Environment details** (browser, OS, etc.)

### Issue Template

```markdown
## Bug Description
[Clear description of the bug]

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
[What you expected to happen]

## Actual Behavior
[What actually happened]

## Environment
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Version: [e.g., 22]

## Additional Context
[Any other context about the problem]
```

## 💡 Feature Requests

### Feature Request Template

```markdown
## Feature Description
[Clear description of the feature]

## Problem Statement
[What problem does this solve?]

## Proposed Solution
[How should this be implemented?]

## Alternatives Considered
[What other solutions have you considered?]

## Additional Context
[Any other context about the feature request]
```

## 🧪 Testing

### Running Tests

```bash
# Lint checking
npm run lint

# Type checking
npm run type-check

# Security validation
npm run test:security

# Build verification
npm run build
```

### Writing Tests

- **Unit tests** for utility functions
- **Integration tests** for API endpoints
- **Component tests** for React components
- **E2E tests** for critical user flows

## 📚 Documentation

### Code Documentation

- **JSDoc comments** for all public functions
- **README updates** for new features
- **Type definitions** for all interfaces
- **Inline comments** for complex logic

### API Documentation

- **Endpoint documentation** with examples
- **Request/response schemas**
- **Authentication requirements**
- **Error handling** documentation

## 🔒 Security

### Security Guidelines

- **Never commit** API keys or secrets
- **Validate all inputs** from external sources
- **Use environment variables** for configuration
- **Follow security best practices** in all code

### Reporting Security Issues

For security vulnerabilities, please email: security@mozawave.ai

## 🎨 Design Guidelines

### UI/UX Standards

- **Consistent design language** across all components
- **Accessibility compliance** (WCAG 2.1 AA)
- **Mobile-first** responsive design
- **Performance optimization** for all interactions

### Component Design

- **Reusable components** with clear APIs
- **Proper error boundaries** and loading states
- **Smooth animations** with Framer Motion
- **Professional styling** with Tailwind CSS

## 📞 Getting Help

### Resources

- **Documentation**: Check the README and code comments
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact us at hello@mozawave.ai

### Community

- **Slack**: Join our developer community
- **Twitter**: Follow @mozawave for updates
- **LinkedIn**: Connect with the team

## 🙏 Recognition

Contributors will be recognized in:
- **README contributors section**
- **Release notes**
- **Project documentation**
- **Community highlights**

Thank you for contributing to MozaWave! 🚀

# Contributing to MozaWave

Thank you for your interest in contributing to MozaWave! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read and follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/MozaWave.git
   cd MozaWave
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```
5. **Start the development server**:
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names with prefixes:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or updates

Examples:
- `feature/user-onboarding-flow`
- `fix/authentication-bug`
- `docs/api-documentation`

### Commit Messages

Follow the conventional commits specification:

```
type(scope): description

[optional body]

[optional footer(s)]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(auth): add multi-factor authentication support
fix(dashboard): resolve chart rendering issue
docs(readme): update installation instructions
```

### Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following our coding standards
3. **Write tests** for new functionality
4. **Update documentation** if needed
5. **Run the test suite** to ensure everything passes
6. **Submit a pull request** with a clear description

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use strict type checking

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types and interfaces
- Implement proper error boundaries

### Styling

- Use Tailwind CSS utility classes
- Follow our design system guidelines
- Use CSS custom properties for theming
- Ensure responsive design

### Component Structure

```tsx
// Component imports
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Types
interface ComponentProps {
  title: string;
  onAction: () => void;
}

// Component
export const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // Hooks
  const [state, setState] = useState('');

  // Event handlers
  const handleClick = () => {
    // Implementation
  };

  // Render
  return (
    <div className="component-container">
      {/* JSX */}
    </div>
  );
};
```

## Testing

### Unit Tests

- Write unit tests for utility functions
- Test component behavior with different props
- Use React Testing Library for component tests

### Integration Tests

- Test component interactions
- Test API integrations
- Test user workflows

### E2E Tests

- Test critical user journeys
- Test authentication flows
- Test dashboard functionality

## Security Guidelines

### Authentication & Authorization

- Never hardcode credentials
- Use environment variables for sensitive data
- Implement proper input validation
- Follow OWASP security guidelines

### Data Handling

- Sanitize user inputs
- Use parameterized queries
- Implement proper error handling
- Log security events

## Performance Guidelines

### Bundle Size

- Keep bundle size under 500KB
- Use dynamic imports for large components
- Optimize images and assets
- Implement code splitting

### Runtime Performance

- Optimize re-renders with React.memo
- Use useMemo and useCallback appropriately
- Implement virtual scrolling for large lists
- Use skeleton loading states

## Documentation

### Code Documentation

- Add JSDoc comments for complex functions
- Document component props and usage
- Include examples in component documentation

### README Updates

- Update README when adding new features
- Include setup instructions for new dependencies
- Document breaking changes

## Release Process

1. **Version bumping** follows semantic versioning
2. **Changelog** is automatically generated
3. **Tests** must pass before release
4. **Documentation** is updated for new features

## Getting Help

- **Discord**: Join our community Discord server
- **GitHub Issues**: Create an issue for bugs or feature requests
- **Email**: Contact us at dev@mozawave.ai

## Recognition

Contributors will be recognized in:
- README contributors section
- Release notes
- Annual contributor spotlight

Thank you for contributing to MozaWave! 🚀
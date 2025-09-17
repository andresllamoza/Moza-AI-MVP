import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					light: 'hsl(var(--primary-light))',
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0176D3',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
					950: '#082f49'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					50: '#fff7ed',
					100: '#ffedd5',
					200: '#fed7aa',
					300: '#fdba74',
					400: '#fb923c',
					500: '#FF7A59',
					600: '#ea580c',
					700: '#c2410c',
					800: '#9a3412',
					900: '#7c2d12',
					950: '#431407'
				},
				teal: {
					50: '#f0fdfa',
					100: '#ccfbf1',
					200: '#99f6e4',
					300: '#5eead4',
					400: '#2dd4bf',
					500: '#00C4B4',
					600: '#0d9488',
					700: '#0f766e',
					800: '#115e59',
					900: '#134e4a',
					950: '#042f2e'
				},
				'red-pink': {
					50: '#fdf2f8',
					100: '#fce7f3',
					200: '#fbcfe8',
					300: '#f9a8d4',
					400: '#f472b6',
					500: '#FF2D55',
					600: '#db2777',
					700: '#be185d',
					800: '#9d174d',
					900: '#831843',
					950: '#500724'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					300: '#86efac',
					400: '#4ade80',
					500: '#22c55e',
					600: '#16a34a',
					700: '#15803d',
					800: '#166534',
					900: '#14532d',
					950: '#052e16'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					50: '#fffbeb',
					100: '#fef3c7',
					200: '#fde68a',
					300: '#fcd34d',
					400: '#fbbf24',
					500: '#f59e0b',
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f',
					950: '#451a03'
				},
				urgent: {
					DEFAULT: 'hsl(var(--urgent))',
					foreground: 'hsl(var(--urgent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				dark: {
					0: '#ffffff',
					50: '#f8fafc',
					100: '#f1f5f9',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					800: '#2A2A2A',
					900: '#1A1A1A',
					950: '#0f172a'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				
				/* Industry-Specific Backgrounds */
				'contractor-bg': 'hsl(var(--contractor-bg))',
				'hospitality-bg': 'hsl(var(--hospitality-bg))',
				'carwash-bg': 'hsl(var(--carwash-bg))',
				'restaurant-bg': 'hsl(var(--restaurant-bg))',
				
				/* Industry Colors */
				'contractor-primary': 'hsl(var(--contractor-primary))',
				'contractor-secondary': 'hsl(var(--contractor-secondary))',
				'contractor-accent': 'hsl(var(--contractor-accent))',
				
				'hospitality-primary': 'hsl(var(--hospitality-primary))',
				'hospitality-secondary': 'hsl(var(--hospitality-secondary))',
				'hospitality-accent': 'hsl(var(--hospitality-accent))',
				
				'carwash-primary': 'hsl(var(--carwash-primary))',
				'carwash-secondary': 'hsl(var(--carwash-secondary))',
				'carwash-accent': 'hsl(var(--carwash-accent))',
				
				'restaurant-primary': 'hsl(var(--restaurant-primary))',
				'restaurant-secondary': 'hsl(var(--restaurant-secondary))',
				'restaurant-accent': 'hsl(var(--restaurant-accent))'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-teal': 'var(--gradient-teal)',
				'gradient-red-pink': 'var(--gradient-red-pink)',
				'gradient-success': 'var(--gradient-success)',
				'gradient-warning': 'var(--gradient-warning)',
				'gradient-dark': 'var(--gradient-dark)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-glass': 'var(--gradient-glass)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-subtle': 'var(--gradient-subtle)',
				'gradient-contractor': 'var(--gradient-contractor)',
				'gradient-hospitality': 'var(--gradient-hospitality)',
				'gradient-carwash': 'var(--gradient-carwash)',
				'gradient-restaurant': 'var(--gradient-restaurant)'
			},
			boxShadow: {
				elegant: 'var(--shadow-elegant)',
				glow: 'var(--shadow-glow)',
				'glow-secondary': 'var(--shadow-glow-secondary)',
				'glow-teal': 'var(--shadow-glow-teal)',
				'glow-red-pink': 'var(--shadow-glow-red-pink)',
				glass: 'var(--shadow-glass)',
				xs: 'var(--shadow-xs)',
				sm: 'var(--shadow-sm)',
				base: 'var(--shadow-base)',
				md: 'var(--shadow-md)',
				lg: 'var(--shadow-lg)',
				xl: 'var(--shadow-xl)',
				'2xl': 'var(--shadow-2xl)',
				contractor: 'var(--shadow-contractor)',
				hospitality: 'var(--shadow-hospitality)',
				carwash: 'var(--shadow-carwash)',
				restaurant: 'var(--shadow-restaurant)'
			},
			backdropFilter: {
				'blur-glass': 'var(--backdrop-blur)'
			},
			transitionTimingFunction: {
				smooth: 'var(--transition-smooth)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
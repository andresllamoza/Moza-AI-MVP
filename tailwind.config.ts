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
					light: 'hsl(var(--primary-light))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
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
				'gradient-subtle': 'var(--gradient-subtle)',
				'gradient-glass': 'var(--gradient-glass)',
				'gradient-contractor': 'var(--gradient-contractor)',
				'gradient-hospitality': 'var(--gradient-hospitality)',
				'gradient-carwash': 'var(--gradient-carwash)',
				'gradient-restaurant': 'var(--gradient-restaurant)'
			},
			boxShadow: {
				elegant: 'var(--shadow-elegant)',
				glow: 'var(--shadow-glow)',
				glass: 'var(--shadow-glass)',
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
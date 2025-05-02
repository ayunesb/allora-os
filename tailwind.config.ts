import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	safelist: [
		'dark',
		'text-white',
		'bg-background',
		'text-foreground',
		'bg-muted',
		'bg-primary',
		'bg-secondary',
		'bg-accent',
		'bg-destructive',
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				md: '2rem',
				lg: '2.5rem',
				xl: '3rem',
			},
			screens: {
				xs: '100%',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			screens: {
				xs: '480px',
				'3xl': '1600px',
				'4xl': '1920px',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: {
					DEFAULT: '#050A18',
					secondary: '#0C1428'
				},
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#3B82F6',
					light: '#60A5FA',
					dark: '#2563EB',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#10B981',
					light: '#34D399',
					dark: '#059669',
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF'
				},
				success: {
					DEFAULT: '#10B981',
					foreground: '#FFFFFF'
				},
				warning: {
					DEFAULT: '#F59E0B',
					foreground: '#1A1A2E'
				},
				muted: {
					DEFAULT: '#1F2937',
					foreground: '#A0AEC0'
				},
				accent: {
					DEFAULT: '#111827',
					foreground: '#FFFFFF'
				},
				popover: {
					DEFAULT: 'rgba(8, 14, 30, 0.95)',
					foreground: '#FFFFFF'
				},
				card: {
					DEFAULT: 'rgba(8, 14, 30, 0.8)',
					foreground: '#FFFFFF'
				},
				sidebar: {
					DEFAULT: '#050A18',
					foreground: '#FFFFFF',
					primary: '#3B82F6',
					'primary-foreground': '#FFFFFF',
					accent: 'rgba(255, 255, 255, 0.05)',
					'accent-foreground': '#FFFFFF',
					border: 'rgba(255, 255, 255, 0.1)',
					ring: '#3B82F6'
				},
				'risk-low': {
					DEFAULT: '#3B82F6',
					light: '#BFDBFE',
					dark: '#2563EB',
					foreground: '#FFFFFF'
				},
				'risk-medium': {
					DEFAULT: '#F59E0B',
					light: '#FEF3C7',
					dark: '#D97706',
					foreground: '#FFFFFF'
				},
				'risk-high': {
					DEFAULT: '#EF4444',
					light: '#FEE2E2',
					dark: '#DC2626',
					foreground: '#FFFFFF'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '1rem',
				'2xl': '1.25rem',
				'3xl': '1.5rem',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
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
				},
				'fade-in': {
					from: {
						opacity: '0'
					},
					to: {
						opacity: '1'
					}
				},
				'fade-out': {
					from: {
						opacity: '1'
					},
					to: {
						opacity: '0'
					}
				},
				'slide-in-up': {
					from: {
						transform: 'translateY(10px)',
						opacity: '0'
					},
					to: {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'slide-in-down': {
					from: {
						transform: 'translateY(-10px)',
						opacity: '0'
					},
					to: {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 5px rgba(99, 179, 237, 0.4)'
					},
					'50%': {
						boxShadow: '0 0 15px rgba(99, 179, 237, 0.7)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 5px rgba(90, 103, 216, 0.4)'
					},
					'50%': {
						boxShadow: '0 0 15px rgba(90, 103, 216, 0.7)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in-up': 'slide-in-up 0.4s ease-out',
				'slide-in-down': 'slide-in-down 0.4s ease-out',
				'glow-pulse': 'glow-pulse 2s infinite',
				'float': 'float 3s ease-in-out infinite',
				'float-slow': 'float 6s ease-in-out infinite',
				'pulse-subtle': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'gradient-x': 'gradient-x 15s ease infinite',
				'gradient-y': 'gradient-y 15s ease infinite',
				'gradient-xy': 'gradient-xy 15s ease infinite',
			},
			spacing: {
				'safe-top': 'env(safe-area-inset-top)',
				'safe-bottom': 'env(safe-area-inset-bottom)',
				'safe-left': 'env(safe-area-inset-left)',
				'safe-right': 'env(safe-area-inset-right)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-premium': 'linear-gradient(135deg, #3B82F6, #10B981)',
				'gradient-sidebar': 'linear-gradient(180deg, #050A18, #030712)',
				'gradient-background': 'linear-gradient(135deg, #050A18, #0C1428)',
				'gradient-dots': 'radial-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px)',
				'gradient-mesh': 'linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
			},
			boxShadow: {
				'glow-sm': '0 0 10px rgba(59, 130, 246, 0.3)',
				'glow-md': '0 0 20px rgba(59, 130, 246, 0.4)',
				'glow-lg': '0 0 30px rgba(59, 130, 246, 0.5)',
				'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.3)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

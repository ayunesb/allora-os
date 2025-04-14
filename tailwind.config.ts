
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
					DEFAULT: '#0A0A23',
					secondary: '#1A1A40'
				},
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#5A67D8',
					light: '#7986E7',
					dark: '#4A57C8',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#63B3ED',
					light: '#83C3FD',
					dark: '#43A3DD',
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: '#F56565',
					foreground: '#FFFFFF'
				},
				success: {
					DEFAULT: '#48BB78',
					foreground: '#FFFFFF'
				},
				warning: {
					DEFAULT: '#ECC94B',
					foreground: '#1A1A2E'
				},
				muted: {
					DEFAULT: '#1F2937',
					foreground: '#A0AEC0'
				},
				accent: {
					DEFAULT: '#1A1A40',
					foreground: '#FFFFFF'
				},
				popover: {
					DEFAULT: 'rgba(15, 15, 35, 0.9)',
					foreground: '#FFFFFF'
				},
				card: {
					DEFAULT: 'rgba(15, 15, 35, 0.7)',
					foreground: '#FFFFFF'
				},
				sidebar: {
					DEFAULT: '#0A0A23',
					foreground: '#FFFFFF',
					primary: '#5A67D8',
					'primary-foreground': '#FFFFFF',
					accent: 'rgba(255, 255, 255, 0.05)',
					'accent-foreground': '#FFFFFF',
					border: 'rgba(255, 255, 255, 0.1)',
					ring: '#5A67D8'
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
				heading: ['Poppins', 'system-ui', 'sans-serif'],
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
				'glow': 'glow 2s infinite'
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
				'gradient-premium': 'linear-gradient(135deg, #5A67D8, #63B3ED)',
				'gradient-sidebar': 'linear-gradient(180deg, #0A0A23, #000000)',
				'gradient-background': 'linear-gradient(135deg, #0A0A23, #1A1A40)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

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
				DEFAULT: "1rem",
				sm: "1.5rem",
				lg: "2rem",
				xl: "2.5rem",
				"2xl": "3rem",
			},
			screens: {
				"sm": "640px",
				"md": "768px",
				"lg": "1024px",
				"xl": "1280px",
				"2xl": "1400px",
				"3xl": "1600px",
				"kiosk": "1920px",
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
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
				}
			},
			backgroundImage: {
				'gradient-winter': 'var(--gradient-winter)',
				'gradient-ice': 'var(--gradient-ice)',
				'gradient-hero': 'var(--gradient-hero)'
			},
			boxShadow: {
				'kiosk': 'var(--shadow-kiosk)',
				'card': 'var(--shadow-card)',
				'button': 'var(--shadow-button)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				kiosk: 'clamp(8px, 1vw, 16px)'
			},
			fontSize: {
				xs: "var(--text-xs)",
				sm: "var(--text-sm)",
				base: "var(--text-base)",
				lg: "var(--text-lg)",
				xl: "var(--text-xl)",
				"2xl": "var(--text-2xl)",
				"3xl": "var(--text-3xl)",
				"4xl": "var(--text-4xl)",
				"5xl": "var(--text-5xl)",
				"6xl": "var(--text-6xl)",
			},
			spacing: {
				xs: "var(--spacing-xs)",
				sm: "var(--spacing-sm)",
				md: "var(--spacing-md)",
				lg: "var(--spacing-lg)",
				xl: "var(--spacing-xl)",
				"2xl": "var(--spacing-2xl)",
				"3xl": "var(--spacing-3xl)",
			},
			maxWidth: {
				'kiosk': '1920px',
				'mobile': '428px',
				'tablet': '768px',
				'desktop': '1440px',
			},
			minHeight: {
				'touch': '44px',
				'kiosk': '64px',
				'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif']
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'touch-feedback': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(0.95)' },
					'100%': { transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'touch-feedback': 'touch-feedback 0.15s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

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
				sans: [
					'-apple-system',
					'BlinkMacSystemFont',
					'"SF Pro Display"',
					'"SF Pro Text"',
					'"Helvetica Neue"',
					'Helvetica',
					'Arial',
					'sans-serif'
				],
				display: [
					'-apple-system',
					'BlinkMacSystemFont',
					'"SF Pro Display"',
					'"Helvetica Neue"',
					'sans-serif'
				],
				mono: [
					'"SF Mono"',
					'"JetBrains Mono"',
					'Menlo',
					'Monaco',
					'Consolas',
					'monospace'
				]
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				surface: {
					DEFAULT: 'var(--surface)',
					raised: 'var(--surface-raised)',
					subtle: 'var(--surface-subtle)'
				},
				ink: {
					DEFAULT: 'var(--ink)',
					muted: 'var(--ink-muted)',
					subtle: 'var(--ink-subtle)'
				},
				hairline: 'var(--hairline)',
				brand: {
					DEFAULT: '#0071e3',
					hover: '#0077ed',
					soft: 'rgba(0, 113, 227, 0.1)'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
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
			letterSpacing: {
				display: '-0.022em',
				tightish: '-0.011em'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			transitionTimingFunction: {
				'apple': 'cubic-bezier(0.16, 1, 0.3, 1)',
				'apple-quick': 'cubic-bezier(0.4, 0, 0.2, 1)'
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
				'drift-a': {
					'0%, 100%': { transform: 'translate3d(0%, 0%, 0) scale(1)' },
					'50%': { transform: 'translate3d(4%, -3%, 0) scale(1.08)' }
				},
				'drift-b': {
					'0%, 100%': { transform: 'translate3d(0%, 0%, 0) scale(1)' },
					'50%': { transform: 'translate3d(-5%, 4%, 0) scale(1.12)' }
				},
				'drift-c': {
					'0%, 100%': { transform: 'translate3d(0%, 0%, 0) scale(1)' },
					'50%': { transform: 'translate3d(3%, 5%, 0) scale(0.92)' }
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(24px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'word-rise': {
					'0%': { opacity: '0', transform: 'translateY(0.4em)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'drift-a': 'drift-a 16s ease-in-out infinite',
				'drift-b': 'drift-b 22s ease-in-out infinite',
				'drift-c': 'drift-c 28s ease-in-out infinite',
				'fade-up': 'fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
				'word-rise': 'word-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both'
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

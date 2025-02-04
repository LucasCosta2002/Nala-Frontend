import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './Context/AppProvider.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App.jsx'
import './index.css'

const theme = createTheme({
	palette: {
		primary: {
			main: '#7C38CD',
		},
		secondary: {
			main: '#FF6B6B',
		},
		background: {
			default: '#F5F5F5',
			paper: '#FFFFFF',
		},
	},
	typography: {
		fontFamily: 'Roboto, sans-serif',
		h1: { fontWeight: 700 },
		h2: { fontWeight: 600 },
		h3: { fontWeight: 500 },
		body1: { fontWeight: 400 },
		body2: { fontWeight: 300 },
	},
});

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AppProvider>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</AppProvider>
	</StrictMode>,
)

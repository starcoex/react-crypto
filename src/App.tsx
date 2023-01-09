import GlobalStyle from './styles/GlobalStyle';
import Router from './routes/Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from './atoms';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';

const Toggle = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 1rem;
	left: 1rem;
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	border: none;
	background-color: ${(props) => props.theme.cardColor};
	color: ${(props) => props.theme.accentColor};
	font-size: 0.4rem;
`;

function App() {
	const isDark = useRecoilValue(isDarkAtom);
	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const toggleDark = () => setDarkAtom((prev) => !prev);

	return (
		<>
			<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
				<Toggle onClick={toggleDark}>Toggle Mode</Toggle>
				<GlobalStyle />
				<Router></Router>
				<ReactQueryDevtools initialIsOpen={true} />
			</ThemeProvider>
		</>
	);
}

export default App;
